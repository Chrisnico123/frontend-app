import { useQuery } from 'react-query';
import { getDetailReport } from '../../services/report';

export const useReportDetail = (id, enabled) => {
  return useQuery(
    ['get-report-detail', id],
    () => getDetailReport(`/penjualan/${id}`),
    {
      enabled,
    }
  );
};
