import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import Button from "@mui/material/Button";
import {
  Container,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import DataTable, { type Column } from "./components/DataTable";
import { DateFormatter } from "./utils";
import  * as userService from "././service/user";
export enum Role {
  SUPERADMIN = "SuperAdmin",
  ADMIN = "Admin",
  SUBSCRIBER = "Subscriber",
}

export type User = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role;
  address: string;
  updated_at: string;
  created_at: string;
};


function App() {
  const [dataSource, setDataSource] = useState<User[]>([]);

  const handleLoadData = async () => {
    let data = await userService.getList()
    console.log(data)
    setDataSource(data as User[]);
  };
  const handleRemoveUser = (id: number) => {
    let oldData = [...dataSource];
    oldData = oldData.filter((item) => item.id !== id);
    setDataSource(oldData);
  };

  const handleRowSave = (values: User) => {
    const { id } = values;
    let oldData = [...dataSource];
    let index = oldData.findIndex((item) => item.id === id);
    if (index !== -1) {
      oldData[index] = { ...oldData, ...values };
    }
    setDataSource(oldData);
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
      type: "email",
    },
    {
      label: "Phone Number",
      dataIndex: "phone",
      size: "small",
    },
    {
      label: "Role",
      dataIndex: "role",
      type: "select",
      option: [
        {
          label: "Subscriber",
          value: Role.SUBSCRIBER,
        },
        {
          label: "Admin",
          value: Role.ADMIN,
        },
        {
          label: "Admin",
          value: Role.SUPERADMIN,
        },
      ],
    },
    {
      label: "address",
      dataIndex: "address",
    },
    {
      label: "Created On",
      dataIndex: "created_at",
      type: "datetime-local",
      render: (record) => {
        return new DateFormatter(record.created_at).formattedDate();
      },
    },
    {
      label: "modified",
      dataIndex: "updated_at",
      type: "datetime-local",
      render: (record) => {
        return new DateFormatter(record.created_at).formattedDate();
      },
    },
    {
      label: "Action",
      type: "action",
      dataIndex: "id",
      render: (record, _, action) => {
        if (record?.id === action.editRowId) {
          return (
            <Stack direction="row" spacing={0}>
              <Tooltip title="Save">
                <IconButton aria-label="save" onClick={action.onSave}>
                  <SaveIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton aria-label="close" onClick={action.onCancel}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          );
        }
        return (
          <Stack direction="row" spacing={0}>
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                onClick={() => action.setEditable(record.id)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                onClick={() => handleRemoveUser(record.id)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
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
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Users
          </Typography>
          <Button
            size="small"
            startIcon={!!dataSource?.length && <RefreshIcon />}
            variant="contained"
            onClick={handleLoadData}
          >
            {!!dataSource?.length ? "Refresh Data" : "Load Data"}
          </Button>
        </Toolbar>
        <DataTable
          columns={columns}
          data={dataSource}
          editableRow={{
            onSubmit: handleRowSave,
          }}
        />
      </Container>
    </div>
  );
}

export default App;
