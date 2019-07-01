import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../../common/NavigationBar';
import BaseContainer from '../../common/BaseContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import DashboardPages from './DashboardPages';
import KioskPages from './KioskPages';

/**
 * Home page where user is redirected after logging in
 */
const Home = ({ app }) => (
  <Fragment>
    <NavigationBar />
    <BaseContainer align="top">
      <ToastContainer />
      {app === 'dashboard' ? <DashboardPages /> : <KioskPages />}
    </BaseContainer>
  </Fragment>
);

const mapStateToProps = ({ authedUser }) => ({
  app: authedUser.app
});

export default connect(mapStateToProps)(Home);
