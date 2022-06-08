var tipMsg = "在此题后插入新题";
var movie_boxForInsert = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
var newContain = '';
var questionList = [];    //所有题和选项
var questionTitles = '';   //所有的题目
var questionInfo = '';
var projectId = '';
var dataId = '';
var endTime = '';
var startTime = '';
var questionIdForChange = '';
var questionStop = '';

//判断cookie里有没有问卷id、项目id
var aaa = 0;
var bbb = 0;
var questionId
$(function () {
    console.log(getCookie("QuestionId"));
    deleteCookie('previewId');
    var urlObj = GetRequest();
    if (Object.keys(urlObj).length == 0) {
        setCookie('QuestionId', getCookie("QuestionId"));
        var da = {'id': getCookie("QuestionId")};
        console.log(getCookie("QuestionId"));
    } else {
        deleteCookie('QuestionId');
        deleteCookie('isEdit');
        deleteCookie('projectIdForCreate');
        var qId = urlObj.qId;
        var i = urlObj.i;
        var qIdStr = "";
        if (qId != undefined) {
            qIdStr = $.base64.decode(qId);
            setCookie('QuestionId', qIdStr);
            //如果为编辑模板就不清空QuestionId
            setCookie('isEdit', '1');
        } else if (i != undefined) {
            qIdStr = $.base64.decode(i);
            setCookie('QuestionId', qIdStr);
        }
        questionId = qIdStr;
        var da = {'id': questionId};
    }

    var url = '/queryQuestionnaireAll';
    //commonAjaxPost(true, url, da, queryQuestionnaireAllSuccess);

});


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

//添加题
function addQuestion(index) {
    //index 选择添加问题的类型
    if (index == "-1") {
        return;
    }
    var movie_box = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
    var Grade = $(".yd_box").find(".movie_box").length + 1;
    switch (index) {
        case "0": //单选
        case "1": //多选
        case "2": //问答
            var wjdc_list = '<ul class="wjdc_list"></ul>'; //问答 单选 多选
            var danxuan = "";
            if (index == "0") {
                danxuan = '【单选】';
            } else if (index == "1") {
                danxuan = '【多选】';
            } else if (index == "2") {
                danxuan = '【问答】';
            }

            wjdc_list = $(wjdc_list).append(' <li><div class="tm_btitlt"><i class="nmb">' + Grade + '</i>. <i class="btwenzi">请编辑问题？</i><span class="tip_wz"><a href=\'javascript:void(0)\'  class=\'bida\'>必答题</a></span></div></li>');
            if (index == "2") {
                wjdc_list = $(wjdc_list).append('<li>  <label> <textarea name="" cols="" rows="" class="input_wenbk btwen_text btwen_text_dx" readonly="readonly"></textarea></label> </li>');
            }

            if (tipMsg == "取消插入点") {
                $("#status_tip").css("display", "none");
                // tipMsg = "在此题后插入新题";
                //在div后添加新题的容器
                movie_boxForInsert = $(movie_boxForInsert).append(wjdc_list);
                movie_boxForInsert = $(movie_boxForInsert).append('<div class="dx_box" data-t="' + index + '"></div>');
                newContain.after(movie_boxForInsert);
                var xh_num = 0;
                //重新编号
                $(".yd_box").find(".movie_box").each(function () {
                    $(".yd_box").children(".movie_box").eq(xh_num).find(".nmb").text(xh_num + 1);
                    xh_num++;
                    //alert(xh_num);
                });
                movie_boxForInsert = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
            } else {
                movie_box = $(movie_box).append(wjdc_list);
                movie_box = $(movie_box).append('<div class="dx_box" data-t="' + index + '"></div>');
                $(".yd_box").append(movie_box);
            }
            break;
        case "3":
            var wjdc_list = ' <div class="wjdc_list">' +
                '<h4 class="title_wjht">' +
                '<i class="nmb">' + Grade + '</i>. <span class="btwenzi">请编辑问题!</span>' +
                '<span class="tip_wz"><a href=\'javascript:void(0)\'  class=\'bida\'>必答题</a></span>' +
                '</h4>'
                + ' <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tswjdc_table">' +
                '<tbody></tbody>' +
                '</table>' +
                '</div>'; //问答 单选 多选
            if (tipMsg == "取消插入点") {
                $("#status_tip").css("display", "none");
                // tipMsg = "在此题后插入新题";
                //在div后添加新题的容器
                movie_boxForInsert = $(movie_boxForInsert).append(wjdc_list);
                movie_boxForInsert = $(movie_boxForInsert).append('<div class="dx_box" data-t="' + index + '"></div>');
                newContain.after(movie_boxForInsert);
                var xh_num = 0;
                //重新编号
                $(".yd_box").find(".movie_box").each(function () {
                    $(".yd_box").children(".movie_box").eq(xh_num).find(".nmb").text(xh_num + 1);
                    xh_num++;
                    //alert(xh_num);
                });
                movie_boxForInsert = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
            } else {
                movie_box = $(movie_box).append(wjdc_list);
                movie_box = $(movie_box).append('<div class="dx_box" data-t="' + index + '"></div>');
                $(".yd_box").append(movie_box);
            }
            break;
        case "4":  //量表
            var wjdc_list = ' <div class="wjdc_list">' +
                '<h4 class="title_wjht">' +
                '<i class="nmb">' + Grade + '</i>.<span class="btwenzi">请编辑问题!</span>' +
                '<span class="tip_wz"><a href=\'javascript:void(0)\'  class=\'bida\'>必答题</a></span>' +
                '</h4>'
                + ' <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tswjdc_table">' +
                '<tbody></tbody>' +
                '</table>' +
                '</div>'; //问答 单选 多选
            // var num = $(".yd_box").find(".dx_box")
            // $(".yd_box").find(".dx_box").hide();
            if (tipMsg == "取消插入点") {
                $("#status_tip").css("display", "none");
                // tipMsg = "在此题后插入新题";
                //在div后添加新题的容器
                movie_boxForInsert = $(movie_boxForInsert).append(wjdc_list);
                movie_boxForInsert = $(movie_boxForInsert).append('<div class="dx_box" data-t="' + index + '"></div>');
                newContain.after(movie_boxForInsert);
                var xh_num = 0;
                //重新编号
                $(".yd_box").find(".movie_box").each(function () {
                    $(".yd_box").children(".movie_box").eq(xh_num).find(".nmb").text(xh_num + 1);
                    xh_num++;
                    //alert(xh_num);
                });
                movie_boxForInsert = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
            } else {
                movie_box = $(movie_box).append(wjdc_list);
                movie_box = $(movie_box).append('<div class="dx_box" data-t="' + index + '"></div>');
                $(".yd_box").append(movie_box);
            }
            break;
    }
    $(".movie_box").hover(function () {
        var html_cz = "<div class='kzqy_czbut'>" +
            "<a href='javascript:void(0)' id='insert' style='text-decoration:underline;border: none;color:#f00'onclick='insertQuestion(this)'>" + tipMsg + "</a>" +
            "<a href='javascript:void(0)' class='sy'>上移</a>" +
            "<a href='javascript:void(0)'  class='xy'>下移</a>" +
            "<a href='javascript:void(0)'  class='first'>最前</a>" +
            "<a href='javascript:void(0)'  class='last'>最后</a>" +
            "<a href='javascript:void(0)'  class='copy'>复制</a>" +
            "<a href='javascript:void(0)'  class='bianji'>编辑</a>" +
            // "<a href='javascript:void(0)'  class='bida'>必答题</a>" +
            "<a href='javascript:void(0)' class='del'>删除</a>" +
            "</div>";
        $(this).css({
            "border": "1px solid #fdb553"
        });
        $(this).children(".wjdc_list").after(html_cz);
    }, function () {
        $(this).css({
            "border": "1px solid #fff"
        });
        $(this).children(".kzqy_czbut").remove();
    });
    // var num=$(".yd_box").find(".dx_box");
    $(".yd_box").find(".dx_box").hide();
    // console.log(num.length)
    if (tipMsg == "取消插入点") {
        tipMsg = "在此题后插入新题";
        newContain.next().mouseenter();
        var finalMovieBox = newContain.next();
        var finalBianJi = finalMovieBox.find(".bianji")[0];
        $(finalBianJi).click();
        newContain.next().mouseleave();
    } else {
        var boxNum = $(".yd_box").children(".movie_box").length;
        $($(".yd_box").children(".movie_box")[boxNum - 1]).mouseenter();
        var finalMovieBox = $(".yd_box").children(".movie_box")[boxNum - 1];
        var finalBianJi = $(finalMovieBox).find(".bianji")[0];
        $(finalBianJi).click();
        $($(".yd_box").children(".movie_box")[boxNum - 1]).mouseleave();
    }
}

//鼠标移上去显示按钮
$(".movie_box").hover(function () {
    var html_cz = "<div class='kzqy_czbut'>" +
        "<a href='javascript:void(0)' class='sy'><span class='design-icon design-up'></span>上移</a>" +
        "<a href='javascript:void(0)'  class='xy'><span class='design-icon design-down'></span>下移</a>" +
        "<a href='javascript:void(0)'  class='bianji'><span class='design-icon design-edit'></span>编辑</a>" +
        // "<a href='javascript:void(0)'  class='bida'><span class='design-icon design-bida'></span>必答题</a>" +
        "<a href='javascript:void(0)' class='del' ><span class='design-icon'></span>删除</a>" +
        "</div>";
    $(this).css({
        "border": "1px solid #0099ff"
    });
    $(this).children(".wjdc_list").after(html_cz);
}, function () {
    $(this).css({
        "border": "1px solid #fff"
    });
    $(this).children(".kzqy_czbut").remove();
});

//下移
$(".xy").live("click", function () {
    //文字的长度
    var leng = $(".yd_box").children(".movie_box").length;
    var dqgs = $(this).parent(".kzqy_czbut").parent(".movie_box").index();
    if (dqgs < leng - 1) {
        var czxx = $(this).parent(".kzqy_czbut").parent(".movie_box");
        var xyghtml = czxx.next().html();
        var syghtml = czxx.html();
        czxx.next().html(syghtml);
        czxx.html(xyghtml);
        //序号
        czxx.children(".wjdc_list").find(".nmb").text(dqgs + 1);
        czxx.next().children(".wjdc_list").find(".nmb").text(dqgs + 2);
    } else {
        alert("最后一题不能再下移");
    }
});

//上移
$(".sy").live("click", function () {
    //文字的长度
    var leng = $(".yd_box").children(".movie_box").length;
    var dqgs = $(this).parent(".kzqy_czbut").parent(".movie_box").index();
    if (dqgs > 0) {
        var czxx = $(this).parent(".kzqy_czbut").parent(".movie_box");
        var xyghtml = czxx.prev().html();
        var syghtml = czxx.html();
        czxx.prev().html(syghtml);
        czxx.html(xyghtml);
        //序号
        czxx.children(".wjdc_list").find(".nmb").text(dqgs + 1);
        czxx.prev().children(".wjdc_list").find(".nmb").text(dqgs);

    } else {
        alert("第一题不能再上移");
    }
});

//最前
$(".first").live("click", function () {
    //文字的长度

    var dqgs = $(this).parent(".kzqy_czbut").parent(".movie_box").index();
    var text = $(this).parent(".kzqy_czbut").parent(".movie_box");
    console.log(text)
    console.log(text.html())
    console.log($(".yd_box").children()[0])
    if (dqgs > 0) {
        console.log(dqgs)
        var czxx = $(this).parent(".kzqy_czbut").parent(".movie_box");
        var xyghtml = $(".yd_box:first-child").children(".movie_box").eq(0).html();   //第一题的内容
        console.log($(".yd_box").children().html())
        $(".yd_box").children(".movie_box").eq(0).before('<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);">' + text.html() + '</div>')
        // var syghtml = czxx.html();          //当前题的内容
        // $(".yd_box").children(".movie_box").eq(0).html(syghtml);          //交换
        // czxx.html(xyghtml);
        //序号+
        $(this).parent(".kzqy_czbut").parent(".movie_box").remove()
        $(".yd_box").children(".movie_box").eq(0).children(".kzqy_czbut").remove()
        $(".yd_box").children(".movie_box").eq(0).hover(function () {
            var html_cz = "<div class='kzqy_czbut'>" +
                "<a href='javascript:void(0)' id='insert' style='text-decoration:underline;border: none;color:#f00'onclick='insertQuestion(this)'>" + tipMsg + "</a>" +
                "<a href='javascript:void(0)' class='sy'>上移</a>" +
                "<a href='javascript:void(0)'  class='xy'>下移</a>" +
                "<a href='javascript:void(0)'  class='first'>最前</a>" +
                "<a href='javascript:void(0)'  class='last'>最后</a>" +
                "<a href='javascript:void(0)'  class='copy'>复制</a>" +
                "<a href='javascript:void(0)'  class='bianji'>编辑</a>" +
                // "<a href='javascript:void(0)'  class='bida'>必答题</a>" +
                "<a href='javascript:void(0)' class='del'>删除</a>" +
                "</div>";
            $(this).css({
                "border": "1px solid #fdb553"
            });
            $(this).children(".wjdc_list").after(html_cz);
        }, function () {
            $(this).css({
                "border": "1px solid #fff"
            });
            $(this).children(".kzqy_czbut").remove();
        });
        var xh_num = 0;
        //重新编号
        $(".yd_box").find(".movie_box").each(function () {
            $(".yd_box").children(".movie_box").eq(xh_num).find(".nmb").text(xh_num + 1);
            xh_num++;
        });
    } else {
        alert("第一题不能再上移");
    }
});

//最后
$(".last").live("click", function () {

    var leng = $(".yd_box").children(".movie_box").length;
    var dqgs = $(this).parent(".kzqy_czbut").parent(".movie_box").index();
    var text = $(this).parent(".kzqy_czbut").parent(".movie_box");
    if (dqgs < leng - 1) {
        var czxx = $(this).parent(".kzqy_czbut").parent(".movie_box");
        var xyghtml = $(".yd_box").children(".movie_box").eq(leng - 1).html();   //最后一题的内容
        $(".yd_box").children(".movie_box").eq(leng - 1).after('<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);">' + text.html() + '</div>')
        // var syghtml = czxx.html();          //当前题的内容
        // $(".yd_box").children(".movie_box").eq(leng - 1).html(syghtml);          //交换
        // czxx.html(xyghtml);
        $(this).parent(".kzqy_czbut").parent(".movie_box").remove()
        $(".yd_box").children(".movie_box").eq(leng - 1).children(".kzqy_czbut").remove()
        $(".yd_box").children(".movie_box").eq(leng - 1).hover(function () {
            var html_cz = "<div class='kzqy_czbut'>" +
                "<a href='javascript:void(0)' id='insert' style='text-decoration:underline;border: none;color:#f00'onclick='insertQuestion(this)'>" + tipMsg + "</a>" +
                "<a href='javascript:void(0)' class='sy'>上移</a>" +
                "<a href='javascript:void(0)'  class='xy'>下移</a>" +
                "<a href='javascript:void(0)'  class='first'>最前</a>" +
                "<a href='javascript:void(0)'  class='last'>最后</a>" +
                "<a href='javascript:void(0)'  class='copy'>复制</a>" +
                "<a href='javascript:void(0)'  class='bianji'>编辑</a>" +
                // "<a href='javascript:void(0)'  class='bida'>必答题</a>" +
                "<a href='javascript:void(0)' class='del'>删除</a>" +
                "</div>";
            $(this).css({
                "border": "1px solid #fdb553"
            });
            $(this).children(".wjdc_list").after(html_cz);
        }, function () {
            $(this).css({
                "border": "1px solid #fff"
            });
            $(this).children(".kzqy_czbut").remove();
        });
        //序号
        var xh_num = 0;
        //重新编号
        $(".yd_box").find(".movie_box").each(function () {
            $(".yd_box").children(".movie_box").eq(xh_num).find(".nmb").text(xh_num + 1);
            xh_num++;
        });
    } else {
        alert("最后一题不能再下移");
    }
});

//复制
$(".copy").live("click", function () {
    var movie_box = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
    var czxx = $(this).parent(".kzqy_czbut").parent(".movie_box");
    var syghtml = czxx.html();          //当前题的内容
    movie_box = $(movie_box).append(syghtml);
    $(czxx).after(movie_box);
    $(".movie_box").hover(function () {
        var html_cz = "<div class='kzqy_czbut'>" +
            "<a href='javascript:void(0)' id='insert' style='text-decoration:underline;border: none;color:#f00'onclick='insertQuestion(this)'>" + tipMsg + "</a>" +
            "<a href='javascript:void(0)' class='sy'>上移</a>" +
            "<a href='javascript:void(0)'  class='xy'>下移</a>" +
            "<a href='javascript:void(0)'  class='first'>最前</a>" +
            "<a href='javascript:void(0)'  class='last'>最后</a>" +
            "<a href='javascript:void(0)'  class='copy'>复制</a>" +
            "<a href='javascript:void(0)'  class='bianji'>编辑</a>" +
            // "<a href='javascript:void(0)'  class='bida'>必答题</a>" +
            "<a href='javascript:void(0)' class='del'>删除</a>" +
            "</div>";
        $(this).css({
            "border": "1px solid #fdb553"
        });
        $(this).children(".wjdc_list").after(html_cz);
    }, function () {
        $(this).css({
            "border": "1px solid #fff"
        });
        $(this).children(".kzqy_czbut").remove();
    });
    //重新编号
    var xh_num = 0;
    $(".yd_box").find(".movie_box").each(function () {
        $(".yd_box").children(".movie_box").eq(xh_num).find(".nmb").text(xh_num + 1);
        xh_num++;
    });
});

//删除
$(".del").live("click", function () {
    var czxx = $(this).parent(".kzqy_czbut").parent(".movie_box");
    var zgtitle_gs = czxx.parent(".yd_box").find(".movie_box").length;
    var xh_num = 0;
    //重新编号
    czxx.remove();
    $(".yd_box").find(".movie_box").each(function () {
        $(".yd_box").children(".movie_box").eq(xh_num).find(".nmb").text(xh_num + 1);
        xh_num++;
    });
});

//编辑
$(".bianji").live("click", function () {
    var indexShow = ''
    console.log($(".dx_box"))
    $(".dx_box").each(function () {
        //判断每一个div，其css中display是否为block
        if ($(this).css("display") == "block") {
            layer.alert('请将未保存的内容进行保存后再进行编辑操作', {
                skin: 'layui-layer-lan'
                , closeBtn: 0
            });
            indexShow = 'fndsk'
        }
    })
    console.log($(".dx_box").html())
    // console.log($(this).parent(".wjdc_list"))
    // console.log($(this).parent(".wjdc_list"))
    //编辑的时候禁止其他操作
    // $(this).siblings().hide();
    //$(this).parent(".kzqy_czbut").parent(".movie_box").unbind("hover");
    if (indexShow == '') {
        var dxtm = $(".dxuan").html();                  //单选
        var duoxtm = $(".duoxuan").html();             //多选
        var tktm = $(".tktm").html();                 //填空
        var jztm = $(".jztm").html();                //矩阵
        var lbtm = $(".lb").html();                //矩阵
        //接受编辑内容的容器    kzqy_czbut 编辑的div
        var dx_rq = $(this).parent(".kzqy_czbut").parent(".movie_box").find(".dx_box");
        console.log(dx_rq)
        console.log(dx_rq.show().html)
        var title = dx_rq.attr("data-t");
        //alert(title);
        //题目选项的个数
        var timlrxm = $(this).parent(".kzqy_czbut").parent(".movie_box").children(".wjdc_list").children("li").length;
        //单选题目
        if (title == 0) {
            dx_rq.show().html(dxtm);
            //模具题目选项的个数
            var bjxm_length = dx_rq.find(".title_itram").children(".kzjxx_iteam").length;
            var dxtxx_html = dx_rq.find(".title_itram").children(".kzjxx_iteam").html();
            //添加选项题目
            for (var i_tmxx = bjxm_length; i_tmxx < timlrxm - 1; i_tmxx++) {
                dx_rq.find(".title_itram").append("<div class='kzjxx_iteam'>" + dxtxx_html + "</div>");
            }
            //赋值文本框
            //题目标题
            var texte_bt_val = $(this).parent(".kzqy_czbut").parent(".movie_box").find(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text();
            dx_rq.find(".btwen_text").val(texte_bt_val);
            //遍历题目项目的文字
            var bjjs = 0;
            $(this).parent(".kzqy_czbut").parent(".movie_box").find(".wjdc_list").children("li").each(function () {
                //可选框框
                var ktksfcz = $(this).find("input").hasClass("wenb_input");
                if (ktksfcz) {
                    var jsxz_kk = $(this).index();
                    dx_rq.find(".title_itram").children(".kzjxx_iteam").eq(jsxz_kk - 1).find("label").remove();
                }
                //题目选项
                var texte_val = $(this).find("span").text();
                dx_rq.find(".title_itram").children(".kzjxx_iteam").eq(bjjs - 1).find(".input_wenbk").val(texte_val);
                bjjs++

            });
        }
        //多选题目
        if (title == 1) {
            dx_rq.show().html(duoxtm);
            //模具题目选项的个数
            var bjxm_length = dx_rq.find(".title_itram").children(".kzjxx_iteam").length;
            var dxtxx_html = dx_rq.find(".title_itram").children(".kzjxx_iteam").html();
            //添加选项题目
            for (var i_tmxx = bjxm_length; i_tmxx < timlrxm - 1; i_tmxx++) {
                dx_rq.find(".title_itram").append("<div class='kzjxx_iteam'>" + dxtxx_html + "</div>");
                //alert(i_tmxx);
            }
            //赋值文本框
            //题目标题
            var texte_bt_val = $(this).parent(".kzqy_czbut").parent(".movie_box").find(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text();
            dx_rq.find(".btwen_text").val(texte_bt_val);
            //遍历题目项目的文字
            var bjjs = 0;
            $(this).parent(".kzqy_czbut").parent(".movie_box").find(".wjdc_list").children("li").each(function () {
                //可选框框
                var ktksfcz = $(this).find("input").hasClass("wenb_input");
                if (ktksfcz) {
                    var jsxz_kk = $(this).index();
                    dx_rq.find(".title_itram").children(".kzjxx_iteam").eq(jsxz_kk - 1).find("label").remove();
                }
                //题目选项
                var texte_val = $(this).find("span").text();
                dx_rq.find(".title_itram").children(".kzjxx_iteam").eq(bjjs - 1).find(".input_wenbk").val(texte_val);
                bjjs++
            });
        }
        //填空题目
        if (title == 2) {
            dx_rq.show().html(tktm);
            //赋值文本框
            //题目标题
            var texte_bt_val = $(this).parent(".kzqy_czbut").parent(".movie_box").find(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text();
            dx_rq.find(".btwen_text").val(texte_bt_val);
        }
        //矩阵题目
        if (title == 3) {
            dx_rq.show().html(jztm);
            //模具题目选项的个数
            var bjxm_length = dx_rq.find(".title_itram").children(".kzjxx_iteam").length;
            var dxtxx_html = dx_rq.find(".title_itram").children(".kzjxx_iteam").html();
            var jcxxxx = $(this).parent(".kzqy_czbut").parent(".movie_box") //编辑题目区
            // var jcxxxx = $(".yd_box").children(".movie_box") //编辑题目区

            //题目标题
            var texte_bt_val = $(this).parent(".kzqy_czbut").parent(".movie_box").children(".wjdc_list").children(".title_wjht").children(".btwenzi").text();
            if (texte_bt_val != '请编辑问题!') {
                dx_rq.find(".btwen_text").val(texte_bt_val);
            } else {
                dx_rq.find(".btwen_text").attr('placeholder', texte_bt_val)
            }
            var bjjs_bj = 0;
            //存选项的数组
            var questionOption = [];  //单个题的所有选项
            // console.log(jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').length);
            var lineTitleNum = jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').length;
            var lineTitle = '';
            for (var m = 1; m < lineTitleNum; m++) {
                if (m == lineTitleNum - 1) {
                    lineTitle += jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(m).find('td').eq(0).html(); //题目选项文字
                } else {
                    lineTitle += jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(m).find('td').eq(0).html() + ','; //题目选项文字
                }
                //行标题
                dx_rq.find(".leftbtwen_text").val(lineTitle);
            }
            lineTitle = '';
            var chooseOptions = jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(0).find('td').length;

            for (var i = 1; i < chooseOptions; i++) {
                var chooseOption = jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(0).find('td').eq(i).html(); //题目选项文字
                if (chooseOption != '') {
                    if ($(".dx_box").find(".input_wenbk")[i]) {
                        if (chooseOption == '') {
                            $($(".dx_box").find(".input_wenbk")[i]).val('选项'); //获取填写信息
                        } else {
                            $($(".dx_box").find(".input_wenbk")[i]).val(chooseOption); //获取填写信息
                        }
                    } else {
                        $("#zj").append('<div class="kzjxx_iteam">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input" value="选项"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                            '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                            '                                            </div>')
                        $($(".dx_box").find(".input_wenbk")[i]).val(chooseOption); //获取填写信息
                    }
                }
            }
            if (texte_bt_val == '请编辑问题!'||texte_bt_val == '') {

            }else {
                console.log($(".dx_box").find(".kzjxx_iteam"))
                var totalLength = $(".dx_box").find(".kzjxx_iteam").length
                for (var inde = 0; inde < chooseOptions; inde++) {
                    console.log($($(".dx_box").find(".input_wenbk")[inde]))
                    console.log($($(".dx_box").find(".input_wenbk")[inde]).val() )
                    console.log($(".dx_box").find(".kzjxx_iteam").eq(inde).find(".input_wenbk"))
                    console.log($($(".dx_box").find(".kzjxx_iteam").eq(inde).find(".input_wenbk")))
                    // if ($($(".dx_box").find(".input_wenbk")[inde]).val() == '') {
                    if ($($(".dx_box").find(".kzjxx_iteam").eq(inde).find(".input_wenbk")).val() == '') {
                        // $(".dx_box").find(".input_wenbk")[inde].parentNode.style.display = "none"
                        // $(".dx_box").find(".input_wenbk")[inde].remove()
                        console.log( $(".dx_box").find(".kzjxx_iteam")[inde])
                        console.log( $(".dx_box").find(".kzjxx_iteam").length)
                        for(var removeList = inde;removeList<totalLength;removeList++){

                            $($(".dx_box").find(".kzjxx_iteam")[inde]).remove()
                        }
                        return;
                        // $(".dx_box").find(".del_xm")[inde].remove()
                        // $(".dx_box").find(".input_wenbk")[inde].parentNode.removeChild($(".dx_box").find(".input_wenbk")[inde])
                        // $(".dx_box").find(".input_wenbk")[inde].pa
                        //
                        // rentNode.removeChild($(".dx_box").find("a")[inde])
                        // $(".dx_box").find(".input_wenbk")[inde].clean()
                    }
                }
            }
        }
        //量表题目
        if (title == 4) {
            var endTextIndex = $(this).parent(".kzqy_czbut").parent(".movie_box").children(".wjdc_list").children(".tswjdc_table").find('td').length
            var findText = $(this).parent(".kzqy_czbut").parent(".movie_box").children(".wjdc_list").children(".tswjdc_table").find('td')
            if (findText.eq(0).html() != null) {
                var lbStr = ''
                for (var m = 1; m < endTextIndex - 1; m++) {
                    if (m == 1) {
                        lbStr += '<div class="kzjxx_iteam">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_word" value="' + findText.eq(0).html() + '"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'\' )  this.value=\'\'">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_grade" value="' + findText.eq(m).children("input").val() + '"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                            '                                                <!--<label class="gradeChoose">-->\n' +
                            '                                                <!--<input name="" type="checkbox" value="" class="fxk">-->\n' +
                            '                                                <!--<span>不计分</span>-->\n' +
                            '                                                <!--</label>-->\n' +
                            '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                            '                                            </div>'
                    } else if (m == endTextIndex - 2) {
                        lbStr += '<div class="kzjxx_iteam">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_word" value="' + findText.eq(m + 1).html() + '"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'\' )  this.value=\'\'">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_grade" value="' + findText.eq(m).children("input").val() + '"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                            '                                                <!--<label class="gradeChoose">-->\n' +
                            '                                                <!--<input name="" type="checkbox" value="" class="fxk">-->\n' +
                            '                                                <!--<span>不计分</span>-->\n' +
                            '                                                <!--</label>-->\n' +
                            '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                            '                                            </div>'
                    } else {
                        lbStr += '<div class="kzjxx_iteam">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_word" value=""\n' +
                            '                                                       onblur="if(!this.value)this.value=\'\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'\' )  this.value=\'\'">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_grade" value="' + findText.eq(m).children("input").val() + '"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                            '                                                <!--<label class="gradeChoose">-->\n' +
                            '                                                <!--<input name="" type="checkbox" value="" class="fxk">-->\n' +
                            '                                                <!--<span>不计分</span>-->\n' +
                            '                                                <!--</label>-->\n' +
                            '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                            '                                            </div>'
                    }
                }

                $("#lb").html(lbStr)
                dx_rq.show().html($(".lb").html());

            } else {
                var lbStr1 = ''
                for (var m = 1; m < 6; m++) {
                    if (m == 1) {
                        lbStr1 += '<div class="kzjxx_iteam">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_word" value="很满意"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'\' )  this.value=\'\'">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_grade" value="5"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                            '                                                <!--<label class="gradeChoose">-->\n' +
                            '                                                <!--<input name="" type="checkbox" value="" class="fxk">-->\n' +
                            '                                                <!--<span>不计分</span>-->\n' +
                            '                                                <!--</label>-->\n' +
                            '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                            '                                            </div>'
                    } else if (m == 5) {
                        lbStr1 += '<div class="kzjxx_iteam">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_word" value="很不满意"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'\' )  this.value=\'\'">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_grade" value="1"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                            '                                                <!--<label class="gradeChoose">-->\n' +
                            '                                                <!--<input name="" type="checkbox" value="" class="fxk">-->\n' +
                            '                                                <!--<span>不计分</span>-->\n' +
                            '                                                <!--</label>-->\n' +
                            '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                            '                                            </div>'
                    } else {
                        lbStr1 += '<div class="kzjxx_iteam">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_word" value=""\n' +
                            '                                                       onblur="if(!this.value)this.value=\'\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'\' )  this.value=\'\'">\n' +
                            '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_grade" value="' + (6 - m) + '"\n' +
                            '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                            '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                            '                                                <!--<label class="gradeChoose">-->\n' +
                            '                                                <!--<input name="" type="checkbox" value="" class="fxk">-->\n' +
                            '                                                <!--<span>不计分</span>-->\n' +
                            '                                                <!--</label>-->\n' +
                            '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                            '                                            </div>'
                    }
                }

                $("#lb").html(lbStr1)
                dx_rq.show().html($(".lb").html());
            }

            var texte_bt_val = $(this).parent(".kzqy_czbut").parent(".movie_box").children(".wjdc_list").children(".title_wjht").children(".btwenzi").text();
            // console.log(texte_bt_val)
            if (texte_bt_val != '请编辑问题!') {
                dx_rq.find(".btwen_text").val(texte_bt_val);
            } else {
                dx_rq.find(".btwen_text").attr('placeholder', texte_bt_val)
            }
        }
    }

});

//增加选项
$(".zjxx").live("click", function () {
    var zjxx_html = $(this).prev(".title_itram").children(".kzjxx_iteam").html();
    $(this).prev(".title_itram").append("<div class='kzjxx_iteam'>" + zjxx_html + "</div>");
});

//设置必答
$(".bida").live("click", function (e) {
    if (e.target.innerText == "必答题") {
        e.target.innerText = "取消必答题"
    } else {
        e.target.innerText = "必答题"
    }
});
//删除一行
$(".del_xm").live("click", function () {
    //获取编辑题目的个数
    var zuxxs_num = $(this).parent(".kzjxx_iteam").parent(".title_itram").children(".kzjxx_iteam").length;
    if (zuxxs_num > 1) {
        $(this).parent(".kzjxx_iteam").remove();
    } else {
        alert("手下留情");
    }
});

//取消编辑
$(".dx_box .qxbj_but").live("click", function () {
    $(this).parent(".bjqxwc_box").parent(".dx_box").empty().hide();
    $(".movie_box").css({
        "border": "1px solid #fff"
    });
    $(".kzqy_czbut").remove();
    //
});


//完成编辑（编辑）
$(".swcbj_but").live("click", function () {

    var jcxxxx = $(this).parent(".bjqxwc_box").parent(".dx_box"); //编辑题目区
    var questionType = jcxxxx.attr("data-t"); //获取题目类型
console.log(jcxxxx.find(".btwen_text").val())
    if(jcxxxx.find(".btwen_text").val()!=""){

        switch (questionType) {
            case "0": //单选
            case "1": //多选
                //编辑题目选项的个数
                var bjtm_xm_length = jcxxxx.find(".title_itram").children(".kzjxx_iteam").length; //编辑选项的 选项个数
                var xmtit_length = jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").length - 1; //题目选择的个数

                //赋值文本框
                //题目标题
                var texte_bt_val_bj = jcxxxx.find(".btwen_text").val(); //获取问题题目
                jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text(texte_bt_val_bj); //将修改过的问题题目展示

                //删除选项
                for (var toljs = xmtit_length; toljs > 0; toljs--) {
                    jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(toljs).remove();
                }
                //遍历题目项目的文字
                var bjjs_bj = 0;
                jcxxxx.children(".title_itram").children(".kzjxx_iteam").each(function () {
                    //题目选项
                    var texte_val_bj = $(this).find(".input_wenbk").val(); //获取填写信息
                    var inputType = 'radio';
                    //jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(bjjs_bj + 1).find("span").text(texte_val_bj);
                    if (questionType == "1") {
                        inputType = 'checkbox';
                    }
                    var li = '<li><label><input name="a" type="' + inputType + '" value=""><span>' + texte_val_bj + '</span></label></li>';
                    jcxxxx.parent(".movie_box").children(".wjdc_list").append(li);

                    bjjs_bj++;
                });
                break;
            case "2":
                var texte_bt_val_bj = jcxxxx.find(".btwen_text").val(); //获取问题题目
                jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").eq(0).find(".tm_btitlt").children(".btwenzi").text(texte_bt_val_bj); //将修改过的问题题目展示
                break;
            case "3": //矩阵
                jcxxxx.parent(".movie_box").children(".wjdc_list").children("table").children("tbody").empty();
                var querstionType = jcxxxx.find(".xzqk:checked").val();
                var title = jcxxxx.find("textarea.input_wenbk.btwen_text").val(); //获取标题
                var x_iteam = new Array(); //获取 横向选项
                var y_iteam = " ," + jcxxxx.find(".leftbtwen_text").val(); //左标题
                jcxxxx.find(".title_itram").children("div.kzjxx_iteam").each(function () {
                    var texte_val_bj = $(this).find(".input_wenbk").val(); //获取填写信息
                    var checkbox = $(this).find("input.fxk").is(':checked'); //是否可填空
                    if(texte_val_bj==""){
                        texte_val_bj = "选项"
                    }
                    x_iteam.push({
                        name: texte_val_bj,
                        checkbox: checkbox
                    });

                });
                var y_iteams = y_iteam.split(",");
                console.log(y_iteams)
                if(y_iteams.length==2&&y_iteams[1]==""){
                    layer.alert('请将试题填写完整', {
                        skin: 'layui-layer-lan'
                        , closeBtn: 0
                    });
                    return;
                }
                console.log("fhdaskfhka")
                for (var item in y_iteams) { //行
                    var tr = '<tr>',
                        td = '';
                    td += '<td>' + y_iteams[item] + '</td>';
                    for (var i = 0; i < x_iteam.length; i++) { //列
                        if (item != 0) {
                            var inputType = 'radio';
                            if (querstionType == "1") {
                                inputType = 'checkbox';
                            }
                            td += '<td><input name="c' + item + '" type="' + inputType + '" value=""> </td>';
                        } else {
                            td += '<td>' + x_iteam[i].name + '</td>';
                        }
                    }
                    jcxxxx.parent(".movie_box").children(".wjdc_list").children(".title_wjht").children(".btwenzi").text(title);
                    jcxxxx.parent(".movie_box").children(".wjdc_list").children("table").children("tbody").append(tr + td);
                }
                break;
            case "4": //量表
                jcxxxx.parent(".movie_box").children(".wjdc_list").children("table").children("tbody").empty();
                var title = jcxxxx.find("textarea.input_wenbk.btwen_text").val(); //获取标题
                var x_iteam = new Array();      //获取 选项文字
                jcxxxx.find(".title_itram").children("div.kzjxx_iteam").each(function () {
                    var texte_val_bj = $(this).find(".lb_word").val();              //获取选项文字
                    var texte_val_bjGrade = $(this).find(".lb_grade").val();              //获取选项分数
                    var checkbox = $(this).find("input.fxk").is(':checked');         //是否可填空
                    x_iteam.push({
                        name: texte_val_bj,
                        grade: texte_val_bjGrade,
                        checkbox: checkbox
                    });
                });
                var lbStr1 = ''
                for (var m = 0; m < x_iteam.length; m++) {
                    lbStr1 += '<div class="kzjxx_iteam">\n' +
                        '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_word" value="' + x_iteam[m].name + '"\n' +
                        '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                        '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                        '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_grade" value="' + x_iteam[m].grade + '"\n' +
                        '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                        '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                        '                                                <!--<label class="gradeChoose">-->\n' +
                        '                                                <!--<input name="" type="checkbox" value="" class="fxk">-->\n' +
                        '                                                <!--<span>不计分</span>-->\n' +
                        '                                                <!--</label>-->\n' +
                        '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                        '                                            </div>'
                }
                console.log(lbStr1)
                $(".lb").find("#lb").html(lbStr1)
                console.log($(".lb").html())
                var tr = '<tr>',
                    td = '';
                td += '<td>' + x_iteam[0].name + '</td>';
                for (var i = 0; i < x_iteam.length; i++) { //列
                    if (item != 0) {
                        var inputType = 'radio';
                        if (querstionType == "1") {
                            inputType = 'checkbox';
                        }
                        td += '<td><input name="c1" type="' + inputType + '" value="' + x_iteam[i].grade + '" style="margin-right: 5px;">' + x_iteam[i].grade + '</td>';
                    } else {
                        td += '<td>' + x_iteam[i].name + '</td>';
                    }
                }
                td += '<td>' + x_iteam[x_iteam.length - 1].name + '</td>';
                jcxxxx.parent(".movie_box").children(".wjdc_list").children(".title_wjht").children(".btwenzi").text(title);
                jcxxxx.parent(".movie_box").children(".wjdc_list").children("table").children("tbody").append(tr + td);
                console.log(x_iteam)
                break;
        }
        //清除
        $(this).parent(".bjqxwc_box").parent(".dx_box").empty().hide();
    }else{
        layer.alert('请填写题目再保存', {
            skin: 'layui-layer-lan'
            , closeBtn: 0
        });
    }
});

//在此题后插入新题
function insertQuestion(that) {
    if (tipMsg == "取消插入点") {
        $("#status_tip").css("display", "none");
        tipMsg = "在此题后插入新题";
        return
    }
    //获取点击的“插入新题的最父级div”
    newContain = $(that).parent().parent(".movie_box");
    $("#status_tip").css("display", "block");
    tipMsg = "取消插入点";
}

//全部编辑完成按钮
function editFinish() {
    getQuestion();
    if (questionList.length == 0) {
        layer.msg("没有题不能保存");
    } else {
        for (var i = 0; i < questionList.length; i++) {
            if (questionList[i].questionType != "2") {
                if (questionList[i].questionOption == "") {
                    alert("存在未编辑的问题，无法保存");
                    return;
                }
            }
        }
        //获取问卷名称
        var questionName = $('.questionTitle').text();
        //获取问卷说明
        var questionContent = $('#pater_desc').html();
        var da = '';
        var url = '';
        da = {
            'questionList': questionList,
            'questionTitle': questionTitles, //所有的题目
            'questionId': questionId,
            'dataId': dataId,
            'questionName': questionName,
            'questionContent': questionContent,
            'endTime': ''
        };
        var urlQ = '/modifyQuestionnaire';
        commonAjaxPost(true, urlQ, da, addQuestionnaireSuccess)
    }
}

//预览
function previewQuestion() {
    //判断有没有问卷id 没有就提示先保存
    // console.log(getCookie('previewId'));
    var idQ = getCookie('previewId');
    if (idQ == undefined) {
        layer.alert('请保存之后再预览', {
            skin: 'layui-layer-lan'
            , closeBtn: 0
        });
    } else {
        deleteCookie('previewId');
        // window.location.href = 'previewQuestionnaire.html?i=' + idQ;
        window.open("previewQuestionnaire.html?i=" + idQ);
    }
}

//修改标题和问卷说明
function changeInfo() {
    //获取当前的
    var questionName = $('.questionTitle').text(); //获取问卷名称
    var questionContent = $('#pater_desc').html();//获取问卷说明

    //在layer中铺数据
    layer.open({
        type: 1 //Page层类型
        , area: ['500px', '340px']
        , title: '信息修改'
        , shade: 0.6 //遮罩透明度
        , anim: 2 //0-6的动画形式，-1不开启
        , content: '<div style="padding: 20px 10px 0 10px;" id="cancelChange">' +
        '<div class="form-group"><label style="margin-bottom: 10px">问卷标题:</label><input class="form-control" id="questionName"></div>' +
        '<div class="form-group"><label>问卷说明:</label><textarea class="form-control" style="height: 80px;" id="questionContent"></textarea></div>' +
        '<div class="form-group" style="margin-left: 330px">' +
        '<button class="layui-btn layui-btn-primary" onclick="cancelChange()">取消</button>' +
        '<button class="layui-btn layui-btn-normal" onclick="sureChange()">确定</button></div>' +
        '</div>'
    });
    $('#questionName').val(questionName);
    $('#questionContent').val(questionContent);
}

//点击取消，关闭layer
function cancelChange() {
    layer.closeAll();
}

//获取设计的题
function getQuestion() {
    questionList = [];
    var questionNum = $(".yd_box").find(".movie_box").length;
    questionTitles = '';
    for (var i = 0; i < questionNum; i++) {
        var jcxxxx = $(".yd_box").children(".movie_box").eq(i); //获取带有题目类型的div
        var questionType = jcxxxx.children(".dx_box").attr("data-t"); //获取题目类型
        var questionObj = {questionType: "", questionTitle: "", questionOption: [], important: ""};  //单个题和选项
        questionObj.questionType = questionType;
        switch (questionType) {
            case "0": //单选
            case "1": //多选
                console.log(jcxxxx.children(".wjdc_list").children("li").children(".tm_btitlt").find(".bida").html())

                //题目选项的个数
                var xmtit_length = jcxxxx.parent(".movie_box").children(".wjdc_list").children("li").length - 1;
                //题目标题
                var texte_bt_val_bj = jcxxxx.children(".wjdc_list").children("li").children(".tm_btitlt").find(".btwenzi").html();
                questionObj.questionTitle = texte_bt_val_bj;
                questionTitles += texte_bt_val_bj + "&";
                //遍历题目项目的文字
                var bjjs_bj = 0;
                //存选项的数组
                var questionOption = [];  //单个题的所有选项
                jcxxxx.children(".wjdc_list").children("li").each(function () {
                    var questionOptionObj = {lineTitle: "", optionWord: "", optionGrade: ""};  //单个题的单个选项
                    var chooseOption = jcxxxx.children(".wjdc_list").children("li").eq(bjjs_bj + 1).find("span").text(); //题目选项文字
                    questionOptionObj.optionWord = chooseOption;  //选项文字
                    questionOption.push(questionOptionObj);
                    bjjs_bj++;
                });
                questionOption.splice(-1, 1);
                questionObj.important = jcxxxx.children(".wjdc_list").children("li").children(".tm_btitlt").find(".bida").html();
                questionObj.questionOption = questionOption;
                questionList.push(questionObj);
                break;
            case "2":
                //题目标题
                var texte_bt_val_bj = jcxxxx.children(".wjdc_list").children("li").children(".tm_btitlt").find(".btwenzi").html();
                questionTitles += texte_bt_val_bj + "&";
                questionObj.questionTitle = texte_bt_val_bj;
                questionObj.important = jcxxxx.children(".wjdc_list").children("li").children(".tm_btitlt").find(".bida").html();
                questionList.push(questionObj);
                break;
            case "3": //矩阵
                //题目标题
                var texte_bt_val_bj = jcxxxx.children(".wjdc_list").children(".title_wjht").children(".btwenzi").html();
                questionTitles += texte_bt_val_bj + "&";
                questionObj.questionTitle = texte_bt_val_bj;
                //遍历题目项目的文字
                var bjjs_bj = 0;
                //存选项的数组
                var questionOption = [];  //单个题的所有选项
                if (jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(0).find('td').length > jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').length) {
                    jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(0).find('td').each(function () {
                        var questionOptionObj = {lineTitle: "", optionWord: "", optionGrade: ""};  //单个题的单个选项
                        var lineTitle = jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(bjjs_bj + 1).find('td').eq(0).html(); //题目选项文字
                        if (lineTitle == null) {
                            lineTitle = '';
                        }
                        questionOptionObj.lineTitle = lineTitle;  //行标题
                        var chooseOption = jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(0).find('td').eq(bjjs_bj + 1).html(); //题目选项文字
                        if (chooseOption == null) {
                            chooseOption = '';
                        }
                        questionOptionObj.optionWord = chooseOption;  //选项文字
                        questionOption.push(questionOptionObj);
                        bjjs_bj++;
                    });
                } else {
                    jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').each(function () {
                        var questionOptionObj = {lineTitle: "", optionWord: "", optionGrade: ""};  //单个题的单个选项
                        var lineTitle = jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(bjjs_bj + 1).find('td').eq(0).html(); //题目选项文字
                        if (lineTitle == null) {
                            lineTitle = '';
                        }
                        questionOptionObj.lineTitle = lineTitle;  //行标题
                        var chooseOption = jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(0).find('td').eq(bjjs_bj + 1).html(); //题目选项文字
                        if (chooseOption == null) {
                            chooseOption = '';
                        }
                        questionOptionObj.optionWord = chooseOption;  //选项文字
                        questionOption.push(questionOptionObj);
                        bjjs_bj++;
                    });
                }
                if (questionOption[questionOption.length - 1].lineTitle == '') {
                    //去掉最后一个为空的元素
                    questionOption.splice(-1, 1);
                }
                questionObj.important = jcxxxx.children(".wjdc_list").children(".title_wjht").find(".bida").html();
                questionObj.questionOption = questionOption;
                questionList.push(questionObj);
                break;
            case "4": //量表
                //题目标题
                var texte_bt_val_bj = jcxxxx.children(".wjdc_list").children(".title_wjht").children(".btwenzi").html();
                questionTitles += texte_bt_val_bj + "&";
                questionObj.questionTitle = texte_bt_val_bj;
                //遍历题目项目的文字
                var bjjs_bj = 0;
                //存选项的数组
                var questionOption = [];  //单个题的所有选项
                jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(0).find('td').each(function () {
                    var questionOptionObj = {lineTitle: "", optionWord: "", optionGrade: ""};  //单个题的单个选项
                    var chooseOption = jcxxxx.children(".wjdc_list").children(".tswjdc_table").children('tbody').find('tr').eq(0).find('td').eq(bjjs_bj).text(); //题目选项文字
                    questionOptionObj.optionWord = chooseOption;  //选项文字
                    questionOption.push(questionOptionObj);
                    bjjs_bj++;
                });
                questionObj.important = jcxxxx.children(".wjdc_list").children(".title_wjht").find(".bida").html();
                questionObj.questionOption = questionOption;
                questionList.push(questionObj);
                break;
        }
    }
    ;
    console.log(questionList)
}

//确定按钮-------修改标题 和说明
function sureChange() {
    //获取修改之后的val
    var questionName = $('#questionName').val();
    var questionContent = $('#questionContent').val();
    if (questionName == "") {
        layer.msg("问卷标题不能为空", {icon: 2});
        return;
    } else if (questionContent == "") {
        layer.msg("问卷说明不能为空", {icon: 2});
        return;
    }
    //铺在界面上
    $('.questionTitle').text(questionName); //获取问卷名称
    $('#pater_desc').html(questionContent);//获取问卷说明
    layer.closeAll();
}

//完成问卷设计的总按钮 的回掉
function addQuestionnaireSuccess(res) {
    // console.log(res);
    if (res.code == '666') {
        deleteCookie('QuestionId');
        deleteCookie('previewId');
        layer.msg(res.message, {icon: 1});
        if (res.message == '添加成功') {
            setCookie('QuestionId', res.data);
            setCookie('previewId', res.data);
            judgeQuestionId();
            // console.log(getCookie('QuestionId'));
            questionList = [];
        } else if (res.message == '修改成功') {
            setCookie('QuestionId', res.data);
            setCookie('previewId', res.data);
            judgeQuestionId();
            // console.log(getCookie('QuestionId'));
        }
    } else if (res.code == "333") {
        layer.msg(res.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(res.message, {icon: 2});
    }
}

//根据id查询问卷详情
function queryQuestionnaireAllSuccess(res) {
    console.log(res);
    deleteCookie('questionList');
    if (res.code == '666') {
        // alert("查询问卷详情成功");
        //查询的是历史问卷
        questionIdForChange = res.data.id;
        dataId = res.data.dataId;
        console.log(res.data.questionName);
        $('.questionTitle').text(res.data.questionName); //问卷名称
        $('#pater_desc').html(res.data.questionContent);//问卷说明
        if (res.data.questionStop == '4' || res.data.questionStop == '0') {
            if (getCookie('isEdit') != '1') {
                deleteCookie('QuestionId');
                judgeQuestionId();
                $('.questionTitle').text(questionInfo.questionName); //问卷名称
                $('#pater_desc').html(questionInfo.questionContent);//问卷说明
            }
        } else if (res.data.questionStop == '5') {
            endTime = res.data.endTime;
            startTime = res.data.startTime;
            questionStop = res.data.questionStop;
        }
        var question = res.data.question;
        setCookie('questionList', question);
        if (question != null) {
            for (var i = 0; i < question.length; i++) {
                // console.log(question[i]);
                showQuestion(question[i]);
            }
        }
    } else if (result.code == "333") {
        layer.msg(res.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(res.message, {icon: 2});
    }
}

//展示题
function showQuestion(question) {
    //question.questionType 选择添加问题的类型
    var index = question.questionType;
    if (index == "-1") {
        return;
    }
    var movie_box = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
    var Grade = $(".yd_box").find(".movie_box").length + 1;
    switch (index) {
        case "0": //单选
        case "1": //多选
        case "2": //问答
            var wjdc_list = '<ul class="wjdc_list"></ul>'; //问答 单选 多选
            var danxuan = "";
            var type = '';
            if (index == "0") {
                danxuan = '【单选】';
                type = 'radio';
            } else if (index == "1") {
                danxuan = '【多选】';
                type = 'checkbox';
            } else if (index == "2") {
                danxuan = '【问答】';
            }
            wjdc_list = $(wjdc_list).append(' <li><div class="tm_btitlt"><i class="nmb">' + Grade + '</i>. <i class="btwenzi">' + question.questionTitle + '</i><span class="tip_wz"><a href=\'javascript:void(0)\'  class=\'bida\'>' + question.important + '</a></span></div></li>');
            for (var i = 0; i < question.questionOption.length; i++) {
                var li = '';
                li = '<li><label><input name="a' + i + '" type="' + type + '" value=""><span>' + question.questionOption[i].optionWord + '</span></label></li>';
                wjdc_list = $(wjdc_list).append(li);
            }
            if (index == "2") {
                wjdc_list = $(wjdc_list).append('<li>  <label> <textarea name="" cols="" rows="" class="input_wenbk btwen_text btwen_text_dx" readonly="readonly"></textarea></label> </li>');
            }

            if (tipMsg == "取消插入点") {
                $("#status_tip").css("display", "none");
                tipMsg = "在此题后插入新题";
                //在div后添加新题的容器
                movie_boxForInsert = $(movie_boxForInsert).append(wjdc_list);
                movie_boxForInsert = $(movie_boxForInsert).append('<div class="dx_box" data-t="' + index + '"></div>');
                newContain.after(movie_boxForInsert);
                var xh_num = 0;
                //重新编号
                $(".yd_box").find(".movie_box").each(function () {
                    $(".yd_box").children(".movie_box").eq(xh_num).find(".nmb").text(xh_num + 1);
                    xh_num++;
                    //alert(xh_num);
                });
                movie_boxForInsert = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
            } else {
                movie_box = $(movie_box).append(wjdc_list);
                movie_box = $(movie_box).append('<div class="dx_box" data-t="' + index + '"></div>');
                $(".yd_box").append(movie_box);
            }
            break;
        case "3":
            var wjdc_list = ' <div class="wjdc_list">' +
                '<h4 class="title_wjht">' +
                '<i class="nmb">' + Grade + '</i>.<span class="btwenzi">' + question.questionTitle + '</span>' +
                '<span class="tip_wz"><a href="javascript:void(0)"  class="bida">' + question.important + '</a></span>' +
                '</h4>'
            '</div>';
            var tswjdc_table = ' <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tswjdc_table">' +
                '<tbody></tbody>' +
                '</table>';
            var tr = '<tr><td></td></tr>';
            // var trR = '<tr><td>' + question.questionOption[0].lineTitle + '</td></tr>';
            for (var k = 0; k < question.questionOption.length; k++) {
                var td = '';
                if (question.questionOption[k].optionWord != "") {
                    td = '<td>' + question.questionOption[k].optionWord + '</td>';
                    tr = $(tr).append(td);
                    tswjdc_table = $(tswjdc_table).append(tr);
                }
            }
            for (var i = 0; i < question.questionOption.length; i++) {
                if (question.questionOption[i].lineTitle != '') {
                    var trR = '<tr><td>' + question.questionOption[i].lineTitle + '</td></tr>';
                    for (var m = 0; m < question.questionOption.length; m++) {
                        if (question.questionOption[m].optionWord != "") {
                            var td = '';
                            td = '<td><input name="c' + i + '" type="radio" value="' + m + '"></td>';
                            trR = $(trR).append(td);
                        }
                    }
                }
                tswjdc_table = $(tswjdc_table).append(trR);
            }
            var jzStr = ''
            for (var m = 0; m < question.questionOption.length; m++) {
                if (question.questionOption[m].optionWord != "") {
                    jzStr += '  <div class="kzjxx_iteam">\n' +
                        '                                                <input name="" type="text" class="input_wenbk jzwent_input" value=""\n' +
                        '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                        '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                        '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                        '                                            </div>'
                }
            }
            $("#zj").html(jzStr)
            // for (var m = 0; m < question.questionOption.length; m++) {
            //     var td = '';
            //     td = '<td><input name="c1" type="radio" value="' + m + '"></td>';
            //     trR = $(trR).append(td);
            // }
            // tswjdc_table = $(tswjdc_table).append(tr);
            // tswjdc_table = $(tswjdc_table).append(trR);
            wjdc_list = $(wjdc_list).append(tswjdc_table);

            if (tipMsg == "取消插入点") {
                $("#status_tip").css("display", "none");
                tipMsg = "在此题后插入新题";
                //在div后添加新题的容器
                movie_boxForInsert = $(movie_boxForInsert).append(wjdc_list);
                movie_boxForInsert = $(movie_boxForInsert).append('<div class="dx_box" data-t="' + index + '"></div>');
                newContain.after(movie_boxForInsert);
                var xh_num = 0;
                //重新编号
                $(".yd_box").find(".movie_box").each(function () {
                    $(".yd_box").children(".movie_box").eq(xh_num).find(".nmb").text(xh_num + 1);
                    xh_num++;
                    //alert(xh_num);
                });
                movie_boxForInsert = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
            } else {
                movie_box = $(movie_box).append(wjdc_list);
                movie_box = $(movie_box).append('<div class="dx_box" data-t="' + index + '"></div>');
                $(".yd_box").append(movie_box);
            }
            break;
        case "4":  //量表
            var wjdc_list = ' <div class="wjdc_list">' +
                '<h4 class="title_wjht">' +
                '<i class="nmb">' + Grade + '</i>.<span class="btwenzi">' + question.questionTitle + '</span>' +
                '<span class="tip_wz"><a href="javascript:void(0)"  class="bida">' + question.important + '</a></span>' +
                '</h4>'
            '</div>';
            var tswjdc_table = ' <table width="100%" border="0" cellspacing="0" cellpadding="0" class="tswjdc_table">' +
                '<tbody></tbody>' +
                '</table>';
            var tr = '<tr><td>' + question.questionOption[0].optionWord + '</td></tr>';

            for (var j = 1; j < question.questionOption.length - 1; j++) {
                var td = '';
                td = '<td><input name="c1" type="radio" value="' + question.questionOption[j].optionWord + '" style="margin-right: 5px">' + question.questionOption[j].optionWord + '</td>';
                tr = $(tr).append(td);
            }
            var tdL = '<td>' + question.questionOption[question.questionOption.length - 1].optionWord + '</td>'
            tr = $(tr).append(tdL);
            tswjdc_table = $(tswjdc_table).append(tr);
            wjdc_list = $(wjdc_list).append(tswjdc_table);
            var lbStr = ''
            for (var m = 1; m < question.questionOption.length - 1; m++) {
                if (m == 1) {
                    lbStr += '<div class="kzjxx_iteam">\n' +
                        '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_word" value="' + question.questionOption[0].optionWord + '"\n' +
                        '                                                       onblur="if(!this.value)this.value=\'\'"\n' +
                        '                                                       onclick="if(this.value&amp;&amp;this.value==\'\' )  this.value=\'\'">\n' +
                        '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_grade" value="' + question.questionOption[m].optionWord + '"\n' +
                        '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                        '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                        '                                                <!--<label class="gradeChoose">-->\n' +
                        '                                                <!--<input name="" type="checkbox" value="" class="fxk">-->\n' +
                        '                                                <!--<span>不计分</span>-->\n' +
                        '                                                <!--</label>-->\n' +
                        '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                        '                                            </div>'
                } else if (m == question.questionOption.length - 2) {
                    lbStr += '<div class="kzjxx_iteam">\n' +
                        '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_word" value="' + question.questionOption[m + 1].optionWord + '"\n' +
                        '                                                       onblur="if(!this.value)this.value=\'\'"\n' +
                        '                                                       onclick="if(this.value&amp;&amp;this.value==\'\' )  this.value=\'\'">\n' +
                        '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_grade" value="' + question.questionOption[m].optionWord + '"\n' +
                        '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                        '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                        '                                                <!--<label class="gradeChoose">-->\n' +
                        '                                                <!--<input name="" type="checkbox" value="" class="fxk">-->\n' +
                        '                                                <!--<span>不计分</span>-->\n' +
                        '                                                <!--</label>-->\n' +
                        '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                        '                                            </div>'
                } else {
                    lbStr += '<div class="kzjxx_iteam">\n' +
                        '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_word" value=""\n' +
                        '                                                       onblur="if(!this.value)this.value=\'\'"\n' +
                        '                                                       onclick="if(this.value&amp;&amp;this.value==\'\' )  this.value=\'\'">\n' +
                        '                                                <input name="" type="text" class="input_wenbk jzwent_input lb_grade" value="' + question.questionOption[m].optionWord + '"\n' +
                        '                                                       onblur="if(!this.value)this.value=\'选项\'"\n' +
                        '                                                       onclick="if(this.value&amp;&amp;this.value==\'选项\' )  this.value=\'\'">\n' +
                        '                                                <!--<label class="gradeChoose">-->\n' +
                        '                                                <!--<input name="" type="checkbox" value="" class="fxk">-->\n' +
                        '                                                <!--<span>不计分</span>-->\n' +
                        '                                                <!--</label>-->\n' +
                        '                                                <a href="javascript:void(0);" class="del_xm">删除</a>\n' +
                        '                                            </div>'
                }
            }
            $("#lb").html(lbStr)
            if (tipMsg == "取消插入点") {
                $("#status_tip").css("display", "none");
                tipMsg = "在此题后插入新题";
                //在div后添加新题的容器
                movie_boxForInsert = $(movie_boxForInsert).append(wjdc_list);
                movie_boxForInsert = $(movie_boxForInsert).append('<div class="dx_box" data-t="' + index + '"></div>');
                newContain.after(movie_boxForInsert);
                var xh_num = 0;
                //重新编号
                $(".yd_box").find(".movie_box").each(function () {
                    $(".yd_box").children(".movie_box").eq(xh_num).find(".nmb").text(xh_num + 1);
                    xh_num++;
                    //alert(xh_num);
                });
                movie_boxForInsert = '<div class="movie_box" style="border: 1px solid rgb(255, 255, 255);"></div>';
            } else {
                movie_box = $(movie_box).append(wjdc_list);
                movie_box = $(movie_box).append('<div class="dx_box" data-t="' + index + '"></div>');
                $(".yd_box").append(movie_box);
            }
            break;
    }
    $(".movie_box").hover(function () {
        var html_cz = "<div class='kzqy_czbut'>" +
            "<a href='javascript:void(0)' id='insert' style='text-decoration:underline;border: none;color:#f00'onclick='insertQuestion(this)'>" + tipMsg + "</a>" +
            "<a href='javascript:void(0)' class='sy'>上移</a>" +
            "<a href='javascript:void(0)'  class='xy'>下移</a>" +
            "<a href='javascript:void(0)'  class='first'>最前</a>" +
            "<a href='javascript:void(0)'  class='last'>最后</a>" +
            "<a href='javascript:void(0)'  class='copy'>复制</a>" +
            "<a href='javascript:void(0)'  class='bianji'>编辑</a>" +
            // "<a href='javascript:void(0)'  class='bida'>必答题</a>" +
            "<a href='javascript:void(0)' class='del'>删除</a>" +
            "</div>";
        $(this).css({
            "border": "1px solid #fdb553"
        });
        $(this).children(".wjdc_list").after(html_cz);
    }, function () {
        $(this).css({
            "border": "1px solid #fff"
        });
        $(this).children(".kzqy_czbut").remove();
        //$(this).children(".dx_box").hide();
    });

};

function judgeQuestionId() {
    if (getCookie('QuestionId') == undefined) {
        aaa = 0;
    } else {
        aaa = 1;
    }
}

function judgeProjectId() {
    if (getCookie('projectIdForCreate') == undefined) {
        bbb = 0;
    } else {
        bbb = 1;
    }
}
