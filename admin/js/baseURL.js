/**
 * Created by xzb on 2016/12/19.
 */

/**
 * ��ȡbase·��
 */
function getBasePath() {
    return getHostPath() + "/";
}/**
 *	��ȡ����url
 */
function getHostPath() {
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);

    return localhostPaht;
}
/**
 *  ��ȡ�����ĸ�·��
 */
function getContextPath(){
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    var result = pathName.substr(0,index+1);
    return result;
}

/**
 * ��ȡfileServer·��
 */
function getFileServerHostPath() {
    return "http://www.fileServer.com:6789";
}
/**
 * ��ȡfileIpserver·��
 * @returns {string}
 */
function getFileServerIpPath() {
    return "http://192.168.1.243:6789";
}

function getUploadFileServerPath() {
    return "http://192.168.1.82:8089";
}

/**
 * ��ȡofficeWebApps·��
 * @returns {string}
 */
function getOfficeWebAppsPath() {
    return "http://192.168.1.109";
}

function getCtx(){
    var _ctx = null;
    if( null==_ctx ){
        var localObj = window.location;
        var contextPath = "/"+localObj.pathname.split("/")[1];
        _ctx = contextPath;
    }
    return _ctx;
}