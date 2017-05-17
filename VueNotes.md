# Vue.js Learning Notes
具体使用API直接参考[官网文档](http://cn.vuejs.org/v2/guide/)
## 前端路由
大概意思就是，前端通过点击等事件处理实现url在**单页面**内跳转
## Notes
- 在给根标签写components时，在子节点定义中，不应该把data属性写死，也就是直接引用赋值，而是应该把data写成一个方法并返回原来那些属性，以便于动态修改。比如你这层树，只有一个节点需要修改data中的某个值其他的不需要改：那么你在components层修改写死的data会导致所有该层节点的值改变。
- `v-bind`属性主要是用来动态修改标签的属性的，因为mustache语法不能修改标签属性。同时`v-bind`也可用来在父模版中向组件通过`prop`传递数据, for example：`v-bind:todo = 'item'`;在利用`v-bind:class`来动态修改类时，注意此时class接收的是一个类，比如`{active: xxx, disabled: xxx}`，所以我们也可通过**计算属性**来对应产生逻辑更加复杂的类名，注意最后**返回的是一个类**即可。
- Vue中的计算属性，主要是当插值出有一些逻辑无法一行解决时而选用的方案；而watch属性的话，当你想要在数据变化响应时，执行异步操作或开销较大的操作比较有用
- Vue的计算属性是基于他们的依赖进行**缓存**的，所以在mustache语法中，写一个计算属性中的方法名或直接显式调用一个方法的区别便在于此：只要计算属性绑定的依赖没有改变，那么每次调用计算属性都会立即得出结果而不会重新执行函数
- Vue的列表渲染`v-for`利用了类似for..in语法，并且也支持为item直接添加第二个参数，这个参数是index：`(item, index) in items`。props里面的属性，才可以在组件中利用v-bind的方式获得父元素传来的数据
### 在ES6中export default与export的区别
- export与export default均可用于导出常量、函数、文件、模块等
- 你可以在其它文件或模块中通过import+(常量 | 函数 | 文件 | 模块)名的方式，将其导入，以便能够对其进行使用
- 在一个文件或模块中，export、import可以有多个，export default仅有一个
- 通过export方式导出，在导入时要加{ }，export default则不需要
		1.export
		//demo1.js
		export const str = 'hello world'
		export function f(a){ return a+1}
		对应的导入方式：
		
		//demo2.js
		import { str, f } from 'demo1' //也可以分开写两次，导入的时候带花括号
		
		2.export default
		//demo1.js
		export default const str = 'hello world'
		对应的导入方式：
		
		//demo2.js
		import str from 'demo1' //导入的时候没有花括号

## 新建一个Vue.js项目
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
9. 进入对应文件路径下，`vue init webpack xxx`,这个`webpack`是创建的项目的模板名
10. 在xxx文件路径下`cnpm install`，安装项目所需的依赖
11. 通过`npm run dev`就能执行node的dev后台代码，相当于启动项目
12. `npm run build`可生成部署文件，生成了`dist`目录，之后只要把`dist`文件夹放在服务器上即可完成部署
13. 程序入口：min.js
14. ES6导出一个变量：export default {...}，主要用于导出单文件组件
15. 安装前端路由`npm install vue-router --save`
16. 安装之后在入口文件中引入`vue-router`，接着利用全局Vue.use方法使用这个插件，然后写对象关系映射Map，把组件引入到入口文件中，连接起来的关系是组件与路径
17. 利用`$route.params`取得带着的参数
18. 安装vuex`npm install vuex --save`
19. vuex中的action, mutation和state: action通过commit来触发mutation，mutation来更改state，也就是mutation来接收state这个参数。然后action中的逻辑可以是异步的，mutation必须是同步的操作
20. 如果浏览器打开之后，没有加载出页面，有可能是本地的 8080 端口被占用，需要修改一下配置文件`config/index.js`
## 关于JS的模块化规范
由于Vue项目是基于webpack构建，那么各部分需要以模块的形式进行封装、调用等，下面介绍一些JS的模块规范。
### CommonJS
 CommonJS就是为JS的表现来制定规范，因为js没有模块的功能所以CommonJS应运而生，它希望js可以在任何地方运行，不只是浏览器中。CommonJS定义的模块分为

- {模块引用(require)} 
- {模块定义(exports)} 
- {模块标识(module)}

require()用来引入外部模块；exports对象用于导出当前模块的方法或变量，唯一的导出口；module对象就代表模块本身。
	 //sum.js
	 exports.sum = function(){...做加操作..};
	 
	 //calculate.js
	 var math = require('sum');
	 exports.add = function(n){
	     return math.sum(val,n);
	 };
这种写法适合服务端，因为在服务器读取模块都是在本地磁盘，加载速度很快。但是如果在客户端，加载模块的时候有可能出现“假死”状况。比如上面的例子中clock的调用必须等待clock.js请求成功，加载完毕。
### AMD
AMD，即 (Asynchronous Module Definition)，这种规范是异步的加载模块，requireJs应用了这一规范。先定义所有依赖，然后在加载完成后的回调函数中执行。

	require(['clock'],function(clock){
	  clock.start();
	});

### CMD
CMD (Common Module Definition), 是seajs推崇的规范，CMD则是依赖就近，用的时候再require。它写起来是这样的：

	define(function(require, exports, module) {
	   var clock = require('clock');
	   clock.start();
	});

AMD和CMD最大的区别是对依赖模块的执行时机处理不同，而不是加载的时机或者方式不同，二者皆为异步加载模块。
AMD依赖前置，js可以方便知道依赖模块是谁，立即加载；而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。