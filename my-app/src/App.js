import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import MenuListComposition from './MenuList';
import "./MenuList.css";
import "./Calendar.css";
import CalendarView from './CalendarView';
import Data from './Data';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
// import theme from './Theme';
// import JobDetails from './Information';


function App() {

  // const data = { /* your data here */ };

  return (
    <Router>
    <div className="App">
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
        {/* <ThemeProvider theme={theme}> */}
          <MenuListComposition />
          <Routes>
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/data" element={<Data />} />
          {/* <JobDetails /> */}
          {/* </ThemeProvider> */}
          </Routes>
        </StyledEngineProvider>
      </React.StrictMode>
    </div>
    </Router>
  );
}

export default App;

