import { writable, derived } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';



// fixtures
const _dataset_fixtures = [
	{ id: 4, uuid: 'guid01', date: '2023-05-01T08:00:00Z', weigth: 75 },
	{ id: 3, uuid: 'guid02', date: '2023-04-01T08:00:00Z', weigth: 84 },
	{ id: 2, uuid: 'guid03', date: '2023-03-01T08:00:00Z', weigth: 82 },
	{ id: 1, uuid: 'guid04', date: '2023-02-01T08:00:00Z', weigth: 85 },
	{ id: 0, uuid: 'guid05', date: '2023-01-01T08:11:00Z', weigth: 89 },
];


// row schema
let _newrow = {
	id:     0,
	uuid:   '',
	date:   '',
	weigth: 0
}


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
				let newrow = new Array(_newrow);
				newrow.uuid   = uuidv4();
				newrow.date   = correct_date_format( Date.now() );
				newrow.weigth = weigth.toString();
				_dataset = [ newrow, ..._dataset ];
				set( _dataset );
				//console.log('x', _dataset.length)
				return newrow.uuid;
			} else { return false; }
		},
		remove: (uuid) => {
			//console.log(uuid, _dataset.length)
			set( _dataset = _dataset.filter( (row) => row.uuid != uuid) );
			//_datasetChart?.update()
			//console.log(uuid, _dataset.length)			
		},
		update: (uuid, weigth) => {
			if (value_validation(weigth)) {
				let i = _dataset.findIndex((row => row.uuid == uuid ));
				_dataset[i].weigth = weigth;
				set ( _dataset );
				//_datasetChart?.update()
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




//export const datasetChart = createGetChartDataset();
let _datasetChart_fixtures = [
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

let _datasetChart = _datasetChart_fixtures;
function createDatasetChart() {
	let { subscribe, set, update } = writable( _datasetChart );
	_datasetChart[0].data = {};
	_datasetChart[1].data = {};
	_datasetChart[2].data = {};
	// 0 key-value of weight
	let _dataset_copy = _dataset;
	_dataset_copy.reverse()
	_dataset_copy.forEach( (row, i) => {
		//console.log(row.date, row.weigth);
		_datasetChart[0].data[row.date] = row.weigth;
		if (i == 0) {
			_datasetChart[1].data[row.date] = row.weigth
			_datasetChart[2].data[row.date] = '68'        // user_data
		}
		if (i == _dataset.length-1) {
			_datasetChart[1].data[row.date] = row.weigth
			_datasetChart[2].data[row.date] = '68'        // user_data
		}
	})
	return { 
		subscribe,
		update: (val) => { 
			console.log('update..', val)
			set(_datasetChart) 
		},
		datasets: _datasetChart
	}
}
//export let datasetChart = createDatasetChart();
export let datasetChart = derived(dataset, () => createDatasetChart())

