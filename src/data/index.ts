import { faker } from "@faker-js/faker";

function createData(
  firstName: string,
  middleName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  role: string,
  address: string,
  updated_at: string,
  created_at: string
) {
  return {
    id: faker.datatype.uuid(),
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    role,
    address,
    updated_at,
    created_at,
  };
}
export function generateData(length: number) {
  let data = [];
  for (let index = 0; index < length; index++) {
    data.push(
      createData(
        faker.name.firstName(),
        faker.name.middleName(),
        faker.name.lastName(),
        faker.internet.email(),
        faker.phone.number("+91 ### ## ##"),
        "user",
        faker.address.city(),
        faker.date.past(10).toISOString(),
        faker.date.past(10).toISOString()
      )
    );
  }
  return data;
}