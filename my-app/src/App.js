import './App.css';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material/styles';
import MenuListComposition from './MenuList';
import StickyHeadTable from './Calendar';


function App() {

  // const data = { /* your data here */ };

  return (
    <div className="App">
      <React.StrictMode>
        <StyledEngineProvider injectFirst>
          <MenuListComposition />
          <StickyHeadTable />
        </StyledEngineProvider>
      </React.StrictMode>
    </div>
  );
}

export default App;

