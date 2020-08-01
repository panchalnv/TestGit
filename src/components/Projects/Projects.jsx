/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Grid, Card, CardHeader, CardActionArea, CardActions, CardMedia, Button, Avatar, AppBar, Tab, Badge, Tooltip,
} from '@material-ui/core';
import { TabPanel, TabList, TabContext } from '@material-ui/lab/';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Lightbox from 'react-image-lightbox';
import '../../../node_modules/react-image-lightbox/style.css';
import IconButton from '@material-ui/core/IconButton';
import DevicesIcon from '@material-ui/icons/Devices';
import LaptopIcon from '@material-ui/icons/Laptop';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { ProjectsData } from '../../resources/data/PortfolioData';
import NavBar from '../Shared/NavBar';
import Utility from '../../Shared/Utility';

//import PropTypes from 'prop-types';

// Change Material-UI Styles
const useStyles = makeStyles((theme) => ({
  appBarStyle: {
    width: '100%',
    //bottom: 0,
    background: 'url() no-repeat center center fixed',
    boxShadow: 'none',
  },
  rootTabStyle: {
    justifyContent: 'center',
  },
  scrollerTabStyle: {
    flexGrow: '0',
  },
  gridContainer: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
  },
  avatar: {
    backgroundColor: red[500],
  },
  badgeStyle: {
    position: 'inherit',
  },
  cardSubHeaderStyle: {
    fontSize: 'small',
  },
}));

function Projects(props) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [tabValue, setTabValue] = React.useState('0'); //Require string
  const [distinctTechnology, setDistinctTechnology] = useState(null);
  const [groupByTechnology, setGroupByTechnology] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    // Get Distinct technology
    const distinctTech = [...new Set(ProjectsData.map((x) => x.technology))];
    setDistinctTechnology(distinctTech);
    // Get Group by technology
    const groupByTech = Utility.groupArrayOfObjects(ProjectsData, 'technology');
    setGroupByTechnology(groupByTech);
  }, []);

  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }

  function loadLightBox(projectKey) {
    const project = ProjectsData.filter((p) => { return p.key === projectKey; });
    if (project) {
      setPhotoIndex(0);
      setImages(project[0].images);
      setImageTitle(project[0].title);
      setImageCaption(`Technologies: ${project[0].description}`);
      setIsOpen(true);
    }
  }

  function handleChange(event, newValue) {
    setTabValue(newValue);
  }

  function getTabLabelText(technology) {
    const count = groupByTechnology[`${technology}`].length;
    return (
      <>
        <div>
          <Badge
            badgeContent={count}
            color="secondary"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            classes={{ badge: classes.badgeStyle }}
          >
            {technology}
          </Badge>
          <br />
        </div>
      </>
    );
  }

  if (distinctTechnology === null && groupByTechnology === null) return <div></div>;
  return (
    <>
      <NavBar />
      <TabContext value={tabValue}>
        <AppBar position="static" className={classes.appBarStyle}>
          <TabList
            classes={{ root: classes.rootTabStyle, scroller: classes.scrollerTabStyle }}
            variant="scrollable"
            scrollButtons="on"
            value={tabValue}
            onChange={handleChange}
          >
            {
              distinctTechnology.map((technology, index) => (
                <Tab key={`tab-${index}`} label={getTabLabelText(technology)} value={`${index}`} {...a11yProps(index)} />
              ))
            }
          </TabList>
        </AppBar>
        {
          distinctTechnology.map((technology, techIndex) => (
            <TabPanel key={`tabpanel-${techIndex}`} value={`${techIndex}`}>
              <Grid container spacing={4} className={classes.gridContainer}>
                {
                  ProjectsData.map((project, projectIndex) => (
                    project.technology === technology
                    && (
                    <Grid item xs={12} sm={6} md={4} key={project.key}>
                      <Card className={classes.cardContainer} raised>
                        <CardHeader
                          avatar={(
                            <Avatar className={classes.avatar}>
                              {project.key}
                            </Avatar>
                          )}
                          action={(
                            <Tooltip title={
                              project.type === 'API' ? 'RESTful API'
                                : `${project.type.replace(/([A-Z])/g, ' $1').trim()} App`
                              }
                            >
                              <IconButton onClick={() => loadLightBox(project.key)}>
                                {
                                  ((project.type === 'WebAndMobile') ? <DevicesIcon /> : (project.type === 'Mobile') ? <PhoneAndroidIcon /> : (project.type === 'API') ? <CompareArrowsIcon /> : <LaptopIcon />)
                                }
                              </IconButton>
                            </Tooltip>
                          )}
                          //classes={{ subheader: classes.cardSubHeaderStyle }}
                          title={project.title}
                          //titleTypographyProps={{ fontSize: 'x-small' }}
                          subheader={project.subheader}
                          //subheaderTypographyProps={{ fontSize: 'x-small' } }
                        >
                        </CardHeader>
                        <CardActionArea onClick={() => loadLightBox(project.key)}>
                          <CardMedia
                            component="img"
                            alt={project.title}
                            //height="150"
                            image={project.defaultImage}
                          />
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" color="primary" onClick={() => loadLightBox(project.key)}>{`Tech: ${project.description.substring(0, 15)}...`}</Button>
                          {/* <Button size="small" color="primary" onClick={() => loadLightBox(project.key)}>
                            Technologies:
                          </Button> */}
                        </CardActions>
                      </Card>
                    </Grid>
                    )
                  ))
                }
              </Grid>
              {
                isOpen
                  && (
                  <Lightbox
                    mainSrc={images !== null ? images[photoIndex] : ''}
                    nextSrc={images !== null ? images[(photoIndex + 1) % images.length] : ''}
                    prevSrc={images !== null ? images[(photoIndex + images.length - 1) % images.length] : ''}
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
                    onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
                    imageTitle={imageTitle}
                    imageCaption={imageCaption}
                    //enableZoom={false}
                  />
                  )
              }
            </TabPanel>
          ))
        }
      </TabContext>
    </>
  );
}

Projects.propTypes = {
};

export default Projects;
