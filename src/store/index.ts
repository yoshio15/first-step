import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'
import { reducer, State } from './reducer';

export type AppState = {
  store: State
};

const persistConfig = {
  key: 'root',
  storage: storageSession,
}

const rootReducer = combineReducers<AppState>({ store: reducer })

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);

export const persistor = persistStore(store)

export default store;