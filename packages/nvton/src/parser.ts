import { destr } from 'destr';
import { LexerType } from './types';

const stringObjectToObject = (raw: string) => {
	return raw
		.replace(/(\w+:)|(\w+ :)/g, (str) => {
			return '"' + str.substring(0, str.length - 1) + '":';
		})
		.replace(/'/g, '"');
};

export function parseKey<T = unknown>(raw: string, type: LexerType = 'default') {
	return destr<T>(type === 'object' ? stringObjectToObject(raw) : raw, { strict: false });
}
