import { createAppNginClient } from "../dist/index.js";
import * as generated from "../dist/generated/index.js";

const client = createAppNginClient({ baseUrl: "https://api.appngin.com" });

if (!client || Object.keys(generated).length === 0) {
	throw new Error("SDK package exports are unavailable");
}

console.log("SDK package exports load successfully");
