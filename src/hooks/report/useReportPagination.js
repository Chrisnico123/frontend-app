import { useQuery } from 'react-query';
import { getReport } from '../../services/report';

export const useReportPagination = (dataTable) => {
  return useQuery(
    [
      'get-report-pagination',
      dataTable.current_page,
      dataTable.per_page,
    ],
    () =>
      getReport(
        `/penjualan?page=${dataTable.current_page}&limit=${dataTable.per_page}`
      )
  );
};
