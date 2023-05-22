import { useState, useEffect } from 'react';

const useFetchJobs = (currentDate) => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const formattedDate = currentDate.toISOString().slice(0, 10);

    fetch(`http://localhost:3000/api/jobs?event_date=${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        const validDeals = data.filter((deal) => deal.active !== false && deal.event_date !== '');

        const groupedData = validDeals.reduce((acc, job) => {
          const techName = job.technician_fields.name;
          if (!acc[techName]) {
            acc[techName] = [];
          }
          acc[techName].push(job);
          return acc;
        }, {});

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
