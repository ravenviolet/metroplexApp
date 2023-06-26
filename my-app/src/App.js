import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import MenuListComposition from './MenuList';
import "./MenuList.css";
import "./Calendar.css";
import "./Data.css";
import CalendarView from './CalendarView';
import Data from './Data';
import './App.css';
import LoginPage from './loginPage';
// import { ThemeProvider } from '@mui/material/styles';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return loggedInUser ? (
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
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}

export default App;

