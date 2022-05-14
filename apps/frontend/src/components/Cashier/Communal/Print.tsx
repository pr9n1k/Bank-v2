import { Button, message, Table } from 'antd';
import Column from 'antd/lib/table/Column';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import React, { FC } from 'react';
import { employeeAPI } from './../../../service/employeeService';
import { createCommunal } from '@bank-v2/interface';
import { departmentAPI } from './../../../service/department';
import { updateCommunalType } from './../../../utils/updateCommunalType';
import { communalAPI } from './../../../service/communalService';
import { formateDate } from './../../../utils/formateDate';
interface PrintType {
  communal: createCommunal;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
type dataType = {
  key: number;
  title: string;
  startDate: string | undefined;
  endDate: string | undefined;
  endCounter: number | undefined;
  startCounter: number | undefined;
  money: number;
};
const Print: FC<PrintType> = ({ communal, setVisible }) => {
  const { data: employee, isLoading } = employeeAPI.useGetByIdQuery(
    communal.employeeId.toString()
  );
  const { data: department } = departmentAPI.useGetByIdEmployeeQuery(
    communal.employeeId
  );
  // const [addCommunal] = operationAPI.useAddCommunalMutation();
  const [add] = communalAPI.useAddMutation();
  let summa = 0;
  communal.dataCommunal.forEach((item) => {
    summa += item.money;
  });

  const adress = communal.flat
    ? `г. ${communal.city}, ул. ${communal.street}, д. ${communal.house}, кв. ${communal.flat}`
    : `г. ${communal.city}, ул. ${communal.street}, д. ${communal.house}`;
  const data: dataType[] = [];
  communal.dataCommunal.forEach((item, i) => {
    const title = updateCommunalType(item.communalType);
    data.push({
      key: i,
      title,
      startDate: formateDate(item.startData),
      endDate: formateDate(item.endData),
      endCounter: item.endCounter,
      startCounter: item.startCounter,
      money: item.money,
    });
  });
  const submit = () => {
    add(communal)
      .unwrap()
      .then(() => {
        message.success('Готово');
        setVisible(false);
      })
      .catch((e) => message.error(e.data.message));
    console.log(communal);
  };
  return (
    <>
      <h2 className="h1 title">Печать</h2>
      <p>Дата: {formateDate(new Date())}</p>
      <p>Банк: ЦРБ ДНР</p>
      <p>
        Отделение №{department?.number} г.{department?.city}
      </p>
      <p>
        Кассир: {employee?.surname} {employee?.name?.substring(0, 1)}.{' '}
        {employee?.patronymic?.substring(0, 1)}.
      </p>
      <p>Адрес: {adress}</p>
      <Table dataSource={data} pagination={false}>
        <Column title="Услуга" dataIndex="title" key="title" />
        <ColumnGroup title="Период оплаты">
          <Column title="начало" dataIndex="startDate" key="startDate" />
          <Column title="конец" dataIndex="endDate" key="endDate" />
        </ColumnGroup>
        <ColumnGroup title="Показания счетчиков">
          <Column title="конец" dataIndex="endCounter" key="endCounter" />
          <Column title="началл" dataIndex="startCounter" key="startCounter" />
        </ColumnGroup>
        <Column title="Сумма" dataIndex="money" key="money" />
      </Table>
      <p>Итого: {summa} руб</p>
      <Button type="primary" onClick={submit} className="w-max-content">
        Печать
      </Button>
    </>
  );
};

export default Print;
