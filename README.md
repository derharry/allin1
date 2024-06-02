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


# Use CSS files as default via <link ref="stylesheet" href=""> without the need to do @import '.css' 
# Use Font-Libs via CDN without the need to use an extra JS-Lib

## a) Your own css or any other

in app.html/<head> or with +layout.svelte/<svelte:head>
```
<link rel="stylesheet" href="path_to/your_style.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
```

# b) path_to/your_style.css for bun run dev 
add the absolute path from /src to the file
```
<link rel="stylesheet" href="/src/lib/your_style.css">
<link rel="stylesheet" href="/src/routes/subpages/lib/your_style.css">
``` 

## c) disable all CSS @imports in * pages|components.svelte
if not doing so this import seems to like overwrite previous imports from step a)
thus the @import like from CDN is gone. 
```
/* @import 'path_to/your_style.css'; */
```
Use @import only when you need it in that specific case.

## problem like Font-Awesome Icons are not loading
look at step c)
