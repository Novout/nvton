import { getFile } from './utils';
import { lex } from './lexer';
import { NVTON } from './data';

const get = (raw: string): NVTON => {
	const resolved = (raw.endsWith('.nvton') ? getFile(raw) : raw)?.trim();

	if (!resolved && resolved !== '') {
		throw new Error(`${raw} file not found!`);
	}

	const data = lex(resolved);

	return new NVTON(data);
};

export const nvton = (raw: string) => get(raw);
