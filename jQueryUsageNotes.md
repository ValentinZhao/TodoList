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
例如`$.Ajax()`、`$.extend()`,extend()的作用是将用户自定义参数与插件的默认参数合并。<br>
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
