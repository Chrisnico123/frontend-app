import {
   Button,
   Form,
   InputNumber,
   message,
   Modal,
   Select,
   Space,
} from "antd";
import axios from "axios";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import propTypes from "prop-types";
import { useProductPagination } from "../../../hooks/product/useProductPagination";
import { useCustomerPagination } from "../../../hooks/customer/useCustomerPagination";

const AddReport = ({ show, onCreate, onCancel }) => {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const { VITE_BASE_URL } = import.meta.env;
   const [dataTable] = useState({
      current_page: 1,
      per_page: 20,
      total: 0,
   });
   // Keyword
   const { data, isLoading, isFetching, refetch } = useProductPagination(
      dataTable,
   );
   const { data:dataCustomer, isLoading:customerLoad, isFetching:customerFetch, refetch:refetchCustomer } = useCustomerPagination(
      dataTable,
   );

   const dataProduct = data?.data?.map(product => {
      return {
         "value" : product.kode,
         "label" : product.nama,
      }
   })

   const customerData = dataCustomer?.data?.map(item => {
      return {
         "value" : item.id_pelanggan,
         "label" : item.nama,
      }
   })

   const handleSubmit = async () => {
      try {
         const values = await form.validateFields();
         setLoading(true);

         await axios.post(
            VITE_BASE_URL + `/penjualan`, values,
         );
         message.success("Data Berhasil Dibuat");
         form.resetFields();
         onCreate();
      } catch (error) {
         message.error(error.response.data.message || error.message);
      } finally {
         setLoading(false);
      }
   };

   const handleCancelModal = () => {
      form.resetFields();
      onCancel();
   };

   return (
      <Modal
         open={show}
         okText="Simpan"
         cancelText="Batal"
         onOk={handleSubmit}
         onCancel={handleCancelModal}
         okButtonProps={{ loading }}
         title="Tambah User"
      >
         <Form form={form} layout="vertical" className="full-form">
            <div className="first-form">
               <Form.Item
                  name="id_pelanggan"
                  label="Pelanggan"
                  rules={[{ required: true, message: "Harap diisi" }]}
               >
                  <Select placeholder="Customer" options={customerData} />
               </Form.Item>
               <Form.List name="penjualan">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{
                            display: 'flex',
                            marginBottom: 8,
                          }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'kode_barang']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing Product',
                              },
                            ]}
                          >
                            <Select placeholder="First Name" options={dataProduct} />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, 'qty']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing Qty',
                              },
                            ]}
                          >
                            <InputNumber placeholder="Qty" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
            <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Product
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
            </div>
         </Form>
      </Modal>
   );
};

AddReport.propTypes = {
   show: propTypes.bool.isRequired,
   onCreate: propTypes.func.isRequired,
   onCancel: propTypes.func.isRequired,
};


export default AddReport;
