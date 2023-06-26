import React from 'react';
import { Typography } from '@mui/material';
import CalendarView from './CalendarView';

const Profile = ({ loggedInUser }) => {
    return (
      <div>
        <Typography variant="h4" component="h1">
          Welcome {loggedInUser}
        </Typography>
        <CalendarView />
      </div>
    );
  };
  
  export default Profile;
  
  import Profile from './Profile';
