import React, { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { rules } from '../../../utils/rules';
import { createOperation } from '@bank-v2/interface';
interface ExpenseFormType {
  operation: createOperation;
  setOperation: React.Dispatch<React.SetStateAction<createOperation>>;
  submit: () => void;
  reset: () => void;
}
const ExpenseForm: FC<ExpenseFormType> = ({
  setOperation,
  submit,
  operation,
  reset,
}) => {
  return (
    <Form onFinish={submit} onReset={reset} layout="vertical">
      <Form.Item label="Валюта">
        <Input
          placeholder={operation.currency}
          value={operation.currency}
          disabled={true}
        />
      </Form.Item>
      <Form.Item label="Сумма" name="money" rules={[rules.required()]}>
        <Input
          placeholder="__.__"
          value={operation.money}
          onChange={(e) =>
            setOperation({ ...operation, money: parseFloat(e.target.value) })
          }
          type="number"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
        <Button style={{ marginLeft: '15px' }} type="default" htmlType="reset">
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExpenseForm;
