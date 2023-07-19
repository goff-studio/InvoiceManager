import {legacy_createStore as createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistConfig} from 'redux-persist/es/types';
import {rootReducer} from '../reducers';
import {MainStore} from '../../types/store';

export const persistConfig: PersistConfig<MainStore> = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const index = createStore(persistedReducer, undefined);

export const persistor = persistStore(index);
