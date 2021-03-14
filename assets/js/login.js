$(function() {
    $('.reg-link').on('click', function() {
        $('.login').hide();
        $('.register').show();
    });
    $('.login-link').on('click', function() {
        $('.login').show();
        $('.register').hide();
    });

    //表单验证规则
    layui.form.verify({
        pass: [/^[\S]{6,12}$/, '密码必须是6-12位，且不能出现空格'],
        repass: function(value) {
            var password = $('#regist-form [name=password]').val().trim();
            if (password != value.trim()) {
                return "两次密码不一致";
            }
        }
    });

    // 登录事件
    // $('#login-form').on('submit', function(e) {
    //     e.preventDefault();
    //     var data = {
    //         username: $('#login-form [name=account]').val().trim(),
    //         password: $('#login-form [name=password]').val().trim()
    //     };
    //     $.ajax({
    //         method: 'post',
    //         url: '/api/login',
    //         data,
    //         success: function(result) {
    //             console.log(result);
    //             if (result.status != 0) {
    //                 return layer.msg(result.message);
    //             }
    //             layer.msg(result.message);
    //         }
    //     });
    // });

    //注册事件
    $('#regist-form').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#regist-form [name=username]').val().trim(),
            password: $('#regist-form [name=password]').val().trim()
        };
        console.log(data);
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data,
            success: function(result) {
                console.log(result);
                if (result.status != 0) {
                    return layer.msg(result.message);
                }
                layer.msg(result.message);
                $('.login-link').click();
            }
        });
    });

    //登录事件
    $('#login-form').submit(function(e) {
        //阻止表单默认提交
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(result) {
                if (result.status != 0)
                    return layer.msg(result.message);

                //用于有权限请求接口认证
                localStorage.setItem('token', result.token);
                location.href = './index.html';
            }
        })
    })


});