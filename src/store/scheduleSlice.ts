import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScheduleItem {
  weekday: string,
  startWeek: string,
  endWeek: string,
  location: string,
  name: string,
  teacher: string,
  length: string,
  startTime: string,
  singleDouble: string,
  courseId: string,
  extra: string,
  endTime: string,
  showArray: Array<number>,
  singleDoubleText: string,
  colorArray: Array<string>,
  fullName: string,
  colorIndex: string,
}

export interface ScheduleSlice {
  data: Array<ScheduleItem>,
}

const initialState: ScheduleSlice = {
  data: [],
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSchedule: (state, action: PayloadAction<Array<ScheduleItem>>) => {
      state.data = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSchedule } = scheduleSlice.actions

export default scheduleSlice.reducer
