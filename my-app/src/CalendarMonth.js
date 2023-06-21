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
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import JobDetails from './JobDetails';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

function CalendarMonth({ currentDate, filteredJobs = {}}) {

  const [selectedJob, setSelectedJob] = useState(null);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

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

    const getJobOnDate = (day) => {
      let jobDetail;
      Object.entries(filteredJobs).forEach(([technicianName, technicianJobs]) => {
        technicianJobs.forEach((job) => {
          const jobDate = new Date(job.event_date + 'T00:00:00Z');
          if (jobDate.toISOString().slice(0, 10) === day.toISOString().slice(0, 10)) {
            if (!jobDetail) jobDetail = {};
            if (!jobDetail[technicianName]) jobDetail[technicianName] = [];
            jobDetail[technicianName].push(job);
          }
        });
      });
      return jobDetail;
    };

return (
  <div>
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
      {week.map((day) => {
        const jobs = getJobOnDate(day);
        return (
          <Grid key={day.toISOString()} item xs>
            <Typography align="center">
              {format(day, 'd')}
              {jobs && Object.entries(jobs).map(([technicianName, technicianJobs]) =>
                technicianJobs.map((job, index) => (
                  <Tooltip
                  key={index}
                  title={
                    <React.Fragment>
                      <Typography variant="subtitle2">Technician: {technicianName}</Typography>
                      <Typography variant="subtitle2">Technician: {job.event_date}</Typography>
                      <Typography variant="subtitle2">Technician: {job.event_start_time}</Typography>
                      <Typography variant="subtitle2">Deal ID: {job.deal_id}</Typography>
                      <Typography variant="subtitle2">Deal Notes: {job.deal_notes || 'N/A'}</Typography>
                      <Typography variant="subtitle2">Stage ID: {job.stage_id}</Typography>
                      <Typography variant="subtitle2">City Name: {job.city_name || 'N/A'}</Typography>
                      <Typography variant="subtitle2">State Name: {job.state_name || 'N/A'}</Typography>
                      <Typography variant="subtitle2">Community Name: {job.community_name || 'N/A'}</Typography>
                    </React.Fragment>
                  }
                  arrow
                >
                  <FiberManualRecordIcon key={index} fontSize="small" color="secondary" sx={{ cursor: 'pointer' }} onClick={() => handleJobClick({technicianName, job})} />
                  </Tooltip>
                )
              ))}
            </Typography>
          </Grid>
        );
      })}
        </Grid>
      ))}
    </Grid>
    <Dialog
        fullScreen
        open={Boolean(selectedJob)}
        onClose={handleClose}
        PaperProps={{
          style: {
            position: 'absolute',
            left: '50%',
            width: '50%',
            maxHeight: '100%',
            overflow: 'auto'
          },
        }}
      >
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
        {<JobDetails job={selectedJob} onClose={handleClose}/>}
      </Dialog>
    </div>
  );
}

export default CalendarMonth;