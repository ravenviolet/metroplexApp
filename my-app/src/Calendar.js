import React from 'react';
import { Grid, Typography } from '@mui/material';
import './Calendar.css';

function HorizontalCalendar() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();

  // Generate an array of dates for the next 7 days
  const dates = [...Array(7)].map((_, index) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + index);
    return date;
  });

  return (
<Grid container className="container">
      <Grid item className="navbar-desktop">
        <div>Navbar</div>
      </Grid>
      <Grid item className="extra-space">
        <div>Extra space above calendar</div>
      </Grid>
      <Grid container item className="calendar">
        {dates.map((date, index) => (
          <Grid item key={date} className="grid-item">
            <Typography variant="body1">{daysOfWeek[index]}</Typography>
            <Typography variant="body1">{date.toLocaleDateString()}</Typography>
          </Grid>
        ))}
      </Grid>
      <Grid item className="navbar-tablet">
        <div>Navbar</div>
      </Grid>
      <Grid item className="navbar-mobile">
        <div>Navbar</div>
      </Grid>
    </Grid>
  );
}

export default HorizontalCalendar;
