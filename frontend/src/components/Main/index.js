import React from 'react';
import { Router, Route } from 'react-router';
import HomePage from '../HomePage';
import PageNotFound from '../PageNotFound';
import PacientRegistration from '../PacientRegistration';
import PacientList from '../PacientList';

const Routes = props => (
  <Router {...props}>
    <Route path="/" component={PacientRegistration} />
    <Route path="/register" component={PacientRegistration} />
    <Route path="/list" component={PacientList} />
    <Route path="*" component={PageNotFound} />
  </Router>
);

export default Routes;
