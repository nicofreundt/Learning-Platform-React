import React from 'react';
import './TaskCard.scss'
import ReactMarkdown from 'react-markdown';

const TaskCard = (props) => {

    var f = props.active ? "active" : "finished";
    console.log(props.value.Text.split(/\n/));
    return (
        <div id="sample" className={f + " taskCard"}>
                <ReactMarkdown>{props.value.Text.split(/\n/)[0] + "\n" 
                + props.value.Text.split(/\n/)[1] 
                + props.value.Text.split(/\n/)[2] + "\n"
                + props.value.Text.split(/\n/)[6]}</ReactMarkdown>
        </div>
    )
}

export default TaskCard;
