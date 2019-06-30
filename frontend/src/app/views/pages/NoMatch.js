import React from 'react';
import BaseContainer from '../common/BaseContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { rootUrl } from '../../../index';

/**
 * 404 Web page in case the user tries to access a url which doesn't exist
 */
const NoMatch = () => (
  <BaseContainer align="top">
    <h1 className="text-center">
      <FontAwesomeIcon icon="exclamation-triangle" /> 404 Not Found
    </h1>
    <h5 className="text-center my-4">
      Sorry, the requested page could not be found
    </h5>
    <Row>
      <Link to={`${rootUrl}/welcome`} className="btn btn-secondary btn-sm mx-auto">
        Go back to Home page
      </Link>
    </Row>
  </BaseContainer>
);

export default NoMatch;
