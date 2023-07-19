export enum LIGHTING {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface SettingType {
  lighting?: LIGHTING;
  dataPopulated?: boolean;
}

export enum SettingsActionTypes {
  SETTINGS_GENERAL_UPDATE = 'SETTINGS_GENERAL_UPDATE',
}

export interface SettingsReduxActionTypes {
  type: SettingsActionTypes;
  data: SettingType;
}
