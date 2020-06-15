import actionCreatorFactory from 'typescript-fsa';

interface updateUserI {
  id: string,
  user: string
}

const actionCreator = actionCreatorFactory();

const actions = {
  updateUser: actionCreator<updateUserI>('ACTIONS_UPDATE_USER'),
  setEmail: actionCreator<string>('ACTIONS_SET_EMAIL'),
};

export default actions