import React from 'react';
import BaseContainer from '../common/BaseContainer';

/**
 * Page to display after a successful logout
 */
const LogoutSuccess = () => (
  <BaseContainer align="top">
    <h5 className="text-center my-4">You have been successfully logged out</h5>
  </BaseContainer>
);

export default LogoutSuccess;
