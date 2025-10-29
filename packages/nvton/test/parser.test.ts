import { describe, expect, it } from 'vitest';
import { parseKey } from '../src/parser';

describe('PARSER', () => {
	it('expect keys to js destr support items', () => {
		expect(parseKey('true')).toEqual(true);
		expect(parseKey('false')).toEqual(false);
		expect(parseKey('undefined')).toEqual(undefined);
		expect(parseKey('null')).toEqual(null);
		expect(parseKey('nan')).toEqual(Number.NaN);
		expect(parseKey('infinity')).toEqual(Number.POSITIVE_INFINITY);
		expect(parseKey('-infinity')).toEqual(Number.NEGATIVE_INFINITY);
		expect(parseKey('foo')).toEqual('foo');
		expect(parseKey('{ "foo": "test", "bar": "test" }', 'object')).toMatchObject({
			foo: 'test',
			bar: 'test',
		});
		expect(parseKey('{ foo: 0, bar: 0 }', 'object')).toMatchObject({ foo: 0, bar: 0 });
	});
});
