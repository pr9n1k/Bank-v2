import { Radio } from 'antd';
import React, { useState } from 'react';
// import Arrival from './Arrival';
// import Expense from './Expense';
import { Legal, Individual } from '@prisma/client';
import AccountFilter from '../Account/AccountFilter';
import Arrival from './Arrival';
import Expense from './Expense';

const Operation = () => {
  const [factor, setFactor] = useState(true);
  const [account, setAccount] = useState<Legal | Individual>();

  const options = [
    { label: 'Приход', value: true },
    { label: 'Расход', value: false },
  ];

  return (
    <>
      <div>
        <Radio.Group
          options={options}
          onChange={(e) => setFactor(e.target.value)}
          value={factor}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div>
        <AccountFilter setAccount={setAccount} />
      </div>
      <div>
        {factor && account ? <Arrival account={account} /> : null}
        {!factor && account ? <Expense account={account} /> : null}
      </div>
    </>
  );
};

export default Operation;
