function alertWinbox(obj) {
  var mask = document.createElement("div");
  mask.style.height = window.screen.height;
  mask.className = "mask";
  top.document.body.appendChild(mask);
  var popup=document.getElementsByClassName(obj)[0];
  var str=popup.cloneNode(true);
  str.style.display="block";
  top.document.body.appendChild(str);
}
//删除
function delMsg(id,obj) {
  $("."+obj).attr("data-id",id);
  $("p",".winboxDel").html("确定删除？");
  $(".file",".winboxDel").addClass("delDate");
  alertWinbox(obj);
}
/*//提交并更新
function submitWin(params,obj){
  $("p",".winboxDel").html("确定提交并更新？");
  $(".file",".winboxDel").addClass("changeDate");
  alertWinbox(obj);
}*/
//地址获取id
function getUrlParam() {
  var result = new Object();
  var url = window.location.search;
  if(url.indexOf('?')!=-1){
    var str = url.substr(1);
    var strs = str.split("&");
    for(var i=0; i< strs.length; i++){
      var key = strs[i].split('=')[0];
      var value = strs[i].split('=')[1];
      result[key] = value;
    }
    return result;
  } else {
    return {};
  }
}


////提交事件
//function submitChange(){
//  var tips="false";
//  var params = {
//    id: resourceAudio.resid,
//    resourceLevel: resourceAudio.resourceLevel,
//    isFree: resourceAudio.isFree,
//    cost: resourceAudio.cost,
//    salecost: resourceAudio.salecost,
//    freeStartTime: resourceAudio.freeStartTime,//参考格式：2016-12-15
//    freeEndTime: resourceAudio.freeEndTime,
//    isElectron: resourceAudio.isElectron,
//    coverpath: resourceAudio.coverpath
//  };
//  $.ajax({
//    url:changeUrl,
//    data:params,
//    type: "post",
//    dataType: 'json',
//    async:false
//  }).done(function (data){
//    if(data.result == "0" ){
//      tips="true";
//    }
//  });
//  if(tips=='true'){
//    $("p",".winboxSp3").html("操作成功！");
//    uploadBack();
//  }else{
//    $("p",".winboxSp3").html("操作失败！");
//    uploadBack();
//  }
  function uploadBack(){
    $("button",".winboxSp3").hide();
    setTimeout(function () {
      $(".winboxSp3").hide();
      top.document.getElementById('myFrame').contentWindow.location.href = "resource-manage.html";
    }, 2000);
  }
//}

