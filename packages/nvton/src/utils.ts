import path from 'pathe';
import type { Maybe } from './types';
import { existsSync, readFileSync, writeFile as write } from 'fs-extra';

export const getPathResolve = (target: string) => path.resolve(process.cwd(), target);
export const getPathJoin = (target: string) => path.join(process.cwd(), target);

export const writeFile = async (file: string, data: string): Promise<void> => {
	const target = getPathJoin(file);

	await write(target, data, { encoding: 'utf-8' });
};

export const getFile = (target: string): Maybe<string> => {
	const path = getPathResolve(target);

	const existsPath = existsSync(path);

	if (!existsPath) return undefined;

	return readFileSync(path).toString('utf-8') || undefined;
};

export const isBrowser: boolean =
	typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const isNode: boolean =
	typeof process !== 'undefined' &&
	process.versions != null &&
	process.versions.node != null;
