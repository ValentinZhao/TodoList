/**
 * controllers目录扫描
 * 在addMapping中把controllers下的所有请求对应到router中，最后统一router.routes()
 */
const fs = require('fs');

function addMapping (router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else if (url.startsWith('PUT ')){
      let path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${path}`);
    } else if (url.startsWith('DELETE ')) {
      let path = url.substring(7);
      router.delete(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${path}`);
    } else {
      console.log('INVALID url!!!');
    }
  }
}

function addController (router, dir) {
  fs.readdirSync(__dirname + '/' + dir).filter((f) => {
    return f.endsWith('.js');
  }).forEach((v) => {
    console.log(`processing controller ${v}`);
    let mapping = require(__dirname + '/' + dir + '/' + v);
    addMapping(router, mapping);
  });
}

module.exports = function (dir) {
  let controller_dir = dir || 'controllers';
  let router = require('koa-router')();
  addController(router, controller_dir);
  return router.routes();
}