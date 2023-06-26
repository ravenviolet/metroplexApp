import React, { useState, useEffect } from 'react';
import StickyHeadTable from './Calendar';
import CalendarWeek from './calendarWeek';
import CalendarMonth from './CalendarMonth';
import { filterJobsByDate, filterJobsByWeek, filterJobsByMonth } from './jobsFilter';
import useFetchJobs from './useFetchJobs';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { format, addDays, subDays, addWeeks, subWeeks, startOfWeek, endOfWeek, subMonths, addMonths } from 'date-fns';
import './calendarView.css';

function CalendarView() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const { jobs, error } = useFetchJobs(currentDate);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [setJobs] = useState([]);

  //day toggle 
  //possible issue
  const [view, setView] = useState('day');

  const handlePreviousDate = () => {
    let newDate;
    if (view === 'day') {
      newDate = subDays(currentDate, 1);
    } else if (view === 'week') {
      newDate = subWeeks(currentDate, 1);
    } else if (view === 'month') {
      newDate = subMonths(currentDate, 1);
      }
    
    setCurrentDate(newDate);
  };

  const handleNextDate = () => {
    let newDate;
    if (view === 'day') {
      newDate = addDays(currentDate, 1);
    } else if (view === 'week') {
      newDate = addWeeks(currentDate, 1);
    } else if (view === 'month') {
      newDate = addMonths(currentDate, 1);
    }
    setCurrentDate(newDate);
  };

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const getWeekStartDate = (date) => {
    return startOfWeek(date, { weekStartsOn: 1 }); 
    // 1 for Monday as the start of the week
  };

  const handleSearch = () => {
    let result = jobs.filter((job) => 
        job.deal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(result);
    if (result.length > 0) {
        let date = new Date(result[0].event_date); // Assuming job has event_date property
        setCurrentDate(date);
    }
};

  useEffect(() => {
    let filtered;
    if (view === 'day') {
      filtered = filterJobsByDate(jobs, currentDate);
      // console.log('Filtered Jobs', filtered);
      // console.log('Jobs', jobs);
    } else if (view === 'week') {
      filtered = filterJobsByWeek(jobs, getWeekStartDate(currentDate));
      // console.log('Filtered Jobs - Week', filtered);
      // console.log('Jobs - Week', jobs);
    }
    else if (view === 'month') {
      filtered = filterJobsByMonth(jobs, getWeekStartDate(currentDate));
      // console.log('Filtered Jobs - Week', filtered);
      // console.log('Jobs - Week', jobs);
    }

    setFilteredJobs(filtered);
  }, [currentDate, view, jobs]);

  return (
    <div>
      <div style={{ maxWidth: '1000', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, marginLeft: 125 }}>
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button style={{ textAlign: 'right', marginTop: 0 }} onClick={handleSearch}>Search</button>
        <IconButton onClick={handlePreviousDate} style={{ backgroundColor: 'transparent' }}>
        <ArrowBackIcon />
        </IconButton>
        <Typography>
          {view === 'day'
            ? format(currentDate, 'EEEE, MMMM d, yyyy')
            : view === 'week'
            ? `${format(startOfWeek(currentDate), 'MMMM d, yyyy')} - ${format(endOfWeek(currentDate), 'MMMM d, yyyy')}`
            : format(currentDate, 'MMMM yyyy')}
        </Typography>
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
  
// const filterJobsByMonth = (jobs, targetDate) => {
//     if (!isValid(targetDate)) {
//       console.error('Invalid date passed to filterJobsByMonth:', targetDate);
//       return {};
//     }
  
//     // Calculate the start and end dates of the month
//     const monthStartDate = startOfMonth(targetDate);
//     const monthEndDate = endOfMonth(targetDate);
  
//     console.log('Month Start Date:', monthStartDate.toISOString());
//     console.log('Month End Date:', monthEndDate.toISOString());
  
//     return Object.entries(jobs).reduce((acc, [technicianName, technicianJobs]) => {
//       const filteredTechnicianJobs = technicianJobs.filter((job) => {
//         // Check if the date string is valid
//         const jobDate = parseISO(job.event_date);
//         if (!isValid(jobDate)) {
//           console.error('Invalid date string in job:', job);
//           return false;
//         }
  
//         console.log('Job Date:', jobDate.toISOString());
//         console.log('Is Job in Month Range:', isWithinInterval(jobDate, { start: monthStartDate, end: monthEndDate }));
//         // Check if the job date is within the range of the month (inclusive)
//         return isWithinInterval(jobDate, { start: monthStartDate, end: monthEndDate });
//       });
  
//       if (filteredTechnicianJobs.length > 0) {
//         acc[technicianName] = filteredTechnicianJobs;
//       }
  
//       console.log(`Filtered Jobs for ${technicianName}:`, filteredTechnicianJobs);
//       return acc;
//     }, {});
//   };
