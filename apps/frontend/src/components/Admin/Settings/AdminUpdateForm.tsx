import React, { useState } from 'react';
import { Employee, Role } from '@prisma/client';
import { Form, Input, Select, Button } from 'antd';
import { rules } from '../../../../src/utils/rules';
type AdminUpdateFormProps = {
  oldAdmin: Employee;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const AdminUpdateForm: React.FC<AdminUpdateFormProps> = ({
  oldAdmin,
  setVisible,
}) => {
  const [admin, setAdmin] = useState<Employee>(oldAdmin);
  const submit = () => {
    console.log(admin);
  };
  const reset = () => {
    setVisible(false);
  };
  return (
    <Form onFinish={submit} onReset={reset}>
      <Form.Item
        name="name"
        rules={[rules.required()]}
        initialValue={admin.name}
      >
        <Input
          placeholder="Введите имя.."
          value={admin.name}
          onChange={(e) => setAdmin({ ...admin, name: e.target.value })}
          type="text"
        />
      </Form.Item>
      <Form.Item
        name="patronymic"
        rules={[rules.required()]}
        initialValue={admin.patronymic}
      >
        <Input
          placeholder="Введите отчество.."
          value={admin.patronymic || ''}
          onChange={(e) => setAdmin({ ...admin, patronymic: e.target.value })}
          type="text"
        />
      </Form.Item>
      <Form.Item
        name="surname"
        rules={[rules.required()]}
        initialValue={admin.surname}
      >
        <Input
          placeholder="Введите фамилию.."
          value={admin.surname}
          onChange={(e) => setAdmin({ ...admin, surname: e.target.value })}
          type="text"
        />
      </Form.Item>
      <Form.Item
        name="login"
        rules={[rules.required()]}
        initialValue={admin.login}
      >
        <Input
          placeholder="Введите логин.."
          value={admin.login}
          onChange={(e) => setAdmin({ ...admin, login: e.target.value })}
          type="text"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[rules.required()]}
        initialValue={admin.password}
      >
        <Input
          placeholder="Введите пароль.."
          value={admin.password}
          onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          type="password"
        />
      </Form.Item>
      <Form.Item
        name="phone"
        rules={[rules.required()]}
        initialValue={admin.phone}
      >
        <Input
          placeholder="Введите телефон.."
          value={admin.phone}
          onChange={(e) => setAdmin({ ...admin, phone: e.target.value })}
          type="number"
          maxLength={10}
          minLength={10}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Обновить
        </Button>
        <Button style={{ marginLeft: '15px' }} type="default" htmlType="reset">
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminUpdateForm;
