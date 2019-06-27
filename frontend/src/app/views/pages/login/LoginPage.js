import React, { Component } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import BaseContainer from '../../common/BaseContainer';
import './login.scss';

class LoginPage extends Component {
  state = {
    register: false
  };

  toggleForm = register => {
    this.setState({
      register
    });
  };

  render() {
    return (
      <BaseContainer>
        <Card className="card-login">
          <Card.Header>
            <Nav
              variant="tabs"
              defaultActiveKey="#first"
              className="nav-justified"
            >
              <Nav.Item>
                <Nav.Link
                  className={`nav-link w-100 ${!this.state.register &&
                    'active'}`}
                  onClick={() => this.toggleForm(false)}
                >
                  Log in
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className={`nav-link w-100 ${this.state.register &&
                    'active'}`}
                  onClick={() => this.toggleForm(true)}
                >
                  Sign up
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Card.Body>
            {this.state.register ? <SignUpForm /> : <LoginForm />}
          </Card.Body>
        </Card>
      </BaseContainer>
    );
  }
}

export default LoginPage;
