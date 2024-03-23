
/**
 * Description
 * @param {any} args:any
 * @returns null
 */
export function p(args: any) {
    console.log(args);
}


export async function send_request_GET(data: []) {

}


export async function send_request_POST(data: object) {
    let json_data: string = JSON.stringify(data);
    const res = await fetch('?delete' , {
        "method": 'POST',
        "headers": { 'Content-Type': 'application/json' },
        "body": json_data
    });
}
