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
