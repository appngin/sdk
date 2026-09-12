# AppNgin SDK

The official SDK for integrating applications with the AppNgin API.

## TypeScript

Install the public package from npm:

```sh
npm install @appnginhq/sdk
```

Create a client and request the AppNgin catalog:

```ts
import { createAppNginClient } from "@appnginhq/sdk";

const appngin = createAppNginClient({
	baseUrl: "https://api.appngin.com",
});

const response = await appngin.catalog.list({
	query: { category: "photos" },
});

console.log(response.data);
```

See the [TypeScript integration guide](./typescript/README.md) for the available
client methods and exported types.

The SDK is generated from the public AppNgin
[OpenAPI contract](https://api.appngin.com/v1/openapi.json).
