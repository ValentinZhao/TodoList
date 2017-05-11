# Vue.js Learning Notes
具体使用API直接参考[官网文档](http://cn.vuejs.org/v2/guide/)
## 前端路由
大概意思就是，前端通过点击等事件处理实现url在**单页面**内跳转
## Usage
- 在给根标签写components时，在子节点定义中，不应该把data属性写死，也就是直接引用赋值，而是应该把data写成一个方法并返回原来那些属性，以便于动态修改。比如你这层树，只有一个节点需要修改data中的某个值其他的不需要改：那么你在components层修改写死的data会导致所有该层节点的值改变。
- Vue的计算属性是基于他们的依赖进行缓存的，所以在mustache语法中，写一个计算属性中的方法名或直接显式调用一个方法的区别便在于此：只要计算属性绑定的依赖没有改变，那么每次调用计算属性都会立即得出结果而不会重新执行函数
##　新建一个Vue.js项目
### vue-cli
- 快速搭建项目的脚手架工具，需要Node.js > 4.x, npm, 以及一个可以执行node.js的命令行工具
- npm是Node.js的包管理工具
***
1. 安装vue-cli：`npm install vue-cli -g`, -g是全局的意思
2. 初始化项目：`vue init webpack my-project`,默认是webpack的打包方式（模版方案），webpack是一款模块加载器兼打包工具，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理
3. 安装项目依赖：`npm install`
4. 在localhost启动测试服务器：`npm run dev`，或生成在线目录（部署）：`npm run build`
5. 命令行工具推荐：mobaXterm
6. 使用`cnpm`，即npm的淘宝国内镜像加快安装速度
7. `cnpm install vue-cli -g`
8. 通过`vue -V`查看vue版本，顺便验证是否安装成功
9. 进入对应文件路径下，`vue init webpack xxx`
10. 在xxx文件路径下`cnpm install`
11. 通过`npm run dev`就能执行node的dev后台代码
12. `npm run build`可生成部署文件，生成了`dist`目录
13. 程序入口：min.js
14. ES6导出一个变量：export default {...}
15. 安装前端路由`npm install vue-router --save`
16. 安装之后在入口文件中引入`vue-router`，接着利用全局Vue.use方法使用这个插件，然后写对象关系映射Map，把组件引入到入口文件中，连接起来的关系是组件与路径
17. 利用`$route.params`取得带着的参数
18. 安装vuex`npm install vuex --save`
19. vuex中的action, mutation和state: action通过commit来触发mutation，mutation来更改state，也就是mutation来接收state这个参数。然后action中的逻辑可以是异步的，mutation必须是同步的操作