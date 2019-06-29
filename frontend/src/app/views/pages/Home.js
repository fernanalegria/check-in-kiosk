import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavigationBar from '../common/NavigationBar';
import BaseContainer from '../common/BaseContainer';
import Appointments from './Appointments';
import { rootUrl } from '../../../index';

/**
 * Home page where user is redirected after logging in
 */
const Home = () => (
  <Fragment>
    <NavigationBar />
    <BaseContainer align="top">
      <Switch>
        <Route path={`${rootUrl}/welcome/`} component={Appointments} />
      </Switch>
    </BaseContainer>
  </Fragment>
);

export default Home;
