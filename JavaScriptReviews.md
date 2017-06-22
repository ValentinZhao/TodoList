# 琐碎知识点
具体的系统复习可以按照

- [前端面试题1](https://github.com/hawx1993/Front-end-Interview-questions)
- [前端面试题2](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions)

## 打岔部分
- [圣杯（固比固、双飞翼）布局](http://www.jianshu.com/p/f9bcddb0e8b4)
- [浏览器内核差异](http://www.cnblogs.com/imwtr/p/4481092.html)

## 闭包（Closure）
  闭包 是指有权访问另一个函数作用域中的变量的函数，创建闭包的**最常见**的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量

- 闭包的缺点就是常驻内存，会增大内存使用量，使用不当很容易造成内存泄露
- 闭包是javascript语言的一大特点，主要应用闭包场合主要是为了：设计私有的方法和变量，避免全局变量的污染

下面举个例子来说明闭包，有一个局部变量a

	function abc(){
	  var a = 1;
	  a++;
	  alert(a);
	}
	abc();  //a=2                     
	abc();  //a=2, 因为每次调用abc的时候都把a重新赋值为1
***
	function abc () {
	  var a = 1;
	  return () => {
	    a++;
	    console.log(a);
	  }
	}
	
	var y = abc();
	y();   //a=2
	y();   //a=3

### 模块化代码，减少全局变量的污染
	var abc = (function(){      //abc为外部匿名函数的返回值
	        var a = 1;
	        return function(){
	                a++;
	                alert(a);
	        }
	})();
	abc();    //2 ；调用一次abc函数，其实是调用里面内部函数的返回值    
	abc();    //3
***
	var aaa = (function(){
	        var a = 1;
	        function bbb(){
	                a++;
	                alert(a);
	        }
	        function ccc(){
	                a++;
	                alert(a);
	        }
	        return {
	                b:bbb,             //json结构
	                c:ccc
	        }
	})();
	aaa.b();     //2
	aaa.c()      //3
##　微信小程序有关wx.request发送问题
给服务器发送`POST`请求在微信小程序中可以用`wx.uploadFile`，这种方法的请求头是`mutipart/form`格式的。还有一种情况是利用`wx.request`设置`method`为`POST`，一般我们数据交互是利用json，在文档中也有介绍可以利用`application/json`来请求，不过我们都遇到了500的坑。这时候没办法只得应用另外一个`application/x-www-urlencoded`这种方式来发送POST请求。这种方式在GET方法时是将参数以query string的方式带在请求url之后，在POST是将参数带在form data请求体里，但发送时应给出一个'json'的key，配合json2Form方法首先将json数据的key与value手动编码成符合该请求头需要的格式，再将本json利用JSON.stringify方法转换成字符串发送给后台即可通信

	function json2Form(json) {
	  var str = [];
	  for (var p in json) {
	    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
	  }
	  return str.join("&");
	}
 
代码具体细节不说，主要看发送细节

	...
	method: 'POST',
    data: common.json2Form({
      json: JSON.stringify({
        'password': password,
        'userId': username
      })}),
	...
### 微信小程序的坑
- wx.request竟然是在wx.getLocation之前调用！就算是写在下面也一样
