import * as React from 'react';
import './Calendar.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
//mobile version
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';

const columns = [{ id: 'day', label: 'Job', minWidth: 170 }];

export default function StickyHeadTable(props) {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const handleLogout = () => {
    // implement your logout functionality here
    console.log('Logged out');
  };
  const loggedInUser = 'Billy Gibbons'; // replace with actual logged-in user
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = [
    {
      id: 'user_id_1',
      label: 'Billy Gibbons',
      tasks: [
        { id: 'job1', label: 'Photography', start: '08:00', end: '10:00' },
        // add more jobs as needed
      ],
    },
    {
      id: 'user_id_2',
      label: 'James Dean',
      tasks: [
        { id: 'job2', label: 'Matterport', start: '11:00', end: '13:00' },
        // add more jobs as needed
      ],
    },
    // add more users as needed
  ];
  
  const userTasks = rows.find((user) => user.label === props.user.name).tasks;
  
  
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <h2>{props.user.name}</h2>
        <Button variant="outlined" onClick={props.onLogout}>Logout</Button>
      </div>
      <TableContainer className="table-container" sx={{ maxHeight: 880 }}>
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
  {userTasks.map((task) => (
    <TableRow key={task.id}>
      <TableCell>{task.label}</TableCell>
      <TableCell>{task.start}</TableCell>
      <TableCell>{task.end}</TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
  
}