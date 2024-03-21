<script lang="ts">
    //import '@picocss/pico'
    //import '../app.css'
</script>

<h1>10in1</h1>



<!--https://www.w3schools.com/css/css_navbar_horizontal.asp-->
<nav>
    <ul>
        <li><a href="10in2/">home </a></li>
        <li><a href="10in2/">Challenges</a></li>
        <li><a href="10in2/">Bodytracker</a></li>
    </ul>
</nav>

<slot />


<style>
    nav {
        position: sticky;
        top: 0px;
        width: 100%;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: block;
        overflow: hidden;
        background-color: #333
    }

    li {
        float: left;
        border-right: 1px solid #bbb;
    }

    li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    /* Change the link color to #111 (black) on hover */
    li a:hover {
        background-color: #111;
    }

    li a:active {
        background-color: #04AA6D;
    }
</style>