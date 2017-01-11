/**
 * Created by xzb on 2016/12/15.
 */

$(function() {
    var myData=initData();

    var vm = new Vue({
        el: '#table-body',
        data:{
            cur:myData.cur_page,                  //当前页
            all:myData.page_count,                //总共页数
            page_size:myData.page_size,           //每页显示几条
            total_count:myData.total_count,       //总共有几条
            dataList:myData.rows                  //实际显示条数
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
                    pageSize:this.page_size
                };
                this.dataList=initData(mydata).rows;
            }
        }
    });

    /** 点击新增按钮 */
    $(".btn-newAdd").click(function () {
        var $this=$(".add");
        var word=$this.val();
        if(word!="" && word!=undefined && word!=null){
            addWord(word);
            $this.val("");
        }
    });

    /** 点击批量新增按钮 */
    $(".btn-allAdd").click(function () {
        $(".allAdd-div").toggle();
        $(".textarea").val("");
    });

    /** 多行文本框，点击回车 */
    $(".textarea").keydown(function(event) {
        if (event.keyCode == "13") {
            e = $(this).val();
            $(this).val(e + "");
        }
    });

    /** 批量新增点击确认 */
    $(".btn-add-submit").click(function () {
        var $this=$(".textarea");
        var word=$this.val().replace(/[\n]/ig," ").replace(/\s+/g,",").slice(0);  //把textarea里的数据变成 以逗号分隔的字符串
        if(word.slice(-1)==","){
            word=word.slice(0,-1);
        }
        if(word!="" && word!=undefined && word!=null){
            addWord(word);
            $this.val("");
            $(".allAdd-div").hide();
            $this.val("");
        }
    });

    /** 批量新增点击取消 */
    $(".btn-add-del").click(function () {
        $(".allAdd-div").hide();
        $(".textarea").val("");
    });

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
/** 进入页面初始化 */
function initData(myjson) {
    var mydata;
    if(myjson==""){
        myjson={
            toPage:1,
            pageSize:20
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

/** 新增词 */
function addWord(word){
    $.ajax({
        url:addUrl,
        data:{
            sensitive:word
        },
        type:"POST",
        dataType:"json"
    }).done(function (data) {
        if(data.result == "0"){
            //alert("新的词，已经添加成功！！");
            //$('#myFrame').attr('src', $('#myFrame').attr('src'));
            //document.getElementById('myFrame').location.href=window.location.href;
            //document.getElementById('myFrame').contentWindow.location.reload();
            //console.log(11);
            window.location.href="electronic-hotWord.html";
        }
    })
}

/** 点击删除敏感词按钮 */
function delMsg(id,obj) {
    $(obj).attr("data-id","");
    $(".warn").html("确定删除敏感词？");
    $(".confirmbtn").attr("onclick","confirmDel(3)");
    sendMsg_center(id,obj);
}
