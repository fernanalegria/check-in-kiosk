import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { appointmentActions } from '../../../state/ducks';
import { toast } from 'react-toastify';
import ActionButton from './ActionButton';
import './ActionsFormatter.scss';

class ActionsFormatter extends Component {
  changeStatus = status => {
    const { updateStatus, appointment } = this.props;
    updateStatus(appointment.id, status);
  };

  startVisit = () => {
    const { hasUncompletedSessions } = this.props;
    if (hasUncompletedSessions()) {
      toast.warn(
        'You cannot receive more visits until you complete the current one.',
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        }
      );
    } else {
      this.changeStatus('In Session');
    }
  };

  render() {
    const { status } = this.props.appointment;
    const actionStatus = ['Arrived', 'Scheduled', 'In Session'];
    const statusSet = new Set(actionStatus);
    statusSet.add(status);
    return (
      <ButtonToolbar>
        {status === 'Arrived' && (
          <ActionButton
            id="tooltip-handshake"
            message="Start doctor visit"
            icon="handshake"
            action={this.startVisit}
          />
        )}
        {status === 'Scheduled' && (
          <ActionButton
            id="tooltip-cancel"
            message="Cancel appointment"
            icon="calendar-times"
            action={() => {
              this.changeStatus('Cancelled');
            }}
          />
        )}
        {status === 'In Session' && (
          <ActionButton
            id="tooltip-conclude"
            message="Conclude doctor visit"
            icon="check-square"
            action={() => {
              this.changeStatus('Complete');
            }}
          />
        )}
        {statusSet.size !== actionStatus.length && 'No possible actions'}
      </ButtonToolbar>
    );
  }
}

const mapDispatchToProps = {
  updateStatus: (id, status) =>
    appointmentActions.handleUpdateAppointmentStatus(id, status)
};

export default connect(
  null,
  mapDispatchToProps
)(ActionsFormatter);
