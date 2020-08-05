/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Avatar, Grid } from '@material-ui/core';
import Typed from 'react-typed';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import myAvatar from '../../resources/images/myAvatar.png';
import Social from '../Shared/Social';
//import PropTypes from 'prop-types';

// Change Material-UI Styles
const useStyles = makeStyles((theme) => ({
  myAvatarStyle: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: theme.spacing(1),
  },
  title: {
    color: 'tomato',
  },
  subtitle: {
    color: 'tan',
    marginBottom: '3rem',
  },
  sloganStyle: {
    color: 'white',
    marginBottom: '3rem',
  },
  typedContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //width: '100vw',
    textAlign: 'center',
    zIndex: 1,
  },
}));

function Header(props) {
  const classes = useStyles();
  return (
    <Box className={classes.typedContainer}>
      <Grid container justify="center">
        <Avatar src={myAvatar} alt="Nikunj Panchal" className={classes.myAvatarStyle}></Avatar>
      </Grid>
      <Typography variant="h4" className={classes.title}>
        <Typed
          strings={['Nikunj Panchal']}
          typeSpeed={40}
        />
      </Typography>
      <Typography variant="h5" className={classes.subtitle}>
        <Typed
          strings={['Full Stack Developer', 'Web Developer', 'Mobile Developer', 'Freelance Developer']}
          typeSpeed={40}
          backSpeed={50}
          loop
        />
      </Typography>
      <Typography variant="h5" className={classes.sloganStyle}>
        ReactJS | ExtJS | Sencha Touch | .NET | Swift | Python | Flutter
      </Typography>
      <Social />
    </Box>
  );
}

Header.propTypes = {
};

export default Header;
