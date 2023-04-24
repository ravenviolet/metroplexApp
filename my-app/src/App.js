import logo from './logo.svg';
import './App.css';
// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import HorizontalCalendar from './Calendar';
// import { Grid, Typography } from '@mui/material';
// import { Dashboard } from '../src/components/';

function App() {

  // const data = { /* your data here */ };

  return (
    <div className="App">
      {/* /*{ <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>  */}
      <div className="App">
        <HorizontalCalendar />
      </div>
      <div>
      <Button variant="contained" color="primary">
        Click me!
      </Button>
    </div>
    </div>
  );
}

export default App;

