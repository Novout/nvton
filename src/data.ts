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
				this.data.set(item.key, item.data);
			}
		});
	}

	public get(target: number | string) {
		if (typeof target === 'number') {
			return target;
			/*
			let index = 0;

			this.data.forEach((value, key) => {
				if (index === target) return value;

				index++;
			});

			// TODO: better tracking
			return undefined;
      */
		}

		return this.data.get(target);
	}
}
