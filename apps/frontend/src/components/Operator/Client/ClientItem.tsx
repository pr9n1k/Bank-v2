import { Client } from '@prisma/client';
import { Card } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { formateDate } from './../../../utils/formateDate';
interface ClientItemType {
  client: Client;
}
const ClientItem: FC<ClientItemType> = ({ client }) => {
  return (
    <Card title={`${client.surname} ${client.name} ${client.patronymic}`}>
      <h2>Информация:</h2>
      <p>Дата рождения: {formateDate(client.birthDay)}</p>
      <p>Телефон: {client.phone}</p>
      <p>ИНН: {client.inn}</p>
      <Link to={`${client?.id}`}>Открыть</Link>
    </Card>
  );
};

export default ClientItem;
