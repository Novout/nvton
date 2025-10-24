import { NVTON } from './data';

export type Maybe<T = void> = T | undefined | null;

export type Nvton = typeof NVTON;

export type LexerType = 'object' | 'tuple' | 'function' | 'default';
export type LexerKey = string | number;
export type LexerCommon = { key: string; data: unknown; type: LexerType };
export type LexerResult = (LexerCommon | LexerCommon[])[];
