#　CSS使用笔记
## 如何通过CSS使div具有全屏效果
- 全屏元素及其父元素都要设置**height="100%"**
- 将`<html>`、`<body>`标签设置**height="100%"**
- overflow:hidden,隐藏滚动条
- `margin: 0 auto`来设置垂直居中
## 让一段div可以滚动，比如一段table可以滚动
- 将这个table用一个div包裹，并将这个div固定宽高，同时设置`overflow:scroll`属性
- 也要记得将你的主体标签，比如`<table>`设置一个宽高
# Sass学习笔记
基本的Sass指导看这篇[官方文档](http://www.sasschina.com/guide/)

- 使用$来定义变量，父级变量&
- 最重要的特性就是嵌套选择器，嵌套属性

		nav {
		  border: {
		  style: solid;
		  width: 1px;
		  color: #ccc;
		  }
		}
- `@include`不同于纯CSS的include，Sass会在编译开始就加载这些文件，而不是等到执行到这句时再加载，优化了加载时间
- `！default`的含义是将这个变量设计为默认变量
- 静默注释

		body {
		  color: #333; // 这种注释内容不会出现在生成的css文件中
		  padding: 0; /* 这种注释内容会出现在生成的css文件中 */
		}
- 混合器：`@mixin`来定义混合器，简单来说就是通过`@mixin`来定义需要被重用的样式，在需要的位置`@include`这个混合器的名字即可
- 可以给混合器传参

		@mixin link-colors($normal, $hover, $visited) {
		  color: $normal;
		  &:hover { color: $hover; }
		  &:visited { color: $visited; }
		}
- 通过`@extend`来继承一个样式

## CSS3 媒体查询
[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)
## 使用rem
使用前应先给html设置一个font-size属性，rem的大小就是它的1/10，这样就可以通过媒体查询来根据不同宽度的屏幕来设置这个root的font-size，从而实现适配。
## li标签的宽高
若我们有时为了将li标签横向展示会将其的display设置为inline，此事时不能设置宽高的！所以我们改用`float:left`属性使其具有宽高并依然能横向显示
## 表格中td文字过多设置省略
为table标签设置`table-layout:fixed`
再为td设置`overflow:hidden;text-overflow:ellipsis`
## 将footer固定在底部
[方法](https://segmentfault.com/a/1190000004453249)<br>
网页可见区域宽：document.body.clientWidth 
网页可见区域高：document.body.clientHeight 
网页可见区域宽：document.body.offsetWidth (包括边线的宽) 
网页可见区域高：document.body.offsetHeight (包括边线的宽) 
网页正文全文宽：document.body.scrollWidth 
网页正文全文高：document.body.scrollHeight 
网页被卷去的高：document.body.scrollTop 
网页被卷去的左：document.body.scrollLeft 
网页正文部分上：window.screenTop 
网页正文部分左：window.screenLeft 
屏幕分辨率的高：window.screen.height 
屏幕分辨率的宽：window.screen.width 
屏幕可用工作区高度：window.screen.availHeight 
屏幕可用工作区宽度：window.screen.availWidth 


HTML精确定位:scrollLeft,scrollWidth,clientWidth,offsetWidth 
scrollHeight: 获取对象的滚动高度。 
scrollLeft:设置或获取位于对象左边界和窗口中目前可见内容的最左端之间的距离 
scrollTop:设置或获取位于对象最顶端和窗口中可见内容的最顶端之间的距离 
scrollWidth:获取对象的滚动宽度 
offsetHeight:获取对象相对于版面或由父坐标 offsetParent 属性指定的父坐标的高度 
offsetLeft:获取对象相对于版面或由 offsetParent 属性指定的父坐标的计算左侧位置 
offsetTop:获取对象相对于版面或由 offsetTop 属性指定的父坐标的计算顶端位置 
event.clientX 相对文档的水平座标 
event.clientY 相对文档的垂直座标 
event.offsetX 相对容器的水平坐标 
event.offsetY 相对容器的垂直坐标 
document.documentElement.scrollTop 垂直方向滚动的值 
event.clientX+document.documentElement.scrollTop 相对文档的水平座标+垂直方向滚动的量 

IE，FireFox 差异如下： 

IE6.0、FF1.06+： 
clientWidth = width + padding 
clientHeight = height + padding 
offsetWidth = width + padding + border 
offsetHeight = height + padding + border 

IE5.0/5.5： 
clientWidth = width - border 
clientHeight = height - border 
offsetWidth = width 
offsetHeight = height 

(需要提一下：CSS中的margin属性，与clientWidth、offsetWidth、clientHeight、offsetHeight均无关)