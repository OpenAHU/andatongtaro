import { Notify, Popup, Toast } from '@taroify/core';
import { Image, Swiper, SwiperItem, View } from '@tarojs/components';
import Taro, { request, useDidHide, useDidShow } from '@tarojs/taro';
import { useBoolean, useRequest } from 'ahooks';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import apis from '../../apis.json';
import rabbit from '../../assets/rabbitGrey.png';
import { setNotifyshowFalse } from '../../store/notifySlice';
import { changeTheme, setCurrentweeknumber, setSchedule, setSemester } from '../../store/scheduleSlice';
import LoginForm from '../index/LoginForm';
import classInfoRefine from './classInfoRefine';
import './schedule.scss';
import weekdayattop from './weekdayattop';
import weeknumber from './weeknumber';

export default function Index() {
  const needlogin = useSelector((state: RootState) => state.cookies.needlogin)

  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.schedule.theme);
  const cookies = useSelector((state: RootState) => state.cookies)
  const scheduleData = useSelector((state: RootState) => state.schedule.data)

  const startDate = useSelector((state: RootState) => state.schedule.startDate)
  const semester = useSelector((state: RootState) => state.schedule.semester)
  if (semester.length === 0) {
    dispatch(setSemester(weekdayattop(startDate)))
  }

  const [weekshow, { setTrue: setWeekshowtrue, setFalse: setWeekshowfalse }] = useBoolean(true)
  const currentweeknumber = useSelector((state: RootState) => state.schedule.currentweeknumber)

  // 专用于提示中的当前周数
  const [weeknumbertouse, setWeeknumbertouse] = useState(currentweeknumber)

  // 以下两个函数实现滑动切换到当前周的效果
  useDidShow(() => {
    dispatch(setCurrentweeknumber(weeknumber(startDate)))
    setWeekshowtrue()
  })
  useDidHide(() => {
    dispatch(setCurrentweeknumber(weeknumbertouse))
  })


  const schedule = () => request({
    method: 'GET',
    url: apis.schedule,
    data: {
      schoolYear: '2021-2022',
      schoolTerm: '2',
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

  const notifyshow = useSelector((state: RootState) => state.notify.notifyshow)
  const notifymsg = useSelector((state: RootState) => state.notify.notifymsg)
  const notifycolor = useSelector((state: RootState) => state.notify.notifycolor)

  return (
    <>
      <Notify
        open={notifyshow}
        color={notifycolor}
        duration={1000}
        onClose={() => {
          dispatch(setNotifyshowFalse())
        }}
        className='mt-6'
      >
        {notifymsg}
      </Notify>
      <Popup
        rounded
        open={needlogin}
        className='h-auto pt-2 w-60'
      >
        <LoginForm />
      </Popup>
      <Image
        className='rabbit'
        src={rabbit}
        onClick={() => {
          Taro.showActionSheet({
            itemList: ['更换主题', '导入课表(待做)'],
            success: (res) => {
              switch (res.tapIndex) {
                case 0:
                  dispatch(changeTheme())
              }
            },
          }).catch(() => { })
        }}
      />
      <Toast
        open={weekshow}
        duration={1000}
        className='!px-0'
        onClose={() => setWeekshowfalse()}
      >
        第 {weeknumbertouse + 1} 周
      </Toast>
      <Swiper
        current={currentweeknumber}
        circular
        indicatorDots
        onChange={(e) => {
          setWeeknumbertouse(e.detail.current)
          setWeekshowtrue()
        }}
        className='h-screen'
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((week, weekindex) => <SwiperItem
          key={weekindex}
        >
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
                    {semester?.[weekindex]?.[dayindex]?.month}{(dayindex ? "-" : "")}{semester?.[weekindex]?.[dayindex]?.day}
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
