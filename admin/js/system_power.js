$(function () {
	var myData=initData();
    var vm = new Vue({
        el:'#webbar',
        data:{
            cur:myData.data.data.currentPageNo,
            all:myData.data.data.totalPageCount,
            page_size:myData.data.data.pageSize,
            total_count:myData.data.data.totalCount,
            dataList:myData.data.data.result
        },
        components:{
            'vue-nav': Vnav
        },
        methods:{
            listens:function(data){
            	this.cur=data;
				vm.refreshData();
            },
            refreshData: function () {
            	  var lvm = vm;
                  var myparam={
                      toPage:this.cur,
                      pageSize:this.page_size,
                      roleName:this.roleName
                  };
                  this.dataList=initData(myparam).data.data.result;
            }
        }
    });
    this.searchStr="";
	$("#searchbutton").click(function () {
		vm.roleName=$("#rolename").val();
		vm.refreshData();
	});
    //加载数据
    function initData(param) {
        var wrapData;
        if(param==""||typeof(param)=='undefined'){
            param={
                toPage:1,
                pageSize:20,
                roleName:""
            };
        }
        $.ajax({
            url:myUrl,
            data:param,
            type: "POST",
            dataType: 'json',
            async:false
        }).done(function (data) {
            if(data.result == "0" ){
                wrapData=data;
            }
        });
        return wrapData;
    }
 // table内选择框点击事件
	var table = $(".table");
	$(table).on("click",".item-check",function(){
		if($(this).is(":checked")){
			$(this).parent().parent().addClass("selected");
		}else{
			$(this).parent().parent().removeClass("selected");
			$(".check-all").prop("checked", false);
		}
	});
	$(table).on("click",".check-all", function(){
		var allCheckbox = $(this).parentsUntil(".wrap_table").find(".item-check");
		if($(this).is(":checked")) {
			allCheckbox.prop("checked", false);
		}else{
			allCheckbox.prop("checked", true);
		}
		allCheckbox.trigger("click");
	});
});
/*新增*/

function add(){

	location.href ="systems-check.html?flag=add";
}
function update(id){
	location.href ="systems-check.html?flag=update&id="+id;
}
function query(id){
	location.href ="systems-check.html?flag=query&id="+id;
}
function pldel(){
	var ids = getCBIds(".item-check");
	if(ids=='[]'){
		alert("至少选择一个！");
		return;
	} 
	alert(ids)
	if(confirm('是否删除？')){
		$.ajax({
			   type:"post",
			   url:"/roleManagerRest/deleteRole",
			   dataType:"json",
			   data:{
				   "json":ids
			   },
			   success:function (data) {
				   if(data.result=="0"){
					   searchPage(1);
				   }else{
					   console.log("第一个按钮获取信息失败！！");
				   }
			   },
			   error:function () {
				   console.log("第一个按钮获取信息失败！！！")
			   }
		   });
	}
}