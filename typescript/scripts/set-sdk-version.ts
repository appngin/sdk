import { readFile, writeFile } from "node:fs/promises";

const version = process.env.API_VERSION;
if (!version) {
	throw new Error("API_VERSION is required");
}

const packagePath = "package.json";
const packageJson = JSON.parse(await readFile(packagePath, "utf8")) as {
	version: string;
};
packageJson.version = version;
await writeFile(packagePath, `${JSON.stringify(packageJson, null, "\t")}\n`);
