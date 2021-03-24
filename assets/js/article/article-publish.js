$(function() {
    initEditor();
    renderSelCate();

    // 1. 初始化图片裁剪器
    var $image = $('#image');
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    $('.btn-selectCover').on('click', function() {
        $('[type=file]').click();
    });

    //选择文件事件
    $('[type=file]').on('change', function(e) {
        var files = e.target.files;
        if (files.length <= 0)
            return;
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0]);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    });

    var art_state = '已发布';
    $('#draft').on('click', function() {
        art_state = '草稿';
    });

    //提交事件
    $('#pubDraft-article').on('submit', function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                console.log(blob);
                fd.append('cover_img', blob);
                $.ajax({
                    method: 'post',
                    url: '/my/article/add',
                    data: fd,
                    // 注意：如果向服务器提交的是 FormData 格式的数据，
                    // 必须添加以下两个配置项
                    contentType: false,
                    processData: false,
                    success: function(result) {
                        console.log('res:' + result);
                        if (result.status != 0)
                            return layui.layer.msg(result.message);
                        layui.layer.msg(result.message);
                        location.href = './article-list.html';
                    }
                });
            });




    });

    //渲染选择类别下拉列表
    function renderSelCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(result) {
                if (result.status != 0)
                    return layui.layer.msg(result.message);
                var pubSelectCateHtml = template('pub-selectCate', { data: result.data });
                $('#pub-selectCateHtml').html(pubSelectCateHtml);
                layui.form.render();
            }
        });
    }
});