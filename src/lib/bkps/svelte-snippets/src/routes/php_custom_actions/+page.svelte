
<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import * as utils from "$lib/inc.utils";

    export let data = null
    export let form = null

    // init view data
    let mounted = false
    let promise = Promise.resolve([])
    let number = -1

    
    $:{
        promise.then( (response) => {
            utils.p('PHP_REQUEST', response)
            //data = response.data
            //form = response.php_request
            //utils.p(data, form)
            number = parseInt(response?.data?.number)
        })
        .catch((error) => {
            utils.p('catch errr', error)
        })
    }
    
    onMount(() => {
        //number  = 1
        mounted = true
        utils.p('mounted');
        load()
    });

    async function load () {
        promise = utils.send_request_GET('/php_custom_actions/api?/load', { number })
    }

    async function add () {
        number += 1
        promise = utils.send_request_POST_json('/php_custom_actions/api?/add', {number, 'foo':'baz'})
    }

    async function del () {
        number -= 1
        promise = utils.send_request_POST_form('/php_custom_actions/api?/del', {number, 'foo':'baz'})
    }

    async function test() {
        promise = utils.send_request_GET('/php_custom_actions/api?test', {number: 69, 'foo':'baz'})
    }

</script>

<h1>Custom Actions (request)</h1>

<div>
    <button on:click={add}> + </button>
    <button on:click={del}> - </button>
    <button on:click={load}> ^ </button>
    <button on:click={test}> t </button>

    <table>
        <tr>
            <th>JSON</th>
            <th>Data</th>
        </tr>
        <tr>
            <td class="left">
                {#await promise}
                    Loading...
                {:then result}
                    Ready {result.data?.number}
                {:catch error}
                    Error {error.message}
                {/await}
            </td>
            <td class="left">
                {number} (local)
                <br>
                {#await promise then result}
                    {result.php_request?.number} (php_request)
                {/await}
                <br>

            </td>
        </tr>
        <tr>
            <td>form<br>
                {form}
            </td>
            <td>data<br>
                {data}
            </td>
        </tr>
    </table>
</div>

<style>
    /*
    div {
        border: black 1px solid;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        /*bottom: 50%; /
    }

    pre {
        width: 100%;
    }
    */

    table {
        width: 100%;
    }

    table td {
        width: 50%;
    }
</style>