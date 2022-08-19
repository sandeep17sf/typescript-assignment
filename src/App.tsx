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
import RefreshIcon from '@mui/icons-material/Refresh';
import DataTable, { type Column } from "./components/DataTable";
import { dateFormat } from "./utils";
import { generateData } from "./data";

type User = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  address: string;
  updated_at: string;
  created_at: string;
};

let rowData: User[] = generateData(5);
function App() {
  const [dataSource, setDataSource] = useState<User[]>([]);
  const handleLoadData = () => {
    setDataSource(rowData);
  };
  const handleRemoveUser = (id: string) => {
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
      type: "email"
    },
    {
      label: "Phone Number",
      dataIndex: "phoneNumber",
      size: "small",
    },
    {
      label: "Role",
      dataIndex: "role",
      type: "select",
      option: [
        {
          label: "User",
          value: "user",
        },
        {
          label: "Admin",
          value: "admin",
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
        return dateFormat(record.created_at);
      },
    },
    {
      label: "modified",
      dataIndex: "updated_at",
      type: "datetime-local",
      render: (record) => {
        return dateFormat(record.updated_at);
      },
    },
    {
      label: "Action",
      type: "action",
      dataIndex: "updated_at",
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
          <Button size="small" startIcon={!!dataSource?.length && <RefreshIcon />} variant="contained" onClick={handleLoadData}>
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
