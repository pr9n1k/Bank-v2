import { Menu } from 'antd';
import Layout, { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Page from '../components/page';

const AdminMainRouter = () => {
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
              <Menu.Item key="1" onClick={() => router('/admin')}>
                Главная
              </Menu.Item>
              <Menu.Item key="2" onClick={() => router('/admin/employee')}>
                Сотрудники
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => router('/admin/employee/create')}
              >
                Добавить сотрудника
              </Menu.Item>
              <Menu.Item
                key="4"
                onClick={() => router('/admin/employee/not-work')}
              >
                Уволенные сотрудники
              </Menu.Item>
              <Menu.Item key="5" onClick={() => router('/admin/department')}>
                Отделения
              </Menu.Item>
              <Menu.Item
                key="6"
                onClick={() => router('/admin/department/create')}
              >
                Создать отделение
              </Menu.Item>
              <Menu.Item key="7" onClick={() => router('/admin/encashment')}>
                Инкассация
              </Menu.Item>
              <Menu.Item key="8" onClick={() => router('/admin/settings')}>
                Настройки
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

export default AdminMainRouter;
