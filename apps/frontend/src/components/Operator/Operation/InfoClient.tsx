import { Client, Legal, Individual } from '@prisma/client';
import { Button } from 'antd';
import React, { FC } from 'react';
interface InfoClientType {
  client: Client;
  cb: (name: string, surname: string, inn: string, patronymic: string) => void;
  money: number;
}
const InfoClient: FC<InfoClientType> = ({ client, cb, money }) => {
  const pasport = `${client.series}${client.number}`;
  const onClick = () => {
    cb(client.name, client.surname, client.inn, client.patronymic || '');
  };
  const adress = client.flat
    ? `г.${client.city}, ул.${client.street}, д.${client.house}, кв.${client.flat}`
    : `г.${client.city}, ул.${client.street}, д.${client.house}`;
  return (
    <div className="info__client">
      <p>
        ФИО: {client.name} {client.patronymic} {client.surname}
      </p>
      <p>Паспорт: {pasport}</p>
      <p>ИНН: {client.inn}</p>
      <p>Адрес: {adress}</p>
      <p>Сумма: {money}</p>
      <Button type="default" onClick={onClick}>
        Ок
      </Button>
    </div>
  );
};

export default InfoClient;
