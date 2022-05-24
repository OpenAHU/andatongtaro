import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CookiesSlice {
  cookies: string,
  needlogin: boolean,
}

const initialState: CookiesSlice = {
  cookies: '',
  needlogin: true,
}

export const cookiesSlice = createSlice({
  name: 'cookies',
  initialState,
  reducers: {
    setNeedLoginTrue: (state) => {
      state.needlogin = true;
    },
    setCookies: (state, action: PayloadAction<string>) => {
      state.cookies = action.payload
      state.needlogin = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNeedLoginTrue, setCookies } = cookiesSlice.actions

export default cookiesSlice.reducer
