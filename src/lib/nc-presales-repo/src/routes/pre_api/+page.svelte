<script>
    import { v4 } from 'uuid';
    import { onMount } from 'svelte';

    // get data from +page.server.js
    export let data = undefined;
    export let form = undefined;

    // init values
    let mounted = false;
    let datasetView = [];
    let datasetOrg  = [];
    let datasetPrev = [];

    // init view items (view = Dom)
    let viewInputFilterSearch = '';
    let viewInputFilterDate = '';
    let viewInputFilterCustomerName = '';
    let viewInputFilterScope = '';

    const newDataRow = () => {
        let ts = new Date();
        return { 
            id: v4(), //Math.floor(ts.getTime()),
            date: ts.toLocaleDateString('sv'),
            customername: 'name',
            scope: 'prods',
            changed: true,
            new: true
        }
    }

    let datasetColumnNames = [
        "Date",
        "Customer",
        "Scope"
    ];

    onMount(() => {
        console.log('mounted');
        console.log(data)
		datasetOrg  = Array.from(data.data);
        datasetPrev = Array.from(data.data)
        mounted = true;
	});

    // computed props
    let viewButtonSaveChangesDisabled = true;
    $: {
        if (mounted) {
            console.log('savebutton en/disable')
            // update the view data when Org has changed
            datasetView = [...datasetOrg];
            // dis-/enable the save button
            let disabled = true;
            if (JSON.stringify(datasetOrg) != JSON.stringify(datasetPrev))
                disabled = false;
            else if (datasetOrg.length > 0) 
                disabled = datasetOrg.filter(row => { row.changed == true || row.new == true }).length > 0 ? false : true;
            viewButtonSaveChangesDisabled = disabled;
            doFilter();
        }
    }

    // do filter on textField changes
    $:{
        if (mounted) {
            console.log('viewInputFilter changes');
            let x = undefined;
            x = viewInputFilterSearch ? 0 : 1; 
            x = viewInputFilterDate ? 0 : 1; 
            x = viewInputFilterCustomerName ? 0 : 1; 
            x = viewInputFilterScope ? 0 : 1; 
            doFilter()
        }
    }

    function doFilter () {
        if (mounted) {
            datasetView = datasetOrg.filter( row => {
            return (
                    row.date.toString().match(`${viewInputFilterSearch}.*`) ||
                    row.customername.match(`${viewInputFilterSearch}.*`) ||
                    row.scope.match(`${viewInputFilterSearch}.*`) 
                )
                &&
                (
                    row.date.toString().match(`${viewInputFilterDate}.*`) &&
                    row.customername.match(`${viewInputFilterCustomerName}.*`) &&
                    row.scope.match(`${viewInputFilterScope}.*`)
                )
                ||
                (
                    row.changed == true
                    ||
                    row.new == true
                )
            })
        }
    }
    
    async function addRow() {
        console.log('row-add');
        let newrow =newDataRow();
        datasetOrg = [newrow, ...datasetOrg]
        let res = await fetch('/?add=',{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        send_request(newrow)
    }

    async function deleteRow(rowToBeDeleted) {
        console.log('row-delete', rowToBeDeleted);
        datasetOrg = datasetOrg.filter(row => row.id != rowToBeDeleted);
        datasetPrev = Array.from(datasetOrg)
    }

    async function saveChanges(rowToBeSaved = 'all') {
        let datasetSave = [];
        console.log('row-save', rowToBeSaved);
        datasetSave = datasetOrg.filter(row => row.changed == true || row.new == true);
        datasetSave.forEach(row => {
            if ((row.changed || row.new) && (rowToBeSaved == row.id || rowToBeSaved == 'all')) {
                row.changed = false;
                row.new = false;
            }
        });
        datasetSave = datasetOrg.filter(row => row.changed == true);
        if (datasetSave.length == 0) {
            datasetPrev = Array.from(datasetOrg)
        }        
        datasetOrg = datasetOrg;
    }

    export async function send_request(data, method = 'post') {
    data = JSON.stringify(data);
    const res = await fetch('?delete' ,{
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
    });
    /*
        const res = await fetch('?delete' ,{
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: JSON.stringify({
                id: rowToBeDeleted
            })
        });
        */

        //const res = await fetch('/?delete='+rowToBeDeleted, {
        //    method: 'POST',
        //    body: JSON.stringify({
        //        id: rowToBeDeleted
        //    })
        //});

        //let res = await fetch('/?delete='+rowToBeDeleted,{headers: {Accept: 'application/json'}})
        //    .then (response => response.json())
        //    .then (console.log)
        //console.log(res)
        //let data = await res.json();
        //console.log(data)
}

</script>



<table>
	<thead>
        <tr>
            <td colspan="3"></td>
            <td>
                <input type="search" name="search" bind:value={viewInputFilterSearch} placeholder="Search">
            </td>
        </tr>
		<tr>
            {#each  datasetColumnNames as col}
			<th class="tdwidth">{col}</th>
            {/each}
            <th style="text-align: right;">
                <button  on:click={() => addRow()} formaction="?/add">add</button>
                <button  on:click={() => saveChanges()} disabled={viewButtonSaveChangesDisabled}>save</button>
            </th>
		</tr>
		<tr>
			<td ><input type="search" name="datefilter" bind:value={viewInputFilterDate}></td>
			<td ><input type="search" name="customerfilter" bind:value={viewInputFilterCustomerName}></td>
			<td ><input type="search" name="scopefilter" bind:value={viewInputFilterScope}></td>
			<td>&nbsp;</td>
		</tr>
	</thead>
	<tbody>
        {#each datasetView as row }
        <tr class="changed{row.changed}">
            <td contenteditable="true" bind:innerHTML={row.date}   on:input={() => row.changed=true}></td>
            <td contenteditable="true" bind:innerHTML={row.customername}   on:input={() => row.changed=true}></td>
            <td contenteditable="true" bind:innerHTML={row.scope}  on:input={() => row.changed=true}></td>
            <td style="text-align: right;">
                <button  on:click={() => saveChanges(row.id)} disabled={row.changed ? false : true }>save</button>
                <button  on:click={() => deleteRow(row.id)}>delete</button>
            </td>
        </tr>
        {/each}
		<tr class="spacer">
            <td colspan="2"><pre>{JSON.stringify(datasetOrg, null, 2)}</pre></td>
            <td colspan="2"><pre>{JSON.stringify(datasetPrev, null, 2)}</pre></td>
        </tr>
	</tbody>
	<tfoot>
        <tr>
		    <td>foot</td>
		    <td>foot</td>
		    <td>foot</td>
		    <td>foot</td>
        </tr>
	</tfoot>
</table>



<style>
	table {
		width: 100%;
		height: 100%;
		border: 1px black solid;
		table-layout: fixed;
		border-collapse: collapse;
        background-color: darkgray;
	}

	th,
	td {
        text-align: left;
		padding: 8px 16px;
		border: 1px solid #ccc;
	}

    .tdwidth {
        min-width: 199px;
        max-width: 200px;
    }
    thead {
		position: sticky; /* make the table heads sticky */
		top: 0px; /* table head will be placed from the top of the table and sticks to it */
    }
	thead th {
		background: #eee;
        text-align: center;
	}

    thead td {
        padding: 0px;
    }

    thead input {
        padding: 0px;
        margin: 0px;
        width: 99%;
		border: 1px solid #ccc;
    }

    tfoot td {
        background: #eee;
        position: sticky; /* make the table heads sticky */
        bottom: 0px; /* table head will be placed from the top of the table and sticks to it */
    }

    tbody {
        overflow-y: auto; /* make the table scrollable if height is more than 200 px  */
    }

    tbody .spacer {
        height: 100%;
    }

    tbody .changedtrue {
        background-color: orange;
    }

</style>
