import { Button, message, Popconfirm } from 'antd';
import React, { useEffect } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { clientAPI } from '../../../service/clientService';
// import AccountTable from '../Account/AccountTable';
import { useDate } from './../../../hooks/useDate';
import CreateAccount from './../Account/CreateAccount';
import { individualAPI } from './../../../service/individualService';
import { legalAPI } from './../../../service/legalService';
import AccountTable from '../Account/AccountTable';
import { formateDate } from './../../../utils/formateDate';

const Client = () => {
  const params = useParams();
  const navigate = useNavigate();
  const id = params['id'] || '';
  const [visible, setVisible] = React.useState<boolean>(false);
  const [remove] = clientAPI.useDeleteMutation();
  const {
    data: client,
    error,
    isLoading,
  } = clientAPI.useGetByIdQuery(parseInt(id));
  const onClick = () => setVisible(true);
  const { data: individual } = individualAPI.useGetByClientQuery(parseInt(id));
  const { data: legal } = legalAPI.useGetByIdClientQuery(parseInt(id));
  const flat = client?.flat ? `, кв.${client?.flat}` : '';
  const onConfirm = () => {
    remove(id)
      .unwrap()
      .then(() => {
        message.success('Клиент удален');
        navigate('/operator/client');
      })
      .catch((e) => message.error(e.data.message));
  };
  return (
    <>
      <div>
        <h1>
          {client?.surname} {client?.name} {client?.patronymic}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p>Дата рождения: {formateDate(client?.birthDay || 0)}</p>
            <p>ИНН: {client?.inn}</p>
            <p>
              Паспорт: {client?.series} {client?.number}
            </p>
            <p>Выдан: {formateDate(client?.isSuedDate || 0)}</p>
            <p>
              Адрес: г.{client?.city}, ул.{client?.street}, д.{client?.house}{' '}
              {flat}
            </p>
          </div>
          {individual || legal ? (
            <AccountTable individual={individual} legal={legal} />
          ) : null}
        </div>

        <Popconfirm title="Удалить?" onConfirm={onConfirm}>
          <Button>Удалить</Button>
        </Popconfirm>
        {!visible && <Button onClick={onClick}>Завести счет</Button>}
      </div>
      <div>{visible && <CreateAccount setVisible={setVisible} />}</div>
    </>
  );
};

export default Client;
