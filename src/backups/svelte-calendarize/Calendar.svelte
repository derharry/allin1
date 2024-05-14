<script>

	import calendarize from '$lib/components/svelte-calendarize/index.mjs'
	import Arrow from './Arrow.svelte'

    export let today   = new Date()
    export let year    = today && today.getFullYear()
    export let month   = today && today.getMonth()
    export let day     = today && today.getDay()
    export let day_offset   = 1 // start with Mon

    export let label_days   = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	export let label_months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    $: today_month = today && today.getMonth();
	$: today_year = today && today.getFullYear();
	$: today_day = today && today.getDate();
	$: if (month) create_day_items()

    let prev    = calendarize(new Date(year, month-1), day_offset);
	let current = calendarize(new Date(year, month)  , day_offset);
	let next    = calendarize(new Date(year, month+1), day_offset);

    let day_items = []
    let day_item  = {
        id:    null, 
        text:  null, 
        class: null, 
        isFlippable: null, 
        isFlipped:   null
    }

	function toPrev() {
		[current, next] = [prev, current];
		if (--month < 0) {   month = 11;  year--;  }
		prev = calendarize(new Date(year, month-1), day_offset);
        create_day_items();
	}
	
	function toNext() {
		[prev, current] = [current, next];
		if (++month > 11) {  month = 0;  year++;  }
		next = calendarize(new Date(year, month+1), day_offset);
        create_day_items();
	}

    function isToday(day) {
        //return today  &&  current_year === year  &&  current_month === month  &&  current_day === day;
		return today && today_year === year && today_month === month && today_day === day;
	}

    function create_day_items() {
		day_items = []
		for ( let w=0;  w <= 6;  w++ ) {
			if (current[w]) {
				for ( let d=0;  d <= 7;  d++ ) {
                    let item = {...day_item}
					let day = null

					if (current[w][d]) { day = current[w][d];             item.isflippable = true; if (isToday(day)) item.class = ' today' } 
                    else if (w < 1)    { day = prev[prev.length - 1][d];  item.class="other" }   
					else 			   { day = next[0][d];                item.class="other" }

                    if (day) {
						item.id    = `w${w}d${day}`
                        item.text  = day
                        day_items.push(item)
                    }
                }
            }
        }
        day_items = day_items;
    }

    function flip_day(item) {
        item.flipped = !item.flipped
    }

</script>

<main>
    <header>
        <Arrow left on:click={toPrev} />
        <span class="header_label">{label_months[month]} {year}</span>
        <Arrow on:click={toNext} />
    </header>

    <div class="month">
        {#each label_days as txt, idx (txt)}
            <span class="label">{ label_days[(idx + day_offset) % 7] }</span>
        {/each}

        {#each day_items as item (item.id)}
            <span 
                class="date {item.class} {item.flipped ? 'flipped': ''}"
                on:click={() => {
                    if (item.isflippable) { 
                        flip_day(item); 
                        item=item; 
                    } 
                }}
            >
                {item.text}
            </span>
        {/each}
    </div>

</main>


<style>

	header {
		display: flex;
		margin: 0.25rem auto;
		align-items: center;
		justify-content: center;
		user-select: none;
	}

    .header_label {
		display: block;
		text-align: center;
		text-transform: uppercase;
		font-size: 100%;
		margin: 0 1rem;
	}

	.month {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		text-align: center;
		grid-gap: 4px;
	}
	
	.label {
		font-size: 75%;
		font-weight: 400;
		text-align: center;
		text-transform: uppercase;
		margin-bottom: 0.5rem;
		opacity: 0.6;
	}


    
	
	.date {
		width: 2rem;
		height: 1.5rem;
		font-size: 16px;
		letter-spacing: -1px;
		border: 1px solid #e6e4e4;
		font-weight: 700;
		padding: 0rem 0.1rem;
		text-align: center;
		user-select: none;
		border-radius: 8px;
		cursor: pointer;
	}
	
	.date.today {
		color: #5286fa;
		background: #c4d9fd;
		border-color: currentColor;
	}
	
	.date.other {
		opacity: 0.2;
	}

    .flipped {
        background-color: green;
    }


</style>