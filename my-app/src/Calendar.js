import * as React from 'react';
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
import { format, eachHourOfInterval } from 'date-fns';

  const StickyHeadTable = ({ filteredJobs }) => {
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  // Set the default start and end hours
  const defaultStartHour = 8;
  const defaultEndHour = 20;

  // Generate the array of hours within the default range
  const defaultHours = eachHourOfInterval({
    start: new Date().setHours(defaultStartHour),
    end: new Date().setHours(defaultEndHour),
  });

  let allHours = defaultHours;
  
  const columns = [
    { id: 'day', 
    label: 'Technician', 
    minWidth: 100,
  },
    ...allHours.map((hour) => {
      const formattedHour = format(hour, 'HH:00');
      return {
        id: formattedHour,
        label: formattedHour,
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
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    position: index === 0 ? 'sticky' : '',
                    left: index === 0 ? 0 : '',
                    background: '#fff',
                    zIndex: index === 0 ? 2 : 1,
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
                  className="MuiTableCell-root-2"
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
                  <div style={{ backgroundColor: 'red',fontStyle: 'Poppins', color: 'white', width: '100%', height: '100%' }}>
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
  