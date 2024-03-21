import { readable } from 'svelte/store';

export const menus = readable(() => {
    return: {
        'logged_out': [
            { id: '', name: 'about',    url: './about/',     icon: '<i class="fa-regular fa-address-card fa-xl"></i>' },
            { id: '', name: 'devices',  url: './devices/',   icon: '<i class="fa-solid fa-book fa-xl"></i>' },
            { id: '', name: 'wiki',     url: './wiki/',      icon: '<i class="fa-solid fa-book fa-xl"></i>' },
        ],

        'logged_in': [
            { id: '', name: 'dashboard', url: './dashboard/', icon: '<i class="fa-solid fa-gauge-high fa-xl"></i>' },
            { id: '', name: 'meals',     url: './meals/',     icon: '<i class="fa-solid fa-utensils fa-xl"></i>' },
            { id: '', name: 'dairy',     url: './dairy/',     icon: '<i class="fa-solid fa-calendar-days fa-xl"></i>' },
            { id: '', name: 'dashboard', url: './progress/',  icon: '<i class="fa-solid fa-weight-scale fa-xl"></i>' },
            { id: '', name: 'wiki',      url: './wiki/',      icon: '<i class="fa-solid fa-book fa-xl"></i>' }
        ]
    }

});

export default function menu_data() {
    return {
        logged_out: menus.logged_out,
        logged_in:  menus.logged_in
    }
};
