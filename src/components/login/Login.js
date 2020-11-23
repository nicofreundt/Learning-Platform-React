import React, { useState } from 'react';
import './Login.scss';
import { TextField, Typography, Button, Switch } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AccountCircle, Lock, Mail } from '@material-ui/icons/';
import auth from '../../auth';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';



const Login = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [switchStatus, setSwitchStatus] = useState(false);

    const handleChangeUser = (e) => {
        setUsername(e.target.value);
    }

    const handleChangePW = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeMail = (e) => {
        setMail(e.target.value);
    }

    const handleChangeSwitch = (event) => {
        setSwitchStatus(event.target.checked);
    }

    const login = () => {
        auth.login(() => {
            props.history.push(`/`);
        }, username, password)
    }

    const signup = () => {
        auth.signup(() => {
            //props.history.push('/login');
        }, username, password, mail);
        alert(`username: ${username}\npassword: ${password}\nmail: ${mail}`);
        setSwitchStatus(false);
    }

    const handleKeyUp = (event) => {
        if(event.key === "Enter") {
            login();
        }
    }

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

    if (localStorage.getItem('user')) {
        return <Redirect to={
            {
                pathname: "/",
                state: {
                    from: props.location
                }
            }
        }/>
    } else {
        return (
            <div className="logPage">
                <ThemeProvider theme={theme}>
                    <Typography variant="h1">Login Page</Typography>
                    <div className="form">
                        <div className="lsSwitch">
                            <Typography>Login</Typography>
                            <Switch
                                checked={switchStatus}
                                onChange={handleChangeSwitch}
                            />
                            <Typography>Sign Up</Typography>
                        </div>
                        <div>
                            <AccountCircle/>
                            <TextField label="Username" value={username} onChange={handleChangeUser}/>
                        </div>
                        <div>
                            <Lock/>
                            <TextField onKeyUp={handleKeyUp} type="password" label="Password" value={password} onChange={handleChangePW}/>
                        </div>
                        {switchStatus &&
                            <div>
                                <Mail/>
                                <TextField label="E-Mail" value={mail} onChange={handleChangeMail}/>
                            </div>
                        }
                        <Button onClick={switchStatus ? signup : login} variant="outlined" color="primary">Submit</Button>
                    </div>
                </ThemeProvider>
                
                
            </div>
        )
    }

    
}

export default Login;