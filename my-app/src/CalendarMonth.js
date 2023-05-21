import * as React from 'react';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format
} from 'date-fns';
import './CalendarMonth.css';
import { Typography, Grid } from '@mui/material';

function CalendarMonth({ currentDate, handleNextDate, handlePreviousDate, filteredJobs = {}}) {
    const monthStartDate = startOfMonth(currentDate);
    const monthEndDate = endOfMonth(currentDate);
    const calendarStartDate = startOfWeek(monthStartDate);
    const calendarEndDate = endOfWeek(monthEndDate);
  
    const days = eachDayOfInterval({ start: calendarStartDate, end: calendarEndDate });

    const calendarRows = [];
    let week = [];
    days.forEach((day, index) => {
      week.push(day);
      if ((index + 1) % 7 === 0 || index === days.length - 1) {
        calendarRows.push(week);
        week = [];
      }
    });

    const hasJobOnDate = (day) => {
        return Object.entries(filteredJobs).some(([technicianName, technicianJobs]) =>
          technicianJobs.some((job) => job.event_date === day.toISOString().slice(0, 10))
        );
      };

return (
    <Grid container direction="column" spacing={2} sx={{ marginTop: 2 }}>
      <Grid container justifyContent="center" spacing={1}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday) => (
          <Grid key={weekday} item xs>
            <Typography align="center" variant="subtitle1">{weekday}</Typography>
          </Grid>
        ))}
      </Grid>
      {calendarRows.map((week, weekIndex) => (
        <Grid key={`week-${weekIndex}`} container justifyContent="center" spacing={1}>
        {week.map((day) => (
          <Grid key={day.toISOString()} item xs>
            <Typography align="center">
              {format(day, 'd')}
              {hasJobOnDate(day) && (
                <Typography variant="caption" component="span" color="secondary">
                  {' '}
                  •
                </Typography>
              )}
            </Typography>
          </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
}

export default CalendarMonth;