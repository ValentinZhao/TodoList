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