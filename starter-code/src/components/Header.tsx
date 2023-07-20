import React from 'react';
import {View} from './theme';
import {usePalette} from '../hooks/usePalette';
import {Avatar} from './Avatar';
import {Divider} from './Divider';
import {LightSelector} from './LightSelector';
import {Logo} from './Logo';

export const Header: React.FC = ({...props}) => {
  const {palette} = usePalette();

  return (
    <View
      row
      width={'100%'}
      {...props}
      backgroundColor={palette.backgroundSecondary}>
      <Logo />
      <View row flex alignItems={'center'} justifyContent={'flex-end'}>
        <LightSelector />
        <Divider row />
        <Avatar />
      </View>
    </View>
  );
};
