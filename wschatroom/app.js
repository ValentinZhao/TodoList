const bodyParser = require('koa-bodyparser');
const templating = require('./templating');
const Koa = require('koa');
const controller = require('./controller');
const url = require('url');
const ws = require('ws');
const Cookies = require('cookies');

const WebSocketServer = ws.Server;

const app = new Koa();





app.use(async (ctx,next) => {
    console.log('Process ${ctx.request.method} ${ctx.request.url}...');
    await next();
});

//从cookie中读取用户信息
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});

//读取静态文件
let staticFiles = require('./static-files');
app.use(staticFiles('/static/', __dirname + '/static'));

//解析请求体
app.use(bodyParser());

//加入nunjucks
app.use(templating('view', {
    noCache: true,
    watch: true
}));

//加入controller
app.use(controller());

let server = app.listen(3000); // koa app的listen()方法返回http.Server:

function parseUser(obj) {
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log('User: ${user.name}, ID: ${user.id}');
            return user;
        } catch (error) {
            console.log('${error}')
        }
    }
}

function createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
    let wss = new WebSocketServer({
        server: server
    });
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    onConnection = onConnection || function () {
        console.log('[WebSocket] connected');
    };
    onMessage = onMessage || function (msg) {
        console.log('[WebSocket] message received: ' + msg);
    };
    onClose = onClose || function (code, msg) {
        console.log('[WebSocket] closed: ${code} - ${message}');
    };
    onError = onError || function (err) {
        console.log('[WebSocket] error: ' + err);
    };
    wss.on('connection', function(ws) {
        let location = url.parse(ws.upgradeReq.url, true);
        console.log('[WebSocketServer] connection: ' + location.href);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        if (location.pathname !== '/ws/chat') {
            ws.close(4000, 'Invalid url');
        }
        let user = parseUser(ws.upgradeReq);
        if (!user) {
            ws.close(4001, 'Invalid user');
        }
        ws.user = user;
        ws.wss = wss;
        onConnection.apply(ws);
    });
    console.log('WebSocketServer was attached.');
    return wss;
}

var messageIndex = 0;

function createMessage(type, user, data) {
    messageIndex++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

function onConnection () {
    let user = this.user;
    let msg = createMessage('join', user, '${user.name} has joined!');
    this.wss.broadcast(msg);
    let users = this.wss.clients.map(function (client) {
        return client.user;
    });
    this.send(createMessage('list', user, users));
}

function onMessage(message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}

function onClose() {
    let user = this.user;
    let msg = createMessage('left', user, '${user.name} is left!');
    this.wss.broadcast(msg);
}

app.wss = createWebSocketServer(server, onConnection, onMessage, onClose);

console.log('app started at port 3000...');