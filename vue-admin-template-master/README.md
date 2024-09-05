## Build Setup

```bash
# 克隆项目
git clone git@github.com:875216663/My-project-houtai.git

# 进入项目目录
cd vue-admin-template-master

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

## 文件介绍

```bash
build
     ----index.js webpack配置文件【很少修改这个文件】

mock
    ----mock数据的文件夹【模拟一些假的数据mockjs实现的】，实际开发的时候，利用的是真是接口

node_modules
     ------项目依赖的模块

public
     ------ico图标,静态页面，public文件夹里面经常放置一些静态资源，而且在项目打包的时候webpack不会编译这个文件夹，原封不动的打包到dist文件夹里面

src
    -----程序员源代码的地方
    ------api文件夹:涉及请求相关的
    ------assets文件夹：里面放置一些静态资源（一般共享的），放在aseets文件夹里面静态资源，在webpack打包的时候，会进行编译
    ------components文件夹：一般放置非路由组件或者全局组件
    ------icons这个文件夹的里面放置了一些svg矢量图
    ------layout文件夹：他里面放置一些组件与混入
    ------router文件夹：与路由相关的
    ------store文件夹：一定是与vuex先关的
    ------style文件夹：与样式先关的
    ------utils文件夹：request.js是axios二次封装文件，里面封装了一些请求相关的逻辑，比如请求拦截，请求错误处理等
    ------views文件夹：里面放置的是路由组件

App.vue:根组件
main.js：入口文件
permission.js:与导航守卫相关的
settings：项目配置项文件，比如title名称，头部是否固定，是否侧边栏显示logo
.env.development
.env.producation
```

后台管理系统API接口：
http://39.98.123.211:8170/swagger-ui.html
http://39.98.123.211:8510/swagger-ui.html

## 后台路由

![image-20220609120120695](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350089.png)

## 技术选型

![image-20220609120147762](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350091.png)

## 1.登录业务

 -----静态组件完成,位置在views/login/index.vue中实现
 -----书写API（换成真实的接口） 位置在api/login.js
 -----axios二次封装，在utils/request.js，封装了请求相关的逻辑，比如请求拦截，请求错误处理等
 -----换成真实接口之后需要解决代理跨域问题(解决代理跨域问题)在vue.config.js中devServer的proxy

## 2.退出登录

在layout/components/Navbar.vue中实现，在登出点击的时候实现路由跳转到登录页面，并清除token


## 3.删除不需要的组件
在views里删除不需要的组件
然后再views下面编写自己的组件,这里编写的是product的组件
之后在router.js中配置路由，在配置好之后直接就可以使用了


## 品牌管理组件

![image-20220609132657102](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350094.png)

## 添加品牌与修改品牌

![image-20220609132910174](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350095.png)

![image-20220609132928884](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350096.png)

## 删除品牌的操作

![image-20220609133045066](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350097.png)

## 获取数据动态的展示三级联动]

![image-20220609133253222](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350098.png)

## SPU模块介绍

SPU你可以理解为类

People类【SPU】
实例:【SKU】
小明:小明  18  男 等等
小红：小红  88  女 等等

![image-20220609133431091](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350099.png)

## SPU管理内容切换

---展示SPU列表结构
----添加SPU|修改SPU
----展示添加SKU结构

![image-20220609133555914](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350100.png)

![image-20220609133651361](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350101.png)

![image-20220609133701958](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350102.png)

![image-20220609133725158](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350103.png)

![image-20220609133757367](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350104.png)

![image-20220609133820236](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350105.png)

![image-20220609133909578](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350106.png)

## SKu的业务

SKU的上架与下架操作

![image-20220609134133248](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350107.png)

SKU模块数据的展示

![image-20220609134034555](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350108.png)

查看信息

![image-20220609134248715](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350109.png)

## 首页业务

![image-20220609134435858](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350110.png)

![image-20220609134453309](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350111.png)

![image-20220609134507564](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350112.png)

## 权限管理

权限管理：用户管理、角色管理、菜单管理

![image-20220609134730897](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350113.png)

![image-20220609134746004](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350114.png)

![image-20220609134756026](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350115.png)

![image-20220609134809018](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350116.png)

![image-20220609134823286](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350117.png)

![image-20220609134838325](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350118.png)

## 菜单管理

![image-20220609134911505](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350120.png)

![image-20220609134924856](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350121.png)

![image-20220609134935013](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350122.png)

![image-20220609134943575](https://150-9155-1312350958.cos.ap-chengdu.myqcloud.com/img202206091350123.png)
