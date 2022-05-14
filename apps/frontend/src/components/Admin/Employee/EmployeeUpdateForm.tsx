import { Employee, Role } from '@prisma/client';
import { Button, Form, Input, Select } from 'antd';
import React, { FC } from 'react';
import { rules } from '../../../utils/rules';
interface CreateEmployeeUpdateFormType {
  submit: () => void;
  employee: Employee;
  setEmployee: React.Dispatch<React.SetStateAction<Employee>>;
  reset: () => void;
  isLoading: boolean;
}
const EmployeeUpdateForm: FC<CreateEmployeeUpdateFormType> = ({
  employee,
  reset,
  setEmployee,
  submit,
  isLoading,
}) => {
  return (
    <Form onFinish={submit} onReset={reset}>
      <Form.Item
        name="surname"
        rules={[rules.required()]}
        initialValue={employee.surname as string}
      >
        <span>Фамилия</span>
        <Input
          placeholder="Введите фамилию.."
          value={employee.surname as string}
          onChange={(e) =>
            setEmployee({ ...employee, surname: e.target.value })
          }
          type="text"
        />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[rules.required()]}
        initialValue={employee.name as string}
      >
        <span>Имя</span>
        <Input
          placeholder="Введите имя.."
          value={employee.name as string}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          type="text"
        />
      </Form.Item>
      <Form.Item
        name="patronymic"
        rules={[rules.required()]}
        initialValue={employee.patronymic as string}
      >
        <span>Отчество</span>
        <Input
          placeholder="Введите отчество.."
          value={employee.patronymic as string}
          onChange={(e) =>
            setEmployee({ ...employee, patronymic: e.target.value })
          }
          type="text"
        />
      </Form.Item>
      <Form.Item
        name="login"
        rules={[rules.required()]}
        initialValue={employee.login as string}
      >
        <span>Логин</span>
        <Input
          placeholder="Введите логин.."
          value={employee.login as string}
          onChange={(e) => setEmployee({ ...employee, login: e.target.value })}
          type="text"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[rules.required()]}
        initialValue={employee.password as string}
      >
        <span>Пароль</span>
        <Input
          placeholder="Введите пароль.."
          value={employee.password as string}
          onChange={(e) =>
            setEmployee({ ...employee, password: e.target.value })
          }
          type="password"
        />
      </Form.Item>
      <Form.Item
        name="phone"
        rules={[rules.required()]}
        initialValue={employee.phone as string}
      >
        <span>Телефон</span>
        <Input
          placeholder="Введите телефон.."
          value={employee.phone as string}
          onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
          type="number"
          maxLength={10}
          minLength={10}
        />
      </Form.Item>
      <Form.Item
        name="role"
        rules={[rules.required()]}
        initialValue={employee.role as string}
      >
        <span>Роль</span>
        <Select
          placeholder="Выберите роль"
          onChange={(e) => setEmployee({ ...employee, role: e })}
          defaultValue={employee.role}
        >
          <Select.Option key={1} value={Role.OPERATOR}>
            Операционист
          </Select.Option>
          <Select.Option key={2} value={Role.CASHIER}>
            Кассир
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Обновить
        </Button>
        <Button style={{ marginLeft: '15px' }} type="default" htmlType="reset">
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeUpdateForm;
