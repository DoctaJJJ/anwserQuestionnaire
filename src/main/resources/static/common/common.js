// var httpRequestUrl = "http://49.4.95.144:80/questionSurvey";
//49.4.95.144服务器
//var httpRequestUrl = "http://114.115.132.86:80/questionSurvey";
//114.115.132.86服务器
// var httpRequestUrl = "http://114.115.132.86:8080/questionSurvey";


var httpRequestUrl = "http://127.0.0.1:8085";
//var httpRequestUrl = "http://10.211.55.5:8085";
//var httpRequestUrl = "http://39.99.231.41:8088/";
/**
 * 加载公共的头
 */
function header() {
    var urlPath = UrlSearch();
    var header = "";
    header += '<div class="header headerFixed">\n' +
        '        <div class="my-container clearfix">\n' +
        '            <div id="ctl01_divreturn" class="logo pull-left">\n';
    if (urlPath != "myProject.html" && urlPath != "myQuestionnaires.html") {
        header += '<a href="javascript:history.go(-1)" class="hover" id="hrefPGoBack"><em class="icon returnicon"></em>返回</a>';
    }
    header += '</div>\n' +
        '            <div class="user-wrapper pull-right" id="userbutton">\n' +
        '                <dl class="my-question pull-left">\n' +
        '                    <dt class="box user-info">\n' +
        '                        <a class="user-name" href="myQuestionnaires.html"><i class="icon questions-icon"><em></em></i><span>我的项目</span></a>\n' +
        '                    </dt>\n' +
        '                    <dd class="line"></dd>\n' +
        '                </dl>\n' +
        '                <dl class="user-info pull-left">\n' +
        '                    <dt class="icon user-icon"><em></em></dt>\n' +
        '                    <dd class="spinner-list">\n' +
        '                        <a href="javascript:void(0)" class="user-name">' +
        '                           <span id="ctl01_lblUserName"style="text-align:center">admin</span>' +
        '                        </a>&nbsp;&nbsp;|&nbsp;&nbsp;<a class="user-name" href="userManage.html" id="gotoUserManage">用户管理</a>\n' +
        '                    </dd>\n' +
        '                </dl>\n' +
        '                <dl id="ctl01_hrefWjxout" class="user-info pull-left IE-8">\n' +
        '                    <a class="user-name" href="javascript:void(0)" onclick=\'logOut()\'>\n' +
        '                        <dt class="icon out-icon"></dt>\n' +
        '                        <dd class="spinner-list" style="line-height: 3.2!important;">\n' +
        '                            <span>退出</span>\n' +
        '                        </dd>\n' +
        '                    </a>\n' +
        '                </dl>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>';
    $(".header").html(header);
}

/**
 * 封装公共ajax,post的传输方式，必传参数
 * @param async    是否同步异步
 * @param url       请求地址
 * @param data      传输数据
 * @param success     成功之后的回调函数
 */
function commonAjaxPost(async, url, data, success, err) {
    $.ajax({
        "async": async,
        "url": httpRequestUrl + url,
        "type": "POST",
        "data": JSON.stringify(data),
        "dataType": "json",
        "contentType": "application/json",
        success: success || function (data) {
            // //console.log(data)
        },
        error: err || function (jqXHR, textStatus, errorThrown) {
            // alert(jqXHR);
            //  //console.log(jqXHR);
        },
    });
}

/**
 * 获取地址栏参数
 */
function UrlSearch() {
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("/pages/");
    str = str.substr(num + 7); //取得当前页
    return str;
}

/**
 * 刷新cookie
 */
var cookiesPath = '/';
var cookiesTime = 3 / 24;

function refreshCookie() {
    var cookieData = $.cookie();
    $.each(cookieData, function (_key, _value) {
        $.cookie(_key, _value, {path: cookiesPath, expires: cookiesTime});
    });
}/**
 * 刷新cookie
 */
var cookiesPath = '/';
var cookiesTime = 3 / 24;

function refreshCookieCopy() {
    var cookieData = _$.cookie();
    _$.each(cookieData, function (_key, _value) {
        _$.cookie(_key, _value, {path: cookiesPath, expires: cookiesTime});
    });
}

/**
 * 设置cookie
 * @param key
 * @param value
 */
function setCookie(key, value) {
    refreshCookie();
    $.cookie(key, value, {path: cookiesPath, expires: cookiesTime});
}
/**
 * 设置_cookie
 * @param key
 * @param value
 */
function setCookieCopy(key, value) {
    refreshCookieCopy();
    _$.cookie(key, value, {path: cookiesPath, expires: cookiesTime});
}

/**
 * 设置cookie by time
 * @param key
 * @param value
 */
function setCookieByTime(key, value, time) {
    // refreshCookie();
    $.cookie(key, value, {path: cookiesPath, expires: time});
}

/**
 * 获取cookie
 * @param key
 */
function getCookie(key) {

    return $.cookie(key);
}

/**
 * 删除cookie
 * @param key
 */
function deleteCookie(key) {
    $.removeCookie(key, {path: cookiesPath});
}

/**
 * 清除cookie
 */
function clearCookie() {
    var cookieData = $.cookie();
    $.each(cookieData, function (key, value) {
        deleteCookie(key);
    });
}

/**
 * 清除单个cookie
 */


//清除cookie
function clearCookieSingle(name) {
    setCookie(name, "", -1);
}
/**
 * 获取时间
 */

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * 时间转换为时间戳
 * @param time
 */

function dateChange(time) {
    var date1 = new Date(time);
    var time2 = date1.getTime();
    return time2;
}

/**
 * 将"2018-05-19T08:04:52.000+0000"这种格式的时间转化为正常格式
 * @param time
 */
function timeFormat(time) {
    var d = new Date(time);

    var year = d.getFullYear();       //年  
    var month = d.getMonth() + 1;     //月  
    var day = d.getDate();            //日  

    var hh = d.getHours();            //时  
    var mm = d.getMinutes();          //分  
    var ss = d.getSeconds();           //秒  

    var clock = year + "/";

    if (month < 10)
        clock += "0";

    clock += month + "/";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

/**
 * 获取系统时间作为创建时间
 */
function getFormatDate() {
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
}

/**
 * 获取系统时间作为创建时间,有秒
 */
function getFormatDateSecond() {
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute+ ":" + second;
}

/**
 * 获取系统时间明天作为创建时间,有秒
 */
GetDateStr = function(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+"-"+m+"-"+d;
}

//判断是否登录
function isLoginFun() {
    var isLogin = getCookie('isLogin');
    if (isLogin != "1") {
        window.location.href = 'login.html';
    }
}

//退出登录
function logOut() {
    deleteCookie('userName');
    deleteCookie('isLogin');
    window.location.href = 'login.html'
}
