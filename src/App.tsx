import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Button from "@mui/material/Button";
import { Container, Toolbar, Typography } from "@mui/material";
import { faker } from "@faker-js/faker";
import DataTable, { type Column } from "./components/DataTable";
import { dateFormat } from "./utils";
type User = {
  [id: string]: string;
};

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
): User {
  return {
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
function generateData(length: number) {
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
function App() {
  const [dataSource, setDataSource] = useState<User[]>([]);
  const handleLoadData = () => {
    setDataSource(generateData(5));
  };
  let columns: Column[] = [
    {
      label: "First Name",
      dataIndex: "firstName",
    },
    {
      label: "Middle Name",
      dataIndex: "middleName",
    },
    {
      label: "Last Name",
      dataIndex: "lastName",
    },
    {
      label: "Email",
      dataIndex: "email",
    },
    {
      label: "Phone Number",
      dataIndex: "phoneNumber",
      size: "small",
    },
    {
      label: "Role",
      dataIndex: "role",
    },
    {
      label: "address",
      dataIndex: "address",
    },
    {
      label: "Created On",
      dataIndex: "created_at",
      render: (record) => {
        return dateFormat(record.created_at);
      },
    },
    {
      label: "modified",
      dataIndex: "updated_at",
      render: (record) => {
        return dateFormat(record.updated_at);
      },
    },
  ];
  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Users
          </Typography>
          <Button size="small" variant="outlined" onClick={handleLoadData}>
            {!!dataSource?.length ? "Refresh Data" : "Load Data"}
          </Button>
        </Toolbar>
        <DataTable columns={columns} data={dataSource} />
      </Container>
    </div>
  );
}

export default App;
