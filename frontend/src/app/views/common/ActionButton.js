import React from 'react';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ActionButton = ({ id, icon, message, action }) => (
  <OverlayTrigger
    key={'left'}
    placement={'left'}
    overlay={<Tooltip id={id}>{message}</Tooltip>}
  >
    <Button
      variant="secondary"
      type="submit"
      className="btn-action"
      onClick={action}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  </OverlayTrigger>
);

export default ActionButton;
