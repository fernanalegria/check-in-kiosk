const rootUrl = 'http://localhost:8080';

const headers = {
  Accept: 'application/json',
  'Content-type': 'application/json'
};

const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift();
  } else {
    return '';
  }
};

const get = (url, params) => {
  if (params) {
    url.search = new URLSearchParams(params);
  }
  return fetch(url, {
    headers
  }).then(res => res.json());
};

export const getUser = () => get(`${rootUrl}/user/`);

export const getAppointments = (date, doctor) => {
  const url = new URL(`${rootUrl}/appointments/`);
  const params = { date, doctor, show_archived: false };
  return get(url, params);
};

export const getApptsBySsn = (ssn, doctor) => {
  const url = new URL(`${rootUrl}/patient-appointments/`);
  const params = { social_security_number: ssn, doctor };
  return get(url, params);
};

export const updateAppointmentStatus = (appointmentId, status) => {
  const url = new URL(`${rootUrl}/appointments/${appointmentId}/`);
  const data = { status };
  return fetch(url, {
    method: 'PATCH',
    headers: {
      ...headers,
      'X-CSRFToken': getCookie('csrftoken')
    },
    body: JSON.stringify(data)
  });
};

export const getWaitingTime = doctor => {
  const url = new URL(`${rootUrl}/waiting-time/`);
  const params = { doctor, show_archived: false };
  return get(url, params);
};

export const logOut = () =>
  fetch(`${rootUrl}/logout/`, {
    headers
  });

export const getStaticData = () => get(`${rootUrl}/static-data/`);
