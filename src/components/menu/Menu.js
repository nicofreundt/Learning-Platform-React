import React from 'react';
import './Menu.scss';
import { makeStyles } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Content from '../content/Content';

function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
      paddingTop: "80px",
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
}));

const Menu = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs + ' menu'}>
                <Tab className="firstOne" label="Python" {...a11yProps(0)}></Tab> 
                <Tab label="Java" {...a11yProps(1)}></Tab>
                <Tab label="DB" {...a11yProps(2)}></Tab>
                <Tab label="Menüpunkt" {...a11yProps(3)}></Tab>
                <Tab label="Menüpunkt" {...a11yProps(4)}></Tab>
            </Tabs>
            
            <Content key={Math.random() % 2} topic="Python" value={value} index={0}></Content>
            <Content key={Math.random() + 3} topic="Java" value={value} index={1}></Content>
{/*             <Content tasks={props.tasks} value={value} index={2}>DB</Content>
            <Content tasks={props.tasks} value={value} index={3}>Menüpunkt 1</Content>
            <Content tasks={props.tasks} value={value} index={4}>Menüpunkt 2</Content> */}
        </div>
    );
}

export default Menu;