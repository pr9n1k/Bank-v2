import React from 'react';
import DepartmentCreateForm from '../components/Admin/Department/DepartmentCreateForm';
import CreateAdmin from '../components/Start/CreateAdmin';
import Finish from '../components/Start/Finish';
import Main from './../components/Start/Main';

const Start = () => {
  const [step, setStep] = React.useState(1);

  return (
    <div>
      {step === 1 && <Main setStep={setStep} />}
      {step === 2 && <DepartmentCreateForm setStep={setStep} />}
      {step === 3 && <CreateAdmin setStep={setStep} />}
      {step === 4 && <Finish />}
    </div>
  );
};

export default Start;
