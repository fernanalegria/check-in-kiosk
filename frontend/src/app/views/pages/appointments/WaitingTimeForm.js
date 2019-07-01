import React from 'react';
import { Form, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { formatWaitingTime } from '../../../utils/helpers';

const WaitingTimeForm = ({ waitingTime }) => (
  <Row className="d-flex justify-content-end w-100">
    <Form className="waiting-time-form">
      <Form.Group as={Row} controlId="formWaitingTime">
        <Form.Label column sm="7">
          Average overall waiting time
        </Form.Label>
        <Col sm="5">
          <Form.Control plaintext readOnly defaultValue={waitingTime} />
        </Col>
      </Form.Group>
    </Form>
  </Row>
);

const mapStateToProps = ({ waitingTime }) => ({
  waitingTime: waitingTime ? formatWaitingTime(waitingTime) : ''
});

export default connect(mapStateToProps)(WaitingTimeForm);
