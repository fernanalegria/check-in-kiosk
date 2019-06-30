import React, { Component } from 'react';
import { Home, NoMatch, AccessDenied, LogoutSuccess } from './pages';
import ProtectedRoute from './common/ProtectedRoute';
import LoadingBar from 'react-redux-loading';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPowerOff,
  faExclamationTriangle,
  faHandshake,
  faCalendarTimes,
  faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import { rootUrl } from '../../index';
import {
  authedUserActions,
  appointmentActions,
  waitingTimeActions
} from '../state/ducks';
import { formatDate } from '../utils/helpers';

class App extends Component {
  state = {
    first: true
  };

  componentDidMount() {
    this.props.fetchUser().then(() => {
      this.setState({ first: false });
      const date = formatDate(new Date());
      Promise.all([
        this.props.fetchAppointments(date),
        this.props.fetchWaitingTime()
      ]);
    });
  }

  render() {
    return (
      <Router>
        <div className="app">
          <LoadingBar className="initial-loading-bar" scope="initial" />
          {!this.props.loading && !this.state.first && (
            <Switch>
              <ProtectedRoute path={`${rootUrl}/(welcome)/`} component={Home} />
              <Route
                path={`${rootUrl}/access-denied/`}
                component={AccessDenied}
              />
              <Route
                path={`${rootUrl}/logout-success/`}
                component={LogoutSuccess}
              />
              <Route component={NoMatch} />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ loadingBar }) => ({
  loading: loadingBar.initial === 1
});

const mapDispatchToProps = {
  fetchUser: () => authedUserActions.handleFetchUser(),
  fetchAppointments: date => appointmentActions.handleFetchAppointments(date),
  fetchWaitingTime: () => waitingTimeActions.handleFetchWaitingTime()
};

library.add([
  faPowerOff,
  faExclamationTriangle,
  faHandshake,
  faCalendarTimes,
  faCheckSquare
]);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
