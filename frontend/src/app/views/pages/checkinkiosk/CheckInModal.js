import React, { Component } from 'react';
import { Modal, Button, Form, InputGroup, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

class CheckInModal extends Component {
  state = {
    address: '',
    city: null,
    state: null,
    zipCode: null
  };

  componentDidMount() {
    const { address, city, state, zip_code } = this.props.patient;
    this.setState({
      address,
      city,
      state,
      zipCode: zip_code
    });
  }

  handleSubmit = () => {
    // Update demographic info
  };

  handleChange = (property, value) => {
    this.setState({
      property: value
    });
  };

  render() {
    const { address, city, state, zipCode } = this.state;
    const { first_name, last_name } = this.props.patient;
    return (
      <Modal
        {...this.props}
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
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={`${first_name} ${last_name}`}
                />
              </Form.Group>
              <Form.Group as={Col} md="8" controlId="validationFormik02">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={address}
                  onChange={e => this.handleChange('address', e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={e => this.handleChange('city', e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik04">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={state}
                  onChange={e => this.handleChange('state', e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik05">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip"
                  name="zip"
                  value={zipCode}
                  onChange={e => this.handleChange('zip', e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Button type="submit">Confirm and check in</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = ({ appointments }) => ({
  patient: Object.values(appointments)[0].patient
});

export default connect(mapStateToProps)(CheckInModal);
