// 开发环境服务器地址
let baseURL = "http://api-breakingnews-web.itheima.net"
// 拦截所有ajax请求：get / post / ajax
// 处理参数
$.ajaxPrefilter(function (options) {
    // 拼接对应环境地址
    options.url = baseURL + options.url;
})