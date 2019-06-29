import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/views/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import configureStore from './app/state/store';
import { Provider } from 'react-redux';

const reduxStore = configureStore();

const RootHtml = () => (
  <Provider store={reduxStore}>
    <App />
  </Provider>
);

export const rootUrl = '';

ReactDOM.render(<RootHtml />, document.getElementById('react-app'));
