/**
 * Created by Amy on 2018/8/8.
 */

var questionName = getCookie('questionName');
var questionContent = getCookie('questionContent');
var questionId = getCookie('questionId');
var endTime = getCookie('endTime').replace(/-/g, '/');
var startTime = getCookie('creationDate').replace(/-/g, '/');
var dataId = getCookie('dataId');

var ifEditQuestType = getCookie('ifEditQuestType');
//console.log(ifEditQuestType);

$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    createTimePicker();
    $("#questionName").val(questionName);
    $("#questionContent").val(questionContent);

    queryAllDataType();
    $("#questionStartEndTime").val(startTime + " ~ " + endTime);

    $("#ifRemand").css('display','none');
});


//铺调查类型
function queryAllDataType() {
    var url = '/admin/queryAllDataType';
    var da = {'parentId': '1'};
    commonAjaxPost(true, url, da, function (result) {
        //console.log(result);
        if (result.code == "666") {
            var belongType = document.getElementById('belongType');
            belongType.options.length = 0;
            for (var i = 0; i < result.data.length; i++) {
                var collOpt = document.createElement('option');
                collOpt.innerText = result.data[i].name;
                collOpt.value = result.data[i].id;
                belongType.appendChild(collOpt);
                $("#belongType").val(dataId);
            }
            if (ifEditQuestType == "false") {
                $("#belongType").attr("disabled", "disabled");
                $("#ifRemand").css('display','block');
            }

        } else if (result.code == "333") {
            layer.msg(result.message, {icon: 2});
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 1000)
        } else {
            layer.msg(result.message, {icon: 2})
        }
    });
}

//点击“保存修改”，编辑问卷
function modifyQuest() {
    var questionNameInt = $("#questionName").val();
    var questionContentInt = $("#questionContent").val();
    var belongType = $("#belongType").val();
    var questionStarTimeInt = $("#questionStartEndTime").val().split(" ~ ")[0];
    var questionEnTimeInt = $("#questionStartEndTime").val().split(" ~ ")[1];

    var questionStarTimeIntTemp = dateChange(questionStarTimeInt);
    var questionEnTimeIntTemp = dateChange(questionEnTimeInt);

    if (questionNameInt.trim() == '') {
        layer.msg('请完整填写项目名称')
    } else if (questionContentInt.trim() == '') {
        layer.msg('请完整填写项目描述')
    } else {
        var url = '/modifyQuestionnaireInfo';
        var data = {
            "id": questionId,
            "questionName": questionNameInt,
            "questionContent": questionContentInt,
            "dataId": belongType,
            "startTime": questionStarTimeIntTemp,
            "endTime": questionEnTimeIntTemp
        };
        commonAjaxPost(true, url, data, modifyQuestSuccess);
    }
}

//修改问卷信息成功
function modifyQuestSuccess(result) {
    if (result.code == '666') {
        layer.msg('修改成功', {icon: 1});
        setTimeout(function () {
            window.location.href = 'myQuestionnaires.html';
        }, 1000);
    } else if (result.code == "333") {
        layer.msg(result.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(result.message, {icon: 2});
    }
}

// 创建时间区域选择
function createTimePicker() {
    var beginTimeStore = '';
    var endTimeStore = '';
    var nowTime = getFormatDateSecond();

    var start1 = startTime;
    // //console.log(start)
    //console.log(nowTime);

    // var date = new Date();
    // var milliseconds = date.getTime() + 1000 * 60 * 60 * 24 * 30;                                    //n代表天数,加号表示未来n天的此刻时间,减号表示过去n天的此刻时间   n:7
    // var newDate = new Date(milliseconds);
    // var dateAfterNow = timeFormat(newDate);

    $('#questionStartEndTime').daterangepicker({
        "minDate": nowTime,
        "startDate": startTime,
        "endDate": endTime,
        "timePicker": true,
        "timePicker12Hour": true,
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
        //console.log(start)
        //console.log(end)
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
