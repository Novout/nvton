import { getFile, isBrowser } from './utils';
import { lex } from './lexer';
import { NVTON } from './data';

const get = (raw: string): NVTON => {
	const isFilepath = raw.endsWith('.nvton');

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

	return new NVTON(data);
};

export const nvton = (raw: string) => get(raw);
