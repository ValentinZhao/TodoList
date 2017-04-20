# Bootstrap Notes
2011年，twitter的“一小撮”工程师为了提高他们内部的分析和管理能力，用业余时间为他们的产品构建了一套易用、优雅、灵活、可扩展的前端工具集--BootStrap。Bootstrap由MARK OTTO和Jacob Thornton所设计和建立，在github上开源之后，迅速成为该站上最多人watch&fork的项目。大量工程师踊跃为该项目贡献代码，社区惊人地活跃，代码版本进化非常快速，官方文档质量极其高(可以说是优雅)，同时涌现了许多基于Bootstrap建设的网站：界面清新、简洁;要素排版利落大方。

## 介绍
- 简单灵活可用于架构流行的用户界面和交互接口的html、css、javascript工具集。
- 基于html5、css3的bootstrap，具有大量的诱人特性：友好的学习曲线，卓越的兼容性，响应式设计，12列格网，样式向导文档。
- 自定义JQuery插件，完整的类库，基于Less等。
## 引用
	<!DOCTYPE HTML>
	<html lang="en">
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<title>Bootstrap的HTML标准模板</title>   
	        <!-- Bootstrap -->
	        <link href="css/bootstrap.min.css" rel="stylesheet">
	        <!--你自己的样式文件 -->
	        <link href="css/your-style.css" rel="stylesheet">        
	        <!-- 以下两个插件用于在IE8以及以下版本浏览器支持HTML5元素和媒体查询，如果不需要用可以移除 -->
	        <!--[if lt IE 9]>
	        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	        <![endif]-->
	    </head>
	    <body>
	        <h1>Hello, world!</h1>
	        
	        <!-- 如果要使用Bootstrap的js插件，必须先调入jQuery -->
	        <script src="http://libs.baidu.com/jquery/1.9.0/jquery.min.js"></script>
	        <!-- 包括所有bootstrap的js插件或者可以根据需要使用的js插件调用　-->
	        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script> 
	    </body>
	</html>
如上就是一个基础的模版代码

## 具体
### 全局样式
具体使用可以直接查询使用手册，如颜色，对齐等。需要注意的是，若要自定义标签属性我们直接覆盖bootstrap中的属性即可。
### Bootstrap中的代码
code、kbd、pre...不管使用哪种代码风格，在代码中碰到小于号（<）要使用硬编码“& lt;”来替代，大于号(>)使用“& gt;”来替代。<br>
pre的滚动条 -> class="pre-scrollable"
### 表格
	<table class="table table-bordered">
  		<thead>
    <tr>
      <th>类名</th>
      <th>描述</th>
    </tr>
  	</thead>
 	 	<tbody>
    <tr class="active">
      <td>.active</td>
      <td>表示当前活动的信息</td>
    </tr>
    <tr class="success">
      <td>.success</td>
      <td>表示成功或者正确的行为</td>
    </tr>
    <tr class="info">
      <td>.info</td>
      <td>表示中立的信息或行为</td>
    </tr>
    <tr class="warning">
      <td>.warning</td>
      <td>表示警告，需要特别注意</td>
    </tr>
    <tr class="danger">
      <td>.danger</td>
      <td>表示危险或者可能是错误的行为</td>
    </tr>
 	 	</tbody>
	</table>
- 加table类就是基础表格，**一定不能缺少**
- 在table后加table-striped类名就是斑马线表格
- table-hover悬浮高亮表格
- table-condensed紧凑型
- table-responsive响应式表格
### 表单
表单主要功能是用来与用户做交流的一个网页控件，良好的表单设计能够让网页与用户更好的沟通。表单中常见的元素主要包括：文本输入框、下拉选择框、单选按钮、复选按钮、文本域和按钮等。其中每个控件所起的作用都各不相同，而且不同的浏览器对表单控件渲染的风格都各有不同。<br>
对于基础表单，Bootstrap并未对其做太多的定制性效果设计，仅仅对表单内的fieldset、legend、label标签进行了定制。<br>
***
- 输入框input,可以为它加一个"form-control"的属性以保证样式不出错
- 下拉选择框select，多行选择使用multiple,样式还是用form-control<br>`<select> <option>`
- 文本域textarea rows属性可以控制输入行数
- 关于checkbox与radiobutton的话，先都用label包起来，将容器div的类名改为checkbox或radio
>     <div class="checkbox">
> 	<label>
> 	  <input type="checkbox" value="">
> 	  记住密码
> 	</label>
> 	  </div>
> 	  <div class="radio">
> 	<label>
> 	  <input type="radio" name="optionsRadios" id="optionsRadios1" value="love" checked>
> 	  喜欢
> 	</label>
> 	  </div>
***
- 需要水平排列的checkbox与radio只需要将label类名声明为"checkbox-inline"和"radio-inline"即可
- 按钮控件，在button标签内的类名声明为"btn btn-xxx"即可，比如


>     <button class="btn btn-primary" href="#">Primary</button>
>     <button class="btn btn-info" href="#">info</button>
>     <button class="btn btn-success" href="#">success</button>
>     <button class="btn btn-warning" href="#">warning</button>
>     <button class="btn btn-danger" href="#">danger</button>
>     <button class="btn btn-inverse" href="#">inverse</button>
***
- 表单控件大小，可以在input的form-control类名之后直接加input-sm,input-lg;或者在容器div中加属性类名"col-xs-4", "col-xs-4"等等。示例代码如下
>     <div class="form-group">
>     <label class="control-label">控件变小</label>
>      <input class="form-control input-sm" type="text" placeholder="添加.input-sm，控件变小">
>     </div>
>     
>     <div class="col-xs-4">
>      <input class="form-control input-lg" type="text" placeholder=".col-xs-4">
>    </div>
***
- 表单的禁用状态，在有"form-control"的表单控件后加上“disabled”即可禁用；若之前没有form-control，只会出现将cursor变为not-allowed样式但依然可以输入；再有就是fieldset标签后直接加disabled会将整个输入域全部禁用，**只有legend包裹的input可以幸免于难**。
- 表单的验证状态，主要就是"has-success","has-warning","has-error"的几个属性的添加，具体可看以下代码。带有"glyphicon glyphicon-warning-sign form-control-feedback"类名属性的标签在提醒时还会有一个图标的提示。
>     <form role="form">
>     <div class="form-group has-success">
>         <label class="control-label" for="inputSuccess1">成功状态</label>
>         <input type="text" class="form-control" id="inputSuccess1" placeholder="成功状态" >
>     </div>
>     <div class="form-group has-warning">
>         <label class="control-label" for="inputWarning1">警告状态</label>
>         <input type="text" class="form-control" id="inputWarning1" placeholder="警告状态">
>     </div>
>     <div class="form-group has-error">
>         <label class="control-label" for="inputError1">错误状态</label>
>         <input type="text" class="form-control" id="inputError1" placeholder="错误状态">
>     </div>
>     </form>
>     <form role="form">
>     <div class="form-group has-success has-feedback">
>         <label class="control-label" for="inputSuccess1">成功状态</label>
>         <input type="text" class="form-control" id="inputSuccess1" placeholder="成功状态" >
>         <span class="glyphicon glyphicon-ok form-control-feedback"></span>
>     </div>
>     <div class="form-group has-warning has-feedback">
>         <label class="control-label" for="inputWarning1">警告状态</label>
>         <input type="text" class="form-control" id="inputWarning1" placeholder="警告状态">
>         <span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>
>     </div>
>     <div class="form-group has-error has-feedback">
>         <label class="control-label" for="inputError1">错误状态</label>
>         <input type="text" class="form-control" id="inputError1" placeholder="错误状态">
>         <span class="glyphicon glyphicon-remove form-control-feedback"></span 
>     </div> 
***
- 那么有关表单验证状态的提示信息，比如在密码输入错误后在输入框下方用红色字体提示“密码有误”，bootstrap提供了"help-block"类，配合上一条的"has-success has-feedback"属性来优化提示界面。
### 按钮
- 按钮种类
>     <button class="bn" >基础按钮.btn</button> 
>     <button class="btn btn-default" >默认按钮.btn-default</button>
>     <button class="btn btn-primary" type="button">主要按钮.btn-primary</button>
>     <button class="btn btn-success" >成功按钮.btn-success</button>
>     <button class="btn btn-info" type="button">信息按钮.btn-info</button>
>     <button class="btn btn-warning" type="button">警告按钮.btn-warning</button>
>     <button class="btn btn-danger" type="button">危险按钮.btn-danger</button>
>     <button class="btn btn-link" type="button">链接按钮.btn-link</button>
***
- 关于按钮样式，在bootstrap中可以为任何标签添加"btn btn-default"等将该标签变为一个按钮。但不推荐这么做因为不符合响应式设计而且会出现浏览器不支持的情况。
- 关于按钮大小，bootstrap提供了三个类名控制大小。大型：btn-lg，小型：btn-sm，微型：btn-xs
- 关于按钮的display,默认缺省设置是inline-block，也就是多个按钮可存在于同一行。我们可以手动添加类名"btn-block"使它们分占各行并且占满width
- 关于按钮的禁用，跟input类似，可以通过给类名添加disabled来禁用，也可以直接添加一个disabled属性，设置为disabled
### 图标
- 一段例子
>     <span class="glyphicon glyphicon-search"></span>
>	    <span class="glyphicon glyphicon-asterisk"></span>
>	    <span class="glyphicon glyphicon-plus"></span>
>	    <span class="glyphicon glyphicon-cloud"></span>
***
具体的一些图标的类名可以参照下图
![](http://img.mukewang.com/53db07d100018d5010500434.jpg)
### 网格
- 注意列组合数字不能超过12
- 列偏移，col-md-offset-x，可以通过改变x来控制偏移。注意还是不要超过12
- 网格列也可以嵌套，注意包裹内的列也不要超过12行否则会换行显示
### 下拉菜单
- 在使用Bootstrap框架的下拉菜单时，必须调用Bootstrap框架提供的bootstrap.js文件。当然，如果你使用的是未编译版本，在js文件夹下你能找到一个名为“dropdown.js”的文件。你也可以调用这个js文件。
- 因为Bootstrap的组件交互效果都是依赖于jQuery库写的插件，所以在使用bootstrap.min.js之前一定要先加载jquery.min.js才会生效果。
- 一个Demo演示
>     <!DOCTYPE HTML>
>     <html>
>     <head>
>     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
>     <title>下拉菜单</title>
>     <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
>     <link rel="stylesheet" href="style.css">
>     </head>
>     <body>
> 
>     <div class="dropdown">
>     <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
>     下拉菜单
>     <span class="caret"></span>
>       </button>
>       <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
>         <li role="presentation"><a role="menuitem" tabindex="-1" href="#">下拉菜单项</a></li>
>         <li role="presentation"><a role="menuitem" tabindex="-1" href="#">下拉菜单项</a></li>
>         <li role="presentation"><a role="menuitem" tabindex="-1" href="#">下拉菜单项</a></li>
>         <li role="presentation"><a role="menuitem" tabindex="-1" href="#">下拉菜单项</a></li>
>       </ul>
>     </div
>     <script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
>     <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script
>     </body>
>     </html>
***
- 添加分割线<br>
`<li role="presentation" class="divider"></li>`
- 为下拉菜单的各个部分添加标题<br>
`<li role="presentation" class="dropdown-header">第一部分菜单头部</li>`
- Bootstrap框架中下拉菜单默认是**左对齐**，如果你想让下拉菜单相对于父容器右对齐时，可以在“dropdown-menu”上添加一个**“pull-right”**或者**“dropdown-menu-right”**类名
- 通过为li设定disabled或actvie类名来使得菜单中的选项不能/可以被点击。
### 按钮组
- 使用类名为"btn-group"
- 按钮组和下拉菜单组件一样，需要依赖于button.js插件才能正常运行。不过我们同样可以直接只调用bootstrap.js文件。因为这个文件已集成了button.js插件功能。
- 通过"btn-group-lg","btn-group-sm","btn-group-xs"来调整大小，这一组的按钮都会变成一样的大小
- 关于按钮组与下拉菜单的组合：在按钮的样式类名中添加"dropdown-toggle"并且加入data-toggle="dropdown"的属性，就可以在一串按钮组中，将其中一个按钮变为下拉菜单的触发按钮。注意，最好在文字后添加一个`<span class="caret"></span>`用来制作一个向下的小箭头，提示用户可以下拉，营造良好的体验。注意，即使上层是一个"btn-group"，我们在单独做这个按键下拉时，要把这个按键放到一个新的"btn-group"中，在这个新的group中，把我们要做的按键放进去，同时把dropdown-menu放进去即可。比如
>     <div class="btn-group">
>     <button class="btn btn-default" type="button">首页</button>
>     <button class="btn btn-default" type="button">产品展示</button>
>     <button class="btn btn-default" type="button">案例分析</button>
>     <button class="btn btn-default" type="button">联系我们</button>
>     <div class="btn-group">
>         <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button">关于我们<span class="caret"></span></button>
>     <ul class="dropdown-menu">
>     	    <li><a href="##">公司简介</a></li>
>     	    <li><a href="##">企业文化</a></li>
>     	    <li><a href="##">组织结构</a></li>
>     	    <li><a href="##">客服服务</a></li>
>     </ul>
>     </div>
***
- 把按钮组做成垂直的，就是把"btn-group"换成"btn-group-vertical"
- 做几个按钮平分界面（类似Android中的令各view的layout:weight=1）的效果，就是在"btn-group"后添加"btn-group-justified"类名
- 注意，若是要把上述点击弹出下拉菜单效果做成“上弹菜单”，只需要在**包裹这个菜单弹出按钮**的"btn-group"后添加"dropup"类名。加在最外层的"btn-group"后是无效的。
### 导航

- 一般是直接在`<ul>`处直接加"nav",并且我们可以指定"nav-tabs"等样式
>     <ul class="nav nav-tabs">
>         <li><a href="##">Home</a></li>
>         <li><a href="##">CSS3</a></li>
>  	    <li><a href="##">Sass</a></li>
>  	    <li><a href="##">jQuery</a></li>
>      	<li><a href="##">Responsive</a></li>
>     </ul>
***
- 胶囊型导航 "nav-pills"
- 垂直堆叠的导航栏 "nav nav-pills nav-stacked",同时nav中也支持为li添加"disabled"类来使其变为禁用状态。因为li都是可选中的，也可以为其添加"active"类来变化其样式
- "nav-justified"用来使得导航栏自适应整个浏览器窗口大小
- 导航栏二级菜单：只需要将li当作父容器，使用类名“dropdown”，同时在li中嵌套另一个列表ul，使用前面介绍下拉菜单的方法就可以，具体看下面代码
>     <ul class="nav nav-pills">
>     <li class="active"><a href="##">首页</a></li>
>     <li class="dropdown">
>       <a href="##" class="dropdown-toggle" data-toggle="dropdown">教程<span class="caret"></span></a>
>       <ul class="dropdown-menu">
>           <li><a href="##">CSS3</a></li>
>           <li><a href="##">Sass</a></li>
>           <li><a href="##">jQuery</a></li>
>           <li><a href="##">Responsive</a></li>
>       </ul>
>     </li>
>     <li><a href="##">关于我们</a></li>
>     </ul>
***
- Breadcrumb面包屑式导航，主要用于告知用户自己所处页面的位置。只需要为ol添加"breadcrumb"类名即可
### 导航条
- 第一步：首先在制作导航的列表(`<ul class=”nav”>`)基础上添加类名“navbar-nav”

第二步：在列表外部添加一个容器（div），并且使用类名“navbar”和“navbar-default”
>     <div class="navbar navbar-default" role="navigation">
>         <ul class="nav navbar-nav">
> 	 	   <li class="active"><a href="##">网站首页</a></li>
>            <li><a href="##">系列教程</a></li>
>            <li><a href="##">名师介绍</a></li>
>            <li><a href="##">成功案例</a></li>
>            <li><a href="##">关于我们</a></li>
> 	    </ul>
>     </div>
***
>     <div class="navbar navbar-default" role="navigation">
>     <div class="navbar-header">
>         <a href="##" class="navbar-brand">慕课网</a>
>     </div>
> 	<ul class="nav navbar-nav">
> 	 	<li class="active"><a href="##">网站首页</a></li>
>         <li class="dropdown">
>             <a href="##" data-toggle="dropdown" class="dropdown-toggle">系列教程<span class="caret"></span></a>
>             <ul class="dropdown-menu">
>         	    <li><a href="##">CSS3</a></li>
>         	    <li><a href="##">JavaScript</a></li>
>         	    <li class="disabled"><a href="##">PHP</a></li>
>             </ul>
>         </li>
>         <li><a href="##">名师介绍</a></li>
>         <li><a href="##">成功案例</a></li>
>         <li><a href="##">关于我们</a></li>
>     </ul>
>     </div>
***
- 带表单：在Bootstrap框架中提供了一个“navbar-form”，使用方法很简单，在navbar容器中放置一个带有navbar-form类名的表单
>     <form action="##" class="navbar-form navbar-left" rol="search">
>    	    <div class="form-group">
>    		   <input type="text" class="form-control" placeholder="请输入关键词" />
>    	    </div>
>         <button type="submit" class="btn btn-default">搜索</button>
>     </form>
***
- 在上面的示例中，大家看到了“navbar-left”让表单左浮动，更好实现对齐。在Bootstrap框架中，还提供了“navbar-right”样式，让元素在导航条靠右对齐。
- 导航条中的按钮navbar-btn
，导航条中的文本navbar-text，
导航条中的普通链接navbar-link
- **固定导航条**：只要在<span style="color:red">最外层容器</span>上添加"nav-fixed-top"或者"nav-fixed-bottom"就可以了
- 响应式导航条，观察如下效果
![](http://img.mukewang.com/53eded3b0001db2a06970046.jpg)<br>*宽屏时效果*
![](http://img.mukewang.com/53f580af00017ef408720073.jpg)
<br>*中屏时效果*
![](http://img.mukewang.com/53f580e30001bba208690079.jpg)
<br>*窄屏时效果*
***
1. 保证在窄屏时需要折叠的内容必须包裹在带一个div内，并且为这个div加入collapse、navbar-collapse两个类名。最后为这个div添加一个class类名或者id名
2. 保证在窄屏时要显示的图标样式（固定写法）
`<button class="navbar-toggle" type="button" data-toggle="collapse">`
`<span class="sr-only">Toggle Navigation</span>`
`</button>`
3. 并为button添加data-target=".类名/#id名"，究竞是类名还是id名呢？由**需要折叠的div**来决定。
>     <div class="navbar navbar-default" role="navigation">
>     <div class="navbar-header">
>      　<!-- .navbar-toggle样式用于toggle收缩的内容，即nav-collapse collapse样式所在元素 -->
>        <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-responsive-collapse">
>          <span class="sr-only">Toggle Navigation</span>
>          <span class="icon-bar"></span>
>          <span class="icon-bar"></span>
>          <span class="icon-bar"></span>
>        </button>
>        <!-- 确保无论是宽屏还是窄屏，navbar-brand都显示 -->
>        <a href="##" class="navbar-brand">慕课网</a>
>     </div>
>     <!-- 屏幕宽度小于768px时，div.navbar-responsive-collapse容器里的内容都会隐藏，显示icon-bar图标，当点击icon-bar图标时，再展开。屏幕大于768px时，默认显示。 -->
>     <div class="collapse navbar-collapse navbar-responsive-collapse">
>     	<ul class="nav navbar-nav">
>       		<li class="active"><a href="##">网站首页</a></li>
>       		<li><a href="##">系列教程</a></li>
>       		<li><a href="##">名师介绍</a></li>
>       		<li><a href="##">成功案例</a></li>
>       		<li><a href="##">关于我们</a></li>
> 	 	</ul>
>     </div>
>     </div>
***
- 反色导航条：navbar-inverse
- 分页导航
- 跟分页类似，还有提供“上一页”，“下一页”的类：**“pager"**，并能在其中的属性设置"previous"、"next"来设置左右对齐
- 标签 "label label-xxx"(default, primary, success...)
![](http://img.mukewang.com/53f5a3810001256d05550068.jpg)
- 徽章，跟标签一样，使用span标签来制作，加入"badge"类
### 缩略图
- thumbnail类名
- 还可以让缩略图配合标题、描述内容，按钮等：在仅有缩略图的基础上，添加了一个div名为“caption“的容器，在这个容器中放置其他内容，比如说标题，文本描述，按钮等
### 警示框
- "alert alert-success"，还有info,warning,danger。具体使用的时候，可以在类名为“alert”的div容器里放置提示信息。实现不同类型警示框，只需要在“alert”基础上追加对应的类名
