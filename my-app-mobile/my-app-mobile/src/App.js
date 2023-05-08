import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./App.css";
import Calendar from "./Calendar";
import LoginPage from "./LoginPage";
import logo from "./logo.svg";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      {loggedInUser ? (
        <Calendar user={loggedInUser} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </ThemeProvider>
  );
}
