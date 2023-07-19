import React, {useMemo} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {usePalette} from '../../hooks/usePalette';
import {themeConfig} from '../../configs/themeConfig';
import {ScreenProps} from '../../types/theme';
import {View} from './View';

export const Screen: React.FC<ScreenProps> = ({
  paddingHorizontal = themeConfig.padding.medium,
  paddingVertical = 0,
  footer,
  scrollable,
  children,
  ...props
}) => {
  const {palette} = usePalette();
  const styles = useMemo(() => {
    return StyleSheet.create({
      content: {
        width: '100%',

        height: '100%',
        backgroundColor: palette.backgroundPrimary,
      },
    });
  }, [palette.backgroundPrimary]);

  return (
    <View style={styles.content} {...props}>
      <View
        flex
        paddingVertical={paddingVertical}
        paddingHorizontal={paddingHorizontal}>
        {!scrollable && children}
        {scrollable && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        )}
      </View>
      {!!footer && (
        <View
          paddingBottom={themeConfig.padding.xSmall}
          backgroundColor={palette.backgroundDisabled}>
          {footer}
        </View>
      )}
    </View>
  );
};
