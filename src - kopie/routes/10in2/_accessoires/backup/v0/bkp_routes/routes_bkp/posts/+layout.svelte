<div class="posts">

<aside class="">
    <h4>Posts</h4>
<ul>
    <li><a href="/posts/1">post 1</a></li>
    <li><a href="/posts/2">post 2</a></li>
</ul>
</aside>

<main>
    <slot />
</main>
</div>

<style>
    .posts {
        display: grid;
        gap: 2rem;
        grid-template-columns: 100px 60ch;
        margin-top: 2rem;
    }
</style>