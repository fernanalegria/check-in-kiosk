import React, { Component, Fragment } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ActionsFormatter from './ActionsFormatter';
import SearchForm from './SearchForm';
import { connect } from 'react-redux';
import { isToday } from '../../../utils/helpers'

/**
 * Kiosks that allows patients to check in upon arrival
 */
class CheckInKiosk extends Component {
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
        dataField: 'actions',
        text: 'Actions',
        isDummyField: true,
        formatter: this.formatter
      }
    ];
  }

  formatter = (cell, row) => <ActionsFormatter appointment={row} />;

  render() {
    const { appointments } = this.props;
    return (
      <Fragment>
        <SearchForm />
        <BootstrapTable
          keyField="id"
          data={appointments}
          columns={this.columns}
          noDataIndication="No data found"
        />
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
      isToday: isToday(scheduled_time)
    }))
});

export default connect(mapStateToProps)(CheckInKiosk);
