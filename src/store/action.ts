import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

const actions = {
  updateUser: actionCreator<string>('ACTIONS_UPDATE_USER'),
};

export default actions