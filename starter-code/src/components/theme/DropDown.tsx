import React, {useState} from 'react';
import {Text} from './Text';
import {ModalMenu} from './ModalMenu';
import {View} from './View';
import {DropDownProps, TextVariants} from '../../types/theme';
import Arrow from '../../assets/icon-arrow-down.svg';
import {IconWrapper} from '../IconWrapper';
import {usePalette} from '../../hooks/usePalette';
import {themeConfig} from '../../configs/themeConfig';
import {capitalizeFirstChar} from '../../utils/invoices';
import {FlatList} from 'react-native';
import {Divider} from '../Divider';
import {InputContainer} from '../InputContainer';

export const DropDown: React.FC<DropDownProps> = React.memo(
  ({
    placeholder,
    backgroundColor,
    items,
    onChange,
    initialValue,
    showReset,
    label,
    resetLabel,
    ...props
  }) => {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [value, setValue] = useState<string | undefined>(initialValue);
    const {palette} = usePalette();

    const handleOpen = () => setIsFilterVisible(true);
    const handleFalse = () => setIsFilterVisible(false);
    const handleSetValue = (val: string) => {
      setValue(val === resetLabel ? undefined : val);
      setIsFilterVisible(false);
      !!onChange && onChange(val === resetLabel ? undefined : val);
    };
    const renderItems = ({item}: {item: string}) => (
      <View
        onPress={() => handleSetValue(item)}
        paddingHorizontal={themeConfig.padding.medium}
        paddingVertical={themeConfig.padding.semiSmall}>
        <Text variant={TextVariants.H4}>{capitalizeFirstChar(item)}</Text>
      </View>
    );
    const renderSeparator = () => (
      <Divider backgroundColor={palette.backgroundPrimary} />
    );

    const data =
      showReset && items && resetLabel ? [resetLabel, ...items] : items;

    return (
      <>
        <InputContainer label={label}>
          <View
            height={themeConfig.padding.medium * 2}
            onPress={handleOpen}
            borderRadius={themeConfig.radius.xSmall}
            {...props}
            paddingHorizontal={themeConfig.padding.semiSmall}
            backgroundColor={backgroundColor || palette.backgroundSecondary}
            row
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text
              marginRight={themeConfig.padding.xSmall}
              variant={TextVariants.H4}>
              {capitalizeFirstChar(value || placeholder || '')}
            </Text>
            <IconWrapper icon={<Arrow />} color={themeConfig.colors.primary2} />
          </View>
        </InputContainer>
        <ModalMenu onRequestClose={handleFalse} isVisible={isFilterVisible}>
          <FlatList
            ItemSeparatorComponent={renderSeparator}
            data={data}
            renderItem={renderItems}
            extraData={(item: string) => item}
          />
        </ModalMenu>
      </>
    );
  },
);
