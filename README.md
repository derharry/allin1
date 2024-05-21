# allin1


## problems
* with package dependencies
* with primsa and mysql 
- reinstall all by executing z_reinstall.sh


## enable local lib zeelte
add alias to svelte.config.js/kit
```
	kit: {
		alias: {
			$zeelte: path.resolve("../zeelte/src/lib"),
		}
	}
```


## disable unused css
add following to svelte.config.js/config
https://github.com/sveltejs/language-tools/issues/650#issuecomment-1729917996
```
const config = {
    onwarn: (warning, handler) => {
        if (warning.code === 'css-unused-selector') {
            return;
        }
        handler(warning);
    },
}
```


## exclude directories from dev or build 
add test/exclude to vite.config.js
```
export default defineConfig({
	test: {
		exclude: ['**/backup/**',  'backup/**', 'backup/*', 'backup', '/backup', 'src/backup', '**/_accessoires/**',  '_accessoires/**', '_accessoires/*', '_accessoires']
	}
});
```




Svelte Snippets

+page.svelte
import { page } from '$app/stores'
const url_param_show = $page.url.searchParams.get('show')

https://stackoverflow.com/questions/69922685/how-to-set-menu-item-to-active-in-sveltekit-app
class:active={$page.url.pathname.includes('goldenpages/admin')}

page is a store like object that among other things hold the current path, it will automatically be updated with the new path
as a bonus:
class:active is an easy shorthand, removing that ternary expression there.