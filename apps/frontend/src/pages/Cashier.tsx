import { Menu } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Page from '../components/page';

const Cashier = () => {
  const router = useNavigate();
  return (
    <Page>
      <Content>
        <Layout style={{ height: '100%' }}>
          <Sider collapsible>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <Menu.Item key="1" onClick={() => router('/cashier')}>
                Главная
              </Menu.Item>
              <Menu.Item key="2" onClick={() => router('/cashier/communal')}>
                Коммуналльные услуги
              </Menu.Item>
              <Menu.Item key="3" onClick={() => router('/cashier/payments')}>
                Операции
              </Menu.Item>
              <Menu.Item key="4" onClick={() => router('/cashier/encashment')}>
                Инкассация
              </Menu.Item>
              <Menu.Item key="5" onClick={() => router('/cashier/balance')}>
                Баланс
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Content>
    </Page>
  );
};

export default Cashier;
