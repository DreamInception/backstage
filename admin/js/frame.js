$(document).ready(function(){

	$(".arrow").click(function(){
		$(".maincontent").toggleClass("switch");
		if($(".maincontent").hasClass("switch")){
			$(".arrow").html("&gt;");
		}
		else{
			$(".arrow").html("&lt;");
		}
	});
	$(".quit").find("a").click(function(e){
		e.preventDefault();
		$.ajax({
			url: logoutUrl,
			type: "post",
			dataType: "json"
		}).done(function(data){
			if (data.result == "0") {
				$(location).attr('href', "index");
			}
		});
	});

	initpage();
	getItem();
	forUserName();
	userData();

	$(".navList").on("click","li",function(){
		$(".navList").find("li").removeClass("selectedNav");
		$(this).addClass("selectedNav");
	});
});
window.onresize = function(){
	initpage();
};
function initpage() {
	$(".maincontent,.left").height($(window).height()-$(".header").height()-3);
	$(".right").height($(window).height()-$(".header").height()-19);
}
function forUserName() {
	var screenWidth = window.screen.width;
	if(screenWidth<1280){
		$(".login_user_name").addClass("small_width");
	}
}
// function initNav() {
// 	$.ajax({
// 		url: "json/nav.json",
// 		type: "get",
// 		dataType: "json"
// 	}).done(function(data){
// 		var listData = data.data.menuList;
// 		new Vue({
// 			el: ".navList",
// 			data: {
// 				listData : listData
// 			}
// 		});
// 		$(".navList").on("click","li",function(){
// 			$(".navList").find("li").removeClass("selectedNav");
// 			$(this).addClass("selectedNav");
// 		});
//
// 	});
// };

function getItem(){
	var itemList = $.getItemByRoleFirst({
		"path":'/'
	});
	$("#item").empty();

	var html = "";
	for(var i=0;i < itemList.length;i++){
		var itemName = escape(itemList[i].itemName);
		if(i==0){      //默认选中第一个菜单
			html+="<li class='selectedNav' ><a href='"+itemList[i].itemAction+"?itemId="+itemList[i].id+"&itemName="+itemName+"' target='right'><span class='"+itemList[i].itemImage+"'></span>"+itemList[i].itemName+"</a></li>";
		}else{
			html+="<li><a href='"+itemList[i].itemAction+"?itemId="+itemList[i].id+"&itemName="+itemName+"' target='right'><span class='"+itemList[i].itemImage+"'></span>"+itemList[i].itemName+"</a></li>";
		}
	}
	$("#item").append(html);

	var srcOne = itemList[0].itemAction+ "?itemId=" +itemList[0].id+"&itemName="+escape(itemList[0].itemName);
	$("#iframeId").attr("src",srcOne);
}

function userData() {
	$.ajax({
		url: user,
		type: "get",
		dataType: "json"
	}).done(function(data){
		var userJson = data.data;
		new Vue({
			el: ".name",
			data: {
				userJson : userJson
			}
		})
	});
}