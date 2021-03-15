// 开发环境服务器地址
let baseURL = "http://api-breakingnews-web.itheima.net"
// 拦截所有ajax请求：get / post / ajax
// 处理参数
$.ajaxPrefilter(function (options) {
    // 拼接对应环境地址
    options.url = baseURL + options.url;

    if (options.url.indexOf("/my/") != -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    options.complete = function (res) {
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            // 1.清空本地token
            localStorage.removeItem("token")
            // 2.页面跳转
            location.href = "/login.html"
        }
    }

})
