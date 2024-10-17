import { Button, Space, Table } from "antd";
import { Popconfirm, Tag } from "antd";
import { useCallback, useState } from "react";
import './product.css'
import { DeleteApi } from "../../../services/DeleteApi";
import AddProduct from "../add/AddProduct";
import EditProduct from "../edit/EditProduct";
import { useProductPagination } from "../../../hooks/product/useProductPagination";

const Product = () => {
   const [dataId, setDataId] = useState("");
   const [showAddProduct, setShowAddProduct] = useState(false);
   const [showEditProduct, setShowEditProduct] = useState(false);
   const [dataTable, setDataTable] = useState({
      current_page: 1,
      per_page: 15,
      total: 0,
   });
   // Keyword
   const { data, isLoading, isFetching, refetch } = useProductPagination(
      dataTable,
   );

   const onCreate = useCallback(() => {
      setShowAddProduct(false);
      refetch();
   }, [refetch]);

   const onUpdate = useCallback(() => {
      setShowEditProduct(false);
      refetch();
   }, [refetch]);

   const onCancel = () => {
      setShowAddProduct(false);
      setShowEditProduct(false);
      setShowResetPassword(false);
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
         title: "Kode",
         dataIndex: "kode",
         align: "left",
      },
      {
         title: "Nama",
         dataIndex: "nama",
         align: "left",
         width: window.innerWidth > 800 ? 200 : 150,
      },
      {
         title: "Kategori",
         dataIndex: "kategori",
         align: "left",
      },
      {
         title: "Harga",
         dataIndex: "harga",
         align: "left",
      },
      {
         title: "Aksi",
         dataIndex: "kode",
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
                        setShowEditProduct(true);
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
                           url: "/barang/",
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
            <h1>Daftar Barang</h1>
            <Space>
               <Button
                  type="primary"
                  onClick={() => setShowAddProduct(true)}
               >
                  Tambah Barang
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
         <AddProduct
            onCreate={onCreate}
            onCancel={onCancel}
            show={showAddProduct}
         />
         <EditProduct
            id={dataId}
            onUpdate={onUpdate}
            onCancel={onCancel}
            show={showEditProduct}
         />
      </ >
   );
};

export default Product;
