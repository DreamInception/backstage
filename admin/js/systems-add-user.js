/**
 * Created by xiang on 2016/12/16.
 */
$(function(){

    // $("select").selectBox();
    $(".selectBox-dropdown").css({
        "max-width":"345px",
        "width": "345px"
    });
    $(".dropdown").css("display", "inline-block");
    $(".selectBox-label").css("width","auto");

    //initTree("categoryTree","/knowledge/list",settingCatalog);
    if(addOrUpdate == "update"){
        queryRole();
        queryUser();
    }else if(addOrUpdate == "detail"){
        queryRole();
        queryUser();
    }else {
        queryRole();
    }

});

var id = $.getUrlParam("id");
var addOrUpdate = $.getUrlParam("addOrUpdate");

var settingCatalog = {

    check:{
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};
function filter(node) {
    return node;
}

/**
 * 显示角色信息
 */
function queryRole(){
    $("#role").find("option").remove();
    $.ajax({
        type: "post",
        url: "/user/queryRole",
        async:false,
        dataType: "json",
        success: function (data) {
            var role = data.data.data;
            for(var i = 0;i < role.length;i++){
                $("#role").append("<option value='"+role[i].id+"'>"+role[i].roleName+"</option>");
            }

        },
        error: function () {
            alert("出错了");
        }
    });
}


/**
 * 显示单个用户信息
 * data：用户ID
 */
function queryUser(){
    $.ajax({
        type: "post",
        url: "/user/selectUserOne",
        async:false,
        dataType: "json",
        data: {id:id},
        success: function (data) {
            var user = data.data.user;
            var userDataAut = data.data.userDataAut;
            // var treeObj = $.fn.zTree.getZTreeObj("categoryTree");
            // var nodes = treeObj.getNodesByFilter(filter);

            if(addOrUpdate == "detail"){

                $("#role").val(user.roleId);
                $("#loginName").val(user.loginName);
                $("#username").val(user.username);
                $("#userDes").val(user.userDes);

                $("#role").attr("disabled",true);
                $("#loginName").attr("disabled",true);
                $("#username").attr("disabled",true);
                $("#userDes").attr("disabled",true);
                $("#OK").hide();

                // for(var i = 0;i<userDataAut.length;i++){
                //     treeObj.checkNode(treeObj.getNodeByParam("id", userDataAut[i].dataAuthorityId, null), true);
                // }
                // for (var k = 0; k < nodes.length; k++) {
                //     var node = nodes[k];
                //     node.chkDisabled = true; //表示显示checkbox
                //     treeObj.updateNode(node);
                //
                // }

            }else {
                $("#loginName").val(user.loginName);
                $("#username").val(user.username);
                $("#userDes").val(user.userDes);

                $("#role").val(user.roleId);

                //
                // for(var i = 0;i<userDataAut.length;i++){
                //     var node = treeObj.getNodeByParam("id", userDataAut[i].dataAuthorityId, null);
                //     if(node!=null){
                //         treeObj.checkNode(node, true);
                //     }
                // }

            }
        },
        error: function () {
            alert("出错了");
        }
    });
}

function saveOrUpdate(){
    if(addOrUpdate == "update"){
        updateUser();
    }else{
        saveUser();
    }
}

/**
 * 保存用户
 */

function saveUser(){
    var alist = [];
    var ilist = [];
    var roleId = $("#role").val();
    // var treeObj = $.fn.zTree.getZTreeObj("categoryTree");
    // var nodes = treeObj.getChangeCheckedNodes(true);
    // for (var i = 0; i < nodes.length; i++) {
    //     //var halfCheck = nodes[i].getCheckStatus();
    //     //if (!halfCheck.half){
    //     var obj={};
    //     obj.dataAuthorityId = nodes[i].id;
    //     obj.parentId = nodes[i].pId;
    //     obj.name = nodes[i].name;
    //     obj.deep = nodes[i].deep;
    //     ilist.push(obj);
    //     //}
    //
    // }
    // $('#tree_show').find(':checkbox').each(function(){
    //     if ($(this).is(":checked")) {
    //         alist.push($(this).attr("id"));
    //     }
    // });
    // var parm =JSON.stringify(ilist);
    // var data = {json:parm,roleId: roleId, loginName: $("#loginName").val(), username: $("#username").val(), userDes:$("#userDes").val()};
    var data = {roleId: roleId, loginName: $("#loginName").val(), username: $("#username").val(), userDes:$("#userDes").val()};
    if(check(roleId)) {
        $.ajax({
            type: "post",
            url: "/user/saveUserManager",
            dataType: "json",
            data: data,
            success: function (data) {
                if(data.result == 2){
                    alert("用户名重复，请重新填写！");
                } else if(data.result == 1) {
                    alert("保存失败！");
                } else {
                    window.history.back(-1);
                    alert("保存成功！");
                }
            },
            error: function () {
                alert("出错了");
            }
        });
    }
}

/**
 * 修改用户
 */
function updateUser(){
    var alist = [];
    var ilist = [];
    var roleId = $("#role").val();

    // var treeObj = $.fn.zTree.getZTreeObj("categoryTree");
    // var nodes = treeObj.getChangeCheckedNodes(true);
    // for (var i = 0; i < nodes.length; i++) {
    //     //var halfCheck = nodes[i].getCheckStatus();
    //     //if (!halfCheck.half){
    //     var obj={};
    //     obj.dataAuthorityId = nodes[i].id;
    //     obj.parentId = nodes[i].pId;
    //     obj.name = nodes[i].name;
    //     obj.deep = nodes[i].deep;
    //     ilist.push(obj);
    //     //}
    //
    // }
    //
    // $('#tree_show').find(':checkbox').each(function(){
    //     if ($(this).is(":checked")) {
    //         alist.push($(this).attr("id"));
    //     }
    // });
    //
    // var parm =JSON.stringify(ilist);
    // var data = {json:parm,id: id,roleId: roleId, loginName: $("#loginName").val(), username: $("#username").val(), userDes:$("#userDes").val()};
    var data = {id: id,roleId: roleId, loginName: $("#loginName").val(), username: $("#username").val(), userDes:$("#userDes").val()};
    if(check(roleId)) {
        $.ajax({
            type: "post",
            url: "/user/updateUserManager",
            dataType: "json",
            data: data,
            success: function (data) {
                if (data.result == 2) {
                    alert("用户名重复，请重新填写！");
                } else if(data.result == 1) {
                    alert("修改失败！");
                } else {
                    window.history.back(-1);
                    alert("修改成功！");
                }

            },
            error: function () {
                alert("出错了");
            }
        });
    }
}

function check(roleId){
    if($("#loginName").val() == "" || $("#loginName").val() == null){
        alert("用户名不能为空！");
        return false;
    }
    if($("#username").val() == "" || $("#username").val() == null){
        alert("姓名不能为空！");
        return false;

    }
    if($("#userDes").val() == "" || $("#userDes").val() == null){
        alert("角色描述不能为空！");
        return false;
    }
    if(roleId == undefined || roleId==''){
        alert("请选择角色！");
        return false;
    }
    return true;
}
/**
 * 取消
 */
function back(){
    window.history.back(-1);
}
