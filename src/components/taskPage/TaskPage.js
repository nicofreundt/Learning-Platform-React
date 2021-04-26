import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import './taskPage.scss';
import { Button, makeStyles, Fab, CircularProgress } from '@material-ui/core';
import 'react-animated-slider/build/horizontal.css';
import { ArrowBack } from '@material-ui/icons';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { green } from '@material-ui/core/colors';
import SimpleImageSlider from 'react-simple-image-slider';
import { getImagesForTask, getSpecificTaskStatus, setStatusForTask, BASE_URL } from '../../resources/backend';

function TaskPage(props) {

    const [checkedState, setCheckedState] = useState(props.status);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    const handleChange = (event) => {
        if (!checkedState) {
            setLoading(true);
            setStatus(props.task.ID, localStorage.getItem('userID'));
        } else {
            alert('Diese Aufgabe ist bereits bearbeitet. Eine weitere Statusänderung ist nicht möglich.');
        }
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }));

    const setStatus = (taskID, userID) => {
        const status = checkedState ? 0 : 1;

        setStatusForTask(taskID, userID, status).then((result) => {
            if (result.status !== 200) {
                console.log(result.message);
            } else {
                setLoading(false);
                setCheckedState(!checkedState);
            }
        })
    }

    const getStatus = async (taskID, userID) => {
        //fetch status from backend

        const status = checkedState;

        getSpecificTaskStatus(taskID, userID, status).then((result) => {
            console.log(result);
            setCheckedState(result.status);
        });
    }

    const getStatusRef = useRef(getStatus);

    const getImages = async () => {
        const res = await getImagesForTask(props.task.ID);
        console.log(res);
        const arr = [];
        for (var i of res) {
            arr.push({ url: `${BASE_URL}/images/${i.imagePath}` });
            console.log(i.imagePath);
        }
        setImages(arr);
        console.log(arr);
        setLoading(false);
    }

    const getImagesRef = useRef(getImages);

    useEffect(() => {
        getStatusRef.current(props.task.ID, localStorage.getItem('userID'));
        //getStatus(props.task.ID, localStorage.getItem('userID'));
        //getImages();
        getImagesRef.current();
    }, [props.task.ID, checkedState]);

    var task = props.task;

    const classes = useStyles();

    const buttonClassname = clsx({ [classes.buttonSuccess]: checkedState });

    return (
        <div className="taskPage" style={{ display: "flex", flexDirection: "column" }}>
            <p className="textWrapper">
                <ReactMarkdown>{task.Text}</ReactMarkdown>
            </p>
            {images.length > 0 && <h3 className="imageTitle">Bilder und Grafiken</h3>}
            <div style={{ display: "flex", justifyContent: "center" }}>
                {loading && <CircularProgress size={68} />}
                {images.length > 0 && <SimpleImageSlider width={896} height={504} images={images} />}
            </div>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
                <Button onClick={() => props.func(true)}><ArrowBack />&nbsp;&nbsp;Back</Button>
                <div className={classes.wrapper}>
                    <Fab
                        aria-label="save"
                        color="primary"
                        className={buttonClassname}
                        onClick={handleChange}
                    >
                        {checkedState ? <CheckIcon /> : <SaveIcon />}
                    </Fab>
                    {loading && <CircularProgress size={68} className={classes.fabProgress} />}
                </div>
            </div>
        </div>
    )
}

export default TaskPage;