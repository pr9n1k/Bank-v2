import { Role } from '@prisma/client';
import { Button, Form, Input, Select } from 'antd';
import React, { FC } from 'react';
import { rules } from '../../../utils/rules';
import { createEmployee } from '@bank-v2/interface';
interface CreateEmployeeFormType {
  submit: () => void;
  employee: createEmployee;
  setEmployee: React.Dispatch<React.SetStateAction<createEmployee>>;
  reset: () => void;
  isLoading: boolean;
  titleButton: string;
  setStep?: React.Dispatch<React.SetStateAction<number>>;
}
const EmployeeForm: FC<CreateEmployeeFormType> = ({
  employee,
  reset,
  setEmployee,
  submit,
  isLoading,
  titleButton,
  setStep,
}) => {
  return (
    <Form onFinish={submit} onReset={reset}>
      <Form.Item
        name="surname"
        rules={[rules.required()]}
        initialValue={employee.surname as string}
      >
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
        <Input
          placeholder="Введите телефон.."
          value={employee.phone as string}
          onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
          type="number"
          maxLength={10}
          minLength={10}
        />
      </Form.Item>
      {!setStep && (
        <Form.Item name="role" rules={setStep ? [] : [rules.required()]}>
          <Select
            placeholder="Выберите роль"
            onChange={(e) => setEmployee({ ...employee, role: e })}
            disabled={setStep ? true : false}
            value={setStep ? Role.ADMIN : Role.OPERATOR}
          >
            <Select.Option key={1} value={Role.OPERATOR}>
              Операционист
            </Select.Option>
            <Select.Option key={2} value={Role.CASHIER}>
              Кассир
            </Select.Option>
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          {titleButton}
        </Button>
        <Button style={{ marginLeft: '15px' }} type="default" htmlType="reset">
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
