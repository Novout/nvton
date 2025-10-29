import { describe, expect, it } from 'vitest';
import { run, lex } from '../src/lexer';

describe('LEXER', () => {
	it('expect get lex with items', () => {
		expect(run('[0, 1]')).toEqual(['0', '1']);
	});
	it('expect get lex with multiple items', () => {
		expect(run("[['key' | { foo: 'foo', bar: 'bar' }]]")).toEqual([
			"['key' | { foo: 'foo', bar: 'bar' }]",
		]);
	});
	it('expect lex with items', () => {
		expect(lex('[0, 1]')).toEqual([
			{
				data: 0,
				key: '0',
			},
			{
				data: 1,
				key: '1',
			},
		]);
	});
	it('expect lex with tuples items', () => {
		expect(lex(`[0, ['key' | { foo: 'foo' }]]`)).toEqual([
			{
				data: 0,
				key: '0',
			},
			[
				{
					data: { foo: 'foo' },
					key: 'key',
				},
			],
		]);
	});
	it('expect lex with multiple tuples items', () => {
		expect(lex(`[['key' | { foo: 'foo', bar: 'bar' }]]`)).toEqual([
			[
				{
					data: { foo: 'foo', bar: 'bar' },
					key: 'key',
				},
			],
		]);
	});
});
