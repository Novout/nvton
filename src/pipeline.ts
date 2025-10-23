import { existsSync, readFileSync } from 'fs-extra';
import { getPath } from './utils';
import { Maybe } from './types';
import { lex } from './lexer';
import { NVTON } from './data';

const getFile = (target: string): Maybe<string> => {
	const path = getPath(target);

	const existsPath = existsSync(path);

	if (!existsPath) return undefined;

	return readFileSync(path).toString() || undefined;
};

const get = (raw: Maybe<string>) => {
	if (!raw) return undefined;

	const data = lex(raw);

	const nvton = new NVTON(data);
};

export const nvton = (raw: string) => {
	get(raw);
};

export const getNvton = (target: string) => {
	const raw = getFile(target);

	if (!raw) return false;

	get(raw);
};

export const readNvton = () => {};
