import { useQuery } from 'react-query';
import { getDetailCustomer } from '../../services/customer';

export const useCustomerDetail = (id, enabled) => {
  return useQuery(
    ['get-customer-detail', id],
    () => getDetailCustomer(`/pelanggan/${id}`),
    {
      enabled,
    }
  );
};
