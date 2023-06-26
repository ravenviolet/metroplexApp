import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function LoginPage(props) {
  const [name, setUsername] = useState('');
  const [passwordVal, setPassword] = useState('');
  // const [adminFlag, setadminFlag] = useState('';

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("About to send request");
      const response = await axios.post('http://localhost:3000/api/users/login', { name, passwordVal });
      console.log(response);
      
      if (response.data.isAdmin) {
        props.onLogin(response.data);
      } else {
        console.log(error);
        alert('You do not have admin access');
      }

    } catch (error) {
      console.log(error);
      alert('Invalid username or password');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          label="Username"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Password"
          type="password"
          value={passwordVal}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" type="submit">
          Log in
        </Button>
      </form>
    </div>
  );
}
