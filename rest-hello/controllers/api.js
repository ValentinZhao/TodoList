let products = [{
  name: 'iPhone',
  price: '5288'
}, {
  name: 'kindle',
  price: '1099'
}
];

module.exports = {
  'GET /api/products': async (ctx, next) => {
    //设置Content-Type
    ctx.response.type = 'application/json';
    //koa会自动把赋给ctx.response.body的对象转化为JSON并输出到客户端
    ctx.response.body = {
      products: products
    }
  }
}