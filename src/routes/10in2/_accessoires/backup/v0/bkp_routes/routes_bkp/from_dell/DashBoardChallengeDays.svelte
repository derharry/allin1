<script>
	import Modal from './Modal.svelte';

    // probs
    export let Title = 'x days Challenge - no Coffee';
    export let DaysWon = '5';
    export let ChallengeUUID = 'uuid';

    export let quitChallenge = () => {
        // either post action or register for 
        //alert('oh noooo - '+ChallengeUUID);
        
    };

</script>


<table>
    <tr>
        <th>
            {Title}
        </th>
    </tr>
    <tr>
        <td>
            <div class="beker">
                {DaysWon}
            </div>
        </td>
    </tr>
    <tr>
        <td>
            <button on:click={quitChallenge}>
                I quit
            </button>
        </td>
    </tr>
</table>

<style>
    .beker {
        border: 0px red solid;
        width: 100%;
        height: 150px;

        background-image: url('wincup.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 150px 150px;
        background-position: center;

        padding-top: 25px;
        
        color: darkorange;
        font-size: 35pt;
        font-weight: 600;
        text-align: center;
        vertical-align: top;
    }
</style>