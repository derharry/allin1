<script>
    import { get_files_from_dir } from '$lib/zeelte/io/io.directory.js'
    //import { p } from '$lib/zeelte/inc.utils.js'
    //import * as utils from "$lib/zeelte/inc.utils"

    let files = ['test']

    files = get_files_from_dir('/zeepress/posts/posts')

</script>