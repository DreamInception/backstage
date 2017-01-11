$(function () {
    var myData=initData();
    var vm = new Vue({
        el: '#webbar',
        data:{
            cur:myData.cur_page,
            all:myData.page_count,
            page_size:myData.page_size,
            total_count:myData.total_count,
            dataList:myData.rows,
            selectItem:[],
            resourceName:null,
            selectFirst:null,
            selectSecond:null,
            selectThirst:null,
            selectFour:null

        },
        components:{
            'vue-nav': Vnav
        },
        methods:{
            status:function (e) {
                // 用户状态：0禁用，1启用
                switch(e){
                    case "0":
                        return "删除";
                        break;
                    case "1":
                        return "待发布";
                        break;
                    case "2":
                        return "已发布";
                        break;
                    case "3":
                        return "已下架";
                        break;
                }
            },
            listens:function(data){
                this.cur=data;
                vm.refreshData();
                vm.erroData();
                vm.lotData();
            },
            refreshData: function () {
                vm.selectFirst=$("#selectbox1").val() || null;
                vm.selectSecond=$("#selectbox2").val() || null;
                vm.selectThirst=$("#selectbox3").val() || null;
                vm.selectFour=$("#selectbox4").val() || null;
                var mydata={
                    toPage:this.cur,
                    pageSize:this.page_size,
                    resourceName:this.resourceName,
                    resourceName:$(".buyer_write").val(),
                    startTime: $("#dates_start1").val(),
                    endTime:$("#dates_end1").val(),
                    category1:vm.selectFirst,
                    Category2:vm.selectSecond,
                    Category3:vm.selectThirst,
                    Category4:vm.selectFour
                };
                this.dataList=initData(mydata).rows;
                this.total_count=initData(mydata).total_count;
                this.all=initData(mydata).page_count;
            },
            erroData:function () {
                if(vm.dataList==""){
                    $(".tableImg").show();
                }
            },
            setDateTime:function () {
                //日期设置
                $.datetimepicker.setLocale('ch');
                $('#dates_start1').datetimepicker({
                    lang:'ch',
                    format:'Y-m-d H:i',
                    formatTime:'H:i',
                    timepicker:false,
                    onShow:function( ct ){
                        this.setOptions({
                            maxDate:$("#dates_end1").val() ? $("#dates_end1").val() : false

                        })
                    }
                });
                $('#dates_end1').datetimepicker({
                    //yearOffset:222,
                    lang:'ch',
                    timepicker:false,
                    format:'Y-m-d',
                    formatDate:'Y-m-d',
                    onShow:function( ct ) {
                        this.setOptions({
                            minDate: $('#dates_start1').val() ? $('#dates_start1').val() : false
                        })
                    }
                });
                $("#startDate").change(function () {
                    var startDay = $("#startDate").datepicker("getDate");
                    vm.startdate = getFormatDate(startDay);
                    var endDay = $("#endDate").datepicker("getDate");
                    if (vm.startdate && vm.startdate != '') {
                        $("#endDate").datepicker("option", "minDate", vm.startdate);
                    }
                    console.log("startDate startTime date is =========" + vm.startdate);

                });
                $("#endDate").change(function () {
                    var startDay = $("#endDate").datepicker("getDate");
                    var endDay = $("#endDate").datepicker("getDate");
                    vm.enddate = getFormatDate(endDay);
                    if (vm.enddate && vm.enddate != '') {
                        $("#endDate").datepicker("option", "maxDate", vm.enddate);
                    }
                    console.log("endDate endTime date is =========" + vm.enddate);
                });
            },
            initSelectBox: function(){
                $("select").selectBox();
                $(".first-select").css({
                    "max-width":"130px",
                    "width": "130px"
                });
                $(".second-select").css({
                    "max-width":"130px",
                    "width": "130px"
                });
                $(".third-select").css({
                    "max-width":"140px",
                    "width": "140px"
                });
                $(".fourth-select").css({
                    "max-width":"130px",
                    "width": "130px"
                });
                $(".allSelect").css({
                    "max-width":"120px",
                    "width": "120px"
                });
                $(".dropdown").css("display", "inline-block");
                $(".selectBox-label").css("width","auto");
                var vm = this;
                $.ajax({
                    url: "../admin/json/resource-dropdown.json",
                    type: "GET",
                    dataType: 'json',
                    async: false
                }).done(function (result) {
                    $("#selectbox1").linkSelect({
                        secondId: "selectbox2",
                        thirdId: "selectbox3",
                        fourthId: "selectbox4",
                        number: 4
                    },result);
                    vm.selectFirst=$("#selectbox1").selectBox().value;
                    vm.selectSecond=$("#selectbox2").selectBox().value;
                    vm.selectThirst=$("#selectbox3").selectBox().value;
                    vm.selectFour=$("#selectbox4").selectBox().value;
                });
            },
            lotData:function () {
                delMsg2(vm.selectItem,'#alertbar')
            }
        },

        mounted: function(){
            var vm = this;
            vm.setDateTime();
            vm.initSelectBox();
        }

    });
    this.resourceName="";
    $(".searchbtn").click(function () {
        vm.resourceName=$(".buyer_write").val();
        vm.refreshData();
    });
    var table=$(".table");
    $(table).on("click",".check-item",function () {
        if($(this).is(":checked")){
            $(this).parent().parent().addClass("selected");
        }else {
            $(this).parent().parent().removeClass("selected");
            $(".check-all").prop("checked",false);
        }
    });
    $(table).on("click",".check-all",function () {
        var allCheckbox=$(this).parentsUntil(".table-wrapper").find(".check-item");
        if($(this).is(":checked")){
            allCheckbox.prop("checked",false);
        }else {
            allCheckbox.prop("checked",true);
        }
        allCheckbox.trigger("click");
    })


});
function initData(myjson) {
    var mydata;
    if(myjson==""){
        myjson={
            toPage:1,
            pageSize:20,
            resourceName:""
        }
    }
    $.ajax({
        url:myUrl,
        data:myjson,
        type: "GET",
        dataType: 'json',
        async:false
    }).done(function (data) {
        if(data.result == "0" ){
            mydata=data
        }
    });
    return mydata;
};
function delMsg(id,obj) {
    $(obj).attr("data-id","");
    $(".warn").html("取消该条推荐");
    $(".confirmbtn").attr("onclick","confirmDel(5)");
    sendMsg_center(id,obj);
};
function delMsg2(ids,obj) {
    $(obj).attr("data-id","");
    $(".warn").html("确定批量取消");
    $(".confirmbtn").attr("onclick","confirmDel(10)");
    sendMsg_center(ids,obj);
}