// 路由守护，防止其他人输对路由即可进去。接口需要路由守卫
// 采用中间件的形式
module.exports = (options) => {
  return async function adminauth(ctx, next) {
    // 如果session成功，就继续执行，否则返回错误
    // console.log(ctx.session);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { data: "没有登录" };
    }
  };
};
