# Vue.js Learning Notes
具体使用API直接参考[官网文档](http://cn.vuejs.org/v2/guide/)
## 前端路由
大概意思就是，前端通过点击等事件处理实现url在**单页面**内跳转
## Usage
- 在给根标签写components时，在子节点定义中，不应该把data属性写死，也就是直接引用赋值，而是应该把data写成一个方法并返回原来那些属性，以便于动态修改。比如你这层树，只有一个节点需要修改data中的某个值其他的不需要改：那么你在components层修改写死的data会导致所有该层节点的值改变。
##　新建一个Vue.js项目