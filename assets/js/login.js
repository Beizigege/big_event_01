$(function () {

    // 点击去注册
    $("#link_reg").on("click", () => {
        $(".reg_box").show();
        $(".login_box").hide()
    })

    // 点击去登录
    $("#link_login").on("click", () => {
        $(".login_box").show()
        $(".reg_box").hide();


    })

    // 自定义验证规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (item, value) {
            // console.log(item, value);
            // console.log($(".reg_box input[name=password]").val());
            if (item != $(".reg_box input[name=password]").val()) return "两次密码输入不一致"
        }
    })


    // 注册
    let layer = layui.layer;
    $("#form_reg").on("submit", (e) => {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $(".reg_box input[name=username]").val(),
                password: $(".reg_box input[name=password]").val(),
            },
            success: (res) => {
                if (res.status != 0) return layer.msg(res.message, { icon: 5 });
                // console.log(res);
                layer.msg(res.message, { icon: 6 });
                $("#link_login").click()
                $("#form_reg")[0].reset();
                // console.log($("#form_reg"));
            }
        })
    })
    // console.log(1);
    // 登录
    $("#form_login").on("submit", function (e) {
        // alert(1)
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) return layer.msg(res.message, { icon: 5 });
                // console.log(res);
                localStorage.setItem('token', res.token);
                location.href = "/index.html"
            }
        })
    })
})