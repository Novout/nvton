import {
	CLOSE_BRACE,
	CLOSE_BRACKET,
	COMMA,
	OPEN_BRACE,
	OPEN_BRACKET,
	OPEN_CALL,
	PIPE,
	WRONG_KEY,
} from './constants';
import { parseKey } from './parser';
import { v4 } from 'uuid';
import { LexerResult, LexerType } from './types';

export const getNVTONType = (str: string): LexerType => {
	return str.startsWith(OPEN_BRACE) && str.endsWith(CLOSE_BRACE)
		? 'object'
		: str.startsWith(OPEN_BRACKET) && str.endsWith(CLOSE_BRACKET)
			? 'tuple'
			: str.startsWith(OPEN_CALL)
				? 'function'
				: 'default';
};

const getCommonTypeCase = (str: string) => {
	const type = getNVTONType(str);

	if (type === 'object' || type === 'default') {
		return {
			key: type === 'default' ? str : v4(),
			data: parseKey(str, type),
			type,
		};
	}

	return true;
};

const normalize = (str: string) => str.substring(1, str.length - 1).trim();

const isTuple = (tuple: string) =>
	tuple.startsWith(OPEN_BRACKET) && tuple.endsWith(CLOSE_BRACKET);

export const lex = (raw: string): LexerResult => {
	if (!isTuple(raw)) return [];

	return normalize(raw)
		.split(`${COMMA} `)
		.map((str) => {
			const def = getCommonTypeCase(str);

			if (def !== true) return def;

			if (!isTuple(str)) return [];

			const tuples = normalize(str)
				.split(`${COMMA} `)
				.map((tuple) => {
					const data = normalize(tuple)
						.split(PIPE)
						.map((tg) => tg.trim())
						.filter(Boolean);

					if (data.length < 1 || data.length > 2) return WRONG_KEY;

					const structure =
						data.length === 1
							? { key: data[0], value: data[0] }
							: { key: data[0], value: data[1] };

					const _def = getCommonTypeCase(structure.value);

					if (_def !== true) {
						return {
							key: structure.key,
							data: _def.data,
							type: _def.type,
						};
					}

					// TODO: support recursive tuple format
					return WRONG_KEY;
				})
				.filter((tuple) => tuple !== WRONG_KEY);

			return tuples;
		});
};
