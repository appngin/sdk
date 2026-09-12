# @appnginhq/sdk

The official TypeScript SDK for integrating applications with the AppNgin API.

## Installation

```sh
npm install @appnginhq/sdk
```

The package is public and includes TypeScript declarations.

## Quick start

```ts
import { createAppNginClient } from "@appnginhq/sdk";

const appngin = createAppNginClient({
	baseUrl: "https://api.appngin.com",
});

const response = await appngin.catalog.list({
	query: {
		category: "photos",
		popular: true,
	},
});

console.log(response.data);
```

## Client methods

```ts
// Discover the current API version and endpoint URLs.
await appngin.discover();

// List catalog entries, optionally filtered by category or popularity.
await appngin.catalog.list({
	query: { category: "passwords", popular: true },
});

// List catalog categories and their item counts.
await appngin.catalog.listCategories();

// Get one catalog entry by slug.
await appngin.catalog.findOne({
	path: { slug: "vaultwarden" },
});

// Retrieve the current OpenAPI document.
await appngin.openapi.latest();
```

Each operation returns the generated SDK response, including its typed `data`
or `error` value and the underlying HTTP response.

## Types

API response and request types are exported from the package root:

```ts
import type {
	CatalogCategoryId,
	CatalogListing,
	DiscoveryResponse,
} from "@appnginhq/sdk";
```

The lower-level generated operations are available from the generated export:

```ts
import { catalogList } from "@appnginhq/sdk/generated";

const response = await catalogList({
	query: { category: "media" },
});
```

## API contract

The SDK is generated from the public AppNgin
[OpenAPI contract](https://api.appngin.com/v1/openapi.json). SDK versions
track the corresponding AppNgin API contract version.
