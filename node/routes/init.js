const express = require("express");
const app = express(); //创建一个express应用
const cors = require("cors");
const xss = require("xss");

// const history = require("connect-history-api-fallback");
// app.use(history()); //处理vue单页路由时路径没有的问题

app.use(require("./imgProtectMid"));

// session验证
const session = require("express-session");
app.use(
  session({
    secret: "lijiankun",
    name: "sessionid",
  })
);

// 加入cookie-parser 中间件
// 加入之后，会在req对象中注入cookies属性，用于获取所有请求传递过来的cookie
// 加入之后，会在res对象中注入cookie方法，用于设置cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// 应用token中间件
app.use(require("./tokenMiddleware"));

/**
 * 下面这段代码的作用：
 * 当请求时，会根据请求路径(req.path)，从指定的目录中寻找是否存在该文件，如果存在，直接响应文件内容，而不再移交给后续的中间件
 * 如果不存在文件，则直接移交给后续的中间件处理
 * 默认情况下，如果映射的结果是一个目录，则会自动使用index.html文件
 */
const path = require("path");
const staticRoot = path.resolve(__dirname, "../public");
app.use(
  express.static(staticRoot, {
    setHeaders(res, path) {
      if (!path.endsWith(".html")) {
        res.header("Cache-Control", `max-age=${3600*24*365*100}`);
      }
    },
  })
);
// app.use("/static", (req, res) => {
//   console.log(req.baseUrl, req.path);
// });

app.use((req, res, next) => {
  for (const key in req.body) {
    const value = req.body[key];
    req.body[key] = xss(value);
  }
  next();
});

// cors解决跨域
const whiteList = ["null",'http://localhost:5008'];
app.use(
  cors({
    origin(origin, callback) {
      callback(null, "*");//开发用
      // if (!origin) {
      //   callback(null, "*");
      //   return;
      // }
      // if (whiteList.includes(origin)) {
      //   callback(null, origin);
      // } else {
      //   callback(new Error("not allowed"));
      // }
    },
    credentials: true,
  })
);
// app.use(require("./corsMiddleware"));

// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true }));
// app.use(require("./myUrlEncoded"));

// 解析 application/json 格式的请求体
app.use(express.json());

// 使用代理
app.use(require("./proxyMid"));

// 验证码
app.use(require("./captchaMid"));

// 记录api的log
app.use(require("./apiLoggerMid"));

// 处理 api 的请求
app.use("/api/student", require("./api/student"));
// app.use("/api/book", require("./api/book"));
// app.use("/api/class", require("./api/class"));
app.use("/api/admin", require("./api/admin"));
app.use("/api/upload", require("./api/upload"));
// 处理对下载资源的请求
app.use("/res", require("./api/download"));

app.use(require("./errorMiddleware"));

const port = 5008;
app.listen(port, () => {
  console.log(`server listen on ${port}`);
});
