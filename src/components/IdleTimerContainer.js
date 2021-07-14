import React, { useState, useRef, useEffect } from 'react'
import IdleTimer from 'react-idle-timer';
import { Button, Slide, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import auth from '../auth';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const IdleTimerContainer = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [timeLeft, setTimeLeft] = useState(null);
    const idleTimerRef = useRef(null)
    const sessionTimeOutRef = useRef(null)

    const onIdle = () => {
        setTimeLeft(props.logoutTimer);
        setModalIsOpen(true);
        sessionTimeOutRef.current = setTimeout(logout, props.logoutTimer * 1000);
    }

    const stayActive = () => {
        setModalIsOpen(false);
        clearTimeout(sessionTimeOutRef.current);
    }

    const logout = () => {
        setModalIsOpen(false);
        clearTimeout(sessionTimeOutRef.current);
        auth.logout(() => { props.history.push('/login') })
    }

    useEffect(() => {
        if(modalIsOpen) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1)
            }, 1000);
            
            return () => clearTimeout(timer);
        }
    });

    return (
        <div>
            <Dialog
                open={modalIsOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={stayActive}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Sitzung läuft ab - {timeLeft} {timeLeft > 1 ? "Sekunden" : "Sekunde"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Willst du angemeldet bleiben?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={stayActive} color="primary">
                        Ja
                    </Button>
                    <Button onClick={logout} color="primary">
                        Nein, abmelden
                    </Button>
                </DialogActions>
            </Dialog>
            <IdleTimer ref={idleTimerRef} timeout={props.idleTimer * 1000} onIdle={onIdle}></IdleTimer>
        </div>
    )
}

export default IdleTimerContainer
