import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import { CSVLink } from "react-csv";

const useStyles = makeStyles((theme) => ({
   root: {
     margin: 20,

   },
  tableContainer: {
    height: 670,
    [theme.breakpoints.down("md")]:{
      height: 400,
    },
    marginCSV:{
      marginLeft:100,
    }
  }
}))

const columns = [
  { id: 'index', label: 'index', minWidth: 170 },
  { id: 'deviceID', label: 'deviceID', minWidth: 100 },
  {
    id: 'nearestPlace',
    label: 'nearestPlace',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'sequence',
    label: 'sequence',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'map',
    label: 'map',
    minWidth: 170,
    align: 'right',
    //format: (value) => value.toFixed(2),
  },
  {
    id: 'date',
    label: 'date',
    minWidth: 170,
    align: 'right',
    //format: (value) => value.toFixed(2),
  },
  {
    id: 'country',
    label: 'country',
    minWidth: 170,
    align: 'right',
    //format: (value) => value.toFixed(2),
  },
  {
    id: 'words',
    label: 'words',
    minWidth: 170,
    align: 'right',
    //format: (value) => value.toFixed(2),
  },
  {
    id: 'lng',
    label: 'lng',
    minWidth: 170,
    align: 'right',
    //format: (value) => value.toFixed(2),
  },
  {
    id: 'lat',
    label: 'lat',
    minWidth: 170,
    align: 'right',
    //format: (value) => value.toFixed(2),
  },
];

function handleExportCSV(mapData) {

  const header = Object.keys(mapData[0]).map((key) => {
    return { label: key, key: key }
  });

  console.log(header);
}
const headers=[
  { label:"index",key:"index"},
  { label:"deviceID",key:"deviceID"},
  { label:"sequence",key:"sequence"},
  { label:"nearesPlace",key:"nearesPlace"},
  { label:"map",key:"map"},
  { label:"country",key:"country"},
  { label:"words",key:"words"},
  { label:"lng",key:"lng"},
  { label:"lat",key:"lat"},
]





export default function StickyHeadTable({ mapData }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const csvReport = {
    data: mapData ? mapData : "",
    headers: headers,
    filename:"test.csv"
  }
  console.log(csvReport)
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  mapData && handleExportCSV(mapData)
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mapData && mapData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={mapData ? mapData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <CSVLink className={classes.marginCSV}{...csvReport}>Export CSV</CSVLink>
    </Paper>
  );
}