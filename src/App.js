/* eslint-disable no-unused-vars */
import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Main from './components/Home/Main';
import Resume from './components/Resume/Resume';
import Projects from './components/Projects/Projects';
import AboutMe from './components/AboutMe/AboutMe';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <>
      <Route exact path="/" component={Main} />
      <Route path="/resume" component={Resume} />
      <Route path="/projects" component={Projects} />
      <Route path="/aboutme" component={AboutMe} />
      <Route path="/contact" component={Contact} />
    </>
  );
}

export default App;
