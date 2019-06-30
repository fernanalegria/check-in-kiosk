import React from 'react';
import BaseContainer from '../common/BaseContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { rootUrl } from '../../../index';

/**
 * 403 Web page in case the user tries to access a url without the right permissions
 */
const AccessDenied = () => (
  <BaseContainer align="top">
    <Col lg="6" md="8" className="m-auto">
      <h1 className="text-center">
        <FontAwesomeIcon icon="exclamation-triangle" /> 403 Forbidden
      </h1>
      <h5 className="text-center my-4">
        Sorry, you don't have permission to access these resources
      </h5>
      <Row>
        <Link
          to={`${rootUrl}/welcome`}
          className="btn btn-secondary btn-sm mx-auto"
        >
          Go back to Home page
        </Link>
      </Row>
    </Col>
  </BaseContainer>
);

export default AccessDenied;
