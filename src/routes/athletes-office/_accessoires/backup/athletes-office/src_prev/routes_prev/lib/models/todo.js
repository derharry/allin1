class Todo {        
	guid = ''
	text = ''
	todo_by = ''
	date_untill  = ''
	date_created = ''
	date_changed = ''

	constructor (text) {
		this.guid = crypto.randomUUID();
		this.text = text
	}
}