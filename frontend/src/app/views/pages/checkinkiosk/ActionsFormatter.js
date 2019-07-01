import React, { Fragment } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import ActionButton from '../../common/ActionButton';

const ActionsFormatter = ({
  appointment: { status, isToday, id },
  openModal
}) => {
  return (
    <ButtonToolbar>
      {isToday && status === 'Scheduled' ? (
        <ActionButton
          id="tooltip-check-in"
          message="Patient check-in"
          icon="sign-in-alt"
          action={() => {
            openModal(id);
          }}
        />
      ) : (
        'No possible actions'
      )}
    </ButtonToolbar>
  );
};

export default ActionsFormatter;
