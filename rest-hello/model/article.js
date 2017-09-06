const Article = require('./schema/article');

class Article {
  constructor() {
    this.model = Article;
  }

  save (opts) {
    this.entity = new Article(opts);
    return this.entity.save(opts);
  }

  query (opts) {
    return this.model.find(opts)
      .sort({_id:-1})
      .exec();
  }

  queryAll () {
    return this.model.find({})
      .sort({_id:-1})
      .exec();
  }

  queryById (id) {
    return this.model.findById(id);
  }

  remove (id, fn) {
    return this.model.findById(id).then(function (doc) {
      if (!doc) return fn(null, false);
      return doc.remove();
    })
  }
}

module.exports = Article;