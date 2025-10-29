import { loadConfig } from 'c12';
import { defu } from 'defu';
import { Awaitable, LexerKey, LexerResult, NvtonOptions } from './types';
import { isBrowser, writeFile } from './utils';
import { DEFAULT_CONFIG } from './constants';

export class NVTON {
	// TODO: unknown deep type
	private data: Map<LexerKey, unknown>;
	private options: NvtonOptions = DEFAULT_CONFIG;

	private loadDefaultConfig(options?: NvtonOptions): Awaitable<void> {
		try {
			if (!isBrowser) {
				return new Promise(async (res, rej) => {
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

	constructor(lexeme: LexerResult, options?: NvtonOptions) {
		this.data = new Map();
		this.loadDefaultConfig(options);
		this.set(lexeme);
	}

	private set(lexeme: LexerResult) {
		lexeme.forEach((item) => {
			if (Array.isArray(item)) this.set(item);
			else {
				// TODO: support custom keys
				this.data.set(item.key, item.data);
			}
		});
	}

	public get(target: string) {
		// TODO: simple language for deep search
		return this.data.get(target);
	}

	public write(path: string) {
		if (isBrowser) {
			throw new Error(`Browser setups don't support write function!`);
		}

		const filepath = path.endsWith('.nvton') ? path : `${path}.nvton`;
		// TODO: format .nvton file
		writeFile(filepath, '');
	}
}
