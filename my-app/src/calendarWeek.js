import * as React from 'react';
// import './calendarWeek.css';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import { addDays, startOfWeek } from 'date-fns';

const getWeekDates = (startDate) => {
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const newDate = addDays(startDate, i);
    weekDates.push(newDate);
  }
  return weekDates;
};

const getWeekStartDate = (date) => {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 }); // weekStartsOn: 1 means week starts on Monday
  return weekStart;
};

function CalendarWeek({ currentDate, filteredJobs }) {
  // weekly view
  const weekStartDate = getWeekStartDate(currentDate);

  return (
    <div style={{ marginLeft: '125px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
      </div>
      <TableContainer className="week-table-container" sx={{ maxHeight: 1000 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><p>Hours</p></TableCell>
            {getWeekDates(weekStartDate).map((date, index) => (
              <TableCell key={index} className="table-cell">
                {date
                  ? <div className="date-container">
                      <Typography className="date-item">{date.toLocaleDateString('en-US', { weekday: 'short' })}</Typography>
                      <Typography className="date-item">{date.toLocaleDateString('en-US', { day: 'numeric' })}</Typography>
                    </div>
                  : 'Invalid date'}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 24 }, (_, hour) => (
              <TableRow key={hour}>
                <TableCell>
                  <Typography className='myTypographyHours'>{hour}:00</Typography>
                </TableCell>
                {getWeekDates(weekStartDate).map((date, index) => {
                    if (!date) {
                      return <TableCell key={index}>{"Invalid date".trim()}</TableCell>;
                    }
                    const jobsForDateAndHour = Object.entries(filteredJobs).map(([technicianJobs]) => {
                      const filtered = technicianJobs.filter(job => {
                        const jobStartTime = new Date(`${job.event_date}T${job.event_start_time}`);
                        const jobDate = new Date(job.event_date + 'T00:00:00Z');
                        return jobDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10) && jobStartTime.getHours() === hour;
                      });
                      return filtered;
                    });
                  return (
                    <TableCell key={index}>
                      {jobsForDateAndHour.map((job, jobIndex) => (
                        <Tooltip
                          key={jobIndex}
                          title={
                            <React.Fragment>
                              <Typography variant="subtitle2">Deal ID: {job.deal_id}</Typography>
                              <Typography variant="subtitle2">Deal Notes: {job.deal_notes || 'N/A'}</Typography>
                              <Typography variant="subtitle2">Stage ID: {job.stage_id}</Typography>
                              <Typography variant="subtitle2">City Name: {job.city_name || 'N/A'}</Typography>
                              <Typography variant="subtitle2">State Name: {job.state_name || 'N/A'}</Typography>
                              <Typography variant="subtitle2">Community Name: {job.community_name || 'N/A'}</Typography>
                            </React.Fragment>
                          }
                          arrow
                        >
                          <div style={{ backgroundColor: 'red', color: 'white', height: '100%', margin: '0', padding: '0', overflowWrap: 'break-word', alignItems: 'center', justifyContent: 'center', whiteSpace: 'normal', maxWidth: '75px'}}>
                            {job.title}
                          </div>
                        </Tooltip>
                      ))}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
  }
  export default CalendarWeek;

  // const jobsForDateAndHour = Object.entries(filteredJobs).map(([technicianName, technicianJobs]) => {
  //   const filtered = technicianJobs.filter(job => {
  //     const jobStartTime = new Date(`${job.event_date}T${job.event_start_time}`);
  //     const jobDate = new Date(job.event_date + 'T00:00:00Z');
  //     // console.log('Job Start Time:', jobStartTime);
  //     // console.log('Job Date:', jobDate);
  //     // console.log('Current Date:', date.toISOString().slice(0, 10));
  //     // console.log('Current Hour:', hour);
  //     return jobDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10) && jobStartTime.getHours() === hour;
  //   });
  //   // console.log('Filtered jobs for', technicianName, 'at', hour, 'on', date.toISOString().slice(0, 10), ':', filtered);
  //   return filtered;
  // });
  