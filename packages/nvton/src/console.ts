import consola from 'consola';

export const success = (content: string) => {
	consola.success(content);
};

export const error = (content: string) => {
	consola.error(content);
};

export const warning = (content: string) => {
	consola.warn(content);
};

export const info = (content: string) => {
	consola.info(content);
};
