# @appngin/sdk

The official TypeScript SDK for the AppNgin API.

## Install from GitHub Packages

Create an `.npmrc` entry for the `@appngin` scope and authenticate with a
GitHub classic personal access token that has `read:packages` access:

```ini
@appngin:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then install the package:

```sh
npm install @appngin/sdk
```

After the first release, set the package visibility to **Public** in the
repository's GitHub Packages settings if it is not made public automatically.

## Usage

```ts
import { createAppNginClient } from "@appngin/sdk";

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
