import { isValid, parseISO, startOfDay, isWithinInterval, isSameDay, addDays } from 'date-fns';

export function filterJobsByDate(jobs, date) {
    if (!isValid(date)) {
      console.error('Invalid date passed to filterJobsByDate:', date);
      return {};
    }
  
    const utcDate = startOfDay(date);
  
    return Object.entries(jobs).reduce((acc, [technicianName, technicianJobs]) => {
      const filteredTechnicianJobs = technicianJobs.filter((job) => {
        // Check if the date string is valid
        const jobDate = parseISO(job.event_date);
        if (!isValid(jobDate)) {
          console.error('Invalid date string in job:', job);
          return false;
        }
  
        // Compare the dates using isSameDay from date-fns
        return isSameDay(jobDate, utcDate);
      });
  
      if (filteredTechnicianJobs.length > 0) {
        acc[technicianName] = filteredTechnicianJobs;
      }
  
      return acc;
    }, {});
  };


  export function filterJobsByWeek(jobs, weekStartDate) {
    if (!isValid(weekStartDate)) {
      console.error('Invalid week start date passed to filterJobsByWeek:', weekStartDate);
      return {};
    }
  
    // Calculate the end date of the week by adding 6 days to the start date
    const weekEndDate = addDays(weekStartDate, 6);
  
    return Object.entries(jobs).reduce((acc, [technicianName, technicianJobs]) => {
      const filteredTechnicianJobs = technicianJobs.filter((job) => {
        // Check if the date string is valid
        const jobDate = parseISO(job.event_date);
        if (!isValid(jobDate)) {
          console.error('Invalid date string in job:', job);
          return false;
        }
  
        return isWithinInterval(jobDate, { start: weekStartDate, end: weekEndDate });
      });
  
      if (filteredTechnicianJobs.length > 0) {
        acc[technicianName] = filteredTechnicianJobs;
      }
      
      return acc;
    }, {});
  };

// const filterJobsByWeek = (jobs, weekStartDate) => {
//   if (!isValid(weekStartDate)) {
//     console.error('Invalid week start date passed to filterJobsByWeek:', weekStartDate);
//     return {};
//   }

//   // Calculate the end date of the week by adding 6 days to the start date
//   const weekEndDate = addDays(weekStartDate, 6);

//   return Object.entries(jobs).reduce((acc, [technicianName, technicianJobs]) => {
//     const filteredTechnicianJobs = technicianJobs.filter((job) => {
//       // Check if the date string is valid
//       const jobDate = parseISO(job.event_date);
//       if (!isValid(jobDate)) {
//         console.error('Invalid date string in job:', job);
//         return false;
//       }

//       return isWithinInterval(jobDate, { start: weekStartDate, end: weekEndDate });
//     });

//     if (filteredTechnicianJobs.length > 0) {
//       acc[technicianName] = filteredTechnicianJobs;
//     }
    
//     return acc;
//   }, {});
// };

// function CalendarView() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [filteredJobs, setFilteredJobs] = useState([]);

//   const [jobs, setJobs] = useState([]);

//   //day toggle 
//   //possible issue
//   const [view, setView] = useState('day');

//   const handlePreviousDate = () => {
//     let newDate;
//     if (view === 'day') {
//       newDate = subDays(currentDate, 1);
//     } else if (view === 'week') {
//       newDate = subWeeks(currentDate, 1);
//     } else if (view === 'month') {
//       newDate = subMonths(currentDate, 1);
//       }
    
//     setCurrentDate(newDate);
//   };

//   const handleNextDate = () => {
//     let newDate;
//     if (view === 'day') {
//       newDate = addDays(currentDate, 1);
//     } else if (view === 'week') {
//       newDate = addWeeks(currentDate, 1);
//     } else if (view === 'month') {
//       newDate = addMonths(currentDate, 1);
//     }
//     setCurrentDate(newDate);
//   };

//   const handleViewChange = (event, newView) => {
//     if (newView !== null) {
//       setView(newView);
//     }
//   };

//   const getWeekStartDate = (date) => {
//     return startOfWeek(date, { weekStartsOn: 1 }); // 1 for Monday as the start of the week
//   };

//   useEffect(() => {
//     const formattedDate = currentDate.toISOString().slice(0, 10);
  
//     // Fetch job data using the event_date as a query parameter
//     fetch(`http://localhost:3000/api/jobs?event_date=${formattedDate}`)
//       .then((response) => response.json())
//       .then((data) => {
//         // Filter out inactive deals and deals with an empty event_date
//         const validDeals = data.filter((deal) => deal.active !== false && deal.event_date !== '');
  
//         // Group the remaining deals by technician name
//         const groupedData = validDeals.reduce((acc, job) => {
//           const techName = job.technician_fields.name;
//           if (!acc[techName]) {
//             acc[techName] = [];
//           }
//           acc[techName].push(job);
//           return acc;
//         }, {});
  
//         setJobs(groupedData);
  
//         // Filter jobs based on the current view
//         let filtered;
//         if (view === 'day') {
//           filtered = filterJobsByDate(groupedData, currentDate);
//         } else if (view === 'week') {
//           filtered = filterJobsByWeek(groupedData, getWeekStartDate(currentDate));
//         }
        
//         // Set the filteredJobs state after fetching, grouping, and filtering the data
//         setFilteredJobs(filtered);
//       })
//       .catch((error) => console.error('Error fetching job data:', error));
//   }, [currentDate, view]);
  
//   // useEffect(() => {
//   //   // Assuming that `jobs` is the unfiltered data
//   //   let filtered;
//   //   if (view === 'day') {
//   //     filtered = filterJobsByDate(jobs, currentDate);
//   //   } else if (view === 'week') {
//   //     filtered = filterJobsByWeek(jobs, getWeekStartDate(currentDate));
//   //   }
//   //   setFilteredJobs(filtered);
//   // }, [currentDate, view, jobs]);

//   // useEffect(() => {
//   //   const formattedDate = currentDate.toISOString().slice(0, 10);
  
//   //   // Fetch job data using the event_date as a query parameter
//   //   fetch(`http://localhost:3000/api/jobs?event_date=${formattedDate}`)
//   //     .then((response) => response.json())
//   //     .then((data) => {
//   //       // Filter out inactive deals and deals with an empty event_date
//   //       const validDeals = data.filter((deal) => deal.active !== false && deal.event_date !== '');
  
//   //       // Group the remaining deals by technician name
//   //       const groupedData = validDeals.reduce((acc, job) => {
//   //         const techName = job.technician_fields.name;
//   //         if (!acc[techName]) {
//   //           acc[techName] = [];
//   //         }
//   //         acc[techName].push(job);
//   //         return acc;
//   //       }, {});
  
//   //       setJobs(groupedData);
//   //       // Set the filteredJobs state after fetching and grouping the data
//   //       setFilteredJobs(filterJobsByDate(groupedData, currentDate));
//   //     })
//   //     .catch((error) => console.error('Error fetching job data:', error));
//   // }, [currentDate]);

//   return (
//     <div>
//       <div style={{ maxWidth: '1000', margin: '0 auto' }}>
//         <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, marginLeft: 125 }}>
//         <IconButton onClick={handlePreviousDate} style={{ backgroundColor: 'transparent' }}>
//         <ArrowBackIcon />
//         </IconButton>
//         <Typography>
//           {view === 'day'
//             ? format(currentDate, 'EEEE, MMMM d, yyyy')
//             : view === 'week'
//             ? `${format(startOfWeek(currentDate), 'MMMM d, yyyy')} - ${format(endOfWeek(currentDate), 'MMMM d, yyyy')}`
//             : format(currentDate, 'MMMM yyyy')}
//         </Typography>
//         <IconButton onClick={handleNextDate} style={{ backgroundColor: 'transparent' }}>
//         <ArrowForwardIcon />
//         </IconButton>
//         </div>
//        </div>
//       <div style={{ position: 'sticky', top: 0, zIndex: 3, right: 0, padding: '0 16px', marginLeft: 125, backgroundColor: '#fff' }}>
//         <ToggleButtonGroup
//           value={view}
//           exclusive
//           onChange={handleViewChange}
//           aria-label="view toggle">
//           <ToggleButton value="day" aria-label="day view">
//             Day
//           </ToggleButton>
//           <ToggleButton value="week" aria-label="week view">
//             Week
//           </ToggleButton>
//           <ToggleButton value="month" aria-label="month view">
//             Month
//           </ToggleButton>
//         </ToggleButtonGroup>
//       </div>
//       {view === 'day' ? (
//             <StickyHeadTable
//             currentDate={currentDate}
//             handleNextDate={handleNextDate}
//             handlePreviousDate={handlePreviousDate}
//             filteredJobs={filteredJobs}
//           />
//           ) : view === 'week' ? (
//             <CalendarWeek
//             currentDate={currentDate}
//             handleNextDate={handleNextDate}
//             handlePreviousDate={handlePreviousDate}
//             filteredJobs={filteredJobs}
//             />
//           ) : view === 'month'? (
//             <CalendarMonth
//             currentDate={currentDate}
//             handleNextDate={handleNextDate}
//             handlePreviousDate={handlePreviousDate}
//             filteredJobs={filteredJobs}
//             />
//           ) : null}
//         </div>
//   );
//   }
//   export default CalendarView;
  
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

//   const filterJobsByWeek = (jobs, weekStartDate) => {
   
//     if (!weekStartDate || isNaN(weekStartDate.getTime())) {
//         console.error('Invalid week start date passed to filterJobsByWeek:', weekStartDate);
//         return {};
//       }

//     // Calculate the end date of the week by adding 6 days to the start date
//     const weekEndDate = new Date(weekStartDate);
//     weekEndDate.setDate(weekEndDate.getDate() + 6);
//     console.log('Week Start Date:', weekStartDate.toISOString());
//     console.log('Week End Date:', weekEndDate.toISOString());
//     return Object.entries(jobs).reduce((acc, [technicianName, technicianJobs]) => {
//       const filteredTechnicianJobs = technicianJobs.filter((job) => {
//         // Check if the date string is valid


//         if (!job.event_date || isNaN(new Date(job.event_date).getTime())) {
//           console.error('Invalid date string in job:', job);
//           return false;
//         }
  
//         // Create a new date object without timezone adjustments
//         const jobDate = new Date(job.event_date + 'T00:00:00Z');
        
//         console.log('Job Date:', jobDate.toISOString());
//         console.log('Is Job in Week Range:', jobDate >= weekStartDate && jobDate <= weekEndDate);
//         // Check if the job date is within the range of the week (inclusive)
//         return jobDate >= weekStartDate && jobDate <= weekEndDate;
//       });
  
//       if (filteredTechnicianJobs.length > 0) {
//         acc[technicianName] = filteredTechnicianJobs;
//       }
      
//       console.log(`Filtered Jobs for ${technicianName}:`, filteredTechnicianJobs);
//       return acc;
//     }, {});
    
//   };