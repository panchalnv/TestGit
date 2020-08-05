/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Avatar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import EmailIcon from '@material-ui/icons/Email';
import NavBar from '../Shared/NavBar';
import { PersonalDetails } from '../../resources/data/PortfolioData';
import Social from '../Shared/Social';
//import PropTypes from 'prop-types';

// Change Material-UI Styles
const useStyles = makeStyles((theme) => ({
  title: {
    color: 'tomato',
    fontWeight: 'bold',
    marginBottom: '3rem',
  },
  subtitle: {
    color: '#3498DB',
    marginBottom: '3rem',
  },
  subtitleContainer: {
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
}));

function Contact(props) {
  const classes = useStyles();
  let cell = PersonalDetails.filter((rec) => rec.key === 'Cell');
  if (cell !== null) cell = cell[0].value;
  let email = PersonalDetails.filter((rec) => rec.key === 'Email');
  if (email !== null) email = email[0].value;
  return (
    <>
      <NavBar />
      <Box className={classes.typedContainer}>
        <Typography variant="h3" className={classes.title}>
          Get in Touch
        </Typography>
        <Typography variant="h5" className={classes.subtitleContainer}>
          <SmartphoneIcon /> <a href={`tel:+1${cell}"`} className={classes.subtitle}>{cell}</a><br />
          <EmailIcon /> <a href={`mailto:${email}`} className={classes.subtitle}>{email}</a>
        </Typography>
        <Social />
      </Box>
    </>
  );
}

Contact.propTypes = {
};

export default Contact;
