import {createStore} from 'redux';
import rootReducer from './reducers/root';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['current_step'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer);

export let persistor = persistStore(store);
export default store;
