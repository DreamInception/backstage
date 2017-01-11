$(function () {
    var resourcePage = new Vue({
        el: '#resource-manage-container',
        data:{
            priceAscClick: true,
            priceDescClick: true,
            gradeAscClick: true,
            gradeDescClick: true,
            downAscClick: true,
            downDescClick: true,
            browseAscClick: true,
            browseDescClick: true,
            cur: 1,
            all:0,
            total_count:100,
            page:'1',
            selectDataList: [],
            selectFirst: 11,
            selectSecond: 11,
            selectThird: 11,
            selectFourth: 11,
            searchInput: null,
            tableList: [],
            //selectBoxUrl: "../admin/json/resource-dropdown.json",
            //requestQueryList: "../admin/json/resource-check-list.json",
            currentTab: 1,
            cbInputId: "checkbox-1-0",
            cbIdList: [],
            cbStatusList: [],
            audioUrl: null,
            documentUrl: null,
            videoUrl: null,
            freeStat: null
        },
        components:{
            'vue-nav': Vnav
        },
        methods:{
            listens:function(data){
                var vm = this;
                vm.cur=data;
                vm.selectFirst = $("#selectbox1").val() || null;
                vm.selectSecond = $("#selectbox2").val() || null;
                vm.selectThird = $("#selectbox3").val() || null;
                vm.selectFourth = $("#selectbox4").val() || null;
                var params = {
                    toPage: vm.cur,
                    pageSize: 10,
                    phaseCode: vm.selectFirst,
                    subjectCode: vm.selectSecond,
                    versionCode: vm.selectThird,
                    volumesCode: vm.selectFourth,
                    startTime: $("#dates_start1").val() || null,
                    endTime: $('#dates_end1').val() || null,
                    uploadUser: ($("#allSelect").val() == 1)? vm.searchInput : null,
                    createUser:($("#allSelect").val() == 2)? vm.searchInput : null,
                    resourceName: ($("#allSelect").val() == 0)? vm.searchInput : null,
                    //sort:null,
                    sort:null,
                    isfree:vm.freeStat,
                    sortup:null,
                    status: vm.currentTab
                };
                 vm.requestTableList(params);
                // console.log(app.page);
            },
            resetSort: function(priceAsc,priceDesc,gradeAsc,gradeDesc,downAsc,downDesc,browseAsc,browseDesc){
                var vm = this;
                vm.priceAscClick = priceAsc;
                vm.priceDescClick = priceDesc;
                vm.gradeAscClick = gradeAsc;
                vm.gradeDescClick = gradeDesc;
                vm.downAscClick = downAsc;
                vm.downDescClick = downDesc;
                vm.browseAscClick = browseAsc;;
                vm.browseDescClick = browseDesc;
            },
            sortItems: function(msg,event){
                var obj = window.event.target;
                var vm = this;
                switch (msg){
                    case 'price':
                        if($(obj).hasClass("asc-enabled")){
                            vm.resetSort(false,true,true,true,true,true,true,true);
                            vm.sortAjaxData('price',1);
                        };
                        if($(obj).hasClass("desc-enabled")){
                            vm.resetSort(true,false,true,true,true,true,true,true);
                            vm.sortAjaxData('price',0);
                        };
                        break;
                    case 'grade':
                        if($(obj).hasClass("asc-enabled")){
                            vm.resetSort(true,true,false,true,true,true,true,true);
                            vm.sortAjaxData('score',1);
                        };
                        if($(obj).hasClass("desc-enabled")){
                            vm.resetSort(true,true,true,false,true,true,true,true);
                            vm.sortAjaxData('score',0);
                        };
                        break;
                    case 'download':
                        if($(obj).hasClass("asc-enabled")){
                            vm.resetSort(true,true,true,true,false,true,true,true);
                            vm.sortAjaxData('download',1);
                        };
                        if($(obj).hasClass("desc-enabled")){
                            vm.resetSort(true,true,true,true,true,false,true,true);
                            vm.sortAjaxData('download',0);
                        };
                        break;
                    case 'browse':
                        if($(obj).hasClass("asc-enabled")){
                            vm.resetSort(true,true,true,true,true,true,false,true);
                            vm.sortAjaxData('view',1);
                        };
                        if($(obj).hasClass("desc-enabled")){
                            vm.resetSort(true,true,true,true,true,true,true,false);
                            vm.sortAjaxData('view',0);
                        }
                        break;
                }
            },
            sortAjaxData: function(name,order){
                var vm = this;
                vm.selectFirst = $("#selectbox1").val() || null;
                vm.selectSecond = $("#selectbox2").val() || null;
                vm.selectThird = $("#selectbox3").val() || null;
                vm.selectFourth = $("#selectbox4").val() || null;
                var params = {
                    toPage: 1,
                    pageSize: 10,
                    phaseCode: vm.selectFirst,
                    subjectCode: vm.selectSecond,
                    versionCode: vm.selectThird,
                    volumesCode: vm.selectFourth,
                    startTime: $("#dates_start1").val() || null,
                    endTime:$('#dates_end1').val() || null,
                    uploadUser: ($("#allSelect").val() == 1)? vm.searchInput : null,
                    createUser:($("#allSelect").val() == 2)? vm.searchInput : null,
                    resourceName: ($("#allSelect").val() == 0)? vm.searchInput : null,
                    //sort:null,
                    sort:name,
                    isfree:vm.freeStat,
                    sortup:order,
                    status: vm.currentTab
                };
                 vm.requestTableList(params);
            },
            setDateTime: function(){
                //日期设置
                $.datetimepicker.setLocale('ch');
                $('#dates_start1').datetimepicker({
                    //yearOffset:222,
                    lang:'ch',
                    timepicker:false,
                    format:'Y-m-d',
                    formatDate:'Y-m-d',
                    onShow:function( ct ) {
                        this.setOptions({
                            maxDate: $('#dates_end1').val() ? $('#dates_end1').val() : false
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
                    url: selectBoxUrl,
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
                    vm.selectFirst = $("#selectbox1").selectBox().value || null;
                    vm.selectSecond = $("#selectbox2").selectBox().value|| null;
                    vm.selectThird = $("#selectbox3").selectBox().value|| null;
                    vm.selectFourth = $("#selectbox4").selectBox().value|| null;
                });

            },
            requestTabData: function(value){
                var vm = this;
                vm.currentTab = value;
                vm.freeStat = null;
                var params = {
                    toPage: 1,
                    pageSize: 10,
                    status:value
                    //phaseCode: vm.selectFirst,
                    //subjectCode: vm.selectSecond,
                    //versionCode: vm.selectThird,
                    //volumesCode: vm.selectFourth,
                    //startTime: $("#dates_start1").val() || null,
                    //endTime:$('#dates_end1').val() || null,
                    //uploadUser: ($("#allSelect").selectBox().value == 1)? vm.searchInput : null,
                    //createUser:($("#allSelect").selectBox().value == 2)? vm.searchInput : null,
                    //sort:null,
                    //isfree:null,
                    //sortup:1,
                    };
                 vm.resetSort(true,true,true,true,true,true,true,true);
                 vm.requestTableList(params);
            },
            requestSearchData: function(){
                var vm = this;
                vm.selectFirst = $("#selectbox1").val() || null;
                vm.selectSecond = $("#selectbox2").val() || null;
                vm.selectThird = $("#selectbox3").val() || null;
                vm.selectFourth = $("#selectbox4").val() || null;
                var params = {
                    toPage: 1,
                    pageSize: 10,
                    phaseCode: vm.selectFirst,
                    subjectCode: vm.selectSecond,
                    versionCode: vm.selectThird,
                    volumesCode: vm.selectFourth,
                    startTime: $("#dates_start1").val() || null,
                    endTime:$('#dates_end1').val() || null,
                    uploadUser: ($("#allSelect").val() == 1)? vm.searchInput : null,
                    createUser:($("#allSelect").val() == 2)? vm.searchInput : null,
                    resourceName: ($("#allSelect").val() == 0)? vm.searchInput : null,
                    //sort:null,
                    //isfree:null,
                    //sortup:1,
                    status: vm.currentTab
                };
                vm.resetSort(true,true,true,true,true,true,true,true);
                 vm.requestTableList(params);
            },
            filterFree: function(){
                var vm = this;
                vm.selectFirst = $("#selectbox1").val() || null;
                vm.selectSecond = $("#selectbox2").val() || null;
                vm.selectThird = $("#selectbox3").val() || null;
                vm.selectFourth = $("#selectbox4").val() || null;
                vm.freeStat = 0;
                var params = {
                    toPage: 1,
                    pageSize: 10,
                    phaseCode: vm.selectFirst,
                    subjectCode: vm.selectSecond,
                    versionCode: vm.selectThird,
                    volumesCode: vm.selectFourth,
                    startTime: $("#dates_start1").val() || null,
                    endTime: $('#dates_end1').val() || null,
                    uploadUser: ($("#allSelect").val() == 1)? vm.searchInput : null,
                    createUser:($("#allSelect").val() == 2)? vm.searchInput : null,
                    resourceName: ($("#allSelect").val() == 0)? vm.searchInput : null,
                    //sort:null,
                    sort:null,
                    isfree:vm.freeStat,
                    sortup:null,
                    status: vm.currentTab
                };
                 vm.requestTableList(params);
            },
            requestTableList: function(params){
                var vm = this;
                $.ajax({
                    url: requestQueryList,
                    type: "GET",
                    data: params,
                    dataType: 'json',
                    async: false
                }).done(function (result) {
                    vm.tableList = result.rows;
                    vm.total_count = result.total_count;
                    vm.cur = result.cur_page;
                    vm.all = result.page_count;
                });
            },
            offMsg: function(id,obj) {
                $(obj).attr("data-id","");
                $(".warn").html("是否确认下架该资源");
                $(".confirmbtn").attr("onclick","confirmDel(6)");
                sendMsg_center(id,obj);
            },
            recommend: function(id,obj) {
                $(".warn").html("是否确认推荐该资源");
                $(".confirmbtn").attr("onclick","confirmDel(8)");
                $(obj).attr("data-id","");
                sendMsg_center(id,obj);
            },
            nonrecommend: function(id,obj) {
                $(".warn").html("是否确认取消推荐");
                $(".confirmbtn").attr("onclick","confirmDel(9)");
                $(obj).attr("data-id","");
                sendMsg_center(id,obj);
            },
            batchDelete: function(obj){
                var vm = this;
                vm.cbIdList = [];
                vm.cbStatusList = [];
                    $('[id^="checkbox-1-"]').each(function(){

                        var self = $(this);
                        if(self.prop("checked")){
                            vm.cbIdList.push(self.data("value"));
                            vm.cbStatusList.push(self.data("status"));
                        }
                    });
                  //  console.log(vm.cbIdList);
                if(vm.cbIdList.length==0){
                    $(".hint").html("所选项不能为空");
                    openAlertWin();
                    return;
                }
                // 判断是否满足删除条件
                for(var i= 0,len=vm.cbStatusList.length;i<len;i++){
                    var sta = vm.cbStatusList[i];
                    if(sta == 2){
                        $(".hint").html("所选项中不能包含已发布资源");
                        openAlertWin();
                        return;
                    }
                }
                
                // 执行删除操作
                $(obj).attr("data-id","");
                $(".warn").html("是否确认批量删除");
                $(".confirmbtn").attr("onclick","confirmDel(12)");
                sendMsg_center(vm.cbIdList,obj);

            },
            batchOff: function(obj){
                var vm = this;
                vm.cbIdList = [];
                vm.cbStatusList = [];
                $('[id^="checkbox-1-"]').each(function(){

                    var self = $(this);
                    if(self.prop("checked")){
                        vm.cbIdList.push(self.data("value"));
                        vm.cbStatusList.push(self.data("status"));
                    }
                });
                if(vm.cbIdList.length==0){
                    $(".hint").html("所选项不能为空");
                    openAlertWin();
                    return;
                }
                // 判断是否满足下架条件
                for(var i= 0,len=vm.cbStatusList.length;i<len;i++){
                    var sta = vm.cbStatusList[i];
                    if(sta != 2){
                        $(".hint").html("所选项中不能包含待上架资源和已下架资源");
                        openAlertWin();
                        return;
                    }
                }
                // 执行下架操作
                $(obj).attr("data-id","");
                $(".warn").html("是否确认批量下架");
                $(".confirmbtn").attr("onclick","confirmDel(11)");
                sendMsg_center(vm.cbIdList,obj);
            },
            leftOperations: function(){
                var vm = this;
                //tab
                $(".choose-tabs .default-tab").click(function () {
                    $(".choose-tabs .default-tab").removeClass("active-tab");
                    $(this).addClass("active-tab");
                });
                //checkbox
                vm.cbInputId = "checkbox-1-";
                //edit Url forward
                var searchEntry = "?resource_id=";
                vm.audioUrl = "resource-audio.html" + searchEntry;
                vm.documentUrl = "resource-docum.html" + searchEntry;
                vm.videoUrl =  "resource-video.html" + searchEntry;
            },
            selectAll: function () {
                if($('[id^="checkbox-2-0"]').prop("checked")){
                    $('[id^="checkbox-1-"]').prop("checked",true);
                }else{
                    $('[id^="checkbox-1-"]').prop("checked",false);
                }
            },
            selectEach: function() {
                $('[id^="checkbox-2-0"]').prop("checked",false);
            }
        },
        mounted: function(){
            var vm = this;
            vm.leftOperations();
            vm.setDateTime();
            vm.initSelectBox();
            vm.requestTabData(0);
        }
    });


});
