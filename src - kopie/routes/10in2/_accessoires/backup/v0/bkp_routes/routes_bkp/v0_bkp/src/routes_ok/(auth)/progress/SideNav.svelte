<script>
    
    let nav_side = [
        { id: '', name: 'All', img: 'progress_all.jpg' },
        { id: 'progress/weight', name: 'Weight', img: 'progress_weight.jpg' },
        { id: 'progress/waist', name: 'Waist', img: 'progress_waist.jpg' },
        { id: '', name: 'Chest', img: 'progress_chest.jpg' },
        { id: '', name: 'Hips',  img: 'progress_hips.jpg' },
        { id: '', name: 'Thigh', img: 'progress_thigh.jpg' },
        { id: '', name: 'Calf', img: 'progress_calf.jpg' },
        { id: '', name: 'Upper arm', img: 'progress_upper_arm.jpg' },
        { id: '', name: 'Clothes size', img: 'progress_clothes_size.jpg' },
        { id: '', name: 'Neck', img: 'progress_neck.jpg' },
        { id: '', name: '% Muscle mass', img: 'progress_muscle_mass.jpg' },
        { id: '', name: '% Body fat', img: 'progress_body_fat.jpg' },
        { id: '', name: '% Bone mass', img: 'progress_bone_mass.jpg' },
        { id: '', name: '% Body water', img: 'progress_body_water.jpg' },
        { id: '', name: 'Blood sugar', img: 'progress_blood_sugar.jpg' },
        { id: '', name: 'Blood insulin', img: 'progress_blood_insulin.jpg' },
        { id: '', name: 'Blood pressure', img: 'progress_blood_pressure.jpg' },
        { id: '', name: 'Other', img: 'progress_other.jpg' },
    ]

</script>

<ul class="nav-side">
    <table align="center">
        {#each nav_side as li}
            <!--<li><img src="{li.img}" alt=""> {li.name}</li>-->
            <tr>
                <td align="center" valign="middle"><img src="{li.img}" alt=""></td>
                <td align="left"   valign="middle" class="nav-text"><a href="{li.id}">{li.name}</a></td>
            </tr>
        {:else}
            loading...
        {/each}
    </table>
</ul>

<style>
    .nav-side {
        list-style: none;
    }

    .nav-text {
        padding-left: 10px;
        white-space: nowrap;
    }

    .nav-side a {
        text-decoration: none;
    }

    .nav-side a:hover {
        text-decoration: underline;
    }
    
    .nav-side IMG {
        width:  20px;
        height: 20px;
    }
    .nav-side TD {
        vertical-align: middle;
    }
</style>