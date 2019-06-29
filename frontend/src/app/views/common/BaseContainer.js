import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const BaseContainer = ({ children }) => (
  <Container className="h-100 mt-5">
    <Row className="w-100 justify-content-center">{children}</Row>
  </Container>
);

export default BaseContainer;
