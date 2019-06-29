const rootUrl = 'http://localhost:8080';

const headers = {
  Accept: 'application/json'
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
