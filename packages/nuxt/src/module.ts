import { fileURLToPath } from 'url';
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit';
import { type Nvton, type NvtonOptions, DEFAULT_CONFIG } from 'nvton';
import { defu } from 'defu';

export default defineNuxtModule<NvtonOptions>({
	meta: {
		name: 'nuxt-nvton',
		configKey: 'nvton',
		compatibility: {
			nuxt: '>=4.0.0',
		},
	},
	defaults: DEFAULT_CONFIG,
	setup(options, nuxt) {
		const { resolve } = createResolver(import.meta.url);
		const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url));

		nuxt.options.build.transpile.push(runtimeDir);
		nuxt.options.runtimeConfig.public.nvton = defu(
			nuxt.options.runtimeConfig.public.nvton ?? DEFAULT_CONFIG,
			options
		);

		addPlugin(resolve(runtimeDir, 'plugin'));
	},
});

declare module '#app' {
	interface NuxtApp {
		$nvton: Nvton;
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$nvton: Nvton;
	}
}
