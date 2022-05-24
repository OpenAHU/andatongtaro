# 安大通Taro版

## 配置

因项目开源，将后端API等敏感数据放入[项目文档库](https://ahuer.yuque.com/docs/share/b7f86141-33ee-4a06-8398-50467eee6f6a)中，需配置。

## TODO

### 反馈
类似Taro项目，
1. 类issue的反馈页面
2. 通过bot自动周报

## 第三方库

### [Taro 框架](https://docs.taro.zone/docs/GETTING-STARTED)

### [Taroify UI库](https://taroify.gitee.io/taroify.com/quickstart/)

### [ahoooks](https://ahooks.js.org/zh-CN/hooks/use-request/index)
ready控制登录页面和请求

### Redux

#### [redux toolkit](https://redux-toolkit.js.org/tutorials/quick-start)

#### [redux 持久化](https://github.com/mefengl/redux-persist-taro-storage/tree/patch-1)

即将本地缓存作为redux数据库。

哪些情况下使用redux做状态管理？
1. 跨页面数据
2. 持久化数据

否则用hooks即可，优点是ahooks和taro-hooks提供了很多好用的轮子。

不建议混合使用redux和hooks。

## 界面
### [登录 Popup实现](https://taroify.gitee.io/taroify.com/components/popup/)。

