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