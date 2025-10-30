import { defineNuxtPlugin } from '#app';
import { nvton } from 'nvton';

export default defineNuxtPlugin(({ provide }) => {
	provide('nvton', nvton(false));
});
