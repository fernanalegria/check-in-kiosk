import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CheckInKiosk from '../checkinkiosk';
import { rootUrl } from '../../../../index';

const KioskPages = () => (
  <Switch>
    <Route path={`${rootUrl}/welcome/`} component={CheckInKiosk} />
  </Switch>
);

export default KioskPages;
