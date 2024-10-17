import { Fragment } from 'react'
import { useParams } from "react-router-dom";
import { Divider, Skeleton } from "antd";
import './DetailReport.css'
import { useReportDetail } from '../../../hooks/report/useReportDetail';

function DetailReport() {
   const { id_report: id } = useParams();

   // get article detail
   const {
      data: dataDetail,
      isLoading: skeleton,
   } = useReportDetail(id, true);

   const data = dataDetail?.data;

   return (
      <>
         {skeleton && <Skeleton active />}
         {!skeleton && data && (
            <Fragment key={data.id}>
               <Divider orientation="left">Data Report</Divider>
               <table className="detail-article__table">
                  <tbody>
                     <tr>
                        <th>Id Nota</th>
                        <td>: {data?.id_nota}</td>
                     </tr>
                     <tr>
                        <th>Nama</th>
                        <td>: {data?.nama}</td>
                     </tr>
                     <tr>
                        <th>Domisili</th>
                        <td>: {data?.domisili}</td>
                     </tr>
                     <tr>
                        <th>Jenis Kelamin</th>
                        <td>: {data?.jenis_kelamin}</td>
                     </tr>
                     <tr>
                        <th>Tanggal</th>
                        <td>: {data?.created_at}</td>
                     </tr>
                  </tbody>
               </table>
               <table className="detail-article__table">
                  <thead>
                     <tr>
                        <th>Nama</th>
                        <th>Quantity</th>
                     </tr>
                  </thead>
                  <tbody>
                     {data?.barang?.map((item, index) => (
                        <tr key={index}>
                           <td>{item.nama_barang}</td>
                           <td>{item.qty}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Fragment>
         )}
      </>
   )
}

export default DetailReport;
