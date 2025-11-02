import { destr } from 'destr';
import type { LexerData, LexerType } from './types';

const stringObjectToObject = (raw: string) => {
	return raw
		.replace(/(\w+:)|(\w+ :)/g, (str) => {
			return '"' + str.substring(0, str.length - 1) + '":';
		})
		.replace(/'/g, '"');
};

export function parseKey<T = LexerData>(raw: string, type: LexerType = 'default') {
	// TODO: preserve undefined values for don't throw warning in Map.get() in NVTON Class
	return destr<T>(type === 'object' ? stringObjectToObject(raw) : raw, { strict: false });
}
