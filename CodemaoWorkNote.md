# TypeScript学习
## 原始数据类型
在 TypeScript 中，boolean 是 JavaScript 中的基本类型，而 Boolean 是 JavaScript 中的构造函数。其他基本类型（除了 null 和 undefined）一样，不再赘述。

```
let createdByNewBoolean: boolean = new Boolean(1);

// index.ts(1,5): error TS2322: Type 'Boolean' is not assignable to type 'boolean'.
// 后面约定，未强调编译错误的代码片段，默认为编译通过
```
## 函数声明
```
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};
```
在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。其中，=> 在 ES6 中叫箭头函数，应用十分广泛。
## 可选参数
与接口中的可选属性类似，我们用 ? 表示可选的参数：

```
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + ' ' + lastName;
  } else {
    return firstName;
  }
}
let xcatliu = buildName('Xcat', 'Liu');
let xcat = buildName('Xcat');
```
需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必须参数了。
## 参数默认值
在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数：

```
function buildName(firstName: string, lastName: string = 'Liu') {
  return firstName + ' ' + lastName;
}
let xcatliu = buildName('Xcat', 'Liu');
let xcat = buildName('Xcat');
```
此时就不受「可选参数必须接在必需参数后面」的限制了：

```
function buildName(firstName: string = 'Xcat', lastName: string) {
  return firstName + ' ' + lastName;
}
let xcatliu = buildName('Xcat', 'Liu');
let xcat = buildName(undefined, 'Xcat');
```
## 剩余参数
ES6 中，可以使用 ...rest 的方式获取函数中的剩余参数（rest 参数）：

```
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```
事实上，items 是一个数组。所以我们可以用数组的类型来定义它：

```
function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```
注意，rest 参数只能是最后一个参数，关于 rest 参数，可以参考 ES6 中的 rest 参数。
## 类型断言
当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法，而有时候，我们确实需要在还不确定类型的时候就访问其中一个类型的属性或方法，比如：

```
function getLength(something: string | number): number {
  if (something.length) {
    return something.length;
  } else {
    return something.toString().length;
  }
}

// index.ts(2,17): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
// index.ts(3,22): error TS2339: Property 'length' does not exist on type 'string | number'.
//   Property 'length' does not exist on type 'number'.
```

上例中，获取 something.length 的时候会报错。此时可以使用类型断言，将 something 断言成 string：

```
function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length;
  } else {
    return something.toString().length;
  }
}
```
<strong><span style="color:red;text-decoration:underline">类型断言不是<i>类型转换</i>，断言成一个联合类型中不存在的类型是不允许的</span></strong>

## 内部对象
DOM、BOM等

```
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

## 类型别名与字面量类型定义
使用`type`来定义。

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'

// index.ts(7,47): error TS2345: Argument of type '"dbclick"' is not assignable to parameter of type 'EventNames'.
```
## [枚举](https://github.com/xcatliu/typescript-tutorial/blob/master/advanced/enum.md)
## 类
### 类的继承
使用 extends 关键字实现继承，子类中使用 super 关键字来调用父类的构造函数和方法。

```
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}

let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```
### 静态方法
```
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```
另外，ts也支持在类中自定义成员变量(不加修饰符)，和定义静态成员变量。
## 使用含有泛型的接口来定义函数
```
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function<T>(length: number, value: T): Array<T> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
OR

```
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>; // 注意，此时在使用泛型接口的时候，需要定义泛型的类型。
createArray = function<T>(length: number, value: T): Array<T> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```
## 泛型类
```
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```


# 一些插件的使用
- htmlwebpackplugin
- happyplugin
- extracttextplugin
- others

# 工程架构理解
以打开material dialog为例来理解一次react＋redux的数据流动过程，包括action创建和reducer等。

react-intl的使用：error_msg是怎样和intl结合起来的，formatMessage怎样使用。

## Component vs. ComponentClass
>ComponentClass is the interface for the Component object (the interface for static properties on Component, in other words). To say class Component implements ComponentClass means that every instance of Component must have the properties defined by the ComponentClass interface.

## react-redux
[API docs](https://github.com/reactjs/react-redux/blob/master/docs/api.md#api)

### mapStatesToProps?
Imagine you have a posts key in your App state.posts

```
state.posts //
/*    
{
  currentPostId: "",
  isFetching: false,
  allPosts: {}
}
*/
```
And component Posts

By default connect()(Posts) will make all state props available for the connected Component

```
const Posts = ({posts}) => (
  <div>
    {/* access posts.isFetching, access posts.allPosts */}
  </div> 
)
```
Now when you map the state.posts to your component it gets a bit nicer

```
const Posts = ({isFetching, allPosts}) => (
  <div>
    {/* access isFetching, allPosts directly */}
  </div> 
)

connect(
  state => state.posts
)(Posts)
```
**mapDispatchToProps**

normally you have to write dispatch(anActionCreator()) with bindActionCreators you can do it also more easily like

```
connect(
  state => state.posts,
  dispatch => bindActionCreators({fetchPosts, deletePost}, dispatch)
)(Posts)
```
Now you can use it in your Component

```
const Posts = ({isFetching, allPosts, fetchPosts, deletePost }) => (
  <div>
    <button onClick={() => fetchPosts()} />Fetch posts</button>
    {/* access isFetching, allPosts directly */}
  </div> 
)
```
所以简单来说，mapStatesToProps方法就是将redux全局的state通过组件的props来获取；同理，mapDispatchToProps就是将action creator映射到props中

## saga
在项目中我们使用redux－saga来处理reducer和action。举个例子，我们要在关闭一个窗口后在回调中改变某些状态。

```
// reducers.ts
const PAINTER_CLOSE = 'painter/close';

export const action_painter_close = createAction(PAINTER_CLOSE);

function reducer_painter_close(state:PainterState) {
  return {
    ...state,
    visible: false,
  };
}

// ...
// ...
// ...
/**
 * Exports reducers and Sagas
 */
export const reducer_painter = handleActions(
  {
    [PAINTER_OPEN]: reducer_painter_open,
    [PAINTER_CLOSE]: reducer_painter_close,
  },
  initial_state);

```
在handleActions中我们注册好了对应action_type的对应方法，比如本例中的`reducer_painter_close`，在tsx中触发对应的action我们就会触发这个注册的方法了。

```
// index.tsx
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import * as style from './style.scss';
import { ReduxState } from '../redux/reducer';
import { init_painter } from './models/functions';
import { action_painter_close, action_painter_open, PainterState } from './models/reducers';

import 'codemao-painter/lib/styles.css';

interface ConnectedProps {
  state_painter:PainterState;
  close_painter:typeof action_painter_close;
  open_painter:typeof action_painter_open;
}

function map_props(state:ReduxState) {
  return {
    state_painter: state.state_painter,
  };
}

function map_actions(dispatch:Dispatch<ReduxState>) {
  return bindActionCreators(
    {
      close_painter: action_painter_close,
      open_painter: action_painter_open,
    },
    dispatch);
}

@CSSModules(style, {
  allowMultiple: true,
})
export class Painter extends React.Component<ConnectedProps, {}> {
  public element:HTMLElement | HTMLDivElement;

  componentDidMount() {
    if (!this.element) {
      return;
    }
    // 这部分的话，init_painter在其他文件中被定义，第三个参数是关闭回调，所以close_painter在这里被触发
    init_painter(this.element, undefined, () => {
      this.props.close_painter();
    });
  }

  render() {
    const inline_style:React.CSSProperties = {
      visibility: this.props.state_painter.visible ? undefined : 'hidden',
    };
    return (
      <div styleName="painter" style={inline_style} ref={(el) => {
        el && (this.element = el);
      }} />
    );
  }
}

export const PainterContainer:React.ComponentClass<{}> = connect(map_props, map_actions)(Painter);
```
那么也就是说，在前面bindActionCreators之后，createAction生成的action creator（来自react－aciton）被绑定，再通过泛型类引入`ConnectedProps`。这样我们就能通过回调来生成action，再通过saga为action绑定方法调用。

Fork 执行一个非阻塞操作。

Take 暂停并等待action到达。

Race 同步执行多个 effect，然后一旦有一个完成，取消其他 effect。

Call 调用一个函数，如果这个函数返回一个 promise ，那么它会阻塞 saga，直到promise成功被处理。

Put 触发一个Action。

Select 启动一个选择函数，从 state 中获取数据。

takeLatest 意味着我们将执行所有操作，然后返回最后一个(the latest one)调用的结果。如果我们触发了多个时间，它只关注最后一个(the latest one)返回的结果。

takeEvery 会返回所有已出发的调用的结果。

### 以登陆为例说一下大体流程
```
//models目录结构
--- reducers.ts
--- sagas.ts
--- actions.ts
...
```

以一个普通登录操作为例,需要的操作如下

在某个组件中 dipatch一个login action

```
import * as actions from '../../actions'
function login() {
  this.props.dispatch(actions.LOGIN);
}
```

在saga中监听该action（而不是直接触发reducer）

```
//actions.ts
export const LOGIN  = 'LOGIN';
export const login = create_action(LOGIN);

export const LOGIN_WAITING = 'LOGIN_WAITING';
export const login_waiting = create_action(LOGIN_WAITING);

export const LOGIN_DONE = 'LOGIN_DONE'
export const login_done = create_action<{username:string}>(LOGIN_DONE)
// sagas.ts
import { login, login_waiting, login_done } from './actions'

function* saga_login() {
  takeLatest(LOGIN, do_login)  //等待 action 'LOGIN'
} 
function* do_login() {
  yield put(login_waiting); //dispatch action LOGIN_WAITING，设置登录Loading状态
  const response = yield call(...AJAX)   // 发送异步请求
  //or you can do something else here
  yield put(login_done(response))
}
//reducers
import { LOGIN_WAITING ... } from 'actions';
export function login_reducer(state: .. , action: ..) {
  switch (action.type) {
    case LOGIN_WAITING :
      return set_payload(state, {show_waiting_sign: true});
    ...
  }
}
//实际开发建议使用redux-actions的api减少代码冗余
```

需要注意的地方：

action分为复杂action和简单action，复杂action可能包含多个action，或者包含更新store以外其它操作。简单action只需要更新store，不需要被saga监听
复杂action不同类型的副作用注意抽离出来，保持saga函数清晰可读
全局只需要有唯一一个saga监听相应的action，不要重复监听将业务分布在各处
这样的优点：

所有业务代码都存在于saga中，不再散落再各处
可以控制整个action的执行逻辑顺序，就算逻辑再复杂，看起来也不会乱
组件中可以只dispatch一个action完成整个逻辑，而不是像下面这个例子将逻辑置于组件

```
//component.ts
function do_login() {
  this.props.set_loading_state();
  this.props.fetch_user();
  this.props.show_succeed_msg();
}
```
## 一种async/await+promise使用实例

- 第一个情景是，在一个thenable链中又有`addEventListener`的回调请求，此时选择asyc/await来等待其回调

```
const axios_promise = Axios(axios_config)
      .then(async (res) => {
        if (res.status !== 200) {
          return Promise.reject('Network Error');
        }
        // const match_array = sound.url.match(/\w+\/\w+$/);
        // let type = '';
        // if (match_array) {
        //   type = match_array[0];
        // }
        // const prefix = type ? `data:${type};base64,` : '';
        // const prefixed_base64 = prefix + Base64.encode(res.data);
        // const blob = base64_to_blob(prefixed_base64, type, 512);
        // const reader = new FileReader();
        // let result:string = '';
        // reader.readAsDataURL(blob);
        // const reader_promise = await new Promise((resolve, reject) => {
        //   reader.addEventListener('load', () => {
        //     resolve(reader.result as string);
        //   });
        // }).then((base64) => {
        //   result = base64 as string;
        // });
        let result:string = '';
        result = await blob_to_base64(res.data) as string;
        sound.url = result;
        return Promise.resolve(sound);
      });
      
//util.js
export async function blob_to_base64(blob:Blob) {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(blob);
  });
}
```


# css
- pointer-event: none可以阻止hover等事件
- 类似 `—————— . ————————`这样的横线，可以通过div包裹span，外面的div给左右一个很宽比如120px的border，整体给1px的height就能画出这种横线，里面的点用span再vertical－align即可
- &::-webkit-slider-thumb、&::-webkit-slider-runnable-track配合input的type为`range`就可以使得input变为滑动条

# 工程架构和协作
- git stash,暂存上一次更改
- to apply the changes stashed most recently:
git stash apply
- git cherry-pick
- git add -p, patch只能提交原文的修改到暂存区，新增文件要add
- git push origin YOURBRANCHNAME:feature/feature-name,推送远程分支
- arc land --squash 提交有多个commit 它会合成一个
- 当你再进行一个分支开发的时候，另外一个分支出现了问题，你应该先把自己当前分支手头的东西提交到暂存区，再切换分支修改问题
- npm run watch: webpack --watch

```
// 启动工程脚本
#!/usr/bin/env node
"use strict";

let fs = require('fs');
let http = require('http');
let https = require('https');
let path = require('path');

let app = require('./app.js');

// Functions below come from Google Cloud developer documentation.

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

let port = normalizePort(process.env.PORT || 3900);
let server = http.createServer(app.callback());
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
```

```
组件库发布流程
Release
Run Test
Change the version in package.json
Code Review and merged into master
Push a git tag for your release to origin (git tag x.x.x && git push origin x.x.x)
Run 'npm clean & npm build:prod & npm pack' will create a 'cmblockly-x.x.x.tgz'
Copy the .tgz file to kitten/libs or whichever client will use he update
Delete the old .tgz file from that same directory
Adjust Kitten's package.json dependency to point new .tgz file
Run Test and Code Review in Kitten
```
# webpack

Webpack将所有静态资源都认为是模块，比如JavaScript，CSS，LESS，TypeScript，JSX，CoffeeScript，图片等等，从而可以对其进行统一管理。为此Webpack引入了加载器的概念，除了纯JavaScript之外，每一种资源都可以通过对应的加载器处理成模块。和大多数包管理器不一样的是，Webpack的加载器之间可以进行串联，一个加载器的输出可以成为另一个加载器的输入。比如LESS文件先通过less-load处理成css，然后再通过css-loader加载成css模块，最后由style-loader加载器对其做最后的处理，从而运行时可以通过style标签将其应用到最终的浏览器环境。图片采用了url-loader加载，如果小于10kb，图片则被转化成 base64 格式的 dataUrl，css文件被打包进了js文件中。

- ExtractTextPlugin: 从bundle中提取出特定的text到一个文件中。使用 extract-text-webpack-plugin就可以把css从js中独立抽离出来。
- HTMLWebpackPlugin: [基本介绍与使用](https://segmentfault.com/a/1190000007294861)