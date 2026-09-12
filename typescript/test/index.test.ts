import { describe, expect, test } from "bun:test";
import { createAppNginClient } from "../src";

describe("@appnginhq/sdk", () => {
	test("creates a configured client and serializes catalog queries", async () => {
		let requestedUrl = "";
		const client = createAppNginClient({
			baseUrl: "https://api.appngin.com",
			fetch: async (input) => {
				requestedUrl = input instanceof Request ? input.url : String(input);
				return new Response(
					JSON.stringify({
						data: [],
						meta: {
							total: 0,
							filters: { category: "photos", popular: null },
						},
					}),
					{ headers: { "content-type": "application/json" } },
				);
			},
		});

		const result = await client.catalog.list({
			query: { category: "photos" },
		});

		expect(requestedUrl).toBe(
			"https://api.appngin.com/v1/catalog?category=photos",
		);
		expect(result.data?.meta.total).toBe(0);
	});
});
