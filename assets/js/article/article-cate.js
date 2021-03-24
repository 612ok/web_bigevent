$(function() {
    renderArticleCate();

    //弹出添加类别框
    var index = null;
    $('#bt-addCate').on('click', function() {
        index = layui.layer.open({
            type: 1,
            title: '添加文章类别',
            content: $('#add-cate-layer').html(),
            area: ['500px', '250px']
        });
    });

    //添加类别事件  
    $('body').on('submit', '#form-addCate', function(e) {
        e.preventDefault();
        console.log('form-add:' + e.targe);
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(result) {
                if (result.status != 0)
                    return layui.layer.msg(result.message);
                layui.layer.msg(result.message);
                layui.layer.close(index);
                renderArticleCate();
            }
        });
    });

    //弹出修改类别框
    var editIndex = null;
    $('body').on('click', '.bt-editCate', function() {
        editIndex = layui.layer.open({
            type: 1,
            title: '修改文章类别',
            content: $('#edit-cate-layer').html(),
            area: ['500px', '250px']
        });
        console.log($(this).attr('data-id'));
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + $(this).attr('data-id'),
            success: function(result) {
                if (result.status != 0)
                    return layui.layer.msg(result.message);
                layui.form.val('edit-cate', result.data);
            }
        });
    });

    //修改类别事件  通过id修改 
    $('body').on('submit', '.form-edit-cate', function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        console.log('form-edit:' + e.targe);
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(result) {
                console.log(result);
                if (result.status != 0)
                    return layui.layer.msg(result.message);
                layui.layer.msg(result.message);
                layui.layer.close(editIndex);
                renderArticleCate();
            }
        });
    });

    //删除事件
    $('body').on('click', '.bt-deleteCate', function() {
        //弹出一个框
        var id = $(this).attr('data-id');
        layui.layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(result) {
                    console.log(result);
                    if (result.status != 0)
                        return layui.layer.msg(result.message);
                    layui.layer.msg(result.message);
                    renderArticleCate();
                }

            })

            layer.close(index);
        });
    });
});


//渲染类别列表
function renderArticleCate() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function(result) {
            if (result.status != 0)
                return layui.layer.msg(result.message);
            var cateListHtml = template('cate-list', { data: result.data });
            $('#cate-body').html(cateListHtml);
        }
    });
}