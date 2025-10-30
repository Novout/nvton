import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'tsdown';

const pkgPath = fileURLToPath(new URL('./package.json', import.meta.url));
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

export default defineConfig({
	entry: ['src/index.ts'],
	target: ['es2015', 'node18'],
	clean: true,
	dts: true,
	external: [...Object.keys(pkg.dependencies)],
});
