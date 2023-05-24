import { useState, useEffect } from 'react';
import getTimeZoneForJob from './getTimeZone';
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz'
import { format } from 'date-fns';

const useFetchJobs = (currentDate) => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);


  useEffect(() => {
    const formattedDate = currentDate.toISOString().slice(0, 10);
  
    fetch(`http://localhost:3000/api/jobs?event_date=${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        const validDeals = data.filter((deal) => deal.active !== false && deal.event_date !== '' && deal.event_start_time !== '');
      
        let groupedData = validDeals.reduce((acc, job) => {
          const techName = job.technician_fields.name;
          if (!acc[techName]) {
            acc[techName] = [];
          }
          acc[techName].push(job);
          return acc;
        }, {});
      
        // Convert event_date to a local time for each job in each technician's group of jobs
        Object.keys(groupedData).forEach(techName => {
          groupedData[techName] = groupedData[techName].map(job => {
            const dateTimeString = `${job.event_date}T${job.event_start_time}`;
            const timeZone = getTimeZoneForJob(job);
        
            // Create a date object from the date and time string
            const dateTimeInLocal = new Date(dateTimeString);
        
            // Format the date and time separately
            const formattedDate = format(dateTimeInLocal, 'yyyy-MM-dd', { timeZone });
            const formattedTime = format(dateTimeInLocal, 'HH:mm', { timeZone });
        
            return { ...job, event_date: formattedDate, event_start_time: formattedTime };
          });
        });
      
        setJobs(groupedData);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
        setError(error);
      });
  }, [currentDate]);
  
  return { jobs, error };
};  

export default useFetchJobs;
