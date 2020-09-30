/**
 * Created by Amy on 2018/8/6.
 */
var flag = true;
var projectName = '';
var projectContent = '';

$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
});

//点击“立即创建”，创建项目
function createProject() {
    projectName = $("#projectName").val();
    projectContent = $("#inputIntro").val();
    createProjectRight();
}

function createProjectRight() {
    if (flag == true) {
        if (projectName.trim() == '') {
            layer.msg('请完整填写项目名称')
        } else if (projectContent.trim() == '') {
            layer.msg('请完整填写项目描述')
        } else {
            var userName = getCookie("userName");
            var url = '/addProjectInfo';
            var data = {
                "projectName": projectName,
                "projectContent": projectContent,
                "createdBy": userName,
                "lastUpdatedBy": userName
            };
            commonAjaxPost(false, url, data, function (result) {
                //console.log(result)
                if (result.code == "666") {
                    layer.msg('创建成功');
                    setTimeout(function () {
                        window.location.href = "myQuestionnaires.html";
                    }, 700)
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
