import React from 'react';
import Jdenticon from 'react-jdenticon';
import auth from '../../auth';
import { Typography, Button } from '@material-ui/core';
import './Header.scss';
import { withRouter } from 'react-router-dom';

const Header = (props) => {

    return (
        <div className="head">
            <div className="userName">
                <Jdenticon size="48" value={props.value}/>
                <Typography className="typography" variant="body1" align="center">{"Hey, " + props.value}</Typography>
            </div>
            <Typography variant="h3">Lernplattform</Typography>
            <div className="buttons">
                <Button className="btn" onClick={() => props.func()}>Button 1</Button>
                <Button className="btn">Button 2</Button>
                <Button className="btn" onClick={
                    () => {
                        auth.logout(() => {props.history.push("/login")})
                    }
                }>Logout</Button>
            </div>
        </div>
    );
}

export default withRouter(Header);