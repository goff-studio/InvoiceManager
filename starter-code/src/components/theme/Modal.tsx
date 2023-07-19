import React from 'react';
import RNModal from 'react-native-modal';
import {convertToRgba} from '../../utils/theme';
import {ModalProps} from '../../types/theme';
import {themeConfig} from '../../configs/themeConfig';

export const Modal: React.FC<ModalProps> = ({
  onRequestClose,
  isVisible,
  children,
  ...props
}) => {
  return (
    <RNModal
      animationIn={'fadeInUp' as any}
      animationOut={'fadeOutDown' as any}
      onBackButtonPress={onRequestClose}
      onBackdropPress={onRequestClose}
      onDismiss={onRequestClose}
      isVisible={isVisible}
      hasBackdrop
      backdropColor={convertToRgba(themeConfig.colors.dark4, 0.8)}
      statusBarTranslucent
      animationInTiming={400}
      animationOutTiming={350}
      backdropTransitionInTiming={700}
      backdropTransitionOutTiming={600}
      useNativeDriverForBackdrop
      {...props}>
      {children}
    </RNModal>
  );
};
