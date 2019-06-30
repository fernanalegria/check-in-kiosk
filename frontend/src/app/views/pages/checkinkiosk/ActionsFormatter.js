import React, { Fragment } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import ActionButton from '../../common/ActionButton';

const ActionsFormatter = ({ appointment: { status, isToday } }) => {
  return (
    <ButtonToolbar>
      {isToday && status === '' ? (
        <ActionButton
          id="tooltip-check-in"
          message="Patient check-in"
          icon="sign-in-alt"
          action={() => {}}
        />
      ) : (
        'No possible actions'
      )}
    </ButtonToolbar>
  );
};

export default ActionsFormatter;
