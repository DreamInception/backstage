$(function () {
    var myData=initData();
    var vm = new Vue({
        el: '.main',
        data:{
            cur:myData.cur_page,
            all:myData.page_count,
            page_size:myData.page_size,
            total_count:myData.total_count,
            dataList:myData.rows,
            selectStr:null,
            state:null
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
                    toPage:this.cur,
                    pageSize:this.page_size,
                    selectStr:this.selectStr,
                    state:this.state
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
                        // if(lvm.all == 0){
                        //     $(".hasPage").hide();
                        // }else{
                        //     $(".hasPage").show();
                        // }
                        lvm.total_count=data.total_count;
                    }
                });
                // var wrap = initData(myparam);
                // // vm.$set('dataList', wrap.rows);
                // // vm.$set('cur', wrap.cur_page);
                // // vm.$set('all', wrap.page_count);
                // // vm.$set('total_count', wrap.total_count);
                // vm.dataList=wrap.rows;
                // vm.cur=wrap.cur_page;
                // vm.all=wrap.page_count;
                // vm.total_count=wrap.total_count;
            },
            search:function(){
                vm.selectStr=$(".buyer_write").val();
                vm.refreshData();
            }
        }
    });
    // if(vm.all == 0){
    //     $(".hasPage").hide();
    // }else{
    //     $(".hasPage").show();
    // }
    //加载数据
    function initData(param) {
        var wrapData;
        if(param==""||typeof(param)=='undefined'){
            param={
                toPage:1,
                pageSize:20,
                state:"",
                selectStr :""
            }
        }
        $.ajax({
            url:myUrl,
            data:param,
            type: "GET",
            dataType: 'json',
            async:false
        }).done(function (data) {
            if(data.result == "0" ){
                wrapData=data;
            }
        });
        return wrapData;
    }
    //tab
    $(".list_tabs li").click(function () {
        $(this).parent("ul").find("li").removeClass("cur");
        $(this).addClass("cur");
        // 用户状态：0禁用，1启用,""全部
        switch($(this).index()){
            case 0:
                vm.state = "";
                break;
            case 1:
                vm.state = "0";
                break;
            case 2:
                vm.state = "1";
                break;
        }
        vm.refreshData();
    });
    //select
    $("select").selectBox();
});
//禁用用户
function sendMsg(id,obj,Uname) {
    $(".warn").html("是否确认禁用用户："+Uname);
    $(".confirmbtn").attr("onclick","confirmDel(2)");
    $(obj).attr("data-id","");
    sendMsg_center(id,obj);
}
//恢复用户
function sendMsgResume(id,obj,Uname) {
    $(".warn").html("是否确认恢复用户："+Uname);
    $(".confirmbtn").attr("onclick","confirmDel(13)");
    $(obj).attr("data-id","");
    sendMsg_center(id,obj);
}