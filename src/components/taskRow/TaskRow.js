import React, { Component } from 'react';
import TaskCard from '../taskCard/TaskCard';
import { ArrowForwardIos, ArrowBackIos } from '@material-ui/icons';
import { Button } from '@material-ui/core';

class TaskRow extends Component {
    constructor(props) {
        super(props);

        this.navRef = React.createRef();
        this.leftButton = React.createRef();
        this.rightButton = React.createRef();
    }

    scrollLeft = function (element, change, duration) {
        var start = element.scrollLeft,
            currentTime = 0,
            increment = 20;

        Math.easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        var animateScroll = function () {
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollLeft = val;
            if (currentTime < duration) {
                setTimeout(animateScroll, increment)
            }
        }
        animateScroll();
    }



    render() {
        var handleNav = (direction) => {
            if (direction === 'left') {
                this.scrollLeft(this.navRef.current, -1000, 200);
            } else {
                this.scrollLeft(this.navRef.current, 1000, 200);
            }
        };

        var tasks = this.props.tasks;

        function compare(a, b) {
            if (a.Number < b.Number) {
                return -1;
            }
            if (a.Number > b.Number) {
                return 1;
            }
            return 0;
        }

        tasks.sort(compare);

        console.log(tasks);

        return (
            <div className="taskRow">
                <div><Button onClick={() => handleNav('left')} id="left-button"><ArrowBackIos /></Button></div>
                <div className="parent" ref={this.navRef}>
                    {this.props.tasks.filter(task => task.Topic === this.props.topic).map(a =>
                        <div className="taskWrapper" onClick={() => this.props.func(a)} id={a.ID} key={a.ID}>
                            <TaskCard active={typeof this.props.statusArr !== 'undefined' ? !this.props.statusArr.get(a.ID) : true} className="child" value={a} />
                        </div>
                    )}
                </div>
                <div><Button onClick={() => handleNav('right')} id="right-button"><ArrowForwardIos /></Button></div>
            </div>
        )
    }
}

export default TaskRow
