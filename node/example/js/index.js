// ---------------------------jsonp解决跨域--------------
// function jsonp(url) {
//     const script = document.createElement("script");
//     script.src = url;
//     document.body.appendChild(script);
//     script.onload = function () {
//       script.remove();
//     };
// }

// function callback(data) {
//     console.log(data);
// }
  
// jsonp("http://localhost:5008/api/student");

// ------------------------cors解决跨域------------------------

// 简单请求
// fetch("http://127.0.0.1:5008/api/student")
//   .then((resp) => resp.json())
//   .then((resp) => {
//     console.log(resp);
//   });

// 预检请求
fetch("http://localhost:5008/api/student", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    a: 1,
  },
  credentials: "include",
})
  .then((resp) => resp.json())
  .then((resp) => {
    console.log(resp);
  });