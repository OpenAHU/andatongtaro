import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotifyColor } from '@taroify/core/notify';

export interface NotifySlice {
  notifyshow: boolean;
  notifycolor: NotifyColor | undefined;
  notifymsg: string;
}

const initialState: NotifySlice = {
  notifyshow: false,
  notifycolor: undefined,
  notifymsg: '',
}

export const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    setNotifycolor(state, action: PayloadAction<NotifyColor>) {
      state.notifycolor = action.payload;
    },
    setNotifymsg(state, action: PayloadAction<string>) {
      state.notifymsg = action.payload;
    },
    setNotifyshowTrue(state) {
      state.notifyshow = true;
    },
    setNotifyshowFalse(state) {
      state.notifyshow = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNotifycolor, setNotifymsg, setNotifyshowFalse, setNotifyshowTrue } = notifySlice.actions

export default notifySlice.reducer
