import { App, ComponentInternalInstance, getCurrentInstance, Plugin } from 'vue-demi';
import { nvton, NvtonOptions, type Nvton } from 'nvton';

export const NVTONPlugin: Plugin = {
	install: (app: App, options: NvtonOptions = {}) => {
		app.config.globalProperties.$nvton = nvton(false, options);
	},
};

declare module 'vue' {
	interface ComponentCustomProperties {
		$nvton: Nvton;
	}
}

export const useNvton = (): Nvton => {
	const instance = getCurrentInstance();

	if (!instance) {
		console.warn('[VUE-PDFEASY] - Vue instance not exists. Hook is in setup() context?');
	}

	const pdf = (instance as ComponentInternalInstance).appContext.config.globalProperties
		.$nvton;

	return pdf;
};
