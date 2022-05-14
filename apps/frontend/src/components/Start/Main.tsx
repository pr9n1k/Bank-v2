import { Button, Row } from 'antd';
import React from 'react';
type MainProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
const Main: React.FC<React.PropsWithChildren<MainProps>> = ({ setStep }) => {
  return (
    <Row className="h-screen flex items-center justify-center flex-col">
      <h1 className="h1 title">Добро пожаловать!</h1>
      <p>
        Для работы программы Вам необходимо создать главное отделение Банка и
        администратора
      </p>
      <Button className="mx-auto" onClick={() => setStep(2)}>
        Начать
      </Button>
    </Row>
  );
};

export default Main;
