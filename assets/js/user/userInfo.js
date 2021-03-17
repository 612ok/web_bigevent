$(function() {

    initformUser();

    layui.form.verify({
        nickname: function(value) {
            if (value.length > 6)
                return '用户昵称只能是1-6个字符'
        }
    })

    //提交修改
    $('.form-userinfo').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(result) {
                if (result.status != 0)
                    return layer.msg(result.message);
                layer.msg(result.message);
                //渲染头部导航栏昵称
                window.parent.getUserInfo();
            }
        });
    });

    //重置按钮
    $('.reset-btn').click(function(e) {
        e.preventDefault();
        initformUser();
    })
});

//初始化表单用户信息
function initformUser() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(result) {
            if (result.status != 0)
                return layer.msg(result.message);
            //快速设置表单中的值
            layui.form.val('form-userinfo', result.data);
        }
    });
}