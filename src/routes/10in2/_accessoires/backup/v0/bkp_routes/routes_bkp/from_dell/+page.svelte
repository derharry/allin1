<script>
    import ProgressWeight from "./ProgressWeight.svelte";
    import WaterIntake from "./WaterIntake.svelte";
    import DashboardFasting from "./DashboardFasting.svelte";
    import Chart from "./Chart.svelte";
    import DashBoardChallengeDays from "./DashBoardChallengeDays.svelte";
</script>

<DashBoardChallengeDays />
<hr>
<Chart />
<hr>
<DashboardFasting />
<hr>
<ProgressWeight />
<hr>
<WaterIntake />


<svelte:head>
<style>
    * {
        
        font-family: arial;
        font-size: 10pt;
        color: grey;
    }
    TABLE {
        width: 200px;
        max-width: 200px;
        border: 1px silver solid;
        box-shadow: 
            0 4px 8px 0 rgba(0, 0, 0, 0.2), 
            0 6px 20px 0 rgba(0, 0, 0, 0.19);
        border-radius: 8px;
        padding: 8px;
    }

    TABLE TH, TABLE TD {
        text-align:center;
        vertical-align:middle;
    }

    TABLE TH {
        font-weight: 400;
    }
</style>
</svelte:head>