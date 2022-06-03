export default defineAppConfig({
  "usingComponents": {},
  // "tabBar": {
  //   "color": "#222222",
  //   "selectedColor": "#000000",
  //   "backgroundColor": "#ffffff",
  //   "custom": false,
  //   "list": [
  //     {
  //       "pagePath": "pages/index/index",
  //       "text": "首页",
  //     },
  //     {
  //       "pagePath": "pages/schedule/schedule",
  //       "text": "课表",
  //     }
  //   ]
  // },
  pages: [
    'pages/schedule/schedule',
    'pages/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
