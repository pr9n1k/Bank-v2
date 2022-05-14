import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Finish = () => {
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="h1 title">Готово</h1>
      <p>Вы успешно завершили настройку Банка!</p>
      <Button className="mx-auto" onClick={onClick}>
        Начать работу
      </Button>
    </div>
  );
};

export default Finish;
