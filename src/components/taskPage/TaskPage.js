import React, { Component } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import './taskPage.scss';
import { Button } from '@material-ui/core';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import Picture from '../../resources/images/code-3637299_1920.jpg';
import Picture2 from '../../resources/images/hacker-2883635_1920.jpg';
import Picture3 from '../../resources/images/question-mark-2883628_1920.jpg';
import { ArrowBack, ArrowForwardIosOutlined, ArrowBackIosOutlined } from '@material-ui/icons';

class TaskPage extends Component {

    images = [ Picture, Picture2, Picture3 ];

    render() {
        var task = this.props.task;

        return (
            <div className="taskPage" style={{display: "flex", flexDirection: "column"}}>
                <p className="textWrapper" dangerouslySetInnerHTML={{__html: task.Text}}></p>
                <h3 style={{textAlign: "left", borderBottom: "1px solid #18FFFF"}}>Bilder und Grafiken</h3>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Slider previousButton={<ArrowBackIosOutlined fontSize="large"/>} nextButton={<ArrowForwardIosOutlined fontSize="large"/>}>
                        {this.images.map((image, index) => 
                            <div key={index}>
                                <img src={image} alt={"pic" + index}></img>
                            </div>)}
                    </Slider>
                </div>
                <SimpleImageSlider height="504" width="896" images={this.images}></SimpleImageSlider>
                <div style={{justifyContent: "left", display: "flex"}}>
                    <Button onClick={() => this.props.func()}><ArrowBack/>&nbsp;&nbsp;Back</Button>
                </div>
            </div>
        )
    }
}

export default TaskPage;