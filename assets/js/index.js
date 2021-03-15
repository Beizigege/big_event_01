$(function () {
    getuSerInfo();
    // 退出
    let layer = layui.layer;
    $("#btnLogout").on("click", function () {
        layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地token
            localStorage.removeItem("token")
            // 2.页面跳转
            location.href = "/login.html"
            layer.close(index);
        });
    })

})
function getuSerInfo() {
    $.ajax({
        url: '/my/userinfo',
        // type: '',
        // headers: {
        //     // 配置头信息，设置token，身份认证
        //     // 重新登录，因为token过期事件12小时
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            readerAvatar(res.data)
        }
    })
}
// 封装 头像渲染
function readerAvatar(user) {
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;" + name);
    if (user.user_pic != null) {
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide()
    } else {
        $(".layui-nav-img").hide();
        $(".text-avatar").show().html(name[0].toUpperCase())
    }
}