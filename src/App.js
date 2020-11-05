import React, { Component } from 'react';
import './App.css';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import { withRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#18FFFF',
          dark: '',
      },
      secondary: {
          main: '#18FFFF',
          dark: '',
      },
      type: 'dark'
  }
})


class App extends Component {


  
  render() {
    
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Header className="headsWillRoll" value={localStorage.getItem('user')}/>
          <Menu className="menu"/>
        </ThemeProvider>
      
      </div>
    );
  }
}

export default withRouter(App);