$(function() {

    //表单验证规则
    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samPwd: function(value) {
            if (value == $('.oldPwd').val())
                return "新旧密码不能相同";
        },
        repass: function(value) {
            if (value != $('#newPwd').val()) {
                return "两次密码不一致";
            }
        }
    });

    //提交事件
    $('.form-modifyPwd').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(result) {
                if (result.status != 0)
                    return layui.layer.msg(result.message);
                layui.layer.msg(result.message);
                console.log(result);
                //dom中表单的重置方法
                $('.form-modifyPwd')[0].reset();
            }
        });
    });
});