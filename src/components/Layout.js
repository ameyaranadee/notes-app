import { makeStyles } from '@material-ui/core';
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { format } from 'date-fns'
import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        page: {
            backgroundColor: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth,
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1,
        }
    }
})

export default function Layout({ children }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: "My notes",
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create'
        },
    ];

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar}
                elevation={0} color="primary">
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Ameya
                    </Typography>
                    <Avatar src="/bat-av.png" />
                </Toolbar>
            </AppBar>
            <Drawer className={classes.drawer} variant="permanent" anchor="left"
                classes={{ paper: classes.drawerPaper }}>
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Ameya's notes
                    </Typography>
                </div>
                <List>
                    {menuItems.map(item => (
                        <ListItem onClick={() => history.push(item.path)} button key={item.text}
                            className={location.pathname == item.path ? classes.active : null}>
                            <ListItemIcon> {item.icon} </ListItemIcon>
                            <ListItemText> {item.text} </ListItemText>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div >
    )
}