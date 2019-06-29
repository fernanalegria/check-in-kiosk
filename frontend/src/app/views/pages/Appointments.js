import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { computeWaitingTime } from '../../utils/helpers';
import { connect } from 'react-redux';

const columns = [
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
    text: 'Waiting time'
  }
];

const Appointments = ({ appointments }) => (
  <BootstrapTable keyField="id" data={appointments} columns={columns} />
);

const mapStateToProps = ({ appointments }) => ({
  appointments: Object.values(appointments)
    .sort((a, b) => new Date(a.scheduled_time) - new Date(b.scheduled_time))
    .map(({ id, status, patient, scheduled_time, updated_at }) => ({
      id,
      status: status ? status : 'Scheduled',
      patient: `${patient.first_name} ${patient.last_name}`,
      scheduledTime: scheduled_time.replace('T', ' '),
      waitingTime: status == 'Arrived' ? computeWaitingTime(updated_at) : 'N/A'
    }))
});

export default connect(mapStateToProps)(Appointments);
