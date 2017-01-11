var school_id=4355;
var user_id=3455;
var serverUrl="http://192.168.1.241/alljson/";


// 以下为数据
var build_id=123,
	level_id=465,
	college_id=645,
	course_id=3545,
	year_id=645,
	class_name=34,
	role_id=345,
	real_name=2324,
	class_id=2324,
	teacher_id=34435,
	classroom_id=34555,
	machine_id=547,
	start_time=56767,
	end_time=790,
attend_machine_id=657;
$(function () {
	// table内选择框点击事件
	var table = $(".table");
	$(table).on("click",".check-item",function(){
		if($(this).is(":checked")){
			$(this).parent().parent().addClass("selected");
		}else{
			$(this).parent().parent().removeClass("selected");
		}
	});

	$(table).on("click",".check-all", function(){
		var allCheckbox = $(this).parentsUntil(".table-wrapper").find(".check-item");
		if($(this).is(":checked")) {
			allCheckbox.prop("checked", false);
		}else{
			allCheckbox.prop("checked", true);
		}
		allCheckbox.trigger("click");
	})
});
//获取url参数
function GetRequest() {
	var url = location.search;
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for(var i = 0; i < strs.length; i ++) {
			theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}
