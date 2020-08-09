/* eslint-disable no-debugger */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/button-has-type */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Box, Grid, IconButton, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { pdfjs, Document, Page } from 'react-pdf';
import Pagination from '@material-ui/lab/Pagination';
import GetAppIcon from '@material-ui/icons/GetApp';
import NavBar from '../Shared/NavBar';
import { ResumeId } from '../../resources/data/PortfolioData';
import myResumePath from '../../resources/files/NikunjResume.pdf';
// import PropTypes from 'prop-types';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// Change Material-UI Styles
const useStyles = makeStyles((theme) => ({
  paginationStyle: {
    backgroundColor: '#F1C40F',
    color: theme.palette.common.white,
    width: theme.spacing(60),
    height: theme.spacing(6),
    margin: 'auto',
  },
  getAppIconStyle: {
    // color: 'white',
  },
  documentStyle: {
    color: '#F1C40F',
  },
  SyncStyle: {
    //display: 'none',
  },
}));

function Resume(props) {
  const classes = useStyles();

  const [numberOfPages, setNumberOfPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [myResume, setMyResume] = useState();
  const [message, setMessage] = useState('SHREE GANESH');
  //const [myResume, setMyResume] = useState(myResumePath);

  function onMessageClick() {
    fetch('/.netlify/functions/getFiles')
      //.then((res) => res.json())
      .then((res) => {
        //setMessage(res);
        setMyResume(res.url);
      // .then((response) => response.body)
      // .then((body) => {
      //   const reader = body.getReader();
      //   reader.releaseLock();
      });
  }

  // useEffect(() => {
  //   fetch(`/uc?id=${ResumeId}&export=download`)
  //     .then((response) => {
  //       console.log(response);
  //       setMyResume(response.url);
  //       //setMyResume(myResumePath);
  //     });
  // }, []);

  function downloadFile() {
    const anchorLink = document.createElement('a');
    anchorLink.href = myResume;
    anchorLink.download = myResume.substr(myResume.lastIndexOf('/') + 1);
    anchorLink.click();
  }

  function handleChange(obj, number) {
    setPageNumber(number);
  }

  function onLoadSuccess({ numPages }) {
    setNumberOfPages(numPages);
  }

  return (
    <Box component="div">
      <NavBar />
      <AppBar position="static" className={classes.paginationStyle}>
        <Toolbar>
          <IconButton onClick={downloadFile}>
            <GetAppIcon className={classes.getAppIconStyle} />
          </IconButton>
          <Pagination
            count={numberOfPages}
            // variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
            siblingCount={0}
            // boundaryCount={2}
            onChange={handleChange}
          />
          <IconButton className={classes.SyncStyle} onClick={onMessageClick}>
            <GetAppIcon className={classes.getAppIconStyle} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container>
        {/* <p>Message: {message}</p> */}
        {/* <button onClick={onMessageClick}>Message</button>
        <a href={myResumePath} target="_blank">Download Pdf</a> */}
        <Grid container justify="center">
          <Document
            file={myResume}
            loading="Loading Nikunj's Resume"
            onLoadSuccess={onLoadSuccess}
            className={classes.documentStyle}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </Grid>
      </Grid>
    </Box>
  );
}

Resume.propTypes = {
};

export default Resume;
