$$ = function (a, c) {
    if (c) {
        var b = c.getElementsByTagName(a);
        if (!b || b.length == 0) {
            b = new Array();
            getbyTagName(c, a, b);
            return b;
        }
        return b;
    } else {
        return document.getElementsByTagName(a);
    }
};
var status_tip = $("status_tip");
var topnav = $("topnav");
var divSurvey = $("sur");
var divMenu = $("divMenu");
var questions = $("question");
var firstPage = null;
var questionHolder = new Array();
var cur = null;
var curover = null;
var curinsert = null;
var langVer = 0;
var WjxActivity = new Object();
var DataArray = new Array();
var total_page = 0;
var total_question = 0;
var select_item_num = 1;
var isMergeAnswer = false;
var isCompleteLoad = false;
var referRelHT = new Object();
var designversion = "7";
var hasInsPromoteJump = false;
var lastAddNewQTime = null;
var prevcurmove = null;
var useShortCutAddNewQ = false;
var QIndentity = 1;
var prevSaveData = "";
var hasCeShiQ = false;
var totalHideQcount = 0;
var initQCount = 0;
var hasErrorImg = false;
$ce = function (c, d, a) {
    var b = document.createElement(c);
    if (d) {
        b.innerHTML = d;
    }
    a.appendChild(b);
    return b;
};

function StringBuilder() {
    this._stringArray = new Array();
}

function RndNum(c) {
    var b = "";
    for (var a = 0; a < c; a++) {
        b += Math.floor(Math.random() * 10);
    }
    return b;
}

StringBuilder.prototype.append = function (a) {
    this._stringArray.push(a);
};
StringBuilder.prototype.toString = function (a) {
    a = a || "";
    return this._stringArray.join(a);
};
StringBuilder.prototype.clear = function () {
    this._stringArray.length = 0;
};

function forbidBackSpace(f) {
    var c = f || window.event;
    var d = c.target || c.srcElement;
    var b = d.type || d.getAttribute("type");
    var a = c.keyCode == 8 && b != "password" && b != "text" && b != "textarea";
    if (a) {
        return false;
    }
}

document.onkeydown = forbidBackSpace;

function getGapFillCount(b) {
    var d = 0;
    var e = 0;
    var a = b.length;
    do {
        e = b.indexOf(GapFillStr, e);
        if (e != -1) {
            d++;
            e += GapFillStr.length;
            for (var c = e; c < a; c++) {
                if (b.charAt(c) != "_") {
                    break;
                }
                e++;
            }
        }
    } while (e != -1);
    return d;
}

function replaceImg(c) {
    var b = "http://pubimageqiniu.paperol.cn";
    var a = "//pubnewfr.paperol.cn";
    if (c.src.indexOf("http://pubssl.sojump.com") == 0 || c.src.indexOf("https://pubssl.sojump.com") == 0 || c.src.indexOf("http://pubimage.sojump.com") == 0 || c.src.indexOf("http://pubimage.sojump.cn") == 0 || c.src.indexOf("http://pubssl.sojump.cn") == 0) {
        c.src = c.src.replace("http://pubssl.sojump.com", b).replace("https://pubssl.sojump.com", b).replace("http://pubimage.sojump.com", b).replace("http://pubimage.sojump.cn", b).replace("http://pubssl.sojump.cn", b);
        hasErrorImg = true;
    } else {
        if (c.src.indexOf("http://pubalifr.sojump.com") == 0 || c.src.indexOf("https://pubalifr.sojump.com") == 0 || c.src.indexOf("https://pubali.sojump.com") == 0 || c.src.indexOf("http://pubali.sojump.com") == 0 || c.src.indexOf("http://pubali.sojump.cn") == 0 || c.src.indexOf("http://pubalifr.sojump.cn") == 0 || c.src.indexOf("https://pubali.sojump.cn") == 0 || c.src.indexOf("https://pubalifr.sojump.cn") == 0) {
            c.src = c.src.replace("http://pubalifr.sojump.com", a).replace("https://pubalifr.sojump.com", a).replace("http://pubali.sojump.com", a).replace("https://pubali.sojump.com", a).replace("http://pubali.sojump.cn", a).replace("https://pubali.sojump.cn", a).replace("http://pubalifr.sojump.cn", a).replace("https://pubalifr.sojump.cn", a);
            hasErrorImg = true;
        }
    }
}

var EndGapReq = true;
var batAddQTimes = 0;

function replaceGapFill(n, e) {
    var g = 0;
    var f = 0;
    EndGapReq = true;
    if (e._requir) {
        var C = n.indexOf("<br");
        if (C > -1) {
            var h = n.indexOf(GapFillStr);
            if (h > C) {
                EndGapReq = false;
                n = n.substring(0, C) + "<span class='req'>&nbsp;*</span>" + n.substring(C);
            }
        }
    }
    var u = new StringBuilder();
    var D = 0;
    do {
        f = g;
        g = n.indexOf(GapFillStr, g);
        var m = GapFillStr;
        var k = "";
        var s = false;
        if (e._requir && e._rowVerify) {
            for (var z = 0; z < e._rowVerify.length; z++) {
                if (e._rowVerify[z]._isRequir == false) {
                    s = true;
                    EndGapReq = false;
                    break;
                }
            }
        }
        if (g != -1) {
            var o = 0;
            u.append(n.substr(f, g - f));
            g += GapFillStr.length;
            for (var y = g; y < n.length; y++) {
                if (n[y] != "_") {
                    break;
                }
                o++;
                m += "_";
                g++;
            }
            var b = GapWidth + o * (GapWidth / 3);
            if (b > 600) {
                b = 600;
            }
            var B = false;
            if (e._rowVerify[D]) {
                if (e._rowVerify[D]._verify == "日期") {
                    b = 70;
                    B = true;
                } else {
                    if (e._rowVerify[D]._verify == "指定选项") {
                        k = e._rowVerify[D]._choice;
                    }
                }
            }
            var l = "";
            if (e._isCeShi) {
                var r = e._rowVerify;
                if (r[D]) {
                    var t = (r[D]._answer || "请设置答案");
                    l = t + ":" + (r[D]._ceshiValue || 1) + "分";
                    var x = t.length * 12 + 24;
                    if (b < x) {
                        b = x;
                    }
                }
            }
            var p = "";
            if (k) {
                p = GapFillReplace.replace("width:" + GapWidth + "px", "display:none;width:" + b + "px");
            } else {
                p = GapFillReplace.replace("width:" + GapWidth + "px", "width:" + b + "px");
            }
            if (l) {
                p = p.replace("/>", " value='" + l + "'/>");
            }
            if (e._useTextBox) {
                p = p.replace("/>", " class='inputtext'/>");
            } else {
                p = p.replace("/>", " class='underline'/>");
            }
            if (k) {
                var q = k.split("|");
                var w = q[0].split(/[,，]/);
                var a = q[1] || "请选择";
                var d = "<select style='vertical-align:middle;'><option value=''>" + a + "</option>";
                for (var z = 0; z < w.length; z++) {
                    var A = w[z];
                    d += "<option value='" + A + "'>" + A + "</option>";
                }
                d += "</select>";
                p = p.replace("/>", "/>" + d);
            }
            var v = true;
            if (e._rowVerify[D] && e._rowVerify[D]._isRequir == false) {
                v = false;
            }
            u.append(p);
            if (s && v) {
                u.append("<span class='req' style='top:5px;position:relative;'>&nbsp;*</span>");
            }
            D++;
        } else {
            if (f < n.length) {
                u.append(n.substr(f));
            }
        }
    } while (g != -1);
    return u.toString();
}

function showItemDesc(c, b) {
    var e = document.getElementById(c);
    var h = document.getElementById("divDescPopData");
    h.innerHTML = e.innerHTML;
    var d = trim(e.innerHTML);
    if (d.indexOf("http") == 0) {
        PDF_launch(d.replace(/&amp;/g, "&"), 800, 600);
    } else {
        var g = document.getElementById("divDescPop");
        g.style.display = "";
        g.style.width = "500px";
        var a = h.offsetHeight + 20;
        var f = 500;
        if (a < 500 && a > 30) {
            f = a;
        }
        PDF_launch("divDescPop", 500, f);
    }
}

function replace_specialChar(a) {
    return a.replace(/(§)/g, "ξ").replace(/(¤)/g, "○").replace(/(〒)/g, "╤");
}

function getCoords(a) {
    var d = a.getBoundingClientRect(), i = a.ownerDocument, f = i.body, e = i.documentElement,
        c = e.clientTop || f.clientTop || 0, g = e.clientLeft || f.clientLeft || 0,
        h = d.top + (self.pageYOffset || e.scrollTop || f.scrollTop) - c,
        b = d.left + (self.pageXOffset || e.scrollLeft || f.scrollLeft) - g;
    return {top: h, left: b};
}

function mouseCoords(a) {
    if (!a) {
        return;
    }
    if (a.pageX || a.pageY) {
        return {x: a.pageX, y: a.pageY};
    }
    return {
        x: a.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: a.clientY + document.body.scrollTop - document.body.clientTop
    };
}

function showFillData(a) {
    toolTipLayer.innerHTML = "选中此项后，需要进行填空";
    sb_setmenunav(toolTipLayer, true, a);
}

var prevQType = null;

function sb_setmenunav(m, h, f, o, c) {
    var s = m;
    if (typeof(s) != "object") {
        s = document.getElementById(m);
    }
    if (!s) {
        return;
    }
    if (h) {
        if (s.timeArray) {
            window.clearTimeout(s.timeArray);
            s.timeArray = 0;
        }
        s.style.display = "block";
        if (!s.onmouseover) {
            s.onmouseover = function () {
                sb_setmenunav(m, true);
            };
            s.onmouseout = function () {
                sb_setmenunav(m, false);
            };
        }
        if (o) {
            var r = window.event || sb_setmenunav.caller.arguments[0];
            var n = mouseCoords(r);
            s.style.left = n.x + 1 + "px";
            s.style.top = n.y + 1 + "px";
        } else {
            if (f) {
                var e = f;
                if (e.parentNode.tagName.toLowerCase() == "li" && !c) {
                    e = f.parentNode;
                }
                var b = getCoords(e);
                var g = b.left;
                var k = b.top + e.offsetHeight;
                var j = c || document.documentElement.clientHeight || document.body.clientHeight;
                var u = document.documentElement.clientWidth || document.body.clientWidth;
                var p = u;
                if (s.id == "divDesc") {
                    p = 700;
                }
                if (f.nextObj) {
                    k = b.top - 33;
                }
                var t = f.getAttribute("qtype");
                if (s.id == "toolTipLayer" && !c) {
                    var q = s.clientWidth - f.clientWidth;
                    g -= q / 2;
                }
                if (s.id == "toolTipLayerTop") {
                    k = k - s.clientHeight - 30;
                } else {
                    if (s.id != "batchDeleteMenu") {
                        var i = getIEVersion();
                        if (i && i < 9) {
                            k -= 10;
                        }
                    }
                }
                if (t) {
                    g -= (s.offsetWidth - f.offsetWidth) / 2;
                    if (prevQType && prevQType != s) {
                        prevQType.style.display = "none";
                    }
                    prevQType = s;
                }
                if (g + s.offsetWidth > p) {
                    g = p - s.offsetWidth - 30;
                }
                if (k + s.offsetHeight > j) {
                    var l = 30;
                    if (t) {
                        l = 0;
                    }
                    var a = j - l - k;
                    if (a < 30) {
                        a = 30;
                    }
                    s.style.height = a + "px";
                }
                s.style.left = g + "px";
                s.style.top = k + "px";
            }
        }
    }
    if (f && f.tagName.toLowerCase() == "a") {
        s.needSaveClass = f;
        s.prevClass = f.className;
    } else {
        if (s.needSaveClass) {
            if (h) {
                s.needSaveClass.className = s.prevClass ? s.prevClass + " hover" : "hover";
            } else {
                s.needSaveClass.className = s.prevClass || "";
            }
        }
    }
    if (!h) {
        s.timeArray = window.setTimeout(function () {
            s.style.display = "none";
            s.style.height = "";
            s.style.overflow = "";
            toolTipLayer.style.marginTop = "10px";
        }, 300);
    }
}

var GapFillStr = "___";
var GapWidth = 21;
var GapFillReplace = "<input style='width:" + GapWidth + "px;' />";

function getFillStr(b) {
    var c = "";
    for (var a = 0; a < b; a++) {
        c += GapFillStr;
    }
    if (!c) {
        c = GapFillStr;
    }
    return c;
}

var EditorIndex = 1;
var EditToolBarItems = ["fontname", "fontsize", "textcolor", "bgcolor", "bold", "italic", "underline", "emoticons", "link", "image", "flash", "subscript", "superscript"];
var EditToolBarItemsPageCut = ["fontname", "fontsize", "textcolor", "bgcolor", "bold", "italic", "underline", "strikethrough", "subscript", "superscript", "plainpaste", "justifyleft", "justifycenter", "justifyright", "indent", "outdent", "link", "emoticons", "image", "flash", "table", "hr"];

function getByClass(b, f, d) {
    var a = $$(b, f);
    var e = new Array();
    for (var c = 0; c < a.length; c++) {
        if (a[c].className.toLowerCase() == d.toLowerCase()) {
            e.push(a[c]);
        }
    }
    return e;
}

function getbyTagName(b, c, e) {
    var d;
    for (var a = 0; a < b.childNodes.length; a++) {
        d = b.childNodes[a];
        if (d.tagName === c) {
            e.push(d);
        }
        if (d.childNodes.length > 0 && d.nodeType == 1) {
            getbyTagName(d, c, e);
        }
    }
}

var defaultFileExt = ".gif|.png|.jpg|.jpeg|.bmp|.doc|.docx|.pdf|.xls|.xlsx|.ppt|.pptx|.txt|.rar|.zip|.gzip";

function Request(d) {
    var b = window.document.location.href;
    var f = b.indexOf("?");
    var e = b.substr(f + 1);
    var c = e.split("&");
    for (var a = 0; a < c.length; a++) {
        var g = c[a].split("=");
        if (g[0].toUpperCase() == d.toUpperCase()) {
            return g[1];
        }
    }
    return "";
}

function isEmpty(a) {
    return trim(a) == "";
}

function isInt(a) {
    var b = /^-?[0-9]+$/;
    return b.test(a);
}

function isPositive(a) {
    var b = /^\+?[1-9][0-9]*$/;
    return b.test(a);
}

function toInt(a) {
    return parseInt(trim(a));
}



function trim(a) {
    if (a && a.replace) {
        return a.replace(/(^\s*)|(\s*$)/g, "");
    } else {
        return a;
    }
}

var interval_time;
init_page();

function init_page() {
    addEventSimple(window, "resize", setSidePos);
    if (vipUser == "2") {
        EditToolBarItems.push("source");
        EditToolBarItemsPageCut.push("source");
    }
    setSidePos();
    show_status_tip("正在读取数据，请稍后...");
    processData();
    interval_time = setInterval(autoSave, 90 * 1000);
}

function processData() {
    if (serverVersion && serverVersion != designversion) {
        alert("很抱歉，由于问卷星系统版本升级，您本机使用的脚本文件已过期，请您刷新页面或者重启浏览器再编辑问卷！");
        return;
    }
    var c = hfData.value;
    if (c == "error") {
        window.location = "/error/error.aspx?source=designQHandler";
    } else {
        if (c == "timeout") {
            alert("您的登录信息超时，请重新登录，谢谢！");
            window.location = "/wjx/manage/myquestionnaires.aspx";
        } else {
            show_status_tip("数据读取成功，初始化...");
            set_data_fromServer(c);
            set_data_toDesign();
            isCompleteLoad = true;
            loadComplete();
            document.title = "设计问卷 － 专业的在线问卷调查平台";
            Calculatedscore();
            if (total_question < 100) {
                var a = document.getElementsByTagName("img");
                for (var b = 0; b < a.length; b++) {
                    a[b].onerror = function () {
                        this.onerror = null;
                        replaceImg(this);
                    };
                    replaceImg(a[b]);
                }
            }
        }
    }
}

function autoSave() {
    var a = $("chkAutoSave");
    if (a.checked) {
        save_paper("edit", false);
    }
}

function showCeShiInfo() {
    if (hasCeShiQ || isKaoShi) {
        $("spanRandom").parentNode.style.display = "none";
        $("chkUseSelfTopic").parentNode.style.display = "none";
    }
}

function set_data_fromServer(c) {
    var g = new Array();
    var f = c;
    var h = "";
    if (!window.dqdata) {
        var e = c.split("£");
        f = e[0];
        h = e[1];
    } else {
        h = window.dqdata;
    }
    g = f.split("¤");
    var a = new Array();
    var a = h.split("§");
    if (a[0] == "true") {
        isMergeAnswer = true;
    } else {
        isMergeAnswer = false;
    }
    if (isMergeAnswer) {
        var j = $("chkAutoSave");
        j.checked = false;
    }
    userGuid = a[1];
    langVer = Number(a[2]);
    var b = new Array();
    b = g[0].split("§");
    WjxActivity._start_time = b[0];
    WjxActivity._title = b[1];
    WjxActivity._tag = b[2];
    WjxActivity._random_begin = b[3];
    WjxActivity._random_end = b[4];
    WjxActivity._random_mode = b[5];
    WjxActivity._use_self_topic = b[6] == "true" ? true : false;
    WjxActivity._display_part = false;
    WjxActivity._display_part_num = 0;
    WjxActivity._partset = "";
    WjxActivity._partsetnew = "";
    if (WjxActivity._random_mode == "1" || WjxActivity._random_mode == "2") {
        WjxActivity._display_part = b[7] == "true" ? true : false;
        if (WjxActivity._display_part) {
            WjxActivity._display_part_num = parseInt(b[8]);
        }
    } else {
        if (WjxActivity._random_mode == "3" || WjxActivity._random_mode == "4") {
            WjxActivity._partset = b[7] || "";
        } else {
            if (WjxActivity._random_mode == "5") {
                WjxActivity._partsetnew = b[7] || "";
            }
        }
    }
    for (var d = 1; d < g.length; d++) {
        DataArray[d - 1] = set_string_to_dataNode(g[d]);
        if (DataArray[d - 1]._type != "page" && DataArray[d - 1]._type != "cut") {
            initQCount++;
        }
    }
    showCeShiInfo();
}

function setLiCat(a) {
}

function isQuestionLikert(b) {
    var c = b._type;
    var a = b._tag || 0;
    return c == "radio" && a;
}

function set_string_to_dataNode(r) {
    var f = new Object();
    var d = new Array();
    d = r.split("§");
    f._type = d[0];
    switch (d[0]) {
        case"page":
            f._topic = d[1];
            f._title = d[2];
            f._iszhenbie = d[4] == "true";
            f._istimer = d[4] == "time";
            f._mintime = d[5] ? parseInt(d[5]) : "";
            f._maxtime = d[6] ? parseInt(d[6]) : "";
            total_page++;
            break;
        case"cut":
            f._title = d[1];
            f._video = d[2] || "";
            f._relation = d[3] || "";
            break;
        case"fileupload":
            f._topic = d[1];
            var v = d[2].split("〒");
            f._title = v[0];
            f._keyword = v.length == 2 ? v[1] : "";
            f._relation = v[2] || "";
            if (d[4] == "true") {
                f._requir = true;
            } else {
                f._requir = false;
            }
            f._width = d[5] ? parseInt(d[5]) : 200;
            f._ext = d[6] || "";
            f._maxsize = d[7] ? parseInt(d[7]) : 4096;
            f._ins = d[8];
            if (d[9] == "true") {
                f._hasjump = true;
            } else {
                f._hasjump = false;
            }
            f._anytimejumpto = d[10];
            if (d[11]) {
                var t = d[11].split("〒");
                f._isCeShi = true;
                f._ceshiValue = t[0] || 5;
                f._ceshiDesc = t[1] || "";
            }
            if (d[12]) {
                f._isCloze = true;
            }
            break;
        case"slider":
            f._topic = d[1];
            var v = d[2].split("〒");
            f._title = v[0];
            f._keyword = v.length == 2 ? v[1] : "";
            f._relation = v[2] || "";
            if (d[4] == "true") {
                f._requir = true;
            } else {
                f._requir = false;
            }
            f._minvalue = d[5];
            f._maxvalue = d[6];
            f._minvaluetext = d[7];
            f._maxvaluetext = d[8];
            f._ins = d[9];
            if (d[10] == "true") {
                f._hasjump = true;
            } else {
                f._hasjump = false;
            }
            f._anytimejumpto = d[11];
            break;
        case"question":
            f._topic = d[1];
            var v = d[2].split("〒");
            f._title = v[0];
            f._keyword = v.length == 2 ? v[1] : "";
            f._relation = v[2] || "";
            f._height = d[4] ? parseInt(d[4]) : 1;
            f._maxword = d[5];
            if (d[6] == "true") {
                f._requir = true;
            } else {
                f._requir = false;
            }
            if (d[7] == "true") {
                f._norepeat = true;
            } else {
                f._norepeat = false;
            }
            f._default = d[8];
            f._ins = d[9];
            if (d[10] == "true") {
                f._hasjump = true;
            } else {
                f._hasjump = false;
            }
            f._anytimejumpto = d[11];
            f._verify = d[12];
            if (d[13]) {
                var l = d[13].split("〒");
                f._needOnly = l[0] == "true" ? true : false;
                f._needsms = l[1] == "true" ? true : false;
            }
            f._hasList = d[14] == "true" ? true : false;
            f._listId = d[15] ? parseInt(d[15]) : -1;
            f._width = d[16] ? parseInt(d[16]) : "";
            f._underline = d[17] == "true" ? true : false;
            f._minword = d[18] ? parseInt(d[18]) : "";
            if (d[19]) {
                if (f._verify == "多级下拉") {
                    f._levelData = d[19] || "";
                } else {
                    var h = d[19].split("〒");
                    f._isCeShi = true;
                    f._ceshiValue = h[0] || 5;
                    f._answer = h[1] || "请设置答案";
                    f._ceshiDesc = h[2] || "";
                    f._include = h[3] == "true";
                    hasCeShiQ = true;
                }
            }
            break;
        case"gapfill":
            f._topic = d[1];
            var v = d[2].split("〒");
            f._title = v[0];
            f._keyword = v.length == 2 ? v[1] : "";
            f._relation = v[2] || "";
            if (d[4] == "true") {
                f._requir = true;
            } else {
                f._requir = false;
            }
            f._gapcount = d[5] ? parseInt(d[5]) : 1;
            f._ins = d[6];
            if (d[7] == "true") {
                f._hasjump = true;
            } else {
                f._hasjump = false;
            }
            f._anytimejumpto = d[8];
            var k = d[9] || "";
            f._rowVerify = new Array();
            if (d[11]) {
                f._isCeShi = true;
                hasCeShiQ = true;
            }
            if (d[12]) {
                f._isCloze = true;
            }
            if (k) {
                var o = k.split("〒");
                for (var y = 0; y < o.length; y++) {
                    var z = new Object();
                    var e = o[y].split("¦");
                    if (e[0] == "指定选项") {
                        z._verify = e[0];
                        z._choice = e[1] || "";
                        if (!f._isCloze) {
                            z._isRequir = e[2] == "false" ? false : true;
                        } else {
                            z._ceshiValue = e[2] || 1;
                            z._answer = e[3] || "";
                            z._ceshiDesc = e[4] || "";
                        }
                    } else {
                        var q = o[y].split(",");
                        z._verify = q[0];
                        z._minword = q[1];
                        z._maxword = q[2];
                        if (f._isCeShi) {
                            z._ceshiValue = q[3] || 1;
                            z._answer = q[4] || "请设置答案";
                            z._ceshiDesc = q[5] || "";
                            z._include = q[6] == "true";
                            hasCeShiQ = true;
                        } else {
                            z._isRequir = q[3] == "false" ? false : true;
                            z._needOnly = q[4] == "true";
                        }
                    }
                    f._rowVerify[y] = z;
                }
            }
            f._useTextBox = d[10] == "true";
            break;
        case"sum":
            f._topic = d[1];
            var v = d[2].split("〒");
            f._title = v[0];
            f._keyword = v.length == 2 ? v[1] : "";
            f._relation = v[2] || "";
            if (d[4] == "true") {
                f._requir = true;
            } else {
                f._requir = false;
            }
            f._total = parseInt(d[5]);
            f._rowtitle = d[6];
            f._rowwidth = d[7].indexOf("%") > -1 ? d[7] : "";
            f._ins = d[9];
            if (d[10] == "true") {
                f._hasjump = true;
            } else {
                f._hasjump = false;
            }
            f._anytimejumpto = d[11];
            break;
        case"radio":
        case"check":
        case"radio_down":
        case"matrix":
        case"boolean":
            if (d[0] == "boolean") {
                f._isbool = true;
                f._type = "radio";
            } else {
                f._type = d[0];
            }
            f._topic = d[1];
            var v = d[2].split("〒");
            f._title = v[0];
            f._keyword = v.length == 2 ? v[1] : "";
            f._relation = v[2] || "";
            f._mainWidth = v[3] || "";
            f._tag = isInt(d[3]) ? toInt(d[3]) : 0;
            if (f._type == "matrix") {
                var n = d[4].split("〒");
                f._rowtitle = n[0];
                if (n.length >= 2) {
                    f._rowtitle2 = n[1];
                } else {
                    f._rowtitle2 = "";
                }
                if (n.length == 3) {
                    f._columntitle = n[2];
                } else {
                    f._columntitle = "";
                }
            } else {
                var x = d[4].split("〒");
                f._numperrow = isInt(x[0]) ? toInt(x[0]) : 1;
                f._randomChoice = false;
                if (x.length == 2) {
                    f._randomChoice = x[1] == "true" ? true : false;
                }
            }
            if (d[5] == "true") {
                f._hasvalue = true;
            } else {
                f._hasvalue = false;
            }
            if (d[6] == "true") {
                f._hasjump = true;
            } else {
                f._hasjump = false;
            }
            f._anytimejumpto = d[7];
            if (d[0] == "check" || (d[0] == "matrix" && f._tag == "102")) {
                var i = d[8].split(",");
                if (i[0] == "true") {
                    f._requir = true;
                } else {
                    f._requir = false;
                }
                if (i[1] == "shop") {
                    f._isShop = true;
                } else {
                    f._lowLimit = i[1];
                    f._upLimit = i[2];
                }
            } else {
                if (d[8] == "true") {
                    f._requir = true;
                } else {
                    if (d[0] == "radio") {
                        var i = d[8].split(",");
                        f._requir = i[0] == "true";
                        if (i[1] == "1") {
                            f._isQingJing = true;
                        } else {
                            if (i[1] == "2") {
                                f._ispanduan = true;
                            }
                        }
                    } else {
                        f._requir = false;
                    }
                }
            }
            if (f._type == "matrix") {
                var A = d[9].split("〒");
                var B = A[0].split(",");
                f._rowwidth = B[0].indexOf("%") > -1 ? B[0] : "";
                f._randomRow = B[1] == "true";
                f._rowwidth2 = "";
                if (A.length >= 2) {
                    f._rowwidth2 = A[1].indexOf("%") > -1 ? A[1] : "";
                }
                f._minvalue = 0;
                f._maxvalue = 10;
                if (f._tag == "202" || f._tag == "301") {
                    f._minvalue = A[2] || "";
                    var p = A[3] || "";
                    f._maxvalue = p;
                    if (f._tag == "301") {
                        var s = p.split(",");
                        f._maxvalue = s[0] || "";
                        f._digitType = s[1] || 0;
                    }
                } else {
                    if (f._tag == "102" || f._tag == "103") {
                        f._daoZhi = A[2] == "true";
                    } else {
                        if (f._tag == "201" || f._tag == "302") {
                            f._hasvalue = false;
                            var k = A[2] || "";
                            f._rowVerify = new Array();
                            if (k) {
                                var o = k.split(";");
                                for (var y = 0; y < o.length; y++) {
                                    if (!o[y]) {
                                        continue;
                                    }
                                    var z = new Object();
                                    var e = o[y].split("¦");
                                    if (e[1] == "指定选项") {
                                        z._verify = e[1];
                                        z._choice = e[2] || "";
                                        z._isRequir = e[3] == "false" ? false : true;
                                        var c = parseInt(e[0]);
                                        f._rowVerify[c] = z;
                                    } else {
                                        var q = o[y].split(",");
                                        z._verify = q[1];
                                        z._minword = q[2];
                                        z._maxword = q[3];
                                        z._width = q[4] || "";
                                        z._isRequir = q[5] == "false" ? false : true;
                                        z._needOnly = q[6] == "true";
                                        var c = parseInt(q[0]);
                                        f._rowVerify[c] = z;
                                    }
                                }
                            }
                        }
                    }
                }
                f._isTouPiao = false;
                f._isCeShi = false;
            } else {
                var g = d[9].split("〒");
                if (g[0] == "true") {
                    f._isTouPiao = true;
                    f._touPiaoWidth = isInt(g[1]) ? parseInt(g[1]) : 50;
                    f._displayDesc = g[2] == "true";
                    f._displayNum = g[3] == "true";
                    f._displayPercent = g[4] == "true";
                    f._displayThumb = g[5] == "true";
                    f._displayDescTxt = g[6] || "";
                } else {
                    if (g[0] == "ceshi") {
                        f._isCeShi = true;
                        hasCeShiQ = true;
                        f._ceshiValue = g[1] || 5;
                        f._ceshiDesc = g[2];
                    } else {
                        if (g[0] == "ceping") {
                            f._isCePing = true;
                        } else {
                            if (g[0] == "desc") {
                                f._displayDesc = true;
                                f._displayDescTxt = g[1] || "";
                            }
                        }
                    }
                }
            }
            f._ins = d[10];
            var a = d[11].split(",");
            f._verify = a[0];
            if (a[1] == "true") {
                f._nocolumn = true;
            }
            f._referTopic = d[12];
            f._referedTopics = d[13];
            f._select = new Array();
            var b = 14;
            for (var u = b; u < d.length; u++) {
                var w = new Array();
                w = d[u].split("〒");
                var m = u - b + 1;
                f._select[m] = new Object();
                f._select[m]._item_title = w[0];
                if (w[1] == "true") {
                    f._select[m]._item_radio = true;
                } else {
                    f._select[m]._item_radio = false;
                }
                f._select[m]._item_value = w[2];
                f._select[m]._item_jump = w[3];
                f._select[m]._item_tb = false;
                f._select[m]._item_tbr = false;
                f._select[m]._item_img = "";
                f._select[m]._item_max = "";
                f._select[m]._item_imgtext = false;
                f._select[m]._item_desc = "";
                f._select[m]._item_label = "";
                if (w.length >= 9) {
                    f._select[m]._item_tb = w[4] == "true";
                    f._select[m]._item_tbr = w[5] == "true";
                    if (f._type == "matrix") {
                        f._select[m]._item_max = w[6] || "";
                    } else {
                        f._select[m]._item_img = w[6];
                    }
                    f._select[m]._item_imgtext = w[7] == "true";
                    f._select[m]._item_desc = w[8];
                    f._select[m]._item_label = w[9];
                    f._select[m]._item_huchi = w[10] == "true";
                }
                select_item_num++;
            }
            break;
        default:
            break;
    }
    return f;
}

function showJumpTip(b, d, c) {
    if (b) {
        var a = getDataNodeByTopic(d);
        if (a) {
            html = "选择此选项跳转到<span style='color:#0066ff;'>" + getDisplayTitle(a) + "</span>";
            toolTipLayerMenu.style.width = "330px";
            toolTipLayerMenu.innerHTML = html;
            sb_setmenunav(toolTipLayerMenu, true, c);
        }
    } else {
        sb_setmenunav(toolTipLayerMenu, false);
    }
}

function showRelTip(a, b) {
    if (a) {
        toolTipLayerTop.style.width = "300px";
        toolTipLayerTop.innerHTML = "引用前面多选题或者排序题的选中项&nbsp;&nbsp;<a target='_blank' class='link-U00a6e6' href='/help/help.aspx?helpid=217&h=1'>查看示例</a>";
        sb_setmenunav(toolTipLayerTop, true, b);
    } else {
        sb_setmenunav(toolTipLayerTop, false);
    }
}

function set_data_toDesign() {
    var g = $("paper_attr_title");
    g.value = WjxActivity._title;
    var c = $("pater_title");
    c.innerHTML = g.value;
    var b = $("paper_attr_desc");
    b.value = WjxActivity._tag;
    var f = $("pater_desc");
    f.innerHTML = b.value;
    if (!b.value) {
        f.innerHTML = "添加问卷说明";
    }
    var a = $("divId");
    a.onclick = function () {
        paper_attr("paper_attr_title");
    };
    b.onblur = b.onclick = b.onchange = function () {
        paper_attr_desc_onblur(this);
    };
    var d = $("chkUseTopic");
    var e = $("chkUseSelfTopic");
    d.checked = e.checked = WjxActivity._use_self_topic;
    d.onclick = e.onclick = function () {
        WjxActivity._use_self_topic = this.checked;
        d.checked = e.checked = this.checked;
        for (var h = 0; h < questionHolder.length; h++) {
            var j = questionHolder[h].dataNode._type;
            if (j != "cut" && j != "page") {
                questionHolder[h].divTopic.style.display = WjxActivity._use_self_topic ? "none" : "";
            }
        }
        if (this.checked) {
            show_status_tip("设置成功！请在问题标题前添加自定义题号。", 4000);
        }
    };
    if (b.value.indexOf("<") > -1) {
        b.style.display = "none";
    }
    document.title = "正在加载问卷，请耐心等待....";
    set_dataNode_to_Design();
}

function getIEVersion() {
    var a = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
    return a ? parseInt(a[1]) : undefined;
}

function setQTopPos(e) {
    var b = false;
    if (e.dataNode._select && e.dataNode._select.length > 6 && e.attrMain) {
        e.attrMain.scrollIntoView();
        b = true;
    } else {
        if (e.dataNode._rowtitle && e.attrMain) {
            var c = trim(e.dataNode._rowtitle).split("\n");
            if (c.length > 5) {
                e.attrMain.scrollIntoView();
                b = true;
            }
        }
    }
    if (!b) {
        var a = document.body.scrollTop || document.documentElement.scrollTop;
        var d = e.offsetTop - 10;
        divSurvey.scrollTop = d;
    }
}

function set_dataNode_to_Design() {
    var f;
    var h = 0;
    var d = 0;
    var b = document.createDocumentFragment();
    for (var c = 0; c < DataArray.length; c++) {
        f = create_question(DataArray[c]);
        b.appendChild(f);
        if (DataArray[c]._type == "page" && firstPage == null) {
            firstPage = f;
            if (window.isTiKu) {
                firstPage.style.display = "none";
            }
        } else {
            if (h == 0 && isCepingQ) {
                f.isCepingQ = true;
            }
            questionHolder[h++] = f;
        }
        if (DataArray[c]._referedTopics) {
            var g = DataArray[c]._referedTopics.split(",");
            for (var e = 0; e < g.length; e++) {
                referRelHT[g[e]] = f;
            }
        }
        if (DataArray[c]._type != "page") {
            if (referRelHT[DataArray[c]._topic]) {
                var a = referRelHT[DataArray[c]._topic];
                f._referDivQ = a;
                if (!a._referedArray) {
                    a._referedArray = new Array();
                }
                a._referedArray.push(f);
                if (DataArray[c]._type == "sum") {
                    f.createSum();
                } else {
                    if (f.createTableRadio) {
                        f.createTableRadio();
                    }
                }
            }
        }
    }
    questions.appendChild(b);
    if (total_question == 0 && firstPage && !firstPage.dataNode._title) {
        firstPage.style.display = "none";
    }
}

function getDisplayTitle(b) {
    var a = b._topic + ".";
    if (WjxActivity._use_self_topic) {
        a = "";
    }
    return a + b._title;
}

function getDataNodeByTopic(b) {
    for (var c = 0, a = questionHolder.length; c < a; c++) {
        var d = questionHolder[c].dataNode;
        if (d._type == "page" || d._type == "cut") {
            continue;
        }
        if (b == d._topic) {
            return d;
        }
    }
    return null;
}

function getjumpNode(b) {
    for (var c = 0, a = DataArray.length; c < a; c++) {
        var d = DataArray[c];
        if (d._type == "page" || d._type == "cut") {
            continue;
        }
        if (b == d._topic) {
            return d;
        }
    }
    return null;
}

function getDivIndex(b) {
    for (var c = 0, a = questionHolder.length; c < a; c++) {
        var d = questionHolder[c].dataNode;
        if (d._type == "page" || d._type == "cut") {
            continue;
        }
        if (b == d._topic) {
            return c;
        }
    }
    return -1;
}

var status_tip_timeout = null;

function show_status_tip(c, e, a) {
    clearTimeout(status_tip_timeout);
    status_tip.style.display = "block";
    status_tip.innerHTML = c;
    var b = document.documentElement.scrollTop || document.body.scrollTop;
    var d = document.documentElement.clientHeight || document.body.clientHeight;
    if (status_tip.hasSetWidth) {
        status_tip.style.width = "";
    }
    status_tip.style.top = b + d - status_tip.offsetHeight - 96 + "px";
    if (a && a.popHint) {
        a.popHint(c);
    }
    status_tip.style.width = (divSurvey.offsetWidth - 10) + "px";
    if (e > 0) {
        status_tip_timeout = setTimeout(function () {
            status_tip.style.display = "none";
            status_tip.style.width = "";
            status_tip.hasSetWidth = false;
            if (a && a.popHint) {
                a.popHint("");
            }
        }, e);
    }
}

function setSidePos() {
    status_tip.style.left = "0px";
    var b = document.documentElement.clientHeight || document.body.clientHeight;
    divSurvey.style.height = b - 144 + "px";
    var a = document.documentElement.clientWidth || document.body.clientWidth;
    document.getElementById("m-rightbar").style.right = a < 1280 ? "20px" : "-45px";
    document.getElementById("divNewTip").style.display = a < 1280 ? "none" : "";
}

function show(a) {
    return;
}

var descEditorCreated = false;

function paper_attr(a) {
    divQAttr.style.width = "700";
    PDF_launch("divQAttr", 680, 350);
    var c = "paper_attr_desc";
    if (!descEditorCreated) {
        KE.init({
            id: c,
            newlineTag: "p",
            width: "580px",
            height: "180px",
            filterMode: filter,
            items: EditToolBarItemsPageCut,
            afterChange: function (d) {
                KE.util.setData(d);
            },
            DesignPage: 1
        });
        KE.create(c);
        descEditorCreated = true;
        KE.util.focus(c);
    }
    var b = $(a);
    b.select();
}

function paper_attr_title_onblur(a) {
    var b = $("pater_title");
    b.innerHTML = a.value = replace_specialChar(trim(a.value));
}

function paper_attr_desc_onblur(a) {
    var b = $("pater_desc");
    b.innerHTML = a.value;
    $("spanHInput").innerHTML = a.value.length;
    var c = 10000 - a.value.length;
    if (c < 0) {
        c = 0;
    }
    $("spanLeftInput").innerHTML = c;
    $("spanDTip").style.display = "";
}

var titleEditorCreated = false;

function openTitleEditor(a, e, c) {
    c = c || "";
    PDF_launch("divTitleEditor", 620, 350, e, c);
    var d = "textTitleId";
    if (!titleEditorCreated) {
        KE.init({id: d, items: EditToolBarItemsPageCut, filterMode: filter});
        KE.create(d);
        setInterval(new Function('KE.util.setData("textTitleId")'), 500);
        titleEditorCreated = true;
        KE.util.focus(d);
    }
    var b = a.value || a.innerHTML || "";
    $("divTitleEditor").initContent = b;
    KE.util.setFullHtml(d, b);
}

function clickOK() {
    var a = KE.util.getData("textTitleId");
    window.parent.PDF_close(a);
}

function clickCancel() {
    var a = "-1nc";
    if (CheckIsDirty()) {
        if (confirm("您要保存刚才所做的更改吗？")) {
            a = KE.util.getData("textTitleId");
        }
    }
    window.parent.PDF_close(a);
}

function CheckIsDirty() {
    var a = KE.util.getData("textTitleId");
    return $("divTitleEditor").initContent != a;
}

function getQList(a) {
    var k = a.dataNode._topic;
    var b = "";
    b += "<div style='border-top:1px solid #ccddff;margin:10px 0;'>";
    for (var d = 0, f = questionHolder.length; d < f; d++) {
        var h = questionHolder[d].dataNode;
        if (h._type == "page") {
            continue;
        }
        var j = h._topic;
        if (questionHolder[d] == a) {
            break;
        }
        var c = j + ".";
        if (WjxActivity._use_self_topic) {
            c = "";
        }
        var e = h._title.replace(/<.+?>/gim, "");
        var g = "";
        g = "referSelected(" + j + ",this);return false;";
        b += "<div style='margin-top:6px;'><a class='link-U666' onclick='" + g + "' href='javascript:void(0);'  title='" + e + "'>" + c + e.substring(0, 23) + "</a></div>";
    }
    b += "</div></div>";
    return b;
}

function openReferWindow(b, c) {
    var a = "&nbsp;<span style='color:#333;font-weight:bold;'>将前面题目的答案引用到下文：</span>";
    a += getQList(b);
    toolTipLayer.innerHTML = a;
    toolTipLayer.referObj = c;
    toolTipLayer.style.width = "300px";
    toolTipLayer.style.overflow = "auto";
    toolTipLayer.style.marginTop = "0px";
    sb_setmenunav(toolTipLayer, true, c);
}

function referSelected(b, e) {
    var d = "[q" + b + "]";
    var a = cur.gettextarea();
    var c = a.value.match(/\[q(\d+)\]/);
    if (c && isInt(c[1])) {
        alert("此题已经设置了引用到第" + c[1] + "题！");
        return;
    }
    var g = a.value.length;
    var f = a.id;
    if (KE.g[f].wyswygMode) {
        KE.util.focus(f);
        KE.util.selection(f);
        KE.util.insertHtml(f, d);
        KE.util.focus(f);
    }
    cur.checkTitle();
    toolTipLayer.style.width = "250px";
    show_status_tip("操作成功，被引用题目[" + b + "]的答案将会显示在此题标题中！", 6000);
    sb_setmenunav(toolTipLayer, false);
}

function openDelWindow(d, e) {
    var a = d.dataNode._topic;
    if (d.dataNode._type == "cut") {
        return;
    }
    var c = "";
    if (d.dataNode._type == "page") {
        c = "&page=1";
    }
    var b = "";
    b += "<div style='margin:2px 0;'>";
    // b += '<a onclick=\'batchDeleteMenu.style.display="none";PDF_launch("/wjx/design/deletebatchq.aspx?ct=' + a + c + "\",500,250);return false;'  href='javascript:void(0);' style='font-size:12px;' class='link-444'>批量删除</a>";
    b += "</div>";
    // batchDeleteMenu.innerHTML = b;
    // sb_setmenunav(batchDeleteMenu, true, e);
}

function openValWindow(b, c) {
    var a = "<div style='padding:5px 10px;'>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(2);return false;' class='link-444' href='javascript:void(0);'>交换选项分数</a></div>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(0);return false;' class='link-444' href='javascript:void(0);'>分数<b>从1开始</b>顺序递增</a></div>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(1);return false;' class='link-444' href='javascript:void(0);'>选项分数全部<b>加1</b></a></div>";
    a += "<div style='cursor:pointer;margin-top:3px;'><a onclick='valChanged(-1);return false;' class='link-444' href='javascript:void(0);'>选项分数全部<b>减1</b></a></div>";
    a += "</div>";
    toolTipLayer.innerHTML = a;
    toolTipLayer.valObj = b;
    toolTipLayer.style.width = "160px";
    sb_setmenunav(toolTipLayer, true, c);
}

function valChanged(f) {
    if (!toolTipLayer.valObj) {
        return;
    }
    var c = toolTipLayer.valObj;
    var h = toolTipLayer.valObj.dataNode;
    var g = c.option_radio;
    if (f == 0) {
        for (var d = 1; d < g.length; d++) {
            if (g[d].get_item_value().value != "") {
                g[d].get_item_value().value = d;
            }
        }
    } else {
        if (f == 2) {
            var e = 1;
            var a = g.length - 1;
            while (e < a) {
                var b = g[a].get_item_value().value;
                g[a].get_item_value().value = g[e].get_item_value().value;
                g[e].get_item_value().value = b;
                if (g[a].get_item_novalue()) {
                    b = g[a].get_item_novalue().checked;
                    g[a].get_item_novalue().checked = g[e].get_item_novalue().checked;
                    g[e].get_item_novalue().checked = b;
                }
                e++;
                a--;
            }
        } else {
            for (var d = 1; d < g.length; d++) {
                if (g[d].get_item_value().value != "") {
                    g[d].get_item_value().value = parseInt(h._select[d]._item_value) + f;
                }
            }
        }
    }
    c.updateItem();
    toolTipLayer.valObj = null;
    sb_setmenunav(toolTipLayer, false);
}

function openProvinceWindow(a, c) {
    var b = "北京,天津,河北,山西,内蒙古,辽宁,吉林,黑龙江,上海,江苏,浙江,安徽,福建,江西,山东,河南,湖北,湖南,广东,广西,海南,重庆,四川,贵州,云南,西藏,陕西,宁夏,甘肃,青海,新疆,香港,澳门,台湾,其它国家,不指定";
    var g = "<div style='padding:5px 10px;'>";
    var f = b.split(",");
    for (var d = 1; d <= f.length; ++d) {
        var j = f[d - 1];
        var e = "link-06f";
        if (j == "不指定") {
            e = "link-f60";
        }
        var h = "<span style='cursor:pointer;margin-top:3px;'><a onclick='provinceChanged(this);return false;' class='" + e + "' href='javascript:void(0);'>" + j + "</a></span>";
        g += h;
        if (d % 8 == 0) {
            g += "<div></div>";
        } else {
            g += "&nbsp;&nbsp;";
        }
    }
    g += "</div>";
    toolTipLayer.innerHTML = g;
    toolTipLayer.provinceObj = c;
    toolTipLayer.style.width = "360px";
    sb_setmenunav(toolTipLayer, true, c);
}

function provinceChanged(a) {
    if (!toolTipLayer.provinceObj) {
        return;
    }
    toolTipLayer.provinceObj.value = a.innerHTML;
    if (toolTipLayer.provinceObj.value == "不指定") {
        toolTipLayer.provinceObj.value = "";
    }
    if (toolTipLayer.provinceObj.onblur) {
        toolTipLayer.provinceObj.onblur();
    }
    toolTipLayer.provinceObj = null;
    sb_setmenunav(toolTipLayer, false);
}

function getPageQCount() {
    var c = 0;
    var d = new Array();
    var a = 0;
    for (var b = 0; b < questionHolder.length; b++) {
        if (questionHolder[b].dataNode._type == "page") {
            c++;
            d.push(a);
            a = 0;
        } else {
            if (questionHolder[b].dataNode._type != "cut") {
                a++;
            }
        }
    }
    d.push(a);
    return d;
}

function initPageQuestionRandom() {
    var b = "/wjx/design/setrandom.aspx";
    var a = "题目随机设置";
    PDF_launch(b, 623, 472, null, null);
}

function setTikuRandom() {
    var b = "/wjx/design/settiku.aspx";
    var a = "题库随机设置";
    if (WjxActivity._random_mode == "3") {
        b = "/wjx/design/settikuold.aspx";
    }
    PDF_launch(b, 623, 472, null, null);
}

function $import(b) {
    var a = document.createElement("script");
    a.setAttribute("src", b);
    a.setAttribute("type", "text/javascript");
    document.getElementsByTagName("head")[0].appendChild(a);
}

function $importNoCache(a) {
    $import(a);
}

function loadComplete() {
    show_status_tip("成功获得数据", 2000);
    save_paper("init", false);
    setSidePos();
    divMenu.style.visibility = "visible";
    topnav.style.visibility = "visible";
    var a = window.JsVersion || 75;
    $importNoCache("/js/operation_new.js?v=" + a);
    $importNoCache("/kindeditor/kindeditor.js?v=" + a);
    $importNoCache("/js/createqattr_new.js?v=" + a);
    $importNoCache("/js/utility_new.js?v=" + a);
}

function getXmlHttp() {
    var a;
    try {
        a = new XMLHttpRequest();
    } catch (b) {
        try {
            a = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (b) {
            try {
                a = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (b) {
            }
        }
    }
    return a;
}

function removeEventSimple(c, a, b) {
    if (c.removeEventListener) {
        c.removeEventListener(a, b, false);
    } else {
        if (c.detachEvent) {
            c.detachEvent("on" + a, b);
        }
    }
}

function addEventSimple(c, a, b) {
    if (c.addEventListener) {
        c.addEventListener(a, b, false);
    } else {
        if (c.attachEvent) {
            c.attachEvent("on" + a, b);
        }
    }
}

function control_text(b) {
    var a = document.createElement("input");
    a.type = "text";
    a.style.width = b * 10 + "px";
    a.className = "choicetxt";
    return a;
}

function control_image(b) {
    var a = document.createElement("img");
    a.src = b;
    return a;
}

function control_check() {
    var a = document.createElement("input");
    a.type = "checkbox";
    a.tabIndex = "-1";
    return a;
}

function control_textarea(c, b) {
    var a = document.createElement("textarea");
    a.wrap = "soft";
    a.rows = c;
    a.style.width = b * 10 + "px";
    a.style.height = c * 22 + "px";
    a.className = "inputtext";
    return a;
}

function control_btn(b) {
    var a = document.createElement("input");
    a.type = "button";
    a.value = b;
    return a;
}

function control_radio(a) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        try {
            var c = document.createElement('<input type="radio" name="' + a + '" />');
            return c;
        } catch (b) {
            var c = document.createElement("input");
            c.type = "radio";
            c.name = a;
            return c;
        }
    } else {
        var c = document.createElement("input");
        c.type = "radio";
        c.name = a;
        return c;
    }
}

function addTouPiao(c, b, a) {
    if (b._displayPercent || b._displayNum) {
        if (b._displayNum) {
            c.append("<span style='color:#ff6600;'>0票</span>");
        }
        if (b._displayPercent) {
            if (b._displayNum) {
                c.append("(");
            }
            c.append("0%");
            if (b._displayNum) {
                c.append(")");
            }
        }
    }
}

var txtCurCity = null;

function openCityBox(e, d, c, f) {
    txtCurCity = e;
    ZheZhaoControl = txtCurCity;
    f = f || "";
    var a = e.getAttribute("province");
    var b = "";
    if (a) {
        b = "&pv=" + encodeURIComponent(a);
    }
    if (d == 3) {
        PDF_launch("/joinnew/setcitycounty.aspx?activityid=" + activityID + "&ct=" + d + b + "&pos=" + f, 470, 220);
    } else {
        if (d == 4) {
            ZheZhaoControl = null;
            PDF_launch("/joinnew/school.aspx?activityid=" + activityID + b, 700, 340);
        } else {
            if (d == 5) {
                PDF_launch("/wjx/design/setmenupreview.aspx?activityid=" + activityID + "&ct=" + d + "&pos=" + f, 470, 220);
            } else {
                if (d == 6) {
                    PDF_launch("/wjx/join/amap.aspx?activityid=" + activityID + "&ct=" + d + "&pos=" + f, 600, 700);
                } else {
                    PDF_launch("/joinnew/setcity.aspx?activityid=" + activityID + "&ct=" + d + "&pos=" + f, 470, 220);
                }
            }
        }
    }
}

function setCityBox(a) {
    txtCurCity.value = a;
}

function setBatchA() {
    var c = document.getElementById("divbatchq");
    var b = c.getElementsByTagName("a")[0];
    b.style.display = "";
    var a = document.getElementById("hrefBatch");
    if (newQType == 5) {
        b.onclick = function () {
            PDF_launch("addbatch360.aspx", 620, 450, null, "批量添加题目");
        };
    } else {
        if (isKaoShi || hasCeShiQ) {
            b.innerHTML = "批量添加考试题";
            b.onclick = function () {
                PDF_launch("addbatchq.aspx?ks=1", 620, 450, null, "批量添加考试题");
            };
        } else {
            b.onclick = function () {
                PDF_launch("addbatchq.aspx", 620, 450, null, "批量添加题目");
            };
        }
    }
    if (!isKaoShi && !hasCeShiQ) {
        b.innerHTML = "批量添加题目";
        c.style.width = "220px";
        b.className = "sumitbutton cancle";
        b.style.width = "200px";
        b.style.height = "35px";
        b.style.lineHeight = "35px";
    }
}

function showhidebatq() {
    var a = document.getElementById("divbatchq");
    if (!a) {
        return;
    }
    setBatchA();
}

function create_question(g) {
    var ar = g._type;
    var x = g._verify;
    var C = g._height > 1;
    _likertMode = g._tag || 0;
    var O = false;
    var h = false;
    if (isMergeAnswer && isCompleteLoad) {
        h = true;
    }
    var J = document.createElement("div");
    J.className = "div_question";
    J.dataNode = g;
    J.tabIndex = -1;
    var U = $ce("div", "", J);
    U.className = "div_preview";
    U.onclick = function () {
        if (window._czc && !J.isEditing) {
            _czc.push(["_trackEvent", "编辑页面", "编辑题目", "预览区域"]);
        }
        qonclick.call(J);
    };
    J.div_question_preview = U;
    var T = ar == "question";
    var Q = ar == "slider";
    var ad = ar == "sum";
    var aa = ar == "page";
    var N = ar == "cut";
    var b = ar == "check";
    var m = ar == "radio";
    var u = m && _likertMode;
    var q = m && _likertMode > 1;
    var i = ar == "radio_down";
    var e = ar == "matrix";
    var a = ar == "matrix" && _likertMode > 300;
    var P = b && _likertMode;
    var ak = ar == "fileupload";
    var l = m || i || b || e;
    var ap = !N && !aa;
    var W = ar == "gapfill";
    J.isMergeNewAdded = h;
    if (ap) {
        total_question++;
    }
    QIndentity++;
    showhidebatq();
    var k = document.createElement("div");
    if (ap) {
        var X = g._topic;
        X = X - totalHideQcount;
        var aj = X + "";
        if (X - 100 < 0) {
            aj += ".";
        }
        if (newQType == 5) {
            if (X == 1) {
                aj = "";
            } else {
                aj = (X - 1) + ".";
            }
        }
        if (hasCeShiQ) {
            if (!g._isCeShi) {
                aj = "";
                totalHideQcount++;
            }
        }
        var L = $ce("div", aj, k);
        J.divTopic = L;
        L.className = "div_topic_question";
        if (g._topic - 100 >= 0) {
            L.style.fontSize = "14px";
        }
        if (WjxActivity._use_self_topic) {
            L.style.display = "none";
        }
    }
    if (aa) {
        var j = g._iszhenbie;
        k.style.position = "relative";
        var r = "<span style='font-size:14px; font-weight:bold;'>第" + g._topic + "页/共" + total_page + "页</span>";
        var L = $ce("span", r, k);
        var w = $ce("span", false, k);
        L.className = "div_topic_page_question paging-bg";
        if (total_page == 1) {
            L.style.visibility = "hidden";
            w.style.visibility = "hidden";
        } else {
            L.style.visibility = "visible";
            w.style.visibility = "visible";
        }
        var ah = $ce("div", false, k);
        ah.className = "related_settings";
        w.className = "line_as_hr";
        J.title = "分页栏";
        J.line = w;
        J.divTopic = L;
        J.divZhenBie = $ce("span", "<b style='color:red;'>甄别页</b>", ah);
        if (g._istimer) {
            $ce("span", "<b style='color:red;'>--时间页</b>", ah);
        }
        J.divZhenBie.style.display = j ? "" : "none";
        J.divTimeLimit = $ce("span", "", ah);
        J.showTimeLimit = function () {
            var v = "";
            if (this.dataNode._istimer) {
                if (this.dataNode._mintime) {
                    v = "<b style='color:green;'>页面停留时间：" + this.dataNode._mintime + "秒</b>";
                }
            } else {
                if (this.dataNode._mintime) {
                    v = "<b style='color:green;'>最短填写时间：" + this.dataNode._mintime + "秒</b>";
                }
                if (this.dataNode._maxtime) {
                    if (v) {
                        v += "&nbsp;";
                    }
                    v += "<b style='color:red;'>最长填写时间：" + this.dataNode._maxtime + "秒</b>";
                }
            }
            J.divTimeLimit.innerHTML = v;
        };
        J.showTimeLimit();
        if (g._topic == "1") {
            isPrevFirstPage = true;
        }
    }
    if (N) {
        k.className = "div_title_cut_question";
    }
    if (ap) {
        k.className = "div_title_question_all";
    }
    if (g._isQingJing) {
        k.style.display = "none";
    }
    var o = $ce("div", "", k);
    o.onclick = function (v) {
        if (J.isEditing) {
            J.gettextarea().focus();
            J.attrMain.scrollIntoView();
            stopPropa(v);
        }
    };
    var am = g._title;
    if (W) {
        var s = "<div style='margin-top:8px;'></div>";
        am = replaceGapFill(am, g).replace(/\<br\s*\/?\>/g, s);
    } else {
        if (N) {
            am = am || "请在此输入说明文字";
            if (am.length <= 10) {
                am = "<b>" + am + "</b>";
            }
        }
    }
    var ag = $ce("span", am, o);
    if (aa) {
        o.className = "div_title_page_question";
        if (am == "") {
            o.style.margin = "0 auto";
        } else {
            o.style.margin = "0 auto";
            o.style.marginBottom = "10px";
            o.style.borderBottom = "1px dashed #efefef";
        }
    } else {
        if (N && g._video) {
            var I = "<iframe height='498' width='510' src='" + g._video + "' frameborder=0 allowfullscreen></iframe>";
            J.div_video_title = $ce("div", I, o);
        } else {
            o.className = "div_title_question";
        }
    }
    J.get_div_title = function () {
        return ag;
    };
    if (isCepingQ && g._type == "check" && g._topic == "1") {
        J.style.display = "none";
    }
    if (ap) {
        var aq = $ce("span", "*", o);
        J.setreqstatus = function () {
            aq.className = "req";
            aq.style.display = this.dataNode._requir ? "" : "none";
            if (W) {
                if (this.checkTitle) {
                    this.checkTitle();
                }
                if (!EndGapReq || this.dataNode._partRequir) {
                    aq.style.display = "none";
                }
            } else {
                if (this.dataNode._requir && this.dataNode._type == "matrix" && this.dataNode._tag == "201" && this.dataNode._partRequir) {
                    aq.style.display = "none";
                }
            }
            return aq;
        };
        J.setreqstatus();
        J.updateTitle = function () {
            if (this.txttitle) {
                this.txttitle.value = this.dataNode._title;
            }
            this.get_div_title().innerHTML = this.dataNode._title;
        };
        if (T) {
            var A = $ce("span", "", o);
            A.className = "font-a0";
            J.showMinMaxWord = function (av, at) {
                var ay = this.dataNode;
                var au = "";
                var aw = type_wd_words;
                var ax = type_wd_minlimit;
                var v = ay._verify == "数字" || ay._verify == "小数";
                if (v) {
                    aw = "";
                    ax = type_wd_minlimitDigit;
                    au = type_wd_digitfrom;
                }
                if (!isEmpty(av) && !isEmpty(at)) {
                    A.innerHTML = "&nbsp;（" + au + at + type_wd_to + av + aw + "）";
                    A.style.display = "";
                    if (at == av && !v) {
                        A.innerHTML = "&nbsp;（" + av + type_wd_words + "）";
                        if (ay._verify == "学号") {
                            A.innerHTML = "&nbsp;（" + av + "位数字）";
                        }
                    }
                } else {
                    if (!isEmpty(av)) {
                        A.innerHTML = "&nbsp;（" + av + type_wd_limit + "）";
                        if (v) {
                            A.innerHTML = "&nbsp;（" + type_wd_maxlimitDigit + av + "）";
                        }
                        A.style.display = "";
                    } else {
                        if (!isEmpty(at)) {
                            A.innerHTML = "&nbsp;（" + ax + at + aw + "）";
                            A.style.display = "";
                        } else {
                            A.style.display = "none";
                        }
                    }
                }
            };
            J.showMinMaxWord(g._maxword, g._minword);
            J.get_span_maxword = function () {
                return A;
            };
        }
        if (g._isCeShi && (T || m || b || ak)) {
            var E = $ce("span", "", o);
            E.style.color = "#efa030";
            if (T) {
                J.setCeshiQTip = function () {
                    var v = "答案：" + g._answer;
                    if (g._answer == "简答题无答案") {
                        v = "无标准答案需人工评分";
                    }
                    E.innerHTML = "（" + v + "，分值：" + g._ceshiValue + "分）";
                };
                J.setCeshiQTip();
            } else {
                E.innerHTML = "（分值：" + g._ceshiValue + "分）";
            }
            J.spanCeShi = E;
        }
        if (g._isTouPiao) {
            var S = $ce("span", "", o);
            S.style.color = "#efa030";
            var Y = "&nbsp;投票题";
            S.innerHTML = Y;
        }
        if (b || (e && _likertMode == "102")) {
            var ao = document.createElement("span");
            J.updateSpanCheck = function () {
                var ax = this.dataNode;
                if (ax._isShop) {
                    return;
                }
                ax._lowLimit = ax._lowLimit || "";
                ax._upLimit = ax._upLimit || "";
                var v = type_check;
                if (e) {
                    v = "多选题";
                }
                var aw = "";
                var av = false;
                if (P) {
                    aw = "-1";
                }
                var at = "";
                if (!ax._isTouPiao) {
                    at = "[";
                }
                if (ax._lowLimit != aw && ax._upLimit != aw) {
                    if (ax._lowLimit == ax._upLimit) {
                        ao.innerHTML = "&nbsp;" + at + type_check_limit1 + "<b>" + ax._lowLimit + "</b>" + type_check_limit5;
                    } else {
                        ao.innerHTML = "&nbsp;" + at + type_check_limit1 + "<b>" + ax._lowLimit + "</b>-<b>" + ax._upLimit + "</b>" + type_check_limit5;
                    }
                    av = true;
                } else {
                    if (ax._lowLimit != aw) {
                        var au = type_check_limit5;
                        if (ax._lowLimit == "1" && langVer == 1) {
                            au = " item";
                        }
                        ao.innerHTML = "&nbsp;" + at + type_check_limit3 + "<b>" + ax._lowLimit + "</b>" + au;
                        av = true;
                    } else {
                        if (ax._upLimit != aw) {
                            ao.innerHTML = "&nbsp;" + at + type_check_limit4 + "<b>" + ax._upLimit + "</b>" + type_check_limit5;
                            av = true;
                        } else {
                            ao.innerHTML = "&nbsp;" + at + v;
                        }
                    }
                }
                if (P) {
                    if (av) {
                        if (ax._lowLimit == "" || ax._lowLimit == ax._select.length - 1) {
                            ao.innerHTML = "&nbsp;[" + type_check_limit1 + "<b>" + type_order_all + "</b>" + type_check_limit5;
                        }
                        ao.innerHTML += type_order_limit_end;
                    } else {
                        ao.innerHTML = "&nbsp;[" + type_order;
                    }
                }
                if (!ax._isTouPiao) {
                    ao.innerHTML += "]";
                }
                if (ax._isCeShi) {
                    ao.innerHTML = "[" + type_check + "]";
                }
                ao.className = "qtypetip";
            };
            J.updateSpanCheck();
            o.appendChild(ao);
        } else {
            if (a) {
                var ao = $ce("span", "", o);
                J.updateSpanCheck = function () {
                    if (this.dataNode._tag == "301" && this.dataNode._minvalue !== "" && this.dataNode._maxvalue !== "") {
                        ao.innerHTML = "&nbsp;[输入" + this.dataNode._minvalue + "到" + this.dataNode._maxvalue + "的数字]";
                        ao.className = "qtypetip";
                    } else {
                        ao.innerHTML = "";
                    }
                    ao.style.display = this.dataNode._tag == "301" ? "" : "none";
                };
                J.updateSpanCheck();
            }
        }
        if (e) {
            if (g._tag == "102" || g._tag == "103") {
                var n = $ce("span", "", o);
                J.updateSpanMatrix = function () {
                    if (g._daoZhi) {
                        var v = "竖向单选";
                        if (g._tag == "102") {
                            v = "竖向多选";
                        }
                        n.innerHTML = "&nbsp;[" + v + "]";
                        n.className = "qtypetip";
                    } else {
                        n.innerHTML = "";
                    }
                };
                J.updateSpanMatrix();
            }
        }
    }
    var af = $ce("div", "", k);
    af.style.clear = "both";
    U.appendChild(k);
    if (ap || N) {
        var B = $ce("div", "", U);
        B.className = "div_table_par";
    }
    if (ap) {
        var ab = document.createElement("div");
        ab.className = "div_ins_question";
        ab.innerHTML = g._ins || "";
        ab.style.display = g._ins ? "" : "none";
        B.appendChild(ab);
        J.get_div_ins = function () {
            return ab;
        };
        var z = document.createElement("div");
        z.className = "div_table_radio_question";
        var p = $ce("div", "", z);
        p.className = "div_table_clear_top";
        B.appendChild(z);
        if (g._isQingJing) {
            z.style.paddingLeft = "0";
        }
    }
    if (T) {
        var D = $ce("div", "", z);
        D.style.position = "relative";
        var F = control_textarea("1", "50");
        F.style.paddingLeft = "27px";
        D.appendChild(F);
        var d = $ce("span", "", D);
        d.style.position = "absolute";
        d.style.left = "3px";
        d.style.top = "3px";
        F.style.overflow = "auto";
        $ce("div", "", z).style.marginBottom = "6px";
        if (g._verify != "省市区" && g._verify != "高校") {
            F.value = g._default;
        } else {
            if (g._default) {
                F.value = "指定省份为：" + g._default;
            }
        }
        J.showTextAreaUnder = function () {
            F.className = this.dataNode._underline ? "underline" : "inputtext";
        };
        J.showTextAreaWidth = function () {
            if (isEmpty(this.dataNode._width)) {
                F.style.width = "62%";
            } else {
                F.style.width = this.dataNode._width + "px";
                F.style.display = this.dataNode._width == 1 ? "none" : "";
            }
        };
        J.showTextAreaHeight = function () {
            F.style.height = this.dataNode._height * 22 + "px";
        };
        J.showSmsVerify = function () {
            if (!this.divsms) {
                var v = $ce("div", "", z);
                v.style.marginTop = "15px";
                v.innerHTML = "<a href='javascript:;' style='padding:5px 6px;height:20px;border:1px solid #ccc;background:#eeeeee;display:inline-block;color:#555;font-size:12px;float:left;'>发送验证短信</a><textarea style='text-align:center;width:66px;height:26px;line-height:26px;padding:2px;display:inline-block;border:1px solid #ccc;border-left:none;float:left;overflow:auto;tabindex:-1;' placeholder='验证码'></textarea><div class='divclear'></div>";
                this.divsms = v;
            }
            this.divsms.style.display = (this.dataNode._verify == "手机" && this.dataNode._needsms) ? "" : "none";
        };
        J.showConfirmPwd = function () {
            if (!this.divConfirmPwd) {
                var v = $ce("div", "", z);
                v.style.margin = "8px 0";
                v.innerHTML = '<textarea wrap="soft" placeholder="重复输入密码" rows="1" class="inputtext" style="width: 250px;font-size:14px; height: 22px; overflow: auto;"></textarea>';
                this.divConfirmPwd = v;
            }
            this.divConfirmPwd.style.display = (this.dataNode._verify == "密码") ? "" : "none";
        };
        J.showTextAreaDate = function () {
            var v = this.dataNode._verify;
            var at = this.dataNode._topic;
            F.onclick = null;
            var au = "";
            d.innerHTML = "";
            F.placeholder = "";
            if (v == "日期" || v == "生日" || v == "入学时间") {
                F.style.width = "100px";
                F.style.height = "22px";
                au = "/images/form/date.png";
            } else {
                if (v == "数字" || v == "小数") {
                    F.style.width = "150px";
                    F.style.height = "22px";
                } else {
                    if (v == "密码") {
                        F.style.width = "250px";
                        F.style.overflow = "auto";
                        F.placeholder = "密码，至少8位，需包含字母和数字";
                        F.style.fontSize = "14px";
                    } else {
                        if (v == "城市单选" || v == "城市多选" || v == "省市区" || v == "高校" || v == "多级下拉" || v == "地图") {
                            F.style.height = "22px";
                            F.style.paddingLeft = "27px";
                            var aw = "150px";
                            var av = 1;
                            var au = "/images/form/city.png";
                            if (v == "城市多选") {
                                aw = "400px";
                                av = 2;
                            } else {
                                if (v == "省市区") {
                                    aw = "250px";
                                    av = 3;
                                } else {
                                    if (v == "高校") {
                                        aw = "250px";
                                        av = 4;
                                        au = "/images/form/school.png";
                                    } else {
                                        if (v == "多级下拉") {
                                            aw = "400px";
                                            av = 5;
                                            au = "/images/form/click.png";
                                        } else {
                                            if (v == "地图") {
                                                F.disabled = true;
                                                F.style.resize = "none";
                                                F.style.height = "98px";
                                                F.style.borderRadius = "2px";
                                                F.style.borderStyle = "dashed";
                                                F.style.cursor = "pointer";
                                                F.style.background = "url('/images/form/getLocal.png')";
                                                F.style.paddingLeft = "0";
                                                aw = "698px";
                                                av = 6;
                                                au = "";
                                            }
                                        }
                                    }
                                }
                            }
                            F.style.width = aw;
                            F.onclick = function () {
                                openCityBox(this, av, null, at);
                            };
                        } else {
                            if (v == "手机") {
                                au = "/images/form/mobile.png";
                            } else {
                                if (v == "Email") {
                                    au = "/images/form/email.png";
                                } else {
                                    if (v == "电话" || v == "固话") {
                                        au = "/images/form/tel.png";
                                    } else {
                                        if (v == "QQ") {
                                            au = "/images/form/qq.png";
                                        } else {
                                            if (v == "姓名") {
                                                au = "/images/form/name.png";
                                            } else {
                                                if (v == "网址") {
                                                    au = "/images/form/website.png";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            d.innerHTML = "";
                            this.showTextAreaWidth();
                            this.showTextAreaHeight();
                        }
                    }
                }
            }
            if (this.dataNode._verify == "密码") {
                this.showConfirmPwd();
            } else {
                if (this.divConfirmPwd) {
                    this.divConfirmPwd.style.display = "none";
                }
            }
            if (au) {
                d.innerHTML = "<img src='" + au + "' alt=''/>";
            }
        };
        J.showTextAreaUnder();
        J.showTextAreaWidth();
        J.showTextAreaHeight();
        J.showTextAreaDate();
        if (J.dataNode._needsms) {
            J.showSmsVerify();
        }
        J.get_textarea = function () {
            return F;
        };
    }
    if (ak) {
        var y = $ce("div", "", z);
        J.updateFileUpload = function () {
            var at = g._maxsize;
            var ax = "";
            if (at % 1024 == 0) {
                ax = "（不超过" + (at / 1024) + "M）";
            } else {
                ax = "（不超过" + at + "KB）";
            }
            var ay = getIEVersion();
            var av = ay && (!document.documentMode || document.documentMode < 8);
            var au = ay <= 7 || av;
            var aw = "position:relative;";
            if (au) {
                aw = "";
            }
            var v = '<div class="file"><img class="uppic" src="/images/newimg/upload@2x.png" alt="">选择文件' + ax;
            if (!au) {
                v += '<input disabled type="file" style="position: absolute;left: 0;top: 0;height: 30px; filter:alpha(opacity=0);opacity:0; background-color: transparent;width:200px; font-size:180px;"/>';
            }
            v += "</div>";
            y.innerHTML = v;
        };
        J.updateFileUpload();
    }
    if (W) {
    }
    if (Q) {
        var Z = $ce("span", g._minvaluetext || "", z);
        Z.className = "spanLeft";
        Z.style.color = "red";
        J.get_span_min_value_text = function () {
            return Z;
        };
        var f = $ce("span", "(" + (g._minvalue || 0) + ")", z);
        f.className = "spanLeft";
        f.style.color = "red";
        J.get_span_min_value = function () {
            return f;
        };
        var G = $ce("span", "(" + (g._maxvalue || 100) + ")", z);
        G.className = "spanRight";
        G.style.color = "red";
        J.get_span_max_value = function () {
            return G;
        };
        var K = $ce("span", g._maxvaluetext || "", z);
        K.className = "spanRight";
        K.style.color = "red";
        J.get_span_max_value_text = function () {
            return K;
        };
        $ce("div", "", z).className = "divclear";
        var R = control_image("/Images/WJX/JoinQuestionnaire/slider1.jpg");
        R.style.width = "10px";
        var al = control_image("/Images/WJX/JoinQuestionnaire/sliderEnd.jpg");
        al.style.width = "97%";
        al.style.height = "23px";
        z.appendChild(R);
        z.appendChild(al);
        $ce("div", "", z).className = "divclear";
        z.style.width = "60%";
        var F = control_textarea("1", "10");
        F.style.display = "none";
    }
    if (ad) {
        J.createSum = function () {
            var ay = new StringBuilder();
            ay.append("<div  class='div_table_clear_top'></div>");
            if (this._referDivQ) {
                ay.append("此题行标题来源于第" + this._referDivQ.dataNode._topic + "题的选中项");
            } else {
                ay.append("<table style='width:100%;' border='0px'  cellpadding='5' cellspacing='0'>");
                var au = "";
                var v = "";
                ay.append("<tbody>");
                var ax = new Array();
                ax = trim(g._rowtitle).split("\n");
                var aw = "";
                for (var at = 0; at < ax.length; at++) {
                    if (at == ax.length - 1) {
                        au = "";
                        v = "";
                    }
                    if (ax[at].length > 4 && ax[at].substring(0, 4) == "【标签】") {
                        var av = ax[at].substring(4);
                        ay.append("<tr><th align='left'><b style='color:#0066ff;'>" + av + "</b></th><td></td></tr>");
                        aw = "padding-left:10px;";
                        continue;
                    }
                    if (g._rowwidth == "") {
                        ay.append("<tr><th align='left' style='" + v + aw + "'>" + ax[at] + "</th>");
                    } else {
                        ay.append("<tr><th align='left' style='width:" + g._rowwidth + ";" + v + aw + "'>" + ax[at] + "</th>");
                    }
                    ay.append("<td  " + au + "align='left' width='36'><input  type='text' style='width:36px;'/></td>");
                    ay.append("<td  " + au + "align='left'><img src='/Images/WJX/JoinQuestionnaire/slider1.jpg' style='width: 10px;'/><img src='/Images/WJX/JoinQuestionnaire/sliderEnd.jpg' style='width:250px;height: 23px;'/></td>");
                    ay.append("</tr>");
                }
                ay.append("</tbody></table>");
            }
            ay.append("<div style='margin-top:10px;'><span style='color:#666666;'>" + sum_hint + "</span></div>");
            z.innerHTML = ay.toString("");
        };
        J.createSum();
    }
    if (l) {
        J.createTableRadio = function () {
            var aV = this.dataNode;
            var bn = aV._isTouPiao;
            var aL = aV._isCeShi;
            var aW = aV._isCePing;
            var b0 = aV._numperrow ? aV._numperrow : 1;
            var bv = aV._select;
            var a1 = aV._tag;
            var aS = aV._displayThumb;
            var bO = false;
            if (bn) {
                for (var a5 = 1; a5 < bv.length; a5++) {
                    if (bv[a5]._item_img) {
                        bO = true;
                    }
                }
            }
            if (bO) {
                b0 = 4;
            }
            var bG = new StringBuilder();
            bG.append("<div  class='div_table_clear_top'></div>");
            var a7 = false;
            if (this._referDivQ) {
                var aH = "选项";
                if (aV._type == "matrix" || aV.type == "sum") {
                    aH = "行标题";
                }
                a7 = true;
                var av = "第" + this._referDivQ.dataNode._topic + "题";
                if (newQType == 5 && (aV._type == "matrix" || aV.type == "sum")) {
                    a7 = false;
                }
                if (newQType == 5) {
                    bG.append("<span style='color:red;'>");
                    av = "被测评对象";
                }
                bG.append("此题" + aH + "来源于" + av + "的选中项");
                if (newQType == 5) {
                    bG.append("</span>");
                }
            } else {
                if (aV._isQingJing) {
                    var aF = this.qingjing || 1;
                    if (aF >= bv.length) {
                        aF = 1;
                    }
                    a7 = true;
                    bG.append("<div style='font-size:16px;color:#333;font-weight:bold;margin-top:10px;'>" + bv[aF]._item_title + "&nbsp;<a style='font-size:16px;cursor:pointer;' onclick='if(curover)curover.createTableRadio();stopPropa(event);'>切换场景</a></div>");
                    bG.append(bv[aF]._item_desc || "请设置情景说明");
                    aF++;
                    this.qingjing = aF;
                } else {
                    if (aV._isShop) {
                        a7 = true;
                        bG.append("<ul>");
                        for (var a5 = 1; a5 < bv.length; a5++) {
                            var be = bv[a5]._item_title;
                            var aX = bv[a5]._item_value;
                            var by = bv[a5]._item_img;
                            var bc = "";
                            if (a5 > 1 && a5 % 3 == 1) {
                                bc = " style='clear:both;'";
                            }
                            bG.append("<li class='shop-item' " + bc + " style='line-height:20px;'>");
                            if (by) {
                                bG.append("<div class='img_place'><img src='" + by + "' alt='' /></div>");
                            }
                            bG.append("<div class='text_place'>");
                            bG.append("<div class='item_name'>" + be + "</div>");
                            bG.append('<p class="item_price">');
                            if (bv[a5]._item_jump) {
                                bG.append('<span style="color:#999;font-size:12px;font-weight:normal">库存' + bv[a5]._item_jump + "件</span><br/>");
                            }
                            bG.append("￥" + aX + "</p>");
                            bG.append('<p class="item_select"><span class="operation remove">-</span><input class="operation itemnum" value="0" disabled="disabled"><span class="operation add">+</span></p>');
                            bG.append("</div><div class='divclear'></div></li>");
                        }
                        bG.append("</ul>");
                    }
                }
            }
            if (!a7) {
                if (i) {
                    bG.append("<select><option>" + type_radio_down + "</option>");
                    for (var a5 = 1; a5 < bv.length; a5++) {
                        if (bv[a5]._item_radio) {
                            bG.append("<option selected='selected'>" + trim(bv[a5]._item_title) + "</option>");
                        } else {
                            bG.append("<option>" + trim(bv[a5]._item_title) + "</option>");
                        }
                    }
                    bG.append("</select>");
                }
                if (m || (b && !P)) {
                    bG.append("<ul>");
                    var aK;
                    var bu = "%";
                    if (u) {
                        aK = 40;
                        bu = "px";
                        b0 = 1;
                    } else {
                        aK = (100 / b0) - 1;
                    }
                    var aQ = false;
                    var bK = 1;
                    var bP = false;
                    for (var a5 = 1; a5 < bv.length; a5++) {
                        if (bv[a5]._item_img) {
                            bP = true;
                            break;
                        }
                    }
                    for (var a5 = 1; a5 < bv.length; a5++) {
                        if (ar == "radio" && a1 >= 1 && a1 != 101 && a5 == 1) {
                            var bx = "5px";
                            bG.append("<li class='notchoice' style='padding-right:15px;padding-top:" + bx + "'><b>" + bv[1]._item_title + "</b></li>");
                            if (a1 == "6") {
                                bG.append("<li><ul class='onscore'>");
                            }
                        }
                        if (m && a1 > 1 && a1 != 101) {
                            var bB = "style='padding-left:3px;'";
                            var aI = bv.length - 1;
                            var bQ = "off";
                            var bL = "on";
                            if (a1 == "6") {
                                var bo = parseInt(355 / aI) - 2;
                                if (a5 == aI) {
                                    bo += 355 % aI;
                                }
                                if (aI >= 18) {
                                    var aO = 12;
                                    var bm = 9;
                                    if (aI == 21) {
                                        aO = 11;
                                        bm = 10;
                                    }
                                    var bd = (aO + 2) * bm;
                                    var aR = aI - bm;
                                    var at = 355 - bd;
                                    if (aI >= 18) {
                                        if (a5 >= bm + 1) {
                                            bo = parseInt(at / aR) - 2;
                                        } else {
                                            bo = aO;
                                        }
                                    }
                                    if (a5 == aI) {
                                        bo += at % aR;
                                    }
                                }
                                bB = "style='width:" + bo + "px' ";
                                bQ = "off";
                                bL = "on";
                            }
                            if (a5 == aI) {
                                bG.append("<li " + bB + " class='" + bQ + aV._tag + "'  >");
                            } else {
                                bG.append("<li " + bB + " class='" + bL + aV._tag + "'  >");
                            }
                            if (a1 == "6") {
                                var bE = bv[a5]._item_value;
                                if (bE == NoValueData) {
                                    bE = "&nbsp;";
                                }
                                bG.append(bE);
                            }
                            bG.append("</li>");
                        } else {
                            if (bv[a5]._item_label) {
                                if (aQ) {
                                    bG.append("</ul></li>");
                                }
                                bG.append("<li style='width:100%;'><div><b>" + bv[a5]._item_label + "</b></div><ul>");
                                aQ = true;
                                bK = 1;
                            }
                            if (a1 == 101) {
                                aK = trim(bv[a5]._item_title).length * 16 + 28;
                            }
                            bG.append("<li  style='width:" + aK + bu + ";");
                            if (bv[a5]._item_img) {
                                bG.append("margin-bottom:15px;");
                            }
                            bG.append("'>");
                            var v = false;
                            if ((ar == "radio" || ar == "check") && bv[a5]._item_radio) {
                                v = true;
                            }
                            if (!bv[a5]._item_img) {
                                if (bn) {
                                    bG.append("<div style='float:left;width:" + aV._touPiaoWidth + "%;'>");
                                } else {
                                    if (aL && bv[a5]._item_radio) {
                                        bG.append("<span style='color:#efa030;'>");
                                    }
                                }
                                var bS = "jqRadio";
                                if (!m) {
                                    bS = "jqCheckbox";
                                }
                                if (v) {
                                    bS += " jqChecked";
                                }
                                bG.append("<a href='###' class='" + bS + "' style='position:static;'></a><input style='display:none;'");
                                if (m) {
                                    bG.append(" type='radio'");
                                } else {
                                    bG.append(" type='checkbox'");
                                }
                                if (v) {
                                    bG.append(" checked='checked'");
                                }
                                if (ar == "radio" && a1 == 1) {
                                    var au = trim(bv[a5]._item_value);
                                    if (au == "-77777") {
                                        au = "";
                                    }
                                    bG.append("/><label style='vertical-align:middle;padding-left:2px;'>" + au + "</label>");
                                } else {
                                    bG.append("/><label style='vertical-align:middle;padding-left:2px;'>" + trim(bv[a5]._item_title) + "</label>");
                                }
                                if (bv[a5]._item_tb) {
                                    bG.append(" <input type='text' class='underline' style='color:#999999;max-width:500px;' value='" + defaultOtherText + "'/>");
                                }
                                if (bv[a5]._item_tbr) {
                                    bG.append(" <span style='color: red;'> *</span>");
                                }
                                if (bn) {
                                    bG.append("</div>");
                                    bG.append("<div style='float:left;'>");
                                    addTouPiao(bG, aV, a5);
                                    bG.append("</div><div class='divclear'></div>");
                                } else {
                                    if (aL && bv[a5]._item_radio) {
                                        bG.append("&nbsp;<label style='vertical-align:middle;'>(正确答案)</label></span>");
                                    } else {
                                        if (aW) {
                                            var bY = bv[a5]._item_value;
                                            if (bY == NoValueData || bY == "") {
                                                bY = "N/A";
                                            }
                                            bG.append("<span style='color:#efa030;font-size:14px;'>&nbsp;(分值：" + bY + ")</span>");
                                        }
                                    }
                                }
                                if (aV._hasjump && aV._anytimejumpto < 1) {
                                    var aB = "";
                                    var bI = "";
                                    if (bv[a5]._item_jump == "1") {
                                        aB = "结束作答";
                                    } else {
                                        if (bv[a5]._item_jump == "-1") {
                                            aB = "点下一页时提交为无效答卷";
                                        } else {
                                            if (bv[a5]._item_jump - 1 > 0) {
                                                var az = bv[a5]._item_jump;
                                                if (WjxActivity._use_self_topic) {
                                                    var aE = getjumpNode(bv[a5]._item_jump);
                                                    if (aE) {
                                                        var ax = aE._title.match(/^\s*\d+[、\.\-\_\(\/]?\d*\)?/);
                                                        if (ax) {
                                                            az = ax;
                                                        }
                                                    }
                                                }
                                                aB = "跳转到第" + az + "题";
                                                bI = ' onmouseover="showJumpTip(true,' + bv[a5]._item_jump + ',this);" onmouseout="showJumpTip(false);"';
                                            }
                                        }
                                    }
                                    if (aB) {
                                        bG.append("<span style='color:#efa030;font-size:14px;'" + bI + ">&nbsp;(" + aB + ")</span>");
                                    }
                                }
                                if (bv[a5]._item_desc) {
                                    if (aV._displayDesc || (bn && bP)) {
                                        var bV = "divDesc_" + aV._topic + "_" + a5;
                                        var aA = aV._displayDescTxt || "查看详情";
                                        bG.append("<div style='margin:0 0 15px 20px;'><a class='link-U333' href='javascript:' onclick='showItemDesc(\"" + bV + "\",this);'>" + aA + "</a></div><div id='" + bV + "' style='display:none;'><div style='padding:10px;'>" + bv[a5]._item_desc + "</div></div>");
                                    } else {
                                        bG.append("<div class='div_item_desc'>" + bv[a5]._item_desc + "</div>");
                                    }
                                }
                            } else {
                                var bb = bv[a5]._item_img;
                                var a0 = bb;
                                var bW = "";
                                var aJ = "";
                                var bt = bb.indexOf(".sojump.com") > -1 || bb.indexOf(".sojump.cn") > -1 || bb.indexOf(".paperol.cn") > -1;
                                if (bO && bt) {
                                    if (bb.indexOf("pubali") > -1 || bb.indexOf("pubnew") > -1) {
                                        var a2 = "?x-oss-process";
                                        var bp = bb.indexOf(a2);
                                        if (bp > -1) {
                                            bb = bb.substring(0, bp);
                                        }
                                        bb = bb + a2 + "=image/quality,q_90/resize,m_lfit,h_200,w_200";
                                    } else {
                                        var a2 = "?imageMogr2";
                                        var bp = bb.indexOf(a2);
                                        if (bp > -1) {
                                            bb = bb.substring(0, bp);
                                        }
                                        bb = bb + a2 + "/thumbnail/200x200!";
                                    }
                                    bW = "width:152px;white-space: nowrap;";
                                    aJ = " style='height:200px;overflow:hidden;'  pimg='" + a0 + "'";
                                } else {
                                    bW = "margin-right:15px;";
                                }
                                bG.append("<div style='text-align:center;padding:5px;border:1px solid #ddd;" + bW + "'>");
                                bG.append("<table align='center' cellspacing='0' cellpadding='0' style='table-layout: fixed;width:100%;'><tr><td>");
                                bG.append("<div" + aJ + " class='hasImagelabel'>");
                                if (bn) {
                                    bG.append('<i class="icon_lookBigpic" onclick="elagerImg(event,this);stopPropa(event);"></i>');
                                }
                                bG.append("<img style='border:none;margin:0 auto;' src='" + bb + "' alt='' /></div>");
                                bG.append("</td></tr>");
                                if (bv[a5]._item_desc) {
                                    bG.append("<tr><td>");
                                    if (aV._displayDesc || bn) {
                                        var bV = "divDesc_" + aV._topic + "_" + a5;
                                        var aA = aV._displayDescTxt || "查看详情";
                                        bG.append("<div style='text-align:center;'><a class='link-U333' href='javascript:' onclick='showItemDesc(\"" + bV + "\",this);'>" + aA + "</a></div><div id='" + bV + "' style='display:none;'><div style='padding:10px;'>" + bv[a5]._item_desc + "</div></div>");
                                    } else {
                                        bG.append("<div class='div_item_desc'");
                                        bG.append(" style='text-align:left;");
                                        if (bO) {
                                            bG.append("height:20px;width:150px;margin-left:0px;overflow:hidden;");
                                        }
                                        bG.append("'");
                                        bG.append(">");
                                        bG.append(bv[a5]._item_desc);
                                        bG.append("</div>");
                                    }
                                    bG.append("</td></tr>");
                                }
                                bG.append("</table>");
                                bG.append("<div>");
                                if (bn) {
                                    bG.append("<div style='text-align:center;'>");
                                    addTouPiao(bG, aV, a5);
                                    bG.append("</div>");
                                }
                                if (bO) {
                                    var bS = "jqRadio";
                                    if (!m) {
                                        bS = "jqCheckbox";
                                    }
                                    if (v) {
                                        bS += " jqChecked";
                                    }
                                    bG.append("<a href='###' class='" + bS + "' style='position:static;'></a><input style='display:none;'");
                                    if (m) {
                                        bG.append(" type='radio'");
                                    } else {
                                        bG.append(" type='checkbox'");
                                    }
                                    if (v) {
                                        bG.append(" checked='checked'");
                                    }
                                    if (ar == "radio" && a1 == 1) {
                                        bG.append("'/><label style='vertical-align:middle;padding-left:2px;'>" + trim(bv[a5]._item_value) + "</label>");
                                    } else {
                                        bG.append("'/>");
                                    }
                                }
                                if (!bO) {
                                    var bS = "jqRadio";
                                    if (!m) {
                                        bS = "jqCheckbox";
                                    }
                                    if (v) {
                                        bS += " jqChecked";
                                    }
                                    bG.append("<a href='###' class='" + bS + "' style='position:static;'></a><input style='display:none;'");
                                    if (m) {
                                        bG.append(" type='radio'");
                                    } else {
                                        bG.append(" type='checkbox'");
                                    }
                                    if (v) {
                                        bG.append(" checked='checked'");
                                    }
                                    if (ar == "radio" && a1 == 1) {
                                        bG.append("'/><label style='vertical-align:middle;padding-left:2px;'>" + trim(bv[a5]._item_value) + "</label>");
                                    } else {
                                        bG.append("'/>");
                                    }
                                }
                                if (bO) {
                                    bG.append("<label style='display:inline-block;padding:0;max-width:125px;white-space: normal;line-height:20px;vertical-align: middle;'>" + trim(bv[a5]._item_title) + "</label>");
                                } else {
                                    if (bv[a5]._item_imgtext) {
                                        bG.append(trim(bv[a5]._item_title));
                                    } else {
                                        bG.append("&nbsp;");
                                    }
                                }
                                if (bv[a5]._item_tb) {
                                    width = 500;
                                    if (bO) {
                                        bG.append("<br/>");
                                        width = 120;
                                    }
                                    bG.append(" <input type='text' class='inputtext' style='color:#999999;max-width:" + width + "px;' value='" + defaultOtherText + "'/>");
                                }
                                if (bv[a5]._item_tbr) {
                                    bG.append("<span style='color: red;'> *</span>");
                                }
                                bG.append("</div>");
                                bG.append("</div>");
                            }
                            bG.append("</li>");
                        }
                        if (m && a1 >= 1 && a1 != 101 && a5 == bv.length - 1) {
                            var bx = "5px";
                            if (a1 == 6) {
                                bG.append("</ul></li>");
                            }
                            bG.append("<li  class='notchoice'  style='padding-left:15px;padding-top:" + bx + "'><b>" + bv[bv.length - 1]._item_title + "</b></li>");
                        }
                        if (b0 > 1 && bK % b0 == 0) {
                            bG.append("<div style='clear:both;'></div></ul><ul>");
                        }
                        bK++;
                    }
                    bG.append("<div style='clear:both;'></div></ul>");
                    if (aQ) {
                        bG.append("</li></ul>");
                    }
                    if (aL && aV._ceshiDesc) {
                        bG.append("<div style='color:#666;'>答案解析：" + aV._ceshiDesc + "</div>");
                    }
                }
                if (P) {
                    bG.append("<div><ul>");
                    var aK;
                    aK = 100 / b0;
                    for (var a5 = 1; a5 < bv.length; a5++) {
                        var bD = "sortnum";
                        bG.append("<li style='float:none;margin-bottom:6px;padding:3px 0;'>");
                        bG.append("<div style='float:left;'><input type='checkbox' style='display:none;' /><span class='" + bD + "'></span></div>");
                        bG.append("<div style='float:left;text-align:left;width:660px;'>");
                        var aC = true;
                        if (bv[a5]._item_img) {
                            var bb = bv[a5]._item_img;
                            bG.append("<div style='text-align:left;'>");
                            bG.append("<img style='border:none;margin:0;' src='" + bb + "' alt='' />");
                            bG.append("</div>");
                            if (!bv[a5]._item_imgtext) {
                                aC = false;
                            }
                        }
                        if (aC) {
                            bG.append(trim(bv[a5]._item_title));
                        }
                        if (bv[a5]._item_tb) {
                            bG.append(" <input type='text' class='underline' style='color:#999999;' value=''/>");
                        }
                        if (bv[a5]._item_tbr) {
                            bG.append(" <span style='color: red;'> *</span>");
                        }
                        bG.append("</div>");
                        bG.append("<div style='clear:both;'></div>");
                        bG.append("</li>");
                    }
                    bG.append("</ul>");
                }
                if (e) {
                    var bU = aV._daoZhi;
                    var aP = "100%";
                    if (aV._mainWidth) {
                        aP = aV._mainWidth + "%";
                    }
                    bG.append("<table style='width:" + aP + ";' border='0px'  cellpadding='5' cellspacing='0'>");
                    var aZ = "";
                    var ay = "";
                    var bg = "radio";
                    var bZ = new Array();
                    bZ = trim(aV._rowtitle).split("\n");
                    var aY = trim(aV._rowtitle2).split("\n");
                    var a6 = trim(aV._rowtitle2) ? true : false;
                    if (this._referDivQ) {
                        bZ = new Array();
                        for (var bN = 1; bN < this._referDivQ.dataNode._select.length; bN++) {
                            bZ.push(this._referDivQ.dataNode._select[bN]._item_title);
                            if (bN == 3) {
                                break;
                            }
                        }
                        bZ.push("......");
                        a6 = false;
                    }
                    var bw = false;
                    var bA = "";
                    if ((a1 == 0) || (a1 > 100 && a1 < 200) || a1 > 300) {
                        bG.append("<thead><tr><th></th>");
                        if (a1 > 300) {
                            var bq = trim(aV._columntitle).split("\n");
                            for (var a5 = 0; a5 < bq.length; a5++) {
                                bG.append("<td align='center'>" + trim(bq[a5]) + "</td>");
                            }
                        } else {
                            if (bU) {
                                for (var a5 = 0; a5 < bZ.length; a5++) {
                                    if (bZ[a5].length > 4 && bZ[a5].substring(0, 4) == "【标签】") {
                                        continue;
                                    }
                                    bG.append("<td align='center'>" + trim(bZ[a5]) + "</td>");
                                }
                            } else {
                                var a9 = 100;
                                var bH = 12;
                                var bF = 1;
                                for (var a5 = 1; a5 < bv.length; a5++) {
                                    var bs = trim(bv[a5]._item_title).length;
                                    if (bs > bF) {
                                        bF = bs;
                                    }
                                }
                                if (bF == 2) {
                                    bH = 6;
                                } else {
                                    if (bF == 3) {
                                        bH = 8;
                                    } else {
                                        var a8 = 75 / (bv.length - 1);
                                        bH = 2.4 * bF;
                                        if (bH > a8) {
                                            bH = a8;
                                        }
                                    }
                                }
                                if (aV._rowwidth) {
                                    a9 -= parseInt(aV._rowwidth);
                                    bH = a9 / (bv.length - 1);
                                }
                                if (aY.length > 0 && aV._rowwidth2) {
                                    a9 -= parseInt(aV._rowwidth2);
                                    bH = a9 / (bv.length - 1);
                                }
                                for (var a5 = 1; a5 < bv.length; a5++) {
                                    bG.append("<td");
                                    if (bF > 1) {
                                        bG.append(" width='" + bH + "%'");
                                    }
                                    bG.append(" align='center'>" + trim(bv[a5]._item_title) + "</td>");
                                }
                            }
                        }
                        ay = "border-bottom:1px solid #efefef;";
                        aZ = "style='" + ay + "'";
                        bG.append("</tr>");
                        if (a1 == 101) {
                            bG.append("<tr><th style='color:#efa030;font-size:14px;' align='left'>分值</th>");
                            for (var a5 = 1; a5 < bv.length; a5++) {
                                var bY = trim(bv[a5]._item_value);
                                if (bY == -77777) {
                                    bY = "";
                                }
                                bG.append("<td align='center' style='color:#efa030;font-size:14px;'>" + bY + "</td>");
                            }
                            bG.append("</tr>");
                        }
                        bG.append("</thead>");
                        if (a1 == 102) {
                            bg = "checkbox";
                        }
                    }
                    if (a1 == 301) {
                        bg = "text";
                    }
                    bG.append("<tbody>");
                    if (a1 == "202") {
                        var bT = aV._minvalue;
                        var aG = aV._maxvalue;
                        var aD = " width='60%'";
                        var bi = "90";
                        bG.append("<tr><th></th><td align='left' width='410'><table width='100%'><tr><td " + aD + "><div style='width:" + bi + "%'><div style='float:left;color:red;'>" + bT + "</div><div style='float:right;color:red;'>" + aG + "</div><div style='clear:both;'></div></div></td></tr></table></td><th></th>");
                    }
                    var br = false;
                    if (a1 == 201 && aV._requir && aV._rowVerify) {
                        for (var a5 = 0; a5 < aV._rowVerify.length; a5++) {
                            if (aV._rowVerify[a5]._isRequir == false) {
                                br = true;
                                break;
                            }
                        }
                        aV._partRequir = br;
                        if (br) {
                            J.setreqstatus();
                        }
                    }
                    if (!bU) {
                        var bh = 0;
                        var bX = false;
                        var bC = "";
                        for (var a5 = 0; a5 < bZ.length; a5++) {
                            if (a5 == bZ.length - 1) {
                                aZ = "";
                                ay = "";
                            }
                            if (bZ[a5].length > 4 && bZ[a5].substring(0, 4) == "【标签】") {
                                var bj = bZ[a5].substring(4);
                                bG.append("<tr class='labelname'><th align='left'><b>" + bj + "</b></th><td colspan='" + bv.length + "'></td>");
                                bG + "</tr>";
                                bw = true;
                                bA = "padding-left:20px;";
                                bX = !bX;
                                continue;
                            }
                            if (aV._rowwidth == "") {
                                bG.append("<tr><th align='left' style='" + ay + bA + "'>" + bZ[a5] + "</th>");
                            } else {
                                bG.append("<tr><th align='left' style='width:" + aV._rowwidth + ";" + ay + bA + "'>" + bZ[a5] + "</th>");
                            }
                            if (a1 < 100 && a1) {
                                bG.append("<td>");
                                bG.append("<ul");
                                if (a1 == 6) {
                                    bG.append(" class='onscore'");
                                }
                                bG.append(">");
                            }
                            if (a1 > 200 && a1 < 300) {
                                if (a1 == 201) {
                                    var bf = aV._rowVerify && aV._rowVerify[bh] ? aV._rowVerify[bh]._verify : "";
                                    var bM = "";
                                    var a4 = "";
                                    var aN = aV._rowVerify && aV._rowVerify[bh] ? aV._rowVerify[bh]._width : "";
                                    if (aN) {
                                        aN = "width:" + aN + "%";
                                    }
                                    if (bf == "日期") {
                                        bM = "/images/form/date.png";
                                    } else {
                                        if (bf == "地图") {
                                            bM = "/images/form/map.png";
                                        } else {
                                            if (bf == "手机") {
                                                bM = "/images/form/mobile.png";
                                            } else {
                                                if (bf == "Email") {
                                                    bM = "/images/form/email.png";
                                                } else {
                                                    if (bf == "电话" || bf == "固话") {
                                                        bM = "/images/form/tel.png";
                                                    } else {
                                                        if (bf == "QQ") {
                                                            bM = "/images/form/qq.png";
                                                        } else {
                                                            if (bf == "姓名") {
                                                                bM = "/images/form/name.png";
                                                            } else {
                                                                if (bf == "网址") {
                                                                    bM = "/images/form/website.png";
                                                                } else {
                                                                    if (bf == "指定选项") {
                                                                        a4 = aV._rowVerify[bh]._choice;
                                                                    } else {
                                                                        if (bf == "高校") {
                                                                            bM = "/images/form/school.png";
                                                                        } else {
                                                                            if (bf == "城市单选" || bf == "城市多选" || bf == "省市区") {
                                                                                bM = "/images/form/city.png";
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    bG.append("<td  " + aZ + "align='left'>");
                                    bG.append("<div style='position:relative;'>");
                                    if (a4) {
                                        var aM = a4.split(/[,，]/);
                                        var bz = "<select style='border:1px solid #d5d5d5;vertical-align:middle;'><option value=''>请选择</option>";
                                        for (var aU = 0; aU < aM.length; aU++) {
                                            var ba = aM[aU];
                                            bz += "<option value='" + ba + "'>" + ba + "</option>";
                                        }
                                        bz += "</select>";
                                        bG.append(bz);
                                    } else {
                                        bG.append("<textarea class='inputtext' style='overflow:auto;height:22px;" + aN + "'></textarea>");
                                        if (bM) {
                                            bG.append("<img src='" + bM + "' alt='' style='position:absolute;top:3px;left:3px;'/>");
                                        }
                                    }
                                    var bR = true;
                                    if (aV._rowVerify && aV._rowVerify[bh] && aV._rowVerify[bh]._isRequir == false) {
                                        bR = false;
                                    }
                                    if (br && bR) {
                                        bG.append("<span class='req' style='left:auto;top:5px;'>&nbsp;*</span>");
                                    }
                                    bG.append("</div>");
                                    bG.append("</td>");
                                } else {
                                    if (a1 == 202) {
                                        var aD = " width='410'";
                                        var bi = "90";
                                        bG.append("<td  " + aZ + "align='left' " + aD + "><img src='/Images/WJX/JoinQuestionnaire/slider1.jpg' style='width: 10px;'/><img src='/Images/WJX/JoinQuestionnaire/sliderEnd.jpg' style='width:" + bi + "%;height: 23px;'/></td>");
                                    }
                                }
                            } else {
                                if (a1 > 300) {
                                    var bJ = "";
                                    if (a1 == "303") {
                                        bJ += "<select><option>" + type_radio_down + "</option>";
                                        for (var bl = 1; bl < bv.length; bl++) {
                                            bJ += "<option>" + trim(bv[bl]._item_title) + "</option>";
                                        }
                                        bJ += "</select>";
                                    }
                                    var bq = trim(aV._columntitle).split("\n");
                                    var bk = Number(300 / bq.length);
                                    for (var a3 = 0; a3 < bq.length; a3++) {
                                        var aw = "";
                                        if (a1 == "303") {
                                            bG.append("<td  " + aZ + "align='center'>" + bJ + "</td>");
                                        } else {
                                            if (a1 == "301") {
                                                bk = "30";
                                            }
                                            bG.append("<td  " + aZ + "align='center'>");
                                            var a4 = "";
                                            if (a1 == "302") {
                                                var bf = aV._rowVerify && aV._rowVerify[a3] ? aV._rowVerify[a3]._verify : "";
                                                if (bf == "指定选项") {
                                                    a4 = aV._rowVerify[a3]._choice;
                                                }
                                                if (a4) {
                                                    var aM = a4.split(/[,，]/);
                                                    var bz = "<select style='border:1px solid #d5d5d5;vertical-align:middle;'><option value=''>请选择</option>";
                                                    for (var aU = 0; aU < aM.length; aU++) {
                                                        var ba = aM[aU];
                                                        bz += "<option value='" + ba + "'>" + ba + "</option>";
                                                    }
                                                    bz += "</select>";
                                                    bG.append(bz);
                                                }
                                            }
                                            if (!a4) {
                                                if (aw) {
                                                    bG.append("<div style='position:relative;'>");
                                                }
                                                bG.append("<textarea class='inputtext' type='text' style='overflow:auto;height:22px;width:" + bk + "px;'></textarea>");
                                                if (aw) {
                                                    bG.append(aw);
                                                    bG.append("</div>");
                                                }
                                            }
                                            bG.append("</td>");
                                        }
                                    }
                                } else {
                                    for (var a3 = 1; a3 < bv.length; a3++) {
                                        if (a1 > 100 || a1 == 0) {
                                            var bS = "jqRadio";
                                            if (bg == "checkbox") {
                                                bS = "jqCheckbox";
                                            }
                                            bG.append("<td " + aZ + "align='center'");
                                            if ((a1 == 102 || a1 == 103 || a1 == 101) && bv[a3]._item_tb) {
                                                bG.append(" onmouseover=showFillData(this); onmouseout=' sb_setmenunav(toolTipLayer, false);' ");
                                            }
                                            bG.append(">");
                                            bG.append("<a href='###' class='" + bS + "' style='position:static;'></a><input style='display:none;' type='" + bg + "'/>");
                                            bG.append("</td>");
                                        } else {
                                            var bB = "style='padding-left:3px;'";
                                            var aI = bv.length - 1;
                                            var bQ = "off";
                                            var bL = "on";
                                            if (a1 == "6") {
                                                var bo = parseInt(355 / aI) - 2;
                                                if (a3 == bv.length - 1) {
                                                    bo += 355 % aI;
                                                }
                                                bB = "style='width:" + bo + "px' ";
                                                bQ = "off";
                                                bL = "on";
                                            }
                                            if (a3 == bv.length - 1) {
                                                bG.append("<li " + bB + " class='" + bQ + a1 + "'>");
                                            } else {
                                                bG.append("<li " + bB + " class='" + bL + aV._tag + "'>");
                                            }
                                            if (a1 == "6") {
                                                var bE = bv[a3]._item_value;
                                                if (bE == NoValueData) {
                                                    bE = "&nbsp;";
                                                }
                                                bG.append(bE);
                                            }
                                            bG.append("</li>");
                                        }
                                    }
                                }
                            }
                            if (a1 < 100 && a1) {
                                bG.append("</ul></td>");
                            }
                            var aT = "";
                            if (bh < aY.length) {
                                aT = aY[bh];
                            }
                            if (aV._rowwidth2 == "") {
                                bG.append("<th " + aZ + ">" + aT + "</th>");
                            } else {
                                bG.append("<th style='width:" + aV._rowwidth2 + ";" + ay + "'>" + aT + "</th>");
                            }
                            bG.append("</tr>");
                            bX = !bX;
                            bh++;
                        }
                    } else {
                        for (var a5 = 1; a5 < bv.length; a5++) {
                            if (a5 == bv.length - 1) {
                                aZ = "";
                                ay = "";
                            }
                            if (aV._rowwidth == "") {
                                bG.append("<tr><th align='left' style='" + ay + bA + "'>" + trim(bv[a5]._item_title) + "</th>");
                            } else {
                                bG.append("<tr><th align='left' style='width:" + aV._rowwidth + ";" + ay + bA + "'>" + trim(bv[a5]._item_title) + "</th>");
                            }
                            for (var a3 = 0; a3 < bZ.length; a3++) {
                                if (bZ[a3].length > 4 && bZ[a3].substring(0, 4) == "【标签】") {
                                    continue;
                                }
                                bG.append("<td  " + aZ + "align='center'><input  type='" + bg + "'/></td>");
                            }
                            bG.append("</tr>");
                        }
                    }
                    bG.append("</tbody></table>");
                }
            }
            bG.append("<div class='div_table_clear_bottom'></div>");
            z.innerHTML = bG.toString("");
        };
        J.createTableRadio(true);
    }
    if (ap || N) {
        var t = $ce("div", "", B);
        t.style.margin = "0 0 8px 24px";
    }
    if (ap) {
        var ac = $ce("span", "", t);
        J.set_jump_ins = function () {
            var au = "*" + jump_info;
            ac.style.display = this.dataNode._hasjump ? "" : "none";
            if (this.dataNode._hasjump) {
                if (this.dataNode._anytimejumpto < 1) {
                } else {
                    if (this.dataNode._anytimejumpto == "1") {
                        au += "<span style='color:#ff6600;'>(结束作答)</span>";
                    } else {
                        var av = this.dataNode._anytimejumpto;
                        if (WjxActivity._use_self_topic) {
                            var at = getjumpNode(this.dataNode._anytimejumpto);
                            if (at) {
                                var v = at._title.match(/^\s*\d+[、\.\-\_\(\/]?\d*\)?/);
                                if (v) {
                                    av = v;
                                }
                            }
                        }
                        au += "<span style='color:#ff6600;'>(跳转到第" + av + "题)</span>";
                    }
                }
            }
            ac.innerHTML = au + "&nbsp;&nbsp;&nbsp;&nbsp;";
            ac.onmouseover = function () {
                if (J.dataNode._anytimejumpto && J.dataNode._anytimejumpto - 1 > 0) {
                    var aw = getDataNodeByTopic(J.dataNode._anytimejumpto);
                    if (aw) {
                        html = "填写此题后无条件跳转到<span style='color:#0066ff;'>" + getDisplayTitle(aw) + "</span>";
                        toolTipLayerMenu.style.width = "330px";
                        toolTipLayerMenu.innerHTML = html;
                        sb_setmenunav(toolTipLayerMenu, true, this);
                    }
                }
            };
            ac.onmouseout = function () {
                sb_setmenunav(toolTipLayerMenu, false);
            };
        };
        J.set_jump_ins();
    }
    if (ap || N) {
        var c = $ce("span", "", t);
        J.getRelation = function () {
            var ay = this.dataNode._relation;
            if (!ay) {
                return;
            }
            var aA = "";
            if (ay.indexOf("|") != -1) {
                aA = "|";
            } else {
                aA = "$";
            }
            var av = ay.split(aA);
            var aw = "依赖于";
            var aD = "";
            var aE = "";
            for (var aG = 0; aG < av.length; aG++) {
                var aB = av[aG];
                if (!aB) {
                    continue;
                }
                var aH = aB.split(",");
                if (aH.length < 2) {
                    continue;
                }
                if (aw != "依赖于") {
                    aw += "，";
                }
                var aI = getDataNodeByTopic(aH[0]);
                if (!aI) {
                    continue;
                }
                if (WjxActivity._use_self_topic) {
                    var ax = aI._title.match(/^\s*\d+[、\.\-\_\(\/]?\d*\)?/);
                    if (!ax && aI._title.length > 3) {
                        ax = aI._title.substring(0, 3);
                    }
                    if (ax) {
                        aw += "第<b>" + ax + "</b>题的第" + aH[1].replace(/-/g, "").replace(/;/g, "、") + "个选项";
                    }
                } else {
                    aw += "第<b>" + aH[0] + "</b>题的第" + aH[1].replace(/-/g, "").replace(/;/g, "、") + "个选项";
                }
                var au = aH[1].split(";");
                var aC = "选择";
                var at = "";
                if (au.length > 1) {
                    at = "中的任何一个选项";
                }
                aD = "";
                for (var aF = 0; aF < au.length; aF++) {
                    var v = au[aF];
                    if (v - 0 < 0) {
                        v = v * -1;
                        aC = "没有选择";
                    }
                    if (aI._select && aI._select[v]) {
                        if (aD) {
                            aD += "、";
                        }
                        aD += "[" + aI._select[v]._item_title + "]";
                    } else {
                        return;
                    }
                }
                var aJ = aI._topic + ".";
                if (WjxActivity._use_self_topic) {
                    aJ = "";
                }
                if (aE != "") {
                    aE += aA == "|" ? "<b style='color:red;'>并且</b>" : "<b style='color:red;'>或者</b>";
                }
                aE += "当题目<span style='color:#0066ff;'>" + aJ + aI._title + "</span>" + aC + "<span style='color:#0066ff;font-size:12px;'>" + aD + "</span>" + at + "时，";
            }
            aE += "<b>此题才显示</b>";
            var az = new Array();
            az.push(aw);
            az.push(aE);
            return az;
        };

        function H() {
            var v = cur || curover;
            v.dataNode._relation = currentRelation || "";
            if (v.displayRelation) {
                v.displayRelation();
            }
            return false;
        }

        J.openRelationWindow = function () {
            var at = "/wjx/design/setrelation.aspx";
            var au = this.dataNode._topic;
            if (N) {
                au = "0";
            }
            if (au == "1" && !this.dataNode._relation) {
                show_status_tip("第1题不能设置关联逻辑", 5000);
                return false;
            }
            at += "?ct=" + au;
            var v = this.dataNode._relation;
            if (v) {
                at += "&rt=" + v;
            }
            currentRelation = v || "";
            PDF_launch(at, 580, 420, H);
            return false;
        };
        c.style.display = g._relation ? "" : "none";
        var ai = J.getRelation();
        if (ai) {
            c.innerHTML = ai[0];
            c.dtitle = ai[1];
            c.onmouseover = function () {
                toolTipLayerMenu.style.width = "350px";
                toolTipLayerMenu.innerHTML = this.dtitle;
                sb_setmenunav(toolTipLayerMenu, true, this);
            };
            c.onmouseout = function (v) {
                sb_setmenunav(toolTipLayerMenu, false, this);
            };
            t.style.marginBottom = "8px";
        }
        J.RelationIns = c;
    }
    var M = $ce("div", "", U);
    M.className = "oparea";
    M.onclick = function (v) {
        stopPropa(v);
    };
    var ae = $ce("div", "", M);
    ae.style.height = "18px";
    ae.className = "spanLeft";
    if (g._relation == "0") {
        J.style.display = "none";
    }
    var V = document.createElement("div");
    V.className = "div_ins_question spanLeft";
    V.innerHTML = "<a href='javascript:;' onclick='insertQ(curover);return false;' class='link-UF90' style='text-decoration:underline;'>在此题后插入新题</a>";
    V.style.clear = "none";
    V.style.visibility = "hidden";
    M.appendChild(V);
    J.divInsertOp = V;
    var an = document.createElement("div");
    an.className = "spanRight";
    an.style.clear = "none";
    M.appendChild(an);
    J.divTableOperation = an;
    if (g._hasjump || g._relation) {
        J.divTableOperation.style.visibility = "";
    }
    $ce("div", "", U).style.clear = "both";
    if (aa || N) {
        $ce("div", "", U).style.clear = "both";
    }
    cancelInputClick(J);
    return J;
}

function cancelInputClick(c) {
    var d = c.div_question_preview;
    var a = $$("input", d);
    for (var b = 0; b < a.length; b++) {
        a[b].onclick = function () {
            if (this.checked) {
                this.checked = false;
                return false;
            }
        };
        a[b].onkeydown = function () {
            this.value = "";
            return false;
        };
    }
}

function Calculatedscore() {
    if (newQType != 2) {
        return;
    }
    showtotalques.style.display = "";
    showtotalscore.style.display = "";
    var b = Calculated();
    var a = b.split(";");
    if (a.length < 2) {
        return;
    }
    if (a[1] == "null") {
        totalquestions.innerHTML = "<a title='您目前随机抽取的题目数量不一致，导致界面总分不一致，请检查' href='javascript:void(0);' onclick='alert(this.title);return false;' style='color:#fff;'><b>(?)</b></a>";
        showtotalscore.style.display = "none";
    } else {
        totalquestions.innerHTML = a[1];
    }
    if (a[0] == "null") {
        divscore.innerHTML = "<a title='您目前随机抽取的题目分数不一致，导致界面总分不一致，请检查' href='javascript:void(0);' onclick='alert(this.title);return false;' style='color:#fff;'><b>(?)</b></a>";
        showtotalques.style.display = "none";
    } else {
        divscore.innerHTML = a[0];
    }
}

function Calculated() {
    var s = 0;
    var Q = 0;
    if (WjxActivity._random_mode == "4" || WjxActivity._random_mode == "1") {
        var c = WjxActivity._partset;
        var E = c.split(",");
        var x = new Object();
        for (var M = 0; M < E.length; M++) {
            var O = E[M].split(";");
            var z = parseInt(O[1]) - parseInt(O[0]) + 1;
            var K = O[2] ? parseInt(O[2]) : z;
            var t = parseInt(O[0]);
            var h = parseInt(O[1]);
            var d = getDataNodeByTopic(t);
            var P = titilescore(d);
            if (K != z) {
                for (var L = t; L <= h; L++) {
                    x[L] = 1;
                    var B = getDataNodeByTopic(L);
                    if (P != titilescore(B)) {
                        s = "null";
                        return s + ";" + Q;
                    }
                }
                s = addscore(s, P * K);
                Q += K;
            } else {
                for (var L = t; L <= h; L++) {
                    x[L] = 1;
                    var B = getDataNodeByTopic(L);
                    s = addscore(s, titilescore(B));
                    Q++;
                }
            }
        }
        for (var M = 0; M < questionHolder.length; M++) {
            var I = questionHolder[M].dataNode;
            if (!I._isCeShi) {
                continue;
            }
            var y = parseInt(I._topic);
            if (x[y]) {
                continue;
            }
            s = addscore(s, titilescore(I));
            Q++;
        }
        return s + ";" + Q;
    } else {
        if (WjxActivity._random_mode == "2" && WjxActivity._random_begin && WjxActivity._random_end && WjxActivity._display_part_num) {
            var p = new Object();
            var q = 1;
            var C = parseInt(WjxActivity._random_begin);
            var F = parseInt(WjxActivity._random_end);
            var a = "";
            var G = 0;
            var b = 0;
            var x = new Object();
            for (var M = 0; M < questionHolder.length; M++) {
                var S = questionHolder[M].dataNode;
                if (S._type == "page" && q <= F) {
                    p[q] = a;
                    q++;
                    a = "";
                    continue;
                }
                if (!S._isCeShi) {
                    continue;
                }
                if (a == "") {
                    a = M.toString();
                } else {
                    a += ";" + M.toString();
                }
                if (M == questionHolder.length - 1) {
                    p[q] = a;
                }
            }
            for (var L = C; L <= F; L++) {
                var a = p[L];
                var e = a.split(";");
                var f = parseInt(e[0]);
                var l = parseInt(e[e.length - 1]);
                var r = 0;
                var A = 0;
                if (L == C) {
                    b = e.length;
                    for (var H = f; H <= l; H++) {
                        G += parseFloat(titilescore(questionHolder[H].dataNode));
                        x[questionHolder[H].dataNode._topic] = 1;
                    }
                } else {
                    if (e.length != b) {
                        Q = "null";
                        return s + ";" + Q;
                    }
                    for (var H = f; H <= l; H++) {
                        A += parseFloat(titilescore(questionHolder[H].dataNode));
                        x[questionHolder[H].dataNode._topic] = 1;
                    }
                    if (A != G) {
                        s = "null";
                        return s + ";" + Q;
                    }
                }
            }
            s += A * parseInt(WjxActivity._display_part_num);
            Q += b * parseInt(WjxActivity._display_part_num);
            for (var M = 0; M < questionHolder.length; M++) {
                var I = questionHolder[M].dataNode;
                if (!I._isCeShi) {
                    continue;
                }
                var y = parseInt(I._topic);
                if (x[y]) {
                    continue;
                }
                s = addscore(s, titilescore(I));
                Q++;
            }
            return s + ";" + Q;
        } else {
            if (WjxActivity._random_mode == "5" && WjxActivity._partsetnew) {
                var w = {};
                for (var M = 0; M < questionHolder.length; M++) {
                    var S = questionHolder[M].dataNode;
                    if (!S._isCeShi) {
                        continue;
                    }
                    var T = S._type;
                    if (!T) {
                        continue;
                    }
                    if (T == "page" || T == "cut") {
                        continue;
                    }
                    var D = getTypeName(S);
                    if (!D) {
                        continue;
                    }
                    var R = titilescore(S);
                    if (!w[D]) {
                        w[D] = R;
                    } else {
                        if (R == w[D]) {
                            continue;
                        } else {
                            s = "null";
                            return s + ";" + Q;
                        }
                    }
                }
                var g = WjxActivity._partsetnew;
                var o = g.split(",");
                var v = "";
                for (var J = 0; J < o.length; J++) {
                    var N = o[J].split(";");
                    var D = N[0];
                    var u = parseInt(N[1]);
                    if (u > 0) {
                        var n = w[D] || 0;
                        s = addscore(s, parseFloat(n) * parseFloat(u));
                        Q += u;
                    }
                }
                return s + ";" + Q;
            } else {
                for (var M = 0; M < questionHolder.length; M++) {
                    var I = questionHolder[M].dataNode;
                    if (I._isCeShi) {
                        s = addscore(s, titilescore(I));
                        Q++;
                    }
                }
                return s + ";" + Q;
            }
        }
    }
}

function titilescore(c) {
    if (c == null) {
        return 0;
    }
    if (c._type == "cut" || c._type == "page") {
        return 0;
    }
    if (c._type == "gapfill") {
        var b = c._rowVerify;
        var e = 0;
        if (b.length == 0) {
            e = 1;
        } else {
            for (var a = 0; a < b.length; a++) {
                var d = b[a]._ceshiValue || 1;
                e = addscore(e, d);
            }
        }
    } else {
        e = c._ceshiValue;
    }
    return e;
}

function addscore(b, a) {
    if (b != "null") {
        if (parseInt(a) == a) {
            b += parseInt(a);
        } else {
            b += parseFloat(a);
        }
    } else {
        b = "null";
    }
    return b;
}

var needCheckLeave = true;
window.onbeforeunload = function () {
    if (needCheckLeave) {
        return "系统可能不会保存您所做的更改。";
    }
};
window.onunload = function () {
    finishEditing();
};

function windowGotoUrl(a) {
    needCheckLeave = false;
    window.location.href = a;
}

function chkAutoSave_Click(a) {
}

function returnOld() {
    if (window.confirm("确认使用旧版编辑界面吗？")) {
        save_paper("old", true);
    }
}

var havereturn = false;
var timeoutTimer = null;
var errorTimes = 0;

function processError() {
    if (!havereturn) {
        havereturn = true;
        errorTimes++;
        var a = "网络异常，可能是您电脑上的防火墙拦截了保存的问卷数据，请关闭防火墙试试！";
        saveClient();
        show_status_tip(a, 0);
    }
    if (timeoutTimer) {
        clearTimeout(timeoutTimer);
    }
}

function saveClient() {
    try {
        if (window.localStorage && sendStr) {
            window.localStorage.setItem("lastsavedata" + activityID, sendStr);
        }
    } catch (a) {
    }
}

function removeClient() {
    try {
        if (window.localStorage) {
            window.localStorage.removeItem("lastsavedata" + activityID);
        }
    } catch (a) {
    }
}

var sendStr = "";
var hasLogicNotify = false;
var saveNotifyText = "";

function setUserPwdIndex(d, b, c, a) {
    userIndex = d;
    pwdIndex = b;
    deptIndex = c;
    extIndex = a;
}

function setUseChuange(a) {
    isChuangGuan = a;
}

function replaceTitleImg(c) {
    if (!hasErrorImg) {
        return c;
    }
    var b = "http://pubimageqiniu.paperol.cn";
    var a = "//pubnewfr.paperol.cn";
    c = c.replace(/\/\/pubalifr.sojump.com/g, a).replace(/\/\/pubali.sojump.com/g, a).replace(/\/\/pubssl.sojump.com/g, b).replace(/\/\/http:\/\/pubimage.sojump.com/g, b);
    return c;
}

function biaozhuDivQ(a) {
    a.style.border = "1px solid red";
    a.scrollIntoView(false);
}

function addNewPage(a) {
    if (curinsert) {
        lastAddNewQTime = new Date().getTime();
        createFreQ("page");
        if (a.parentNode) {
            a.parentNode.innerHTML = "添加成功，请重新勾选闯关模式！";
        }
        return false;
    }
}

function checkCanChuangGuan() {
    var a = false;
    for (var b = 0; b < questionHolder.length; b++) {
        var d = questionHolder[b].dataNode;
        var c = d._type;
        if (c == "cut") {
            continue;
        }
        if (c == "page") {
            if (a) {
                biaozhuDivQ(questionHolder[b]);
                return "提示：考试题后面不能再有分页栏，不能设置闯关模式";
            }
            continue;
        }
        if (d._isCeShi) {
            if (d._type != "radio") {
                biaozhuDivQ(questionHolder[b]);
                return "提示：题型只能为考试单选题或者考试判断题，不能设置闯关模式";
            }
            if (!a) {
                if (d._topic != "1") {
                    if (questionHolder[b - 1] && questionHolder[b - 1].dataNode._type != "page") {
                        curinsert = questionHolder[b - 1];
                        return "提示：第一个考试题前面必须有分页栏，不能设置闯关模式，<a href='javascript:' onclick='window.parent.addNewPage(this);'>添加分页栏</a>";
                    }
                }
            }
            a = true;
        } else {
            if (a) {
                biaozhuDivQ(questionHolder[b]);
                return "提示：非考试题型必须在考试题型的前面，不能设置闯关模式";
            }
        }
    }
}

function checkRandomType() {
    var d = "";
    var b = {};
    for (var c = 0; c < questionHolder.length; c++) {
        var e = questionHolder[c].dataNode;
        var a = getTypeName(e);
        if (d != a) {
            d = a;
            if (a != "") {
                if (!b[a]) {
                    b[a] = true;
                } else {
                    return false;
                }
            }
        }
    }
    return true;
}

function sortQuestionByType(d) {
    if (!confirm("提示：确认调整题型顺序吗？")) {
        return;
    }
    var m = new Array();
    var q = new Array();
    var o = {};
    for (var e = 0; e < questionHolder.length; e++) {
        if (getTypeName(questionHolder[e].dataNode)) {
            m.push(questionHolder[e]);
        }
    }
    var g = 1;
    var b = 0;
    var l = "";
    for (var e = 0; e < questionHolder.length; e++) {
        var n = getTypeName(questionHolder[e].dataNode);
        if (n != "") {
            if (!o[n]) {
                o[n] = 1;
                for (var c = 0; c < m.length; c++) {
                    var f = m[c].dataNode;
                    l = getTypeName(f);
                    if (l == n) {
                        q.splice(++b, 0, m[c]);
                    }
                }
            }
        } else {
            q.splice(++b, 0, questionHolder[e]);
        }
    }
    DataArray[0] = firstPage.dataNode;
    firstPage = null;
    totalHideQcount = 0;
    var p = 1;
    var a = 2;
    for (var e = 0; e < q.length; e++) {
        var h = q[e].dataNode;
        if (h._type != "page" && h._type != "cut") {
            h._topic = p;
            p++;
        } else {
            if (h._type == "page") {
                h._topic = a;
                a++;
            }
        }
        DataArray[e + 1] = h;
    }
    questions.innerHTML = "";
    set_dataNode_to_Design();
    initAttrHandler();
    initEventHandler();
    if (d) {
        d.parentNode.innerHTML = "提示：成功调整，请重新选择按题型随机！";
    }
}

function getTypeName(d) {
    if (!d._isCeShi) {
        return "";
    }
    var c = d._type;
    var e = d._answer;
    var b = d._ispanduan;
    var a = "";
    switch (c) {
        case"radio":
            if (b) {
                a = "判断题";
            } else {
                a = "单选题";
            }
            break;
        case"check":
            a = "多选题";
            break;
        case"question":
            if (e == "简答题无答案") {
                a = "简答题";
            } else {
                a = "单项填空题";
            }
            break;
        case"fileupload":
            a = "简答题";
            break;
        case"gapfill":
            a = "多项填空题";
            break;
        default:
            break;
    }
    return a;
}

function preivewMQ(e) {
    var a = save_paper("preview", true, true);
    if (a) {
        var f = getIEVersion();
        if (f && f <= 8) {
            var c = "/pq/" + activityID + ".aspx?wg=1&t=" + new Date().getTime();
            e.href = c;
            e.target = "_blank";
            return true;
        } else {
            document.body.style.overflow = "hidden";
            var b = (document.documentElement.clientWidth || document.body.clientWidth);
            var d = (document.documentElement.clientHeight || document.body.clientHeight);
            // PDF_launch("/wjx/design/previewmobile.aspx?activity=" + activityID, b, d, null, "full");
        }
    }
}

function save_paper(ad, y, q) {
    if (ad != "init" && questionHolder.length == 0) {
        show_status_tip("您还未添加题目！", 3000);
        return false;
    }
    if (newQType == 8 && (ad == "pub" || ad == "pub2")) {
        if (window.userIndex == 0) {
            show_status_tip("请设置用户名与密码字段！", 5000);
            PDF_launch("/wjx/design/setuseractivity.aspx?activity=" + activityID, 560, 320);
            return false;
        }
    }
    if (newQType == 2 && window.isChuangGuan && (ad == "pub" || ad == "pub2")) {
        var z = checkCanChuangGuan();
        if (z) {
            show_status_tip(z, 5000);
            PDF_launch("/wjx/design/settime.aspx?activity=" + activityID + "&ncg=1", 660, 350);
            return false;
        }
    }
    if (newQType == 2 && WjxActivity._random_mode == "5" && (ad == "pub" || ad == "pub2" || ad == "preview")) {
        if (!checkRandomType()) {
            show_status_tip("提示：您使用了按题型随机功能，各个题型必须连续在一起。请先调整题型顺序！", 5000);
            setTikuRandom();
            return false;
        }
    }
    show_status_tip("正在保存，请耐心等候...", 0);
    if (ad != "init" && !save_paper_validate(y)) {
        return false;
    }
    var ai = document.getElementById("paper_attr_title");
    var b = document.getElementById("paper_attr_desc");
    var v = new Array();
    v[0] = new Object();
    v[0]._title = ai.value;
    v[0]._tag = b.value;
    v[0]._display_part = false;
    v[0]._display_part_num = 0;
    v[0]._partset = "";
    v[0]._random_mode = WjxActivity._random_mode;
    if (v[0]._random_mode == "3") {
        v[0]._partset = WjxActivity._partset;
        var o = WjxActivity._partset.split(",");
        var ae = "";
        var u = true;
        for (var G = 0; G < o.length; G++) {
            var r = o[G].split(";");
            var D = parseInt(r[0]);
            var d = parseInt(r[1]);
            var af = getPageQCount()[D];
            var ac = af + ":" + d;
            if (!ae) {
                ae = ac;
            } else {
                if (ae != ac) {
                    u = false;
                }
            }
        }
        if (o.length < 2) {
            u = false;
        }
        if (u) {
            v[0]._partset += "|true";
        }
    } else {
        if (v[0]._random_mode == "4") {
            v[0]._partset = WjxActivity._partset;
        } else {
            if (v[0]._random_mode == "5") {
                v[0]._partset = WjxActivity._partsetnew;
            }
        }
    }
    v[0]._display_part = WjxActivity._display_part;
    v[0]._display_part_num = WjxActivity._display_part_num;
    v[0]._random_begin = WjxActivity._random_begin;
    v[0]._random_end = WjxActivity._random_end;
    v[1] = firstPage.dataNode;
    var e = false;
    var f = false;
    var k = false;
    var A = 1;
    var Y = 2;
    for (var G = 0; G < questionHolder.length; G++) {
        if (questionHolder[G].checkValid && questionHolder[G].checkValid() == false) {
            v[G + 2] = questionHolder[G].validate();
        }
        v[G + 2] = questionHolder[G].dataNode;
        var M = v[G + 2]._type;
        if (M == "page") {
            if (v[G + 2]._topic != Y) {
                v[G + 2]._topic = Y;
            }
            Y++;
        } else {
            if (M != "cut") {
                if (v[G + 2]._topic != A) {
                    v[G + 2]._topic = A;
                }
                A++;
            }
        }
        if (v[G + 2]._hasjump) {
            f = true;
        }
        var ap = v[G + 2]._relation;
        if (ap && ap != "0") {
            var H = ap.split(",");
            var x = true;
            k = true;
            var aw = H[0];
            var al = H[1].split(";");
            var at = getDataNodeByTopic(aw);
            var B = false;
            if (M == "cut" && at) {
                var O = getDivIndex(aw);
                if (O < G) {
                    B = true;
                }
            } else {
                B = at && v[G + 2]._topic - aw > 0;
            }
            if (B) {
                var a = at._select;
                var M = at._type;
                if (M == "radio" || M == "radio_down" || M == "check") {
                    for (var an = 0; an < al.length; an++) {
                        var n = al[an];
                        if (n == 0 || n >= a.length) {
                            x = false;
                        }
                    }
                } else {
                    x = false;
                }
            } else {
                x = false;
            }
            if (!x) {
                v[G + 2]._relation = "";
            }
        }
        v[G + 2]._referTopic = "";
        v[G + 2]._referedTopics = "";
        if (questionHolder[G]._referDivQ) {
            v[G + 2]._referTopic = questionHolder[G]._referDivQ.dataNode._topic;
            e = true;
        }
        if (questionHolder[G]._referedArray) {
            v[G + 2]._referedTopics = "";
            for (var ao = 0; ao < questionHolder[G]._referedArray.length; ao++) {
                if (ao > 0) {
                    v[G + 2]._referedTopics += ",";
                }
                v[G + 2]._referedTopics += questionHolder[G]._referedArray[ao].dataNode._topic;
            }
        }
    }
    saveNotifyText = "";
    if (v[0]._random_mode != "0") {
        var J = "";
        var S = false;
        if (f) {
            J = "跳题逻辑";
            S = true;
        } else {
            if (e) {
                J = "引用逻辑";
                S = true;
            } else {
                if (k) {
                    J = "关联逻辑";
                    S = true;
                }
            }
        }
        if (S) {
            var T = "此问卷包含" + J + "，设置随机逻辑可能会导致" + J + "失效，请注意检查！";
            if (!hasLogicNotify && ad != "init") {
                alert(T);
                hasLogicNotify = true;
            }
            saveNotifyText = T;
        }
    }
    var ag = 0;
    for (var G = 1; G < v.length; G++) {
        if (v[G]._type == "page") {
            ag++;
        }
    }
    v[0]._total_page = ag;
    var h = new StringBuilder();
    var aa = false;
    var R = false;
    var ak = false;
    var c = false;
    var l = false;
    var ar = v[0]._title + "§" + v[0]._tag + "§" + v[0]._random_begin + "§" + v[0]._random_end + "§" + v[0]._random_mode + "§" + WjxActivity._use_self_topic;
    if ((v[0]._random_mode == "1" || v[0]._random_mode == "2") && v[0]._display_part) {
        ar += "§" + v[0]._display_part + "§" + v[0]._display_part_num;
    } else {
        if (v[0]._random_mode == "3" || v[0]._random_mode == "4" || v[0]._random_mode == "5") {
            ar += "§" + v[0]._partset + "§";
        } else {
            ar += "§§";
        }
    }
    ar += "§" + designversion;
    var Q = 0;
    for (var G = 1; G < v.length; G++) {
        var g = "";
        var Z = v[G]._title.match(/\[q(\d+)\]/);
        if (Z && isInt(Z[1])) {
            g = "〒" + Z[1];
        }
        if (ad != "init") {
            v[G]._title = replaceTitleImg(v[G]._title);
        }
        switch (v[G]._type) {
            case"question":
                var ap = v[G]._relation || "";
                var t = v[G]._needOnly;
                if (v[G]._needsms) {
                    t += "〒" + v[G]._needsms;
                }
                h.append("¤" + v[G]._type + "§" + v[G]._topic + "§" + v[G]._title + "〒" + v[G]._keyword + "〒" + ap + g + "§" + v[G]._tag + "§" + v[G]._height + "§" + v[G]._maxword + "§" + v[G]._requir + "§" + v[G]._norepeat + "§" + v[G]._default + "§" + v[G]._ins + "§" + v[G]._hasjump + "§" + v[G]._anytimejumpto + "§" + v[G]._verify + "§" + t + "§" + v[G]._hasList + "§" + v[G]._listId + "§" + v[G]._width + "§" + v[G]._underline + "§" + v[G]._minword);
                if (v[G]._isCeShi) {
                    h.append("§" + v[G]._ceshiValue + "〒" + v[G]._answer + "〒" + v[G]._ceshiDesc + "〒" + v[G]._include);
                    c = true;
                } else {
                    if (v[G]._verify == "多级下拉") {
                        h.append("§" + (v[G]._levelData || ""));
                    }
                }
                Q++;
                break;
            case"gapfill":
                var ap = v[G]._relation || "";
                var s = getGapFillCount(v[G]._title);
                var C = v[G]._useTextBox ? "true" : "";
                h.append("¤" + v[G]._type + "§" + v[G]._topic + "§" + v[G]._title + "〒" + v[G]._keyword + "〒" + ap + g + "§" + v[G]._tag + "§" + v[G]._requir + "§" + s + "§" + v[G]._ins + "§" + v[G]._hasjump + "§" + v[G]._anytimejumpto);
                h.append("§");
                if (v[G]._rowVerify) {
                    for (var U = 0; U < s; U++) {
                        if (U > 0) {
                            h.append("〒");
                        }
                        if (!v[G]._rowVerify[U]) {
                            continue;
                        }
                        var F = v[G]._rowVerify[U];
                        h.append(F._verify || "");
                        if (F._verify == "指定选项") {
                            h.append("¦");
                            h.append(F._choice || "");
                            if (v[G]._requir && F._isRequir == false) {
                                h.append("¦");
                                h.append("false");
                            }
                        } else {
                            if (!v[G]._isCloze) {
                                h.append(",");
                                h.append(F._minword || "");
                                h.append(",");
                                h.append(F._maxword || "");
                            }
                        }
                        if (v[G]._isCeShi) {
                            var L = v[G]._isCloze ? "¦" : ",";
                            h.append(L);
                            h.append(F._ceshiValue || "1");
                            h.append(L);
                            var m = F._answer || "";
                            m = v[G]._isCloze ? m : m.replace(/,/g, "，");
                            h.append(m);
                            h.append(L);
                            var W = F._ceshiDesc || "";
                            W = v[G]._isCloze ? W : W.replace(/,/g, "，");
                            h.append(W);
                            if (!v[G]._isCloze) {
                                h.append(L);
                                h.append(F._include);
                            }
                        } else {
                            if (F._verify != "指定选项") {
                                h.append(",");
                                if (v[G]._requir && F._isRequir == false) {
                                    h.append("false");
                                }
                                h.append(",");
                                if (F._needOnly) {
                                    h.append("true");
                                }
                            }
                        }
                    }
                }
                h.append("§");
                h.append(C);
                if (v[G]._isCeShi) {
                    h.append("§1");
                    c = true;
                    if (v[G]._isCloze) {
                        h.append("§1");
                    }
                }
                Q++;
                break;
            case"slider":
                var ap = v[G]._relation || "";
                h.append("¤" + v[G]._type + "§" + v[G]._topic + "§" + v[G]._title + "〒" + v[G]._keyword + "〒" + ap + g + "§" + v[G]._tag + "§" + v[G]._requir + "§" + v[G]._minvalue + "§" + v[G]._maxvalue + "§" + v[G]._minvaluetext + "§" + v[G]._maxvaluetext + "§" + v[G]._ins + "§" + v[G]._hasjump + "§" + v[G]._anytimejumpto);
                Q++;
                break;
            case"fileupload":
                var ap = v[G]._relation || "";
                var aq = "";
                if (v[G]._isCeShi) {
                    aq = "§" + (v[G]._ceshiValue || 5) + "〒" + (v[G]._ceshiDesc || "");
                    c = true;
                }
                h.append("¤" + v[G]._type + "§" + v[G]._topic + "§" + v[G]._title + "〒" + v[G]._keyword + "〒" + ap + g + "§" + v[G]._tag + "§" + v[G]._requir + "§" + v[G]._width + "§" + v[G]._ext + "§" + v[G]._maxsize + "§" + v[G]._ins + "§" + v[G]._hasjump + "§" + v[G]._anytimejumpto + aq);
                Q++;
                break;
            case"sum":
                var ap = v[G]._relation || "";
                var ax = v[G]._rowtitle || "外观\n性能";
                h.append("¤" + v[G]._type + "§" + v[G]._topic + "§" + v[G]._title + "〒" + v[G]._keyword + "〒" + ap + g + "§" + v[G]._tag + "§" + v[G]._requir + "§" + v[G]._total + "§" + ax + "§" + v[G]._rowwidth + "§0§" + v[G]._ins + "§" + v[G]._hasjump + "§" + v[G]._anytimejumpto);
                h.append("§" + v[G]._referTopic + "§" + v[G]._referedTopics);
                Q++;
                break;
            case"cut":
                var ap = v[G]._relation || "";
                h.append("¤" + v[G]._type + "§" + v[G]._title + "§" + (v[G]._video || "") + "§" + ap + g);
                break;
            case"page":
                h.append("¤" + v[G]._type + "§" + v[G]._topic + "§" + v[G]._title + "§" + v[G]._tag);
                var P = v[G]._iszhenbie ? "true" : "";
                P = v[G]._istimer ? "time" : P;
                h.append("§" + P);
                h.append("§" + v[G]._mintime);
                if (v[G]._mintime) {
                    aa = true;
                }
                h.append("§" + v[G]._maxtime);
                if (v[G]._maxtime) {
                    R = true;
                }
                break;
            case"check":
            case"radio_down":
            case"radio":
            case"matrix":
                var ap = v[G]._relation || "";
                v[G]._tag = isNaN(v[G]._tag) ? 0 : v[G]._tag;
                var V = v[G]._mainWidth || "";
                h.append("¤" + v[G]._type + "§" + v[G]._topic + "§" + v[G]._title + "〒" + v[G]._keyword + "〒" + ap + "〒" + V + g + "§" + v[G]._tag + "§");
                if (v[G]._type == "matrix") {
                    if (v[G]._referTopic) {
                        v[G]._rowtitle2 = "";
                    }
                    var ax = v[G]._rowtitle || "外观\n性能";
                    h.append(ax + "〒" + v[G]._rowtitle2 + "〒" + v[G]._columntitle);
                } else {
                    h.append(v[G]._numperrow + "〒" + v[G]._randomChoice);
                }
                h.append("§" + v[G]._hasvalue + "§" + v[G]._hasjump + "§" + v[G]._anytimejumpto + "§" + v[G]._requir);
                if (v[G]._type == "check" || (v[G]._type == "matrix" && v[G]._tag == "102")) {
                    if (v[G]._isShop) {
                        h.append(",shop");
                        l = true;
                    } else {
                        h.append("," + v[G]._lowLimit + "," + v[G]._upLimit);
                    }
                } else {
                    if (v[G]._type == "radio" && v[G]._isQingJing) {
                        h.append(",1");
                    } else {
                        if (v[G]._type == "radio" && v[G]._ispanduan && v[G]._select.length == 3) {
                            h.append(",2");
                        }
                    }
                }
                if (v[G]._type == "matrix") {
                    var ah = v[G]._rowwidth;
                    if (v[G]._randomRow) {
                        ah += ",true";
                    }
                    h.append("§" + ah + "〒" + v[G]._rowwidth2);
                    if (v[G]._tag == "202" || v[G]._tag == "301") {
                        h.append("〒" + v[G]._minvalue + "〒" + v[G]._maxvalue);
                        if (v[G]._tag == "301" && v[G]._digitType == 1) {
                            h.append(",1");
                        }
                    } else {
                        if (v[G]._tag == "102" || v[G]._tag == "103") {
                            var av = v[G]._daoZhi || "";
                            h.append("〒" + av);
                        } else {
                            if (v[G]._tag == "201" || v[G]._tag == "302") {
                                if (v[G]._rowVerify) {
                                    h.append("〒");
                                    var az = trim(v[G]._rowtitle).split("\n");
                                    if (v[G]._tag == "302") {
                                        az = trim(v[G]._columntitle).split("\n");
                                    }
                                    var w = 0;
                                    for (var U = 0; U < az.length; U++) {
                                        if (v[G]._tag == "201" && az[U].substring(0, 4) == "【标签】") {
                                            continue;
                                        }
                                        if (v[G]._rowVerify[w]) {
                                            var F = v[G]._rowVerify[w];
                                            if (F._verify == "指定选项") {
                                                h.append(w + "¦");
                                                h.append(F._verify + "¦");
                                                h.append(F._choice || "");
                                                if (v[G]._requir && F._isRequir == false) {
                                                    h.append("¦");
                                                    h.append("false");
                                                }
                                            } else {
                                                h.append(w + ",");
                                                h.append(F._verify || "");
                                                h.append(",");
                                                h.append(F._minword || "");
                                                h.append(",");
                                                h.append(F._maxword || "");
                                                h.append(",");
                                                h.append(F._width || "");
                                                h.append(",");
                                                if (v[G]._requir && F._isRequir == false) {
                                                    h.append("false");
                                                }
                                                h.append(",");
                                                if (F._needOnly) {
                                                    h.append("true");
                                                }
                                            }
                                            h.append(";");
                                        }
                                        w++;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (v[G]._isTouPiao) {
                        var p = v[G]._displayDescTxt || "";
                        h.append("§" + v[G]._isTouPiao + "〒" + v[G]._touPiaoWidth + "〒" + v[G]._displayDesc + "〒" + v[G]._displayNum + "〒" + v[G]._displayPercent + "〒" + v[G]._displayThumb + "〒" + p);
                        ak = true;
                    } else {
                        if (v[G]._isCeShi) {
                            h.append("§ceshi〒" + v[G]._ceshiValue + "〒" + replaceTitleImg(v[G]._ceshiDesc));
                            c = true;
                        } else {
                            if (v[G]._isCePing) {
                                h.append("§ceping");
                            } else {
                                if (v[G]._displayDesc) {
                                    var p = v[G]._displayDescTxt || "";
                                    h.append("§desc〒" + p);
                                } else {
                                    h.append("§");
                                }
                            }
                        }
                    }
                }
                var X = v[G]._verify;
                if (v[G]._type == "matrix" && v[G]._nocolumn) {
                    X += ",true";
                }
                h.append("§" + v[G]._ins + "§" + X);
                h.append("§" + v[G]._referTopic + "§" + v[G]._referedTopics);
                for (var E = 1; E < v[G]._select.length; E++) {
                    var N = "";
                    if (v[G]._select[E]._item_huchi) {
                        N = "〒true";
                    }
                    var ay = v[G]._select[E]._item_value;
                    if (v[G]._select[E]._item_value == "") {
                        ay = NoValueData;
                    }
                    if (ad != "init") {
                        v[G]._select[E]._item_img = replaceTitleImg(v[G]._select[E]._item_img);
                    }
                    if (ad != "init") {
                        v[G]._select[E]._item_desc = replaceTitleImg(v[G]._select[E]._item_desc);
                    }
                    var ab = v[G]._select[E]._item_img;
                    if (v[G]._type == "matrix") {
                        ab = v[G]._select[E]._item_max;
                    }
                    h.append("§" + v[G]._select[E]._item_title + "〒" + v[G]._select[E]._item_radio + "〒" + ay + "〒" + v[G]._select[E]._item_jump + "〒" + v[G]._select[E]._item_tb + "〒" + v[G]._select[E]._item_tbr + "〒" + ab + "〒" + v[G]._select[E]._item_imgtext + "〒" + v[G]._select[E]._item_desc + "〒" + v[G]._select[E]._item_label + N);
                }
                Q++;
                break;
        }
    }
    if (ad != "init") {
        hasErrorImg = false;
    }
    clearInterval(interval_time);
    var aj = getXmlHttp();
    q = q || false;
    var K = "curID=" + activityID;
    if (window.isTiKu) {
        K = "tid=" + tikuId;
    }
    var au = "/Handler/designQHandler.ashx?submitType=redesign&" + K + "&userguid=" + userGuid + "&validate_text=ys&t=" + (new Date()).valueOf() + "&sstate=" + encodeURIComponent(ad);
    au += "&totalq=" + Q;
    au += "&initqc=" + initQCount;
    au += "&eod=" + editOldQ;
    if (ad == "pub") {
        au += "&pub=1";
    }
    if (ad == "pub2") {
        au += "&pub=2";
    }
    if (q) {
        aj.open("post", au, false);
    } else {
        aj.open("post", au);
    }
    aj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    if (!q) {
        aj.onreadystatechange = function () {
            if (aj.readyState == 4) {
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                }
                if (aj.status == 200) {
                    afterSave(unescape(aj.responseText), ad);
                } else {
                    clearInterval(interval_time);
                    show_status_tip("很抱歉，由于网络异常您的保存没有成功，请再试一次！", 6000);
                    interval_time = setInterval(autoSave, 90 * 1000);
                    saveClient();
                }
            }
        };
    }
    ar += "§" + e + "§" + aa + "§" + R + "§" + ak + "§" + c + "§" + l;
    sendStr = ar + h.toString("");
    if (window.filterKeyword && filterKeyword.indexOf("|") > -1) {
        var I = new RegExp("(" + filterKeyword + ")", "ig");
        sendStr = sendStr.replace(I, "**");
    }
    h.clear();
    if (ad == "init") {
        prevSaveData = sendStr;
        show_status_tip("成功加载", 1000);
        divSurvey.scrollTop = 0;
        return true;
    }
    havereturn = false;
    if (sendStr == prevSaveData && ad != "pub2") {
        saveSuc(ad);
    } else {
        if (!q) {
            timeoutTimer = setTimeout(function () {
                processError();
            }, 20000);
            if (errorTimes == 0) {
                aj.send("surveydata=" + encodeURIComponent(sendStr));
            } else {
                postWithIframe(au);
            }
        }
        if (q) {
            aj.send("surveydata=" + encodeURIComponent(sendStr));
            var am = afterSave(unescape(aj.responseText), ad);
            if (am == false) {
                return false;
            }
        }
    }
    return true;
}

function postWithIframe(b) {
    var a = document.createElement("div");
    a.style.display = "none";
    a.innerHTML = "<iframe id='mainframe' name='mainframe' style='display:none;' > </iframe><form target='mainframe' id='frameform' action='' method='post' enctype='application/x-www-form-urlencoded'><input  value='' id='surveydata' name='surveydata' type='hidden'><input type='submit' value='提交' ></form>";
    document.body.appendChild(a);
    $("surveydata").value = sendStr;
    var c = $("frameform");
    c.action = b + "&iframe=1";
    c.submit();
}

function tiyanReg(a) {
    show_status_tip("保存问卷成功，请注册或者登录以便管理此问卷！", 5000);
    needCheckLeave = false;
    PDF_launch("/register/registers.aspx", 640, 640, function () {
        var b = true;
        if (isTiyan) {
            if (window.confirm("如果您不注册或者登录，您将无法再管理此问卷。\r\n点击“确定”返回继续操作，点击“取消”离开编辑问卷界面")) {
                b = false;
            }
        }
        if (b) {
            goBack();
        }
    }, "注册问卷星");
}

function finishEditing(c) {
    var a = getXmlHttp();
    var d = "curID=" + activityID;
    if (window.isTiKu) {
        d = "tid=" + tikuId;
    }
    var b = "/Handler/designqfinish.ashx?" + d;
    a.open("post", b, false);
    a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    a.send("edit=true");
    if (c) {
        c();
    }
}

function afterSave(f, e) {
    havereturn = true;
    var b = false;
    if (f == "error") {
        windowGotoUrl("/Error/Error.aspx?source=designQHandler");
    } else {
        if (f == "timeout") {
            show_status_tip("您的登录信息超时，请重新登录，谢谢！", 10000);
            PDF_launch("/loginsmall.aspx?err=1", 480, 522, null, "登录问卷星");
        } else {
            if (f == "timeout2") {
                show_status_tip("提示：您登录的用户名与问卷的实际发布者不一致，请确认并重新登录，谢谢！", 10000);
                PDF_launch("/loginsmall.aspx?err=2", 480, 522, "登录问卷星");
            } else {
                if (f == "badcontent") {
                    alert("很抱歉，问卷内容未通过审核，可能是因为您的问卷包含不当信息。\r\n如果您确认您的问卷内容没有任何问题，请与我们电话联系！");
                    window.location = "/html/contactus.aspx";
                } else {
                    if (f == "large") {
                        saveClient();
                        var d = "您的问卷包含的数据过多，请适当精简，谢谢！";
                        alert(d);
                        show_status_tip(d, 3000);
                    } else {
                        if (f == "large1") {
                            saveClient();
                            d = "您的问卷名称超过100个字符，无法保存！";
                            alert(d);
                            show_status_tip(d, 3000);
                        } else {
                            if (f == "large2") {
                                saveClient();
                                var d = "您的问卷说明超过10000个字符，无法保存！";
                                alert(d);
                                show_status_tip(d, 3000);
                            } else {
                                if (f == "empty") {
                                    errorTimes = 1;
                                    saveClient();
                                    alert("您提交到服务器的内容为空，可能是因为防火墙拦截的原因。请重新再试一次，如果还是有错误，请更换浏览器或者联系我们，谢谢！");
                                } else {
                                    clearInterval(interval_time);
                                    var a = f.split("&");
                                    var c = a[0];
                                    switch (c) {
                                        case"true":
                                            if (sendStr) {
                                                prevSaveData = sendStr;
                                            }
                                            removeClient();
                                            saveSuc(e);
                                            b = true;
                                            break;
                                        case"false":
                                            alert("您输入的验证码有误，请重新输入！");
                                            break;
                                        case"version":
                                            alert("很抱歉，由于问卷星系统版本升级，您本次操作未能成功执行，请您刷新页面或者重启浏览器后再次尝试！\n请注意：页面上的信息可能没有保存，请您先保存重要的数据后再刷新或重启浏览器！");
                                            break;
                                        case"mode":
                                            var d = "很抱歉，此问卷已有答卷，必须使用合并答卷模式编辑，请退出此页面重新进行编辑！";
                                            alert(d);
                                            show_status_tip(d);
                                            break;
                                        case"partdata":
                                            alert("很抱歉，您上传到服务器的数据不完整，请点击“预览问卷”重新保存，并检查保存的问卷是否正确！");
                                            show_status_tip("您的问卷总题目数为：" + a[1] + "，保存到服务器的题目数为" + a[2] + "题，请点击“预览问卷”重新保存！");
                                            prevSaveData = "";
                                            break;
                                        default:
                                            saveClient();
                                            errorTimes++;
                                            alert("服务器返回错误，请刷新页面或者重新再试一次！如果还是有错误，请单击返回“我的问卷”选择放弃更改并返回。返回码：" + f);
                                            break;
                                    }
                                }
                            }
                        }
                    }
                    interval_time = setInterval(autoSave, 60 * 1000);
                }
            }
        }
    }
    return b;
}

function goBack() {
    var a = "/wjx/design/designstart.aspx?activity=" + activityID;
    if (window.isTiKu) {
        a = "/wjx/manage/finishtiku.aspx?tid=" + tikuId;
    }
    windowGotoUrl(a);
}

function saveSuc(a) {
    show_status_tip("保存问卷成功！" + saveNotifyText, 3000);
    if (a == "pub" || a == "pub2") {
        if (isTiyan) {
            tiyanReg(true);
        } else {
            if (a == "pub") {
                goBack();
            } else {
                if (newQType == 5) {
                    windowGotoUrl("/newwjx/design/cepingmember.aspx?activity=" + activityID + "&send=1");
                } else {
                    if (newQType == 8) {
                        windowGotoUrl("/wjx/design/usersystem/myusersystem.aspx");
                    } else {
                        windowGotoUrl("/wjx/design/designstart.aspx?activity=" + activityID + "&action=1");
                    }
                }
            }
        }
    } else {
        if (a == "old") {
            windowGotoUrl("design.aspx?openType=redesign&curid=" + activityID);
        } else {
            if (a == "upgrade") {
                windowGotoUrl("/register/usertype.aspx");
            } else {
                if (a == "preview") {
                }
            }
        }
    }
}

function doSaveValidate(a) {
    if (!a.createAttr) {
        return;
    }
    if (!a.hasCreatedAttr) {
        a.createOp();
        a.createAttr();
        a.setDataNodeToDesign();
        a.tabAttr.style.display = "none";
    }
    a.validate();
}

function isJumpToValid(b, a) {
    if (b != "" && b != 0 && b != 1 && b != -1) {
        if (toInt(b) <= a.dataNode._topic || toInt(b) > total_question) {
            return false;
        }
    }
    return true;
}

function elagerImg(b, d) {
    b = b || window.event;
    if (b.stopPropagation) {
        b.stopPropagation();
    }
    var c = d.parentNode.getAttribute("pimg");
    if (!c) {
        c = d.parentNode.getElementsByTagName("img")[0].src;
    }
    if (!c) {
        return;
    }
    var a = document.createElement("img");
    a.onload = function () {
        var f = document.getElementById("divImgPop");
        if (!f) {
            f = document.createElement("div");
            f.id = "divImgPop";
            document.body.appendChild(f);
        }
        f.style.overflow = "auto";
        var k = this.width;
        var i = this.height;
        var h = (document.documentElement.clientWidth || document.body.clientWidth) - 60;
        var j = (document.documentElement.clientHeight || document.body.clientHeight) - 40;
        var g, e;
        var l = 0.9;
        if (i > j * l) {
            e = j * l;
            g = g + 17;
            if (g > h * l) {
                g = h * l + 17;
            }
        } else {
            if (k > h * l) {
                g = h * l;
                e = g / k * i;
            } else {
                g = k;
                e = i;
            }
        }
        f.innerHTML = "<img src=" + c + " alt=''/>";
        PDF_launch("divImgPop", g + 20, e + 20);
    };
    a.src = c;
}

function save_paper_validate(b) {
    var f = document.getElementById("paper_attr_title");
    if (trim(f.value) == "") {
        alert("请填写问卷标题");
        show("tab3_div");
        f.value = "请输入您的问卷的标题";
        f.select();
        return false;
    }
    var w = true;
    var l;
    for (var r = 0; r < questionHolder.length; r++) {
        var o = questionHolder[r];
        if (o.checkValid && o.checkValid() == false) {
            doSaveValidate(o);
            if (questionHolder[r].checkValid() == false) {
                w = false;
                if (!l) {
                    l = questionHolder[r];
                }
            }
        } else {
            if (o.dataNode._hasjump) {
                if (!o.dataNode._anytimejumpto || o.dataNode._anytimejumpto == "0") {
                    var n = o.dataNode._select;
                    if (!n) {
                        continue;
                    }
                    var a = n.length;
                    for (var q = 1; q < a; q++) {
                        var m = trim(n[q]._item_jump);
                        if (!isJumpToValid(m, o)) {
                            doSaveValidate(o);
                            w = false;
                            if (!l) {
                                l = questionHolder[r];
                            }
                            break;
                        }
                    }
                } else {
                    var m = o.dataNode._anytimejumpto;
                    if (!isJumpToValid(m, o)) {
                        doSaveValidate(o);
                        w = false;
                        if (!l) {
                            l = questionHolder[r];
                        }
                    }
                }
            } else {
                if (o.dataNode._isCeShi) {
                    var n = o.dataNode._select;
                    if (!n) {
                        continue;
                    }
                    var a = n.length;
                    var c = false;
                    for (var q = 1; q < a; q++) {
                        if (n[q]._item_radio) {
                            c = true;
                        }
                    }
                    if (!c) {
                        doSaveValidate(o);
                        w = false;
                        if (!l) {
                            l = questionHolder[r];
                        }
                    }
                }
            }
        }
        var g = o.dataNode;
        if (g._relation) {
            var h = "";
            if (g._relation.indexOf("|") != -1) {
                h = "|";
            } else {
                h = "$";
            }
            var v = g._relation.split(h);
            var u = "";
            for (var q = 0; q < v.length; q++) {
                var s = v[q].split(",");
                var p = parseInt(s[0]);
                if (p - g._topic >= 0) {
                    if (o.className.indexOf("div_question_error") == -1) {
                        o.className += " div_question_error";
                    }
                    g._relation = "";
                    show_status_tip("提示：关联逻辑必须设置为依赖于本题之前的题目，此题关联逻辑已被清除！", 6000);
                    return false;
                }
            }
        }
        if (g._hasjump) {
            if (g._anytimejumpto && g._anytimejumpto - 1 > 0 && g._anytimejumpto - g._topic <= 0) {
                if (o.className.indexOf("div_question_error") == -1) {
                    o.className += " div_question_error";
                }
                g._anytimejumpto = "";
                g._hasjump = false;
                show_status_tip("提示：跳题逻辑必须设置为跳到本题后面的题目，此题跳题逻辑已被清除！", 6000);
                return false;
            } else {
                if (g._select) {
                    var e = false;
                    for (var k = 1; k < g._select.length; k++) {
                        var d = g._select[k]._item_jump;
                        if (d && d - 1 > 0 && d - g._topic <= 0) {
                            g._select[k]._item_jump = "0";
                            if (o.className.indexOf("div_question_error") == -1) {
                                o.className += " div_question_error";
                            }
                            e = true;
                        }
                    }
                    if (e) {
                        var t = false;
                        for (var k = 1; k < g._select.length; k++) {
                            var d = g._select[k]._item_jump;
                            if (d && d != "0") {
                                t = true;
                            }
                        }
                        if (!t) {
                            g._hasjump = false;
                        }
                        show_status_tip("提示：跳题逻辑必须设置为跳到本题后面的题目，此选项跳题逻辑已被清除！", 6000);
                        return false;
                    }
                }
            }
        }
    }
    if (!w) {
        if (b) {
            if (!l.isEditing) {
                qonclick.call(l);
            }
            l.scrollIntoView(false);
            show_status_tip("此题没有通过验证，保存失败！请按错误提示信息修改。", 6000);
        } else {
            show_status_tip("第" + l.dataNode._topic + "题没有通过验证，自动保存失败！请按错误提示信息修改。", 6000);
        }
        return false;
    }
    w = true;
    l = null;
    return true;
}

var htOnlyOjb = new Object();

function checkAnswerTextOnlyOne(e, c, d) {
    if (htOnlyOjb[e]) {
        d();
        alert("很抱歉，此题要求每个用户输入的答案都唯一，但答卷存在相同的答案！");
        return;
    }
    var a = getXmlHttp();
    var b = "/Handler/CheckOnlyAnswerText.ashx?activityID=" + activityID + "&q=" + e;
    a.open("get", b);
    a.send(null);
    a.onreadystatechange = function () {
        if (a.readyState == 4) {
            if (a.status == 200) {
                if (a.responseText === "true") {
                    c();
                } else {
                    d();
                    htOnlyOjb[e] = "1";
                    alert("很抱歉，此题要求每个用户输入的答案都唯一，但答卷存在相同的答案！");
                }
            } else {
                d();
            }
        }
    };
}