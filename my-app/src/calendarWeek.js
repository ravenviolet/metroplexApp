
import * as React from 'react';
import { useState, useEffect } from 'react';
import './Calendar.css';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
//new:
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Switch from '@mui/material/Switch';
//

// import '@mui/lab/theme-provider';
// import { ThemeProvider } from '@mui/lab';
//uninstall the above in my-app and my-app/src





//week
function getWeekStartDate(date) {
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - startDate.getDay());
  return startDate;
}

function getWeekDates(weekStartDate) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStartDate);
    date.setDate(date.getDate() + i);
    dates.push(date);
  }
  return dates;
}

function StickyHeadTable() {
  // const jobs = JobTable();
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //new:
  const [currentDate, setCurrentDate] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  //dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  //weekly view
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(currentDate));

  const handlePreviousWeek = () => {
    const newWeekStartDate = new Date(weekStartDate);
    newWeekStartDate.setDate(newWeekStartDate.getDate() - 7);
    setWeekStartDate(newWeekStartDate);
  };
  
  const handleNextWeek = () => {
    const newWeekStartDate = new Date(weekStartDate);
    newWeekStartDate.setDate(newWeekStartDate.getDate() + 7);
    setWeekStartDate(newWeekStartDate);
  };

  useEffect(() => {
    //new
    const formattedDate = currentDate.toISOString().slice(0, 10);
        // Fetch job data from your API
    //new
    fetch(`http://localhost:3000/api/jobs?date=${formattedDate}`)
    //
    // fetch('http://localhost:3000/api/jobs')
      .then((response) => response.json())
      .then((data) => {
        const groupedData = data.reduce((acc, job) => {
          const techName = job.technician_name;
          if (!acc[techName]) {
            acc[techName] = [];
          }
          acc[techName].push(job);
          return acc;
        }, {});
  
        setJobs(groupedData);
      })
      .catch((error) => console.error('Error fetching job data:', error));
  }, []);
  
  //new
//   const handlePreviousDate = () => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() - 1);
//     setCurrentDate(newDate);
//   };
  
//   const handleNextDate = () => {
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() + 1);
//     setCurrentDate(newDate);
//   };
  //end new

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const jobArrays = Object.values(jobs);
//   const startHours = jobArrays.reduce((acc, jobArray) => {
//     return acc.concat(
//       jobArray
//         .filter(job => job.event_start_time !== null && job.event_start_time !== undefined)
//         .map(job => parseInt(job.event_start_time.split(':')[0]))
//     );
//   }, []);
  
  // const minHour = Math.min(8, ...startHours);
  // const maxHour = Math.max(17, ...startHours.map(startHour => startHour + 1));
  
//   const columns = [
//     { id: 'day', label: 'Technician', minWidth: 170 },
//     ...Array.from({ length: 24 }, (v, i) => {
//       const hour = i < 10 ? `0${i}` : i;
//       return {
//         id: `${hour}:00`,
//         label: `${hour}:00`,
//         minWidth: 100,
//         align: 'center',
//       };
//     }),
//   ];
  
  // for (let i = 0; i < 24; i++) {
  //   const hour = i < 10 ? `0${i}` : i;
  //   columns.push({ id: `${hour}:00`, label: `${hour}:00`, minWidth: 100 });
  // }
  
  //new
//   const filteredJobs = Object.entries(jobs).reduce((acc, [technicianName, technicianJobs]) => {
//     const filteredTechnicianJobs = technicianJobs.filter((job) => {
//       const jobDate = new Date(job.event_date);
//       return (
//         jobDate.getFullYear() === currentDate.getFullYear() &&
//         jobDate.getMonth() === currentDate.getMonth() &&
//         jobDate.getDate() === currentDate.getDate()
//       );
//     });
  
//     if (filteredTechnicianJobs.length > 0) {
//       acc[technicianName] = filteredTechnicianJobs;
//     }
  
//     return acc;
//   }, {});
  
  return (
<div style={{ marginLeft: '125px' }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
    <IconButton onClick={handlePreviousWeek} style={{ backgroundColor: 'transparent' }}>
      <ArrowBackIcon />
    </IconButton>
    <Typography>
      {`${weekStartDate.toDateString()} - ${getWeekDates(weekStartDate)[6].toDateString()}`}
    </Typography>
    <IconButton onClick={handleNextWeek} style={{ backgroundColor: 'transparent' }}>
      <ArrowForwardIcon />
    </IconButton>
  </div>
  <table>
    <thead>
      <tr>
        <th></th> {/* Empty header cell for the hours column */}
        {getWeekDates(weekStartDate).map((date, index) => (
          <th key={index}>
            <Typography>{date.toDateString()}</Typography>
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: 24 }, (_, hour) => (
        <tr key={hour}>
          <td>
            <Typography>{hour}:00</Typography>
          </td>
          {getWeekDates(weekStartDate).map((date, index) => (
            <td key={index}>
             
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
  }
  export default StickyHeadTable;
  