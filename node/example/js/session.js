login.onclick = function () {
    fetch("/api/admin/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        loginId: "admin",
        loginPwd: "123",
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
      });
  };
  
  updateStu.onclick = function () {
    fetch("/api/student/632", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: "于正",
      }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
      });
  };