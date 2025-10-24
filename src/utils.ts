import path from 'pathe';
import { Maybe } from './types';
import { existsSync, readFileSync } from 'fs-extra';

export const getPath = (target: string) => path.resolve(process.cwd(), target);

export const getFile = (target: string): Maybe<string> => {
	const path = getPath(target);

	const existsPath = existsSync(path);

	if (!existsPath) return undefined;

	return readFileSync(path).toString() || undefined;
};
