function delNo(){
  $(".mask").remove();
  $(".winboxDel").remove();
};

//删除数据
function delYes(){
  var thisid=$(".winboxDel").attr("data-id");
  if(delDate(delUrl,thisid)=="true"){
    $("p",".winboxDel").html("操作成功!");
    $("button",".winboxDel").remove();
  }else{
    $("p",".winboxDel").html("操作失败!");
    $("button",".winboxDel").remove();
  }
  //刷新
  setTimeout(function () {
    $(".winboxDel,.mask").remove();
    document.getElementById('myFrame').contentWindow.location.reload()
  }, 2000);
};

function delDate(delUrl,thisid) {
  var tips="false";
  $.ajax({
    url:delUrl,
    data:{id:thisid},
    type: "post",
    dataType: 'json',
    async:false
  }).done(function (data) {
    if(data.result == "0" ){
      tips="true";
    }
  });
  return tips;
}