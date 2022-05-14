import { Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React, { useContext } from 'react';
import { AuthContext } from '../context';
import { useAuth } from '../hooks/useAuth';
import { useTakeEmployee } from '../hooks/useTakeEmployee';

const Navbar = () => {
  const { isAuth } = useAuth();
  const { setIsAuth } = useContext(AuthContext);
  const { employee } = useTakeEmployee();
  if (!isAuth) {
    return null;
  }
  const onClick = () => {
    localStorage.removeItem('user');
    setIsAuth(false);
  };
  return (
    <Header className="header">
      <div>ЦРБ</div>
      <div>
        <h1 className="header__title">
          Рабочий стол {employee?.surname} {employee?.name}{' '}
          {employee?.patronymic}
        </h1>
      </div>
      <div>
        <Button className="exit__btn" onClick={onClick}>
          Выйти
        </Button>
      </div>
    </Header>
  );
};

export default Navbar;
