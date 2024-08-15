<script>

    // adding data
    let name = 'Svelte'
    let src  = './favicon.png'

    // Nested Components + Styling CSS
    import Nested from "../Nested.svelte";

    //html tags
    let html_string = `this string contains bold <b>HTML</b>.`;

    import Assignments from "../Assignments.sveltenments.svelte";
    import Props from "../Props.svelte";
    import Logic from "../Logic.svelte";
    import LogicPromise from "../Logic-ItemPromise.svelte";
    import Events from "../Events.svelte";
    import Bindings from "../Bindings.svelte";
    import LifeCycle from "../LifeCycle.svelte";
    //import LifeCycleChatbot from "./LifeCycle-Chatbot.svelte";



    // $$props
    let attrs = {
        answer: 'ugh!',
        name: 'hi',
        version: '0.42',
        any: 'props',
        test: 'test-value'
    }
</script>


<hr>
<h1>Welcome / Introduction!</h1>
<p>Hello {name.toUpperCase()}!</p>
<p><img src={src} alt=""></p>
<p><img {src} alt="Logo"></p>
<Nested />
<p>{html_string}</p>
<p>{@html html_string}</p>


<hr>
<Assignments />


<hr>
<Props />
<Props answer={42} name={attrs.name} test="test-42"/>
<Props {...attrs} />


<hr>
<Logic />
<LogicPromise />


<hr>
<Events />

<hr>
<Bindings />

<!--
<hr>
<LifeCycle />
-->







<style>
    img {
        max-width: 30px;
        max-height: 30px;
    }
</style>