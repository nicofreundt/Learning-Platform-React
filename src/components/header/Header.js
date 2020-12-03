import React from 'react';
import Jdenticon from 'react-jdenticon';
import auth from '../../auth';
import { Typography, Button, Switch, ThemeProvider } from '@material-ui/core';
import './Header.scss';
import { withRouter } from 'react-router-dom';

const Header = (props) => {


    return (
        <div className="head">
            <ThemeProvider theme={props.theme}>
                <div className="userName">
                    <Jdenticon size="48" value={props.value}/>
                    <Typography className="typography" variant="body1" align="center">{"Hey, " + props.value}</Typography>
                </div>
                <Typography variant="h3">Lernplattform</Typography>
                <div className="buttons">
                    <div style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", marginRight: "50px"}}>
                        <p className={props.variable === "dark" ? "activeTheme" : "inactiveTheme"}>Dark</p>
                        <Switch className="btn" color="default" onChange={() => props.func()}/>
                        <p className={props.variable === "light" ? "activeTheme" : "inactiveTheme"}>Light</p>
                    </div>
                    <Button className="btn" onClick={() => {props.newTask()}}>Add Task</Button>
                    <Button className="btn" onClick={
                        () => {
                            auth.logout(() => {props.history.push("/login")})
                        }
                    }>Logout</Button>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default withRouter(Header);