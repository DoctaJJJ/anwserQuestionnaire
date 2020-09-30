/**
 * Created by Amy on 2018/8/7.
 */

var projectName = getCookie('projectName');
var projectContent = getCookie('projectContent');
var projectId = getCookie('projectId');
// //console.log(projectName, projectContent, projectId);

var flag = true;

$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    $("#projectName").val(projectName);
    $("#inputIntro").val(projectContent);
});

//点击“保存修改”，编辑项目
function modifyProject() {
    var projectNameInt = $("#projectName").val();
    var projectContentInt = $("#inputIntro").val();
    editProjectRight(projectNameInt, projectContentInt);
}

function editProjectRight(projectNameInt, projectContentInt) {

    if (flag == true) {
        if (projectNameInt.trim() == '') {
            layer.msg('请完整填写项目名称')
        } else if (projectContentInt.trim() == '') {
            layer.msg('请完整填写项目描述')
        } else {
            var url = '/modifyProjectInfo';
            var data = {
                "id": projectId,
                "projectName": projectNameInt,
                "projectContent": projectContentInt

            };
            commonAjaxPost(true, url, data, function (result) {
                if (result.code == '666') {
                    layer.msg('修改成功');
                    setTimeout(function () {
                        window.location.href = "myQuestionnaires.html"
                    }, 1000)
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
    }
}



