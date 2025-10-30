import path from 'pathe';
import { Awaitable, Maybe } from './types';
import { existsSync, readFileSync, writeFileSync } from 'fs-extra';

export const getPathResolve = (target: string) => path.resolve(process.cwd(), target);
export const getPathJoin = (target: string) => path.join(process.cwd(), target);

export const writeFile = (file: string, data: string): Awaitable<void> => {
	const target = getPathJoin(file);

	writeFileSync(target, data);
};

export const getFile = (target: string): Maybe<string> => {
	const path = getPathResolve(target);

	const existsPath = existsSync(path);

	if (!existsPath) return undefined;

	return readFileSync(path).toString('utf8') || undefined;
};

export const isBrowser: boolean =
	typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const isNode: boolean =
	typeof process !== 'undefined' &&
	process.versions != null &&
	process.versions.node != null;
