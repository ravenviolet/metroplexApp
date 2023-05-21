import './App.css';
import * as React from 'react';
// import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import MenuListComposition from './MenuList';
import "./MenuList.css";
import "./Calendar.css";
import CalendarView from './CalendarView';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './Theme';
// import JobDetails from './Information';

function App() {

  // const data = { /* your data here */ };

  return (
    <div className="App">
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
        {/* <ThemeProvider theme={theme}> */}
          <MenuListComposition />
          <CalendarView />
          {/* <JobDetails /> */}
          {/* </ThemeProvider> */}
        </StyledEngineProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;

