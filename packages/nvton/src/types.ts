import { NVTON } from './nvton';

export type Maybe<T = void> = T | undefined | null;
export type Awaitable<T = void> = T | Promise<T>;

export type Nvton = NVTON;

export type LexerType = 'object' | 'tuple' | 'function' | 'default';
export type LexerKey = string;
// TODO: deep type structure
export type LexerData = unknown;
export type LexerMap = { value: LexerData; type: LexerType };
export type LexerCommon = { key: string; data: LexerData; type: LexerType };
export type LexerResult = (LexerCommon | LexerCommon[])[];
export interface DataInternals {
	value: LexerData;
	type: LexerType;
	fail: boolean;
	quantity: number;
}

export interface NvtonOptions {}

export interface NvtonLoadRunner {
	isConstructor?: boolean;
	isTuple?: boolean;
}

export interface UtilsKeyGet {
	type: 'tuple' | 'common';
	raw: string;
}
