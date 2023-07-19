import {InvoiceDraft} from './invoice';
import {SettingType} from './settings';

export interface MainStore {
  invoicesReducer: InvoiceDraft[];
  settingsReducer: SettingType;
}
