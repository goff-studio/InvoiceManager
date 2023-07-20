import React from 'react';
import {ViewProps} from '../types/theme';
import {useSettings} from '../hooks/useSettings';
import {View} from './theme';
import {IconMoon} from './IconMoon';
import {LIGHTING} from '../types/settings';
import {themeConfig} from '../configs/themeConfig';
import {IconMagic} from './IconMagic';
import {IconSun} from './IconSun';

export const LightSelector: React.FC<ViewProps> = ({...props}) => {
  const {data, switchToLight, switchToDark, switchToAuto} = useSettings();
  return (
    <View {...props}>
      {data.lighting === LIGHTING.DARK && (
        <IconSun
          paddingHorizontal={themeConfig.padding.medium}
          onPress={switchToLight}
        />
      )}
      {data.lighting === LIGHTING.LIGHT && (
        <IconMoon
          paddingHorizontal={themeConfig.padding.medium}
          onPress={switchToAuto}
        />
      )}
      {!data?.lighting && (
        <IconMagic
          paddingHorizontal={themeConfig.padding.medium}
          onPress={switchToDark}
        />
      )}
    </View>
  );
};
