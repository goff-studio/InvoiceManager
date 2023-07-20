import React from 'react';
import {Text, TextInput, themeConfig, View} from './theme';
import {Button} from './theme/Button';
import PlusIcon from '../assets/icon-plus.svg';
import {ButtonVariants, TextVariants} from '../types/theme';
import {usePalette} from '../hooks/usePalette';
import {InvoiceFormItemsProps} from '../types/invoice';
import Delete from '../assets/icon-delete.svg';
import {StyleSheet} from 'react-native';
import {IconWrapper} from './IconWrapper';

export const InvoiceFormItems: React.FC<InvoiceFormItemsProps> = ({
  paddingVertical = themeConfig.padding.large,
  items,
  onChange,
  onDeletePress,
  onAddPress,
  ...props
}) => {
  const {palette} = usePalette();

  const renderEmptyState = () => {
    if (!items?.length) {
      return null;
    }
    return (
      <View>
        <Text>No item added yet</Text>
      </View>
    );
  };

  const renderItems = () =>
    (items || []).map((item, index) => (
      <View
        key={'item-id-' + index}
        marginTop={index ? themeConfig.padding.semiLarge : undefined}>
        <TextInput
          onChangeText={text => onChange(index, text, 'name')}
          value={item?.name || ''}
          label={'Item Name'}
        />
        <View row alignItems={'flex-end'} justifyContent={'flex-end'}>
          <TextInput
            onChangeText={text => onChange(index, text, 'quantity')}
            value={item?.quantity?.toString() || ''}
            keyboardType={'numeric'}
            containerStyle={styles.smallInput}
            label={'Qty.'}
          />
          <TextInput
            onChangeText={text => onChange(index, text, 'price')}
            keyboardType={'numeric'}
            label={'Price'}
            value={item?.price?.toString(10) || ''}
            containerStyle={styles.biggerInput}
            marginRight={themeConfig.padding.small}
            marginLeft={themeConfig.padding.small}
          />
          <TextInput
            editable={false}
            keyboardType={'numeric'}
            label={'Total'}
            containerStyle={styles.biggerInput}
            value={item.total.toFixed(2) || ''}
          />
          <IconWrapper
            onPress={() => onDeletePress(index)}
            marginBottom={themeConfig.padding.small}
            paddingVertical={themeConfig.padding.semiSmall}
            paddingHorizontal={themeConfig.padding.semiSmall}
            icon={<Delete />}
          />
        </View>
      </View>
    ));

  return (
    <View {...props} paddingVertical={paddingVertical}>
      <Text
        marginBottom={themeConfig.padding.medium}
        variant={TextVariants.H2}
        color={palette.textSecondary}>
        Item List
      </Text>
      {renderEmptyState()}
      {renderItems()}
      <Button
        variant={ButtonVariants.SECONDARY}
        onPress={onAddPress}
        marginTop={themeConfig.padding.semiLarge}
        icon={<PlusIcon />}
        label={'Add New Item'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  biggerInput: {
    flex: 2,
  },
  smallInput: {
    flex: 1,
  },
});
