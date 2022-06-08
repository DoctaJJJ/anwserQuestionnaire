/**
 * Created by Amy on 2018/8/2.
 */
var userNameOld = '';

$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    createTimePicker();
    //getUserRole();
    changeTitle();
});

// 判断是编辑还是创建
function changeTitle() {
    var userTitle = getCookie("userTitle");
    var text = "<h1 class=\"hd-title pull-left\">" + userTitle + "用户</h1>";
    $("#userTitle").append(text);
    if (userTitle == '创建') {
        $("#userName").removeAttr("disabled");
        $('#createBtn').val('立即创建');
        $('#noPassword').css('display', 'block');

        // 创建用户
        $('#createBtn').click(function () {
            var userName = $("#userName").val();
            var password = $("#password").val();
            var timeRange = $("#config-demo").val();
            var startTime = dateChange(timeRange.split(' ~ ')[0]);
            var stopTime = dateChange(timeRange.split(' ~ ')[1]);

            if (userName == "") {
                layer.msg("账号不能为空", {icon: 2});
            } else if (password == "") {
                layer.msg("密码不能为空", {icon: 2});
            } else if (timeRange == "") {
                layer.msg("起止时间不能为空", {icon: 2});
            }  else if (userName.length > 10 || password.length > 10) {
                layer.msg("账号或者密码最多不可超过10个字", {icon: 2});
            } else {
                var roleId = $("#userRoleAll").val();

                var url = '/admin/addUserInfo';
                var data = {
                    "username": userName,
                    "password": password,
                    "startTime": startTime,
                    "stopTime": stopTime
                };
                commonAjaxPost(true, url, data, function (result) {
                    if (result.code == "666") {
                        layer.msg("用户创建成功，权限已开启", {icon: 1});
                        setTimeout(function () {
                            window.location.href = 'userManage.html';
                        }, 1000)
                    }else if(result.code == "50003"){
                        //用户名已存在
                        layer.msg(result.message, {icon: 2});
                    } else if (result.code == "333") {
                        layer.msg(result.message, {icon: 2});
                        setTimeout(function () {
                            window.location.href = 'login.html';
                        }, 1000)
                    } else {
                        layer.msg(result.message, {icon: 2});
                    }
                })
            }
        })

    } else {
        $("#userName").attr("disabled","disabled");
        $('#createBtn').val('保存修改');
        $('#noPassword').css('display', 'none');
        var userId = getCookie('userId');
        var url = '/admin/selectUserInfoById';
        var data = {
            'id': userId
        };
        commonAjaxPost(true, url, data, function (result) {
            if (result.code == "666") {
                var userInfo = result.data;
                userNameOld = $("#userName").val(userInfo.username);
                $("#password").val(userInfo.password);
                $("#config-demo").val(userInfo.startTime.replace(/-/g,'/') + " ~ " + userInfo.stopTime.replace(/-/g,'/'));
                var roleId = userInfo.roleId;
                $("#userRoleAll").val(roleId);

            } else if (result.code == "333") {
                layer.msg(result.message, {icon: 2});
                setTimeout(function () {
                    window.location.href = 'login.html';
                }, 1000)
            } else {
                layer.msg(result.message, {icon: 2})
            }
        })

        $('#createBtn').click(function () {
            var userName = $("#userName").val();
            var password = $("#password").val();
            var timeRange = $("#config-demo").val();
            var startTime = dateChange(timeRange.split(' ~ ')[0]);
            var stopTime = dateChange(timeRange.split(' ~ ')[1]);

            if (userName == "") {
                layer.msg("账号不能为空", {icon: 2});
            } else if (password == "") {
                layer.msg("密码不能为空", {icon: 2});
            } else if (timeRange == "") {
                layer.msg("起止时间不能为空", {icon: 2});
            } else {

                var roleId = $("#userRoleAll").val();

                var url = '/admin/modifyUserInfo';

                if(userNameOld == userName){
                    var data = {
                        "id": userId,
                        // "username": userName,
                        "password": password,
                        "startTime": startTime,
                        "stopTime": stopTime
                    };
                }else{
                    var data = {
                        "id": userId,
                        "username": userName,
                        "password": password,
                        "startTime": startTime,
                        "stopTime": stopTime
                    };
                }

                commonAjaxPost(true, url, data, function (result) {
                    //console.log(result)
                    if (result.code == "666") {
                        layer.msg("用户信息修改成功", {icon: 1});
                        setTimeout(function () {
                            window.location.href = 'userManage.html';
                        }, 1000)
                    }else if(result.code == "50003"){
                        //用户名已存在
                        layer.msg(result.message, {icon: 2});
                    } else if (result.code == "333") {
                        layer.msg(result.message, {icon: 2});
                        setTimeout(function () {
                            window.location.href = 'login.html';
                        }, 1000)
                    } else {
                        layer.msg(result.message, {icon: 2})
                    }
                })
            }
        });
    }

}


// 获取所有用户角色
/* function getUserRole() {
    var url = '/admin/queryRoleInfo';
    $.ajax({
        "async": false,
        "url": httpRequestUrl + url,
        "type": "POST",
        // "data": JSON.stringify(data),
        "dataType": "json",
        "contentType": "application/json",
        success: function (result) {
            //console.log(result)
            var belongType = document.getElementById('userRoleAll');
            belongType.options.length = 0;
            for (var i = 0; i < result.data.length; i++) {
                var collOpt = document.createElement('option');
                collOpt.innerText = result.data[i].role;
                collOpt.value = result.data[i].id;
                belongType.appendChild(collOpt);
            }
        }
    });
} */

// 创建时间区域选择
function createTimePicker() {
    var beginTimeStore = '';
    var endTimeStore = '';
    var nowTime = getFormatDateSecond();
    var date = new Date();
    var milliseconds = date.getTime() + 1000 * 60 * 60 * 24 * 30;                                    //n代表天数,加号表示未来n天的此刻时间,减号表示过去n天的此刻时间   n:7
    var newDate = new Date(milliseconds);
    var dateAfterNow = timeFormat(newDate);

    $('#config-demo').daterangepicker({
        "minDate": nowTime,
        "startDate": nowTime,
        "endDate": dateAfterNow,
        "timePicker": true,
        "timePicker24Hour": true,
        "linkedCalendars": false,
        // "autoUpdateInput": false,
        "locale": {
            "resetLabel": "重置",
            "format": 'YYYY/MM/DD HH:mm:ss',
            "separator": " ~ ",//
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "fromLabel": "起始时间",
            "toLabel": "结束时间'",
            "customRangeLabel": "自定义",
            "weekLabel": "W",
            "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
            "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            "firstDay": 1
        },
    }, function (start, end, label) {
        // beginTimeStore = start;
        // endTimeStore = end;
        // //console.log(this.startDate.format(this.locale.format));
        // //console.log(this.endDate.format(this.locale.format));
        // if (!this.startDate) {
        //     this.element.val('');
        // } else {
        //     this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
        // }
    });

}