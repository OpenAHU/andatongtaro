import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AccountSlice {
  logintype: number,
  username: string,
  password: string,
}

const initialState: AccountSlice = {
  logintype: 2,
  username: '',
  password: '',
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setLoginType: (state, action: PayloadAction<number>) => {
      state.logintype = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  },
})

export const { setLoginType, setUsername, setPassword } = accountSlice.actions

export default accountSlice.reducer
