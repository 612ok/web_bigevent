$(function() {
    //$('#article-list', parent.document).addClass('layui-this').siblings().removeClass("layui-this");
    var option = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    };
    //时间过滤器
    template.defaults.imports.dataFormat = function(time) {
        var date = new Date(time);
        var y = addZeor(date.getFullYear());
        var m = addZeor(date.getMonth() + 1);
        var d = addZeor(date.getDate());
        var h = addZeor(date.getHours());
        var minu = addZeor(date.getMinutes());
        var s = addZeor(date.getSeconds());
        return y + '-' + m + '-' + d + ' ' + h + ':' + minu + ':' + s;
    }
    renderSelectCate();
    renderCateList();
    screen();
    del();


    $('body').on('click', '.bt-edit', function() {
        var id = $(this).attr('data-id');
        $.ajax({
            method: 'get',
            url: '/my/article/' + id,
            success: function(result) {
                console.log(result);
                if (result.status != 0)
                    return layui.layer.msg(result.message);
                location.href = './article-publish.html';
                //template.defaults.imports.data = result.data;
                // console.log(111);
                // $('[name=title]').val(result.data.title);
                // $('[name=cate_id]').val(result.data.cate);
                // $('[name=content]').html(result.data.content);
                // $('#image').attr('src', result.data.cover_img);

            }
        });

    });
    //筛选功能
    function screen() {
        $('.form-screen').on('submit', function(e) {
            e.preventDefault();
            option.cate_id = $('[name=select-cate]').val();
            option.state = $('[name=state]').val();
            console.log(option.cate_id, option.state);
            renderCateList();
        });
    }
    //删除功能
    function del() {

        $('body').on('click', '.bt-delete', function() {
            var id = $(this).attr('data-id');
            var length = $('.bt-delete').length;
            layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
                $.ajax({
                    method: 'get',
                    url: '/my/article/delete/' + id,
                    success: function(result) {
                        console.log(result);
                        if (result.status != 0)
                            return layui.layer.msg(result.message);
                        //判断当前页删完没有
                        if (length == 1) {
                            option.pagenum = option.pagenum == 1 ? 1 : option.pagenum - 1;
                        }

                        renderCateList();
                    }
                });
                layer.close(index);
            });

        });
    }

    //分页功能区
    function paging(total) {
        var laypage = layui.laypage;
        //执行一个laypage实例
        laypage.render({
            elem: 'paging', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: option.pagesize,
            curr: option.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 触发 jump 回调的方式有两种：
            // 1. 点击页码的时候，会触发 jump 回调
            // 2. 只要调用了 laypage.render() 方法，就会触发 jump 回调
            jump: function(obj, first) {
                // 可以通过 first 的值，来判断是通过哪种方式，触发的 jump 回调
                // 如果 first 的值为 true，证明是方式2触发的
                // 否则就是方式1触发的

                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                option.pagesize = obj.limit;
                option.pagenum = obj.curr;
                //首次不执行
                if (!first) {
                    renderCateList();
                }
            }
        });
    }



    //渲染类别下拉框中的内容
    function renderSelectCate() {
        var layer = layui.layer;
        var form = layui.form;
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(result) {
                if (result.status != 0)
                    return layer.msg(result.message);
                var catesHtml = template('catesHtml', { data: result.data });
                $('#select-cate').html(catesHtml);
                // 通过layui重新渲染表单区的ui结构
                form.render();
            }
        });
    }

    //渲染分类列表内容
    function renderCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: option,
            success: function(result) {
                console.log('cateres:' + result);
                if (result.status != 0)
                    return layui.layer.msg(result.message);
                var catesHtml = template('tpl-cateListHtml', {
                    data: result.data
                });
                $('tbody').html(catesHtml);
                paging(result.total);
            }
        });
    }

    //补零函数
    function addZeor(time) {
        return time >= 10 ? time : '0' + time;
    }
});