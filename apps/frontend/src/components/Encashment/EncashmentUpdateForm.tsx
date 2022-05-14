import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { ValueEncashment, Currency } from '@prisma/client';
import { rules } from '../../utils/rules';
import { encashmentAPI } from '../../service/encashmentService';
type EncashmentUpdateFormProps = {
  value: ValueEncashment[];
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const EncashmentUpdateForm: React.FC<EncashmentUpdateFormProps> = ({
  value: oldValue,
  setVisible,
}) => {
  const [uah, setUah] = useState<ValueEncashment>();
  const [usd, setUsd] = useState<ValueEncashment>();
  const [eur, setEur] = useState<ValueEncashment>();
  const [rub, setRub] = useState<ValueEncashment>();
  const [update] = encashmentAPI.useUpdateMutation();
  useEffect(() => {
    oldValue.map((item) => {
      if (item.currency === Currency.RUB) {
        setRub(item);
      }
      if (item.currency === Currency.USD) {
        setUsd(item);
      }
      if (item.currency === Currency.EUR) {
        setEur(item);
      }
      if (item.currency === Currency.UAH) {
        setUah(item);
      }
    });
  }, [oldValue]);

  const onSubmit = () => {
    if (uah && eur && usd && rub) {
      update({ value: [uah, usd, rub, eur] })
        .unwrap()
        .then(() => {
          message.success('обновлен');
          setVisible(false);
          console.log(uah, usd, rub, eur);
        })
        .catch((e) => message.error(e.data.message));
    }
  };
  if (!usd && !eur && !rub && !uah) {
    <h2>Загрузка..</h2>;
  }
  const reset = () => setVisible(false);
  return (
    <Form onFinish={onSubmit} layout="vertical" onReset={reset}>
      <Form.Item name="RUB" label="RUB" rules={[rules.required()]}>
        <Input
          placeholder="Введите сумму"
          type="number"
          value={rub?.money}
          onChange={(e) =>
            setRub({ ...rub!, money: parseFloat(e.target.value) })
          }
        />
      </Form.Item>
      <Form.Item label="USD" name="USD" rules={[rules.required()]}>
        <Input
          placeholder="Введите сумму"
          type="number"
          value={usd?.money}
          onChange={(e) =>
            setUsd({ ...usd!, money: parseFloat(e.target.value) })
          }
        />
      </Form.Item>
      <Form.Item label="EUR" name="EUR" rules={[rules.required()]}>
        <Input
          placeholder="Введите сумму"
          type="number"
          value={eur?.money}
          onChange={(e) =>
            setEur({ ...eur!, money: parseFloat(e.target.value) })
          }
        />
      </Form.Item>
      <Form.Item label="UAH" name="UAH" rules={[rules.required()]}>
        <Input
          placeholder="Введите сумму"
          type="number"
          value={uah?.money}
          onChange={(e) =>
            setUah({ ...uah!, money: parseFloat(e.target.value) })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Готово
        </Button>
        <Button type="default" htmlType="reset">
          Отмена
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EncashmentUpdateForm;
