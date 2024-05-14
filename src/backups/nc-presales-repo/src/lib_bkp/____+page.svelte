<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
	import { dataset } from '../routes/stores';

    export let data;

    let datasetView = [];
    let datasetOrg = [];
    let datasetPrev = [];

    let datasetColumns = [
        "Date",
        "Customer",
        "Scope"
    ];

    function addRow() {
        let ts = new Date();
        let newRow = {
            id: Math.floor(ts.getTime()),
            date: ts.toLocaleDateString('sv'),
            customername: 'Name',
            scope: 'prods',
            changed: true
        }
        datasetOrg = [newRow, ...datasetOrg]
    }

    function deleteRow (rowToBeDeleted) {
		datasetOrg = datasetOrg.filter(row => row.id != rowToBeDeleted);
        datasetPrev = Array.from(datasetOrg)
    }

    function saveChanges(rowToBeSaved = 'x') {
        let datasetSave;
        datasetSave = datasetOrg.filter(row => row.changed == true);
        datasetSave.forEach(row => {
            if (row.changed && rowToBeSaved == 'x' || rowToBeSaved == row.id) 
                row.changed = false;
        });
        datasetSave = datasetOrg.filter(row => row.changed == true);
        if (datasetSave.length == 0) {
            datasetPrev = Array.from(datasetOrg)
        }        
        datasetOrg = datasetOrg;
        
    }

    let btnSaveDisabled = true;
    $: {
            datasetView = [...datasetOrg];
            if (JSON.stringify(datasetOrg) != JSON.stringify(datasetPrev)) {
                btnSaveDisabled = false;
            } 
            else if (datasetOrg.length > 0) {
                btnSaveDisabled = datasetOrg.filter(row => row.changed == true).length > 0 ? false : true;
            }
            doFilter();
    }


    let filterSearch = '';
    let filterDate = '';
    let filterCustomerName = '';
    let filterScope = '';
    let x = 1;

    $:{
         x = filterSearch ? 0 : 1; 
         x = filterDate ? 0 : 1; 
         x = filterCustomerName ? 0 : 1; 
         x = filterScope ? 0 : 1; 
         doFilter()
    }

    function doFilter() {
        datasetView = datasetOrg.filter( row => {
            return (
                    row.date.match(`${filterSearch}.*`) ||
                    row.customername.match(`${filterSearch}.*`) ||
                    row.scope.match(`${filterSearch}.*`) 
                   )
                   &&
                   (
                     row.date.match(`${filterDate}.*`) &&
                     row.customername.match(`${filterCustomerName}.*`) &&
                     row.scope.match(`${filterScope}.*`)
                   )
                   ||
                   (
                    row.changed == true
                   )
        })
        return 0;
    }

    onMount(() => {
        console.log(data.data)
		datasetOrg = data.data;
        datasetPrev = Array.from(datasetOrg)
	});

    
</script>



<table>
	<thead>
        <tr>
            <td colspan="3"></td>
            <td>
                <input type="search" name="search" bind:value={filterSearch} placeholder="Search">
            </td>
        </tr>
		<tr>
            {#each datasetColumns as col}
			<th class="tdwidth">{col}</th>
            {/each}
            <th style="text-align: right;">
                <button  on:click={() => addRow()}>add</button>
                <button  on:click={() => saveChanges()} disabled={btnSaveDisabled}>save</button>
            </th>
		</tr>
		<tr>
			<td ><input type="search" name="datefilter" bind:value={filterDate}></td>
			<td ><input type="search" name="customerfilter" bind:value={filterCustomerName}></td>
			<td ><input type="search" name="scopefilter" bind:value={filterScope}></td>
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
