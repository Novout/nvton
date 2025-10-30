import { getFile, isBrowser } from './utils';
import { lex } from './lexer';
import { NVTON } from './nvton';
import { NvtonOptions } from './types';
import { DEFAULT_CONFIG, EXTENSION } from './constants';

const get = (raw: string | false, options?: NvtonOptions): NVTON => {
	if (!raw) return new NVTON(undefined, options ?? DEFAULT_CONFIG);

	const isFilepath = raw.endsWith(EXTENSION);

	if (isFilepath && isBrowser) {
		throw new Error(
			'get() function only support read files in node, bun or deno environments.'
		);
	}

	const resolved = (isFilepath ? getFile(raw) : raw)?.trim();

	if (!resolved) {
		throw new Error(`${raw} file not found or datatype is wrong!`);
	}

	const data = lex(resolved);

	return new NVTON(data, options ?? DEFAULT_CONFIG);
};

export const nvton = (raw: string | false, options?: NvtonOptions) => get(raw, options);
