/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react';
import { Box, Grid, IconButton, AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { pdfjs, Document, Page } from 'react-pdf';
import Pagination from '@material-ui/lab/Pagination';
import GetAppIcon from '@material-ui/icons/GetApp';
//import MyResume from '../../resources/files/NikunjResume.pdf';
import { ResumeId } from '../../resources/data/PortfolioData';
import NavBar from '../Shared/NavBar';
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
}));

function Resume(props) {
  const classes = useStyles();

  const [numberOfPages, setNumberOfPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [myResume, setMyResume] = useState();

  useEffect(() => {
    setMyResume(`https://drive.google.com/uc?id=${ResumeId}&export=download`);
  }, []);

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
        </Toolbar>
      </AppBar>

      <Grid container>
        <Grid container justify="center">
          <Document
            file={myResume}
            loading="Loading Nikunj's Resume"
            onLoadSuccess={onLoadSuccess}
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