import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import './JobDetails.css'; 

const JobDetails = ({ job }) => {
  return (
    <Paper elevation={3} className="job-details-container">
      <Typography variant="h6">
        Job Details
      </Typography>
      <Box>
        {/* <Typography variant="body1">
          Deal ID: {job.deal_id}
        </Typography>
        <Typography variant="body1">
          Stage ID: {job.stage_id}
        </Typography>
        <Typography variant="body1">
          Title: {job.title}
        </Typography>
        <Typography variant="body1">
          Value: {job.value} {job.currency}
        </Typography>
        <Typography variant="body1">
          Active: {job.active ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body1">
          Deleted: {job.deleted ? 'Yes' : 'No'}
        </Typography>
        <Typography variant="body1">
          Status: {job.status}
        </Typography>
        <Typography variant="body1">
          Label: {job.label}
        </Typography>
        <Typography variant="body1">
          Person Name: {job.person_name}
        </Typography>
        <Typography variant="body1">
          Organization Name: {job.org_name}
        </Typography>
        <Typography variant="body1">
          Pipeline: {job.pipeline}
        </Typography>
        <Typography variant="body1">
          Deal Notes: {job.deal_notes}
        </Typography>
        <Typography variant="body1">
          City: {job.city_name}
        </Typography>
        <Typography variant="body1">
          State: {job.state_name}
        </Typography>
        <Typography variant="body1">
          Community: {job.community_name}
        </Typography>
        <Typography variant="body1">
          Technician Name: {job.technician_name}
        </Typography>
        <Typography variant="body1">
          Timezone ID: {job.timezone_id}
        </Typography>
        <Typography variant="body1">
          Event Date: {job.event_date}
        </Typography>
        <Typography variant="body1">
          Event Start Time: {job.event_start_time}
        </Typography> */}
      </Box>
    </Paper>
  );
};

export default JobDetails;
