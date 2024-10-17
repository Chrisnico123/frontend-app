import { Navigate, Route, Routes } from 'react-router-dom';
import LayoutDasboard from '../layouts/dashboard-hr/LayoutDasboard';
import Report from './page/report/master/report';
import Customer from './page/customer/master/customer';
import Product from './page/product/master/product';
import DetailReport from './page/report/detail/DetailReport';

const Router = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
            <Navigate to={'/dashboard/report'}/>
        }
      />
      <Route
        path='/dashboard/report'
        element={
            <LayoutDasboard content={
              <Report/>
            } />
        }
      />
      <Route
        path='/dashboard/report/:id_report'
        element={
            <LayoutDasboard content={
              <DetailReport/>
            } />
        }
      />
      <Route
        path='/dashboard/customer'
        element={
            <LayoutDasboard content={
              <Customer/>
            } />
        }
      />
      <Route
        path='/dashboard/product'
        element={
            <LayoutDasboard content={
                <Product/>
            } />
        }
      />
    </Routes>
  );
};

export default Router;
