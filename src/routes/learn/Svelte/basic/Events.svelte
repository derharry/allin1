<script>

	// DOM Events
	let mhe = { x: 0, y: 0 };
	let mil = { x: 0, y: 0 };

	function handleMove(event) {
		mhe.x = event.clientX;
		mhe.y = event.clientY;
	}

    // Dispatch Event
	import Inner from './Events-Inner.svelte';
    function handleMessage(event) {
		alert(event.detail.text);
	}

</script>


<h2>DOM Events</h2>
<p>on:pointermove</p>
<div on:pointermove={handleMove}>
	The pointer is at {mhe.x} x {mhe.y}
</div>


<p>Inline</p>
<div
	on:pointermove={(e) => {
		mil = { x: e.clientX, y: e.clientY };
	}}
>
	The pointer is at {mil.x} x {mil.y}
</div>


<p>Component Event (Dispatch)</p>
<Inner on:myMessage={handleMessage} />



<style>
	div {
		/*
		position: fixed;
		left: 0;
		top: 0;
		*/
		width: 100%;
		height: 100%;
		padding: 1rem;
	}
</style>