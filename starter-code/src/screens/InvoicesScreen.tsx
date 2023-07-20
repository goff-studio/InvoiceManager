import React, {useMemo, useState} from 'react';
import {Screen, themeConfig, View} from '../components/theme';
import {FlatList} from 'react-native';
import {InvoiceListItem} from '../components/InvoiceListItem';
import {InvoiceDraft} from '../types/invoice';
import {InvoicesListHeader} from '../components/InvoicesListHeader';
import {EmptyState} from '../components/EmptyState';
import {useInvoices} from '../hooks/useInvoices';

export const InvoicesScreen: React.FC = () => {
  const [filter, setFilter] = useState<string>();
  const {invoices} = useInvoices();
  const renderItem = ({item}: {item: InvoiceDraft}) => (
    <InvoiceListItem invoice={item} />
  );
  const renderSeparator = () => (
    <View height={themeConfig.padding.semiSmall} width={1} />
  );

  const renderHeader = () => (
    <InvoicesListHeader
      initialFilter={filter}
      onFilterSelected={setFilter}
      total={invoices.length}
    />
  );

  const renderEmptyState = () => <EmptyState />;

  const filteredData = useMemo(() => {
    if (!filter) {
      return invoices;
    }
    return invoices.filter(item => item.status === filter);
  }, [filter, invoices]);

  return (
    <Screen>
      <FlatList
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeader}
        ItemSeparatorComponent={renderSeparator}
        data={filteredData}
        renderItem={renderItem}
      />
    </Screen>
  );
};
