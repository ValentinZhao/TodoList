let articleList = [{
  _id: 101,
  title: '我是标题1',
  createTime: '2017-8-29',
  markedArticle: '前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端',
  tags: '前端经验'
}, {
  _id: 102,
  title: '我是标题2',
  createTime: '2017-8-30',
  markedArticle: '前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端',
  tags: '前端经验'
}];

module.exports = {
  'GET /api/articlelist': async (ctx, next) => {
    //设置Content-Type
    ctx.response.type = 'application/json';
    ctx.response.set('Access-Control-Allow-Origin', '*');
    //koa会自动把赋给ctx.response.body的对象转化为JSON并输出到客户端
    ctx.response.body = {
      articleList
    }
  }
}