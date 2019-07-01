import { createStore } from 'redux';
import rootReducer from './ducks';
import middleware from './middleware';

export default () => createStore(rootReducer, middleware);
