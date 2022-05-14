import { createCommunal, createDataCommunal } from '@bank-v2/interface';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { FC, useState } from 'react';
import { rules } from '../../../utils/rules';
import { legalAPI } from './../../../service/legalService';
import { LegalType } from '@prisma/client';
interface CommunalDataFormType {
  communal: createCommunal;
  setCommunal: React.Dispatch<React.SetStateAction<createCommunal>>;
  submit: React.Dispatch<React.SetStateAction<void>>;
}
const CommunalDataForm: FC<CommunalDataFormType> = ({
  communal,
  setCommunal,
  submit,
}) => {
  const { data: communalAccount, isLoading } = legalAPI.useGetCommunalQuery();
  const [gas, setGas] = useState<createDataCommunal>({
    communalType: LegalType.GAS,
    startData: 0,
    endData: 0,
    startCounter: 0,
    endCounter: 0,
    money: 0,
  });
  const [light, setLight] = useState<createDataCommunal>({
    communalType: LegalType.LIGHT,
    startData: 0,
    endData: 0,
    startCounter: 0,
    endCounter: 0,
    money: 0,
  });
  const [water, setWater] = useState<createDataCommunal>({
    communalType: LegalType.WATER,
    startData: 0,
    endData: 0,
    startCounter: 0,
    endCounter: 0,
    money: 0,
  });
  const onSubmit = () => {
    const arrayCommunal = [];
    if (gas.money) {
      arrayCommunal.push(gas);
    }
    if (light.money) {
      arrayCommunal.push(light);
    }
    if (water.money) {
      arrayCommunal.push(water);
    }
    setCommunal({
      ...communal,
      dataCommunal: arrayCommunal,
    });
    submit();
  };
  if (isLoading) {
    return <h1>Загрузка..</h1>;
  }
  if (communalAccount && !communalAccount.length) {
    return (
      <h2 style={{ color: 'red' }} className="h1 title">
        Создайте комунальные предприятия!
      </h2>
    );
  }
  const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new Date(e.target.value).getTime() / 1000;
    return +data;
  };
  return (
    <Form onFinish={onSubmit}>
      <h2 className="h1 title">Личные данные</h2>
      <Row>
        <Col span={2}>ФИО</Col>
        <Col span={3}>
          <Form.Item rules={[rules.required()]} name="surname">
            <Input
              placeholder="Введите фамилию"
              value={communal.surname}
              onChange={(e) =>
                setCommunal({ ...communal, surname: e.target.value })
              }
              type="text"
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item rules={[rules.required()]} name="name">
            <Input
              placeholder="Введите имя.."
              value={communal.name}
              onChange={(e) =>
                setCommunal({ ...communal, name: e.target.value })
              }
              type="text"
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item rules={[rules.required()]} name="patronymic">
            <Input
              placeholder="Введите отчество.."
              value={communal.patronymic}
              onChange={(e) =>
                setCommunal({ ...communal, patronymic: e.target.value })
              }
              type="text"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={2}>Адрес</Col>
        <Col span={3}>
          <Form.Item rules={[rules.required()]} name="city">
            <Input
              placeholder="Введите город"
              value={communal.city}
              onChange={(e) =>
                setCommunal({ ...communal, city: e.target.value })
              }
              type="text"
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item rules={[rules.required()]} name="street">
            <Input
              placeholder="Введите улица"
              value={communal.street}
              onChange={(e) =>
                setCommunal({ ...communal, street: e.target.value })
              }
              type="text"
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item rules={[rules.required()]} name="house">
            <Input
              placeholder="Введите дом"
              value={communal.house}
              onChange={(e) =>
                setCommunal({ ...communal, house: e.target.value })
              }
              type="text"
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item name="flat">
            <Input
              placeholder="Введите кв"
              value={communal.flat}
              onChange={(e) =>
                setCommunal({ ...communal, flat: e.target.value })
              }
              type="text"
            />
          </Form.Item>
        </Col>
      </Row>
      <h2 className="h1 title">Коммунальные услуги</h2>
      <Row>
        <Col className="gutter-row" span={2} style={{ textAlign: 'center' }}>
          Услуга
        </Col>
        <Col className="gutter-row" span={6}>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              Период оплаты
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: 'center' }}>
              нач
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              кон
            </Col>
          </Row>
        </Col>
        <Col className="gutter-row" span={6}>
          <Row>
            <Col span={24} style={{ textAlign: 'center' }}>
              Показания счетчика
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ textAlign: 'center' }}>
              кон
            </Col>
            <Col span={12} style={{ textAlign: 'center' }}>
              нач
            </Col>
          </Row>
        </Col>
        <Col className="gutter-row" span={3} style={{ textAlign: 'center' }}>
          Сумма
        </Col>
      </Row>
      {communalAccount?.filter((item) => item.type === LegalType.LIGHT)
        .length ? (
        <Row>
          <Col className="gutter-row" span={2}>
            Свет
          </Col>
          <Col className="gutter-row" span={6}>
            <Row>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'lightStartData'} rules={[rules.required()]}>
                  <Input
                    value={light.startData}
                    onChange={(e) =>
                      setLight({ ...light, startData: updateData(e) })
                    }
                    type="date"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'lightEndData'} rules={[rules.required()]}>
                  <Input
                    value={light.endData}
                    onChange={(e) =>
                      setLight({ ...light, endData: updateData(e) })
                    }
                    type="date"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}>
            <Row>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'lightEndCounter'} rules={[rules.required()]}>
                  <Input
                    value={light.endCounter}
                    onChange={(e) =>
                      setLight({
                        ...light,
                        endCounter: parseInt(e.target.value),
                      })
                    }
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'lightStartConter'} rules={[rules.required()]}>
                  <Input
                    value={light.startCounter}
                    onChange={(e) =>
                      setLight({
                        ...light,
                        startCounter: parseInt(e.target.value),
                      })
                    }
                    type="number"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={3}>
            <Form.Item name={'lightMoney'} rules={[rules.required()]}>
              <Input
                value={light.money}
                onChange={(e) =>
                  setLight({ ...light, money: parseFloat(e.target.value) })
                }
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>
      ) : null}
      {communalAccount?.filter((item) => item.type === LegalType.GAS).length ? (
        <Row>
          <Col className="gutter-row" span={2}>
            Газ
          </Col>
          <Col className="gutter-row" span={6}>
            <Row>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'gasStartData'} rules={[rules.required()]}>
                  <Input
                    value={gas.startData}
                    onChange={(e) =>
                      setGas({ ...gas, startData: updateData(e) })
                    }
                    type="date"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'gasEndData'} rules={[rules.required()]}>
                  <Input
                    value={gas.endData}
                    onChange={(e) => setGas({ ...gas, endData: updateData(e) })}
                    type="date"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}>
            <Row>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'gasEndCounter'} rules={[rules.required()]}>
                  <Input
                    value={gas.endCounter}
                    onChange={(e) =>
                      setGas({ ...gas, endCounter: parseInt(e.target.value) })
                    }
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'gasStartCounter'} rules={[rules.required()]}>
                  <Input
                    value={gas.startCounter}
                    onChange={(e) =>
                      setGas({ ...gas, startCounter: parseInt(e.target.value) })
                    }
                    type="number"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={3}>
            <Form.Item name={'gasMoney'} rules={[rules.required()]}>
              <Input
                value={gas.money}
                onChange={(e) =>
                  setGas({ ...gas, money: parseFloat(e.target.value) })
                }
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>
      ) : null}
      {communalAccount?.filter((item) => item.type === LegalType.WATER)
        .length ? (
        <Row>
          <Col className="gutter-row" span={2}>
            Вода
          </Col>
          <Col className="gutter-row" span={6}>
            <Row>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'waterStartData'} rules={[rules.required()]}>
                  <Input
                    value={water.startData}
                    onChange={(e) =>
                      setWater({ ...water, startData: updateData(e) })
                    }
                    type="date"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'waterEndData'} rules={[rules.required()]}>
                  <Input
                    value={water.endData}
                    onChange={(e) =>
                      setWater({ ...water, endData: updateData(e) })
                    }
                    type="date"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}>
            <Row>
              <Col className="gutter-row" span={12}>
                <Form.Item name={'waterEndCounter'} rules={[rules.required()]}>
                  <Input
                    value={water.endCounter}
                    onChange={(e) =>
                      setWater({
                        ...water,
                        endCounter: parseInt(e.target.value),
                      })
                    }
                    type="number"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name={'waterStartCounter'}
                  rules={[rules.required()]}
                >
                  <Input
                    value={water.startCounter}
                    onChange={(e) =>
                      setWater({
                        ...water,
                        startCounter: parseInt(e.target.value),
                      })
                    }
                    type="number"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={3}>
            <Form.Item name={'waterMoney'} rules={[rules.required()]}>
              <Input
                value={water.money}
                onChange={(e) =>
                  setWater({ ...water, money: parseFloat(e.target.value) })
                }
                type="number"
              />
            </Form.Item>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Готово
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CommunalDataForm;
