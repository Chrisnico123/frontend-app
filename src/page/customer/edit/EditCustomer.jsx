import { Form, Input, message, Modal, Radio, Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { customerGender } from "../constant";
import { useCustomerDetail } from "../../../hooks/customer/useCustomerDetail";

const EditCustomer = ({ id, onUpdate, onCancel, show }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { VITE_BASE_URL } = import.meta.env;
  const { data, isLoading, refetch } = useCustomerDetail(id, false);

  useEffect(() => {
    if (show) {
      refetch();
    }
  }, [show, refetch]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        nama: data.data.nama,
        domisili: data.data.domisili,
        jenis_kelamin: data.data.jenis_kelamin,
      });
    }
  }, [data, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setLoading(true);

      await axios.put(
        VITE_BASE_URL + `/pelanggan/${id}`,
        {
          ...values,
        }
      );

      message.success("pelanggan berhasil diubah");
      form.resetFields();
      onUpdate();
    } catch (error) {
      message.error(error.response?.data?.message || 'Fields Error');
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
      okText='Simpan'
      cancelText='Batal'
      onOk={handleSubmit}
      onCancel={handleCancelModal}
      okButtonProps={{ loading }}
      title='Edit Users'
    >
      {isLoading && <Skeleton active />}
      {!isLoading && (
        <>
          <Form form={form} layout='vertical' className='full-form'>
            <div className='first-form'>
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
                <Input />
              </Form.Item>
              <Form.Item
                name="jenis_kelamin"
                label="Jenis Kelamin"
              >
                <Radio.Group options={customerGender} />
              </Form.Item>
            </div>
          </Form>
        </>
      )}
    </Modal>
  );
};

EditCustomer.propTypes = {
  show: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  onUpdate: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
};

export default EditCustomer;
