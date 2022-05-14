import {
  createEncashmentValue,
  updateTypeAccountBank,
} from '@bank-v2/interface';
import { Currency, TypeEncashment } from '@prisma/client';
import { Form, Select, Input, Button, message } from 'antd';
import { rules } from '../../../../src/utils/rules';
import React, { useState } from 'react';
import { accountAPI } from './../../../service/accountDepartment';
import { useNavigate } from 'react-router-dom';
type BankAccountFormProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const BankAccountForm: React.FC<BankAccountFormProps> = ({ setVisible }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [update] = accountAPI.useUpdateBankMutation();
  const [type, setType] = useState<updateTypeAccountBank>(
    updateTypeAccountBank.ADD
  );
  const [uah, setUah] = useState<createEncashmentValue>({
    currency: Currency.UAH,
    money: 0,
  });
  const [usd, setUsd] = useState<createEncashmentValue>({
    currency: Currency.USD,
    money: 0,
  });
  const [eur, setEur] = useState<createEncashmentValue>({
    currency: Currency.EUR,
    money: 0,
  });
  const [rub, setRub] = useState<createEncashmentValue>({
    currency: Currency.RUB,
    money: 0,
  });
  const onSubmit = () => {
    update({
      type,
      value: [usd, uah, eur, rub],
    })
      .unwrap()
      .then(() => {
        message.success('Операция выполнена');
        setVisible(false);
        form.resetFields();
        navigate('/admin/settings');
      })
      .catch((e) => {
        message.error(e.data.message);
        setVisible(false);
        form.resetFields();
      });
  };
  const onReset = () => {
    setVisible(false);
    form.resetFields();
  };
  return (
    <Form onFinish={onSubmit} layout="vertical" onReset={onReset} form={form}>
      <Form.Item
        label="Тип"
        name="type"
        rules={[rules.required()]}
        initialValue={type}
      >
        <Select placeholder="Выберите тип" onChange={(e) => setType(e)}>
          <Select.Option key={1} value={updateTypeAccountBank.ADD}>
            Положить
          </Select.Option>
          <Select.Option key={2} value={updateTypeAccountBank.GET}>
            Снять
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="RUB" label="RUB" rules={[rules.required()]}>
        <Input
          placeholder="Введите сумму"
          type="number"
          value={rub.money}
          onChange={(e) =>
            setRub({ ...rub, money: parseFloat(e.target.value) })
          }
        />
      </Form.Item>
      <Form.Item label="USD" name="USD" rules={[rules.required()]}>
        <Input
          placeholder="Введите сумму"
          type="number"
          value={usd.money}
          onChange={(e) =>
            setUsd({ ...usd, money: parseFloat(e.target.value) })
          }
        />
      </Form.Item>
      <Form.Item label="EUR" name="EUR" rules={[rules.required()]}>
        <Input
          placeholder="Введите сумму"
          type="number"
          value={eur.money}
          onChange={(e) =>
            setEur({ ...eur, money: parseFloat(e.target.value) })
          }
        />
      </Form.Item>
      <Form.Item label="UAH" name="UAH" rules={[rules.required()]}>
        <Input
          placeholder="Введите сумму"
          type="number"
          value={uah.money}
          onChange={(e) =>
            setUah({ ...uah, money: parseFloat(e.target.value) })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Готово
        </Button>
        <Button type="default" htmlType="reset">
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BankAccountForm;
