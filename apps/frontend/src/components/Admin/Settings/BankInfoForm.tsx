import React, { useEffect, useState } from 'react';
import { Department, DepartmentType } from '@prisma/client';
import { Button, Form, Input, message } from 'antd';
import { departmentAPI } from './../../../service/department';
import { rules } from '../../../../src/utils/rules';
type BankInfoFormProps = {
  bank: Department;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const BankInfoForm: React.FC<BankInfoFormProps> = ({
  bank: oldBank,
  setVisible,
}) => {
  const [update] = departmentAPI.useUpdateBankInfoMutation();
  const [bank, setBank] = useState<Department>(oldBank);
  const onFinish = () => {
    update(bank)
      .unwrap()
      .then(() => {
        setVisible(false);
        message.success('Данные обновлены');
      })
      .catch((e) => message.error(e.data.message));
  };
  const onReset = () => {
    setVisible(false);
  };
  return (
    <Form layout="vertical" onFinish={onFinish} onReset={onReset}>
      <Form.Item
        label={'Номер'}
        name={'number'}
        rules={[rules.required()]}
        initialValue={bank.number}
      >
        <Input
          type="number"
          value={bank.number}
          onChange={(e) => setBank({ ...bank, number: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label={'Город'}
        name={'city'}
        rules={[rules.required()]}
        initialValue={bank.city}
      >
        <Input
          type="text"
          value={bank.city}
          onChange={(e) => setBank({ ...bank, city: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label={'Улица'}
        name={'street'}
        rules={[rules.required()]}
        initialValue={bank.street}
      >
        <Input
          type="text"
          value={bank.street}
          onChange={(e) => setBank({ ...bank, street: e.target.value })}
        />
      </Form.Item>
      <Form.Item
        label={'Дом'}
        name={'house'}
        rules={[rules.required()]}
        initialValue={bank.house}
      >
        <Input
          type="text"
          value={bank.house}
          onChange={(e) => setBank({ ...bank, house: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Обновить
        </Button>
        <Button type="default" htmlType="reset">
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BankInfoForm;
