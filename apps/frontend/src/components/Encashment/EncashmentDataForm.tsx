import React, { useState } from 'react';
import { createEncashment, createEncashmentValue } from '@bank-v2/interface';
import { Currency, TypeEncashment } from '@prisma/client';
import { Button, Form, Input, Select } from 'antd';
import { rules } from './../../utils/rules';
type EncashmentDataFormType = {
  encashment: createEncashment;
  setEncashment: React.Dispatch<React.SetStateAction<createEncashment>>;
  submit: React.Dispatch<React.SetStateAction<void>>;
};
const EncashmentDataForm: React.FC<EncashmentDataFormType> = ({
  encashment,
  setEncashment,
  submit,
}) => {
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
    setEncashment({
      ...encashment,
      encashmentValue: [uah, usd, eur, rub],
    });
    submit();
  };
  return (
    <Form onFinish={onSubmit} layout="vertical">
      <Form.Item label="Тип" name="type" rules={[rules.required()]}>
        <Select
          placeholder="Выберите тип"
          onChange={(e) => setEncashment({ ...encashment, type: e })}
        >
          <Select.Option key={1} value={TypeEncashment.ENCASHMENT}>
            Инкассация
          </Select.Option>
          <Select.Option key={2} value={TypeEncashment.REINFORCEMENT}>
            Подкрепление
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
      </Form.Item>
    </Form>
  );
};

export default EncashmentDataForm;
