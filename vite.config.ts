import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import * as path from 'path';

const config: UserConfig = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$styles: path.resolve('./src/styles'),
			$components: path.resolve('./src/components'),
			$utils: path.resolve('./src/utils'),
			$stores: path.resolve('./src/stores'),
			$assets: path.resolve('./src/assets'),
		},
	},
};

export default config;
