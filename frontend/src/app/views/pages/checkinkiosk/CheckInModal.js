import React, { Component } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';

class CheckInModal extends Component {
  state = {
    address: '',
    city: null,
    state: null,
    zipCode: null
  };

  componentDidMount() {
    const { address, city, state, zipCode } = this.props;
    this.setState({
      address,
      city,
      state,
      zipCode
    });
  }

  handleSubmit = () => {
    // Update demographic info
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkZipCode = () => {
    // Check if the zip code corresponds to the selected city
  };

  render() {
    const { address, city, state, zipCode } = this.state;
    const { patientName, states, cities, show, onHide } = this.props;
    let cityOptions = Object.values(cities);
    if (state && state.length >= 0) {
      cityOptions = cityOptions.filter(
        cityObj => cityObj.state === state[0].id
      );
    }
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Patient check-in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Confirm your demographic information and update it with your current
            residence if needed.
          </p>
          <Form noValidate onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>Name</Form.Label>
                <Form.Control plaintext readOnly defaultValue={patientName} />
              </Form.Group>
              <Form.Group as={Col} md="8" controlId="validationFormik02">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={address}
                  onChange={this.onChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Typeahead
                  labelKey="city_name"
                  multiple={false}
                  options={cityOptions}
                  placeholder="State"
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik04">
                <Form.Label>State</Form.Label>
                <Typeahead
                  id="state-typeahead"
                  labelKey="state_name"
                  multiple={false}
                  options={Object.values(states)}
                  selected={state}
                  onChange={state => {
                    this.setState({ state });
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik05">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip code"
                  name="zipCode"
                  value={zipCode}
                  onChange={this.onChange}
                  isInvalid={this.checkZipCode()}
                />
              </Form.Group>
            </Form.Row>
            <Button
              type="submit"
              disabled={
                !address || state.length === 0 || city.length === 0 || !zipCode
              }
            >
              Confirm and check in
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = ({ appointments, states, cities }) => {
  const {
    address,
    city,
    state,
    zip_code,
    last_name,
    first_name
  } = Object.values(appointments)[0].patient;
  const stateObj = Object.values(states).find(st => st.state_code === state);
  const cityObj = Object.values(cities).find(ct => ct.city_name === city);
  return {
    address,
    city: cityObj ? [cityObj] : [],
    state: stateObj ? [stateObj] : [],
    zipCode: zip_code,
    patientName: `${first_name} ${last_name}`,
    states,
    cities
  };
};

export default connect(mapStateToProps)(CheckInModal);
