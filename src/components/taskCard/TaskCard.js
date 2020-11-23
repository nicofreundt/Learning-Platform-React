import React from 'react';
import './TaskCard.scss'
import { Typography } from '@material-ui/core';

const TaskCard = (props) => {

    var f = props.active ? "active" : "finished";

    return (
        <div id="sample" className={f + " taskCard"}>
            <Typography dangerouslySetInnerHTML={{__html: props.value.Text}} variant="body2"></Typography>
        </div>
    )
}

export default TaskCard;
