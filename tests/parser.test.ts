import { describe, expect, it } from 'vitest';
import { parseKey } from '../src/parser';

describe('GIT', () => {
	it('expect keys to js destr support items', () => {
		expect(parseKey('true')).toEqual(true);
		expect(parseKey('false')).toEqual(false);
		expect(parseKey('undefined')).toEqual(undefined);
		expect(parseKey('null')).toEqual(null);
		expect(parseKey('nan')).toEqual(Number.NaN);
		expect(parseKey('infinity')).toEqual(Number.POSITIVE_INFINITY);
		expect(parseKey('-infinity')).toEqual(Number.NEGATIVE_INFINITY);
		expect(parseKey('foo')).toEqual('foo');
		// expect(parseKey('{ foo: 0 }')).toMatchObject({ foo: 0 });
	});
});
