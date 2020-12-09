import React, { Component } from 'react';
import './App.scss';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import { withRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeVariable: 'dark',
      newTask: false
    }
  }

  render() {
    var darkTheme = createMuiTheme({
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

    var lightTheme = createMuiTheme({
      palette: {
          primary: {
              main: '#E20074',
              dark: '',
          },
          secondary: {
              main: '#E20074',
              dark: '',
          },
          type: 'light'
      }
    })

    document.body.classList.add(this.state.themeVariable);

    var themeChange = () => {
      document.body.classList.remove(this.state.themeVariable);
      this.state.themeVariable === 'dark' ? this.setState({themeVariable: 'light'}) : this.setState({themeVariable: 'dark'});
    }

    var setNewTask = () => {
      this.setState({newTask: !this.state.newTask});
    }
    
    return (
      <div className="App">
        <ThemeProvider theme={darkTheme}>
          <Header variable={this.state.themeVariable} theme={darkTheme} func={themeChange} newTask={setNewTask} className="head" value={localStorage.getItem('user')}/>
        </ThemeProvider>
        {this.state.themeVariable === 'dark' ?
          <ThemeProvider theme={darkTheme}>
            <Menu closeNewTask={setNewTask} newTask={this.state.newTask} className="menu"/>
          </ThemeProvider>
        :
          <ThemeProvider theme={lightTheme}>
            <Menu closeNewTask={setNewTask} newTask={this.state.newTask} className="menu"/>
          </ThemeProvider>
        }
      </div>
    );
  }
}

export default withRouter(App);