import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavigationBar from '../common/NavigationBar';
import BaseContainer from '../common/BaseContainer';
import Appointments from './appointments';
import { rootUrl } from '../../../index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

/**
 * Home page where user is redirected after logging in
 */
const Home = () => (
  <Fragment>
    <NavigationBar />
    <BaseContainer align="top">
      <ToastContainer />
      <Switch>
        <Route path={`${rootUrl}/welcome/`} component={Appointments} />
      </Switch>
    </BaseContainer>
  </Fragment>
);

export default Home;
