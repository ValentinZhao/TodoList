var http = require('http');
var url = require('url');
var ws = require('ws');
var wsHandlers = require('./websocketHandler');

const WebSocketServer = ws.Server;

function start(route, handler){
    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;
        var postData = '';
        console.log('Request for ' + pathname + ' Received!');
        req.setEncoding('utf8');
        req.addListener('data', function(postDataChunk){//post的数据，总是被一点点（chunk）传送过来，每次传送过来我们监听这个事件（data事件），并拿到这个chunk
            postData += postDataChunk;
            console.log("Received data chunk " + postData + '.');
        });
        
        //也就是说，router通过传来的pathname来确定要执行handler这个对象要执行的方法，第一个handler是你的所有事件处理程序的集合，pathname来决定到底执行哪个，
        //其实到底执行哪个是由你的输入决定的。最后传入response，在事件处理程序中，对response进行装入数据、设置header等工作使其成为一个有效的response，最后response.end()来结束封装
        req.addListener('end', function(){
            route(handler, pathname, res, req);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log('Server has started!');

    const wss = new WebSocketServer({
        port: 3000
    });
    wsHandlers.onConnect(wss);
}

exports.start = start;