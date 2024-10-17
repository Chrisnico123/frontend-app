import { Form, message, Modal, Select, Skeleton, Space, InputNumber, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useReportDetail } from "../../../hooks/report/useReportDetail";
import { useProductPagination } from '../../../hooks/product/useProductPagination';
import { useCustomerPagination } from '../../../hooks/customer/useCustomerPagination';

const EditReport = ({ id, onUpdate, onCancel, show }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { VITE_BASE_URL } = import.meta.env;
  const [dataTable] = useState({
    current_page: 1,
    per_page: 20,
    total: 0,
  });

  const { data, isLoading, refetch } = useReportDetail(id, false);
  const { data: dataProduct, isLoading: productLoad, isFetching: productFetch, refetch: refetchProduct } = useProductPagination(
    dataTable,
  );
  const { data: dataCustomer, isLoading: customerLoad, isFetching: customerFetch, refetch: refetchCustomer } = useCustomerPagination(
    dataTable,
  );

  useEffect(() => {
    if (show) {
      refetch();
      refetchProduct();
      refetchCustomer();
    }
  }, [show, refetch, refetchProduct, refetchCustomer]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        id_pelanggan: data.data.id_pelanggan,
        penjualan: data.data.barang.map(item => ({
          kode_barang: item.kode_barang,
          qty: item.qty,
        })),
      });
    }
  }, [data, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setLoading(true);

      await axios.put(
        VITE_BASE_URL + `/penjualan/${id}`,
        {
          ...values,
        }
      );

      message.success("Product berhasil diubah");
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

  const customerOptions = dataCustomer?.data?.map(customer => ({
    value: customer.id_pelanggan,
    label: customer.nama, 
  }));

  const productOptions = dataProduct?.data?.map(product => ({
    value: product.kode,
    label: product.nama,
  }));

  return (
    <Modal
      open={show}
      okText='Simpan'
      cancelText='Batal'
      onOk={handleSubmit}
      onCancel={handleCancelModal}
      okButtonProps={{ loading }}
      title='Edit Data Penjualan'
    >
      {isLoading && <Skeleton active />}
      {!isLoading && (
        <>
          <Form form={form} layout="vertical" className="full-form">
            <div className="first-form">
              <Form.Item
                name="id_pelanggan"
                label="Pelanggan"
                rules={[{ required: true, message: "Harap diisi" }]}
              >
                <Select placeholder="Customer" options={customerOptions} />
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
                              message: 'Harap pilih produk',
                            },
                          ]}
                        >
                          <Select placeholder="Pilih Produk" options={productOptions} />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'qty']}
                          rules={[
                            {
                              required: true,
                              message: 'Harap masukkan jumlah',
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
                        Tambah Produk
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </Form>
        </>
      )}
    </Modal>
  );
};

EditReport.propTypes = {
  show: propTypes.bool.isRequired,
  onCancel: propTypes.func.isRequired,
  onUpdate: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
};

export default EditReport;
