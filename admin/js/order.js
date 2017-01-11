$(function () {

    //获取url参数
    var param = GetRequest();
    userid = param.id;

    var myData=initData();
    var statisticsData = initStatistics();
    var vm = new Vue({
        el: '.main',
        data:{
            cur:myData.cur_page,
            all:myData.page_count,
            page_size:myData.page_size,
            total_count:myData.total_count,
            dataList:myData.rows,
            statisticsInfo:statisticsData,
            searchType:null,
            str:null,
            startTime:null,
            endTime:null,
            orderStatus:null,
            copyrightStatus:null
        },
        components:{
            'vue-nav': Vnav
        },
        methods:{
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
            listens:function(data){
                this.cur=data;
                vm.refreshData();
            },
            refreshData: function () {
                var lvm = vm;
                var myparam={
                    currentPageNo:this.cur,
                    pageSize:this.page_size,
                    searchType:$('select').val(),
                    str:this.str,
                    startTime:this.startTime,
                    endTime:this.endTime,
                    orderStatus:this.orderStatus,
                    copyrightStatus:this.copyrightStatus
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
    vm.setDateTime();
    //加载分页数据
    function initData(param) {
        var wrapData;
        if(param==""||typeof(param)=='undefined'){
            param={
                currentPageNo :1,
                pageSize:20,
                searchType:$('select').val(),
                str:"",
                startTime:"",
                endTime:"",
                orderStatus:"",
                copyrightStatus:""
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
    //加载统计数据
    function initStatistics(myjson) {
        var wrapData_tj;
        $.ajax({
            url:myUrl_tj,
            type: "GET",
            dataType: 'json',
            async:false
        }).done(function (data) {
            if(data.result == 0 ){
                wrapData_tj=data;
            }
        });
        return wrapData_tj;
    }
    //tab
    $(".list_tabs li").click(function () {
        $(this).parent("ul").find("li").removeClass("cur");
        $(this).addClass("cur");
    });
    //select
    $('select').selectBox();
    //search
    $('#search_info').click(function () {
        vm.searchType = $('select').val();
        vm.str = $(".buyer_write").val();
        vm.startTime = $("#dates_start1").val();
        vm.endTime = $("#dates_end1").val();
        vm.orderStatus = $(".orderStatus").find(".cur").attr("data-id");
        vm.copyrightStatus = $(".copyrightStatus").find(".cur").attr("data-id");
        vm.refreshData();
    });
    $('#exportOrder').click(function () {
    	window.location.href ="/order/downloadOrderList?searchType="+$('select').val()
    	+"&str="+$(".buyer_write").val()+"&startTime="+$("#dates_start1").val()+"&endTime="
    	+$("#dates_end1").val()+"&orderStatus="+$(".orderStatus").find(".cur").attr("data-id")
    	+"&copyrightStatus="+$(".copyrightStatus").find(".cur").attr("data-id");
    });

});

