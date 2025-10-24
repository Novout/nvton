import { describe, expect, it } from 'vitest';
import { nvton } from '../src/pipeline';

describe('NVTON', () => {
	it('expect NVTON instance exists', () => {
		const data = nvton('[0]');

		expect(data.get('0')).toEqual(0);
	});
	it('expect NVTON instance exists', () => {
		expect(() => nvton('null.nvton')).toThrowError('null.nvton file not found!');
	});
});
