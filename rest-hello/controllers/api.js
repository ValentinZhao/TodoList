const Article = require('../model/article');

const article = new Article();

let articleList = [{"title" : "我是新标题111", "createTime" : "2017-8-29", "sourceArticle" : "source article 1","markedArticle" : "前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端", "tags" : "前端经验" },
{"title" : "我是标题2", "createTime" : "2017-8-30", "sourceArticle" : "source article 2", "markedArticle" : "前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端前端", "tags" : "前端经验" }];




module.exports = {
  'GET /api/articlelist': async (ctx, next) => {
    await article.queryAll().then(res => {
      console.log(res)
      articleList = res;
      //设置Content-Type
      ctx.response.type = 'application/json';
      ctx.response.set('Access-Control-Allow-Origin', '*');
      //koa会自动把赋给ctx.response.body的对象转化为JSON并输出到客户端
      ctx.response.body = {
        articleList
      }
    })
    // //设置Content-Type
    // ctx.response.type = 'application/json';
    // ctx.response.set('Access-Control-Allow-Origin', '*');
    // //koa会自动把赋给ctx.response.body的对象转化为JSON并输出到客户端
    // ctx.response.body = {
    //   articleList
    // }
  }
}