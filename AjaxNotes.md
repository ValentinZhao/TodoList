# AJAX学习笔记&备忘
##使用
	var request = new XMLHttpRequest();
	request.open(method, url, async);
	request.send();
## readyState属性
- 0：请求未初始化，open还没有调用
- 1：服务器连接已经建立，open已经调用了
- 2：服务器已接收，接收到头信息了
- 3：请求处理中，接收到响应主体了
- 4：请求已完成，且响应已就绪，响应完成
## jQuery与Ajax
- jQuery.ajax([settings]),这些settings包括type：方法类型；url：发送请求的地址；data：是一个对象，连同请求发送到服务器的数据；datatype：预期服务器返回的数据类型。比如用json可设置为"json"
- 常用版本库<br>`http://apps.bdimg.com/libs/jquery/1.11.1/jquery.js`
***
实例代码片段

	$(document).ready(function(){
		$('#search').click(function(){
			$.ajax({
				type:"GET",
				url:"service.php?number=" + $('#keyword').val(),
				dataType:"json",
				success:function(){
				
				},
				error:function(jqXHR){
					alert("xxx");
				}
			})
		})
	})
- 跨域方法：代理
- 跨域方法：JSONP，具体就是，将jQuery-Ajax的dataType的"json"改为"jsonp"，并增加一个jsonp属性，为其赋一个"callback"回调函数的名称。jsonp不支持**POST**。