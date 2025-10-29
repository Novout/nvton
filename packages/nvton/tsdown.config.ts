import { defineConfig } from 'tsdown';

export default defineConfig({
	entry: 'src/index.ts',
	format: ['esm', 'cjs'],
	target: ['es2015', 'node18'],
	clean: true,
	dts: true,
	external: [],
});
