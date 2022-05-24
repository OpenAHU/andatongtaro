export default defineAppConfig({
  "usingComponents": {},
  "tabBar": {
    "custom": false,
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
      },
      {
        "pagePath": "pages/schedule/schedule",
        "text": "课表",
      }
    ]
  },
  pages: [
    'pages/index/index',
    'pages/schedule/schedule',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
