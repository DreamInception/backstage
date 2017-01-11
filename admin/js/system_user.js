$(function () {
    var myData=initData();

    var app = new Vue({
        el: '.tablebar',
        data:{
            cur:myData.data.data.currentPageNo,
            all:myData.data.data.totalPageCount,
            page_size:myData.data.data.pageSize,
            total_count:myData.data.data.totalCount,
            dataList:myData.data.data.result,
            selectStr:null,
            state:null,
            username:null
        },
        components:{
            'vue-nav': Vnav
        },
        methods:{
            listens:function(data){
                this.cur=data;
                app.refreshData();
            },
            refreshData: function () {
                var lvm = app;
                var myparam={
                    toPage:this.cur,
                    pageSize:this.page_size,
                    selectStr:this.selectStr,
                    state:this.state,
                    username:$('#userName').val()
                };
                $.ajax({
                    url:myUrl,
                    data:myparam,
                    type: "GET",
                    dataType: 'json',
                    async:false
                }).done(function (data) {

                    if(data.result == 0 ){
                        lvm.dataList =data.data.data.result;
                        lvm.cur=data.data.data.currentPageNo;
                        lvm.all=data.data.data.totalPageCount;
                        lvm.total_count=data.data.data.totalCount;
                    }
                });
            }
        }
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

    // if(app.all == 0){
    //     $(".hasPage").hide();
    // }else{
    //     $(".hasPage").show();
    // }

    $('.check-btn').click(function () {           //查询按钮
        app.username = $('#userName').val();
        app.refreshData();
    });
});

function modify(userId){
    window.location.href = "modifyPassword.html?id="+userId;
}

function query(userId){
    window.location.href = "systems-add-user.html?addOrUpdate=detail&id="+userId;
}

function edit(userId){
    window.location.href = "systems-add-user.html?addOrUpdate=update&id="+userId;
}

function reset(userId){
    resetPassword(userId);
}

function del(userId){
    deleteUser(userId);
}

function add(){
    window.location.href = "systems-add-user.html";
}

function batchReset(){
    var ids = getCheckBoxVal();
    if(ids=='[]'){
        alert("至少选择一个！");
        return;
    }
    if(confirm('是否重置？')){
        $.ajax({
            type:"post",
            url:"/user/resetPasswordByids",
            dataType:"json",
            data:{
                "json":ids
            },
            success:function (data) {
                if(data.result=="0"){
                    alert("重置成功！");
                    window.location.reload();
                }else{
                    alert("重置失败！！");
                }
            },
            error:function () {
                alert("重置失败！！！")
            }
        });
    }
}

function pldel(){
    var ids = getCheckBoxVal();
    if(ids=='[]'){
        alert("至少选择一个！");
        return;
    }
    if(confirm('是否删除？')){
        $.ajax({
            type:"post",
            url:"/user/delUserByIds",
            dataType:"json",
            data:{
                "json":ids
            },
            success:function (data) {
                if(data.result=="0"){
                    alert("删除成功！");

                    window.location.reload();
                }else{
                    alert("删除信息失败！！");
                }
            },
            error:function () {
                alert("删除信息失败！！")
            }
        });
    }
}

function getCheckBoxVal() {
    var clist =[];
    $(':checkbox:checked').each(function(){
        clist.push({"id":$(this).attr("data-value")});
    });

    return JSON.stringify(clist);
}
