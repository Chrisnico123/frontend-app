import {
   Form,
   Input,
   message,
   Modal,
} from "antd";
import axios from "axios";
import { useState } from "react";
import propTypes from "prop-types";

const AddProduct = ({ show, onCreate, onCancel }) => {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const { VITE_BASE_URL } = import.meta.env;


   const handleSubmit = async () => {
      try {
         const values = await form.validateFields();
         setLoading(true);

         await axios.post(
            VITE_BASE_URL + `/barang`, values,
         );
         message.success("Product Berhasil Dibuat");
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
         title="Tambah Product"
      >
         <Form form={form} layout="vertical" className="full-form">
            <div className="first-form">
               <Form.Item
                  name="nama"
                  label="Nama"
                  rules={[{ required: true, message: "Harap diisi" }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  name="kategori"
                  label="Kategori"
                  rules={[{ required: true, message: "Harap diisi" }]}
               >
                  <Input/>
               </Form.Item>
               <Form.Item
                  name="harga"
                  label="Harga"
                  rules={[{ required: true, message: "Harap diisi" }]}
               >
                  <Input />
               </Form.Item>
            </div>
         </Form>
      </Modal>
   );
};

AddProduct.propTypes = {
   show: propTypes.bool.isRequired,
   onCreate: propTypes.func.isRequired,
   onCancel: propTypes.func.isRequired,
};


export default AddProduct;
