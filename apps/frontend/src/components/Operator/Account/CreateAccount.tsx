import { Select } from 'antd';
import React, { useState } from 'react';
import CreateLegalForm from './CreateLegalForm';
import CreateIndividualForm from './CreateIndividualForm';
type CreateAccountProps = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateAccount: React.FC<CreateAccountProps> = ({ setVisible }) => {
  const [variation, setVariation] = useState(0);
  return (
    <>
      <Select
        placeholder="Выберите категорию"
        onChange={(e) => setVariation(e)}
        style={{ marginBottom: '20px' }}
      >
        <Select.Option value={1}>Физ.Лицо</Select.Option>
        <Select.Option value={2}>Юр.Лицо</Select.Option>
        <Select.Option value={3}>Ком.Предприятие</Select.Option>
      </Select>
      {variation === 1 && <CreateIndividualForm setVisible={setVisible} />}
      {variation === 2 && (
        <CreateLegalForm isCommunal={false} setVisible={setVisible} />
      )}
      {variation === 3 && (
        <CreateLegalForm isCommunal={true} setVisible={setVisible} />
      )}
    </>
  );
};

export default CreateAccount;
