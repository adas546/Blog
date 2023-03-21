"use strict";

const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    // 链接了react_blog数据库，这里请求的是blog_content的表格数据
    // 异步获取数据
    //获取用户表的数据
    // console.warn(this.app);
    // 提供的获取单条数据的方法
    // let result = await this.app.mysql.get("blog_content", {});
    // console.log(result);
    // this.ctx.body = result;
    this.ctx.body = "api hi";
  }
  // 路由跳转到这，就相当于给后台数据库发请求
  async getArticleList() {
    // 表中多个列用逗号隔开
    // sql中时间列是Int类型，采取的是时间戳(距离1970年的秒数来计算)
    let sql =
      "SELECT article.id as id ," +
      "article.title as title ," +
      "article.introduce as introduce ," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
      "article.view_count as view_count ," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.orderNum";
    // query表示可以使用sql语法
    const results = await this.app.mysql.query(sql);
    // 常用是用data包裹一下数据
    this.ctx.body = { data: results };
  }
  // 获取文章详细内容
  async getArticleById() {
    // id是通过前台传过来的
    // let id = this.ctx.params.id;
    let id = this.ctx.query.id;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as article_content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.id as orderNum " +
      "FROM article LEFT JOIN type ON article.type_id = type.orderNum " +
      "WHERE article.id=" +
      id;
    const result = await this.app.mysql.query(sql);
    // console.log(result);
    this.ctx.body = { data: result };
  }
  // 接口: 得到数据库当前存储的所有类别名称和编号
  async getTypeInfo() {
    // 查询type表格，并把获取到的数据全部返回
    const result = await this.app.mysql.select("type");
    this.ctx.body = { data: result };
  }
  // 接口:根据类别id，获得文章列表
  async getListByTypeId() {
    // id通过url获取,记得还要有个.id才能取出数据
    let typeid = this.ctx.query.typeid;
    // console.log(id);
    let sql =
      "SELECT article.id as id ," +
      "article.title as title ," +
      "article.introduce as introduce ," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime ," +
      "article.view_count as view_count ," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.orderNum " +
      "WHERE type_id=" +
      typeid;
    // query表示可以使用sql语法
    const results = await this.app.mysql.query(sql);
    // 常用是用data包裹一下数据
    this.ctx.body = { data: results };
  }
}

module.exports = HomeController;
