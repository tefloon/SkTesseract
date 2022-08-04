import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	resolve: {
		alias: {
			'@lib': path.resolve('./src/lib'),
			'@components': path.resolve('./src/lib/components'),
			'@scripts': path.resolve('./src/lib/scripts'),
			'@stores': path.resolve('./src/lib/stores'),
		},
	},
	plugins: [sveltekit()]
};

export default config;
