$(function () {
    //获取url参数
    var param = GetRequest();
    userid = param.id;

    var myData=initData();
    var userData = initUserData();
    var vm = new Vue({
        el: '.main',
        data:{
            cur:myData.cur_page,
            all:myData.page_count,
            page_size:myData.page_size,
            total_count:myData.total_count,
            dataList:myData.rows,
            userInfo:userData,
            // scoreStr:null,
            timeStr:null
        },
        components:{
            'vue-nav': Vnav
        },
        methods:{
            status:function (e) {
                // 0：禁用，1：启用
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
                var lvm = vm;
                var myparam={
                    userid:userid,
                    toPage:this.cur,
                    pageSize:this.page_size,
                    // scoreStr:this.scoreStr,
                    timeStr:this.timeStr
                };
                $.ajax({
                    url:myUrl,
                    data:myparam,
                    type: "GET",
                    dataType: 'json',
                    async:false
                }).done(function (data) {
                    if(data.result == 0 ){
                        lvm.dataList =data.rows;
                        lvm.cur=data.cur_page;
                        lvm.all=data.page_count;
                        lvm.total_count=data.total_count;
                    }
                });
            }
            ,
            search:function(){
                vm.selectStr=$(".buyer_write").val();
                vm.refreshData();
            }
        }
    });

    //加载分页数据
    function initData(param) {
        var wrapdata;
        if(param==""||typeof(param)=='undefined'){
            param={
                userid:userid,
                toPage:1,
                pageSize:20,
                // scoreStr:"asc",
                timeStr:"asc"
            }
        }
        $.ajax({
            url:myUrl,
            data:param,
            type: "GET",
            dataType: 'json',
            async:false
        }).done(function (data) {
            if(data.result == 0 ){
                wrapdata=data;
            }
        });
        return wrapdata;
    }
    //加载用户信息
    function initUserData(param_user) {
        var wrapdata_user;
        if(param_user==""||typeof(param_user)=='undefined'){
            param_user={
                userid:userid
            }
        }
        $.ajax({
            url:userUrl,
            data:param_user,
            type: "GET",
            dataType: 'json',
            async:false
        }).done(function (data) {
            if(data.result == 0 ){
                wrapdata_user=data.data;
            }
        });
        return wrapdata_user;
    }
    //select
    $('select').selectBox().change(function () {
        vm.searchType = $(this).val();
    });
    //search
    $('#search_info').click(function () {
        vm.str = $(".buyer_write").val();
        vm.refreshData();
    });
    //排序
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

});
//删除评论
function delMsg(id,obj) {
    $(obj).attr("data-id","");
    $(".warn").html("确定删除评论");
    $(".confirmbtn").attr("onclick","confirmDel(0)");
    sendMsg_center(id,obj);
}

