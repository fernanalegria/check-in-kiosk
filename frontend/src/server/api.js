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

export const getUser = () => {
  return fetch(`${rootUrl}/user/`, { headers }).then(res => res.json());
};

export const getAppointments = (date, doctor) => {
  const url = new URL(`${rootUrl}/appointments/`);
  const params = { date, doctor, show_archived: false };
  url.search = new URLSearchParams(params);
  return fetch(url, {
    headers
  }).then(res => res.json());
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
