import { Button, Space, Table } from "antd";
import { Popconfirm, Tag } from "antd";
import { useCallback, useState } from "react";
import './report.css'
import { DeleteApi } from "../../../services/DeleteApi";
import { useReportPagination } from "../../../hooks/report/useReportPagination";
import AddReport from "../add/AddReport";
import { useNavigate } from "react-router-dom";
import EditReport from "../edit/EditReport";

const Report = () => {
   const [dataId, setDataId] = useState("");
   const [showAddReport, setShowAddReport] = useState(false);
   const [showEditReport, setShowEditReport] = useState(false);
   const [dataTable, setDataTable] = useState({
      current_page: 1,
      per_page: 15,
      total: 0,
   });
   // Keyword
   const { data, isLoading, isFetching, refetch } = useReportPagination(
      dataTable,
   );

   const navigate = useNavigate();

   console.log(data)


   const onCreate = useCallback(() => {
      setShowAddReport(false);
      refetch();
   }, [refetch]);

   const onUpdate = useCallback(() => {
      setShowEditReport(false);
      refetch();
   }, [refetch]);

   const onCancel = () => {
      setShowAddReport(false);
      setShowEditReport(false);
      setDataId("");
   };

   const columns = [
      {
         title: "No",
         dataIndex: "index",
         align: "left",
         width: window.innerWidth > 800 ? 70 : 50,
      },
      {
         title: "Id Nota",
         dataIndex: "id_nota",
         align: "left",
      },
      {
         title: "Nama",
         dataIndex: "nama",
         align: "left",
         width: window.innerWidth > 800 ? 200 : 150,
      },
      {
         title: "Tanggal",
         dataIndex: "created_at",
         align: "left",
      },
      {
         title: "SubTotal",
         dataIndex: "subtotal",
         align: "left",
         width: 120,
      },
      {
         title: "Aksi",
         dataIndex: "id_nota",
         align: "center",
         width: window.innerWidth > 800 ? 300 : 200,
         render: (id) => {
            return (
               <>
                  <Tag
                     color="orange"
                     style={
                        { cursor: "pointer" }
                     }
                     onClick={() => {
                        setDataId(id);
                        setShowEditReport(true);
                     }}
                  >
                     Ubah
                  </Tag>
                  <Popconfirm
                     title="Yakin ingin menghapus ?"
                     okText="Hapus"
                     cancelText="Batal"
                     onConfirm={() => {
                        const dataId = id;
                        DeleteApi({
                           url: "/penjualan/",
                           dataId,
                           refetch,
                        });
                     }}
                  >
                     <Tag
                        color="magenta"
                        style={
                           { cursor: "pointer" }
                        }
                     >
                        Hapus
                     </Tag>
                  </Popconfirm>
                  <Tag
                     color="blue"
                     style={
                        { cursor: "pointer" }
                     }
                     onClick={() => {
                        const dataId = id;
                        navigate(`${dataId}`);
                     }}
                  >
                     Detail
                  </Tag>
               </>
            );
         },
      },
   ];

   const dataSource = data?.data?.slice(0, dataTable.per_page)
      .map((x, i) => {
         return {
            ...x,
            key: x._id,
            index: i + 1,
         };
      });

   const pagination = {
      current: dataTable.current_page,
      pageSize: dataTable.per_page,
      total: data?.data?.total,
      showSizeChanger: true,
      pageSizeOptions: [15, 20, 50, 100],
      onChange: (curr, size) => {
         setDataTable((prev) => {
            return {
               ...prev,
               current_page: curr,
               per_page: size,
            };
         });
      },
   };

   return (
      <>
         <div className="table-header">
            <h1>Table Report</h1>
            <Space>
               <Button
                  type="primary"
                  onClick={() => setShowAddReport(true)}
               >
                  Tambah Penjualan
               </Button>
            </Space>
         </div>
         <Table
            size="small"
            tableLayout="auto"
            columns={columns}
            loading={isLoading || isFetching}
            dataSource={dataSource}
            pagination={pagination}
            scroll={{
               y: "50vh",
               x: 800,
            }}
         />
         <AddReport
            onCreate={onCreate}
            onCancel={onCancel}
            show={showAddReport}
         />
         <EditReport
            id={dataId}
            onUpdate={onUpdate}
            onCancel={onCancel}
            show={showEditReport}
         />
      </ >
   );
};

export default Report;
