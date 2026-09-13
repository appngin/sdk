import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const url = process.env.OPENAPI_URL;
const path = process.env.OPENAPI_PATH;
const discoveryUrl = process.env.API_DISCOVERY_URL;
const expectedVersion = process.env.API_VERSION;
const expectedSha256 = process.env.OPENAPI_SHA256;
const maxAttempts = Number(process.env.CONTRACT_FETCH_ATTEMPTS ?? "12");
const retryDelayMs = Number(process.env.CONTRACT_FETCH_DELAY_MS ?? "10000");

const canonicalize = (value: unknown): unknown => {
	if (Array.isArray(value)) {
		return value.map(canonicalize);
	}
	if (value && typeof value === "object") {
		return Object.fromEntries(
			Object.entries(value as Record<string, unknown>)
				.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
				.map(([key, entry]) => [key, canonicalize(entry)]),
		);
	}
	return value;
};

if ((!url && !path) || !discoveryUrl || !expectedVersion || !expectedSha256) {
	throw new Error(
		"OPENAPI_PATH or OPENAPI_URL, plus API_DISCOVERY_URL, API_VERSION, and OPENAPI_SHA256 are required",
	);
}

const sleep = (milliseconds: number) =>
	new Promise((resolve) => setTimeout(resolve, milliseconds));

const readOpenApi = async () => {
	if (path) {
		return readFile(path);
	}
	const response = await fetch(url as string);
	if (!response.ok) {
		throw new Error(`Failed to fetch OpenAPI document: ${response.status}`);
	}
	return Buffer.from(await response.arrayBuffer());
};

let lastError: Error | undefined;
for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
	try {
		const discoveryResponse = await fetch(discoveryUrl);
		if (!discoveryResponse.ok) {
			throw new Error(
				`Failed to fetch API discovery document: ${discoveryResponse.status}`,
			);
		}
		const discovery = (await discoveryResponse.json()) as {
			version?: string;
		};
		if (discovery.version !== expectedVersion) {
			throw new Error(
				`API discovery version mismatch: expected ${expectedVersion}, received ${discovery.version ?? "missing"}`,
			);
		}

		const bytes = await readOpenApi();
		const document = JSON.parse(bytes.toString("utf8")) as {
			info?: { version?: string };
		};
		const canonicalBytes = Buffer.from(JSON.stringify(canonicalize(document)));
		const sha256 = createHash("sha256")
			.update(canonicalBytes)
			.digest("hex");
		if (sha256 !== expectedSha256) {
			throw new Error(
				`OpenAPI hash mismatch: expected ${expectedSha256}, received ${sha256}`,
			);
		}

		if (document.info?.version !== expectedVersion) {
			throw new Error(
				`OpenAPI version mismatch: expected ${expectedVersion}, received ${document.info?.version ?? "missing"}`,
			);
		}

		await mkdir("../spec", { recursive: true });
		await writeFile("../spec/openapi.json", bytes);
		console.log(`Verified API ${expectedVersion} on attempt ${attempt}`);
		process.exit(0);
	} catch (error) {
		lastError = error instanceof Error ? error : new Error(String(error));
		if (attempt === maxAttempts) {
			throw lastError;
		}
		console.warn(
			`Contract is not ready (${lastError.message}); retrying in ${retryDelayMs}ms`,
		);
		await sleep(retryDelayMs);
	}
}

throw lastError ?? new Error("Contract fetch failed");
