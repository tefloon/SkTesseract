// import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		alias: {
			"$lib": "src/lib",
			"$components": "src/lib/components",
			"$scripts": "src/lib/scripts",
			"$stores": "src/lib/stores",
			"$shared": "src/lib/components/shared",
		}
	},
};

export default config;
