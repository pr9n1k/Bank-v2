import React, { FC, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { rules } from '../../../utils/rules';
import { useParams, useNavigate } from 'react-router-dom';
import { createLegal } from '@bank-v2/interface';
import { Currency, LegalType } from '@prisma/client';
import { legalAPI } from '../../../service/legalService';
interface CreateLegalFormType {
  isCommunal: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateLegalForm: FC<CreateLegalFormType> = ({
  isCommunal,
  setVisible,
}) => {
  const [form] = Form.useForm();
  const params = useParams();
  const navigate = useNavigate();
  const id = params['id'] || '';
  const [legal, setLegal] = useState<createLegal>({
    clientId: parseInt(id),
    currency: Currency.RUB,
    inn: 0,
    title: '',
    type: LegalType.COMPANY,
  });
  const [add, { isLoading }] = legalAPI.useAddMutation();
  const submit = async () => {
    await add(legal)
      .unwrap()
      .then(() => {
        message.success('Готово');
        form.resetFields();
        setVisible(false);
      })
      .catch((e) => message.error(e.data.message));
  };
  const reset = () => {
    form.resetFields();
    setVisible(false);
  };
  return (
    <Form onFinish={submit} onReset={reset} form={form}>
      <Form.Item name="title" rules={[rules.required()]}>
        <Input
          placeholder="Введите название организации..."
          value={legal.title as string}
          onChange={(e) => setLegal({ ...legal, title: e.target.value })}
          type="text"
        />
      </Form.Item>
      <Form.Item name="number" rules={[rules.required()]}>
        <Input
          minLength={8}
          maxLength={8}
          placeholder="Введите инн..."
          value={legal.inn}
          onChange={(e) =>
            setLegal({ ...legal, inn: parseInt(e.target.value) })
          }
          type="number"
        />
      </Form.Item>
      {isCommunal && (
        <Form.Item>
          <Select
            placeholder="Выберите тип"
            onChange={(e) => setLegal({ ...legal, type: e })}
          >
            <Select.Option key={1} value={LegalType.LIGHT}>
              Свет
            </Select.Option>
            <Select.Option key={2} value={LegalType.WATER}>
              Вода
            </Select.Option>
            <Select.Option key={3} value={LegalType.GAS}>
              Газ
            </Select.Option>
          </Select>
        </Form.Item>
      )}
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

export default CreateLegalForm;
