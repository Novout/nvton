import {
	CLOSE_BRACE,
	CLOSE_BRACKET,
	COMMA,
	OPEN_BRACE,
	OPEN_BRACKET,
	OPEN_CALL,
	PIPE,
	SPACE,
	WRONG_KEY,
} from './constants';
import { parseKey } from './parser';
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
		return parseKey(str, type);
	}

	// TODO: support common and arrow functions
	return true;
};

const removeBrackets = (str: string) => str.substring(1, str.length - 1).trim();

const isTuple = (tuple: string) =>
	tuple.startsWith(OPEN_BRACKET) && tuple.endsWith(CLOSE_BRACKET);

export const run = (
	raw: string,
	options?: { init?: { deep?: number; prev?: string; lexeme?: string } }
) => {
	let deep = options?.init?.deep || 0;
	let prev = options?.init?.prev || '';
	let lexeme = options?.init?.lexeme || '';
	const items = [] as string[];

	const setAndReset = () => {
		const target = lexeme.trim();

		if (target === '') return;
		items.push(target);
		lexeme = '';
	};

	for (const key of removeBrackets(raw)) {
		if (key === OPEN_BRACKET) {
			if (deep === 0) setAndReset();
			deep++;
		} else if (key === COMMA && deep === 0) {
			setAndReset();
		}

		if ((![COMMA, SPACE].includes(key) && deep === 0) || deep > 0) lexeme += key;

		if (key === CLOSE_BRACKET) {
			deep--;
			if (deep === 0) setAndReset();
		}

		if (key !== SPACE) prev = key;
	}

	setAndReset();

	return items.map((it) => it.trim());
};

export const lex = (raw: string): LexerResult => {
	if (!isTuple(raw)) return [];

	const normalize = run(raw);

	return normalize.map((str) => {
		const def = getCommonTypeCase(str);

		if (def !== true)
			return {
				key: str,
				data: def,
			};

		if (!isTuple(str)) return [];

		return run(str, { init: { deep: 1 } })
			.map((tuple) => {
				const data = tuple
					.split(PIPE)
					.map((tg) => tg.trim())
					.filter(Boolean);

				if (data.length < 1 || data.length > 2) return WRONG_KEY;

				const structure =
					data.length === 1
						? { key: data[0], value: data[0] }
						: { key: data[0], value: data[1] };

				const _data = getCommonTypeCase(structure.value);

				if (_data !== true) {
					return {
						key: structure.key.replace(/'/g, ''),
						data: _data,
					};
				}

				// TODO: support recursive tuple format
				return WRONG_KEY;
			})
			.filter((tuple) => tuple !== WRONG_KEY);
	});
};
