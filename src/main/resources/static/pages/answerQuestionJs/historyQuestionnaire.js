/**
 * Created by Amy on 2018/8/9.
 */
var questIdModal = '';

$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    getHistoryQuest();
    createDtePicker();
});

function getHistoryQuest() {
    var keyWord = $("#keyWord").val();

    var url = '/queryQuestionnaireList';
    var data = {
        "questionName": keyWord
    };
    commonAjaxPost(true, url, data, getHistoryQuestSuccess);

}

function getHistoryQuestSuccess(result) {
    //console.log(result)
    if (result.code == "666") {
        var questionInfo = result.data;
        $("#historyList").empty();
        $("#noHistoryQuest").css('display', 'none');

        if (questionInfo.length) {
            var text = "";
            for (var i = 0; i < questionInfo.length; i++) {
                text += "<tr  style=\"color:#333333;background-color:White;font-size:14px;height:36px;\">";
                text += "    <td align=\"center\" style=\"width:450px;\">";
                text += "        <span>" + questionInfo[i].questionName + "</span>";
                text += "    </td>";
                text += "    <td align=\"center\" style=\"width:350px;\">";
                text += "        <span>" + questionInfo[i].projectName + "</span>";
                text += "    </td>";
                text += "    <td align=\"center\" style=\"width:230px;\">";
                text += "        <span>" + questionInfo[i].endTime.replace(/-/g,'/') + "</span>";
                text += "    </td>";
                text += "    <td align=\"center\" style=\"width:82px;\">" + questionInfo[i].count + "</td>";
                text += "    <td align=\"center\">";
                text += "        <a id=\"btnSend\" href=\"javascript:void(0)\" onclick=\"previewQuest(" + "'" + questionInfo[i].id + "'" + ")\">查看</a>";
                text += "    </td>";
                text += "    <td style='width: 80px;cursor: pointer' id='getRecoverRunModal" + i + "' align=\"center\" onclick=\"recoverRun(" + "'" + questionInfo[i].id + "'" + "," + i + ")\">";
                text += "        <img src=\"../images/run.gif\" height=\"16\" width=\"16\"/>";
                text += "    </td>";
                text += "    <td style='width: 80px;cursor: pointer' align=\"center\" onclick=\"deleteHistoryQuest(" + "'" + questionInfo[i].id + "'" + ")\">";
                text += "        <img src=\"../images/cross.gif\" height=\"16\" width=\"16\"/>";
                text += "";
                text += "    </td>";
                text += "";
                text += "</tr>";
            }
            $("#historyList").append(text)
        } else {
            $("#noHistoryQuest").css('display', 'block');
        }
    } else if (result.code == "333") {
        layer.msg(result.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(result.message, {icon: 2})
    }
}

function deleteHistoryQuest(id) {
    //询问框
    layer.confirm('您确认要删除此问卷吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        var url = '/deleteQuestionnaireById';
        var data = {
            "id": id
        };
        commonAjaxPost(true, url, data, function (result) {
            //console.log(result);
            if (result.code == "666") {
                layer.msg(result.message, {icon: 1});
                getHistoryQuest();
            } else if (result.code == "333") {
                layer.msg(result.message, {icon: 2});
                setTimeout(function () {
                    window.location.href = 'login.html';
                }, 1000)
            } else {
                layer.msg(result.message, {icon: 2});
            }
        });
    }, function () {
    });
}

// 恢复运行
function recoverRun(id, i) {
    questIdModal = id;
    $("#getRecoverRunModal" + i).attr('data-toggle', 'modal');
    $("#getRecoverRunModal" + i).attr('data-target', '#recoverRunModal');
    $("#endTimeModal").val("");
}

function recoverRunBtn() {
    var endTimeModal = $("#endTimeModal").val();
    if (endTimeModal == "") {
        layer.msg("问卷结束时间不能为空", {icon: 2});
    } else {
        var endTimeModalChan = dateChange(endTimeModal);

        var url = '/modifyHistoryQuestionnaireStatus';
        var data = {
            "id": questIdModal,
            "endTime": endTimeModalChan
        }
        commonAjaxPost(true, url, data, function (result) {
            if (result.code == '666') {
                $("#recoverRunModal").modal('hide');
                layer.msg("问卷已恢复运行，请在我的项目中查看", {icon: 1});
                getHistoryQuest();
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
}

// 预览问卷
function previewQuest(id) {
    window.open('previewQuestionnaire.html?=' + id);
}

// 创建时间选择器
function createDtePicker() {
    var beginTimeTake;
    var nowTime = getFormatDate();

    $('#endTimeModal').daterangepicker({
            minDate: nowTime,
            singleDatePicker: true,
            showDropdowns: true,
            // autoUpdateInput: false,
            timePicker24Hour: true,
            startDate: new Date(),
            timePicker: true,
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

            }
        },
        function (start, end, label) {
            beginTimeTake = start;
            if (!this.startDate) {
                this.element.val('');
            } else {
                this.element.val(this.startDate.format(this.locale.format));
            }
        });
}

//回车事件
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        getHistoryQuest();
    }
});

