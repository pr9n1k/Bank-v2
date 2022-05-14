import React from 'react';
import { createEncashment } from '@bank-v2/interface';
import { formateDate } from '../../utils/formateDate';
import { Button, message } from 'antd';
import { encashmentAPI } from '../../service/encashmentService';
interface EncahsmentFinishType {
  encashment: createEncashment;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const EncahsmentFinish: React.FC<EncahsmentFinishType> = ({
  encashment,
  setVisible,
}) => {
  const [add] = encashmentAPI.useCreateMutation();
  const submit = () => {
    add(encashment)
      .unwrap()
      .then(() => {
        message.success('Запрос отправлен');
        setVisible(false);
      })
      .catch((e) => {
        message.error(e.data.message);
      });
  };
  const reset = () => {
    setVisible(false);
  };
  return (
    <div>
      <h1>Итого:</h1>
      <p>Дата: {formateDate(new Date())}</p>
      <p>Банк: ЦРБ ДНР</p>
      {encashment.encashmentValue.map((item) => {
        return (
          <p>
            {item.currency}: {item.money}
          </p>
        );
      })}
      <Button onClick={submit}>Подтвердить</Button>
      <Button onClick={reset}>Отмена</Button>
    </div>
  );
};

export default EncahsmentFinish;
