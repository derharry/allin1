import * as utils from '$lib/utils/inc.utils.js'


export function prepare_new_dataset(ds_fields) {
    const dataset = {}
    Object.entries(ds_fields).forEach(([name, attr]) => {
        if (attr.type != '_internal_')
            dataset[name] = attr.default
        if (name == 'id')
            dataset['id'] = utils.generateUID()
        if (name == 'uuid')
            dataset['uuid'] = utils.generateUID()
    })
    //dataset.email = utils.generateUID()
    return dataset
}


export function x() {}