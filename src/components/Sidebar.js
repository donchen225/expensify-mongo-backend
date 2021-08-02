import React from 'react';

import clsx from 'clsx';
import { useStyles } from '../styles/useStyles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { mainIconsList, secondaryIconsList } from './IconsList';

const Sidebar = ({ handleDrawerClose, open }) => {
    const classes = useStyles();
    return (
        <Drawer
            variant="permanent"
            classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)}}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List>{mainIconsList}</List>
            <Divider />
            <List>{secondaryIconsList}</List>
        </Drawer>
    )
}

export default Sidebar;