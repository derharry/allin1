import { db } from '$lib/utils/db.server.connect'


export async function load({ params }) {
	//console.log('load')
	const dataset = await db.users.findMany({})
    //console.log('dataset', dataset)
	return {
		data: dataset
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	addNewUser:  async ({ cookies, request, event }) => {
		const data = await request.formData();
		const firstname = data.get('firstname');
		const lastname  = data.get('lastname');
		const email     = data.get('email');
		const password  = data.get('password');
        const active    = data.get('active');
        //console.log(firstname,data)
		let newrow = await db.users.create({
			data: {
				uuid: crypto.randomUUID(),
                firstname,
                lastname,
                email,
                password,
                active: active ? true : false
			}
		})
		//console.log(newrow)
		return { 
			success: true,
			newuuid: newrow.uuid,
		}
	},
    updateUser: async ({ cookies, request, event }) => {
		const data = await request.formData();
        const uuid = data.get('uuid');
        const firstname = data.get('firstname');
		const lastname  = data.get('lastname');
		const email     = data.get('email');
		const password  = data.get('password');
        const active    = data.get('active');
		//console.log('updateUser', uuid)
        let updaterow = await db.users.update({
            where: {
				uuid: uuid
			},
			data: {
                firstname,
                lastname,
                email,
                password,
                active:  active ? true : false,
			}
        })
		return { 
			success: true
		}
    },
    deleteUser: async ({ cookies, request, event }) => {
		const data = await request.formData();
		const uuid = data.get('uuid');
		//console.log('deleteUser', uuid)
		let x = await db.users.delete({ 
			where: {
				uuid: uuid
			}
		})
		return { 
			success: true
		}
	},
}