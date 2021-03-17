$(function() {
    //获取用户信息
    getUserInfo();

    //退出功能
    $('#index-exit').on('click', function() {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = './login.html';
            layer.close(index);
        });
    });


});

//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(result) {
            if (result.status != 0)
                return layer.msg(result.message);
            //渲染用户信息
            randerUserInfo(result.data);
        }
    });
}

//渲染用户信息
function randerUserInfo(userInfo) {
    var name = userInfo.nickname || userInfo.username;
    $('.welcome').text(name);
    var imgAvater = $('.layui-nav-img');
    var textAvater = $('.text-avater');

    if (userInfo.user_pic) {
        //渲染图片头像
        imgAvater.show();
        textAvater.hide();
        imgAvater.attr('src', userInfo.user_pic);
    } else {
        //渲染文字头像
        imgAvater.hide();
        textAvater.show();
        textAvater.text(name[0].toUpperCase());
    }

}