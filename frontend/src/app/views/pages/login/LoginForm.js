import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { authedUserActions } from '../../../state/ducks/authedUser';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isInvalid: false
  };

  handleUsernameChange = e => {
    this.setState({
      username: e.target.value,
      isInvalid: false
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value,
      isInvalid: false
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.getUser(username, password);
  };

  render() {
    const { username, password, isInvalid } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="login-username">
          <Form.Control
            type="text"
            className={`form-control ${isInvalid && 'invalid-field'}`}
            placeholder="Username"
            required
            autoFocus
            value={username}
            onChange={this.handleUsernameChange}
          />
          <Form.Label>Username</Form.Label>
        </Form.Group>
        <Form.Group controlId="login-password">
          <Form.Control
            type="password"
            className={`form-control ${isInvalid && 'invalid-field'}`}
            placeholder="Password"
            required
            value={password}
            onChange={this.handlePasswordChange}
          />
          <Form.Label>Password</Form.Label>
        </Form.Group>
        <div className={`invalid-feedback ${isInvalid && 'show-invalid'}`}>
          Invalid username or password
        </div>
        <div className="mb-3">
          <Form.Check type="checkbox" label="Remember me" />
        </div>
        <Button
          variant="primary"
          type="submit"
          disabled={!username || !password}
          className="btn-lg btn-block"
        >
          Sign in
        </Button>
      </Form>
    );
  }
}

const mapDispatchToProps = {
  getUser: (username, password) =>
    authedUserActions.handleSetAuthedUser(username, password)
};

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
