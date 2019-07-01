import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Appointments from '../appointments';
import { rootUrl } from '../../../../index';

const DashboardPages = () => (
  <Switch>
    <Route path={`${rootUrl}/welcome/`} component={Appointments} />
  </Switch>
);

export default DashboardPages;
