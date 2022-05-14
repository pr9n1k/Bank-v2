import React from 'react';
import { Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Page from '../components/page';

const Login = () => {
  const id = localStorage.getItem('user');
  if (id) {
    return <Navigate to="/main" />;
  }
  return (
    <Page>
      <div className="login__body">
        <div className="login__body-content">
          <LoginForm />
        </div>
      </div>
    </Page>
  );
};

export default Login;
