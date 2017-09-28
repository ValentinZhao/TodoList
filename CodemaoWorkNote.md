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
# 一些插件的使用
- htmlwebpackplugin
- happyplugin
- extracttextplugin
- others