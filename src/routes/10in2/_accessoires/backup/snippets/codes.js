/*
remove: (uuid) => {
	//let objInd = getIndexOfUUID(uuid);
	//console.log('ff:', objInd);
	console.log('cc1', dataset_fixture.length)
	//dataset_fixture[objInd].slice(objInd, 1);  // dataset_fixture not an array
	//dataset_fixture = dataset_fixture.filter(uuid => uuid !== 'hello'); // cannot reasign
	delete dataset_fixture[objInd];
	console.log('cc2', dataset_fixture.length)
	dataset_fixture[objInd] = null;
	console.log('cc3', dataset_fixture.length)
	dataset_fixture.update(objInd => {
		delete dataset_fixture[objInd];
	});
}
*/
/*
function getSelectedDataIndex(uuid) {
	return dataset.findIndex(obj => {
		return obj.uuid === uuid;
	});
}

function getIndexOfUUID(uuid) {
	//console.log('xx', _dataset.length)
	if (_dataset.length > 0) {
		for (let i=0; i<_dataset.length; i++) {
			if (_dataset[i].uuid == uuid)
				return i;
		}
	}
	return -1;
}
*/
