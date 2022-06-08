/**
 * Created by Amy on 2018/8/6.
 */
var question = '';
var questionTitle = '';
var da1 = {};
$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    createDtePicker();
    $("#ctl01_ContentPlaceHolder1_spanTitle").html("创建调查问卷");
    if (getCookie('TQuestionName') != undefined && getCookie('TQuestionContent') != undefined) {
        $("#questionName").val(getCookie('TQuestionName'));
        $("#questionContent").val(getCookie('TQuestionContent'));
    }
});

// 创建时间选择器
function createDtePicker() {
    var nowTime = getFormatDateSecond();
    var startTime = GetDateStr(1);
    var date = new Date();
    var milliseconds = date.getTime() + 1000 * 60 * 60 * 24 * 8;                                    //n代表天数,加号表示未来n天的此刻时间,减号表示过去n天的此刻时间   n:7
    //getTime()方法返回Date对象的毫秒数,但是这个毫秒数不再是Date类型了,而是number类型,所以需要重新转换为Date对象,方便格式化
    var newDate = new Date(milliseconds);
    var dateAfterNow = timeFormat(newDate);
    $('#config-demo').daterangepicker({
        // "autoApply": true,
        "minDate": nowTime,
        "startDate": startTime,
        "endDate": dateAfterNow,
        "timePicker": true,
        "timePicker24Hour": true,
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
        // //console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });
}

function GetRequest() {
    //url例子：www.bicycle.com?id="123456"&Name="bicycle"；
    var url = decodeURI(location.search); //?id="123456"&Name="bicycle";
    var object = {};
    if (url.indexOf("?") != -1)//url中存在问号，也就说有参数。
    {
        var str = url.substr(1);  //得到?后面的字符串
        var strs = str.split("&");  //将得到的参数分隔成数组[id="123456",Name="bicycle"];
        for (var i = 0; i < strs.length; i++) {
            object[strs[i].split("=")[0]] = strs[i].split("=")[1]
        }
    }
    return object;
}

//立即创建
function quickCreate() {
    var chooseTimeRange = $("#config-demo").val();
    var nowTimeInput = chooseTimeRange.split(' ~ ')[0];
    var questionendTime = chooseTimeRange.split(' ~ ')[1];
    debugger
    var urlObj = GetRequest();

    deleteCookie('questionInfo');
    var questionName = $('#questionName').val();
    var questionContent = $('#questionContent').val();
    if (questionName == '') {
        layer.msg("调查名称不能为空!", {icon: 2});
        return
    } else if (questionContent == '') {
        layer.msg("调查说明不能为空!", {icon: 2});
        return
    }
    var questionInfo = '';
    if (getCookie('isEdit') != '2') {
        deleteCookie('QuestionId');
    }
    //console.log(getCookie('projectIdForCreate'));
    //console.log(getCookie('QuestionId'));
    debugger;
    //直接创建问卷
    if (urlObj.i == "") {
        var da = {
            'questionName': questionName,
            'questionContent': questionContent,
            'startTime': dateChange(nowTimeInput),
            'endTime': dateChange(questionendTime),
            'questionStop': '5',
            'dataId': getCookie('dataId'),
            // 'projectId': getCookie('projectIdForCreate')
        };
        if (getCookie('TProjectId') != undefined) {    //创建问卷
            da.projectId = getCookie('TProjectId');
            da.questionStop = '5';
        }
        var url = '/addQuestionnaire';
        commonAjaxPost(true, url, da, addQuestionnaireSuccess);
    } else {
        //导入问卷
        var url = '/queryQuestionnaireAll';
        var da = {'id': getCookie('QuestionId')};
        commonAjaxPost(true, url, da, queryQuestionnaireAllSuccess);
        da1 = {
            'questionName': questionName,
            'questionContent': questionContent,
            'startTime': dateChange(nowTimeInput),
            'endTime': dateChange(questionendTime),
            'questionStop': '5',
            'dataId': getCookie('dataId'),
            'projectId': getCookie('TProjectId')
        };
        // deleteCookie('QuestionId');
    }
}

function addQuestionnaireSuccess(res) {
    //console.log(res);
    if (res.code == '666') {
        layer.msg(res.message, {icon: 1});
        deleteCookie('dataId');
        window.location.href = 'myQuestionnaires.html'
    } else if (res.code == "333") {
        layer.msg(res.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(res.message, {icon: 2});
    }
}

function queryQuestionnaireAllSuccess(res) {
    //console.log(res);
    if (res.code == '666') {
        da1.questionList = res.data.question;
        da1.questionTitle = res.data.questionTitle;
        //console.log(da1);
        var url = '/addQuestionnaire';
        commonAjaxPost(true, url, da1, addQuestionnaireSuccess);
    } else {
        layer.msg(res.message, {icon: 2});
    }
}