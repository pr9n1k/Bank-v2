import { Button, Radio } from 'antd';
import React, { useState } from 'react';
import Admin from './Admin';
import Bank from './Bank';

const Settings = () => {
  const [factor, setFactor] = useState('Admin');
  const options = [
    { label: 'Личные данные', value: 'Admin' },
    { label: 'Банк', value: 'Bank' },
  ];
  return (
    <div>
      <div className="flex justify-center mb-20 border-bottom">
        <Radio.Group
          options={options}
          onChange={(e) => setFactor(e.target.value)}
          value={factor}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div>{factor === 'Admin' && <Admin />}</div>
      <div>{factor === 'Bank' && <Bank />}</div>
    </div>
  );
};

export default Settings;
