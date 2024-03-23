<script lang="ts">
	import { cl } from '$lib/utils/inc.utils';
	import { Test } from './shared'

	const x = new Test()

	x.count = 1

	x.open()
	x.close()

	/*

	import { data, oncreate, myMethod } from './shared.js';
	
	export default {
		data,
		oncreate,
		methods: {
			myMethod
		}
	};
	*/

</script>

hi {x.count}