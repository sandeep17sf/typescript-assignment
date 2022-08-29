import { request } from "../utils";
let baseUrl = "http://localhost:3000";

export async function getList(filter?: object) {
  let result = await request(baseUrl + "/users", {
    params: filter,
  });
  return result;
}
