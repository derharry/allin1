export let data_fixture = {
    headers: [
        {
            title:  'Estimation Date',
            name:   'estimation_date',
            filter: '',
        },
        {
            title:  'Estimation Type',
            name:   'estimation_type',
            filter: '',
        },
        {
            title:  'Customer',
            name:   'customer_name',
            filter: '',
        },
        {
            title:  'Industry',
            name:   'industry',
            filter: '',
        },
        {
            title:  'Project Name',
            name:   'project_name',
            filter: '',
        },
        {
            title:  'Short project description',
            name:   'project_description',
            filter: '',
        },
        {
            title:  'Business Model <br><small>(B2B, B2C, Marketplace...)</small>',
            name:   'project_businessmodel',
            filter: '',
        },
        {
            title:  'Estimation owner/solution',
            name:   '',
            filter: '',
        },
        {
            title:  'Estimate value ~ <small>(MD)</small>',
            name:   '',
            filter: '',
        },
        {
            title:  'Solutions in Scope <br><small>(incl. components/add. modules used)</small>',
            name:   '',
            filter: '',
        },
        {
            title:  'Integrations to other systems',
            name:   '',
            filter: '',
        },
        {
            title:  'Link to estimation excel <br><small>(not the acquisition folder)</small>',
            name:   '',
            filter: '',
        },
        {
            title:  'Offer Presentation',
            name:   '',
            filter: '',
        },
        {
            title:  'Link to additional useful documents <br><small>e.g. architecture diagram(optional)</small>',
            name:   '',
            filter: '',
        },
        {
            title:  'Contact person for specific topic <br><small>(optional)</small>',
            name:   '',
            filter: '',
        },
        {
            title:  'Feedback <br><small> + / - <br>(optional)</small>',
            name:   'feedback_vote',
            filter: '',
        },
        {
            title:  'Textual Feedback <br><small>(optional)</small>',
            name:   'feedback_textual',
            filter: '',
        },
    ],

    data: [
        {
            'guid': '007',
            'estimation_date': '2022-06-24',
            'estimation_type': 'example',
            'customer_name': 'Stockmann (example)',
            'industry': ['RETAIL'],
            'industry_tags': ['fashion', 'cosmetics', 'Finnish design', 'souvenirs'],
            'project_name': 'Marketplace implementaion',
            'project_description': 'Greenfield implementation of the marketplace business model on top of the running B2B model.',
            'project_businessmodel': 'B2B Marketplace',
            'feedback_vote': {up:0, down:0},
            'feedback_textual': 'its pretty shitty ;-)',
        }
    ],
    
};