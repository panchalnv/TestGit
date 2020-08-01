/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, Avatar, Grid } from '@material-ui/core';
import Facebook from '../../resources/images/social/Facebook.png';
import LinkedIn from '../../resources/images/social/Linkedin.png';
import Github from '../../resources/images/social/Github.png';
//import PropTypes from 'prop-types';

function Social(props) {
  return (
    <>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <Grid item>
            <a href="https://www.linkedin.com/in/panchalnv/" rel="noopener noreferrer" target="_blank">
              <Avatar src={LinkedIn} alt="LinkedIn" variant="square"></Avatar>
            </a>
          </Grid>
          <Grid item>
            <a href="https://github.com/panchalnv" rel="noopener noreferrer" target="_blank">
              <Avatar src={Github} alt="GitHub" variant="square"></Avatar>
            </a>
          </Grid>
          <Grid item>
            <a href="https://www.facebook.com/panchalnv" rel="noopener noreferrer" target="_blank">
              <Avatar src={Facebook} alt="Facebook" variant="square"></Avatar>
            </a>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Social;
