import { useQuery } from 'react-query';
import { getProduct } from '../../services/product';

export const useProductPagination = (dataTable) => {
  return useQuery(
    [
      'get-product-pagination',
      dataTable.current_page,
      dataTable.per_page,
    ],
    () =>
      getProduct(
        `/barang?page=${dataTable.current_page}&limit=${dataTable.per_page}`
      )
  );
};
