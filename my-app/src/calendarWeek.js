import * as React from 'react';
import { useState, useEffect } from 'react';
import './Calendar.css';
// import CalendarView from './CalendarView';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

const getWeekDates = (startDate) => {
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(startDate);
    newDate.setUTCDate(newDate.getUTCDate() + i);
    weekDates.push(newDate);
  }

  return weekDates;
};

const getWeekStartDate = (date) => {
  const weekStart = new Date(date);
  const day = weekStart.getUTCDay();
  const diff = weekStart.getUTCDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
  weekStart.setUTCDate(diff);
  return weekStart;
};


// const weekStartDate = getWeekStartDate(currentDate);

function CalendarWeek({ currentDate, handleNextDate, handlePreviousDate, filteredJobs }) {
  // const jobs = JobTable();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [darkMode, setDarkMode] = useState(false);

  //dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  //weekly view
  const weekStartDate = getWeekStartDate(currentDate);

  //get weekrange
  const getWeekRange = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
  
    return `${startOfWeek.toDateString()} - ${endOfWeek.toDateString()}`;
  };

  return (
    <div style={{ marginLeft: '125px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
      <Typography>
      {`${weekStartDate.toISOString().slice(0, 10)} - ${getWeekDates(weekStartDate)[6].toISOString().slice(0, 10)}`}
      </Typography>
      </div>
      <TableContainer className="week-table-container" sx={{ maxHeight: 500 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell> {/* Empty header cell for the hours column */}
              {getWeekDates(weekStartDate).map((date, index) => (
                <TableCell key={index}>
                  <Typography>{date ? date.toDateString() : 'Invalid date'}</Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 24 }, (_, hour) => (
              <TableRow key={hour}>
                <TableCell>
                  <Typography>{hour}:00</Typography>
                </TableCell>
                {getWeekDates(weekStartDate).map((date, index) => {
                    if (!date) {
                      return <TableCell key={index}>Invalid date</TableCell>;
                    }
                    // Find the jobs for the current date and hour
                    // const jobsForDateAndHour = Object.entries(filteredJobs).flatMap(([technicianName, technicianJobs]) => (
                    //   technicianJobs.filter(job => {
                    //     const jobStartTime = new Date(job.event_start_time);
                    //     const jobDate = new Date(job.event_date + 'T00:00:00Z');
                    //     return jobDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10) && jobStartTime.getHours() === hour;
                    //   })
                    // ));
                    console.log('Filtered Jobs prop:', filteredJobs);
                    const jobsForDateAndHour = Object.entries(filteredJobs).flatMap(([technicianName, technicianJobs]) => {
                      const filtered = technicianJobs.filter(job => {
                        const jobStartTime = new Date(`${job.event_date}T${job.event_start_time}`);
                        const jobDate = new Date(job.event_date + 'T00:00:00Z');
                        console.log('Job Start Time:', jobStartTime);
                        console.log('Job Date:', jobDate);
                        console.log('Current Date:', date.toISOString().slice(0, 10));
                        console.log('Current Hour:', hour);
                        return jobDate.toISOString().slice(0, 10) === date.toISOString().slice(0, 10) && jobStartTime.getHours() === hour;
                      });
                      console.log('Filtered jobs for', technicianName, 'at', hour, 'on', date.toISOString().slice(0, 10), ':', filtered);
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
                          <div style={{ backgroundColor: 'red', color: 'white', width: '100%', height: '100%' }}>
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
  