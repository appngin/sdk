# @appnginhq/sdk

The official TypeScript SDK for the AppNgin API.

## Install

```sh
npm install @appnginhq/sdk
```

The package is public on the npm registry and does not require authentication
to install.

## Usage

```ts
import { createAppNginClient } from "@appnginhq/sdk";

const client = createAppNginClient({
	baseUrl: "https://api.appngin.com",
});

const response = await client.catalog.list({
	query: { category: "photos" },
});

console.log(response.data);
```

This package is generated from the API contract at
<https://api.appngin.com/v1/openapi/latest.json>. The exact contract used for
each release is archived in the repository's matching release tag. The release
workflow verifies the matching API version from <https://api.appngin.com/v1>
before generating this package.
