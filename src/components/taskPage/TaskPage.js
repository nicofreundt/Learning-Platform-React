import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import './taskPage.scss';
import { Button, makeStyles, Fab, CircularProgress } from '@material-ui/core';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { ArrowBack, ArrowForwardIosOutlined, ArrowBackIosOutlined } from '@material-ui/icons';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import { green } from '@material-ui/core/colors';
import SimpleImageSlider from 'react-simple-image-slider';

function TaskPage(props) {

    const [checkedState, setCheckedState] = useState(false);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    const handleChange = (event) => {
        if(!checkedState) {
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

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ taskID, userID, status })
        }

        const res = fetch('/status/set', requestOptions).then(res => res.json());

        res.then((result) => {
            if(result.status !== 200) {
                console.log(result.message);
            } else {
                setLoading(false);
                setCheckedState(!checkedState);
            }
        })   
    }
    
    useEffect(() => {
        const getStatus = (taskID, userID) => {
            //fetch status from backend
    
            const status = checkedState;
    
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ taskID, userID, status })
            }
    
            const res = fetch('/status/get', requestOptions).then(res => res.json());
    
            res.then((result) => {
                setCheckedState(result.status);
                setLoading(false);
            });
        }
        const getImages = async () => {
            const res = await fetch(`/images/paths/${props.task.ID}`).then(res => res.json());
            console.log(res);
            const arr = [];
            for(var i of res) {
                arr.push({url: "/images/" + i.imagePath});
            }
            setImages(arr);
        }
        getStatus(props.task.ID, localStorage.getItem('userID'));
        getImages();
    }, [props.task.ID, checkedState]);

    var task = props.task;

    const classes = useStyles();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: checkedState,
        });

    return (
        <div className="taskPage" style={{display: "flex", flexDirection: "column"}}>
            <p className="textWrapper">
                <ReactMarkdown>{task.Text}</ReactMarkdown>
            </p>
            <h3 className="imageTitle">Bilder und Grafiken</h3>
            <div style={{display: "flex", justifyContent: "center"}}>
                <SimpleImageSlider width={896} height={504} images={images}/>{/* 
                <Slider previousButton={<ArrowBackIosOutlined fontSize="large"/>} nextButton={<ArrowForwardIosOutlined fontSize="large"/>}>
                    {images.map((image, index) => 
                        <div key={index}>
                            <img src={"http://localhost:3001/images/" + image.imagePath} alt={"pic" + index}></img>
                        </div>)}
                </Slider> */}
            </div>
            <div style={{justifyContent: "space-between", display: "flex"}}>
                <Button onClick={() => props.func(true)}><ArrowBack/>&nbsp;&nbsp;Back</Button>
                {/* <FormControlLabel
                    control={<Checkbox checked={state.checkedState} icon={<CheckCircleOutlineSharp />} checkedIcon={<CheckCircleSharp />} onChange={handleChange} name="checkedState" />}
                    label="Done"
                /> */}
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