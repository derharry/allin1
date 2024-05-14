export const get_category_list = () => {
    let category_list = []
    data.forEach( (item) => {
        if ( ! category_list.includes(item.category) )
            category_list.push(item.category)
    })
    return category_list
}

export const data = [
    {
        name: 'Nederlandse Ambessade in Wenen',
        category: 'Diensten',
        subcategory: 'Ambessade',
        www: '',
        street: 'Opernring 1',
        code: '1010',
        city: 'Vienna',
        country: 'AT',
        tel: '+43 ...',
        fax: '+43 ...',
        email: 'lorem@itsem.at',
        shortinfo: 'kort blabla',
        tags: '',
        text: 'blabla',
    },
    {
        name: 'HEMA',
        category: 'Shopping',
        subcategory: '',
        www: '',
        address: 'meervoudig in oostenrijk',
        shortinfo: 'kort blabla',
        tags: '',
        text: 'blabla',
    },
    {
        name: 'Tandards ...',
        category: 'Arts',
        www: '',
        address: '',
        shortinfo: 'kort blabla',
        tags: '',
        text: 'blabla',
    },
    {
        name: 'Physiotherapeut ...',
        category: 'Arts',
        www: '',
        address: '',
        shortinfo: 'kort blabla',
        tags: '',
        text: 'blabla',
    },
    {
        name: 'Physiotherapeut ...',
        category: 'Arts',
        www: '',
        address: '',
        shortinfo: 'kort blabla',
        tags: '',
        text: 'blabla',
    },
    {
        name: 'English for Children ...',
        category: 'Schoolen',
        www: '',
        address: '',
        shortinfo: 'kort blabla',
        tags: '',
        text: 'blabla',
    },
    {
        name: 'Nederlanse school',
        category: 'Schoolen',
        www: '',
        address: '',
        shortinfo: 'kort blabla',
        tags: '',
        text: 'blabla',
    }
]