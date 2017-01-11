$(function () {
	var realextension;
	var filePath;
	var examplePath;
    var resourceAudio = new Vue({
        el: '#resourceAudio',
        data: {
            resocdtl: null,
            resourceName: null,
            resourceDes: null,
            resourceMaker: null,
            makerIntro: null,
            createUserName: null,
            createDateTime: null,
            fileSize: null,
            property: null,
            knowledge: null,
            type: null,
            timeCount: null,
            useTarget: null,
            resourceSource: null,
            copyright: null,
            cost: null,
            timecost: null,
            salecost: null,
            isAloneRes: null,
            isOriginal: null,
            isChinese: null,
            resourceLevel: null,
            isFree: null,
            isElectron: null,
            cur1: 1,
            all1: 20,
            total_count1: 100,
            cur2: 1,
            all2: 20,
            total_count2: 100,
            isdisplay: true,
            isActive: true,
            isActiveRec:true,
            isdisplayRec: true,
            //freeStartTime: null,
            //freeEndTime: null,
            score: null,
            resid: getUrlParam().resource_id || 22,
            commentList: [],
            params: null,
            coverpath: null,
            buyList: [],
            accumEarnings: null,
            allFree: false,
            charge: false,
            timeFree: false,
            filePath:null,
            examplePath:null,
            formalUrl: null,
            formalUrl2: null
        },
        components: {
            'vue-nav': Vnav
        },
        methods: {
            addDtl: function () {
                var vm = this;
                $.ajax({
                    url: resourceAudioUrl,
                    type: "GET",
                    data:{id:vm.resid},
                    dataType: "json",
                    async: false
                }).done(function (result) {
                    if (result.result == 0) {
                        vm.resocdtl = result.data[0];
                        vm.resourceName = vm.resocdtl.resourceName;
                        vm.resourceDes = vm.resocdtl.resourceDes;
                        vm.resourceMaker = vm.resocdtl.resourceMaker;
                        vm.makerIntro = vm.resocdtl.makerIntro;
                        vm.createUserName = vm.resocdtl.createUserName;
                        vm.createDateTime = vm.resocdtl.createDateTime;
                        vm.fileSize = vm.resocdtl.fileSize;
                        vm.property = vm.resocdtl.property;
                        vm.knowledge = vm.resocdtl.knowledge;
                        vm.type = vm.resocdtl.type;
                        vm.timeCount = vm.resocdtl.timeCount;
                        vm.useTarget = vm.resocdtl.useTarget;
                        vm.resourceSource = vm.resocdtl.resourceSource;
                        vm.copyright = vm.resocdtl.copyright;
                        vm.cost =vm.resocdtl.cost;
                       /* vm.timecost = (vm.resocdtl.isFree == 2) ? vm.resocdtl.cost : null;*/
                        vm.salecost = (vm.resocdtl.isFree == 1) ? vm.resocdtl.salecost : null;
                        vm.isAloneRes = vm.resocdtl.isAloneRes;
                        vm.isOriginal = vm.resocdtl.isOriginal;
                        vm.isChinese = vm.resocdtl.isChinese;
                        vm.resourceLevel = vm.resocdtl.resourceLevel;
                        vm.isFree = vm.resocdtl.isFree;
                        vm.isElectron = vm.resocdtl.isElectron;
                        $("#dates_start").val(vm.resocdtl.freeStartTime);
                        $("#dates_end").val(vm.resocdtl.freeEndTime);
                        vm.score = vm.resocdtl.score;
                        vm.coverpath = vm.resocdtl.coverPath;
                        vm.accumEarnings = vm.resocdtl.accumEarnings;
                        vm.filePath = vm.resocdtl.filePath;
                        vm.examplePath = vm.resocdtl.examplePath;
                        vm.priceStatus(Number(vm.resocdtl.isFree));
                        if(vm.resocdtl.filePath!=undefined){
                        preview.init(vm.resocdtl.realextension,vm.resocdtl.filePath,'documA');
                        }
                        realextension=vm.resocdtl.realextension;
                        filePath=vm.resocdtl.filePath;
                        examplePath = vm.resocdtl.examplePath;
                    }
                })
            },
            priceStatus: function (seq) {
                var vm = this;
                switch (seq) {
                    case 0:
                        vm.charge = true;
                        vm.timeFree = true;
                        vm.isFree = 0;
                        break;
                    case 2:
                        vm.charge = true;
                        vm.timeFree = false;
                        vm.isFree = 2;
                        break;
                    case 1:
                        vm.charge = false;
                        vm.timeFree = true;
                        vm.isFree = 1;
                        break;
                }

            },
            listens1: function (data) {
                this.cur1 = data;
                this.page1 = this.cur;

            },
            listens2: function (data) {
                this.cur2 = data;
                this.page2 = this.cur;
            },
            changeDtlTab1: function () {
                this.isActive = true;
                this.isdisplay = true;
            },
            changeDtlTab2: function () {
                this.isActive = false;
                this.isdisplay = false;
            },
            changeDtlRec1: function () {
                this.isActiveRec = true;
                this.isdisplayRec = true;
                $(".documB").html();
                if(filePath!=undefined){
                preview.init(realextension,filePath,'documA');
                }
            },
            changeDtlRec2: function () {
                this.isActiveRec = false;
                this.isdisplayRec = false;
                $(".documA").html();
                if(examplePath!=undefined){
                preview.init('swf',examplePath,'documB');
                }
            },
            setDateTime: function () {
                //日期设置
               $.datetimepicker.setLocale('ch');
               $('#dates_start').datetimepicker({
                   //yearOffset:222,
                   lang: 'ch',
                   timepicker: true,
                   format: 'Y-m-d H:m',
                   //formatDate:'Y-m-d',
                   onShow: function (ct) {
                       this.setOptions({
                           maxDate: $('#dates_end').val() ? $('#dates_end').val() : false
                       })
                   }
               })
               $('#dates_end').datetimepicker({
                   //yearOffset:222,
                   lang: 'ch',
                   timepicker: true,
                   format: 'Y-m-d H:m',
                   //formatDate:'Y-m-d',
                   onShow: function (ct) {
                       this.setOptions({
                           minDate: $('#dates_start').val() ? $('#dates_start').val() : false
                       })
                   }
               })
            },
            winboxSp1:function () {
                $(".winboxSp1").css("display","block");
            },
            winboxSp2:function () {
                $(".winboxSp2").css("display","block");
            },
            winboxSp3:function () {
                $("p",".winboxSp3").html("确定提交并更新？");
                $("button",".winboxSp3").show();
                $(".winboxSp3").css("display","block");
            },
            submitChange: function () {
//
//               var vm = this;
//                vm.params = {
//                 id: vm.resid,
//                    resourceLevel: vm.resourceLevel,
//                  isFree: vm.isFree,
//                    cost: vm.cost,
//                    salecost: vm.salecost,
//                   freeStartTime: vm.freeStartTime,//参考格式：2016-12-15
//                   freeEndTime: vm.freeEndTime,
//                   isElectron: vm.isElectron,
//                   coverpath: vm.coverpath
//              };
//                $(".winboxDel").attr("id", vm.resid);
//               $(".winboxDel").attr("resourceLevel", vm.resourceLevel);
//                $(".winboxDel").attr("isFree", vm.isFree);
//                $(".winboxDel").attr("cost", vm.cost);
//              $(".winboxDel").attr("salecost", vm.salecost);
//              $(".winboxDel").attr("freeStartTime", vm.freeStartTime);
//               $(".winboxDel").attr("freeEndTime", vm.freeEndTime);
//                $(".winboxDel").attr("isElectron", vm.isElectron);
//                $(".winboxDel").attr("coverpath", vm.coverpath);
//                submitWin(vm.params, obj);
//
                var vm = this;
                var tips="false";
                var changeUrl="/resource/submitresource";
                var params = {
                    id: vm.resid,
                    resourceLevel: vm.resourceLevel,
                    isFree: vm.isFree,
                    cost: vm.cost,
                    salecost: vm.salecost,
                    freeStartTime: $("#dates_start").val(),//参考格式：2016-12-15
                    freeEndTime: $("#dates_end").val(),
                    isElectron: vm.isElectron,
                    coverpath: vm.coverpath,
                    filePath:vm.filePath,
                    examplePath:vm.examplePath
                };
                $.ajax({
                    url:changeUrl,
                    data:params,
                    type: "post",
                    dataType: 'json',
                    async:false
                }).done(function (data){
                    if(data.result == "0" ){
                        tips="true";
                    }
                });
                if(tips=='true'){
                    $("p",".winboxSp3").html("操作成功！");
                    uploadBack();
                }else{
                    $("p",".winboxSp3").html("操作失败！");
                    uploadBack();
                }
            },
            commentlist: function () {
                var vm = this;
                $.ajax({
                    url: commentListUrl,
                    type: "get",
                    data: {id:vm.resid},
                    dataType:'json',
                    async: false
                }).done(function (result) {
                    vm.cur1 = result.cur_page;
                    vm.all1 = result.page_count;
                    vm.total_count1 = result.total_count;
                    vm.commentList = result.rows
                })
            },
            buylist: function () {
                var vm = this;
                $.ajax({
                    url: buyListUrl,
                    type: "get",
                    data: {id:vm.resid},
                    async: false,
                    datatype:'json'
                }).done(function (result) {
                    vm.cur2 = result.cur_page;
                    vm.all2 = result.page_count;
                    vm.total_count2 = result.total_count;
                    vm.buyList = result.rows
                })
            },
            back: function () {
                top.document.getElementById('myFrame').contentWindow.location.href = "resource-manage.html";
            },
            changeResLevel: function(id){
                var vm = this;
                vm.resourceLevel = id;
            },
            changeisElec:function(id){
                var vm = this;
                vm.isElectron = id;
            },
            uploadRec:function(val){
                var vm = this;
                $.ajax({
                    url: uploadRec,
                    type: "GET",
                    data: {id:vm.resid,type:val},
                    dataType:'json',
                    async: false
                })
            }
        },
        mounted: function () {
            this.addDtl();
            this.setDateTime();
            this.commentlist();
            this.buylist();
            this.formalUrl = '/resource/download?id='+this.resid+'&type=1';
            this.formalUrl2 = '/resource/download?id='+this.resid+'&type=2';
        }
    });
});
