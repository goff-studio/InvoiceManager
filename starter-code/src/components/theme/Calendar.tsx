import React, {useState} from 'react';
import {Calendar as RNCalendar, DateData} from 'react-native-calendars';
import {InputContainer} from '../InputContainer';
import {View} from './View';
import {themeConfig} from '../../configs/themeConfig';
import {Text} from './Text';
import {TextVariants} from '../../types/theme';
import {capitalizeFirstChar} from '../../utils/invoices';
import {IconWrapper} from '../IconWrapper';
import CalendarIcon from '../../assets/icon-calendar.svg';
import {ModalMenu} from './ModalMenu';
import {usePalette} from '../../hooks/usePalette';
import {generateCalendarConfig} from '../../utils/theme';
import {Card} from './Card';
import moment from 'moment';
import {dateConfig} from '../../configs/dateConfig';

export const Calendar: React.FC<any> = ({
  label,
  backgroundColor,
  value,
  placeholder,
  onChange,
  ...props
}) => {
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>();
  const {palette} = usePalette();
  const handleOpen = () => setIsPickerVisible(true);
  const handleClose = () => setIsPickerVisible(false);
  const calendarTheme = generateCalendarConfig(palette);
  const handleChangeDate = (date: DateData) => {
    onChange(moment(date.dateString).format(dateConfig.storedDateFormat));
    setIsPickerVisible(false);
  };
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
          <IconWrapper
            icon={<CalendarIcon />}
            color={themeConfig.colors.primary2}
          />
        </View>
      </InputContainer>
      <ModalMenu onRequestClose={handleClose} isVisible={isPickerVisible}>
        <Card
          backgroundColor={palette.backgroundDisabled}
          paddingVertical={themeConfig.radius.xSmall}
          paddingHorizontal={themeConfig.radius.xSmall}>
          <RNCalendar
            markedDates={{
              [value]: {selected: true, disableTouchEvent: true},
            }}
            current={value}
            onDayPress={handleChangeDate}
            theme={calendarTheme}
          />
        </Card>
      </ModalMenu>
    </>
  );
};
