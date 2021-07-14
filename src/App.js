import React, { Component } from 'react';
import './App.scss';
import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import auth from './auth';
import { getSchuelerList, getLogoutTimer, getList } from './resources/backend';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Button, Slide, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import IdleTimerContainer from './components/IdleTimerContainer';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

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
      schueler: null,
      idleTimer: 5000,
      logoutTimer: 5000
    }
  }

  setNewTask = () => {
    this.setState({ newTask: !this.state.newTask });
  }

  componentDidMount() {
    auth.getRole().then(res => this.setState({ role: res }));
    getSchuelerList().then(res => this.setState({ schueler: res }));
    getLogoutTimer().then(res => this.setState({ idleTimer: res.idleTimer, logoutTimer: res.logoutTimer }))
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

    var download = async () => {
      const fileName = "schuelerListe";
      const csvData = await getList();
      const aufgabenStatus = csvData.aufgabenStatus;
      const bereichStatusProUser = csvData.bereichStatusProUser;
      console.log(aufgabenStatus);
      var a = [];
      for(var o in aufgabenStatus) {
        if(aufgabenStatus[o].Titel == null && aufgabenStatus[o].status == null) {
          aufgabenStatus[o] = {username: aufgabenStatus[o].username, Thema: "Keine erfüllten Aufgaben!"};
          a.push(o);
        }
        if(aufgabenStatus[o].status === 1) {
          aufgabenStatus[o].status = "Erledigt"
        } else if(aufgabenStatus[o].status === 0) {
          aufgabenStatus[o].status = "In Bearbeitung"
        }
      }
      const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const fileExtension = '.xlsx';
      const ws = XLSX.utils.aoa_to_sheet([["Name", "Thema", "Level", "Prozent"]])
      XLSX.utils.sheet_add_json(ws, bereichStatusProUser, {origin: 2, skipHeader: true});
      XLSX.utils.sheet_add_aoa(ws, [["Name", "Thema", "Level", "Aufgabentitel", "Bearbeitungsstatus"]], {origin: bereichStatusProUser.length + 4, skipHeader: true});
      XLSX.utils.sheet_add_json(ws, aufgabenStatus, {origin: bereichStatusProUser.length + 6, skipHeader: true});
      var merge = [];
      for(var c of a) {
        var row = parseInt(c) + bereichStatusProUser.length + 6;
        console.log({row: row});
        merge.push({ s: { r: row , c: 1 }, e: { r: row , c: 4 } })
      }
      ws["!merges"] = merge;
      ws["!cols"] = [{wch: 25}, {wch: 25}, {wch: 25}, {wch: 25}, {wch: 25}]
      console.log(ws["!merges"]);
      const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
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
            <DialogTitle id="alert-dialog-slide-title">{"Schüler:innen"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {this.state.schueler && this.state.schueler.schueler.map(schueler => <React.Fragment key={schueler.user_id}>{schueler.username}<br />{schueler.email}<br /><br /></React.Fragment>)}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={download} color="primary">
                Download
              </Button>
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
        <IdleTimerContainer idleTimer={this.state.idleTimer} logoutTimer={this.state.logoutTimer} history={this.props.history} />
      </div>
    );
  }
}

export default App;