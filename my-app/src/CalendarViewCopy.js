// import React, { useState } from 'react';
import StickyHeadTable from './Calendar';
import CalendarWeek from './calendarWeek';
import CalendarMonth from './CalendarMonth';
import { useState, useEffect } from 'react';
import './Calendar.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { addDays, subDays, addMonths, subMonths } from 'date-fns';

const filterJobsByDate = (jobs, date) => {
    if (!date || isNaN(date.getTime())) {
      console.error('Invalid date passed to filterJobsByDate:', date);
      return {};
    }
  
    // Convert the input date to UTC
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  
    return Object.entries(jobs).reduce((acc, [technicianName, technicianJobs]) => {
      const filteredTechnicianJobs = technicianJobs.filter((job) => {
        // Check if the date string is valid
        if (!job.event_date || isNaN(new Date(job.event_date).getTime())) {
          console.error('Invalid date string in job:', job);
          return false;
        }
  
        // Create a new date object without timezone adjustments
        const jobDate = new Date(job.event_date + 'T00:00:00Z');
  
        // Compare the dates using their ISO strings without time information
        return jobDate.toISOString().slice(0, 10) === utcDate.toISOString().slice(0, 10);
      });
  
      if (filteredTechnicianJobs.length > 0) {
        acc[technicianName] = filteredTechnicianJobs;
      }
  
      return acc;
    }, {});
  };

  const filterJobsByWeek = (jobs, weekStartDate) => {
   
    if (!weekStartDate || isNaN(weekStartDate.getTime())) {
        console.error('Invalid week start date passed to filterJobsByWeek:', weekStartDate);
        return {};
      }

    // Calculate the end date of the week by adding 6 days to the start date
    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);
    console.log('Week Start Date:', weekStartDate.toISOString());
    console.log('Week End Date:', weekEndDate.toISOString());
    return Object.entries(jobs).reduce((acc, [technicianName, technicianJobs]) => {
      const filteredTechnicianJobs = technicianJobs.filter((job) => {
        // Check if the date string is valid


        if (!job.event_date || isNaN(new Date(job.event_date).getTime())) {
          console.error('Invalid date string in job:', job);
          return false;
        }
  
        // Create a new date object without timezone adjustments
        const jobDate = new Date(job.event_date + 'T00:00:00Z');
        
        console.log('Job Date:', jobDate.toISOString());
        console.log('Is Job in Week Range:', jobDate >= weekStartDate && jobDate <= weekEndDate);
        // Check if the job date is within the range of the week (inclusive)
        return jobDate >= weekStartDate && jobDate <= weekEndDate;
      });
  
      if (filteredTechnicianJobs.length > 0) {
        acc[technicianName] = filteredTechnicianJobs;
      }
      
      console.log(`Filtered Jobs for ${technicianName}:`, filteredTechnicianJobs);
      return acc;
    }, {});
    
  };

function CalendarView({ filteredJobs }) {
    // const [currentDate, setCurrentDate] = useState(new Date());
    // const [filteredJobs, setFilteredJobs] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
     //day toggle button
    const [view, setView] = useState('day');

    const handleViewChange = (event, newView) => {
        if (newView !== null) {
        setView(newView);
        }
    };

    const handlePreviousDate = () => {
        const newDate = new Date(currentDate);
        if (view === 'day') {
          newDate.setDate(newDate.getDate() - 1);
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() - 7);
        } else if (view === 'month') {
          newDate.setMonth(newDate.getMonth() - 1);
        }
        setCurrentDate(newDate);
      };
      
      const handleNextDate = () => {
        const newDate = new Date(currentDate);
        if (view === 'day') {
          newDate.setDate(newDate.getDate() + 1);
        } else if (view === 'week') {
          newDate.setDate(newDate.getDate() + 7);
        } else if (view === 'month') {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentDate(newDate);
      };
      


//   const [jobs, setJobs] = useState([]);

//   const handlePreviousDate = () => {
//     const newDate = new Date(currentDate);
//     if (view === 'day') {
//       newDate.setDate(newDate.getDate() - 1);
//     } else if (view === 'week') {
//       newDate.setDate(newDate.getDate() - 7);
//     }
//     setCurrentDate(newDate);
//   };
  
//   const handleNextDate = () => {
//     const newDate = new Date(currentDate);
//     if (view === 'day') {
//       newDate.setDate(newDate.getDate() + 1);
//     } else if (view === 'week') {
//       newDate.setDate(newDate.getDate() + 7);
//     }
//     setCurrentDate(newDate);
//   };
  

  //MOVED


  const getWeekStartDate = (date) => {
    const weekStart = new Date(date);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    weekStart.setDate(diff);
    return weekStart;
  };

  useEffect(() => {
    // Assuming that `jobs` is the unfiltered data
    let filtered;
    if (view === 'day') {
      filtered = filterJobsByDate(jobs, currentDate);
    } else if (view === 'week') {
      filtered = filterJobsByWeek(jobs, getWeekStartDate(currentDate));
    }
    setFilteredJobs(filtered);
  }, [currentDate, view]);

  useEffect(() => {
    const formattedDate = currentDate.toISOString().slice(0, 10);
  
    // Fetch job data using the event_date as a query parameter
    fetch(`http://localhost:3000/api/jobs?event_date=${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        // Filter out inactive deals and deals with an empty event_date
        const validDeals = data.filter((deal) => deal.active !== false && deal.event_date !== '');
  
        // Group the remaining deals by technician name
        const groupedData = validDeals.reduce((acc, job) => {
          const techName = job.technician_name;
          if (!acc[techName]) {
            acc[techName] = [];
          }
          acc[techName].push(job);
          return acc;
        }, {});
  
        setJobs(groupedData);
        // Set the filteredJobs state after fetching and grouping the data
        setFilteredJobs(filterJobsByDate(groupedData, currentDate));
      })
      .catch((error) => console.error('Error fetching job data:', error));
  }, []);

  return (
    <div>
      <div style={{ maxWidth: 'YOUR_DESIRED_WIDTH', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, marginLeft: 125 }}>
        <IconButton onClick={handlePreviousDate} style={{ backgroundColor: 'transparent' }}>
        <ArrowBackIcon />
        </IconButton>
        <Typography>{currentDate.toDateString()}</Typography>
        <IconButton onClick={handleNextDate} style={{ backgroundColor: 'transparent' }}>
        <ArrowForwardIcon />
        </IconButton>
        </div>
       </div>
      <div style={{ position: 'sticky', top: 0, zIndex: 3, right: 0, padding: '0 16px', marginLeft: 125, backgroundColor: '#fff' }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view toggle">
          <ToggleButton value="day" aria-label="day view">
            Day
          </ToggleButton>
          <ToggleButton value="week" aria-label="week view">
            Week
          </ToggleButton>
          <ToggleButton value="month" aria-label="month view">
            Month
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {view === 'day' ? (
            <StickyHeadTable
            currentDate={currentDate}
            handleNextDate={handleNextDate}
            handlePreviousDate={handlePreviousDate}
            filteredJobs={filteredJobs}
          />
          ) : view === 'week' ? (
            <CalendarWeek
            currentDate={currentDate}
            handleNextDate={handleNextDate}
            handlePreviousDate={handlePreviousDate}
            filteredJobs={filteredJobs}
            />
          ) : view === 'month'? (
            <CalendarMonth
            currentDate={currentDate}
            handleNextDate={handleNextDate}
            handlePreviousDate={handlePreviousDate}
            filteredJobs={filteredJobs}
            />
          ) : null}
        </div>
  );
  }
  export default CalendarView;
  