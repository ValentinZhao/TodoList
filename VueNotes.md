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
- [阮一峰的ECMAScript6入门-Module篇](http://es6.ruanyifeng.com/#docs/module)
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
### ES6中的参数解构
首先是一个参数解构的代码段

	var sayHello = function({ name, surname }) {
	  console.log(`Hello ${name} ${surname}! How are you?`);
	};
	
	sayHello({ name: 'John', surname: 'Smith' })
	// -> Hello John Smith! How are you?
这对于接收可选参数的函数，是很棒的。对于这种用法，你也可以添加默认参数值来填充调用者没有传递或忘记传递的参数值：

	var sayHello2 = function({ name = "Anony", surname = "Moose" } = {}) {
	  console.log(`Hello ${name} ${surname}! How are you?`);
	};
= {}表示此参数需要解构的默认对象是一个{}，以防调用者忘记传值，或传递了一个错误类型（大多情况为后者）。
#### 参数处理

对于普通的解构，如果输入的参数与函数指定的对象参数不符，所有不符的参数都将为undefined，所以你需要增加代码来正确的处理这些情况,更糟糕的，如果没有传递需要解构的的参数，将会抛出错误，这可能使你的应用崩溃。为解构增加默认参数基本上解决了上面的所有问题：

	var sayHelloTimes2 = function({ name = "Anony", surname = "Moose" } = {}, times) {
	  console.log(`Hello ${name} ${surname}! I've seen you ${times} times before.`);
	};
	
	sayHelloTimes2({ name: "Pam" }, 5678)
	// -> Hello Pam Moose! I've seen you 5678 times before.
	sayHelloTimes2(5678)
	// -> Hello Anony Moose! I've seen you undefined times before.
	sayHelloTimes2()
	// -> Hello Anony Moose! I've seen you undefined times before.
### Vue中父组件子组件消息交互
父组件通过`props`来向下传递，子组件通过this.$emit来向上触发事件，我们举一个例子：

	//父组件
	<header-bar @showTalion="open"></header-bar>
	...
	methods: {
    open: function () {
      this.talion = 'open'
    }
	//子组件
	<span class="talion" @click="showTalion"></span>
	methods: {
    showTalion: function () {
      this.$emit('showTalion')
      }
  	}
### data要用方法返回的原因 
把简单一个对象给Vue.extend()的话，所有实例将统一用一个data对象，而用方法返回就不会出现类似情况。
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

## 关于Vue-router
[官方教程](https://router.vuejs.org/zh-cn/essentials/getting-started.html)<br>
下面是一段示例代码：<br>
HTML

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

	<div id="app">
	  <p>
	    <router-link to="/user/foo">/user/foo</router-link>
	    <router-link to="/user/foo/profile">/user/foo/profile</router-link>
	    <router-link to="/user/foo/posts">/user/foo/posts</router-link>
	  </p>
	  <router-view></router-view>
	</div>

Vue

	const User = {
	  template: `
	    <div class="user">
	      <h2>User {{ $route.params.id }}</h2>
	      <router-view></router-view>
	    </div>
	}
	
	const UserHome = { template: '<div>Home</div>' }
	const UserProfile = { template: '<div>Profile</div>' }
	const UserPosts = { template: '<div>Posts</div>' }
	
	const router = new VueRouter({
	  routes: [
	    { path: '/user/:id', component: User,
	      children: [
	        // UserHome will be rendered inside User's <router-view>
	        // when /user/:id is matched
	        { path: '', component: UserHome },
					
	        // UserProfile will be rendered inside User's <router-view>
	        // when /user/:id/profile is matched
	        { path: 'profile', component: UserProfile },
	
	        // UserPosts will be rendered inside User's <router-view>
	        // when /user/:id/posts is matched
	        { path: 'posts', component: UserPosts }
	      ]
	    }
	  ]
	})

	const app = new Vue({ router }).$mount('#app')

### 命名路由
有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。

	const router = new VueRouter({
	  routes: [
	    {
	      path: '/user/:userId',
	      name: 'user',
	      component: User
	    }
	  ]
	})
要链接到一个命名路由，可以给 router-link 的 to 属性传一个对象：
	
	<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
这跟代码调用 router.push() 是一回事：

	router.push({ name: 'user', params: { userId: 123 }})
这两种方式都会把路由导航到 /user/123 路径。

### 重命名与别名
『重定向』的意思是，当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b，那么『别名』又是什么呢？

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

## 关于Vuex
[官方文档](https://vuex.vuejs.org/zh-cn/)<br>
每一个 Vuex 应用的核心就是 store（仓库）。"store" 基本上就是一个容器，它包含着你的应用中大部分的状态(state)。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交(commit) mutations。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
3. 通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。

		const app = new Vue({
		  el: '#app',
		  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
		  store,
		  components: { Counter },
		  template: `
		    <div class="app">
		      <counter></counter>
		    </div>
		  `
		})
		***********************************
		//更新Counter的实现
		const Counter = {
		  template: `<div>{{ count }}</div>`,
		  computed: {
		    count () {
		      return this.$store.state.count
		    }
		  }
		}
3. 当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，让你少按几次键

		// 在单独构建的版本中辅助函数为 Vuex.mapState
		import { mapState } from 'vuex'
		
		export default {
		  // ...
		  computed: mapState({
		    // 箭头函数可使代码更简练
		    count: state => state.count,//这里相当于把state中的count取出来给count属性
		
		    // 传字符串参数 'count' 等同于 `state => state.count`
		    countAlias: 'count',
		
		    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
		    countPlusLocalState (state) {
		      return state.count + this.localCount
		    }
		  })
		}
4. 新建一个 ‘src/store/index.js’这个文件的内容如下：

		import Vue from "vue";          //引入vue
		import Vuex from "vuex";        //引入vuex
		Vue.use(Vuex);                  //增加vuex功能
		export default new Vuex.Store({  //此文件直接export
		                                //出去一个实例化好的 Vuex.Store
		    state: {
		        messages: [ 
		            {
		                key: tool.getTimestamp(), //列表key
		                type: USER_TYPE.ROBOT, //类型
		                value: '你好，您有什么需要，可以直接和我对话😁', //内容
		                userId: '' //信息发送者
		            }
		        ],
		        userId: xxxxx,
		        loading: flase
		    },
		    getters: {
		        getMessages: state => {
		            return state.messages || [];
		        },
		        getUserId: state => {
		            return state.userId;
		        }
		    },
		    mutations: {
		        pushMassages: (state, message) => {
		            state.messages.push(message);
		        },
		        clearMassages: state => {
		            state.massages = [];
		        },
		        setLoading: (state, loading) => {
		            state.loading = loading;
		        }
		    },
		    actions: {
		        pushMassages: ({
		            commit
		        }, message) => {
		            return new Promise(function(resolve, reject) {
		                commit("pushMassages", message);
		                resolve();
		            });
		        },
		        clearMassages: ({
		            commit
		        }) => {
		            return new Promise(function(resolve, reject) {
		                commit("clearMassages");
		                resolve();
		            });
		        },
		    }
		});
一个vuex的store，主要四个属性：
state：就是数据，所有的组件所需要的数据，都在state里
getters：组件获取state里的数据可以通过store.state.xx, 但是这样如果还需要一些额外的处理，还得单独处理，所以在getters里统一处理一下东西，用的时候直接从 getters里拿数据
mutations：mutations里是对 state的一些操作，vuex所有对state的操作都必须通过 ‘mutations’，mutations的操作都是同步的！
actions： actions也是操作state的数据而诞生的，你会疑问：‘不是已经有mutations了吗？’，刚才说了mutations只能同步操作state，actions就是为异步操作state诞生的，可以把一些异步接口之后操作state的行为放到 actions里做。actions里的方法可以返回一个promise对象。
5. ‘src/store/index.js’写好以后，就是在’src/main.js’ 应用vuex

		import Vue from 'vue'
		import App from './App'
		import store from "./store"; //引入store的配置
		/* eslint-disable no-new */
		new Vue({
		    store, //应用配置
		    render: h => h(App)
		}).$mount("#app");
## Vue+Vue-router+Vuex全家桶架构理解
以`movie.js`为例，在Vuex的`index.js`中分好模块（一般用于较复杂应用）

- M层：我理解为就是对应的`Movie.js`，它import了Vue，对应的是一个

		movie:{
			state:{...}
			mutation:{...}
			action:{...}
		}
的形式，相当于一个实体数据类Javabean。分别用const来实现各部分。
- VM层：也就是view，对应MovieView.vue，在V层利用Vue单文件组件，同时由于引入mapState状态得以保存并修改。state原本就保存有movie,book,activities等（在index.js中）。movie中的topMovies肯定是在M层赋得值，具体实现是通过tag...
- V层：各个组件搭起来的部分，在该层中你可以看到各个组件比如scrollbar，在V层通过this.$store.dispatch来调用M层方法，也就是获取数据，如getMovie实际上是M层设置的方法。实际上是通过dispatch来提交mutation来改变状态

## Vue.js Virtual DOM
在Vue.js2.0中，Virtual DOM是通过VNode对象来表达的，每一个原生DOM元素或者Vue组件都对应一个DOM对象。生成VNode对象最关键的点是call render function, 那么调用render的方法无外于两种：直接在Vue对象创建时的option中添加render字段（该字段是个函数），或者是指定一个个根元素，先转化成模板后经语法解释器生成一个ast抽象语法树，最后语法树转换成HTML片段，最后通过代码生成function添加到option中。<br>
那么在render函数的底层，渲染DOM主要是`renderElementWithChildren()`方法与`renderElement()`方法。

- renderElementWithChildren: 给一个VNode对象添加若干个子VNode，因为整个DOM是一个树结构
- renderElement： 创建一个VNode对象

那么VNode转换成真正的DOM是通过`patch`方法来实现。

	/**
	* oldVnode:以前的DOM，可以是真实DOM或VNode
	* vnode: 要替换的vnode
	* hydrating: boolean类型，是否使用SSR来渲染出DOM
	**/
	patch(oldVnode, vnode, hydrating)
那么patch内部的实现流程是，如果没有oldVnode就直接创造vnode出来，有的话

- oldVnode不是一个真实DOM节点并且跟传进来的vnode一致：调用`patchVNode()`方法，进入生命周期钩子
- oldVNode是真实DOM，再根据第三个参数是否需要SSR来调用SSR生成DOM字符串解析并替换oldVNode
- oldVNode是一个vnode对象，此时先创建另一个vnode，再根据oldVNode是否有父节点来插入生命周期钩子

那么在这个流程中最重要的就是`createElm()`和`patchVNode()`方法,因为有多处需要直接创建真实DOM或vnode。

- createElm(vnode, insertVnodeQueue)：会根据vnode数据结构创建真实的DOM节点，递归创建。创建的vnode会被添加进这个维护的queue中。
- patchVnode(oldVnode,vnode,insertVnodeQueue)：通过比较新旧vnode来实现合理的更新。那么合理的更新主要就是指，编译阶段生成的静态子树在这个过程中会跳过比对，动态子树比对就是在比对时如果双方都有子树，则调用updateChildren方法对子节点做更新。updateChildren主要就是通过while循环一遍遍地比对两棵树的子节点来更新DOM。

那么当VNode方法通过patch创建真实DOM之后，会调用mounted hook。调用之后Vue实例创建完成，当该实例的Watcher发现数据变换时，会再次调用render函数来创建新VNode，接着调用patch来实现节点创建以及视图更新。

## Vue.js的响应式原理
大体来说就是

- 通过Observer对data做监听，并且提供了订阅某个数据项变化的能力
- 把template编译成一段document fragment，然后解析其中的Directive，得到每一个Directive所依赖的数据项以及update方法
- 通过watcher把上述两者结合起来。即把directive中的数据项通过watcher订阅在对应数据的Observer的Dep上，数据变化时，就会触发Observer的Dep上的notify方法通知对应的watcher的update，进而触发update方法来更新DOM视图

Observer绑定data过程大致是，在生命周期中会调用一个vm._initData()方法来处理data选项。在里面又会有遍历data的key的方法`_proxy()`，它会遍历data的key通过Object.defineProperty方法来代理getter，setter。最后在init中会调用`observe(data, this)`方法来创建一个Observer，那么Observer做的事情是：创建一个`Dep`对象实例，然后对传进来的data进行类型判断（单个对象还是数组），对数组也是递归调用observe，最终会调用`walk`方法观察单元素。在walk中，对单元素的key进行遍历，对每个属性执行`convert`方法。convert方法再调用`defineReactive`方法，这个方法就是为每个属性添加setter，getter，以此来实现了数据劫持。当某个属性被访问时，属性的getter会被调用——判断当`Dep.target`不为空时，调用`dep.depend`和`childObj.dep.depend`做依赖收集。改变data属性时，则会调用setter方法，这时会调用dep.notify方法进行通知了。