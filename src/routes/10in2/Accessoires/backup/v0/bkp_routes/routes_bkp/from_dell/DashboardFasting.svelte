<script>
    import { onMount, onDestroy } from "svelte";
    
    // Store vars
    let dsFastingPeriods = [{}]

    let state = false;
    let timer_togo = '00:00:00';
    let timer_done = '00:00:00';

    var seconds_up   = 0;
    var seconds_down = 0;
    var timer_up     = null;
    var timer_down   = null;


    //https://refine.dev/blog/sveltekit-crud-app-with-svelte-mui/
    //https://hardiquedasore.medium.com/simplest-way-to-add-a-leading-zero-to-a-number-in-javascript-b8724749486f
    //https://linuxhint.com/javascript-count-up-timer/

    function upTimer() {
        ++seconds_up;
        timer_done = retTimerValue(seconds_up);
    }

    function downTimer() {
        --seconds_down;
        timer_togo = retTimerValue(seconds_down);
    }

    function retTimerValue(seconds) {
        let hour   = Math.floor(seconds / 3600);
        let minute = Math.floor((seconds - hour * 3600) / 60);
        let second = seconds - (hour * 3600 + minute * 60);
        return ("0"+hour).slice(-2) + ":" + ("0"+minute).slice(-2) + ":" + ("0"+second).slice(-2); 
    }

    function startPeriod() {
        state = true;
        startTimers();
    }

    function endPeriod() {
        state = false;
        stopTimers();
    }

    function startTimers() {
        if (timer_up   === null) timer_up   = setInterval(upTimer,   1000);
        if (timer_down === null) timer_down = setInterval(downTimer, 1000);
    }

    function stopTimers() {
        if (timer_up   !== null) { clearInterval(timer_up);   timer_up   = null; }
        if (timer_down !== null) { clearInterval(timer_down); timer_down = null; }
    }

	onMount(  () => {  startTimers() });
    onDestroy(() => {  stopTimers()  })
</script>


<table>
    <tr>
        <td align="center">Fasting period</td>
    </tr>
    <tr>
        <td align="center"><img src="" alt="donut graph" width="150" height="150" /></td>
    </tr>
    <tr>
        <td align="center">{state}</td>
    </tr>
    <tr>
        <td align="center">{timer_togo}</td>
    </tr>
    <tr>
        <td align="center">{timer_done}</td>
    </tr>
    <tr>
        <td align="center">
            <input type="datetime-local" name="start_datetime" value="">
            <br>
            <input type="datetime-local" name="end_datetime"   value="">
        </td>
    </tr>
    <tr>
        <td align="center">
            <button on:click={startPeriod}>Start</button>
            <button on:click={endPeriod}>Stop</button>
        </td>
    </tr>
</table>