function setCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape(value) +
            ((expires) ? "; expires=" + expires : "") +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            ((secure) ? "; secure" : "");
}
function getExpDate(days, hours, minutes) {
    var expDate = new Date();
    if (typeof (days) == "number" && typeof (hours) == "number" && typeof (hours) == "number") {
        expDate.setDate(expDate.getDate() + parseInt(days));
        expDate.setHours(expDate.getHours() + parseInt(hours));
        expDate.setMinutes(expDate.getMinutes() + parseInt(minutes));
        return expDate.toGMTString();
    }
}
function Request(strName) {
    var strHref = window.document.location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);

    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");

        if (arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
    }
    return "";
}
var hrefCreate = document.getElementById("hrefCreate");
var spanKeFu = document.getElementById("spanKeFu");
var ysfButton=document.getElementById("YSF-BTN-HOLDER");

function loadAction() {
    var keyword = Request("keyword");
    if (!keyword)
        keyword = Request("keyword2");
    if (!keyword)
        return;
    keyword = decodeURIComponent(keyword);

    var source = Request("source");
    if (source == "wenku")
        keyword += "[wenku]";
    if (window.location.href.indexOf("/mobile/") > -1)
        keyword += "[mob]";
    var plan = Request("plan");
    var keyt = "";
    if (plan) {
        plan = decodeURIComponent(plan);
        if (plan.indexOf("问卷") > -1 || plan.indexOf("调查") > -1)
            keyt = 2;
        else if (plan.indexOf("考试") > -1)
            keyt = 1;
        else if (plan.indexOf("360") > -1)
            keyt = 3;
    }
    else {
        keyt = window.keytype || "";
    }
    if (keyt)
        keyword += "|" + keyt + "|" + source;
    
    if (source == "baidu" || source == "wenku" || source == "360" || source == "sogou" || source == "tencent" || source == "uc") {
        setCookie("baidutgkey", keyword, getExpDate(7, 0, 0), "/", "", null);
        window.onload = function () {
            if (window._czc) {
                _czc.push(["_trackEvent", "推广关键词",source+","+ keyword, keyt]);
            }
        }

        if (hrefCreate) {
            hrefCreate.onclick = function () {
                _czc.push(["_trackEvent", "推广关键词", source + "," + "创建问卷", keyt]);
                return true;
            }
        }
        if (spanKeFu) {
            spanKeFu.onclick = function () {
                _czc.push(["_trackEvent", "推广关键词", source + "," + "联系客服", keyt]);
                return true;
            }
        }
        if (ysfButton) {
            ysfButton.style.display = "";
            ysfButton.onclick = function () {
                _czc.push(["_trackEvent", "推广关键词", source + "," + "联系客服右边", keyt]);
                ysf.open();
                return true;
            }
        }
        if (window.ysf) {
            ysf.on({
                'onload': function () {
                    ysf.config({
                        name: keyword,
                        groupid: "209578"
                    });
                }
            })
        }
    }
}

loadAction();