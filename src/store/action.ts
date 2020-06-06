import actionCreatorFactory from 'typescript-fsa';
import { State } from './reducer';

const actionCreator = actionCreatorFactory();

const actions = {
  updateUser: actionCreator<State>('ACTIONS_UPDATE_USER'),
};

export default actions