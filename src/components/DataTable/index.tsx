import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Table,
  TextField,
  MenuItem,
} from "@mui/material";
import EmptyBox from "./Empty";
import { dateFormat } from "../../utils";

export interface SelectOption {
  label?: string;
  value: string | number;
}
interface TableEditableRowProps {
  onSubmit: (values: any) => void;
}
export interface DataTableProps {
  columns: Array<Column>;
  data: any[];
  editableRow?: TableEditableRowProps;
}
interface TableRowProps {
  data: any;
  columns: Array<Column>;
  onSave?: (values: any) => void;
}
interface TableRowAction {
  onSave: () => void;
  onCancel: () => void;
  editRowId: string | null;
  setEditable: (id: string) => void;
}
export interface Column {
  label: string;
  dataIndex: string;
  option?: Array<SelectOption>;
  formFieldProps?: any;
  type?: string;
  size?: "small" | "medium" | undefined;
  render?: (record: any, col: Column, action: TableRowAction) => React.ReactNode;
}

function cellFormRender(record: any, column: Column, option: any) {
  if (column.type === "select") {
    return (
      <TextField
        id={column.dataIndex}
        label={column.label}
        select
        onChange={(e) => option?.onChange?.(column.dataIndex,e.target.value)}
        defaultValue={record[column.dataIndex]}
        variant="standard"
        sx={{ width: 100 }}
        InputLabelProps={{
          shrink: true,
        }}
      >
        {column.option?.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
 
  return (
    <TextField
      id={column.dataIndex}
      label={column.label}
      type={column.type}
      onChange={(e) => option?.onChange?.(column.dataIndex,e.target.value)}
      defaultValue={column?.type === "datetime-local" ? dateFormat(record[column.dataIndex],true) : record[column.dataIndex]}
      variant="standard"
      sx={{ width: 150 }}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
}
function cellDataRender(record: any, column: Column, editRowId: String | undefined | null, option: any ) {
  if (editRowId === record?.id && column?.type !== "action") {
    return cellFormRender(record, column,option);
  }
  if (column.render) {
    return column.render(record, column,option?.action);
  }
  return record[column.dataIndex];
}

function StandardTableRow(props: TableRowProps){
  const { data: row , columns, onSave } = props;
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [values,setValues] = useState(row);
  const onValueChange= (key: string,value: any) => {
    let oldValues = {...values};
    oldValues[key] = value;
    setValues(oldValues);
  }
  const handleSave = () => {
    onSave?.(values)
    setEditRowId(null);
  }
  const handleCancel = () => {
    setEditRowId(null);
    setValues(row);
  }
  let action : TableRowAction = {
    onSave : handleSave,
    onCancel: handleCancel,
    editRowId: editRowId,
    setEditable: (id) => setEditRowId(id)
  }
  return (
      <TableRow
        key={row.firstName}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {columns.map((column) => {
          const { dataIndex, ...rest } = column;
          return (
            <TableCell
              key={dataIndex}
              {...rest}
              sx={{ width: 150 }}
            >
              {cellDataRender(row, column, editRowId, { onChange: onValueChange, action })}
            </TableCell>
          );
        })}
      </TableRow>
  )
}

function DataTable(props: DataTableProps) {
  const { columns, data, editableRow  } = props;
  const headerRender = () => {
    return (
      <TableHead>
        <TableRow>
          {columns.map(({ label, ...rest }) => (
            <TableCell key={label} {...rest} sx={{ width: "fit-content" }}>
              {label?.toUpperCase()}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="table">
        {headerRender()}
        <TableBody>
          {data.map((row) => {
            return (
              <StandardTableRow
                key={row.firstName}
                columns={columns}
                data={row}
                onSave={editableRow?.onSubmit}
               />
            );
          })}
        </TableBody>
      </Table>
      {data.length === 0 && <EmptyBox />}
    </TableContainer>
  );
}

export default DataTable;
