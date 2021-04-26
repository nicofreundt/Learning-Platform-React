import React from 'react';
import './TaskCard.scss'
import ReactMarkdown from 'react-markdown';

const TaskCard = (props) => {

    var f = props.active ? "active" : "finished";

    return (
        <div id="sample" className={f + " taskCard"}>
                <ReactMarkdown>{props.value.Text}</ReactMarkdown>
        </div>
    )
}

export default TaskCard;
