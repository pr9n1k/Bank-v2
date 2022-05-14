import { Button, Form, Select, message } from 'antd';
import React, { useState } from 'react';
import { rules } from '../../../utils/rules';
import { useParams } from 'react-router-dom';
import { createIndividual } from '@bank-v2/interface';
import { Currency } from '@prisma/client';
import { individualAPI } from './../../../service/individualService';
type CreateIndividualFormProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateIndividualForm: React.FC<CreateIndividualFormProps> = ({
  setVisible,
}) => {
  const [form] = Form.useForm();
  const params = useParams();
  const id = params['id'] || '';
  const [account, setAccount] = useState<createIndividual>({
    clientId: parseInt(id),
    currency: 'RUB',
  });
  const [create, { isLoading, error }] = individualAPI.useAddMutation();
  const submit = () => {
    create(account)
      .unwrap()
      .then(() => {
        form.resetFields();
        message.success('Готово');
        setVisible(false);
      })
      .catch((e) => message.error(e.data.message));
  };
  const reset = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <Form onFinish={submit} onReset={reset} form={form}>
      <Form.Item rules={[rules.required()]} name="currency">
        <Select
          placeholder="Выберите валюту"
          onChange={(e) => setAccount({ ...account, currency: e })}
        >
          <Select.Option value={Currency.RUB}>RUB</Select.Option>
          <Select.Option value={Currency.USD}>USD</Select.Option>
          <Select.Option value={Currency.UAH}>UAH</Select.Option>
          <Select.Option value={Currency.EUR}>EUR</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Создать
        </Button>
        <Button type="default" htmlType="reset" style={{ marginLeft: '15px' }}>
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateIndividualForm;
