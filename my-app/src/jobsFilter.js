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
  
    console.log('jobs:', jobs); // For debugging
  
    return Object.entries(jobs).reduce((acc, [technicianName, technicianJobs]) => {
      // Additional debug logs
      console.log('technicianName:', technicianName);
      console.log('technicianJobs:', technicianJobs);
      if (!Array.isArray(technicianJobs)) {
        console.error('technicianJobs is not an array for technician:', technicianName);
        return acc;
      }
      
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
  