<script>
    
    let nav_side = [
        { url: '/progress/all', name: 'All', img: '/images/progress_all.jpg' },
        { url: '/progress/weight', name: 'Weight', img: '/images/progress_weight.jpg' },
        { url: '/progress/waist', name: 'Waist', img: '/images/progress_waist.jpg' },
        { url: '/progress/chest', name: 'Chest', img: '/images/progress_chest.jpg' },
        { url: '/progress/hips', name: 'Hips',  img: '/images/progress_hips.jpg' },
        { url: '/progress/thigh', name: 'Thigh', img: '/images/progress_thigh.jpg' },
        { url: '/progress/calf', name: 'Calf', img: '/images/progress_calf.jpg' },
        { url: '/progress/upper_arm', name: 'Upper arm', img: '/images/progress_upper_arm.jpg' },
        { url: '/progress/clothes_size', name: 'Clothes size', img: '/images/progress_clothes_size.jpg' },
        { url: '/progress/neck', name: 'Neck', img: '/images/progress_neck.jpg' },
        { url: '/progress/musle_mass', name: '% Muscle mass', img: '/images/progress_muscle_mass.jpg' },
        { url: '/progress/body_fat', name: '% Body fat', img: '/images/progress_body_fat.jpg' },
        { url: '/progress/bone_mass', name: '% Bone mass', img: '/images/progress_bone_mass.jpg' },
        { url: '/progress/body_water', name: '% Body water', img: '/images/progress_body_water.jpg' },
        { url: '/progress/blood_sugar', name: 'Blood sugar', img: '/images/progress_blood_sugar.jpg' },
        { url: '/progress/blood_insulin', name: 'Blood insulin', img: '/images/progress_blood_insulin.jpg' },
        { url: '/progress/blood_pressure', name: 'Blood pressure', img: '/images/progress_blood_pressure.jpg' },
        { url: '/progress/others', name: 'Other', img: '/images/progress_other.jpg' },
    ]

</script>


<ul class="nav-side">
    {#each nav_side as li}
        <li class="nav-li">
            <a href="{li.url}">
                <img src="{li.img}" alt="" style="">
                <span class="nav-text">{li.name}</span>
                
            </a>
        </li>
    {:else}
        loading...
    {/each}
</ul>


<style>
    .nav-side {
        list-style: none;
        border: 1px black solid;
        padding: 0;
        margin: 0;
    }

    .nav-text {
        padding-left: 5px;
        white-space: nowrap;
    }

    .nav-li {
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
        vertical-align:bottom
    }
</style>