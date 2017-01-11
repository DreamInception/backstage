/**
 * Created by xzb on 2016/12/20.
 */
function ele_sendMsg_center(id,obj,text) {
    console.log(text);
    var mask = document.createElement("div");
    mask.className = "mask";
    mask.style.height = window.screen.height;
    top.document.body.appendChild(mask);
    var w=$(obj).width(),
        h=$(obj).height();
    $(obj).attr("data-id",id);
    $(obj).css({"margin-left":-(w/2)-30+"px","margin-top":-(h/2)-30+"px"});
    var popup=document.getElementsByClassName("alertDiv")[0];
    var str=popup.cloneNode(true);
    str.getElementsByTagName("input")[0].value=text;
    top.document.body.appendChild(str);
}

