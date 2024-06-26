import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['**/backup/**',  'backup/**', 'backup/*', 'backup', '/backup', 'src/backup', '**/_accessoires/**',  '_accessoires/**', '_accessoires/*', '_accessoires']
		
	}
});
