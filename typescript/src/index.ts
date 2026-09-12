import type { Config } from "./generated/client";
import { createClient } from "./generated/client";
import {
	catalogFindOne,
	catalogList,
	catalogListCategories,
	discover,
	openapiLatest,
} from "./generated/sdk.gen";

export type { Config as AppNginClientConfig } from "./generated/client";
export * from "./generated/types.gen";

export const createAppNginClient = (config: Config = {}) => {
	const client = createClient(config);

	return {
		client,
		catalog: {
			list: (options?: Parameters<typeof catalogList>[0]) =>
				catalogList({ ...options, client }),
			listCategories: (options?: Parameters<typeof catalogListCategories>[0]) =>
				catalogListCategories({ ...options, client }),
			findOne: (options: Parameters<typeof catalogFindOne>[0]) =>
				catalogFindOne({ ...options, client }),
		},
		discover: (options?: Parameters<typeof discover>[0]) =>
			discover({ ...options, client }),
		openapi: {
			latest: (options?: Parameters<typeof openapiLatest>[0]) =>
				openapiLatest({ ...options, client }),
		},
	};
};
