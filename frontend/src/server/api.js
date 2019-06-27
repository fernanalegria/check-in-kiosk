const rootUrl = 'http://localhost:8080';

// Generate a unique token
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const getUser = (username, password) =>
  fetch(`${rootUrl}/static/fixtures/user.json`, { headers }).then(res => res.json());
