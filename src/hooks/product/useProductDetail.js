import { useQuery } from 'react-query';
import { getDetailProduct } from '../../services/product';

export const useProductDetail = (id, enabled) => {
  return useQuery(
    ['get-product-detail', id],
    () => getDetailProduct(`/barang/${id}`),
    {
      enabled,
    }
  );
};
