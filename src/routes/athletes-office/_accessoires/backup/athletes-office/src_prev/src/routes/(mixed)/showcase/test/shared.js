import { cl } from '$lib/utils/inc.utils'

export class Test {


    count = 0

    constructor() {}


    close () {
        cl('close')
    }
    
    open() {
        cl('open')
    }
}
