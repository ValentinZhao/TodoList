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
- 加table类就是基础表格