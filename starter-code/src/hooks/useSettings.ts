import {useDispatch, useSelector} from 'react-redux';
import {MainStore} from '../types/store';
import {reduxUpdateSettings} from '../redux/actions/settings';
import {LIGHTING, SettingType} from '../types/settings';

export const useSettings = () => {
  const data = useSelector((state: MainStore) => state.settingsReducer);
  const dispatch = useDispatch();
  const update = (newSettings: SettingType) => {
    dispatch(reduxUpdateSettings(newSettings));
  };
  const switchToDark = () => {
    update({lighting: LIGHTING.DARK});
  };
  const switchToLight = () => {
    update({lighting: LIGHTING.LIGHT});
  };
  const switchToAuto = () => update({lighting: undefined});
  return {data, update, switchToAuto, switchToDark, switchToLight};
};
