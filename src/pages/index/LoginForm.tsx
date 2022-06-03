import { Button, Cell, Form, Input, Radio, Toast } from '@taroify/core'
import { View } from '@tarojs/components'
import Taro, { request } from '@tarojs/taro'
import { useRequest, useSetState } from 'ahooks'
import { JSEncrypt } from 'jsencrypt'
import { useDispatch } from 'react-redux'
import apis from '../../apis.json'
import { setPassword, setUsername } from '../../store/accountSlice'
import { setCookies } from '../../store/cookiesSlice'

export default function () {
  const login = () => request({
    url: apis.login,
    method: 'POST',
    data: {
      type: info.logintype,
      userId: info.username,
      password: encryptPassword(info.password)
    },
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then((res) => {
    let cookies = res?.cookies?.[0]
    if (!cookies) {
      return res.header?.['Set-Cookie']
    }
    return cookies
  })

  const dispatch = useDispatch()
  const { run } = useRequest(login,
    {
      manual: true,
      retryCount: 2,
      onSuccess: (res) => {
        if (typeof res === 'string') {
          dispatch(setCookies(res))
          dispatch(setUsername(info.username))
          dispatch(setPassword(info.password))

          Taro.hideLoading()
          Taro.showToast({
            title: '点击右上角·•·加入桌面更方便',
            icon: 'none',
            duration: 2000
          })
        }
      },
      onError: () => {
        Taro.hideLoading()
        Taro.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000
        })
      }
    });
  const [info, setInfo] = useSetState({
    logintype: '2',
    username: '',
    password: '',
  })

  const onSubmit = () => {
    Taro.showLoading({
      title: '登录中',
      mask: true
    })
    run();
  }

  return (
    <Form onSubmit={onSubmit}>
      <Toast id='toast' />
      <Cell.Group inset>
        <Form.Item name='username' rules={[{ required: true, message: "请填写用户名" }]}>
          <Form.Label>用户名</Form.Label>
          <Form.Control>
            <Input
              value={info.username}
              placeholder='用户名'
              onChange={(e) => setInfo({ username: e.detail.value })}
            />
          </Form.Control>
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: "请填写密码" }]}>
          <Form.Label>密码</Form.Label>
          <Form.Control>
            <Input
              password
              value={info.password}
              placeholder='密码'
              onChange={(e) => setInfo({
                password: e.detail.value
              })}
            />
          </Form.Control>
        </Form.Item>

      </Cell.Group>
      <Radio.Group value={info.logintype} direction='horizontal'
        className='pt-2 justify-center'
        onChange={(e) => setInfo({ logintype: e })}
      >
        <Radio name='2'>智慧安大</Radio>
        <Radio name='1'>教务系统</Radio>
      </Radio.Group>
      <View className='m-3' >
        <Button
          block
          shape='round'
          color='primary'
          formType='submit'
        >
          提交
        </Button>
      </View>
    </Form>
  )

  function encryptPassword(password: string): string | false {
    const crypt = new JSEncrypt()
    crypt.setKey(apis.key)
    const enc = crypt.encrypt(password)
    return enc
  }
}
