# AppNgin SDKs

Official client SDKs for the AppNgin API.

Each SDK is generated from the public OpenAPI contract served by the API:

<https://api.appngin.com/v1/openapi/latest.json>

The API repository is the release authority. A release dispatches the
generation workflow here with the expected API version and canonical contract
hash. The generated source and the exact OpenAPI response are committed to the
SDK release tag for reproducibility.

## SDKs

- [TypeScript](./typescript/README.md)

Additional languages can be added as independent packages under this
repository without changing the API release process.

Language-specific source, dependencies, and build tooling stay inside each
package directory. The shared `spec/openapi.json` file is replaced by the
release workflow after it verifies the API-provided version and canonical
SHA-256 hash.

The `api` repository triggers `.github/workflows/release.yml` with a
`repository_dispatch` event. The TypeScript package is published publicly to
the npm registry as `@appnginhq/sdk`; future language packages can add their
own release steps without moving Node/Bun tooling to the root.

## Publishing setup

Configure `@appnginhq/sdk` on npm with the GitHub trusted publisher for the
`appngin/sdk` repository and `release.yml` workflow. The workflow uses OIDC for
normal releases. For the first publish, before the package exists and can have
a trusted publisher, add a granular npm automation token as the repository
secret `NPM_TOKEN`. Remove that secret after trusted publishing is configured.
