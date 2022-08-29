import { User } from "../App";

type RequestOptions =  {
    params?: object,
    method?: string,
    body?: object, 
}
interface serializeObj {
    [id: string]: any;
}
const serialize = function(obj: serializeObj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        let value = obj[p]
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(value));
      }
    return str.join("&");
  }
export async function request(url: string,options?: RequestOptions): Promise<Object>{
    const { params } = options || {};
    let queryString = "";
    if(params){
        queryString = serialize(params || {});
        url = url+"?"+queryString;
    }
    let requestOptions = {}
    let response = await fetch(url,requestOptions);
    const result = await response.json();
    return result as User[];
}
