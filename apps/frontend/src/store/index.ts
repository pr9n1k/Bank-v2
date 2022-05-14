import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authAPI } from '../service/authService';
import { employeeAPI } from '../service/employeeService';
import { departmentAPI } from './../service/department';
import { accountAPI } from './../service/accountDepartment';
import { clientAPI } from './../service/clientService';
import { individualAPI } from './../service/individualService';
import { legalAPI } from './../service/legalService';
import { communalAPI } from './../service/communalService';
import { operationAPI } from '../service/operationServise';
import { encashmentAPI } from '../service/encashmentService';

const rootReducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  [encashmentAPI.reducerPath]: encashmentAPI.reducer,
  [departmentAPI.reducerPath]: departmentAPI.reducer,
  [employeeAPI.reducerPath]: employeeAPI.reducer,
  [accountAPI.reducerPath]: accountAPI.reducer,
  [clientAPI.reducerPath]: clientAPI.reducer,
  [individualAPI.reducerPath]: individualAPI.reducer,
  [legalAPI.reducerPath]: legalAPI.reducer,
  [communalAPI.reducerPath]: communalAPI.reducer,
  [operationAPI.reducerPath]: operationAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authAPI.middleware,
        departmentAPI.middleware,
        employeeAPI.middleware,
        clientAPI.middleware,
        accountAPI.middleware,
        legalAPI.middleware,
        individualAPI.middleware,
        communalAPI.middleware,
        operationAPI.middleware,
        encashmentAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
