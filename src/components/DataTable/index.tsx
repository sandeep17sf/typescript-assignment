import React from "react";
import {
  Paper,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Table,
} from "@mui/material";
import EmptyBox from "./Empty";

export interface DataTableProps {
  columns: Array<Column>;
  data: any[];
}

export interface Column {
  label: string;
  dataIndex: string;
  size?: "small" | "medium" | undefined;
  render?: (record: any, col: Column) => React.ReactNode;
}

function cellDataRender(record: any, column: Column) {
  if (column.render) {
    return column.render(record, column);
  }
  return record[column.dataIndex];
}

function DataTable(props: DataTableProps) {
  const { columns, data } = props;
  const headerRender = () => {
    return (
      <TableHead>
        <TableRow>
          {columns.map(({ label, ...rest }) => (
            <TableCell key={label} {...rest} sx={{ width: "fit-content" }}>
              {label}
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
                      sx={{ width: "fit-content" }}
                    >
                      {cellDataRender(row, column)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
         
        </TableBody>
      </Table>
      {data.length === 0 && <EmptyBox />}
    </TableContainer>
  );
}

export default DataTable;
