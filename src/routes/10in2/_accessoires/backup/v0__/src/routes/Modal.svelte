<script>
	export let dialog
	export let dialog2
</script>
<dialog bind:this={dialog} on:close>
	<slot/>
</dialog>



<div class="ModalWindow">
  <dialog bind:this={dialog2} data-backdrop="static" data-keyboard="false">
    <section>

      <header>
        HEADER
        <button>X</button>

      </header>

      <div class="ModelContent">
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>

      <footer>
        <button on:click={dialog.close()}>
            close
        </button>
        <button>Cancel</button>
        <button>Confirm</button>
      </footer>

    </section>
</dialog>
</div>


<style>

</style>