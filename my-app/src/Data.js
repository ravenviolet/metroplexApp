import React, { useEffect, useState } from 'react';
import './Data.css';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetchJobs from './useFetchJobs';
import { Typography, Box, FormControlLabel, Switch, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LinearProgress from '@mui/material/LinearProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import JobDetails from './JobDetails';
// import { timeZoneList } from './timeZones'; 

function Data() {
  const { jobs, error } = useFetchJobs();
  const [view, setView] = useState('deals');
  const [timeZone, setTimeZone] = useState('CST');
  const [searchText, setSearchText] = useState('');

  const columns = [
    { field: 'deal_id', headerName: 'Deal ID', sortable: true },
    { field: 'title', headerName: 'Title', sortable: true, minWidth: 250 },
    { field: 'event_date', headerName: 'Event Date', sortable: true },
    { field: 'event_start_time', headerName: 'Start Time', sortable: true },
    { field: 'stage_id', headerName: 'Stage ID', sortable: true },
    { field: 'city_name', headerName: 'City', sortable: true },
    { field: 'state_name', headerName: 'State', sortable: true },
    { field: 'community_name', headerName: 'Community', sortable: true },
    { field: 'technician_name', headerName: 'Technician', sortable: true },
    { field: 'event_status_name', headerName: 'Accepted', sortable: true },
    
    //... Other columns go here
  ];

  // Convert jobs into a format suitable for the data grid
  const rows = Object.values(jobs).flat().map((job, index) => {
    return {
      id: index,
      ...job,
      technician_name: job.technician_fields?.name,
      event_status_name: job.active // add your own path if event_status is nested
    };
  });
  

  return (
    <div style={{ height: 400, width: '80%', paddingRight: 50, marginLeft: 150, marginRight: 150 }}>
      <Box display="flex" justifyContent="space-between" alignItems="space-between" marginBottom={2}>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select=label">Data</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              
              
              
            >
              <MenuItem value={view === 'deals'} onChange={(e) => setView(e.target.view ? 'technicians' : 'deals')}>Jobs</MenuItem>
              <MenuItem value={view === 'technicians'} onChange={(e) => setView(e.target.view ? 'technicians' : 'deals')}>Technicians</MenuItem>
              </Select>
              
          </FormControl>
          <FormControlLabel
            control={
              <Switch
                checked={timeZone === 'CST'}
                onChange={(e) => setTimeZone(e.target.checked ? 'CST' : 'EST')} // Replace with actual logic for setting timezone
                name="timezoneToggle"
                color="primary"
              />
            }
            label="Timezone: CST"
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>
      <DataGrid rows={rows} columns={columns} slots={{ toolbar: GridToolbar}} pageSize={5} />
    </div>
  );
}

export default Data;
