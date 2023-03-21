// 后台的接口文件
"use strict";

const Controller = require("egg").Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = "hi api";
  }

  async checkLogin() {
    // 发http请求，肯定会把username和password给发过去的
    // axios虽然用data保存参数，但实际发送的东西还是放在body上了
    // 他这个console.log不会显示body属性(可能是因为太多了？)
    // console.log(this.ctx.request);
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;
    const sql =
      " SELECT userName FROM admin_user WHERE userName = '" +
      userName +
      "' AND password = '" +
      password +
      "'";
    const res = await this.app.mysql.query(sql);
    // console.log(res, userName, password);
    if (res.length > 0) {
      let openId = new Date().getTime(); //直接用时间来作为openId
      // openId存到了这次通信的session上,session存储在服务端，首次访问时会新建，后面访问就会自动查找cookie有无对应key值，根据key值找到session
      // 因此是多个http请求共用一个session(只要都是同一台客户端访问同一台服务器就是这样的)
      this.ctx.session.openId = { openId: openId };
      // openId用于前后台的二次验证,防止多次访问数据库
      this.ctx.body = { data: "登录成功", openId: openId };
    } else {
      this.ctx.body = { data: "登录失败" };
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select("type");
    this.ctx.body = { data: resType };
  }

  async addArticle() {
    let tmpArticle = this.ctx.request.body;
    // console.log(tmpArticle);
    // 插入article表中
    // 插入的时候，会自动id递增?
    const result = await this.app.mysql.insert("article", tmpArticle);
    // 是否插入了一行
    const insertSuccess = result.affectedRows === 1;
    // Id用于告诉修改，避免重新插入
    const insertId = result.insertId;
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId: insertId,
    };
  }
  // 修改文章
  async updateArticle() {
    let tempArticle = this.ctx.request.body;
    // 使用app里的mysql插件里的方法，所以这么写
    const result = await this.app.mysql.update("article", tempArticle);
    // 是否更新成功
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  //获取文章列表
  async getArticleList() {
    // 希望根据id倒序排列,即先看最近发布的文章
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "type.typeName as typeName " +
      "FROM article LEFT JOIN type ON article.type_id = type.orderNum " +
      "ORDER BY article.id DESC ";
    const resList = await this.app.mysql.query(sql);
    // console.log(resList);
    this.ctx.body = { list: resList };
  }
  // 删除文章
  async deleteArticle() {
    let id = this.ctx.params.id;
    const res = await this.app.mysql.delete("article", { id: id });
    this.ctx.body = { data: res };
  }
  // 根据id获得文章内容
  async getArticleById() {
    let id = this.ctx.params.id;
    let sql =
      "SELECT article.id as id," +
      "article.title as title," +
      "article.introduce as introduce," +
      "article.article_content as article_content," +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      "article.view_count as view_count ," +
      "type.typeName as typeName ," +
      "type.orderNum as typeId " +
      "FROM article LEFT JOIN type ON article.type_id = type.orderNum " +
      "WHERE article.id=" +
      id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
}

module.exports = MainController;
