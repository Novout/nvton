import { LexerKey, LexerResult } from './types';

export class NVTON {
	// TODO: unknown deep type
	private data: Map<LexerKey, unknown>;

	constructor(lexeme: LexerResult) {
		this.data = new Map();
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
}
