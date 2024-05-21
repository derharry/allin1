<!--
    Categories
    page of GoldenPages / admin / categories
-->
<script>

    /** @type {import('./$types').PageData} */
	export let data;

    /** @type {import('./$types').ActionData} */
    export let form = {}


    /**
     * containing the list of categories returned by load()
    */
    let category_list = data?.category_list || []
    $: console.log({category_list})    


    /**
     * hidden HTLM Form Element of category by using Svelte-actions
    */
    let frm_update_category

    /**
     * hidden HTLM Form Element to delete any category by using Svelte-actions
    */  
    let frm_delete_category


    /**
     * set the HTMLelement to edit mode
    */
    function handle_dblclick() {
        let div = event.target;
        div.class = "editMode"
        div.contentEditable = true
        // todo editMode css is not taken .. 
        // console.log(div.class)
    }


    /**
     * catch Enter or Tab is pressed and save the changes
    */
    function handle_keydown() {
        let key = event.key;
        let keyCode = event.keyCode;
        //submit the div's content to the edit function if enter or tab is pressed.
        //keyCode == 13 || keyCode == 9 ? edit(event) : null;
        keyCode == 13 || keyCode == 9 ? send_update(event) : '' //alert("the " + keyCode + " was pressed!") : '';
        keyCode == 46 ? send_delete(event) : ''
    }


    /**
     * save the changes and set the element back to read-mode
    */
    function send_update(event) {
        try {
            // reference dom_elements and get content
            let div      = event.target
            let uuid     = div.getAttribute('data-uuid')
            let uuid_sub = div.getAttribute('data-parent-uuid') || null
            let name     = div.innerText

            // prevent default and set back to read-mode
            event.preventDefault();
            div.class = "readMode"
            div.contentEditable = false

            // update db functionality goes here
            // set data into hidden form and submit
            frm_update_category.children.name.value = name
            frm_update_category.children.uuid.value = uuid
            frm_update_category.children.parent_uuid.value = uuid_sub
            frm_update_category.submit()
        } catch (ex) {
            console.log(ex)
        }
    }    


    /**
     * delete the category
    */
    function send_delete(event) {
        try {
            event.preventDefault();

            let div  = event.target
            let uuid = div.getAttribute('data-uuid')

            // set back to read-mode
            div.class = "readMode"
            div.contentEditable = false

            // update db functionality goes here
            // set data into hidden form and submit
            frm_delete_category.children.uuid.value = uuid
            frm_delete_category.submit()
        } catch (ex) {
            console.log(ex)
        }
    }    


</script>
<style>

    @import '../../lib/style.css';

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    span {
        margin-bottom: 10px;
        padding: 5px 10px;
        border-radius: 20px;
        line-height: 40px;
        margin: auto;
    }

    .readMode {
        border: 1px solid orange;
    }

    .editMode {
        background-color: lime;
        border: 3px solid lime;
    }

</style>


    

    <!--
     here are 2 hidden forms to use Svelte-actions for update and delete categories
     there are forms generated into the table list at each main categorie to add a subcategorie
    -->
    <!-- hidden form to update existing categories -->
    <form bind:this={frm_update_category} method="POST" action="?/update_category" style="display:none">
        <input type="text" name="name" value="">
        <input type="text" name="uuid" value="">
        <input type="text" name="parent_uuid" value="">
        <button type="submit">+</button>
    </form>
    <!-- hidden form to delete any category by its uuid -->
    <form bind:this={frm_delete_category} method="POST" action="?/delete_category" style="display:none">
        <input type="text" name="uuid" value="">
        <button type="submit">+</button>
    </form>






<div class="grid">

    <div class="box">
        <!-- form to add main categories -->
        <div class="nowrap">
            <form action="?/insert_category" method="post" >
                <input type="hidden" name="formid" value="add_main_category">
                <input type="text" name="name" placeholder="Add new main category"
                    style="box-sizing: border-box;  max-width:100%"
                    value="{form?.ok == false && form?.formid == 'add_main_category' && form?.data.name || ''}" 
                />
                <button type="submit" style="position:relative; margin-left: -30px"><i class="fa fa-plus"></i></button>
            </form>
        </div>
    </div>

    <!-- show error messages of any form -->
    {#if form?.ok == false}
        <div class="box errorMessage" style="background-color:red">
            <b>Er is een fout gebeurt: </b><br>
            {form.message}
        </div>
    {/if}

</div>

<div class="grid">
    <!--
        List categories with sub-categories
    -->
    {#each Object.entries(category_list) as [uuid, main_cat_attrs] }
        

        {#if uuid != '69' && uuid !=  '42' }

            <div class="box">
                <div class="title">
                    <span 
                        on:dblclick={ () => handle_dblclick() }
                        on:keydown={handle_keydown} 
                        contentEditable="false"
                        class="button readMode"
                        data-uuid="{uuid}"
                        data-parent-uuid=""
                    >
                        {main_cat_attrs.name}
                    </span>
                </div>


                <div class="nowrap">
                    <form action="?/insert_category" method="post" id="insert_subcategory">
                        <input type="hidden" name="formid" value="insert_bcategory">
                        <input type="hidden" name="parent_uuid" value="{uuid}">
                        <input type="text" name="name" value="{form?.name || ''}"
                            style="box-sizing: border-box; max-width:100%"
                        >
                        <button type="submit" style="position:relative; margin-left: -30px"><i class="fa fa-plus"></i></button>
                    </form>
                </div>
                <br>
                
                <!-- todo <p><img src="../lib/images/{category}.jpg" alt="{category}"></p>-->


                <ul>
                    {#each Object.entries(main_cat_attrs.subs) as [ uuid, attrs ] }
                        <li>
                            <span
                                on:dblclick={ () => handle_dblclick() }
                                on:keydown={handle_keydown} 
                                contentEditable="false"
                                class="button readMode"
                                data-uuid="{uuid}"
                                data-parent-uuid="{uuid}"
                            >
                                <button>
                                    {attrs.company_count}
                                </button>
                                &nbsp;
                                {attrs.name}
                            </span>
                        </li>
                    {/each}     
                </ul>            

            </div> 

        
            
        {/if}

    {/each}
</div>

