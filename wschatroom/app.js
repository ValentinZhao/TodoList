const bodyParser = require('koa-bodyparser');
const templating = require('./templating');
const Koa = require('koa');

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