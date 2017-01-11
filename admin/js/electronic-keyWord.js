/**
 * Created by xzb on 2016/12/15.
 */

$(function() {

    var myData=initData();

    var tempData=initPhase();

    var phaseSubject = tempData.data.userDataAut;

    var vm = new Vue({
        el: '#vue',
        data:{
            cur:myData.cur_page,              //��ǰҳ
            all:myData.page_count,            //�ܹ�ҳ��
            page_size:myData.page_size,       //ÿҳ��ʾ�ļ�¼��
            total_count:myData.total_count,   //�ܹ���������¼
            dataList:myData.rows,             //���ص�����
            phaseDatalist:phaseSubject,
            subjectDatalist:null,
            phaseId:null,                    //ѧ��ID
            subjectId:null,                  //ѧ��ID
            searchContent:null               //�ؼ���
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
                var mydata={
                    toPage:this.cur,
                    pageSize:this.page_size,
                    phaseId:this.phaseId,
                    subjectId:this.subjectId,
                    searchContent:this.searchContent
                };
                this.dataList=initData(mydata).rows;
                this.cur=initData(mydata).cur_page;
                this.all=initData(mydata).page_count;
                this.total_count=initData(mydata).total_count;
            },
            initSelectBox: function (data) {
                var arr=[];
                for(var i=0;i<phaseSubject.length;i++){
                    if(phaseSubject[i].deep=="2"&&phaseSubject[i].parentId==data){
                        arr.push(phaseSubject[i])
                    }
                }
                this.subjectDatalist=arr;
                Vue.nextTick(function () {
                    // DOM 更新了
                    new SelectBox($("#subject")).refresh();
                })

            }
        }
    });
    $("#phase").on("change",function () {
        var $this=$(this);
        vm.initSelectBox($this.val());
    });

    $("select").selectBox();

    /** ������� */
    $(".btn-newAdd").on("click", function () {
        vm.phaseId=$("#phase").val();
        vm.subjectId = $("#subject").val();
        vm.searchContent=$(".add").val();
        vm.refreshData();
    })

    /** 判断是否兼容IE*/
    if(!placeholderSupport()){   // 判断浏览器是否支持 placeholder
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    }
});
/** 判断是否兼容IE*/
function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}
/** 进入页面适配table数据 */
function initData(myjson) {
    var mydata;
    if(myjson==""){
        myjson={
            toPage :toPage ,
            pageSize :pageSize ,
            phaseId:"",
            subjectId:"",
            searchContent:""
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
            mydata=data;
        }
    });
    return mydata;
}

/** 进入页面适配学段和学科 */
function initPhase() {
    var tempdata;
    $.ajax({
        url:phaseUrl,
        type: "GET",
        dataType: 'json',
        async:false
    }).done(function (data) {
        if(data.result == "0" ){
            tempdata=data;
        }
    });
    return tempdata;
}


