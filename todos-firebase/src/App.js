import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {


const theme = createTheme({
  typography: {
    fontFamily: [
      'Rubik',
      'Assistant',
    ].join(','),
  },});

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Routes >
            <Route path="/" element={ <Home /> }/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/signup" element={ <Signup /> }/>
          </Routes >
        </div>
      </Router>
    </ThemeProvider>

  );
}
export default App;