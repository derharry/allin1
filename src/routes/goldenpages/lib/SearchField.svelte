<script>

    export let name = '';
    export let value = '';
    export let placeholder = '';

</script>


<div class="inner-addon left-addon">
    <i class='icon fa fa-search'></i>
    <input type="text" class="form-control" 
        name={name}
        placeholder={placeholder}
        bind:value={value}
    />
</div>


<style>

    div {
        width: 100%;
        background-color: transparent;
    }

    input {
        /* outline: null; */
        padding: 5px 0px;
        border-radius: 10px;
        width: 100%;
        box-sizing: border-box; /* Include padding and border in the element's total width and height */
    }

    /* enable absolute positioning */
    .inner-addon { 
        position: relative; 
        margin: 10px;
    }

    /* style icon */
    .inner-addon .icon {
        position: absolute;top: 50%; /* Position the icon at 50% from the top */
        transform: translateY(-50%); /* Adjust for vertical centering */
        
        padding: 4px 10px;
        pointer-events: none;
    }

    /* align icon */
    .left-addon  .icon  { left:  0px;}
    .right-addon .icon  { right: 0px;}

    /* add padding  */
    .left-addon  input  { padding-left:  30px; }
    .right-addon input  { padding-right: 30px; }

</style>