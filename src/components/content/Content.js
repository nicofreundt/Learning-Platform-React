import React, { Component } from 'react';
import './Content.scss';
import { CircularProgress, Box, Typography } from '@material-ui/core';
import TaskRow from '../taskRow/TaskRow';
import TaskPage from '../taskPage/TaskPage';
import NewTask from '../newTask/newTask';
import { getTasksByTopic, getTaskStatusByUser } from '../../resources/backend';

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex" style={{ marginLeft: "25px" }}>
            <CircularProgress variant="static" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            isLoading: true,
            task: null,
            selected: false,
            status: [],
            updated: false,
            newTask: props.newTask,
            tstatus: false
        };

        this.navRef = React.createRef();
    }

    setNewTask() {
        this.setState({ newTask: true });
        console.log("Hallo")
    }

    componentDidMount() {
        getTasksByTopic(this.props.topic).then(aufgaben => this.setState({ tasks: aufgaben }));
        getTaskStatusByUser().then(status => this.setState({ status: status, isLoading: false }));
    }

    componentDidUpdate() {
        if (this.state.isLoading) {
            getTasksByTopic(this.props.topic).then(aufgaben => this.setState({ tasks: aufgaben }));
            getTaskStatusByUser().then(status => this.setState({ status: status, isLoading: false }));
        }
    }

    handleNav = (direction) => {
        if (direction === 'left') {
            this.navRef ? (this.navRef.current.scrollLeft -= 1500) : console.log('');
        } else {
            this.navRef ? (this.navRef.current.scrollLeft += 1500) : console.log('');
        }
    }

    selectedTask = (t, s) => {
        this.setState({ task: t, selected: true, tstatus: s });
    }

    unselectTask = (x) => {
        if (x) {
            this.setState({ isLoading: true });
        };
        this.setState({ task: null, selected: false });
    }

    render() {
        const tasks = this.state.tasks;
        const status = this.state.status;
        const isLoading = this.state.isLoading;
        var level = '';

        var arr = [];
        var arrS = [];
        var arrM = [];
        var levelNames = ['Anfänger', 'Fortgeschritten', 'Profi'];

        for (let i in levelNames) {
            var helpArray = tasks.filter(task => task.Topic === this.props.topic).filter(task => task.Level === levelNames[i]);
            var helpArrayS;
            if (status.length !== 0) {
                helpArrayS = status.filter(st => st.topic === this.props.topic).filter(s => s.level === levelNames[i]);
                var numPos = 0;
                var myMap = new Map();
                if (helpArrayS.length !== 0) {
                    for (let i of helpArrayS) {
                        if (i.status !== 0) {
                            numPos = numPos + 1;
                        }
                        myMap.set(i.id, i.status);
                    }
                    arrM[i] = myMap;
                    arrS[i] = Math.round((numPos / helpArray.length) * 100);
                };
            }
            if (helpArray.length !== 0) arr[i] = helpArray;
        }

        return (
            <div
                role="tabpanel"
                hidden={this.props.value !== this.props.index}
                id={`vertical-tabpanel-${this.props.index}`}
                aria-labelledby={`vertical-tab-${this.props.index}`}
                {...this.props.other}
                style={{ marginLeft: '225px' }}
            >
                {this.props.value === this.props.index && (
                    <div>
                        {isLoading ?
                            <CircularProgress style={{ marginTop: '25%' }} />
                            :
                            <div>
                                {this.state.newTask ? <NewTask closeNewTask={this.props.closeNewTask} /> :
                                    <>{this.state.selected ?
                                        <div>
                                            <TaskPage status={this.state.tstatus} task={this.state.task} func={this.unselectTask} />
                                        </div>
                                        :
                                        <>{arr.length !== 0 ?
                                            <>{arr.map((task, index) =>
                                                <div key={task[0].ID}>
                                                    {task[0].Level !== level ?
                                                        <h1 className="headLine">{level = task[0].Level}<CircularProgressWithLabel value={typeof arrS[index] !== 'undefined' ? arrS[index] : 0} /></h1>
                                                        :
                                                        null
                                                    }
                                                    <div className="task-container">
                                                        <TaskRow statusArr={arrM[index]} func={this.selectedTask} topic={this.props.topic} tasks={task} />
                                                    </div>
                                                </div>
                                            )}</>
                                            :
                                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", textAlign: "center", marginTop: "25%" }}>COULD NOT LOAD ANY TASKS</div>
                                        }</>
                                    }</>}
                            </div>
                        }
                    </div>
                )}
            </div>
        );

    };
}

export default Content;