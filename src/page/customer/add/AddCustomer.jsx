import {
   Form,
   Input,
   message,
   Modal,
   Radio,
} from "antd";
import axios from "axios";
import { useState } from "react";
import propTypes from "prop-types";
import { customerGender } from "../constant";



const AddCustomer = ({ show, onCreate, onCancel }) => {
   const [form] = Form.useForm();
   const [loading, setLoading] = useState(false);
   const { VITE_BASE_URL } = import.meta.env;


   const handleSubmit = async () => {
      try {
         const values = await form.validateFields();
         setLoading(true);

         await axios.post(
            VITE_BASE_URL + `/pelanggan`, values,
         );
         message.success("Customer Berhasil Dibuat");
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
         title="Tambah Customer"
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
                  name="domisili"
                  label="Domisili"
                  rules={[{ required: true, message: "Harap diisi" }]}
               >
                  <Input/>
               </Form.Item>
               <Form.Item
                  name="jenis_kelamin"
                  label="Jenis Kelamin"
               >
                  <Radio.Group options={customerGender} />
               </Form.Item>
            </div>
         </Form>
      </Modal>
   );
};

AddCustomer.propTypes = {
   show: propTypes.bool.isRequired,
   onCreate: propTypes.func.isRequired,
   onCancel: propTypes.func.isRequired,
};


export default AddCustomer;
