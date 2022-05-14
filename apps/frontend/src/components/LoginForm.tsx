import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { rules } from '../utils/rules';
import { authAPI } from './../service/authService';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = authAPI.useLoginMutation();
  const [thisLogin, setThisLogin] = useState('');
  const [thisPassword, setThisPassword] = useState('');
  const submit = async () => {
    await login({ login: thisLogin, password: thisPassword })
      .unwrap()
      .then(() => navigate('/main', { replace: true }))
      .catch((e) => message.error(e.data.message));
  };
  return (
    <>
      <h1>Вход</h1>
      <Form onFinish={submit}>
        <Form.Item rules={[rules.required()]}>
          <Input
            placeholder="Введите логин..."
            value={thisLogin}
            onChange={(e) => setThisLogin(e.target.value)}
            type="text"
          />
        </Form.Item>
        <Form.Item rules={[rules.required()]}>
          <Input
            placeholder="Введите пароль..."
            value={thisPassword}
            onChange={(e) => setThisPassword(e.target.value)}
            type="password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
