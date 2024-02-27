

<nav>
    <ul>
        <li><a href="/">home </a></li>
        <li><a href="/myhp">MyHP</a></li>
        <li><a href="/10in2">10in2</a></li>
        <li><a href="/office-event">Athletes-Office</a></li>
        <li><a href="/office-surf">Surf-Office</a></li>
        <li><a href="/zeepress">ZeePress</a></li>
        <!--
        <li><a href="/svelteshowcase">Showcase</a></li>
        <li><a href="/software">software</a></li>
        <li><a href="/aboutme">over mij</a></li>
        <li><a href="/">test</a></li>
        -->
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