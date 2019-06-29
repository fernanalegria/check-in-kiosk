import React, { Component } from 'react';
import Home from './pages/Home';
import NoMatch from './pages/NoMatch';
import LoadingBar from 'react-redux-loading';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faPowerOff,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { rootUrl } from '../../index';
import { authedUserActions } from '../state/ducks/authedUser';

class App extends Component {
  componentDidMount() {
    this.props.handleFetchUser();
  }

  render() {
    return (
      <Router>
        <div className="app">
          <LoadingBar className="initial-loading-bar" scope="initial" />
          {!this.props.loading && (
            <Switch>
              <Route path={`${rootUrl}/(welcome)/`} component={Home} />
              <Route component={NoMatch} />
            </Switch>
          )}
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authedUser }) => ({
  loading: !authedUser
});

const mapDispatchToProps = {
  handleFetchUser: () => authedUserActions.handleFetchUser()
};

library.add([faPowerOff, faExclamationTriangle]);

export default connect(mapStateToProps, mapDispatchToProps)(App);
