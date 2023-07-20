import React from 'react';
import {DropDown, Text, themeConfig, View} from './theme';
import {TextVariants} from '../types/theme';
import {InvoicesListHeaderProps, InvoiceStatuses} from '../types/invoice';
import {Button} from './theme/Button';
import AddIcon from '../assets/icon-plus.svg';
import {useNavigation} from '@react-navigation/native';
import {NavigationScreens} from '../types/navigation';
import {generateId} from '../utils/invoices';

export const InvoicesListHeader: React.FC<InvoicesListHeaderProps> = React.memo(
  ({total, onFilterSelected, initialFilter, ...props}) => {
    const navigation = useNavigation();
    const handleNavigateToNewInvoice = () =>
      navigation.navigate(
        NavigationScreens.INVOICE_FORM as never,
        {
          id: generateId(),
        } as never,
      );
    return (
      <View
        alignItems={'center'}
        row
        {...props}
        justifyContent={'space-between'}
        paddingVertical={themeConfig.padding.semiSmall}>
        <View>
          <Text variant={TextVariants.H2}>Invoices</Text>
          <Text marginTop={5}>{total} invoices</Text>
        </View>
        <View row alignItems={'center'}>
          <DropDown
            borderColor={'transparent'}
            showReset
            resetLabel={'Show all'}
            initialValue={initialFilter}
            items={Object.values(InvoiceStatuses)}
            onChange={onFilterSelected}
            backgroundColor={'transparent'}
            label={''}
            placeholder={'Filter'}
          />
          <Button
            onPress={handleNavigateToNewInvoice}
            icon={<AddIcon />}
            label={'New'}
            circleIcon
          />
        </View>
      </View>
    );
  },
);
