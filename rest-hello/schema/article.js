const mongoose = require('mongoose');

/**
 * schema相当于创建的是表结构，schema不能直接进行CURD
 * 但是利用schema生成的model就拥有操作数据库的能力了
 */
const articleSchema = new mongoose.Schema({
  title: String,
  createTime: String,
  sourceArticle: String,
  markedArticle: String,
  tags: String
}, {
  versionKey: false
});

module.exports = mongoose.model('articlelist', articleSchema);