import {SettingsActionTypes, SettingType} from '../../types/settings';

export const reduxUpdateSettings = (data: SettingType) => ({
  type: SettingsActionTypes.SETTINGS_GENERAL_UPDATE,
  data,
});
