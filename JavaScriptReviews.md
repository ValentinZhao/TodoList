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

