<script>

    // props
    export let answer = '69';

    // spread props $$props
    export let name;
    export let version;
    export let any;

</script>

<h1>Props</h1>
<p>Answer: {answer}</p>
<p>Answer: name: {name} / version:{version} / any:{any} / Test: {$$props.test}</p>

