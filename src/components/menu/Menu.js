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
      zIndex: 2
    },
}));

const Menu = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <div data-testid={props.testid} className={classes.root}>
            <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs + ' menu'}>
                <Tab className="firstOne" label={<b>Python</b>} {...a11yProps(0)}></Tab> 
                {localStorage.getItem('user') !== 'nico_schueler' && <Tab label={<b>Java</b>} {...a11yProps(1)}></Tab>}
                <Tab label={<b>DB</b>} {...a11yProps(2)}></Tab>
                <Tab label={<b>Something</b>} {...a11yProps(3)}></Tab>
                <Tab label={<b>Something else</b>} {...a11yProps(4)}></Tab>
            </Tabs>
            
            <Content closeNewTask={props.closeNewTask} newTask={props.newTask} key={props.newTask + 1} topic="Python" value={value} index={0}></Content>
            {localStorage.getItem('user') !== 'nico_schueler' && <Content closeNewTask={props.closeNewTask} newTask={props.newTask} key={props.newTask + 3} topic="Java" value={value} index={1}></Content>}
            <Content closeNewTask={props.closeNewTask} newTask={props.newTask} key={props.newTask + 5} topic="DB" value={value} index={2}></Content>
            <Content closeNewTask={props.closeNewTask} newTask={props.newTask} key={props.newTask + 7} topic="Something" value={value} index={3}></Content>
            <Content closeNewTask={props.closeNewTask} newTask={props.newTask} key={props.newTask + 9} topic="SomethingElse" value={value} index={4}></Content>
        </div>
    );
}

export default Menu;