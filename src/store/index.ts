import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import accountReducer from './accountSlice';
import cookieReducer from './cookiesSlice';
import storage from './redux-persist-taro-storage/src';
import scheduleReducer from './scheduleSlice';


const reducers = combineReducers({
  cookies: cookieReducer,
  account: accountReducer,
  schedule: scheduleReducer,
})

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
