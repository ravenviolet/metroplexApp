import * as React from 'react';
import { useState, useEffect } from 'react';
import './Calendar.css';
import './CalendarView';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const StickyHeadTable = ({ currentDate, handleNextDate, handlePreviousDate, filteredJobs }) => {
  // const jobs = JobTable();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //new:
  // const [currentDate, setCurrentDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  //dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const jobArrays = Object.values(jobs);
  const startHours = jobArrays.reduce((acc, jobArray) => {
    return acc.concat(
      jobArray
        .filter(job => job.event_start_time !== null && job.event_start_time !== undefined)
        .map(job => parseInt(job.event_start_time.split(':')[0]))
    );
  }, []);
  
  const columns = [
    { id: 'day', label: 'Technician', minWidth: 170 },
    ...Array.from({ length: 24 }, (v, i) => {
      const hour = i < 10 ? `0${i}` : i;
      return {
        id: `${hour}:00`,
        label: `${hour}:00`,
        minWidth: 100,
        align: 'center',
      };
    }),
  ];
  
  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer className="table-container" sx={{ maxHeight: 880 }}>
          <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    position: column.isSticky ? 'sticky' : '',
                    top: 0,
                    zIndex: 2,
                    backgroundColor: '#fff',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        <TableBody>
          
  {Object.entries(filteredJobs)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map(([technicianName, technicianJobs]) => {
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={technicianName}>
          {columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return (
                <TableCell
                  key={column.id}
                  align={column.align}
                  className="MuiTableCell-root"
                  style={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#fff' }}
                >
                  {technicianName}
                </TableCell>
              );
            } else {
              const currentHour = parseInt(column.id.split(':')[0]);
              const matchingJob = technicianJobs.find((job) => {
                if (job.event_start_time) {
                  const startHour = parseInt(job.event_start_time.split(':')[0]);
                  const endHour = startHour + 1; // Add one hour to the start time
                  return currentHour >= startHour && currentHour < endHour;
                }
                return false;
              });
              
              return (
            <TableCell key={column.id} align={column.align} className="MuiTableCell-root">
              {matchingJob ? (
                <Tooltip
                  title={
                    <React.Fragment>
                      <Typography variant="subtitle2">Deal ID: {matchingJob.deal_id}</Typography>
                      <Typography variant="subtitle2">Deal Notes: {matchingJob.deal_notes || 'N/A'}</Typography>
                      <Typography variant="subtitle2">Stage ID: {matchingJob.stage_id}</Typography>
                      <Typography variant="subtitle2">City Name: {matchingJob.city_name || 'N/A'}</Typography>
                      <Typography variant="subtitle2">State Name: {matchingJob.state_name || 'N/A'}</Typography>
                      <Typography variant="subtitle2">Community Name: {matchingJob.community_name || 'N/A'}</Typography>
                    </React.Fragment>
                  }
                  arrow
                >
                  <div style={{ backgroundColor: 'red', color: 'white', width: '100%', height: '100%' }}>
                    {matchingJob.title}
                  </div>
                </Tooltip>

              ) : null}
            </TableCell>
              );
            }
          })}
        </TableRow>
      );
    })}
</TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
  }
  export default StickyHeadTable;
  