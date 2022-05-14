import React, { FC } from 'react';
import { Button, Form, Input, message } from 'antd';
import { rules } from '../../../utils/rules';
import { operationAPI } from '../../../service/operationServise';
import { createOperation } from '@bank-v2/interface';
interface ArrivlFormType {
  operation: createOperation;
  setOperation: React.Dispatch<React.SetStateAction<createOperation>>;
}

const ArrivalForm: FC<ArrivlFormType> = ({ operation, setOperation }) => {
  const [addOperation] = operationAPI.useAddMutation();
  const [form] = Form.useForm();
  const submit = () => {
    addOperation(operation)
      .unwrap()
      .then(() => {
        message.success('Операция создана');
        form.resetFields();
      })
      .catch((e) => message.error(e.data.message));
  };
  return (
    <Form onFinish={submit} form={form}>
      <Form.Item name="surname" rules={[rules.required()]}>
        <Input
          placeholder="Введите фамилию.."
          value={operation.surname}
          onChange={(e) =>
            setOperation({ ...operation, surname: e.target.value })
          }
          type="text"
        />
      </Form.Item>
      <Form.Item name="fullName" rules={[rules.required()]}>
        <Input
          placeholder="Введите имя.."
          value={operation.name}
          onChange={(e) => setOperation({ ...operation, name: e.target.value })}
          type="text"
        />
      </Form.Item>
      <Form.Item name="patronymic">
        <Input
          placeholder="Введите отчество.."
          value={operation.patronymic}
          onChange={(e) =>
            setOperation({ ...operation, patronymic: e.target.value })
          }
          type="text"
        />
      </Form.Item>
      <Form.Item name="inn" rules={[rules.required()]}>
        <Input
          placeholder="Введите ИНН.."
          value={operation.inn}
          onChange={(e) => setOperation({ ...operation, inn: e.target.value })}
          type="number"
          maxLength={10}
          minLength={10}
        />
      </Form.Item>
      <Form.Item>
        <Input
          placeholder={operation.currency}
          value={operation.currency}
          disabled={true}
        />
      </Form.Item>
      <Form.Item name="money" rules={[rules.required()]}>
        <Input
          placeholder="Введите сумму.."
          value={operation.money}
          onChange={(e) =>
            setOperation({ ...operation, money: parseFloat(e.target.value) })
          }
          type="number"
        />
      </Form.Item>
      <Form.Item name="purpose" rules={[rules.required()]}>
        <Input
          placeholder="Введите назначение платежа.."
          value={operation.purpose}
          onChange={(e) =>
            setOperation({ ...operation, purpose: e.target.value })
          }
          type="text"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Ок
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ArrivalForm;
