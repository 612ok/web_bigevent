$(function() {
    getUserInfo();
});

//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token')
        },
        success: function(result) {
            console.log(result);
        }
    })
}