
var tempFile1 ;
var uploader1;

// 文件上传
jQuery(function() {
    var $ = jQuery,
        $list = $('#thelist'),
        $btn = $('#ctlBtn'),
        state = 'pending'

    var uploader1 = WebUploader.create({
	    // swf文件路径
	    swf: 'js/uploader1.swf',
	    // 文件接收服务端。
	    server: '/resource/uploadFile',
	    // 选择文件的按钮。可选。
	    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	    pick: '#picker',
	    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
	    compress:{
	    	width: 320,
	        height: 320,

	        // 图片质量，只有type为`image/jpeg`的时候才有效。
	        quality: 90,

	        // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
	        allowMagnify: false,

	        // 是否允许裁剪。
	        crop: false,

	        // 是否保留头部meta信息。
	        preserveHeaders: true,

	        // 如果发现压缩后文件大小比原来还大，则使用原来图片
	        // 此属性可能会影响图片自动纠正功能
	        noCompressIfLarger: false,

	        // 单位字节，如果图片大小小于此值，不会采用压缩。
	        compressSize: 0
	    },
	    formData:{
	    	_type: 'image',
            _id: $("#rid").html()
	    },
	    resize: false
	});

    // 当有文件添加进来的时候
    uploader1.on( 'fileQueued', function( file ) {
//        $list.append( '<div id="' + file.id + '" class="item">' +
//            '<h4 class="info">' + file.name + '</h4>' +
//            '<p class="state">等待上传...</p>' +
//        '</div>' );
//    	if(uploader1.getFiles().length > 1){
//    		uploader1.cancelFile(0);//[0].setStatus("cancelled");
//    	}
//    	console.log( uploader1.getFiles()[uploader1.getFiles().length - 1] );
    	if(uploader1.getFiles()[uploader1.getFiles().length - 1].ext != "jpg" && uploader1.getFiles()[uploader1.getFiles().length - 1].ext != "png"){
    		alert("图片只能上传jpg或png格式!");
    	}else if(uploader1.getFiles()[uploader1.getFiles().length - 1].size > 300 * 1024){
    		alert("上传图片大小不能超过300K!");
    	}else{
    		tempFile1 = file;
    	}
//    	console.log( uploader1.getFiles()[0] );
    });



    uploader1.on( 'all', function( type ) {
        if ( type === 'startUpload' ) {
            state = 'uploading';
        } else if ( type === 'stopUpload' ) {
            state = 'paused';
        } else if ( type === 'uploadFinished' ) {
            state = 'done';
        }
    });
    
    $btn.on( 'click', function() {
        if ( state === 'uploading' ) {
            uploader1.stop();
        } else {
        	if(tempFile1 != null){
        		uploader1.upload(tempFile1);
        	}
        }
    });

});


