import React, { Component } from 'react';
import './Content.scss';
import { CircularProgress } from '@material-ui/core';
import TaskRow from '../taskRow/TaskRow';
import TaskPage from '../taskPage/TaskPage';

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            isLoading: true,
            task: null,
            selected: false
        };


        this.navRef = React.createRef();
    }

    componentDidMount() {
        this.setState({tasks: []})
        fetch(`/users/${this.props.topic}`)
            .then(res => res.json())    
            .then(aufgaben => this.setState({ tasks: aufgaben, isLoading: false }));
    }

    handleNav = (direction) => {
        if (direction === 'left') {
            this.navRef ? (this.navRef.current.scrollLeft -= 200) : console.log('Was soll das');
        } else {
            this.navRef ? (this.navRef.current.scrollLeft += 200) : console.log('Was soll das');
        }
    }

    selectedTask = (t) => {
        this.setState({task: t, selected: true});
    }

    unselectTask = () => {
        this.setState({task: null, selected: false});
    }



    render() {
        const tasks = this.state.tasks;
        const isLoading = this.state.isLoading;
        var level = '';

        var arr = [[], []];
        var levelNames = ['Anfänger', 'Fortgeschritten'];

        for (let i of tasks) {
            for(let j = 0; j < levelNames.length; j++) {
                if(i.Level === levelNames[j]) {
                    arr[j].push(i);
                }
            }
        }

        return (
            <div
                role="tabpanel"
                hidden={this.props.value !== this.props.index}
                id={`vertical-tabpanel-${this.props.index}`}
                aria-labelledby={`vertical-tab-${this.props.index}`}
                {...this.props.other}
                style={{marginLeft: '225px'}}
                >
                {this.props.value === this.props.index && (
                    <div>
                        {isLoading?
                            <CircularProgress style={{marginTop: '25%'}}/>
                            :
                            <div>
                                {this.state.selected ? 
                                    <div>
                                        <TaskPage task={this.state.task} func={this.unselectTask}/>
                                        {/* <TaskCard value={this.state.task}/>
                                        <Button style={{marginTop: "25px"}} onClick={() => this.unselectTask()}>Zurück</Button> */}
                                    </div>
                                :
                                    <>{arr.map(task => 
                                    
                                        <div key={task[0].ID}>
                                        
                                            {task[0].Level === level && task[0].Topic === this.props.topic ? 
                                                null 
                                                : 
                                                <h1 className="headLine">{level = task[0].Level}</h1>
                                            }

                                            <div className="task-container">
                                                <TaskRow func={this.selectedTask} topic={this.props.topic} tasks={task}/>
                                            </div>
                                            

                                        </div>
                                    )}</>
                                }
                                
                                
                            </div>
                        }
                        
                    </div>
                )}
            </div>
        );
        
    };
}

export default Content;