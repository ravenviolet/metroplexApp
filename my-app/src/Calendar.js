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
  const handlePreviousDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  
  const handleNextDate = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };
  //end new

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const jobArrays = Object.values(jobs);
  const startHours = jobArrays.reduce((acc, jobArray) => {
    return acc.concat(
      jobArray
        .filter(job => job.event_start_time !== null && job.event_start_time !== undefined)
        .map(job => parseInt(job.event_start_time.split(':')[0]))
    );
  }, []);
  
  // const minHour = Math.min(8, ...startHours);
  // const maxHour = Math.max(17, ...startHours.map(startHour => startHour + 1));
  
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
  
  // for (let i = 0; i < 24; i++) {
  //   const hour = i < 10 ? `0${i}` : i;
  //   columns.push({ id: `${hour}:00`, label: `${hour}:00`, minWidth: 100 });
  // }
  
  //new
  const filteredJobs = Object.entries(jobs).reduce((acc, [technicianName, technicianJobs]) => {
    const filteredTechnicianJobs = technicianJobs.filter((job) => {
      const jobDate = new Date(job.event_date);
      return (
        jobDate.getFullYear() === currentDate.getFullYear() &&
        jobDate.getMonth() === currentDate.getMonth() &&
        jobDate.getDate() === currentDate.getDate()
      );
    });
  
    if (filteredTechnicianJobs.length > 0) {
      acc[technicianName] = filteredTechnicianJobs;
    }
  
    return acc;
  }, {});
  
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
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rowsPerPage}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Paper>
      <div style={{ maxWidth: 'YOUR_DESIRED_WIDTH', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
      <IconButton onClick={handlePreviousDate} style={{ backgroundColor: 'transparent' }}>
        <ArrowBackIcon />
      </IconButton>
      <Typography>{currentDate.toDateString()}</Typography>
      <IconButton onClick={handleNextDate} style={{ backgroundColor: 'transparent' }}>
        <ArrowForwardIcon />
      </IconButton>
    </div>
    </div>
</div>
  );
  }
  export default StickyHeadTable;
  