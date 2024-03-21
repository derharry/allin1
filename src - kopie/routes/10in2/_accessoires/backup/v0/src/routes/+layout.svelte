<script lang="ts">
    import { p } from '$lib/helpers'

    let load;
    let request;

    p('layout', load, request);

</script>


<nav>
    <a href="/">home</a>
    <a href="test/">test</a>
</nav>

<slot>nothing to show</slot>