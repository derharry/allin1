<script>
    // string
	let name = 'world';


    // numeric
	let a = 1;
	let b = 2;


    //checkbox
	let yes = false;

    
    // selectfield
	let questions = [
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	];
	let selected;
	let answer = '';
	function handleSubmit() {
		alert(
			`answered question ${selected.id} (${selected.text}) with "${answer}"`
		);
	}


    // group inputs
	let scoops = 1;
	let flavours = [];
	const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });

</script>

<h1>Bindings</h1>

<p>Text inputs</p>
<p>
    <input bind:value={name} />
    Hello {name}!
</p>


<p>Numeric inputs</p>
<label>
	<input type="number" bind:value={a} min="0" max="10" />
	<input type="range" bind:value={a} min="0" max="10" />
</label>
<label>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>
<p>{a} + {b} = {a + b}</p>


<p>Checkbox inputs</p>
<input type="checkbox" bind:checked={yes}>


<p>Select field</p>
<form on:submit|preventDefault={handleSubmit}>
	<select
		bind:value={selected}
		on:change={() => (answer = '')}
	>
		{#each questions as question}
			<option value={question}>
				{question.text}
			</option>
		{/each}
	</select>

	<input bind:value={answer} />

	<button disabled={!answer} type="submit">
		Submit
	</button>
</form>
<p>
	selected question {selected
		? selected.id
		: '[waiting...]'}
</p>


<p>Checkbox</p>
<p>Size</p>
{#each [1, 2, 3] as number}
	<label>
		<input
			type="radio"
			name="scoops"
			value={number}
			bind:group={scoops}
		/>

		{number} {number === 1 ? 'scoop' : 'scoops'}
	</label>
{/each}
<p>Flavours</p>
{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
	<label>
		<input
			type="checkbox"
			name="flavours"
			value={flavour}
			bind:group={flavours}
		/>

		{flavour}
	</label>
{/each}
<select multiple bind:value={flavours}>
	{#each ['cookies and cream', 'mint choc chip', 'raspberry ripple'] as flavour}
		<option>{flavour}</option>
	{/each}
</select>
{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered {scoops} {scoops === 1 ? 'scoop' : 'scoops'}
		of {formatter.format(flavours)}
	</p>
{/if}





