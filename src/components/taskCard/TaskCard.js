import React from 'react';
import './TaskCard.scss'
import { Typography } from '@material-ui/core';

const TaskCard = (props) => {

    return (
        <div id="sample" className="taskCard">
            <Typography dangerouslySetInnerHTML={{__html: props.value.Text}} variant="body2"></Typography>
        </div>
    )
}

export default TaskCard;
