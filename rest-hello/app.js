const bodyParser = require('koa-bodyparser');
const Koa = require('koa');
const controller = require('./controller');
const database = require('./config/mongoose')();

const app = new Koa();

database.on('error', console.error.bind(console, 'error: connect error!'));
database.once('open', function () {
  console.log('[MongoDB] connection success');
})
app.use(bodyParser());
app.use(controller());
app.listen(3000);
console.log('app started at port 3000...');