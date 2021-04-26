import React from 'react';
import { Button, ThemeProvider, createMuiTheme, Typography } from '@material-ui/core';
import './Start.scss';

const Start = () => {
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

    return (
        <div className="start">
            <div className="headlines">
                <Typography variant="h1">Willkommen auf meiner Website</Typography>
                <Typography variant="h2">Wohin soll's weiter gehen?</Typography>
            </div>
            <div className="Buttons">
                <ThemeProvider theme={darkTheme}>
                    <Button color="primary" variant="outlined" href="/nextcloud">Nextcloud</Button>
                    <Button color="primary" variant="outlined" href="/learning">Lernplattform</Button>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default Start;