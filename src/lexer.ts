import {
	CLOSE_BRACE,
	CLOSE_BRACKET,
	OPEN_BRACE,
	OPEN_BRACKET,
	WRONG_KEY,
} from './constants';
import { parseKey } from './parser';

export const getNVTONType = (str: string) => {
	return str.startsWith(OPEN_BRACE) && str.endsWith(CLOSE_BRACE)
		? 'json'
		: str.startsWith(OPEN_BRACKET) && str.endsWith(CLOSE_BRACKET)
			? 'object'
			: 'default';
};

const getCommonTypeCase = (str: string) => {
	const type = getNVTONType(str);

	if (type === 'default') {
		return {
			data: str,
			type,
		};
	}

	if (type === 'json') {
		return {
			data: parseKey(str),
			type,
		};
	}

	return true;
};

const normalizeStr = (str: string) => str.substring(1, str.length - 1);

// TODO: type
export const lex = (raw: string): any[] => {
	return normalizeStr(raw)
		.split(/,/g)
		.map((str) => {
			const def = getCommonTypeCase(str);

			if (def !== true) return def;

			const tuples = normalizeStr(str)
				.split(/,/g)
				.map((tuple) => {
					const data = normalizeStr(tuple).split('|');

					if (data.length !== 2) return WRONG_KEY;

					const [key, value] = data;

					const _def = getCommonTypeCase(value);

					if (_def !== true)
						return {
							data: {
								key,
								value: _def.data,
							},
							type: _def.type,
						};
					// TODO: support recursive tuple format
					else return WRONG_KEY;
				})
				.filter((tuple) => tuple !== WRONG_KEY);

			return tuples;
		});
};
