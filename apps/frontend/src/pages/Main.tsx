import React from 'react';
import MainButton from '../components/MainButton';
import Page from '../components/page';
// import { useTakeEmployee } from './../hooks/useTakeEmployee';

const Main = () => {
  // const {isLoading} = useTakeEmployee();
  // if(isLoading){
  //     return <h1>Загузка...</h1>
  // }
  return (
    <Page>
      <MainButton />
    </Page>
  );
};

export default Main;
