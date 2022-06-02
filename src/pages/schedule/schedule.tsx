import { Swiper } from '@taroify/core';
import { View } from '@tarojs/components';
import { request } from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import apis from '../../apis.json';
import { setSchedule } from '../../store/scheduleSlice';
import classInfoRefine from './classInfoRefine';
import './schedule.scss';

export default function Index() {
  const [theme, setTheme] = useState(1);
  const cookies = useSelector((state: RootState) => state.cookies)
  const scheduleData = useSelector((state: RootState) => state.schedule.data)
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
  const dispatch = useDispatch()
  const { loading } = useRequest(schedule,
    {
      ready: cookies.cookies !== '' && scheduleData.length === 0,
      retryCount: 2,
      onSuccess: (res) => {
        dispatch(setSchedule(res))
      }
    });
  return (
    <Swiper>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((week, weekindex) => <Swiper.Item
        key={weekindex}
      >
        {loading && 'loading'}
        {!loading && scheduleData &&
          <View className='container'>
            {/* 每一天 */}
            {[, '一', '二', '三', '四', '五', '六', '日'].map((day, index) => <View
              key={index}
              className='row-span-1'
              style={`grid-column:${index + 1}`}
            >
              {/* 上栏 */}
              <View className='top'>
                <View className='top--weekday'>{(day ? "周" : "") + day}</View>
                <View className='top--date'>xx-xx</View>
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
      </Swiper.Item>)}
      <Swiper.Indicator />
    </Swiper>
  );
}
