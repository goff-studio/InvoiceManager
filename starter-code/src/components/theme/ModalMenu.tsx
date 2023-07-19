import React from 'react';
import {Modal, themeConfig, View} from './index';
import {ModalProps} from '../../types/theme';
import {usePalette} from '../../hooks/usePalette';

export const ModalMenu: React.FC<ModalProps> = ({children, ...props}) => {
  const {palette} = usePalette();
  return (
    <Modal {...props}>
      <View
        borderRadius={themeConfig.radius.xSmall}
        backgroundColor={palette.backgroundDisabled}>
        {children}
      </View>
    </Modal>
  );
};
