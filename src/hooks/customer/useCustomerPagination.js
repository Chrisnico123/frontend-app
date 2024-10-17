import { useQuery } from 'react-query';
import { getCustomer } from '../../services/customer';

export const useCustomerPagination = (dataTable) => {
  return useQuery(
    [
      'get-pelanggan-pagination',
      dataTable.current_page,
      dataTable.per_page,
    ],
    () =>
      getCustomer(
        `/pelanggan?page=${dataTable.current_page}&limit=${dataTable.per_page}`
      )
  );
};
