import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './common.scss';
import { authedUserActions } from '../../state/ducks/authedUser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { func } from 'prop-types';
import { userShape } from '../propTypes';
import { rootUrl } from '../../../index';

/**
 * Bar to navigate through the different web pages
 */
class NavigationBar extends Component {
  static propTypes = {
    logOut: func.isRequired,
    authedUser: userShape.isRequired
  };
  /**
   * Logs the user out and redirects them to the login page
   */
  logOut = () => {
    const { logOut, history } = this.props;
    logOut().then(() => {
      history.push(`${rootUrl}/logout-success`);
    });
  };

  render() {
    const {
      authedUser: { first_name, last_name, app },
      location: { pathname }
    } = this.props;
    return (
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand>
          {app === 'dashboard' ? 'Doctor Dashboard' : 'Check-in Kiosk'}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Link
              to={`${rootUrl}/welcome/`}
              className={`nav-link ${
                pathname === `${rootUrl}/welcome/` ? 'active' : ''
              }`}
            >
              {app === 'dashboard' ? "Today's Appointments" : 'Check-in'}
            </Link>
          </Nav>
          <Nav className="justify-content-end">
            <Navbar.Text>
              Signed in as:
              <span className="authed-user mx-2">{`${first_name} ${last_name}`}</span>
            </Navbar.Text>
            <Nav.Link onClick={this.logOut} className="log-out">
              <FontAwesomeIcon icon="power-off" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

const mapDispatchToProps = {
  logOut: () => authedUserActions.handleLogOut()
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavigationBar)
);
