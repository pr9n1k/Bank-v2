import { Menu } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Page from '../components/page';

const Operator = () => {
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
              <Menu.Item key="1" onClick={() => router('/operator')}>
                Главная
              </Menu.Item>
              <Menu.Item
                key="2"
                onClick={() => router('/operator/create-client')}
              >
                Создать клиента
              </Menu.Item>
              <Menu.Item key="3" onClick={() => router('/operator/client')}>
                Клиенты
              </Menu.Item>
              <Menu.Item key="4" onClick={() => router('/operator/operation')}>
                Операции
              </Menu.Item>
              <Menu.Item key="5" onClick={() => router('/operator/encashment')}>
                Инкассация
              </Menu.Item>
              <Menu.Item key="6" onClick={() => router('/operator/balance')}>
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

export default Operator;
