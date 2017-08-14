# jQuery使用笔记
##闭包的作用
- 避免全局依赖
- 避免第三方破坏
- 兼容jQuery操作符'$'和jQuery

		(function($){
			//do something...
		})(jQuery);
## jQuery组件开发
- 类级别组件开发
即给jQuery命名空间下添加新的全局函数，也称静态方法

		jQuery.myPlugin = function(){
			//do something...
		};
例如`$.Ajax()`、`$.extend()`,extend()的作用是将用户自定义参数与插件的默认参数合并。其实也就是将后面两个对象中的参数合并到第一个对象中。最后一位的参数有最高优先权，也就是说同样字段的属性后面参数的值会覆盖前面的。<br>
取两位小数 -> **(num / 100).toFixed(2)**

- 对象级别组件开发
即挂载jQuery原型下的方法，这样通过选择器获取的jQuery对象实例也能共享该方法，也称动态方法

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

- 绑定鼠标滚轮事件
 
		on("mousewheel DOMMouseScroll", function(e){
			var delta = e.originalEvent.wheelDelta || 
			-e.originalEvent.detail;
			//firefox浏览器鼠标滚轮事件判断方向是反的，
			//这个delta就是鼠标滚轮上下滚动的判断位，大于零则下滚，
			//反之亦然
		});

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
## jQuery API
- jQuery.map()方法，通过一个函数匹配当前集合中的每个元素,产生一个包含新的jQuery对象。如果你想处理一个简单的数组或对象中，使用jQuery.map()代替。由于返回值是一个jQuery包裹的数组，所以通常会使用get()方法将其转换成普通的数组。.map()方法特别适用于获取或设置元素集合中的值。
- jQuery.join()方法，join() 方法用于把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。
- 关于jQuery的$.ajaxSubmit()方法,它是jQuery的form插件里的一个方法，有些坑，使用时最开始就应保证jQuery版本与表单插件版本是**最新的**。同时，一般来说我们都需要在提交表单的同时附加一些字段给后端，这时候可以与ajax一样把数据放在*data*属性中，不过如果需要对数据进行处理（一般说都需要），可以在*beforeSubmit*属性中，为这个属性写一个方法。**不过坑来了**：需要手动写匿名函数启动该方法！至少暂时是这样的，当然也可以一开始就写$.submit();在submit中，定义option，并将这个option传给ajaxSubmit启动。
- 监听鼠标滚动事件<br>`$(document).on('mousewheel DOMMouseScroll', callback)`
***
### 动态修改元素的类
1. 增加一个class：`$(".default").addClass("hover_s");`
2. 移除一个class：`$(".default").removeClass("default ");`
3. 修改一个class：先增加你要的class，再删掉你不要的
4. 配合鼠标事件的类修改：比如hover事件，那么就是`$(".default").hover(function(){...})`
5. 判断是否有某个类：$.hasClass
***
- 为`<form>`表单添加按钮样式，当这个表单要提交的是文件，比如".xls"文件，要在form标签内同时写`<input>`与`<button>`元素，同时input的type为file，可以随意为button设置样式，最后在JS中利用jQuery找到form，再find这两个元素（$.find('input')）、($.find('button'))，将这两个元素的点击事件关联在一起即可完成点击按钮就提交。**注意**，通过将input的class直接改写为btn是无效的。
- $.text(string)可以为匹配元素设定文本
- 监听元素发生变化，比如input获得了表单的输入，则$.change(function(){...})，同时还支持手动触发。**必须注意的是**，change调用方法只对<span style="color:red"><b>input,select和textarea标签有作用。</b></span>
- Object.getOwnPropertyNames(obj)方法可以轮循所有的属性名
- 修改样式应加上特定的元素，避免全局修改某元素
## 关于`location.href`的一些用法
					self.location.href;
					window.location.href;
					this.location.href;
					location.href;
					parent.location.href;
					top.location.href; 
- 这些都是可以用于跳转页面的方法
- window.location.href与location.href,self.location.href,location.href都是本页面跳转 ，作用一样
- parent.location.href是本页面上一级的页面进行跳转
## jQuery的select2插件
基本使用的话，直接参考[官方文档](https://select2.github.io/examples.html#tags)即可，十分简明扼要的利用小例子讲解了基本API的使用。<br>
同时，我们可以利用jQuery的另外一个插件`iCheck`来美化多选标签的样式
## JSP中的shiro标签学习，简单API总结
- guest标签,用户没有身份验证时显示相应信息，即游客访问信息：`<shiro:guest>欢迎...</shiro:guest>`
- user标签,用户已经身份验证/记住我登录后显示相应的信息:`<shiro:user>欢迎[<shiro:principal/>]登录，<a href="${pageContext.request.contextPath}/logout">退出</a>  </shiro:user>`
- authenticated标签，用户已经身份验证通过，即Subject.login登录成功，不是记住我登录的`<shiro:authticated>用户[<shiro:principal/>]已身份验证通过</shiro:authenticated>`
- notAuthenticated标签，用户已经身份验证通过，即没有调用Subject.login进行登录，包括记住我自动登录的也属于未进行身份验证：`<shiro:notAuthenticated>未身份验证（包括记住我</shiro:notAuthenticated>`
- principle标签,显示用户身份信息，默认调用Subject.getPrincipal()获取，即Primary Principal：`<shiro:principle/>`
- hasRole标签，如果当前Subject有角色将显示body体内容`<shiro:hasRole name="xxx">用户[<shiro:principal/>]拥有角色admin<br/></shiro:hasRole>`
- hasAnyRoles标签,如果当前Subject有任意一个角色（或的关系）将显示body体内容:`<shiro:hasAnyRoles name="admin,user">用户[<shiro:principal/>]拥有角色admin或user<br/></shiro:hasAnyRoles>`
- lacksRole标签，如果当前Subject没有角色将显示body体内容：`<shiro:lacksRole name="abc">用户[<shiro:principal/>]没有角色abc<br/></shiro:lacksRole>  `
- hasPermission标签
- lacksPermission标签
## 前后端交接记录
- 连接href与某个jsp页面，是通过后台的Controller代码，在requestMapping中添加接口
### 五级联动的实现
整个功能最关键的一点就是<br>
`setStreet($(this).find("option:selected").attr("key"));`<br>
这样一行代码的功能。主要就是，我们的数据是类似{key:xxx, value:xxx, parentKey:xxx}的数组，拥有parentKey字段方便我们从二级菜单定位出一级菜单传下来的值，因为一级菜单会传给我们选中的值的key，在二级菜单的处理中，我们的setStreet方法接收到了一级菜单的key，会将这个key与数组中所有类的parentKey属性作比较（forEach），若key与`v.parentKey`相同，则证明拥有parentKey属性的该条数据要被添加至`<option>`中，循环完该组数据即可。那么触发方面的功能，只需要在对应select的jQ对象的change方法中来触发即可。由于事件冒泡机制，我们如果直接将菜单内容append到option中，则不会直接触发下一级的setXXX方法，这时我们可以在option的第一条选项改为“请输入”，来引导用户点击option，触发事件自然就会被调用了。

- 选择某元素的最后一个子元素
	
	$('div p:last').addClass("red"); <br>
	$('div p:last-child').addClass("red");
- 对于动态添加的DOM元素的事件添加
	除了可以使用.live(会引发效率问题)
	我们采用$(document).on('click', '$selector', handler)的方式来添加动态事件即可
