// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    //http://ajax.frontend.itheima.net
    //http://api-breakingnews-web.itheima.net
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options.url);
    //统一设置headers
    if (options.url.indexOf('/my/') != -1) {
        options.headers = { Authorization: localStorage.getItem('token') || '' };
    }


    //全局统一挂载complete回调函数
    options.complete = function(res) {


        console.log('res:' + res.responseJSON);
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            //强制清空token
            localStorage.removeItem('token');
            location.href = '/新课练习/04-第四阶段前后端交互/大事件后台管理系统项目/login.html';
        }


    }
});