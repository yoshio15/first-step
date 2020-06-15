import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actions from './action';

export interface State {
  id: string,
  user: string,
  email: string
}

const initialState: State = {
  id: '',
  user: '',
  email: ''
};

export const reducer = reducerWithInitialState(initialState)
  .case(actions.updateUser, (state, userInfo) => {
    return Object.assign({}, state, {
      id: userInfo.id,
      user: userInfo.user
    });
  })
  .case(actions.setEmail, (state, email) => {
    return Object.assign({}, state, {
      email: email
    });
  })