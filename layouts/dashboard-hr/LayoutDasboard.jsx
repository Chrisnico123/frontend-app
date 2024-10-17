import propTypes from 'prop-types';
import {
  DashboardOutlined,
  MenuOutlined,
  PictureOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { Layout, Drawer } from 'antd';

import React, { useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import NavMenus from './NavMenus';
import './LayoutDashboard.css';
import BreadCrumb from '../../component/dashboard/BreadCrumb';
import './LayoutDashboard.css';


const { Sider, Content, Header } = Layout;

function LayoutDasboard(props) {
  const [collapsed, setCollapsed] = useState(
    window.innerWidth > 1200 ? false : true
  );
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const items = [
    // { key: 'home', icon: <AppstoreFilled />, label: 'Home' },
    { key: 'mnuReport', icon: <DashboardOutlined />, label: 'Report' },
    { key: 'mnuCustomer', icon: <PictureOutlined />, label: 'Customer' },
    { key: 'mnuProduct', icon: <BarChartOutlined />, label: 'Product' },
  ];

  const handleClickMenu = (param) => {
    if (param.key === '') {
      return;
    } else {
      navigate('/dashboard/' + param.key.toLowerCase().split('mnu')[1]);
    }
  };
  return (
    <Layout>
      <Drawer
        placement='right'
        onClose={() => setOpen(false)}
        open={open}
        width={250}
      >
        <div className='mobile-menu-wrapper'>
          <NavMenus
            items={items}
            theme='light'
            // items2={items2}
            handleClickMenu={handleClickMenu}
            defaultMenu={'mnuDashboard'}
            defaultOpen={['mnuDashboard']}
          />
        </div>
      </Drawer>
      <div className='menu-mobile'>
        <div onClick={() => navigate('/home')}>
          <h1 style={{ fontSize: '1.4em' }}>SPBE</h1>
        </div>
        <MenuOutlined
          style={{ fontSize: '1.3em' }}
          onClick={() => setOpen(true)}
        />
      </div>
      <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>
          <span>REPORT APP</span>
        </div>

        <div className='sider-menu-wrapper'>
          <NavMenus
            items={items}
            theme='dark'
            handleClickMenu={handleClickMenu}
            defaultMenu={'mnuDashboard'}
            defaultOpen={['mnuDashboard']}
          />
        </div>
      </Sider>

      <Layout className='site-layout'>
        <Header>
          {React.createElement(HiOutlineMenuAlt2, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <BreadCrumb />
        <Content className='site-layout-background'>{props.content}</Content>
      </Layout>
    </Layout>
  );
}

LayoutDasboard.propTypes = {
  content: propTypes.element.isRequired,
};

export default LayoutDasboard;
