	var tempFile3 ;
	var uploader3;

// 文件上传
function upload2(type) {
	
    var $ = jQuery,
        $list = $('#thelist'),
        $btn = $('#ctlBtn'),
        state = 'pending',
        uploader3;
    
    var uploader3 = WebUploader.create({
	    // swf文件路径
	    swf: 'js/uploader3.swf',
	    // 文件接收服务端。
	    server: '/resource/uploadFile',
	    // 选择文件的按钮。可选。
	    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	    pick: '#picker2',
	    formData:{
	    	_type: 'demoFile',
	    	_id: $("#rid").html()
	    },
	    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
	    resize: false
	});
    

    // 当有文件添加进来的时候
    uploader3.on( 'fileQueued', function( file ) {
    	if(type == 'video' && uploader3.getFiles()[uploader3.getFiles().length - 1].ext != "mp4"){
    		alert("视频只允许上传MP4格式!");
    	}else if(type == 'docum' && uploader3.getFiles()[uploader3.getFiles().length - 1].ext != "swf"){
    		alert("文档只允许上传swf格式!");
    	}else if(type == 'audio' && uploader3.getFiles()[uploader3.getFiles().length - 1].ext != "mp3"){
    		alert("音频只允许上传mp3格式!");
    	}else{
    		tempFile3 = file;
    	}
    });

    uploader3.on( 'all', function( type ) {
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
            uploader3.stop();
        } else {
        	if(tempFile3 != null){
        		uploader3.upload(tempFile3);
        	}
        }
    });

}

