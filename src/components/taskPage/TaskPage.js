import React, { Component } from 'react';
import './taskPage.scss';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Picture from '../../resources/images/code-3637299_1920.jpg';
import Picture2 from '../../resources/images/hacker-2883635_1920.jpg';
import Picture3 from '../../resources/images/question-mark-2883628_1920.jpg';
import { ArrowBack, ArrowForwardIosOutlined, ArrowBackIosOutlined, CheckCircleOutlineSharp, CheckCircleSharp } from '@material-ui/icons';

class TaskPage extends Component {

    constructor (props) {
        super(props);

        this.state = {
            checkedState: false
        }
    }

    images = [ Picture, Picture2, Picture3 ];
    bool = false;

    handleChange = (event) => {
        this.setState({checkedState: event.target.checked});
        this.setStatus(this.props.task.ID, localStorage.getItem('userID'));
        this.bool = true;
    }

    getStatus = (taskID, userID) => {
        //fetch status from backend

        const status = this.state.checkedState;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ taskID, userID, status })
        }

        const res = fetch('/status/get', requestOptions).then(res => res.json());

        res.then((result) => {
            this.setState({checkedState: result.status});
        });
    }

    setStatus = (taskID, userID) => {
        const status = this.state.checkedState ? 0 : 1;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ taskID, userID, status })
        }

        const res = fetch('/status/set', requestOptions).then(res => res.json());

        res.then((result) => {
            if(result.status !== 200) {
                console.log(result.message);
            }
        });
    }

    componentDidMount() {
        this.getStatus(this.props.task.ID, localStorage.getItem('userID'));
    }

    render() {
        var task = this.props.task;

        //this.getStatus();

        return (
            <div className="taskPage" style={{display: "flex", flexDirection: "column"}}>
                <p className="textWrapper" dangerouslySetInnerHTML={{__html: task.Text}}></p>
                <h3 className="imageTitle">Bilder und Grafiken</h3>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Slider previousButton={<ArrowBackIosOutlined fontSize="large"/>} nextButton={<ArrowForwardIosOutlined fontSize="large"/>}>
                        {this.images.map((image, index) => 
                            <div key={index}>
                                <img src={image} alt={"pic" + index}></img>
                            </div>)}
                    </Slider>
                </div>
                <div style={{justifyContent: "space-between", display: "flex"}}>
                    <Button onClick={() => this.props.func(this.bool)}><ArrowBack/>&nbsp;&nbsp;Back</Button>
                    <FormControlLabel
                        control={<Checkbox checked={this.state.checkedState} icon={<CheckCircleOutlineSharp />} checkedIcon={<CheckCircleSharp />} onChange={this.handleChange} name="checkedState" />}
                        label="Done"
                    />
                </div>
            </div>
        )
    }
}

export default TaskPage;