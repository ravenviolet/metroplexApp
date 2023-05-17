import './App.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import MenuListComposition from './MenuList';
import CalendarView from './CalendarView';
// import JobDetails from './Information';

function App() {

  // const data = { /* your data here */ };

  return (
    <div className="App">
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <MenuListComposition />
          <CalendarView />
          {/* <JobDetails /> */}
        </StyledEngineProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;

