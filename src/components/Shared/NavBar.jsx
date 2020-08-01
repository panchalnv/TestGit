/* eslint-disable no-unused-vars */
import React, { Fragment, useState } from 'react';
import {
  Box, AppBar, Toolbar, IconButton, Typography, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import MobileRightMenuSlider from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import logoAvatar from '../../resources/images/logo.png';
import myAvatar from '../../resources/images/myAvatar.png';
import { MenuData } from '../../resources/data/PortfolioData';
import SideBarReverse from '../../resources/images/sidebar_reverse.png';
import SideBar from '../../resources/images/sidebar.png';
// import PropTypes from 'prop-types';

// Change Material-UI Styles
const useStyles = makeStyles((theme) => ({
  appBarStyle: {
    background: 'url() no-repeat center center fixed',
    boxShadow: 'none',
  },
  logoIconStyle: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginTop: theme.spacing(2),
  },
  titleStyle: {
    flexGrow: 1,
    color: 'tomato',
    fontSize: 'bold',
  },
  menuIconStyle: {
    color: 'white',
  },
  navSideBarStyle: {
    width: 250,
    //background: '#511',
    backgroundImage: `url(${SideBarReverse})`,
    backgroundSize: 'cover',
    height: '100%',
  },
  myAvatarStyle: {
    //display: 'block',
    margin: '0.5rem auto',
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  menuStyle: {
    color: 'tan',
  },
}));

const NavBar = (props) => {
  const [state, setState] = useState({ right: false });
  const classes = useStyles();

  // Control Open/Close Sidebar
  const toogleSideBar = (slider, isOpen) => () => {
    setState({
      ...state,
      [slider]: isOpen,
    });
  };

  // Create SideBar
  const sideBarList = (slider) => (
    <Box
      component="div"
      className={classes.navSideBarStyle}
      onClick={toogleSideBar(slider, false)}
    >
      <Link to="/">
        <Avatar src={myAvatar} alt="Nikunj Panchal" className={classes.myAvatarStyle} />
      </Link>
      <Divider style={{ backgroundColor: '#3498DB' }} />
      <List>
        {
          MenuData.map((item) => (
            <ListItem key={item.key} button component={Link} to={item.listPath}>
              <ListItemIcon className={classes.menuStyle}>{item.listIcon}</ListItemIcon>
              <ListItemText className={classes.menuStyle} primary={item.listText} />
            </ListItem>
          ))
        }
      </List>
    </Box>
  );

  return (
    <>
      <Box component="nav">
        <AppBar position="static" className={classes.appBarStyle}>
          <Toolbar>
            <NavLink to="/">
              <Avatar src={logoAvatar} alt="site-logo" variant="square" className={classes.logoIconStyle} />
            </NavLink>
            <Typography variant="h5" className={classes.titleStyle}></Typography>
            <IconButton onClick={toogleSideBar('right', true)}>
              <MenuIcon className={classes.menuIconStyle} />
            </IconButton>
            <MobileRightMenuSlider
              open={state.right}
              onClose={toogleSideBar('right', false)}
              anchor="right"
            >
              {sideBarList('right')}
            </MobileRightMenuSlider>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

NavBar.propTypes = {
};

export default NavBar;
