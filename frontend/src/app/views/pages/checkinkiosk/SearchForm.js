import React, { Component } from 'react';
import {
  Form,
  Col,
  Row,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { appointmentActions } from '../../../state/ducks';

class SearchForm extends Component {
  state = {
    ssn: ''
  };

  handleSearch = () => {
    const { searchApptsBySsn } = this.props;
    searchApptsBySsn(this.state.ssn);
  };

  handleSsnChange = e => {
    this.setState({
      ssn: e.target.value
    });
  };

  render() {
    const { ssn } = this.state;
    return (
      <Row className="d-flex justify-content-center w-100">
        <Form.Group as={Row} controlId="formSsn">
          <Form.Label column sm="6">
            Social Security Number (SSN):
          </Form.Label>
          <Col sm="6">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="e.g. 123-45-6789"
                aria-label="SSN"
                aria-describedby="basic-addon"
                value={ssn}
                onChange={this.handleSsnChange}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={this.handleSearch}>
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Group>
      </Row>
    );
  }
}

const mapDispatchToProps = {
  searchApptsBySsn: ssn => appointmentActions.handleFetchApptsBySsn(ssn)
};

export default connect(
  null,
  mapDispatchToProps
)(SearchForm);
