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
import useFetchJobs from './useFetchJobs';
import { useState, useEffect } from 'react';

const columns = [{ id: 'day', label: 'Job', minWidth: 170 }];

const mapTechnicianToDbId = (technicianFieldValue) => {
  if (technicianFieldValue === 1) {
    return 'user_id_1';
  }
};

export default function StickyHeadTable(props) {
  const { user } = props;
  const { jobs, error } = useFetchJobs();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Convert jobs into a format suitable for the table
  let rows = [];
  Object.keys(jobs).forEach((techName) => {
    const userId = mapTechnicianToDbId(techName);
    const tasks = jobs[techName].map((job) => {
      return {
        id: job.deal_id,
        label: job.title,
        start: job.event_start_time,
        end: job.event_end_time, // assuming you have an end time
      };
    });

    rows.push({
      id: userId,
      label: techName,
      tasks: tasks,
    });
  });
  
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