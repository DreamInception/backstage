// confirm window
function sendMsg_center(id,obj) {
	var mask = document.createElement("div");
	mask.className = "mask";
	mask.style.height = window.screen.height;
	top.document.body.appendChild(mask);
	var w=$(obj).width(),
		h=$(obj).height();
	$(obj).attr("data-id",id);
	$(obj).css({"margin-left":-(w/2)-30+"px","margin-top":-(h/2)-30+"px"});
	var popup=document.getElementsByClassName("alertbar")[0];
	var str=popup.cloneNode(true);
	top.document.body.appendChild(str);
}
// alert window
function openAlertWin(obj){
	var mask = document.createElement("div");
	mask.className = "mask";
	mask.style.height = window.screen.height;
	top.document.body.appendChild(mask);
	var w=$(obj).width(),
		h=$(obj).height();
	$(obj).css({"margin-left":-(w/2)-30+"px","margin-top":-(h/2)-30+"px"});
	var popup=document.getElementsByClassName("alertWin")[0];
	var str=popup.cloneNode(true);
	top.document.body.appendChild(str);

}
