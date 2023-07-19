import {combineReducers} from 'redux';
import {settingsReducer} from './settingsReducer';
import {invoicesReducer} from './invoicesReducer';
import {MainStore} from '../../types/store';

export const rootReducer = combineReducers<MainStore>({
  invoicesReducer,
  settingsReducer,
});
