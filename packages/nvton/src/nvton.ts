import { loadConfig } from 'c12';
import { defu } from 'defu';
import {
	Awaitable,
	DataInternals,
	LexerData,
	LexerKey,
	LexerMap,
	LexerResult,
	Maybe,
	NvtonLoadRunner,
	NvtonOptions,
	UtilsKeyGet,
} from './types';
import { isBrowser, writeFile } from './utils';
import {
	DEFAULT_CONFIG,
	EMPTY,
	EXTENSION,
	FAIL,
	LANG_EXPOSE_INTERNALS,
	LANG_TUPLE_KEY,
} from './constants';

const utils = () => {
	const keySet = (_key: string, runner?: NvtonLoadRunner) => {
		return runner?.isTuple ? `tuple-${_key}` : _key;
	};

	const keyGet = (_key: LexerKey): UtilsKeyGet => {
		return {
			type: _key.startsWith('tuple-') ? 'tuple' : 'common',
			raw: _key.replace(/(tuple-)/g, ''),
		};
	};

	return { keySet, keyGet };
};

export class NVTON {
	private data: Map<LexerKey, LexerMap>;
	private options: NvtonOptions = DEFAULT_CONFIG;

	private loadDefaultConfig(
		options?: NvtonOptions,
		external: boolean = false
	): Awaitable<void> {
		try {
			if (!isBrowser && !external) {
				return new Promise(async (res) => {
					const { config } = await loadConfig({
						name: 'nvton',
						rcFile: false,
						envName: false,
					});

					this.options = defu(defu(options, config), DEFAULT_CONFIG);

					res();
				});
			} else {
				this.options = defu(options, DEFAULT_CONFIG);
			}
		} catch (e) {
			this.options = defu(options, DEFAULT_CONFIG);
		}
	}

	constructor(lexeme?: LexerResult, options?: NvtonOptions) {
		this.data = new Map();
		this.loadDefaultConfig(options);
		if (lexeme) this.load(lexeme, null, { isConstructor: true });
	}

	public load(
		lexeme: LexerResult,
		options: Maybe<NvtonOptions>,
		runner?: NvtonLoadRunner
	) {
		if (options) this.loadDefaultConfig(options, true);

		lexeme.forEach((item) => {
			if (Array.isArray(item)) this.load(item, null, { isTuple: true });
			else {
				const key = runner?.isTuple ? `${LANG_TUPLE_KEY}${item.key}` : item.key;

				this.data.set(key, { value: item.data, type: item.type });
			}
		});
	}

	// TODO: return type with expose internal
	public get<T extends Maybe<boolean>>(
		target: string,
		internals?: T extends true ? DataInternals : LexerData
	) {
		// TODO: language for deep search in foundation
		// TODO: support recursive tuples
		const data = this.data.get(target.replace(LANG_TUPLE_KEY, '')) as Maybe<LexerMap>;
		let quantity = 1;

		// TODO: remove internals option to return type with expose internal target language (e.g: nvton.get('key ?'))
		// const isInternals = target.endsWith(` ${LANG_EXPOSE_INTERNALS}`)
		if (internals) {
			const fail = !!data;

			return {
				value: fail ? FAIL : data!.value,
				type: fail ? 'default' : data!.type,
				fail,
				quantity,
			} as DataInternals;
		}

		return data!.value as LexerData;
	}

	public write(path: string, testmode = false): Awaitable<void | string> {
		if (isBrowser) {
			throw new Error(`Browser setups don't support write function!`);
		}

		let data = '[';

		this.data.forEach((value, key, arr) => {
			const result = String(value);
			const { type, raw } = utils().keyGet(key);
			const max = arr.size - 1;
			let index = 0;
			// TODO: support recursive tuple format
			let deepTuple = 0;

			if (type === 'tuple') {
				if ((deepTuple = 0)) {
					data += `[[${raw}, ${result}]`;
				} else {
					data += `, [${raw}, ${result}]`;
				}
				deepTuple++;
			} else {
				if (deepTuple !== 0) {
					data += `], ${result}`;
				} else {
					data += result;
					data += index === max ? EMPTY : ', ';
				}
				deepTuple = 0;
			}

			index++;
		});

		data += ']';

		if (!testmode) {
			const filepath = path.endsWith(EXTENSION) ? path : `${path}${EXTENSION}`;

			return writeFile(filepath, data);
		} else {
			return data;
		}
	}
}
