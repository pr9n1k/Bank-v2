import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
} from 'antd';
import React, { FC } from 'react';
import { useState } from 'react';
import { rules } from '../../../utils/rules';
import { clientAPI } from '../../../service/clientService';
import { createClient } from '@bank-v2/interface';
import { Sex } from '@prisma/client';
const initialClient = {
  birthDay: 0,
  city: '',
  house: '',
  inn: '',
  isSued: '',
  isSuedDate: 0,
  name: '',
  number: '',
  phone: '',
  series: '',
  sex: Sex.MEN,
  street: '',
  surname: '',
};
const CreateClientForm = () => {
  const [form] = Form.useForm();
  const [add, { isLoading }] = clientAPI.useAddMutation();
  const [client, setClient] = useState<createClient>(initialClient);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new Date(e.target.value).getTime() / 1000;
    return +data;
  };

  const submit = async () => {
    await add(client)
      .unwrap()
      .then(() => {
        form.resetFields();
        message.success('Клиент создан!');
      })
      .catch((error) => message.error(error.data.message));
  };
  return (
    <Form onFinish={submit} layout="vertical" form={form}>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={12}>
          <Form.Item
            rules={[rules.required()]}
            name="surname"
            label="Личная информация"
          >
            <Input
              placeholder="Введите фамилию.."
              value={client.surname}
              onChange={(e) =>
                setClient({ ...client, surname: e.target.value })
              }
              type="text"
            />
          </Form.Item>
          <Form.Item name="name" rules={[rules.required()]}>
            <Input
              placeholder="Введите имя.."
              value={client.name}
              onChange={(e) => setClient({ ...client, name: e.target.value })}
              type="text"
            />
          </Form.Item>
          <Form.Item rules={[rules.required()]} name="patronymic">
            <Input
              placeholder="Введите отчество.."
              value={client.patronymic}
              onChange={(e) =>
                setClient({ ...client, patronymic: e.target.value })
              }
              type="text"
            />
          </Form.Item>
          <Form.Item rules={[rules.required()]} name="sex">
            <Select
              placeholder="Выберите пол"
              onChange={(e) => setClient({ ...client, sex: e })}
            >
              <Select.Option value={Sex.MEN}>М</Select.Option>
              <Select.Option value={Sex.WOOMEN}>Ж</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item rules={[rules.required()]} name="phone">
            <Input
              placeholder="Введите номер телефона.."
              value={client.phone}
              onChange={(e) => setClient({ ...client, phone: e.target.value })}
              minLength={10}
              maxLength={10}
              type="number"
            />
          </Form.Item>
          <Form.Item rules={[rules.required()]} name="birthday">
            {/* <DatePicker onChange={onChange} /> */}
            <Input
              placeholder="Введите дату рождения.."
              value={client.birthDay}
              onChange={(e) => setClient({ ...client, birthDay: onChange(e) })}
              type="date"
            />
          </Form.Item>
          <Form.Item rules={[rules.required()]} name="inn">
            <Input
              placeholder="Введите инн.."
              value={client.inn}
              onChange={(e) => setClient({ ...client, inn: e.target.value })}
              minLength={10}
              maxLength={10}
              type="number"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
          <Form.Item rules={[rules.required()]} label="Адрес" name="city">
            <Input
              placeholder="Введите город.."
              value={client.city}
              onChange={(e) => setClient({ ...client, city: e.target.value })}
              type="text"
            />
          </Form.Item>
          <Form.Item rules={[rules.required()]} name="street">
            <Input
              placeholder="Введите улицу.."
              value={client.street}
              onChange={(e) => setClient({ ...client, street: e.target.value })}
              type="text"
            />
          </Form.Item>
          <Form.Item rules={[rules.required()]} name="house">
            <Input
              placeholder="Введите дом.."
              value={client.house}
              onChange={(e) => setClient({ ...client, house: e.target.value })}
              type="text"
            />
          </Form.Item>
          <Form.Item name="flat">
            <Input
              placeholder="Введите кв.."
              value={client.flat}
              onChange={(e) => setClient({ ...client, flat: e.target.value })}
              type="text"
            />
          </Form.Item>
          <Form.Item
            rules={[rules.required()]}
            label="Данные паспорта"
            name="series"
          >
            <Input
              placeholder="Введите серию паспорта.."
              value={client.series}
              onChange={(e) => setClient({ ...client, series: e.target.value })}
              type="text"
            />
          </Form.Item>
          <Form.Item rules={[rules.required()]} name="number">
            <Input
              placeholder="Введите номер паспорта.."
              value={client.number}
              onChange={(e) => setClient({ ...client, number: e.target.value })}
              type="text"
            />
          </Form.Item>
          <Form.Item rules={[rules.required()]} name="issued">
            <Input
              placeholder="Кем выдан.."
              value={client.isSued}
              onChange={(e) => setClient({ ...client, isSued: e.target.value })}
              type="text"
            />
          </Form.Item>
          <Form.Item rules={[rules.required()]} name="issuedDate">
            <Input
              placeholder="Дата выдачи.."
              value={client.isSuedDate}
              onChange={(e) =>
                setClient({ ...client, isSuedDate: onChange(e) })
              }
              type="date"
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateClientForm;
