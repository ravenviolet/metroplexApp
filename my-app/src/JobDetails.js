import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const JobDetails = ({ job }) => {
  if (!job) return null;

  return (
    <Card>
      <CardContent>
        <Typography variant="h2" gutterBottom>
          {job.title}
        </Typography>
        <Typography>
          <p>Deal ID:</p>{job.deal_id}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body1">
              Start Time: {job.event_start_time}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              Date: {job.event_date}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              Timezone: {/*Pull in your timezone data here*/}
            </Typography>
          </Grid>
        </Grid>
        <Typography>
        <p>Deal Notes:</p>{job.deal_notes}
        </Typography>
        <Typography>
        <p>Stage ID:</p>{job.stage_id}
        </Typography>
        <Typography>
        <p>City:</p>{job.city_name}
        </Typography>
        <Typography>
        <p>State:</p>{job.state_name}
        </Typography>
        <Typography>
        <p>Community Name:</p>{job.community_name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobDetails;
