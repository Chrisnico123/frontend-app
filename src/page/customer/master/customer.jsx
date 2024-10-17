import { Button, Space, Table } from "antd";
import { Popconfirm, Tag } from "antd";
import { useCallback, useState } from "react";
import './customer.css'
import { DeleteApi } from "../../../services/DeleteApi";
import AddCustomer from "../add/AddCustomer";
import EditCustomer from "../edit/EditCustomer";
import { useCustomerPagination } from "../../../hooks/customer/useCustomerPagination";

const Customer = () => {
   const [dataId, setDataId] = useState("");
   const [showAddCustomer, setShowAddCustomer] = useState(false);
   const [showEditCustomer, setShowEditCustomer] = useState(false);
   const [dataTable, setDataTable] = useState({
      current_page: 1,
      per_page: 15,
      total: 0,
   });
   // Keyword
   const { data, isLoading, isFetching, refetch } = useCustomerPagination(
      dataTable,
   );

   const onCreate = useCallback(() => {
      setShowAddCustomer(false);
      refetch();
   }, [refetch]);

   const onUpdate = useCallback(() => {
      setShowEditCustomer(false);
      refetch();
   }, [refetch]);

   const onCancel = () => {
      setShowAddCustomer(false);
      setShowEditCustomer(false);
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
         title: "Id Pelanggan",
         dataIndex: "id_pelanggan",
         align: "left",
      },
      {
         title: "Nama",
         dataIndex: "nama",
         align: "left",
      },
      {
         title: "Domisili",
         dataIndex: "domisili",
         align: "left",
      },
      {
         title: "Jenis Kelamin",
         dataIndex: "jenis_kelamin",
         align: "left",
         width: 80,
      },
      {
         title: "Aksi",
         dataIndex: "id_pelanggan",
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
                        setShowEditCustomer(true);
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
                           url: "/pelanggan/",
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
               </>
            );
         },
      },
   ];

   const dataSource = data?.data?.slice(0, dataTable.per_page)
      .map((x, i) => {
         return {
            ...x,
            key: x.id_pelanggan,
            index: i + 1,
         };
      });

   console.log("asd => " , dataSource)

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
            <h1>Daftar Pelanggan</h1>
            <Space>
               <Button
                  type="primary"
                  onClick={() => setShowAddCustomer(true)}
               >
                  Tambah Pelanggan
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
         <AddCustomer
            onCreate={onCreate}
            onCancel={onCancel}
            show={showAddCustomer}
         />
         <EditCustomer
            id={dataId}
            onUpdate={onUpdate}
            onCancel={onCancel}
            show={showEditCustomer}
         />
      </ >
   );
};

export default Customer;
