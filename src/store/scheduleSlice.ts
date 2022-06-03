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
  startDate: string,
  semester: Array<Array<{ month: string, day: string }>>,
  currentweeknumber: number,
  theme: number,
}

const initialState: ScheduleSlice = {
  data: [],
  startDate: '2022-2-21',
  semester: [],
  currentweeknumber: 0,
  theme: 0,
}

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setSchedule: (state, action: PayloadAction<Array<ScheduleItem>>) => {
      state.data = action.payload
    },
    setSemester: (state, action: PayloadAction<Array<Array<{ month: string, day: string }>>>) => {
      state.semester = action.payload
    },
    setCurrentweeknumber: (state, action: PayloadAction<number>) => {
      state.currentweeknumber = action.payload
    },
    changeTheme: (state) => {
      state.theme = (state.theme) % 7 + 1
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSchedule, setSemester, setCurrentweeknumber, changeTheme } = scheduleSlice.actions

export default scheduleSlice.reducer
