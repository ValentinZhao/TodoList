# jQuery使用笔记
##闭包的作用
- 避免全局依赖
- 避免第三方破坏
- 兼容jQuery操作符'$'和jQuery
***
	(function($){
		//do something...
	})(jQuery);
## jQuery组件开发
- 类级别组件开发
即给jQuery命名空间下添加新的全局函数，也称静态方法
***
	jQuery.myPlugin = function(){
		//do something...
	};
例如`$.Ajax()`、`$.extend()`,extend()的作用是将用户自定义参数与插件的默认参数合并。其实也就是将后面两个对象中的参数合并到第一个对象中。最后一位的参数有最高优先权，也就是说同样字段的属性后面参数的值会覆盖前面的。<br>
取两位小数 -> **(num / 100).toFixed(2)**
***
- 对象级别组件开发
即挂载jQuery原型下的方法，这样通过选择器获取的jQuery对象实例也能共享该方法，也称动态方法
***
	$.fn.myPlugin = function(){
		//do something...
	};
这里$.fn === $.prototype
例如addClass(),attr()等，需要创建实例才能调用
## 单例模式
	$.fn.myPlugin = function(){
		var me = $(this),
			instance = me.data("myPlugin");
		if(!instance){
			me.data("myPlugin", (instance = new myPlugin()));
		}
	};
## 事件委托
委托事件不仅可以给未创建的后代元素绑定事件外，当要监视很多元素时，委托事件开销更小。
***
- 绑定鼠标滚轮事件
*** 
	on("mousewheel DOMMouseScroll", function(e){
		var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		//firefox浏览器鼠标滚轮事件判断方向是反的，这个delta就是鼠标滚轮上下滚动的判断位，大于零则下滚，反之亦然
	});
***
- 绑定键盘事件
jQuery中用.witch属性和.keyCode属性来确定按下了哪个键；left-37,up-38,right-39,down-40
## 关于全屏页面切换效果的实现
- 先关注几个属性与API，首先是`background-image`,用来规定该页面的背景图片；<br>`backgroud-size:cover`意味着将整张图直接套在背景大小上，该图片可能有些部分不会被展示；<br>`tranform`属性使得该元素可以执行一些类似平移，扭动的动画；<br>`jQuery.data()`方法，有参数时执行赋值，无参数时执行取出值的操作。就像从map中取出数据一样，给参数赋一个key就能取出对应的value。我们也可以用这个方法来创建实例。<br>`jQuery的each()`方法为每个匹配元素执行函数;<br>`jQuery的width()`方法，其与`.css(width)`方法不同之处在于，jQ的width方法会返回一个没有单位的数字，特别适合直接用来数学计算，你还根据具体需要为其加上单位，比如"%"或"px"等<br>`.eq(index)`方法，一般是一个集合调用该方法，按照index值来查找元素，比如一个很常见的用法：`items.eq(2).addClass(this.xxx)`,为选中的item动态添加一个类名<br>`offset`方法，返回一个元素相对于全局的坐标，一般再配合`top`,`left`使用，如`offset().left`
- 绑定鼠标滚轮事件
***
	me.element.on("mousewheel DOMMouseScroll", function(e){
		//mousewhell适配大多数浏览器，DOMMouseScroll是火狐专用
		//这个delta就是用来判断鼠标上下滚标志位
		var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		//do somethings...
	})
- sa