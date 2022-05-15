import { Button, Col, Form, Input, Row, message } from 'antd';
import React, { useState } from 'react';
import { rules } from '../../../utils/rules';
import { departmentAPI } from '../../../service/department';
import { createDepartment } from '@bank-v2/interface';
type DepartmentCreateFormProps = {
  setStep?: React.Dispatch<React.SetStateAction<number>>;
};
const DepartmentCreateForm: React.FC<DepartmentCreateFormProps> = ({
  setStep,
}) => {
  const [department, setDepartment] = useState<createDepartment>({
    city: '',
    house: '',
    number: '',
    street: '',
  });
  const [add, { isLoading }] = departmentAPI.useAddMutation();
  const [form] = Form.useForm();
  const submit = async () => {
    await add(department)
      .unwrap()
      .then(() => {
        message.success('Отдел создан');
        form.resetFields();
        if (setStep) {
          setStep(3);
        }
      })
      .catch((e) => message.error(e.data.message));
  };
  const reset = () => {
    form.resetFields();
    if (setStep) {
      setStep(1);
    }
  };
  return (
    <>
      <h1 className="h1 title">Создание отдела</h1>
      <Row>
        <Col span={12} offset={6}>
          <Form form={form} onFinish={submit} onReset={reset}>
            <Form.Item name="number" rules={[rules.required()]}>
              <Input
                minLength={7}
                maxLength={7}
                placeholder="Введите номер отдела..."
                value={department.number}
                onChange={(e) =>
                  setDepartment({ ...department, number: e.target.value })
                }
                type="number"
              />
            </Form.Item>
            <Form.Item name="city" rules={[rules.required()]}>
              <Input
                placeholder="Введите город..."
                value={department.city}
                onChange={(e) =>
                  setDepartment({ ...department, city: e.target.value })
                }
                type="text"
              />
            </Form.Item>
            <Form.Item name="street" rules={[rules.required()]}>
              <Input
                placeholder="Введите улицу..."
                value={department.street}
                onChange={(e) =>
                  setDepartment({ ...department, street: e.target.value })
                }
                type="text"
              />
            </Form.Item>
            <Form.Item name="house" rules={[rules.required()]}>
              <Input
                placeholder="Введите дом..."
                value={department.house}
                onChange={(e) =>
                  setDepartment({ ...department, house: e.target.value })
                }
                type="text"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Создать
              </Button>
              <Button
                style={{ marginLeft: '15px' }}
                type="default"
                htmlType="reset"
                loading={isLoading}
              >
                Отмена
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default DepartmentCreateForm;
