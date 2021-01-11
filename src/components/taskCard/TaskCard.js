import React from 'react';
import './TaskCard.scss'
import { Typography } from '@material-ui/core';
import ReactMarkdown from 'react-markdown';

const TaskCard = (props) => {

    var f = props.active ? "active" : "finished";

    return (
        <div id="sample" className={f + " taskCard"}>
            <Typography variant="body2">
                <ReactMarkdown>{props.value.Text}</ReactMarkdown>
            </Typography>
        </div>
    )
}

export default TaskCard;
