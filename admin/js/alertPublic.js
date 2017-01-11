//comment-manage.html删除评论和electronic-hotWord.html的删除敏感词
function confirmDel(oprSt) {
//	state: 状态：1：启用、0：删除、2：禁用 3:删除敏感词
	var arr;
	var str="",oprUrl="";
	switch (oprSt){
		case 0:
			str="评论删除";
			oprUrl=editUrl;
			arr={
				id:$(".alertbar").attr("data-id"),
				state:0
			};
			break;
		case 2:
			str="用户禁用";
			oprUrl=stateUrl;
			arr={
				userid:$(".alertbar").attr("data-id"),
				state:0
			};
			break;
		case 3:
			str="删除敏感词";
			oprUrl=hotWordDelUrl;
			arr ={
				id:$(".alertbar").attr("data-id")
			};
			break;
		case 4:
			str="批量删除评论";
			oprUrl=myUrl;
			arr ={
				ids:$(".alertbar").attr("data-id")
			};
			break;
		case 5:
			str="取消推荐";
			oprUrl=recommendUrl;
			arr={
				id:$(".alertbar").attr("data-id"),
				state:0
			};
			break;
		case 6:
			str="下架";
			oprUrl=offshelvesUrl;
			arr ={
				ids:$(".alertbar").attr("data-id"),
				type:2
			};
			break;
		case 7:
			str="删除";
			oprUrl=offshelvesUrl;
			arr ={
				ids:$(".alertbar").attr("data-id"),
				type:3
			};
			break;
		case 8:
			str="推荐";
			oprUrl=recommendUrl_resource;
			arr ={
				id:$(".alertbar").attr("data-id"),
				status: 1
			};
			break;
		case 9:
			str="取消推荐";
			oprUrl=recommendUrl_resource;
			arr ={
				id:$(".alertbar").attr("data-id"),
				status: 0
			};
			break;
		case 10:
			str="批量取消";
			oprUrl=recommendUrl;
			arr ={
				id:$(".alertbar").attr("data-id"),
				state:0
			};
			break;
		case 11:
			str="批量下架";
			oprUrl=offshelvesUrl;
			arr ={
				id:$(".alertbar").attr("data-id"),
				type:2
			};
			break;
		case 12:
			str="批量删除";
			oprUrl=offshelvesUrl;
			arr ={
				ids:$(".alertbar").attr("data-id"),
				type:3
			};
			break;
		case 13:
			str="用户恢复";
			oprUrl=stateUrl;
			arr={
				userid:$(".alertbar").attr("data-id"),
				state:1
			};
			break;

	}
	if(oper(oprUrl,arr)=="true"){
		$(".warn").html(str+"成功");
		$(".alertbtn").remove();
	}
	else{
		$(".warn").html(str+"失败");
		$(".alertbtn").remove();
	}
	setTimeout(function () {
		$(".alertbar,.mask").remove();
		document.getElementById('myFrame').contentWindow.location.reload()
	}, 2000);
}
//提交删除数据
function oper(myUrl,myD) {
	var tips="false";
	$.ajax({
		url:myUrl,
		data:myD,
		type: "post",
		dataType: 'json',
		async:false
	}).done(function (data) {
		if(data.result == "0" ){
			tips="true";
		}
	});
	return tips;
}
//关闭弹窗
function remv() {
	$(".alertbar").remove();
	$(".mask").remove();
}
//电子词典点击修改"确认"按钮
function ele_ConfirmDel(id){
	var word = $(".wordChange").val();
	if(word==""){
		return;
	}
	var arr={
		id:$(".alertDiv").attr("data-id"),
		sensitive:word
	};
	$.ajax({
		url:hotWordChangeUrl,
		data:arr,
		type:"POST",
		dataType:"json"
	}).done(function (data) {
		if(data.result == "0"){
			$("h4").html("敏感词修改成功").css({"margin-top":"50px","font-size":"12px"});
			$("p").remove();
			$("img").remove();
			$(".alertDiv").css({"padding-bottom":"60px"});
			setTimeout(function () {
				$(".alertDiv,.mask").remove();
				document.getElementById('myFrame').contentWindow.location.reload()
			}, 2000);
		}
	})
}
//电子词典点击修改"取消"按钮
function ele_Remv() {
	$(".alertDiv").remove();
	$(".mask").remove();
}
// alertWin关闭弹窗
function confirmClose(){
	$(".alertWin").remove();
	$(".mask").remove();
}