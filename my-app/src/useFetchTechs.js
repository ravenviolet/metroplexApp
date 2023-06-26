import { useState, useEffect } from 'react';
import getTimeZoneForTech from './getTimeZone';
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';
import { format } from 'date-fns';

const useFetchTechs = () => {
  const [techs, setTechs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/techs`)
      .then((response) => response.json())
      .then((data) => {
        const validTechs = data.filter((tech) => tech.active !== false && tech.event_date !== '' && tech.event_start_time !== '');
      
        let groupedData = validTechs.reduce((acc, tech) => {
          const techName = tech.technician_fields.name;
          if (!acc[techName]) {
            acc[techName] = [];
          }
          acc[techName].push(tech);
          return acc;
        }, {});
      
        // Convert event_date to a local time for each tech
        Object.keys(groupedData).forEach(techName => {
          groupedData[techName] = groupedData[techName].map(tech => {
            const dateTimeString = `${tech.event_date}T${tech.event_start_time}`;
            const timeZone = getTimeZoneForTech(tech);
        
            // Create a date object from the date and time string
            const dateTimeInLocal = new Date(dateTimeString);
        
            // Format the date and time separately
            const formattedDate = format(dateTimeInLocal, 'yyyy-MM-dd', { timeZone });
            const formattedTime = format(dateTimeInLocal, 'HH:mm', { timeZone });
        
            return { ...tech, event_date: formattedDate, event_start_time: formattedTime };
          });
        });
      
        setTechs(groupedData);
      })
      .catch((error) => {
        console.error('Error fetching technician data:', error);
        setError(error);
      });
  }, []);

  return { techs, error };
};  

export default useFetchTechs;
