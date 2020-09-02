## 简税宝税务筹划系统

> 采用 [react](https://react.docschina.org/) + 
[react-router](https://reacttraining.com/react-router/web/guides/quick-start) + 
[Ant Design3.x](https://3x.ant.design/docs/react/introduce-cn) + 
[Echarts](https://www.echartsjs.com/zh/index.html)+
[Axios](https://www.kancloud.cn/yunye/axios/234845)+
[react-redux](https://react-redux.js.org/) + 
[redux-saga](https://www.bookstack.cn/read/redux-saga-in-chinese/README.md) + 
[immutable.js](https://www.jianshu.com/p/7bf04638e82a)

### 项目框架搭建流程以及详细配置

> [查看详情](https://github.com/xushanpei/react-cli)


### 目录结构

```
|-- antd-layoutui
    |-- App.js         # App入口
    |-- index.js       # 框架入口
    |-- serviceWorker.js
    |-- HOC            # 高阶组件
    |   |-- control.js
    |-- assets         # 资源目录
    |   |-- audio      # 音频
    |   |-- css        # css样式
    |   |-- image      # 图片
    |   |-- video      # 视频
    |-- components     # 组件目录
    |   |-- common     # 公共组件
    |   |-- layout     # 布局组件
    |-- config         # 配置文件
    |   |-- base.conf.js
    |-- context        # 上下文目录
    |-- pages          # 页面组件目录
    |-- redux          # redux目录
    |   |-- actions    # actions 目录
    |   |-- middleware # 中间件目录
    |   |-- reducers   # reducers目录
    |   |-- sagas      # sagas 目录
    |   |-- store      # store 目录
    |-- router         # 路由 目录
    |   |-- index.js
    |-- service        # 后台 service 服务
    |   |-- apis       # apis 目录
    |   |   |-- 1.0
    |   |       |-- index.js
    |   |       |-- urls.js
    |   |-- mocks      # mocks 目录
    |   |   |-- 1.0
    |   |       |-- index.js
    |   |-- request    # 前端请求封装工具类
    |       |-- ApiRequest.js
    |       |-- MockRequest.js
    |-- test           # 测试 目录
        |-- App.test.js

```

#### 依赖安装 (必备环境： Nodejs)
```
    npm install
```

#### 项目启动



```
    npm start
```

#### 项目打包



```
    npm run build
```

#### 启动 、 打包说明  （ src 文件夹下的 setupProxy.js ）


* setupProxy.js 用于配置反向代理，仅仅适用于本地开发

* 执行 npm run build 之前需要删除 setupProxy.js 

#### 项目 ip 端口号配置

> src 文件夹下 config > base.config.js，  修改 baseUrl 为真实 ip端口号即可，本地开发环境由于配置了反向代理， baseUrl需要和代理的api相统一


#### 其它文件说明

* 侧边栏菜单项配置 ：  sagas > authSaga.js  方便后期从服务器动态获取

* Api请求库封装 ： service > request > ApiRequest.js  

* Api接口统一文件 ：   service > apis

* index.js => console.log = function() {}; 去除项目中所有 log ,用于生产环境




