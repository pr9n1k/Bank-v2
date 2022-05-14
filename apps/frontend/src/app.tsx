import React, { useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';
import { useNavigate } from 'react-router-dom';
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const user = localStorage.getItem('user');

  const navigate = useNavigate();
  useEffect(() => {
    if (user === '') {
      navigate('/start');
    } else if (user) {
      setIsAuth(true);
    } else {
      navigate('/login');
    }
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
      }}
    >
      <AppRouter />
    </AuthContext.Provider>
  );
}
export default App;
