import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		include: ['packages/**/test/**.test.ts'],
		coverage: {
			provider: 'v8',
			include: ['packages/**/src/**/*.ts'],
			exclude: ['**/constants.ts', '**/types.ts', '**/index.ts'],
		},
	},
});
