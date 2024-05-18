
/* save to delete is in zeelte/form */
export function formBody(body) {
    return [...body.entries()].reduce((data, [k, v]) => {
      let value = v;
      if (v === "true") value = true;
      if (v === "false") value = false;
      if (!isNaN(Number(v))) value = Number(v);
  
      // For grouped fields like multi-selects and checkboxes, we need to
      // store the values in an array.
      if (k in data) {
        const val = data[k];
        value = Array.isArray(val) ? [...val, value] : [val, value];
      }
  
      data[k] = value;
  
      return data;
    }, {});
  }

/* save to delete is in zeelte/form */
  export async function send_request(url, data, method = 'post') { 
    let json_data = JSON.stringify(data);
    console.log(data, new URLSearchParams(data))
    let form_data = Object.keys(data).map((key) => { return "" + key + "=" + data[key]; }).join("&");
    let res = null;
    switch (method) {
        case 'post': 
                res = await fetch(url, {
                    method: 'POST',
                    //headers: { 'Content-type': 'application/x-www-form-urlencoded' }, 
                    headers: { 'Content-type': 'application/json' },
                    //headers: { 'Content-type': 'multipart/form-data' },
                    body: json_data
                })
            break;
        case 'get':
                res = await fetch(url, { method: 'GET' });
            break;
    }        
    json_data = await res.json();
    return json_data;
}