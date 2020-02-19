import { createStore, combineReducers } from 'redux';
import { reducer, State } from './reducer';

export type AppState = {
  store: State
};

const store = createStore(
  combineReducers<AppState>({
    store: reducer
  })
);

export default store;