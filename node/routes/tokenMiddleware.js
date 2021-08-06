const { getErr } = require("./getSendResult");
const { pathToRegexp } = require("path-to-regexp");
const jwt = require("./jwt");
// const cryptor = require("../util/crypt");//加密用
const needTokenApi = [
  { method: "POST", path: "/api/student" },
  { method: "PUT", path: "/api/student/:id" },
  { method: "GET", path: "/api/student" },
  { method: "GET", path: "/api/admin/whoami" },
];

// 用于解析token
module.exports = (req, res, next) => {
  // /api/student/:id 和  /api/student/1771
  const apis = needTokenApi.filter((api) => {
    const reg = pathToRegexp(api.path);
    return api.method === req.method && reg.test(req.path);
  });
  if (apis.length === 0) {
    next();
    return;
  }

  // jwt
  const result = jwt.verify(req);
  if (result) {
    //认证通过
    req.userId = result.id;
    next();
  } else {
    //认证失败
    handleNonToken(req, res, next);
  }

  // session例子
  // if (req.session.loginUser) {
  //   //说明已经登录过了
  //   next();
  // } else {
  //   handleNonToken(req, res, next);
  // }

  // cookie例子
  // let token = req.cookies.token;
  // if (!token) {
  //   // 从header的authorization中获取
  //   token = req.headers.authorization;
  // }
  // if (!token) {
  //   //没有认证
  //   handleNonToken(req, res, next);
  //   return;
  // }
  // const userId = cryptor.decrypt(token);
  // req.userId = userId;
  // next();
};

//处理没有认证的情况
function handleNonToken(req, res, next) {
  res
    .status(403)
    .send(getErr("you dont have any token to access the api", 403));
}
