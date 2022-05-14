import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import Print from './Print';
import { createCommunal } from '@bank-v2/interface';
import CommunalDataForm from './CommunalData';

const Communal = () => {
  const idEmployee = localStorage.getItem('user') || '';
  const [communal, setCommunal] = useState<createCommunal>({
    employeeId: parseInt(idEmployee),
    city: '',
    house: '',
    street: '',
    flat: '',
    name: '',
    patronymic: '',
    surname: '',
    dataCommunal: [],
  });
  const [visible, setVisible] = useState(false);

  const submit = () => {
    setVisible(true);
  };
  return (
    <>
      <h1 className="h1 title">Коммунальные услуги</h1>
      {!visible && (
        <CommunalDataForm
          communal={communal}
          setCommunal={setCommunal}
          submit={submit}
        />
      )}

      {visible && <Print communal={communal} setVisible={setVisible} />}
    </>
  );
};

export default Communal;
