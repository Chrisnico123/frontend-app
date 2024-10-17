import { message } from 'antd';
import axios from 'axios';

const { VITE_BASE_URL } = import.meta.env;

export const getReport = async (url) => {
  try {
    const { data } = await axios.get(VITE_BASE_URL + url);
    return data;
  } catch (error) {
    message.error(`Gagal mengambil data ( ${error.message} )`, 3);

    return error;
  }
};

export const getDetailReport = async (url) => {
  try {
    const { data } = await axios.get(VITE_BASE_URL + url);
    return data;
  } catch (error) {
    message.error(`Gagal mengambil data ( ${error.message} )`, 3);
    return error;
  }
};
