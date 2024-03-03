<script>
</script>

<main>
<table border="1">
    <tr>
        <td colspan="2" class="header">

            <header>
                <table>
                    <tr>
                        <td><h1>ZeePress Austria</h1></td>
                        <td><input type="search" /></td>
                    </tr>
                </table>
            </header>

        </td>
    </tr>
    <tr>
        <td colspan="2" class="nav">

            <nav>
                <ul>
                    <li><a href="/zeepress/aboutme">Über mich</a></li>
                    <li><a href="/zeepress/news">News</a></li>
                    <li><a href="/zeepress/media">Media</a></li>
                    <li><a href="/zeepress/partner">Partner/Links</a></li>
                    <li><a href="/zeepress/contact">Kontakt</a></li>
                    <li></li>
                </ul>
            </nav>

        </td>
    </tr>
    <tr>
        <td class="main">

            <main>
                <slot />
            </main>

        </td>
        <td class="aside">

            <aside>
                <h3>Recent news</h3>
                <ul>
                    <li>links naar news</li>
                </ul>
            </aside>

        </td>
    </tr>
    <tr>
        <td colspan="2" class="footer">

            <footer>
                <div class="box">
                    <ul>
                        <li>René van Zee</li>
                        <li>+43 664 3003 651</li>
                        <li><a href="mailto:rene@zeepress.at">rene@zeepress.at</a></li>
                        <li><a href="/zeepress/impressum">Impressum</li>
                    </ul>
                </div>
                <div class="box">                    
                    <ul>
                        <li>Sport Journalist</li>
                        <li>Media Services</li>
                        <li>Event Consulting</li>
                    </ul>
                </div>
            </footer>

        </td>
    </tr>
</table>
</main>

<style>

    table {
        width: 750px;
        height: 100%;
        max-height: 100%;
    }

    .aside {
        width: 150px;
    }


    .footer {
        background-color: lightgrey;
        text-align:center;
        vertical-align: top;
    }

    footer .box {
        width: 250px;
        min-width: 200px; 
        display: inline-block;
        margin:0 7.5px;
        text-align: left;
        vertical-align:top;
    }


    nav {
    }

    nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: block;
        overflow: hidden;
        background-color: #333
    }

    nav li {
        float: left;
        border-right: 1px solid #bbb;
    }

    nav li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    /* Change the link color to #111 (black) on hover */
    nav li a:hover {
        background-color: #111;
    }

    nav li a:active {
        background-color: #04AA6D;
    }
</style>