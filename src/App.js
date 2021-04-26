import React, { Component } from 'react';
import './App.scss';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import auth from './auth';
import { getSchuelerList } from './resources/backend';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Button, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeVariable: 'dark',
      newTask: false,
      role: 'schueler',
      open: false,
      schueler: null
    }
  }

  setNewTask = () => {
    this.setState({ newTask: !this.state.newTask });
  }

  componentDidMount() {
    auth.getRole().then(res => this.setState({ role: res }));
    getSchuelerList().then(res => this.setState({ schueler: res }));
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
      this.state.themeVariable === 'dark' ? this.setState({ themeVariable: 'light' }) : this.setState({ themeVariable: 'dark' });
    }

    var handleOpen = () => {
      this.setState({ open: !this.state.open })
    }

    return (
      <div className="App">
        <ThemeProvider theme={darkTheme}>
          <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleOpen}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Schüler"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {this.state.schueler && this.state.schueler.schueler.map(schueler => <React.Fragment key={schueler.user_id}>{schueler.username}<br/>{schueler.email}<br/><br/></React.Fragment>)}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOpen} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
          <Header list={handleOpen} role={this.state.role} history={this.props.history} variable={this.state.themeVariable} theme={darkTheme} func={themeChange} newTask={this.setNewTask} className="head" value={localStorage.getItem('user')} />
        </ThemeProvider>
        {this.state.themeVariable === 'dark' ?
          <ThemeProvider theme={darkTheme}>
            <Menu testid="test1" closeNewTask={this.setNewTask} newTask={this.state.newTask} className="menu" />
          </ThemeProvider>
          :
          <ThemeProvider theme={lightTheme}>
            <Menu testid="test2" closeNewTask={this.setNewTask} newTask={this.state.newTask} className="menu" />
          </ThemeProvider>
        }
      </div>
    );
  }
}

export default App;