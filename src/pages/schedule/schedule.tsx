import { Toast } from '@taroify/core';
import { Swiper, SwiperItem, View } from '@tarojs/components';
import { request, useDidShow } from '@tarojs/taro';
import { useBoolean, useRequest } from 'ahooks';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import apis from '../../apis.json';
import { setCurrentweeknumber, setSchedule, setSemester } from '../../store/scheduleSlice';
import classInfoRefine from './classInfoRefine';
import './schedule.scss';
import weekdayattop from './weekdayattop';
import weeknumber from './weeknumber';

export default function Index() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(1);
  const cookies = useSelector((state: RootState) => state.cookies)
  const scheduleData = useSelector((state: RootState) => state.schedule.data)

  const startDate = useSelector((state: RootState) => state.schedule.startDate)
  const semester = useSelector((state: RootState) => state.schedule.semester)
  if (semester.length === 0) {
    dispatch(setSemester(weekdayattop(startDate)))
  }

  const [weekshow, { setTrue, setFalse }] = useBoolean(true)
  const currentweeknumber = useSelector((state: RootState) => state.schedule.currentweeknumber)
  useDidShow(() => {
    dispatch(setCurrentweeknumber(weeknumber(startDate)))
    setTrue()
  })

  const schedule = () => request({
    method: 'GET',
    url: apis.schedule,
    data: {
      schoolYear: '2021-2022',
      schoolTerm: '1'
    },
    header: {
      Cookie: cookies.cookies,
    }
  })
    .then(res => res?.data?.data)
    .then(res => classInfoRefine(res))
  const { loading } = useRequest(schedule,
    {
      ready: cookies.cookies !== '' && scheduleData.length === 0,
      retryCount: 2,
      onSuccess: (res) => {
        dispatch(setSchedule(res))
      }
    });


  return (
    <>
      <Toast
        open={weekshow}
        duration={1000}
        className='!px-0'
        onClose={() => setFalse()}
      >
        第 {currentweeknumber + 1} 周
      </Toast>
      <Swiper
        current={currentweeknumber}
        circular
        indicatorDots
        onChange={(e) => {
          dispatch(setCurrentweeknumber(e.detail.current))
          setTrue()
        }}
        className='h-screen'
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((week, weekindex) => <SwiperItem
          key={weekindex}
        >
          {loading && 'loading'}
          {!loading && scheduleData &&
            <View className='container'>
              {/* 每一天 */}
              {['', '一', '二', '三', '四', '五', '六', '日'].map((day, dayindex) => <View
                key={dayindex}
                className='row-span-1'
                style={`grid-column:${dayindex + 1}`}
              >
                {/* 上栏 */}
                <View className='top'>
                  <View className='top--weekday'>{(dayindex ? "周" : "") + day}</View>
                  <View className='top--date'>
                    {semester[weekindex][dayindex].month}{(dayindex ? "-" : "")}{semester[weekindex][dayindex].day}
                  </View>
                </View>
              </View>)}
              {/* 左栏 */}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i, index) => <View
                key={index}
                className='col-span-1'
                style={`grid-row:${i + 1}`}
              >
                <View className='left'>
                  <View className='left--index'>{i}</View>
                  <View className='left--time'>
                    {["08:20", "09:15", "10:20", "11:15", "14:00", "14:55", "15:50", "16:45", "19:00", "19:55", "20:50"][index]}
                  </View>
                </View>
              </View>)}
              {/* 课程 */}
              {scheduleData.map((item, index) => item.showArray[week] === 1 && <View
                key={index}
                className={`course--${item.colorArray[week]} course--color--${theme}-${item.colorIndex}`}
                style={`grid-column:${item.weekday};grid-row-start: ${item.startTime};grid-row-end:${item.endTime}`}
              >
                <View className='course--name'>{item.name}</View>
                <View className='course--location'>{item.location}</View>
              </View>)}
            </View>
          }
        </SwiperItem>)}
      </Swiper>
    </>
  );
}
