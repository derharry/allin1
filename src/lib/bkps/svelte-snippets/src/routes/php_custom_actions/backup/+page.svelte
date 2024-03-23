<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import * as utils from "$lib/inc.utils";

    // init view data
    let data = null
    let mounted = false
    let promise = Promise.resolve([])
    let number = -1
    // @ts-ignore
    $: mounted ? utils.p('data', data) : void

    onMount(() => {
        mounted = true
        utils.p('mounted');
        load()
    });

    async function load() {
        utils.p('load()')
        number = 99
        promise = Promise.resolve([])
        promise = await utils.send_request('get', '/api/?getAllData')
        number = promise.number
        utils.p('loaded')
    }

    // @ts-ignore
    function pp(arg) {
        utils.p(arg)
        return arg.toString()
    }

    // @ts-ignore
    async function add(e) {
        utils.p('add()')
        number += 1
        promise = await utils.send_request('get', '/api/?add')
        number = promise.number
    }

    // @ts-ignore
    async function del(e) {
        utils.p('del()')
        number -= 1
        promise = await utils.send_request('get', '/api/?del', {})
        utils.p('res', promise)
        if (promise) {
            number  = promise?.number
        }
    }
</script>

<div>
    <button on:click={add}>+</button>
    <button on:click={del}> - </button>
    <button on:click={load}> ^ </button>

    <pre>
        {#await promise}
            Loading...
        {:then result}
            {number}
            {#if result?.number}
                numb: {result?.number}
            {/if}
        {:catch error}
            {error.message}
        {/await}
    </pre>
</div>

<style>
    div {
        border: black 1px solid;
        display: block;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /*bottom: 50%;*/
    }
</style>