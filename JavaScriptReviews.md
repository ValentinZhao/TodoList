# 琐碎知识点
具体的系统复习可以按照

- [前端面试题1](https://github.com/hawx1993/Front-end-Interview-questions)
- [前端面试题2](https://github.com/markyun/My-blog/tree/master/Front-end-Developer-Questions)
- [某大神2017前端面经](https://juejin.im/post/58cdf9285c497d0057c3b591)

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
- JavaScript正则表达式匹配全角空格的Unicode编码为\u3000
- 不要用Date().toLocaleDateString()方法来获取本地系统时间，尤其用它来做时间格式化的时候，在不同浏览器上获取的时间格式不同，正则未必能校验成功
- 不要随便给view设置width！！！

##关于类Android Tablayout+ViewPager的移动端组件实现原理
这样的一个组件其实不难，结合Hammer.js来实现手势识别是很容易的。关键是有一个技术点，就是滑动下部pager页时，我希望上面的tab条也跟着移动。这需要我在左滑右滑(hammer的swipeleft,swiperight事件)中，以自己的index做参量，乘以一个步长，这个步长由我的index与字体大小的商来决定；有了这个步长我就可以设置我在左滑右滑到指定位置时，我应该利用margin-left设置的负值使得这个tab条移动多少：负值越小，则越向右，vice versa。

## Node.js笔记
###基本模块
- global，Node.js环境的唯一全局变量，像浏览器的window

	&gt; global.console<br>
	Console {
	  log: [Function: bound ],
	  info: [Function: bound ],
	  warn: [Function: bound ],
	  error: [Function: bound ],
	  dir: [Function: bound ],
	  time: [Function: bound ],
	  timeEnd: [Function: bound ],
	  trace: [Function: bound trace],
	  assert: [Function: bound ],
	  Console: [Function: Console] }

- process也是Node.js提供的一个对象，它代表当前Node.js进程。通过process对象可以拿到许多有用信息

	> process === global.process;
	true
	> process.version;
	'v5.2.0'
	> process.platform;
	'darwin'
	> process.arch;
	'x64'
	> process.cwd(); //返回当前工作目录
	'/Users/michael'
	> process.chdir('/private/tmp'); // 切换当前工作目录
	undefined
	> process.cwd();
	'/private/tmp'

Node.js不断执行响应事件的JavaScript函数，直到没有任何响应事件的函数可以执行时，Node.js就退出了。如果我们想要在下一次事件响应中执行代码，可以调用`process.nextTick()`

	// process.nextTick()将在下一轮事件循环中调用:
	process.nextTick(function () {
	    console.log('nextTick callback!');
	});
	console.log('nextTick was set!');
用Node执行上面的代码,得到结果是

	nextTick was set!
	nextTick callback!
- 判断JavaScript运行环境

		if(typeof(window) === 'undefined'){
			console.log('node');
		} else {
			console.log('browser');
		}
###其他模块
- fs模块，Node.js内置的fs模块就是文件系统模块，负责读写文件。
异步读文件代码如下

		'use strict';
		
		var fs = require('fs');
		
		fs.readFile('sample.txt', 'utf-8', function (err, data) {
		    if (err) {
		        console.log(err);
		    } else {
		        console.log(data);
		    }
		});
当正常读取时，err参数为null，data参数为读取到的String。当读取发生错误时，err参数代表一个错误对象，data为undefined。这也是Node.js标准的回调函数：第一个参数代表错误信息，第二个参数代表结果。
同步读文件

		try {
		    var data = fs.readFileSync('sample.txt', 'utf-8');
		    console.log(data);
		} catch (err) {
		    // 出错了
		}
写文件，通过`fs.writeFile()`实现;同步方法也是`writeFileSync`

		var fs = require('fs');
		
		var data = 'Hello, Node.js';
		//writeFile()的参数依次为文件名、数据和回调函数。
		//如果传入的数据是String，默认按UTF-8编码写入文本文件，如果传入的参数是Buffer，则写入的是二进制文件。
		//回调函数由于只关心成功与否，因此只需要一个err参数。
		fs.writeFile('output.txt', data, function (err) {
		    if (err) {
		        console.log(err);
		    } else {
		        console.log('ok.');
		    }
		});
- stat，如果我们要获取文件大小，创建时间等信息，可以使用fs.stat()，它返回一个Stat对象，能告诉我们文件或目录的详细信息：
var fs = require('fs');

		fs.stat('sample.txt', function (err, stat) {
		    if (err) {
		        console.log(err);
		    } else {
		        // 是否是文件:
		        console.log('isFile: ' + stat.isFile());
		        // 是否是目录:
		        console.log('isDirectory: ' + stat.isDirectory());
		        if (stat.isFile()) {
		            // 文件大小:
		            console.log('size: ' + stat.size);
		            // 创建时间, Date对象:
		            console.log('birth time: ' + stat.birthtime);
		            // 修改时间, Date对象:
		            console.log('modified time: ' + stat.mtime);
		        }
		    }
		});

由于Node环境执行的JavaScript代码是服务器端代码，所以，绝大部分需要在服务器运行期反复执行业务逻辑的代码，必须使用异步代码，否则，同步代码在执行时期，服务器将停止响应，因为JavaScript只有一个执行线程。

服务器启动时如果需要读取配置文件，或者结束时需要写入到状态文件时，可以使用同步代码，因为这些代码只在启动和结束时执行一次，不影响服务器正常运行时的异步执行。

- stream，