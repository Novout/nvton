import { describe, expect, it } from 'vitest';
import { lex } from '../src/lexer';

describe('LEXER', () => {
	it('expect lex with items', () => {
		expect(lex('[0, 1]')).toEqual([
			{
				data: 0,
				key: '0',
				type: 'default',
			},
			{
				data: 1,
				key: '1',
				type: 'default',
			},
		]);
	});
});
