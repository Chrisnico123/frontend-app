import { Form, Input, message, Modal, Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useProductDetail } from "../../../hooks/product/useProductDetail";

const EditProduct = ({ id, onUpdate, onCancel, show }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { VITE_BASE_URL } = import.meta.env;

  const { data, isLoading, refetch } = useProductDetail(id, false);


  useEffect(() => {
    if (show) {
      refetch();
    }
  }, [show, refetch]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        nama: data.data.nama,
        kategori: data.data.kategori,
        harga: data.data.harga,
      });
    }
  }, [data, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setLoading(true);

      await axios.put(
        VITE_BASE_URL + `/barang/${id}`,
        {
          ...values,
        }
      );

      message.success("product berhasil diubah");
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
      title='Edit Product'
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
                name="kategori"
                label="Kategori"
                rules={[{ required: true, message: "Harap diisi" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="harga"
                label="Harga"
              >
                <Input />
              </Form.Item>
            </div>
          </Form>
        </>
      )}
    </Modal>
  );
};

EditProduct.propTypes = {
  show: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  onUpdate: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
};

export default EditProduct;
