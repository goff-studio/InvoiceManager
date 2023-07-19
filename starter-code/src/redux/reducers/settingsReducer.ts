import {
  LIGHTING,
  SettingsActionTypes,
  SettingsReduxActionTypes,
  SettingType,
} from '../../types/settings';

export const settingsReducer = (
  state: SettingType = {lighting: LIGHTING.DARK, dataPopulated: false},
  action: SettingsReduxActionTypes,
) => {
  switch (action.type) {
    case SettingsActionTypes.SETTINGS_GENERAL_UPDATE:
      return {...state, ...action.data};

    default:
      return state;
  }
};
