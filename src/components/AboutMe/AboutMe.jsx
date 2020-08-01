/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Avatar, Grid, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import NavBar from '../Shared/NavBar';
import { PersonalDetails } from '../../resources/data/PortfolioData';
import myAvatar from '../../resources/images/myAvatar.png';
//import PropTypes from 'prop-types';

// Change Material-UI Styles
const useStyles = makeStyles((theme) => ({
  titleHeader: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    textAlign: 'center',
    zIndex: 1,
  },
  title: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'tan',
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
  linkStyle: {
    color: '#3498DB',
  },
  dividerStyle: {
    color: 'white',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  myAvatarStyle: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

function AboutMe(props) {
  const classes = useStyles();
  let aboutMe = PersonalDetails.filter((rec) => { return rec.key === 'AboutMe'; });
  if (aboutMe !== null) aboutMe = aboutMe[0].values;
  const s = <h1>Hello</h1>;
  return (
    <>
      <NavBar />
      <Box className={classes.typedContainer}>
        <Grid container justify="center">
          <Tooltip title="Nikunj Panchal" placement="top">
            <Avatar src={myAvatar} alt="Nikunj Panchal" className={classes.myAvatarStyle}></Avatar>
          </Tooltip>
        </Grid>
        <Typography variant="h3" className={classes.title}>
          About Me
        </Typography>
        <Typography variant="h6" className={classes.subtitle}>
          I am currently a Lead Software developer at <a href="https://www.steris.com/" rel="noopener noreferrer" target="_blank" className={classes.linkStyle}>STERIS</a>
          {
            aboutMe.map((point) => {
              return (
                <span key={`${point}-mainkey`}>
                  <span key={`${point}-secondarykey`} className={classes.dividerStyle}> | </span>
                  {point}
                </span>
              );
            })
          }
          <span className={classes.dividerStyle}> | </span>
          Please check out my <Link to="/resume" className={classes.linkStyle}>RESUME</Link>
        </Typography>
      </Box>
    </>
  );
}

AboutMe.propTypes = {
};

export default AboutMe;
