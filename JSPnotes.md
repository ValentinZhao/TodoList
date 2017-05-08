# JSP教程
JSP（全称Java Server Pages）是由Sun Microsystems公司倡导和许多公司参与共同创建的一种使软件开发者可以响应客户端请求，而动态生成HTML、XML或其他格式文档的Web网页的技术标准。
JSP技术是以Java语言作为脚本语言的，JSP网页为整个服务器端的Java库单元提供了一个接口来服务于HTTP的应用程序。
***
- 它使用JSP标签在HTML网页中插入Java代码。标签通常以`<%`开头以`%>`结束。
## JSP声明
一个声明语句可以声明一个或多个变量、方法，供后面的Java代码使用。在JSP文件中，您必须先声明这些变量和方法然后才能使用它们。
## JSP表达式
一个JSP表达式中包含的脚本语言表达式，先被转化成String，然后插入到表达式出现的地方。
由于表达式的值会被转化成String，所以您可以在一个文本行中使用表达式而不用去管它是否是HTML标签。
表达式元素中可以包含任何符合Java语言规范的表达式，但是不能使用分号来结束表达式。<br>`<%= 表达式 %>`程序示例：
>     <%@ page language="java" contentType="text/html; charset=UTF-8"
>     pageEncoding="UTF-8"%>
>     <!DOCTYPE html>
>     <html>
>     <head>
>     <meta charset="utf-8">
>     <title>菜鸟教程(runoob.com)</title>
>     </head>
>     <body>
>     <p>
>        今天的日期是: <%= (new java.util.Date()).toLocaleString()%>
>     </p>
>     </body>
>     </html>
***
## JSP注释
## JSP指令
- `<%@ page ... %>`，定义页面的依赖属性，比如脚本语言、error页面、缓存需求等等
- `<%@ include ... %>`，包含其他文件
- `<%@ taglib ... %>`，引入标签库的定义，可以是自定义标签
## JSP行为
JSP行为标签使用XML语法结构来控制servlet引擎。它能够动态插入一个文件，重用JavaBean组件，引导用户去另一个页面，为Java插件产生相关的HTML等等。
