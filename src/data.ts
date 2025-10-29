import { LexerKey, LexerResult, NvtonOptions } from './types';
import { writeFile } from './utils';

export class NVTON {
	// TODO: unknown deep type
	private data: Map<LexerKey, unknown>;
	private options: NvtonOptions;

	constructor(lexeme: LexerResult) {
		this.data = new Map();
		this.options = {};
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
		const filepath = path.endsWith('.nvton') ? path : `${path}.nvton`;
		// TODO: format .nvton file
		writeFile(filepath, '');
	}
}
