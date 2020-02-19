import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actions from './action';

export interface State {
  user: string;
}

const initialState: State = {
  user: ''
};

export const reducer = reducerWithInitialState(initialState)
  .case(actions.updateUser, (state, user) => {
    return Object.assign({}, state, { user });
  })