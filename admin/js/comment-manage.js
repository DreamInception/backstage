$(function() {
	var myData=initData();
	var vm = new Vue({
		el: '.table-content',
		data:{
			cur:myData.cur_page,
			all:myData.page_count,
			page_size:myData.page_size,
			total_count:myData.total_count,
			dataList:myData.rows,
			searchStr:null,
			scoreStr:null,
			timeStr:null,
			allItem:null,
			selectItem:[]
		},
		components:{
			'vue-nav': Vnav
		},
		methods:{
			status:function (e) {
				// 用户状态：0禁用，1启用
				switch(e){
					case "0":
						return "已禁用";
						break;
					case "1":
						return "正常";
						break;
				}
			},
			listens:function(data){
				this.cur=data;
				vm.refreshData();
			},
			refreshData: function () {
				var mydata={
					userid:userid,
					toPage:this.cur,
					pageSize:this.page_size,
					searchStr:this.searchStr,
					scoreStr:this.scoreStr,
					timeStr:this.timeStr
				};
				this.dataList=initData(mydata).rows;
				this.total_count=initData(mydata).total_count;
				this.all=initData(mydata).page_count;
			}
		}
	});
	vm.searchStr=null;
	$(".searchbtn").click(function () {
		vm.searchStr=$(".searchbox").val();
		vm.refreshData();
	});
	$(".order-option").click(function(){
		$(this).find(".icon").toggleClass("desc");
		var datas=$(this).attr("id");
		if($(this).find(".icon").hasClass("desc")){
			vm[datas]="desc";
			vm.refreshData();
		}else{
			vm[datas]="asc";
			vm.refreshData();
		}　
	});
	$(".Jsubmit").click(function(){
		delMsg2(vm.selectItem,'#alertbar')
	});
	// table内选择框点击事件
	var table = $(".table");
	$(table).on("click",".check-item",function(){
		if($(this).is(":checked")){
			$(this).parent().parent().addClass("selected");
		}else{
			$(this).parent().parent().removeClass("selected");
			$(".check-all").prop("checked", false);
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
	});
});
function initData(myjson) {
	var mydata;
	if(myjson==""){
		myjson={
			userid:userid,
			toPage:1,
			pageSize:20,
			searchStr:"",
			scoreStr:"asc",
			timeStr:"asc"
		}
	}
	$.ajax({
		url:myUrl,
		data:myjson,
		type: "GET",
		dataType: 'json',
		async:false
	}).done(function (data) {
		if(data.result == "0"){
			mydata=data;
		}
	});
	return mydata;
}
function delMsg(id,obj) {
	$(obj).attr("data-id","");
	$(".warn").html("确定删除评论");
	$(".confirmbtn").attr("onclick","confirmDel(0)");
	sendMsg_center(id,obj);
}
function delMsg2(ids,obj) {
	$(obj).attr("data-id","");
	$(".warn").html("确定批量删除评论");
	$(".confirmbtn").attr("onclick","confirmDel(4)");
	sendMsg_center(ids,obj);
}
function sendMsg(id,obj,Uname) {
	$(".warn").html("是否确认禁用用户："+Uname);
	$(".confirmbtn").attr("onclick","confirmDel(2)");
	$(obj).attr("data-id","");
	sendMsg_center(id,obj);
}