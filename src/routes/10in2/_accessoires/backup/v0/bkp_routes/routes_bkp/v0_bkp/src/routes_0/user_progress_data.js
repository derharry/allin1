import { readable, writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';


// fixtures
const _dataset_fixtures = [
	{ id: 4, uuid: uuidv4(), date: '2023-05-01T08:00:00Z', weigth: 75 },
	{ id: 3, uuid: uuidv4(), date: '2023-04-01T08:00:00Z', weigth: 84 },
	{ id: 2, uuid: uuidv4(), date: '2023-03-01T08:00:00Z', weigth: 82 },
	{ id: 1, uuid: uuidv4(), date: '2023-02-01T08:00:00Z', weigth: 85 },
	{ id: 0, uuid: uuidv4(), date: '2023-01-01T08:11:00Z', weigth: 89 },
];


// row schema
let _newrow = {
	id:     0,
	uuid:   '',
	date:   '',
	weigth: 0
}


// count
function createCount() {
	const { subscribe, set, update } = writable(0);
	return {
		subscribe,
		increment: () => update((n) => n + 1),
		decrement: () => update((n) => n - 1),
		reset:     () => set(0)
	};
}
export const count = createCount();


//dataset
let _dataset = _dataset_fixtures;
function createDataset() {
	let { subscribe, set, update } = writable( _dataset );
	_dataset.forEach (row => row.date = correct_date_format( row.date ))
	return {
		subscribe,
		insert: (weigth) => {
			if (value_validation(weigth)) {
				//console.log('x', _dataset.length)
				let newrow = _newrow;
				newrow.uuid   = uuidv4();
				newrow.date   = correct_date_format( Date.now() );
				newrow.weigth = weigth.toString();
				_dataset = [ newrow, ..._dataset ];
				set( _dataset );
				//console.log('x', _dataset.length)
				return true;
			} else { return false; }
		},
		remove: (uuid) => {
			//console.log(uuid, _dataset.length)
			set( _dataset = _dataset.filter( (row) => row.uuid != uuid) );
			//console.log(uuid, _dataset.length)			
		},
		update: (uuid, weigth) => {
			if (value_validation(weigth)) {
				let i = _dataset.findIndex((row => row.uuid == uuid ));
				_dataset[i].weigth = weigth;
				set ( _dataset );
				return true;
			} else { return false; }
		}
	}
}
export const dataset = createDataset();


export function value_validation (value) {
	value = value.replace(',', '.')
	if (isNaN(value) || value === '' || value === null)
		return false;
	return true;
}

function correct_date_format(date) {
	let d = new Date(date);
	let res = [ d.getUTCDate(), '.', d.getUTCMonth()+1, '.',' ', d.getUTCHours(), ':',d.getUTCMinutes()]
	res.forEach ( (e, i) => res[i] = Number.isInteger(e) ? ('0'+e).slice(-2) : e )
	res.splice(4, 0, d.getFullYear())
	//console.log(res.join(''))
	return res.join('')
}
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

//export const datasetChart = createGetChartDataset();
let _datasetChart = [
	{
		label: 'Months',
		fill: true,
		borderColor: 'red',
		data: {
			'01.01.2023': 22,
			June: 18,
			December: 24,
		}
	},
	{
		label: 'Goal',
		borderColor: 'green',
		data: {
			February: 25,
			December: 20,
		}
	},
	{
		label: 'baseline',
		borderColor: 'lightgreen',
		data: {
			February: 20,
			December: 20,
		}
	}
]


function createDatasetChart() {
	let { subscribe, set, update } = writable( _datasetChart );
	// 0 key-value of weight
	_dataset[0].data = {};
	_dataset.forEach( (row) => {
		_dataset[0].data[row.date] = row.weigth;
		console.log(row.date, row.weigth);
		//x = { row.date : row.weight }
		//list = { ...list,   }
	})

	return { 
		subscribe,
		datasets: _datasetChart
	}
}
export const datasetChart = createDatasetChart();
