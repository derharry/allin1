/*

    export async function addRow() {
        const respon = await fetch('/?add');
        console.log(respon);
        const result = await respon.json();
        console.log(result);
        /*
        let res = await fetch('/?add')
                          .then((response)=> response.json())
                          .then((response)=> console.log(response));
                          /*
        let data = await res.json();
        console.log('x', res);
        let data = await res.json();
        console.log('res', data);
        ** /
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


    */
