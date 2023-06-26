import React from 'react';
import { Typography } from '@mui/material';
import CalendarView from './CalendarView';

function Profile({ user }) {
    return (
      <div>
        <h2>Your Profile</h2>
        <h2>Hello, {user.username}!</h2>
        <p>Username: {user.username}</p>
        <p>Admin: {user.isAdmin ? 'Yes' : 'No'}</p>
      </div>
    );
  }
  
  export default Profile;
  
//   import Profile from './Profile';
