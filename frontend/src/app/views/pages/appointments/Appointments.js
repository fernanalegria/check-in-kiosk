import React, { Component, Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ActionsFormatter from './ActionsFormatter';
import { computeWaitingTime } from '../../../utils/helpers';
import { connect } from 'react-redux';
import WaitingTimeForm from './WaitingTimeForm';

class Appointments extends Component {
  constructor() {
    super();
    this.columns = [
      {
        dataField: 'patient',
        text: 'Patient'
      },
      {
        dataField: 'scheduledTime',
        text: 'Scheduled time'
      },
      {
        dataField: 'status',
        text: 'Status'
      },
      {
        dataField: 'waitingTime',
        text: 'Time in waiting room'
      },
      {
        dataField: 'actions',
        text: 'Actions',
        isDummyField: true,
        formatter: this.formatter
      }
    ];
  }

  formatter = (cell, row) => (
    <ActionsFormatter
      appointment={row}
      hasUncompletedSessions={this.hasUncompletedSessions}
    />
  );

  hasUncompletedSessions = () => {
    const { appointments } = this.props;
    const uncompletedSessions = appointments.filter(
      appointment => appointment.status === 'In Session'
    );
    return uncompletedSessions.length != 0;
  };

  render() {
    const { appointments } = this.props;
    return (
      <Fragment>
        <BootstrapTable
          keyField="id"
          data={appointments}
          columns={this.columns}
        />
        <WaitingTimeForm />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ appointments }) => ({
  appointments: Object.values(appointments)
    .sort((a, b) => new Date(a.scheduled_time) - new Date(b.scheduled_time))
    .map(({ id, status, patient, scheduled_time, updated_at }) => ({
      id,
      status: status ? status : 'Scheduled',
      patient: `${patient.first_name} ${patient.last_name}`,
      scheduledTime: scheduled_time.replace('T', ' '),
      waitingTime: status === 'Arrived' ? computeWaitingTime(updated_at) : 'N/A'
    }))
});

export default connect(mapStateToProps)(Appointments);
