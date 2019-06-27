import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const BaseContainer = ({ children }) => (
  <Container className="h-100 vertical-center">
    <Row className="w-100">
      <Col md="6" className="col-center">
        {children}
      </Col>
    </Row>
  </Container>
);

export default BaseContainer;
