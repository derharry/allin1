<script>
    import BtnDelete from "$components/ActionButtons/btnDelete.svelte"
    import BtnCancel from "$components/ActionButtons/btnReset.svelte"
    import BtnSave   from "$components/ActionButtons/btnSave.svelte"
    import BtnEdit   from "$components/ActionButtons/btnEdit.svelte"


    import Modal from "$components/Modal/Modal.svelte"
    import Form  from "$components/Form/Form.svelte"
    let modal = undefined
    let modal_ds_data = {'id':'123', 'name':'xxx'}
    let modal_ds_cols = {
        id   : { text:'',     type: 'Int',    default:'123', placeholder: 'ID',   _is_visible:false },
        name : { text:'Name', type: 'String', default:'yyy', placeholder: 'NAME', _is_visible:true },
    }

    import ModalCrud from "$components/Modal/ModalCRUD.svelte"
    let modalCrud = undefined

	
    import { cl }    from "$lib/utils/inc.utils"

    function click_test() {
        console.log('click_test as callback')
    }
</script>


<div class="ui_panel">
    Page
    <br><br>

    Buttons
    <div class="actionbar">
        <BtnEdit />
        <BtnSave />
        <BtnCancel />
        <BtnDelete style="color:red" />
        <button on:click="{()=>modal.open()}">open Modal</button>
        <button on:click="{()=>modalCrud.open()}">open ModalCrud</button>
    </div>
</div>

<div class="ui_panel">
<Form
    ds_dataset={modal_ds_data} 
    ds_fields ={modal_ds_cols}
>
</Form>
</div>


<Modal bind:this={modal}  title="Page / Home title">
        <Form
            ds_dataset={modal_ds_data} 
            ds_fields ={modal_ds_cols}
        >
        </Form>
</Modal>

<ModalCrud bind:this={modalCrud} title="titleCRUD" show_modal={true}
>
    test
</ModalCrud>


