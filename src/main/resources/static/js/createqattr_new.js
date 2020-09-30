function setListId(a, b) {
    PDF_close(a);
}

var pre_satisfaction = "很不满意\n不满意\n一般\n满意\n很满意";
var pre_agree = "很不同意\n不同意\n一般\n同意\n很同意";
var pre_import = "很不重要\n不重要\n一般\n重要\n很重要";
var pre_accord = "很不符合\n不符合\n一般\n符合\n很符合";
var pre_wanting = "很不愿意\n不愿意\n一般\n愿意\n很愿意";
var pre_bool_1 = "是\n否";
var pre_bool_2 = "对\n错";
var pre_bool_3 = "满意\n不满意";
var pre_bool_4 = "同意\n不同意";
var pre_bool_5 = "正确\n错误";
var pre_bool_6 = "支持\n反对";
var pre_bool_7 = "Ture\nFalse";
var pre_bool_8 = "Yes\nNo";
var currentRelation = "";
var itemImage = "";

function setFloat(a) {
    a.className = "spanLeft";
}

function getEditorIndex() {
    return EditorIndex++;
}

function getVerifyHtml(f) {
    var b = "<select onchange='cur.setVerify(this);'>";
    var e = ["0,属性验证", ",不验证", "数字,整数", "小数", "日期", "手机", "指定选项", "固话", "电话,手机或固话", "Email,邮件", "密码", "城市单选,省份城市", "省市区", "高校", "地图", "网址", "身份证号", "学号", "QQ", "汉字", "姓名,中文姓名", "英文"];
    for (var d = 0; d < e.length; d++) {
        var g = e[d];
        var h = g.split(",");
        var a = h[0];
        var c = h.length == 2 ? h[1] : h[0];
        if (g == "指定选项" && f == 0) {
            continue;
        }
        b += "<option value='" + a + "'>" + c + "</option>";
    }
    b += "</select>";
    return b;
}

function checkVerifyMinMax(d, a, e) {
    var b = d.value;
    var c = a.value;
    if (b && !isInt(b)) {
        return "您输入的数据不正确";
    }
    if (c && !isInt(b)) {
        return "您输入的数据不正确";
    }
    if (b && c && b - c > 0) {
        return "您输入的数据不正确";
    }
    if (e == "数字" || e == "小数") {
        return "";
    }
    if (b && b - 3000 > 0) {
        return "字数不能超过3000";
    }
    if (c && c - 3000 > 0) {
        return "字数不能超过3000";
    }
    return "";
}

function changeHeight(d) {
    var e = parseInt(d.style.height);
    if (!e) {
        return;
    }
    if (d.value.length < 70) {
        return;
    }
    if (!d.initHeight) {
        d.initHeight = e;
    }
    var c = 18;
    var b = 100;
    var a = d.scrollHeight;
    a = a > c ? a : c;
    a = a > b ? b : a;
    if (a - e >= 10) {
        d.style.height = a + "px";
    }
    if (!d.value || d.value.length < 5) {
        d.style.height = d.initHeight + "px";
    }
}

function createAttr() {
    var an = new Date().getTime();
    var dQ;
    var D = document.createElement("div");
    this.appendChild(D);
    var aI = document.createDocumentFragment();
    this.tabAttr = D;
    var cq = this;
    var o = this.dataNode;
    var cn = o._type;
    var cM = this.dataNode._tag || 0;
    var cx = cn == "question";
    var b3 = cn == "slider";
    var w = cn == "sum";
    var bj = cn == "page";
    var H = cn == "cut";
    var be = cn == "check";
    var aM = cn == "radio";
    var aY = aM && cM;
    var cK = cn == "radio_down";
    var ax = cn == "matrix";
    var bQ = cn == "matrix" && cM > 300;
    var dR = cn == "fileupload";
    var dJ = cn == "gapfill";
    var dE = be && cM;
    var dH = aM || cK || be || ax;
    var d3 = !H && !bj;
    var dl = o._verify || "0";
    var a1 = dl != "0";
    var bu = o._isTouPiao;
    var bH = o._isCeShi;
    var P = o._isQingJing;
    var r = bH && o._ispanduan;
    var cI = o._isShop;
    var d2 = o._isCePing;
    var aD = ax && cM < 102;
    var af = this.get_div_title();
    var dz = "";
    var cO = new Array();
    this.option_radio = cO;
    var aE = document.createElement("div");
    var bq = getIEVersion();
    if (bq && bq == "7") {
        aE.style.overflow = "hidden";
    }
    this.attrMain = aE;
    aE.className = "div_title_attr_question";
    var d6 = $ce("div", "", aE);
    d6.className = "div_title_attr_question_triangle";
    if (bH && !dJ) {
        this.addCeShiSetting = function (eg) {
            var ea = $ce("div", "", eg);
            ea.style.marginTop = "15px";
            if (cq.dataNode._type == "question") {
                ea.style.marginBottom = "10px";
            }
            var ed = $ce("span", "<b>题目分数：</b>", ea);
            var ec = "<select onchange='cur.setTValue(this.value);'>";
            var ef = cq.dataNode._answer == "简答题无答案" || cq.dataNode._type == "fileupload";
            if (!ef) {
                ec += "<option value='0.5'>0.5</option>";
            }
            for (var d9 = 1; d9 <= 50; d9++) {
                ec += "<option value='" + d9 + "'>" + d9 + "</option>";
                if (d9 == 1 && !ef) {
                    ec += "<option value='1.5'>1.5</option>";
                } else {
                    if (d9 == 2 && !ef) {
                        ec += "<option value='2.5'>2.5</option>";
                    }
                }
            }
            ec += "</select>&nbsp;";
            ed.innerHTML += ec;
            this.setTValue = function (i) {
                cq.dataNode._ceshiValue = i;
                dw.style.display = "";
                if (cx) {
                    cq.setCeshiQTip();
                } else {
                    cq.spanCeShi.innerHTML = "（分值：" + cq.dataNode._ceshiValue + "分）";
                }
                Calculatedscore();
            };
            this.initValue = function () {
                if (this.dataNode._ceshiValue) {
                    var i = $$("select", ed)[0];
                    i.value = this.dataNode._ceshiValue;
                }
            };
            ea.appendChild(ed);
            var dw = $ce("span", "<a onclick='cur.copyScore(this);return false;' class='link-U00a6e6' href='javascript:'>复制分数</a>", ea);
            dw.onmouseover = function () {
                toolTipLayerMenu.style.width = "206px";
                toolTipLayerMenu.innerHTML = "复制此题分数到后面的题目";
                sb_setmenunav(toolTipLayerMenu, true, this);
            };
            dw.onmouseout = function () {
                sb_setmenunav(toolTipLayerMenu, false, this);
            };
            this.copyScore = function (i) {
                PDF_launch("/wjx/design/applyscore.aspx?ct=" + cq.dataNode._topic, 500, 240);
            };
            if (cx) {
                var ee = $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;答案：", ea);
                var eb = control_text("14");
                ee.appendChild(eb);
                var ei = $ce("a", "+", ee);
                ei.href = "javascript:";
                ei.style.fontSize = "24px";
                ei.className = "link-666";
                ei.style.display = "inline-block";
                eb.value = o._answer;
                eb.onfocus = function () {
                    if (this.value == "请设置答案") {
                        this.value = "";
                    }
                };
                ei.onclick = function () {
                    if (!eb.value || eb.value == "请设置答案") {
                        show_status_tip("请先设置一个答案！", 4000);
                        return;
                    }
                    eb.value = eb.value + "|";
                    eb.focus();
                    eb.onchange();
                };
                eb.onchange = eb.onblur = function () {
                    if (this.value == "") {
                        this.value = "请设置答案";
                    }
                    var i = trim(this.value);
                    if (/^[A-Za-z\s]+$/.test(i)) {
                        i = i.replace(/\s+/g, " ");
                    }
                    this.value = i;
                    cq.dataNode._answer = i;
                    cq.setCeshiQTip();
                };
                ei.onmouseover = function () {
                    toolTipLayer.style.width = "200px";
                    toolTipLayer.innerHTML = "提示：如果此题有多个答案，请以“<span style='color:red;'>|</span>”符号进行分隔。";
                    sb_setmenunav(toolTipLayer, true, this);
                };
                ei.onmouseout = function () {
                    sb_setmenunav(toolTipLayer, false, this);
                };
                eb.onchange();
                var j = control_check();
                j.id = "inc_" + cq.dataNode.topic + "_" + RndNum(10);
                j.className = "checkbox";
                var ej = $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;", ee);
                ej.style.display = "inline-block";
                ej.appendChild(j);
                $ce("label", "包含答案即可得分", ej).setAttribute("for", j.id);
                ej.onmouseover = function () {
                    toolTipLayer.style.width = "270px";
                    toolTipLayer.innerHTML = "用户提交的答案不需要跟设置的答案完全一样，只要包含设置的答案就可得分。";
                    sb_setmenunav(toolTipLayer, true, this);
                };
                ej.onmouseout = function () {
                    sb_setmenunav(toolTipLayer, false, this);
                };
                j.onclick = function () {
                    if (!vipUser) {
                        alert("此功能只对企业版用户开放，请升级！");
                        this.checked = false;
                        return;
                    }
                    cq.dataNode._include = this.checked;
                };
                j.checked = o._include;
                if (eb.value == "简答题无答案") {
                    ee.style.display = "none";
                }
            }
            this.initValue();
            var d8 = control_text("14");
            ea.appendChild(d8);
            d8.value = o._ceshiDesc;
            d8.onchange = d8.onblur = function () {
                cq.dataNode._ceshiDesc = this.value;
            };
            d8.onchange();
            d8.style.display = "none";
            $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;", ea);
            var eh = $ce("a", "设置答案解析", ea);
            eh.style.display = "inline-block";
            eh.onmouseover = function () {
                toolTipLayer.style.width = "250px";
                toolTipLayer.innerHTML = "您可以填写针对此题答案的一些解析说明，在用户参与完测试后会看到此解析";
                sb_setmenunav(toolTipLayer, true, this);
            };
            eh.onmouseout = function () {
                sb_setmenunav(toolTipLayer, false, this);
            };
            eh.href = "javascript:";
            eh.className = "link-U666";
            eh.onclick = function () {
                if (!vipUser) {
                    alert("此功能只对企业版用户开放，请升级！");
                    return;
                }
                openTitleEditor(d8, function (i) {
                    if (i == "-1nc" || i == undefined) {
                        return;
                    }
                    d8.value = trim(i);
                    d8.onchange();
                });
                return false;
            };
        };
    }
    var cQ = document.createElement("div");
    var ai = o._title == "标题" || o._title == "请在此输入问题标题" || o._title == "请根据您的实际情况选择最符合的项：1-->5表示非常不满意-->非常满意";
    var b8 = $ce("div", "", cQ);
    if (P) {
        b8.style.display = "none";
    }
    var d = o._title.indexOf("<") > -1;
    var bg = $ce("div", "", cQ);
    bg.style.position = "relative";
    bg.className = "container";
    var I = control_textarea("4", "29");
    this.txttitle = I;
    I.tabIndex = 1;
    if (ai) {
        I.defValue = o._title;
    }
    if (d3) {
        I.title = "例如：您最喜欢的车型？";
    }
    if (bj) {
        I.title = "您可以在此输入本页的页面标题信息（选填）";
    }
    if (H) {
        I.title = "请在此输入内容";
    }
    var t = $ce("span", "", bg);
    if ((d3 && o._topic - 1 > 0) || H) {
        var aW = "&nbsp;<a href='javascript:' onclick='openReferWindow(cur,this);return false;' onmouseout='sb_setmenunav(toolTipLayer,false);' class='link-U666' style='display:inline-block;' title='引用前面题目的答案'>引用</a>";
        t.innerHTML = aW;
        t.style.position = "absolute";
        t.style.right = "45px";
        t.style.top = "3px";
        t.style.display = "none";
    }
    var dV = $ce("a", "高级编辑", bg);
    dV.href = "javascript:;";
    dV.title = "";
    dV.onmouseover = function () {
        toolTipLayerMenu.style.width = "200px";
        toolTipLayerMenu.innerHTML = "提示：高级编辑可以设置字体、颜色，插入图片、音频、视频等";
        sb_setmenunav(toolTipLayerMenu, true, this);
    };
    dV.onmouseout = function () {
        sb_setmenunav(toolTipLayerMenu, false, this);
    };
    dV.style.position = "absolute";
    dV.style.right = "32px";
    dV.style.top = "18px";
    dV.style.display = "none";
    dV.className = "link-set";
    dV.onclick = function () {
        cq.createEditBox();
        return false;
    };
    var y = "tc" + o._type + getEditorIndex();
    I.value = o._title;
    I.id = y;
    I.style.overflow = "auto";
    I.style.padding = "5px 0 0 5px";
    I.style.border = "1px solid #dddddd";
    I.style.width = "99%";
    I.style.margin = "36px 0 0 0";
    bg.appendChild(I);
    if (d3) {
        if (!d) {
            I.style.height = "33px";
            if (dJ) {
                I.style.height = "60px";
            }
        } else {
            I.style.height = "82px";
        }
    } else {
        I.style.height = "130px";
    }
    I.onkeyup = I.onchange = function () {
        cq.checkTitle();
    };
    I.onfocus = function () {
        if (this.value == "标题" || this.value == "请在此输入问题标题" || this.value == "请根据您的实际情况选择最符合的项：1-->5表示非常不满意-->非常满意") {
            this.value = "";
        }
        dV.style.display = "";
    };
    I.onblur = function () {
        if (!this.value && cq.dataNode._type != "page") {
            this.value = this.defValue || "";
            cq.checkTitle();
        }
        changeHeight(this);
    };
    I.oninput = I.onpropertychange = function () {
        changeHeight(this);
    };
    cq.gettextarea = function () {
        return I;
    };
    var by = "";
    if (bu) {
        if (aM) {
            by = "<option value='radio'>列表单选题</option><option value='toupiaocheck'>投票多选题</option>";
        } else {
            if (be) {
                if (!isMergeAnswer || this.isMergeNewAdded) {
                    by = "<option value='toupiaoradio'>投票单选题</option><option value='check'>多选题</option>";
                } else {
                    by = "<option value='check'>多选题</option>";
                }
            }
        }
    } else {
        if (dJ) {
            if (bH) {
                if (!o._isCloze) {
                    by += "<option value='clozegap'>考试完型填空</option>";
                } else {
                    by = "<option value='ceshigap'>考试多项填空</option>";
                }
                by += "<option value='gapfill'>多项填空题</option>";
            } else {
                by = "<option value='ceshigap'>考试多项填空</option>";
                by += "<option value='clozegap'>考试完型填空</option>";
            }
        } else {
            if (bH) {
                if (aM && !r) {
                    by = "<option value='radio'>列表单选题</option><option value='ceshicheck'>考试多选题</option>";
                } else {
                    if (be) {
                        if (!isMergeAnswer || this.isMergeNewAdded) {
                            by = "<option value='ceshiradio'>考试单选题</option><option value='check'>多选题</option>";
                        } else {
                            by = "<option value='check'>多选题</option>";
                        }
                    } else {
                        if (cx) {
                            if (o._answer != "简答题无答案") {
                                by = "<option value='ceshiq1'>考试简答题</option>";
                                by = "<option value='question'>普通填空题</option>";
                            } else {
                                by = "<option value='ceshiq2'>考试填空题</option>";
                            }
                        }
                    }
                }
            } else {
                if (d2) {
                    if (aM) {
                        by = "<option value='radio'>列表单选题</option><option value='cepingcheck'>评分多选题</option>";
                    } else {
                        if (be) {
                            if (!isMergeAnswer || this.isMergeNewAdded) {
                                by = "<option value='cepingradio'>评分单选题</option><option value='check'>列表多选题</option>";
                            } else {
                                by = "<option value='check'>列表多选题</option>";
                            }
                        }
                    }
                } else {
                    if (!isMergeAnswer || this.isMergeNewAdded) {
                        if (cx) {
                            if (cq.dataNode._verify != "多级下拉") {
                                by = "<option value='radio'>列表单选题</option><option value='radio_down'>下拉框单选题</option><option value='check'>多选题</option><option value='likert'>量表题</option><option value='order'>排序题</option><option value='ceshiq'>考试填空题</option>";
                            }
                        } else {
                            if (ax) {
                                if (bQ) {
                                    if (cM != 303) {
                                        by += "<option value='matrix,303'>表格下拉框</option>";
                                    }
                                    if (cM != 301) {
                                        by += "<option value='matrix,301'>表格数值题</option>";
                                    }
                                    if (cM != 302) {
                                        by += "<option value='matrix,302'>表格文本框</option>";
                                    }
                                } else {
                                    if (cM <= 101) {
                                        by += "<option value='matrix,103'>矩阵单选题</option>";
                                        by += "<option value='matrix,102'>矩阵多选题</option>";
                                        by += "<option value='matrix,201'>矩阵文本题</option>";
                                        by += "<option value='matrix,202'>矩阵滑动条</option>";
                                    } else {
                                        by += "<option value='matrix,101'>矩阵量表题</option>";
                                        if (cM != 103) {
                                            by += "<option value='matrix,103'>矩阵单选题</option>";
                                        }
                                        if (cM != 102) {
                                            by += "<option value='matrix,102'>矩阵多选题</option>";
                                        }
                                        if (cM != 201) {
                                            by += "<option value='matrix,201'>矩阵文本题</option>";
                                        }
                                        if (cM != 202) {
                                            by += "<option value='matrix,202'>矩阵滑动条</option>";
                                        }
                                    }
                                }
                            } else {
                                if (dH) {
                                    if (!aM || aY) {
                                        by += "<option value='radio'>列表单选题</option>";
                                    }
                                    if (!cK) {
                                        by += "<option value='radio_down'>下拉框单选题</option>";
                                    }
                                    if (!be || dE) {
                                        by += "<option value='check'>多选题</option>";
                                    }
                                    if (!aY) {
                                        by += "<option value='likert'>量表题</option>";
                                    }
                                    if (!dE) {
                                        by += "<option value='order'>排序题</option>";
                                    }
                                    if (aM) {
                                        by += "<option value='toupiaoradio'>投票单选题</option>";
                                        by += "<option value='ceshiradio'>考试单选题</option>";
                                        by += "<option value='cepingradio'>评分单选题</option>";
                                    } else {
                                        if (be && !dE) {
                                            by += "<option value='toupiaocheck'>投票多选题</option>";
                                            by += "<option value='ceshicheck'>考试多选题</option>";
                                        }
                                    }
                                    by += "<option value='question'>问答题</option>";
                                }
                            }
                        }
                    } else {
                        if ((aM || cK) && cM == 0) {
                            by = "";
                            if (aM) {
                                by = "<option value='radio_down'>下拉框单选题</option>";
                            } else {
                                if (cK) {
                                    by = "<option value='radio'>列表单选题</option>";
                                }
                            }
                            by += "<option value='likert'>量表题</option><option value='check'>多选题</option><option value='toupiaoradio'>投票单选题</option><option value='cepingradio'>评分单选题</option><option value='ceshiradio'>考试单选题</option>";
                        } else {
                            if (be && !dE) {
                                by = "<option value='toupiaocheck'>投票多选题</option>";
                                by += "<option value='ceshicheck'>考试多选题</option>";
                            } else {
                                if (ax && (cM == 103 || cM == 101)) {
                                    if (cM != 101) {
                                        by += "<option value='matrix,101'>矩阵量表题</option>";
                                    }
                                    if (cM != 103) {
                                        by += "<option value='matrix,103'>矩阵单选题</option>";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    var aV = "";
    if (d3) {
        this.getQType = function () {
            var i = cq.dataNode._type;
            if (i == "question") {
                if (cq.dataNode._isCeShi) {
                    if (cq.dataNode._answer == "简答题无答案") {
                        return "考试简答题";
                    } else {
                        return "考试填空题";
                    }
                }
                if (cq.dataNode._verify == "多级下拉") {
                    return "多级下拉";
                }
                return "文本题";
            } else {
                if (i == "gapfill") {
                    if (cq.dataNode._isCloze) {
                        return "考试完型填空";
                    }
                    if (cq.dataNode._isCeShi) {
                        return "考试多项填空";
                    }
                    return "多项填空题";
                } else {
                    if (i == "slider") {
                        return "滑动条";
                    } else {
                        if (i == "radio") {
                            if (cq.dataNode._isTouPiao) {
                                return "投票单选题";
                            } else {
                                if (cq.dataNode._isCeShi) {
                                    if (r) {
                                        return "考试判断题";
                                    }
                                    return "考试单选题";
                                } else {
                                    if (cq.dataNode._isCePing) {
                                        return "评分单选题";
                                    } else {
                                        if (cM) {
                                            return "量表题";
                                        } else {
                                            if (cq.dataNode._isQingJing) {
                                                return "情景随机题";
                                            }
                                        }
                                    }
                                }
                            }
                            return "单选题";
                        } else {
                            if (i == "radio_down") {
                                return "下拉框单选";
                            } else {
                                if (i == "check") {
                                    if (cq.dataNode._isTouPiao) {
                                        return "投票多选题";
                                    } else {
                                        if (cq.dataNode._isCeShi) {
                                            return "考试多选题";
                                        } else {
                                            if (cq.dataNode._isCePing) {
                                                return "评分多选题";
                                            } else {
                                                if (cM) {
                                                    return "排序题";
                                                }
                                            }
                                        }
                                    }
                                    return "多选题";
                                } else {
                                    if (i == "fileupload") {
                                        return "上传文件题";
                                    } else {
                                        if (i == "matrix") {
                                            if (cM == 201) {
                                                return "矩阵文本题";
                                            } else {
                                                if (cM == 202) {
                                                    return "矩阵滑动条";
                                                } else {
                                                    if (cM == 301) {
                                                        return "表格数值题";
                                                    } else {
                                                        if (cM == 302) {
                                                            return "表格文本题";
                                                        } else {
                                                            if (cM == 303) {
                                                                return "表格下拉框";
                                                            } else {
                                                                if (aD) {
                                                                    return "矩阵量表题";
                                                                } else {
                                                                    if (cM == 103) {
                                                                        return "矩阵单选题";
                                                                    } else {
                                                                        if (cM == 102) {
                                                                            return "矩阵多选题";
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        } else {
                                            if (i == "sum") {
                                                return "比重题";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return "";
        };
        aV = this.getQType();
    }
    if (by) {
        by = "<select style='width:120px;' onchange='javascript:cur.selChangeType(this.value);'><option value='0'>" + aV + "</option>" + by + "</select>";
    }
    if (d3 || H) {
        var dB = $ce("div", "", cQ);
        dB.style.marginTop = "10px";
        dB.className = "container";
        if (dJ) {
            var d7 = $ce("div", "", dB);
            d7.style.marginBottom = "15px";
            var Y = document.createElement("a");
            Y.innerHTML = "插入填空符";
            Y.className = "sumitbutton";
            Y.href = "javascript:;";
            Y.onclick = function () {
                if (KE.g[y] && KE.g[y].wyswygMode) {
                    KE.util.focus(y);
                    KE.util.selection(y);
                    KE.util.insertHtml(y, GapFillStr);
                    KE.util.focus(y);
                } else {
                    var i = I.value.length;
                    I.focus();
                    if (typeof document.selection != "undefined") {
                        document.selection.createRange().text = GapFillStr;
                    } else {
                        I.value = I.value.substr(0, I.selectionStart) + GapFillStr + I.value.substring(I.selectionEnd, i);
                    }
                    cq.checkTitle();
                }
                return false;
            };
            Y.onmouseover = function () {
                toolTipLayerMenu.style.width = "320px";
                toolTipLayerMenu.innerHTML = "填空符用连续3个下划线表示，填空长度跟下划线的个数相关。点击按钮可在光标处插入填空符。";
                sb_setmenunav(toolTipLayerMenu, true, this);
            };
            Y.onmouseout = function (i) {
                sb_setmenunav(toolTipLayerMenu, false, this);
            };
            d7.appendChild(Y);
            var K = "填空属性";
            if (bH) {
                K = "答案设置";
            }
            var dq = $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a onclick='cur.setMRowAttr();return false;' href='javascript:' class='sumitbutton cancle'>" + K + "</a>", d7);
            this.setMRowAttr = function () {
                PDF_launch("/wjx/design/setrowattr.aspx?ct=" + this.dataNode._topic, 700, 370, function () {
                    cur.checkTitle();
                    if (bH) {
                        cur.checkSameScore();
                    }
                });
            };
            if (bH) {
                var cy = $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;<a onclick='cur.copyScore(this);return false;' class='link-U00a6e6' href='javascript:'>复制分数</a>", dq);
                cy.style.display = "none";
                cy.onmouseover = function () {
                    toolTipLayerMenu.style.width = "176px";
                    toolTipLayerMenu.innerHTML = "复制此题分数到后面的题目";
                    sb_setmenunav(toolTipLayerMenu, true, this);
                };
                cy.onmouseout = function () {
                    sb_setmenunav(toolTipLayerMenu, false, this);
                };
                this.checkSameScore = function () {
                    var d8 = getGapFillCount(this.dataNode._title);
                    var d9 = 0;
                    var ea = true;
                    for (var dw = 0; dw < d8; dw++) {
                        var j = 1;
                        if (this.dataNode._rowVerify[dw]) {
                            j = this.dataNode._rowVerify[dw]._ceshiValue || 1;
                        }
                        if (!d9) {
                            d9 = j;
                        } else {
                            if (d9 != j) {
                                ea = false;
                                break;
                            }
                        }
                    }
                    cy.style.display = ea ? "" : "none";
                };
                cur.checkSameScore();
                this.copyScore = function (i) {
                    PDF_launch("/wjx/design/applyscore.aspx?ct=" + cq.dataNode._topic, 500, 240);
                };
            }
            var cF = $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;", d7);
            var da = control_check();
            da.id = "tst_" + o._topic + "_" + RndNum(10);
            da.className = "checkbox";
            cF.appendChild(da);
            da.onclick = function () {
                cq.dataNode._useTextBox = this.checked;
                cq.checkTitle();
            };
            $ce("label", "文本框样式", cF).setAttribute("for", da.id);
        }
    }
    if (d3) {
        var aC = $ce("span", "", dB);
        if (by && !P && !cI) {
            var a9 = aV;
            aC.innerHTML = by;
            this.selChangeType = function (j, i) {
                if (j == "0") {
                    return;
                }
                if (j == "question" && this.dataNode._type != "question") {
                    if (!confirm("转换成问答题将丢失所有选项信息，是否继续？")) {
                        return;
                    }
                }
                changeQ(j);
                window.focus();
            };
            if (a9 == "考试单选题" || a9 == "评分单选题" || a9 == "量表题" || a9 == "考试填空题" || a9 == "考试简答题") {
                var ar = false;
                var bE = 0;
                var a7 = cq.dataNode._topic;
                var cR = false;
                if (a9 == "考试填空题" || a9 == "考试简答题") {
                    cR = true;
                }
                for (var dt = 0; dt < questionHolder.length; dt++) {
                    var L = questionHolder[dt].dataNode;
                    var ak = L._type;
                    if (ak == "cut" || ak == "page") {
                        continue;
                    }
                    var dQ = L._topic;
                    if (dQ - a7 <= 0) {
                        continue;
                    }
                    if (cR && L._type != "question") {
                        break;
                    } else {
                        if (!cR && L._type != "radio") {
                            break;
                        }
                    }
                    bE++;
                }
                if (bE >= 2) {
                    ar = true;
                }
                if (ar) {
                    var G = $ce("span", "&nbsp;&nbsp;<a href='javascript:;' class='link-U00a6e6' title='批量复制此题的题型到后面的题目'>批量复制</a>", aC);
                    G.onclick = function () {
                        var i = "/wjx/design/applyqtype.aspx";
                        var j = cq.dataNode._topic;
                        i += "?ct=" + j;
                        PDF_launch(i, 500, 240);
                        return false;
                    };
                }
            }
        } else {
            if (aV) {
                aC.innerHTML = "<select style='width:90px;' onclick='show_status_tip(\"提示：" + aV + "不能转换为其它题型\",6000);'><option value='0'>" + aV + "</option></select>";
            }
        }
        var dS = $ce("span", "", dB);
        if (P) {
            dS.style.display = "none";
        }
        dS.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        var n = control_check();
        n.title = "用户在填写问卷时必须回答这道题";
        n.className = "checkbox";
        n.id = "req_" + o._topic + "_" + RndNum(10);
        dS.appendChild(n);
        $ce("label", "必答", dS).setAttribute("for", n.id);
        var aa = document.createElement("span");
        aa.style.display = "none";
        aa.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;将所有题目设为：<a href='javascript:setAllRequired(true);' class='link-U00a6e6'>必答</a>&nbsp;<a href='javascript:setAllRequired(false);' class='link-U00a6e6'>非必答</a>";
        dS.appendChild(aa);
        n.onclick = function () {
            cq.dataNode._requir = this.checked;
            cq.setreqstatus();
            aa.style.display = "";
        };
        this.get_requir = function () {
            return n;
        };
        var f = document.createElement("span");
        if (P || cI) {
            f.style.display = "none";
        }
        var cE = $ce("span", "&nbsp;", f);
        var dN = control_text("14");
        dN.style.height = "15px";
        cE.appendChild(dN);
        dN.style.display = "none";
        var b6 = $ce("span", "", cE);
        b6.style.marginLeft = "30px";
        var Z = $ce("a", "填写提示", cE);
        Z.className = "link-new";
        Z.title = "填写提示可以作为副标题";
        Z.href = "javascript:";
        Z.onclick = function () {
            openTitleEditor(dN, function (i) {
                if (i == "-1nc" || i == undefined) {
                    return false;
                }
                dN.value = trim(i);
                dN.onchange();
            });
            return false;
        };
        dN.onchange = dN.onblur = function () {
            this.value = replace_specialChar(this.value);
            cq.get_div_ins().innerHTML = this.value;
            cq.get_div_ins().style.display = this.value ? "" : "none";
            cq.dataNode._ins = this.value;
            if (this.value) {
                Z.innerHTML = "编辑提示";
                Z.className = "link-set";
            } else {
                Z.className = "link-new";
                Z.innerHTML = "填写提示";
            }
            if (cq.checkTextJump) {
                cq.checkTextJump(this.value);
            }
        };
        dB.appendChild(f);
    }
    if (bH && !dJ) {
        var bK = document.createElement("div");
        dB.appendChild(bK);
        this.addCeShiSetting(bK);
    }
    aE.appendChild(cQ);
    aI.appendChild(aE);
    if (bj) {
        var df = document.createElement("span");
        df.innerHTML = "此页是否是甄别页：";
        df.title = "可以在此页设置筛选规则，如果用户提交的答卷不符合要求，则会终止后面的答题";
        df.style.margin = "30px 0 0 30px";
        df.style.display = "inline-block";
        var v = control_check();
        v.title = df.title;
        v.onclick = function () {
            cq.dataNode._iszhenbie = this.checked;
            cq.divZhenBie.style.display = this.checked ? "" : "none";
        };
        cQ.appendChild(df);
        cQ.appendChild(v);
        var dO = $ce("i", "", cQ);
        dO.className = "design-icon design-qmark";
        dO.onmouseover = function () {
            toolTipLayer.style.width = "300px";
            toolTipLayer.innerHTML = "可以对此页的题目设置无效答卷筛选规则，用户点击下一页时，如果此页的答题不符合要求，系统会终止该用户继续答题。<a href='/help/help.aspx?helpid=76&h=1' class='titlelnk' target='_blank'>如何设置筛选规则？</a>";
            sb_setmenunav(toolTipLayer, true, this);
        };
        dO.onmouseout = function (i) {
            sb_setmenunav(toolTipLayer, false, this);
        };
        var bs = !vipUser && !window.isPromote;
        if (bs) {
            df.style.display = v.style.display = dO.style.display = "none";
        }
        var aj = document.createElement("div");
        aj.style.margin = "10px 0 0 30px";
        aE.appendChild(aj);
        var cN = document.createElement("div");
        cN.style.margin = "10px 0 0 30px";
        $ce("span", "<b>填写时间控制</b>&nbsp;", cN);
        aE.appendChild(cN);
        var bd = control_text(3);
        $ce("span", "此页允许停留时间为：<b>最短</b>", cN).appendChild(bd);
        var dm = control_text(3);
        var h = $ce("span", "秒&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>最长</b>", cN);
        h.appendChild(dm);
        $ce("span", "秒（空表示不限制）", cN);
        bd.parDiv = cq;
        bd.onblur = bd.onchange = function () {
            var dw = this;
            var d8 = dw.value;
            var j = this.parDiv;
            var d9 = j.dataNode._maxtime;
            j.dataNode._istimer = false;
            if (d8) {
                if (isPositive(d8) && (!d9 || (d8 - d9 <= 0))) {
                    if (d9 && d8 - d9 == 0) {
                        j.dataNode._istimer = true;
                    }
                    j.dataNode._mintime = parseInt(d8);
                } else {
                    show_status_tip("最短时间必须为正整数并且少于最长时间", 4000);
                    dw.value = "";
                    j.dataNode._mintime = "";
                }
            } else {
                j.dataNode._mintime = "";
            }
            if (cur.dataNode._mintime && cur.dataNode._mintime == cur.dataNode._maxtime) {
                if (total_page == 1 && !window.alertTime) {
                    window.alertTime = 1;
                    alert("提示：您设置的最短填写时间等于最长填写时间，这个一般用于控制用户在确定的时间内观看图片或者视频！");
                }
            }
            var i = j.dataNode._mintime || j.dataNode._maxtime;
            b0.style.display = (window.isPromote || vipUser) && i ? "" : "none";
            j.showTimeLimit();
        };
        bd.onclick = function () {
            if (!vipUser) {
                alert("只有企业版用户才能设置每页最短填写时间，请升级！");
                this.value = "";
                this.blur();
                return;
            }
        };
        dm.onclick = function () {
            if (!vipUser) {
                alert("只有企业版用户才能设置每页最长填写时间，请升级！");
                this.value = "";
                this.blur();
                return;
            }
        };
        dm.onblur = dm.onchange = function () {
            var dw = this;
            var d8 = dw.value;
            var j = cur.dataNode._mintime;
            cur.dataNode._istimer = false;
            if (d8) {
                if (isPositive(d8) && (!j || (d8 - j >= 0))) {
                    if (j && d8 - j == 0) {
                        cur.dataNode._istimer = true;
                    }
                    cur.dataNode._maxtime = parseInt(d8);
                } else {
                    show_status_tip("最长时间必须为正整数并且大于最短时间", 4000);
                    dw.value = "";
                }
            } else {
                cur.dataNode._maxtime = "";
            }
            var i = cur.dataNode._mintime || cur.dataNode._maxtime;
            if (cur.dataNode._mintime && cur.dataNode._mintime == cur.dataNode._maxtime) {
                if (total_page == 1 && !window.alertTime) {
                    window.alertTime = 1;
                    alert("提示：您设置的最短填写时间等于最长填写时间，这个一般用于控制用户在确定的时间内观看图片或者视频！");
                }
            }
            b0.style.display = (window.isPromote || vipUser) && i ? "" : "none";
            cq.showTimeLimit();
        };
        cq.setMinMaxTime = function () {
            if (bd) {
                bd.value = this.dataNode._mintime;
            }
            if (dm) {
                dm.value = this.dataNode._maxtime;
            }
        };
        var b7 = $ce("i", "", cN);
        b7.className = "design-icon design-qmark";
        b7.onmouseover = function () {
            toolTipLayer.style.width = "250px";
            toolTipLayer.innerHTML = "说明：从进入此页开始计时，在还未达到最短填写时间时不能进入下一页或提交答卷，当到达最长填写时间后还未做答完成将自动跳转到下一页或提交答卷。如果要控制用户观看图片或者视频的时间，可以设置最短填写时间等于最长填写时间，<a href='http://www.sojump.com/jq/3690298.aspx' target='_blank' class='titlelnk'>查看示例问卷</a>";
            sb_setmenunav(toolTipLayer, true, this);
        };
        b7.onmouseout = function (i) {
            sb_setmenunav(toolTipLayer, false, this);
        };
        var b0 = $ce("div", "将上面的填写时间复制到&nbsp;", cN);
        b0.style.margin = "6px 0 0 86px";
        var av = 1;
        var z = 1;
        var ae = total_page;
        $ce("span", "<input type='radio'  name='rbltimesp' onclick='cur.setTimePageTime(1);'  checked='checked'  />所有页<input type='radio' name='rbltimesp'  onclick='cur.setTimePageTime(2);'/>指定页", b0);
        var O = $ce("span", "：第<input type='text' value='1' onblur='cur.setTimePageStart(this);' style='width:20px;'/>页到<input type='text' value='" + ae + "' onblur='cur.setTimePageEnd(this);' style='width:20px;'/>页", b0);
        O.style.display = "none";
        cq.setTimePageTime = function (i) {
            av = i;
            O.style.display = i == 1 ? "none" : "";
        };
        cq.setTimePageStart = function (i) {
            var j = i.value;
            if (!isPositive(j) || j - ae >= 0) {
                i.value = 1;
                show_status_tip("必须为正数，并且小于最大页数", 4000);
            }
            z = i.value;
        };
        cq.setTimePageEnd = function (i) {
            var j = i.value;
            if (!isPositive(j) || j - total_page > 0) {
                i.value = total_page;
                show_status_tip("必须为正数，并且小于总页数", 4000);
            } else {
                if (j - z <= 0) {
                    i.value = total_page;
                    show_status_tip("必须大于最小页数", 4000);
                }
            }
            ae = i.value;
        };
        var dW = $ce("span", "&nbsp;", b0);
        var aL = control_btn("复制");
        aL.className = "finish cancle";
        dW.appendChild(aL);
        aL.onclick = function () {
            if (av == 1) {
                ae = total_page;
            }
            dg(firstPage);
            for (var j = 0; j < questionHolder.length; j++) {
                dg(questionHolder[j]);
            }
            show_status_tip("成功复制", 4000);
        };

        function dg(j) {
            var dw = j.dataNode;
            if (dw._type == "page") {
                var i = parseInt(dw._topic);
                if (i >= z && i <= ae) {
                    dw._mintime = cur.dataNode._mintime;
                    dw._maxtime = cur.dataNode._maxtime;
                    if (j.setMinMaxTime) {
                        j.setMinMaxTime();
                    }
                }
            }
        }
    }
    if (dH || w) {
        var bI = "";
        if (newQType == 5) {
            bI = " style='display:none;'";
        }
        var de = "0 0px 0 26px";
        if (ax) {
            de = "0 8px 0 4px";
        }
        var a4 = "<a href='javascript:'" + bI + " onclick='cur.show_divAddFromCheck();this.onmouseout();return false;' onmouseover='showRelTip(true,this);' onmouseout='showRelTip(false);' class='link-U666' style='margin: " + de + "'>引用其它题选中项</a>";
        var X = document.createElement("div");
        X.style.margin = "10px 0px";
        var bf = $ce("select", "", X);
        this.selAddFromCheck = bf;
        bf.style.width = "220px";
        X.style.display = "none";
        var dU = document.createElement("span");
        dU.style.display = "none";
        this.show_divAddFromCheck = function () {
            if (!X.inited) {
                bf.onchange = function () {
                    if (!vipUser) {
                        alert("只有企业版用户才能使用引用逻辑，请升级！");
                        this.value = "0";
                        return;
                    }
                    cur.addFromCheck(this);
                };
                X.inited = true;
            }
            X.style.display = X.style.display == "" ? "none" : "";
            if (isMergeAnswer && !this.isMergeNewAdded) {
                X.style.display = "none";
            }
            if (newQType == 5) {
                X.style.display = "none";
            }
            if (ax) {
                if (bC) {
                    bC.style.display = X.style.display == "" ? "none" : "";
                }
                if (c6 && !c6.checked) {
                    bC.style.display = "none";
                }
                if (bf.value > 0 && bC) {
                    bC.style.display = "none";
                }
            }
            this.updateSelCheck();
            this.hasDisplaySelCheck = X.style.display == "";
        };
        this.updateSelCheck = function () {
            for (var d9 = 0; d9 < bf.options.length; d9++) {
                bf.options[d9] = null;
            }
            bf.options[0] = new Option("请选择来源题目(多选或排序题)", 0);
            var ed = 1;
            for (var d9 = 0; d9 < questionHolder.length; d9++) {
                var ec = questionHolder[d9].dataNode;
                var ef = this.dataNode._topic;
                if (ec._type == "check" && ec._topic - ef < 0 && !questionHolder[d9]._referDivQ) {
                    var dw = "[多选题]";
                    if (ec._tag) {
                        dw = "[排序题]";
                    }
                    var d8 = ec._title;
                    d8 = d8.replace(/<(?!img|embed).*?>/ig, "");
                    d8 = d8.replace(/&nbsp;/ig, " ").substring(0, 16);
                    var eb = d8 + "  " + dw;
                    if (!WjxActivity._use_self_topic) {
                        eb = ec._topic + "." + eb;
                    }
                    var ea = new Option(eb, ec._topic);
                    ea.referDivQ = questionHolder[d9];
                    bf.options[ed++] = ea;
                }
            }
            if (this._referDivQ) {
                var ee = bf.options;
                for (var d9 = 0; d9 < ee.length; d9++) {
                    var j = ee[d9];
                    if (j.referDivQ == this._referDivQ) {
                        bf.value = j.value;
                        break;
                    }
                }
            }
        };
        this.addFromCheck = function (ea) {
            var d8 = bf.selectedIndex;
            if (aM || be) {
                if (d8 > 0 && bU.checked) {
                    bU.checked = false;
                    bU.onclick();
                }
                bU.disabled = d8 > 0 ? true : false;
                cf.style.display = d8 > 0 ? "none" : "";
            } else {
                d4.style.display = d8 > 0 ? "none" : "";
                if (aH) {
                    aH.style.display = d4.style.display;
                }
            }
            dU.style.display = d8 > 0 ? "" : "none";
            this.clearReferQ();
            if (bf.value > 0) {
                if (this._referedArray) {
                    var dw = "";
                    for (var d9 = 0; d9 < this._referedArray.length; d9++) {
                        if (d9 > 0) {
                            dw += ",";
                        }
                        dw += this._referedArray[d9].dataNode._topic;
                    }
                    show_status_tip("第" + dw + "题的选项或行标题来源于此题的选中项，此题不能再引用其他题");
                    bf.value = "0";
                    this.show_divAddFromCheck();
                    return;
                }
                var j = bf.options[bf.selectedIndex].referDivQ;
                this._referDivQ = j;
                if (!j._referedArray) {
                    j._referedArray = new Array();
                }
                if (j._referedArray.indexOf(this) == -1) {
                    j._referedArray.push(this);
                }
                j._referedArray.sort(function (eb, i) {
                    return eb.dataNode._topic - i.dataNode._topic;
                });
                this.updateReferQ();
            } else {
                this.show_divAddFromCheck();
            }
            if (this.dataNode._daoZhi) {
                if (cv) {
                    cv.checked = false;
                    this.dataNode._daoZhi = false;
                    cq.updateSpanMatrix();
                    show_status_tip("使用引用逻辑后，不能再使用竖向选择", 5000);
                }
            }
            if (this.updateItem) {
                this.updateItem();
            } else {
                if (this.createSum) {
                    this.createSum();
                }
            }
        };
        this.removeRefer = function () {
            bf.value = "0";
            this.addFromCheck();
        };
        this.clearReferQ = function () {
            if (this._referDivQ) {
                this._referDivQ._referedArray.remove(this);
                if (!this._referDivQ._referedArray.length) {
                    this._referDivQ._referedArray = null;
                }
                this._referDivQ = null;
            }
        };
        this.clearReferedQ = function () {
            if (this._referedArray) {
                for (var j = 0; j < this._referedArray.Length; j++) {
                    var dw = this._referedArray[j];
                    dw._referDivQ = null;
                    if (dw.updateItem) {
                        dw.updateItem();
                    } else {
                        if (dw.createSum) {
                            dw.createSum();
                        }
                    }
                }
            }
        };
        this.updateReferQ = function () {
            if (this._referDivQ) {
                var i = this._referDivQ;
                var dw = "选项";
                if (this.dataNode._type == "matrix" || this.dataNode._type == "sum") {
                    dw = "行标题";
                }
                var j = "&nbsp;<a href='javascript:' onclick='cur.removeRefer();return false;' class='link-U666'>取消引用</a>&nbsp;";
                if (isMergeAnswer && !this.isMergeNewAdded) {
                    j = "";
                }
                dU.innerHTML = j;
            }
        };
    }
    if (d3) {
        $ce("div", "", aE).style.clear = "both";
        var cZ = document.createElement("div");
        cZ.className = "container";
        cZ.style.position = "relative";
        if (!dH) {
            var dF = document.createElement("div");
            dF.style.margin = "15px 0 0";
            cZ.appendChild(dF);
        }
        aE.appendChild(cZ);
    }
    if (b3) {
        $ce("span", "最小值：", dF);
        var aJ = control_text("3");
        aJ.title = "用户可以选择的最小值";
        aJ.maxLength = 4;
        aJ.style.height = "20px";
        dF.appendChild(aJ);
        $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;最小值显示文本：", dF);
        var b1 = control_text("10");
        b1.style.height = "20px";
        dF.appendChild(b1);
        var bz = document.createElement("br");
        dF.appendChild(bz);
        $ce("div", "", dF).style.height = "6px";
        $ce("span", "最大值：", dF);
        var e = control_text("3");
        e.style.height = "20px";
        e.title = "用户可以选择的最大值";
        e.maxLength = 4;
        dF.appendChild(e);
        $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;最大值显示文本：", dF);
        var aw = control_text("10");
        aw.style.height = "20px";
        dF.appendChild(aw);
        aJ.onchange = aJ.onblur = function () {
            var i = 100;
            if (!isInt(this.value) || this.value - e.value > 0) {
                show_status_tip("最小值不合法", 4000);
                i = (0 - e.value < 0) ? 0 : toInt(e.value) - 1;
            } else {
                i = toInt(this.value);
            }
            cq.dataNode._minvalue = i;
            this.value = i;
            cq.get_span_min_value().innerHTML = "(" + i + ")";
        };
        e.onchange = e.onblur = function () {
            if (!isInt(this.value) || this.value - aJ.value < 0) {
                show_status_tip("最大值不合法", 4000);
                val = (100 - aJ.value > 0) ? 100 : toInt(aJ.value) + 1;
            } else {
                val = toInt(this.value);
            }
            cq.dataNode._maxvalue = val;
            this.value = val;
            cq.get_span_max_value().innerHTML = "(" + val + ")";
        };
        b1.onchange = b1.onblur = function () {
            this.value = replace_specialChar(this.value);
            cq.get_span_min_value_text().innerHTML = cq.dataNode._minvaluetext = this.value;
        };
        aw.onchange = aw.onblur = function () {
            this.value = replace_specialChar(this.value);
            cq.get_span_max_value_text().innerHTML = cq.dataNode._maxvaluetext = this.value;
        };
    }
    if (dR) {
        $ce("span", "限制上传文件大小：", dF);
        var M = control_text("3");
        var dp = fileMaxSize / 1024;
        M.maxLength = 5;
        M.title = "上传文件大小不能超过" + dp + "M";
        dF.appendChild(M);
        $ce("span", "M&nbsp;&nbsp;&nbsp;&nbsp;提示：参与者上传后的文件最多保存5年。", dF);
        M.onblur = M.onchange = function () {
            var i = M.value;
            if (i) {
                if (isPositive(i) && i - dp <= 0) {
                    cq.dataNode._maxsize = i * 1024;
                } else {
                    cq.dataNode._maxsize = fileMaxSize;
                    show_status_tip("最大文件大小必须为正数，并且不能超过" + dp + "M", 3000);
                    this.value = "";
                }
            } else {
                cq.dataNode._maxsize = fileMaxSize;
            }
            cq.updateFileUpload();
        };
        var s = $ce("div", "", dF);
        s.style.marginTop = "15px";
        var U = control_check();
        U.className = "checkbox";
        U.id = "chkext_" + cq.dataNode._topic + "_" + RndNum(10);
        s.appendChild(U);
        $ce("label", "限制上传文件类型", s).setAttribute("for", U.id);
        U.onclick = function () {
            dG.style.display = this.checked ? "" : "none";
        };
        var ap = "<div style='margin-left:20px;'><b>图片文件：</b><input type='checkbox' value=''/>全选&nbsp;&nbsp;<input type='checkbox' value='.gif'/>.gif&nbsp;<input type='checkbox' value='.png'/>.png&nbsp;<input type='checkbox' value='.jpg'/>.jpg&nbsp;<input type='checkbox' value='.jpeg'/>.jpeg&nbsp;<input type='checkbox' value='.bmp'/>.bmp&nbsp;</div>";
        ap += "<div style='margin-left:20px;'><b>文档文件：</b><input type='checkbox' value=''/>全选&nbsp;&nbsp;<input type='checkbox' value='.doc'/>.doc&nbsp;<input type='checkbox' value='.docx'/>.docx&nbsp;<input type='checkbox' value='.pdf'/>.pdf&nbsp;<input type='checkbox' value='.xls'/>.xls&nbsp;<input type='checkbox' value='.xlsx'/>.xlsx&nbsp;<input type='checkbox' value='.ppt'/>.ppt&nbsp;<input type='checkbox' value='.pptx'/>.pptx&nbsp;<input type='checkbox' value='.txt'/>.txt&nbsp;</div>";
        ap += "<div style='margin-left:20px;'><b>压缩文件：</b><input type='checkbox' value=''/>全选&nbsp;&nbsp;<input type='checkbox' value='.rar'/>.rar&nbsp;<input type='checkbox' value='.zip'/>.zip&nbsp;<input type='checkbox' value='.gzip'/>.gzip</div>";
        var dG = $ce("div", ap, dF);
        cq.updateExt = function (d8) {
            var i = $$("input", dG);
            var dw = "";
            for (var j = 0; j < i.length; j++) {
                if (i[j].checked && i[j].value) {
                    if (dw) {
                        dw += "|";
                    }
                    dw += i[j].value;
                }
            }
            this.dataNode._ext = dw;
            this.updateFileUpload();
        };
    }
    if (cx && cq.dataNode._verify != "多级下拉") {
        var cS = document.createElement("div");
        var bZ = control_check();
        var cb = document.createElement("span");
        var aG = getVerifyHtml(0);
        cb.innerHTML = aG;
        cS.appendChild(cb);
        this.setVerify = function (ea) {
            var d9 = false;
            if (this.dataNode._verify == "省市区" || ea.value == "省市区" || this.dataNode._verify == "高校" || ea.value == "高校") {
                d9 = true;
            }
            this.dataNode._verify = ea.value;
            if (this.dataNode._verify == "数字" || this.dataNode._verify == "小数") {
                aF.innerHTML = aF.innerHTML.replace("字数", "值");
                ao.innerHTML = ao.innerHTML.replace("字数", "值");
                al = "值";
            } else {
                aF.innerHTML = aF.innerHTML.replace("值", "字数");
                ao.innerHTML = ao.innerHTML.replace("值", "字数");
                al = "字数";
            }
            var d8 = this.dataNode._verify == "密码";
            var dw = this.dataNode._verify == "地图";
            cU.style.display = d8 ? "none" : "";
            aT.style.display = (d8 || dw || this.dataNode._verify == "城市单选") ? "none" : "";
            if (d8) {
                cq.dataNode._needOnly = false;
            }
            if (d8 && !cq.dataNode._requir) {
                n.click();
            }
            cU.getElementsByTagName("label")[0].innerHTML = dw ? "不允许填写者修改&nbsp;" : "不允许重复&nbsp;";
            var i = this.dataNode._verify == "日期" || d8 || this.dataNode._verify == "手机" || dw;
            if (cJ) {
                cJ.style.display = i ? "none" : "";
            }
            if (this.dataNode._verify == "日期" || this.dataNode._verify == "手机" || this.dataNode._verify == "整数" || this.dataNode._verify == "小数") {
                this.dataNode._width = 200;
                this.dataNode._height = 1;
                if (this.dataNode._verify == "日期") {
                    this.dataNode._width = 100;
                }
            }
            var j = ea.value && ea.value != "0" && ea.value != "汉字" && ea.value != "英文";
            bv.style.display = j ? "none" : "";
            if (j) {
                this.dataNode._height = 1;
                cT.style.display = "none";
            }
            this.changeDefaultAttr(d9);
            this.showTextAreaDate();
            this.showByVerify();
            this.showSmsVerify();
        };
        this.showByVerify = function () {
            var dw = this.dataNode._verify;
            var i = dw == "密码";
            if (bm) {
                bm.style.display = dw == "手机" ? "" : "none";
            }
            if (ag) {
                ag.style.display = i ? "" : "none";
            }
            var j = dw == "数字" || dw == "小数" || dw == "汉字" || dw == "英文" || dw == "学号" || dw == "" || dw == "0";
            cs.style.display = j ? "" : "none";
            if (!j) {
                cq.dataNode._minword = "";
                cq.dataNode._maxword = "";
                aZ.style.display = "none";
                cq.showMinMaxWord("", "");
            }
        };
        this.initVerify = function () {
            var j = this.dataNode._verify || "0";
            var i = $$("select", cb)[0];
            i.value = j;
            this.showByVerify();
        };
        var ca = "&nbsp;&nbsp;";
        if (bH) {
            ca = "";
        }
        var bL = control_check();
        bL.id = "mma_" + o._topic + RndNum(10);
        bL.className = "checkbox";
        var cs = $ce("span", ca, cS);
        cs.appendChild(bL);
        var g = "限制范围";
        $ce("label", g + "&nbsp;", cs).setAttribute("for", bL.id);
        bL.onclick = function () {
            aZ.style.display = this.checked ? "" : "none";
            if (!this.checked) {
                if (ay.value) {
                    ay.value = "";
                    ay.onchange();
                }
                if (dX.value) {
                    dX.value = "";
                    dX.onchange();
                }
            }
        };
        var aZ = $ce("span", "&nbsp;&nbsp;", cS);
        var al = "字数";
        if (o._verify == "数字" || o._verify == "小数") {
            al = "值";
        }
        var aF = $ce("span", "最小" + al + "：", aZ);
        var ay = control_text("4");
        ay.title = "不填表示无限制";
        aZ.appendChild(ay);
        ay.onchange = ay.onblur = function () {
            var j = this.value;
            var i = dX.value;
            if (!isEmpty(j) && (!isInt(j) || (!isEmpty(i) && this.value - i > 0))) {
                show_status_tip("最小" + al + "不合法", 4000);
                this.value = "";
            } else {
                if (!isEmpty(j) && cq.dataNode._verify != "数字" && cq.dataNode._verify != "小数") {
                    if (j - 3000 > 0) {
                        show_status_tip("最小字数不能超过3000", 4000);
                        this.value = "";
                    }
                }
            }
            cq.dataNode._minword = this.value;
            cq.showMinMaxWord(i, this.value);
            cq.checkDefault();
        };
        var ao = $ce("span", "最大" + al + "：", aZ);
        ao.style.marginLeft = "10px";
        var dX = control_text("4");
        dX.title = "不填表示无限制";
        dX.onchange = dX.onblur = function () {
            var j = this.value;
            var i = ay.value;
            if (!isEmpty(j) && (!isInt(j) || (!isEmpty(i) && this.value - i < 0))) {
                show_status_tip("最大字数不合法", 4000);
                this.value = "";
            } else {
                if (!isEmpty(j) && cq.dataNode._verify != "数字" && cq.dataNode._verify != "小数") {
                    if (j - 3000 > 0) {
                        show_status_tip("最大字数不能超过3000", 4000);
                        this.value = "";
                    }
                }
            }
            cq.dataNode._maxword = this.value;
            cq.showMinMaxWord(this.value, i);
            cq.checkDefault();
        };
        aZ.appendChild(dX);
        var ck = control_check();
        ck.id = "only_" + o._topic + RndNum(10);
        ck.className = "checkbox";
        var cU = $ce("span", "&nbsp;&nbsp;", cS);
        cU.appendChild(ck);
        var g = "不允许重复";
        if (o._verify == "地图") {
            g = "不允许填写者修改";
        }
        $ce("label", g + "&nbsp;", cU).setAttribute("for", ck.id);
        ck.onclick = function () {
            if (!vipUser) {
                this.checked = false;
                alert("此功能只对企业版用户开放，请升级！");
                return;
            }
            if (this.checked) {
                var i = ck;
                checkAnswerTextOnlyOne(cq.dataNode._topic * 10000, function () {
                    i.checked = cq.dataNode._needOnly = true;
                    if (i.checked && !cq.dataNode._requir && cq.dataNode._verify != "地图") {
                        show_status_tip("由于设置了唯一性，推荐将该题设为必答题", 4000);
                        n.click();
                    }
                }, function () {
                    i.checked = cq.dataNode._needOnly = false;
                });
            } else {
                this.checked = cq.dataNode._needOnly = false;
            }
        };
        cU.title = "要求每个人填写的答案是唯一的";
        var bO = control_check();
        bO.id = "sms_" + o._topic + "_" + RndNum(10);
        bO.className = "checkbox";
        var bm = $ce("span", "&nbsp;&nbsp;", cS);
        bm.appendChild(bO);
        $ce("label", "使用短信验证", bm).setAttribute("for", bO.id);
        var cX = $ce("span", "&nbsp;&nbsp此功能需要购买短信：<a href='/corphome/account/prepaysms.aspx?amount=500' target='_blank' class='link-set'>立即购买</a>", bm);
        bO.onclick = function () {
            cq.dataNode._needsms = this.checked;
            cX.style.display = this.checked ? "" : "none";
            if (this.checked && !cq.dataNode._requir) {
                show_status_tip("由于设置了短信验证，推荐将该题设为必答题", 4000);
                n.click();
            }
            aT.style.display = this.checked ? "none" : "";
            cq.showSmsVerify();
        };
        cX.style.display = cq.dataNode._needsms ? "" : "none";
        var ag = $ce("span", "&nbsp;&nbsp;提示：密码会通过MD5加密存储，不会对任何人公开。", cS);
        var aT = $ce("span", "&nbsp;&nbsp;", cS);
        if (cq.dataNode._needsms) {
            aT.style.display = "none";
        }
        var C = control_check();
        C.id = "def_" + o._topic + "_" + RndNum(10);
        C.className = "checkbox";
        aT.appendChild(C);
        var cB = "默认值";
        var ch = $ce("label", cB, aT);
        ch.setAttribute("for", C.id);
        var bG = control_textarea("1", "18");
        bG.style.overflow = "auto";
        bG.style.height = "";
        bG.style.display = "none";
        bG.style.verticalAlign = "middle";
        bG.maxLength = "20";
        bG.title = "最多输入20个字符";
        C.onclick = function () {
            bG.style.display = bG.style.display == "none" ? "" : "none";
            if (!this.checked) {
                cq.dataNode._olddefault = bG.value;
                bG.value = "";
            } else {
                bG.value = cq.dataNode._olddefault || "";
            }
            bG.onchange();
        };
        aT.appendChild(bG);
        if (o._verify == "密码" || o._verify == "地图" || o._verify == "城市单选") {
            aT.style.display = "none";
            if (o._verify == "密码") {
                cU.style.display = "none";
            }
        }
        bG.onchange = bG.onblur = function () {
            if (cq.checkDefault) {
                cq.checkDefault();
            }
        };
        this.changeDefaultAttr = function (i) {
            if (this.dataNode._verify == "省市区" || this.dataNode._verify == "高校") {
                ch.innerHTML = "指定省份";
                bG.onmouseover = function () {
                    openProvinceWindow(cq, this);
                };
                bG.onmouseout = function () {
                    sb_setmenunav(toolTipLayer, false);
                };
            } else {
                ch.innerHTML = cB;
                bG.onmouseover = bG.onmouseout = null;
            }
            if (i) {
                bG.value = "";
                bG.onchange();
            }
        };
        this.changeDefaultAttr();
        dF.appendChild(cS);
        if (bH) {
            cU.style.display = cb.style.display = "none";
        }
        var cH = this.get_span_maxword();
        var bP = this.get_textarea();
        var cJ = null;
        if (!bH) {
            cJ = $ce("div", "", cS);
            cJ.style.marginTop = "15px";
            var bN = o._verify == "日期" || o._verify == "密码" || o._verify == "手机" || o._verify == "地图";
            cJ.style.display = bN ? "none" : "";
        } else {
            cJ = $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;", cS);
        }
        var bv = $ce("span", "", cJ);
        var dy = "<select onchange='cur.setTHeight(this);'><option value='1'>设置高度</option><option value='1'>高度1行</option><option value='2'>高度2行</option><option value='3'>高度3行</option><option value='4'>高度4行</option><option value='5'>高度5行</option><option value='10'>高度10行</option><option value='自定义'>自定义高度</option></select>&nbsp;&nbsp;";
        bv.innerHTML += dy;
        var c2 = $ce("span", "", cJ);
        var aP = control_text("3");
        aP.maxLength = 3;
        aP.onchange = aP.onblur = function () {
            var i = this.value;
            if (!isEmpty(i) && !isInt(i)) {
                show_status_tip("您输入的高度不合法！");
                this.value = "";
                cq.dataNode._height = "1";
            } else {
                cq.dataNode._height = i ? parseInt(i) : "";
            }
            cT.style.display = "";
            cq.showTextAreaHeight();
        };
        this.setTHeight = function (i) {
            if (i.value != "自定义") {
                aP.value = i.value;
                c2.style.display = "none";
                aP.onchange();
            } else {
                c2.style.display = "";
            }
        };
        this.initHeight = function () {
            if (this.dataNode._height) {
                var i = $$("select", bv)[0];
                i.value = this.dataNode._height;
                if (i.selectedIndex == -1) {
                    i.value = "自定义";
                    this.setTHeight(selWidth);
                }
            }
        };
        c2.style.display = "none";
        c2.appendChild(aP);
        var cT = $ce("span", "<a href='###' class='copy-tit' title='复制到后面的题目'></a>&nbsp;&nbsp;", cJ);
        cT.style.display = "none";
        cT.onclick = function () {
            var i = "/wjx/design/applyheight.aspx";
            var j = cq.dataNode._topic;
            i += "?ct=" + j;
            PDF_launch(i, 500, 250);
            return false;
        };
        var a1 = o._verify && o._verify != "0" && o._verify != "汉字" && o._verify != "英文";
        bv.style.display = a1 ? "none" : "";
        var cp = $ce("span", "", cJ);
        var cC = "<select onchange='cur.setTWidth(this);'><option value=''>设置宽度</option><option value='50'>宽度50</option><option value='100'>宽度100</option><option value='200'>宽度200</option><option value='300'>宽度300</option><option value='400'>宽度400</option><option value='500'>宽度500</option><option value='600'>宽度600</option><option value='自定义'>自定义宽度</option></select>&nbsp;";
        cp.innerHTML += cC;
        var aU = control_text("5");
        aU.maxLength = 3;
        aU.onchange = aU.onblur = function () {
            var i = this.value;
            if (!isEmpty(i) && !isInt(i)) {
                show_status_tip("您输入的宽度不合法！");
                this.value = "";
                cq.dataNode._width = "";
            } else {
                cq.dataNode._width = i ? parseInt(i) : "";
                if (i == "1" && cq.dataNode._requir) {
                    n.click();
                }
            }
            cq.showTextAreaWidth();
        };
        this.setTWidth = function (i) {
            if (i.value != "自定义") {
                aU.value = i.value;
                aU.style.display = "none";
                aU.onchange();
            } else {
                aU.style.display = "";
            }
        };
        this.initWidth = function () {
            if (this.dataNode._width) {
                var i = $$("select", cp)[0];
                i.value = this.dataNode._width;
                if (i.selectedIndex == -1 || this.dataNode._width == "1") {
                    i.value = "自定义";
                    this.setTWidth(i);
                }
            }
        };
        cJ.appendChild(cp);
        aU.style.display = "none";
        cJ.appendChild(aU);
        var Q = $ce("span", "&nbsp;&nbsp;", cJ);
        var cc = control_check();
        cc.className = "checkbox";
        cc.id = "und_" + o._topic + "_" + RndNum(10);
        Q.appendChild(cc);
        $ce("label", "下划线样式", Q).setAttribute("for", cc.id);
        cc.onclick = function () {
            cq.dataNode._underline = this.checked;
            cq.showTextAreaUnder();
        };
    } else {
        if (cx && cq.dataNode._verify == "多级下拉") {
            var cA = "/wjx/design/setmenulist.aspx?ct=" + cq.dataNode._topic;
            var dj = $ce("span", "<a class='sumitbutton cancle' href='javascript:' onclick='PDF_launch(\"" + cA + "\",500,500);return false;'>点击设置多级下拉选项</a>", dF);
        }
    }
    if (dH) {
        var cf = document.createElement("div");
        cf.style.clear = "both";
    }
    var dI = false;
    for (var dt = 0; dt < questionHolder.length; dt++) {
        var L = questionHolder[dt].dataNode;
        if (L._type == "cut" || L._type == "page") {
            continue;
        }
        var dQ = L._topic;
        if (dQ - this.dataNode._topic < 0 && L._type == "check") {
            dI = true;
            break;
        } else {
            if (dQ - this.dataNode._topic >= 0) {
                break;
            }
        }
    }
    if (ax || w) {
        var bl = document.createElement("div");
        bl.style.position = "relative";
        bl.style.zIndex = "1";
        if (ax) {
            cf.appendChild(bl);
            bl.style.width = "315px";
            if (bQ) {
                bl.style.width = "385px";
            }
            if (newQType == 5) {
                if (cM != 202 && cM < 300) {
                    bl.style.display = "none";
                } else {
                    if (cM > 300) {
                        bl.style.width = "199px";
                        if (cM != 303) {
                            bl.style.width = "229px";
                        }
                    }
                }
            }
        } else {
            cZ.appendChild(bl);
        }
        var c5 = document.createElement("div");
        bl.appendChild(c5);
        c5.className = "matrixtitle";
        c5.style.width = "315px";
        if (bQ) {
            c5.style.width = "186px";
            if (newQType == 5) {
                c5.style.display = "none";
            }
        } else {
            if (cM == 202 && newQType == 5) {
                c5.style.display = "none";
            }
        }
        if (w) {
            bl.style.width = "400px";
            var cd = $ce("div", "可分配的总比重值：", c5);
            cd.style.marginBottom = "10px";
            var cG = control_text("3");
            cG.style.height = "20px";
            cG.maxLength = 3;
            cG.style.overflow = "auto";
            cG.value = this.dataNode._total || "100";
            cd.appendChild(cG);
            cG.onchange = cG.onblur = function () {
                if (isInt(this.value) && parseInt(this.value) > 0) {
                    cq.dataNode._total = parseInt(this.value);
                } else {
                    cq.dataNode._total = 100;
                    show_status_tip("可分配总比重值要大于0", 4000);
                }
                this.value = cq.dataNode._total;
            };
        }
        var bb = ax ? "行标题" : "比重评估项目";
        if (bQ) {
            bb = "行标题";
        }
        var bY = bQ ? "16" : "30";
        var d5 = "7";
        if (isMergeAnswer && !this.isMergeNewAdded) {
            a4 = "";
        }
        if (!dI) {
            a4 = "";
        }
        var b2 = $ce("div", "<span style='float:left;'><b>" + bb + "</b></span>", c5);
        b2.className = "matrixhead";
        b2.style.paddingLeft = "4px";
        if (ax && !bQ) {
            var bh = $ce("span", "", b2);
            bh.className = "spanRight";
            bh.style.paddingRight = "20px";
            var c6 = control_check();
            bh.appendChild(c6);
            var br = $ce("span", "右行标题", bh);
            c6.checked = o._rowtitle2 ? true : false;
        }
        $ce("div", "", b2).className = "divclear";
        var d4 = control_textarea(d5, bY);
        d4.style.overflow = "auto";
        d4.tabIndex = 1;
        d4.value = this.dataNode._rowtitle;
        d4.style.padding = "2px";
        d4.style.height = "172px";
        if (cM == "301" || cM == "302" || cM == "201" || cM == "202") {
            d4.style.height = "154px";
            if (cM == "201" || cM == "202") {
                d4.style.width = "308px";
            }
        }
        if (!w) {
            d4.style.marginTop = "7px";
            if (cM == "102") {
                d4.style.height = "136px";
            }
        } else {
            d4.style.width = "308px";
            d4.style.height = "154px";
        }
        if (!isMergeAnswer || this.isMergeNewAdded) {
            d4.title = "相当于每个小题的标题";
        } else {
            d4.oldLen = d4.value.split("\n").length;
            d4.oldValue = d4.value;
            d4.title = "特别提示：有答卷的情况下只能修改文字，不能增加或删除行标题，也不能移动行标题顺序";
            d4.onclick = function () {
                if (!d4.alert) {
                    alert(d4.title);
                    d4.alert = true;
                }
            };
            d4.onkeypress = function (i) {
                var i = i || window.event;
                if (i.keyCode == 13) {
                    alert("有答卷的情况下不能添加新行，只能修改文字内容！");
                    if (i.preventDefault) {
                        i.preventDefault();
                    }
                    if (i.returnValue !== undefined) {
                        i.returnValue = false;
                    }
                    event.keyCode = 0;
                    return false;
                }
            };
        }
        c5.appendChild(d4);
        this.checkRowTitle = function () {
            this.popHint("");
            var dw = "";
            d4.value = replace_specialChar(d4.value);
            if (trim(d4.value) == "") {
                d4.value = "外观\n功能";
            }
            var eb = d4.value.split("\n");
            var ea = 0;
            for (var d9 = 0; d9 < eb.length; d9++) {
                if (trim(eb[d9]) != "") {
                    if (ea > 0) {
                        dw += "\n";
                    }
                    dw += eb[d9];
                    ea++;
                }
                for (var d8 = d9 + 1; d8 < eb.length; d8++) {
                    if (trim(eb[d9]) != "" && trim(eb[d9]) == trim(eb[d8])) {
                        this.popHint(bb + "的第" + (d9 + 1) + "行与第" + (d8 + 1) + "行重复，请修改！");
                        this.isRowTitleValid = false;
                        return false;
                    }
                }
            }
            var ec = dw.split("\n").length;
            if (d4.oldLen && ec != d4.oldLen) {
                if (!confirm("有答卷的情况下不能增加或删除行标题，只能修改文字内容！\r\n是否还原为初始状态的值？")) {
                    this.isRowTitleValid = false;
                    return false;
                }
                dw = d4.oldValue;
            }
            this.isRowTitleValid = true;
            d4.value = dw;
            this.dataNode._rowtitle = dw;
            return true;
        };
        d4.onfocus = function () {
            if (this.value == "外观\n功能") {
                this.value = "";
            }
        };
        d4.onblur = function () {
            if (!this.value) {
                this.value = "外观\n功能";
            }
            var i = cq.checkRowTitle();
            if (w) {
                cq.createSum();
            } else {
                if (ax && i) {
                    cq.updateItem();
                    if (cq.refreshSelRow) {
                        cq.refreshSelRow();
                    }
                }
            }
        };
        if (ax && !bQ) {
            var bC = document.createElement("div");
            bC.style.display = c6.checked ? "" : "none";
            bC.style.width = "159px";
            bC.className = "spanLeft matrixhead";
            bl.appendChild(bC);
            var cr = control_check();
            var W = $ce("div", "", bC);
            W.appendChild(cr);
            $ce("span", "右行标题(可选)", W);
            cr.checked = c6.checked;
            c6.onclick = cr.onclick = function () {
                bC.style.display = this.checked ? "" : "none";
                d4.style.width = this.checked ? "150px" : "290px";
                if (!this.checked && (cM == "201" || cM == "202")) {
                    d4.style.width = "308px";
                }
                c5.style.width = this.checked ? "156px" : "315px";
                aN.style.display = this.checked ? "" : "none";
                c6.style.display = this.checked ? "none" : "";
                br.style.display = this.checked ? "none" : "";
                c6.checked = cr.checked = this.checked;
                if (!this.checked) {
                    dk.prevValue = dk.value;
                    dk.value = "";
                } else {
                    if (!dk.value) {
                        dk.value = dk.prevValue || "";
                    }
                }
                dk.onblur();
            };
            var dk = control_textarea("7", "14");
            bC.appendChild(dk);
            dk.style.overflow = "auto";
            dk.value = this.dataNode._rowtitle2 || "";
            dk.title = "适用于“语义差异法”等场景";
            dk.style.padding = "2px";
            dk.style.margin = "7px 0 0 4px";
            if (cM != "201" && cM != "202") {
                dk.style.height = "172px";
                if (cM == "102") {
                    dk.style.height = "136px";
                }
            } else {
                dk.style.marginLeft = "10px";
            }
            this.checkRowTitle2 = function () {
                if (ax) {
                    dk.value = replace_specialChar(dk.value);
                    this.dataNode._rowtitle2 = dk.value;
                }
                return true;
            };
            dk.onblur = function () {
                cq.checkRowTitle2();
                cq.updateItem();
            };
        }
        if (bQ) {
            var b = document.createElement("div");
            setFloat(b);
            if (cM == "303") {
                b.style.width = "199px";
            } else {
                b.style.width = "186px";
                if (newQType == 5) {
                    b.style.width = "226px";
                }
            }
            bl.appendChild(b);
            $ce("div", "<b>列标题</b>&nbsp;", b).className = "matrixhead";
            var aS = control_textarea("7", "17");
            aS.style.overflow = "auto";
            aS.value = this.dataNode._columntitle;
            aS.style.margin = "0px";
            aS.style.height = "172px";
            if (bQ && cM != "303") {
                aS.style.height = "154px";
                if (newQType == 5) {
                    aS.style.width = "220px";
                }
            }
            aS.style.padding = "2px";
            aS.style.margin = "7px 0 0 4px";
            if (newQType == 5 && cM != "303") {
                aS.style.margin = "0";
            }
            if (!isMergeAnswer || this.isMergeNewAdded) {
                aS.title = "列标题";
            } else {
                aS.disabled = true;
                aS.title = "提示：部分修改问卷模式下不能更改列标题！";
            }
            b.appendChild(aS);
            aS.onblur = function () {
                var i = cq.checkColumnTitle();
                if (i) {
                    cq.updateItem();
                    if (cq.refreshSelRow) {
                        cq.refreshSelRow();
                    }
                }
            };
            this.checkColumnTitle = function () {
                this.popHint("");
                if (trim(aS.value) == "") {
                    this.popHint("列标题不能为空！");
                    aS.focus();
                    this.isColumnTitleValid = false;
                    return false;
                } else {
                    var d9 = aS.value.split("\n");
                    for (var d8 = 0; d8 < d9.length; d8++) {
                        for (var dw = d8 + 1; dw < d9.length; dw++) {
                            if (trim(d9[d8]) != "" && trim(d9[d8]) == trim(d9[dw])) {
                                this.popHint("列标题的第" + (d8 + 1) + "行与第" + (dw + 1) + "行重复，请修改！");
                                this.isColumnTitleValid = false;
                                return false;
                            }
                        }
                    }
                }
                this.isColumnTitleValid = true;
                aS.value = replace_specialChar(aS.value);
                this.dataNode._columntitle = aS.value;
                return true;
            };
        }
        $ce("div", "", bl).className = "divclear";
        this.addLabel = function () {
            var i = "\n【标签】标签名";
            var j = d4.value.length;
            d4.focus();
            if (typeof document.selection != "undefined") {
                document.selection.createRange().text = i;
            } else {
                d4.value = d4.value.substr(0, d4.selectionStart) + i + d4.value.substring(d4.selectionEnd, j);
            }
            d4.onblur();
        };
        var J = $ce("div", "<a href='javascript:;' onclick='cur.addLabel();return false;' class='link-U666'>插入标签</a>&nbsp;&nbsp;" + a4, bl);
        J.style.margin = "12px 0 8px";
        if (newQType == 5) {
            J.style.display = "none";
        }
        if (ax) {
            var c9 = control_check();
            c9.className = "checkbox";
            c9.id = "rowrn_" + o._topic + "_" + RndNum(10);
            c9.onclick = function () {
                if (!vipUser) {
                    alert("只有企业版用户才能设置行标题随机，请升级！");
                    this.checked = false;
                    return;
                }
                cq.dataNode._randomRow = this.checked;
            };
            c9.checked = cq.dataNode._randomRow;
            var ab = document.createElement("label");
            ab.setAttribute("for", c9.id);
            ab.innerHTML = "行标题随机&nbsp;";
            ab.title = "标题随机显示";
            J.appendChild(c9);
            J.appendChild(ab);
        }
        if (bQ) {
            var c4 = "&nbsp;&nbsp;<a href='javascript:;' class='link-U666' onclick='cur.changeRowColumnTitle();return false;'>交换行列</a>";
            var ac = $ce("span", c4, J);
            ac.onmouseover = function () {
                toolTipLayerTop.style.width = "180px";
                toolTipLayerTop.innerHTML = "交换行标题与列标题的位置";
                sb_setmenunav(toolTipLayerTop, true, this);
            };
            ac.onmouseout = function () {
                sb_setmenunav(toolTipLayerTop, false);
            };
            this.changeRowColumnTitle = function () {
                if (isMergeAnswer && !this.isMergeNewAdded) {
                    show_status_tip("在部分修改问卷模式下，不能“交换行列”", 5000);
                    return false;
                }
                if (!window.confirm("确定交换行标题与列标题的位置吗？")) {
                    return;
                }
                var i = this.dataNode._rowtitle;
                this.dataNode._rowtitle = this.dataNode._columntitle;
                this.dataNode._columntitle = i;
                d4.value = this.dataNode._rowtitle;
                aS.value = cur.dataNode._columntitle;
                this.updateItem();
            };
        }
        bl.appendChild(X);
        X.appendChild(dU);
        if (ax) {
            var dL = document.createElement("div");
            dL.style.margin = "8px 0 5px";
            $ce("span", "最小值：", dL);
            var cj = control_text("3");
            cj.title = "用户可以选择的最小值";
            cj.maxLength = 3;
            cj.value = this.dataNode._minvalue;
            dL.appendChild(cj);
            cj.onchange = cj.onblur = function () {
                var i = this.value;
                if (!isEmpty(this.value) || cq.dataNode._tag == "202") {
                    if (!isInt(this.value) || this.value - au.value > 0) {
                        show_status_tip("最小值不合法", 4000);
                        i = (0 - au.value < 0) ? 0 : toInt(au.value) - 1;
                        if (parseInt(i) != i) {
                            i = 0;
                        }
                    } else {
                        i = toInt(this.value);
                    }
                }
                this.value = cq.dataNode._minvalue = i;
                cq.updateItem();
                if (cq.updateSpanCheck) {
                    cq.updateSpanCheck();
                }
            };
            var dc = $ce("span", "最大值：", dL);
            dc.style.marginLeft = "60px";
            var au = control_text("3");
            au.title = "用户可以选择的最大值";
            au.maxLength = 3;
            if (this.dataNode._tag == "301") {
                cj.maxLength = au.maxLength = 12;
                dc.style.marginLeft = "10px";
                var b9 = "40px";
                if (newQType == 5) {
                    b9 = "25px";
                }
                cj.style.width = au.style.width = b9;
            }
            au.value = this.dataNode._maxvalue;
            dL.appendChild(au);
            if (this.dataNode._tag == "301") {
                if (newQType != 5) {
                    $ce("span", "&nbsp;&nbsp;", dL);
                }
                var dZ = control_check();
                dL.appendChild(dZ);
                dZ.id = "cdt_" + this.dataNode._topic + "_" + RndNum(10);
                dZ.className = "checkbox";
                if (newQType != 5) {
                    $ce("label", "允许小数", dL).setAttribute("for", dZ.id);
                }
                dZ.checked = this.dataNode._digitType == 1;
                dZ.onclick = function () {
                    cq.dataNode._digitType = this.checked ? 1 : 0;
                };
                if (newQType == 5) {
                    dZ.style.display = "none";
                }
            }
            dL.style.display = (this.dataNode._tag == "202" || this.dataNode._tag == "301") ? "" : "none";
            au.onchange = au.onblur = function () {
                var i = this.value;
                if (!isEmpty(this.value) || cq.dataNode._tag == "202") {
                    if (!isInt(this.value) || this.value - cj.value < 0) {
                        show_status_tip("最大值不合法", 4000);
                        i = (10 - cj.value > 0) ? 10 : toInt(cj.value) + 1;
                        if (parseInt(i) != i) {
                            i = 10;
                        }
                    } else {
                        i = toInt(this.value);
                    }
                }
                this.value = cq.dataNode._maxvalue = i;
                cq.updateItem();
                if (cq.updateSpanCheck) {
                    cq.updateSpanCheck();
                }
            };
            bl.appendChild(dL);
        }
    }
    if (dH) {
        $ce("div", "", cZ).style.paddingTop = "10px";
        var dM = document.createElement("div");
        dM.style.margin = "12px 0 5px";
        if (P || cI) {
            dM.style.display = "none";
        }
        var c1 = $ce("div", "", dM);
        if (aD || aY) {
            var bJ = document.createElement("span");
            bJ.className = "spanRight";
            c1.appendChild(bJ);
            var bi = "<ul class='likertImageTypeList' style='display:inline;margin:0;' ><li>&nbsp;&nbsp;<b>样式：</b></li>";
            if (ax) {
                bi += "<li class='design-icon design-offr' onclick='cur.set_likertMode(101,this);' style='background:url(/images/radio.gif) no-repeat;height:16px;width:18px;'></li>";
            } else {
                bi += "<li style='font-size:16px;'><a style='height:24px;line-height:24px;' href='javascript:' onclick='cur.set_likertMode(1,this);return false;'><b>123</b></a></li> <li class='design-icon design-offr' style='background:url(/images/radio.gif) no-repeat;height:16px;width:18px;' onclick='cur.set_likertMode(101,this);'></li>";
            }
            bi += "<li class='off2' onclick='cur.set_likertMode(2,this);' style='margin-top:-3px;'></li>";
            bi += "<li  class='off3' onclick='cur.set_likertMode(3,this);' style='margin-top:-3px;'></li>";
            bi += "<li  class='off4' onclick='cur.set_likertMode(4,this);' style='margin-top:-3px;'></li>";
            bi += "<li class='design-icon design-off6' onclick='cur.set_likertMode(6,this);' style='margin-top:-3px;'></li>";
            bi += "<li style='clear:both;'></li>";
            bi += "</ul>";
            bJ.innerHTML = bi;
            this.set_likertMode = function (j, ed) {
                var ec = this.dataNode._tag < 102;
                var eb = this.dataNode._tag;
                this.dataNode._tag = j;
                this.createTableRadio(true);
                if (this.prevModeObj) {
                    if (this.prevMode == 6) {
                        this.prevModeObj.className = "design-icon design-off6";
                    } else {
                        if (this.prevMode == 101) {
                            this.prevModeObj.style.backgroundPosition = "0 0px";
                        } else {
                            this.prevModeObj.className = "off" + this.prevMode;
                        }
                    }
                    this.prevModeObj = null;
                }
                if (j == 2 || j == 3 || j == 4 || j == 6) {
                    if (j == 6) {
                        ed.className = "design-icon design-off6 design-on6";
                    } else {
                        ed.className = "on" + j;
                    }
                    this.prevModeObj = ed;
                    this.prevMode = j;
                } else {
                    if (j == 101) {
                        ed.style.backgroundPosition = "0 -16px";
                        this.prevModeObj = ed;
                        this.prevMode = j;
                    }
                }
                if (this.dataNode._type == "matrix") {
                    dM.style.display = j > 200 ? "none" : "";
                    bS.style.display = dM.style.display;
                    if (ec && j > 101) {
                        T.disabled = false;
                        T.checked = false;
                        T.onclick();
                        this.dataNode._hasvalue = false;
                    } else {
                        if (!ec && j < 102) {
                            T.checked = true;
                            T.onclick();
                            T.disabled = true;
                            this.dataNode._hasvalue = true;
                        }
                    }
                    var d8 = false;
                    if (eb == 101 && j < 101) {
                        var dw = this.option_radio;
                        for (var ea = 1; ea < dw.length; ea++) {
                            var d9 = dw[ea].get_item_tb();
                            if (d9.checked) {
                                d9.checked = false;
                                d9.onclick();
                                d9.checked = false;
                                d8 = true;
                            }
                        }
                    }
                    if (d8) {
                        show_status_tip("提示：图标样式的量表不支持填空属性，已经取消设置！", 4000);
                    }
                    T.disabled = j > 101 ? false : true;
                    if (!isMergeAnswer || this.isMergeNewAdded) {
                        cw.style.display = j > 101 ? "none" : "";
                    }
                    if (j == 202) {
                        dL.style.display = "";
                        this.dataNode._minvalue = this.dataNode._minvalue || 0;
                        this.dataNode._maxvalue = this.dataNode._maxvalue || 10;
                        this.dataNode._rowwidth = this.dataNode._rowwidth || 100;
                        rowwidth_text.value = rowwidth_text.value || 100;
                    } else {
                        dL.style.display = "none";
                    }
                }
            };
            if (isMergeAnswer && !this.isMergeNewAdded && this.dataNode._tag > 101) {
                bJ.style.display = "none";
            }
        }
        if (((aY) || ax) && (!isMergeAnswer || this.isMergeNewAdded)) {
            var cw = $ce("span", "", c1);
            cw.className = "spanRight";
            var ct = document.createElement("span");
            var bX = "<select onchange='cur.set_likert_num(this);'>";
            var q = o._select.length - 1;
            for (var dt = 2; dt <= 11; dt++) {
                var bV = "";
                if (dt == q) {
                    bV = " selected='selected' ";
                }
                var cz = dt + "级量表";
                if (dt == 11) {
                    cz = "NPS量表";
                }
                bX += "<option" + bV + " value='" + dt + "'>" + cz + "</option>";
            }
            bX += "</select>";
            ct.innerHTML += bX;
            this.set_likert_num = function (ea) {
                var eb = ea.value;
                var d8 = cO.length - 1;
                var dw = eb == "11";
                var j = 1;
                if (dw) {
                    j = 0;
                }
                for (var i = 0; i < eb; i++) {
                    cO[d8 + i].get_item_add().onclick();
                    cO[d8 + i + 1].get_item_title().value = i + j;
                    cO[d8 + i + 1].get_item_value().value = i + j;
                }
                for (var i = 1; i < d8 + 1; i++) {
                    cO[1].get_item_del().onclick();
                }
                if (!aD) {
                    var d9 = "非常不满意";
                    var ec = "非常满意";
                    if (dw) {
                        d9 = "不可能";
                        ec = "极有可能";
                    }
                    cO[1].get_item_title().value = d9;
                    cO[cO.length - 1].get_item_title().value = ec;
                }
                cO[1].get_item_title().onchange();
                if (dw) {
                    this.dataNode._tag = "6";
                    this.createTableRadio(true);
                }
                this.popHint("");
                window.focus();
            };
            cw.appendChild(ct);
            if (ax && this.dataNode._tag > 101) {
                cw.style.display = "none";
            }
        }
        if (cn == "radio" || cn == "check") {
            if (dE) {
                cf.style.width = "100%";
            } else {
                if (cM) {
                    cf.style.width = "100%";
                } else {
                    if (bH) {
                        cf.style.width = "100%";
                    } else {
                        if (P) {
                            cf.style.width = "100%";
                        } else {
                            if (cI) {
                                cf.style.width = "100%";
                            } else {
                                if (d2) {
                                    if (cn == "radio") {
                                        cf.style.width = "100%";
                                    } else {
                                        cf.style.width = "100%";
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (cn == "matrix") {
                if (cM == "201" || cM == "202" || cM == "301" || cM == "302") {
                    cf.style.width = "400px";
                }
                if (cM == "301" || cM == "302") {
                    cf.style.width = "500px";
                }
            } else {
                cf.style.width = "75%";
            }
        }
        if (!ax) {
            dM.appendChild(X);
            X.appendChild(dU);
        }
        this.setNotNewAdd = function () {
            if (!cq.newAddQ) {
                return;
            }
            cP.style.display = "";
            cq.newAddQ = false;
            bS.style.display = "";
        };
        this.addNewItem = function () {
            var i = cO.length;
            cO[i - 1].get_item_add().onclick();
        };
        var bS = $ce("div", "", cf);
        bS.style.textAlign = "center";
        if (!aD) {
            var bD = $ce("div", "", bS);
            bD.className = "choise_bg";
        }
        var aX = document.createElement("table");
        aX.className = "tableoption";
        aX.cellSpacing = "0";
        aX.cellPadding = "0";
        aX.width = "98%";
        var ci = aX.insertRow(-1);
        cO[0] = ci;
        var a8 = !o._tag && !d2 && (o._type == "check" || o._type == "radio" || o._type == "radio_down");
        var F = ci.insertCell(-1);
        F.style.width = "300px";
        if (bH) {
            F.style.width = "380px";
        } else {
            if (a8 && cn == "check") {
                F.style.width = "250px";
            } else {
                if (o._type == "radio" && d2) {
                    F.style.width = "250px";
                } else {
                    if (ax && cn == "matrix") {
                        F.style.width = "80px";
                    }
                }
            }
        }
        F.style.paddingRight = "20px";
        if (ax && cM && cM <= 101) {
            F.style.width = "80px";
        }
        if (dE) {
            F.style.width = "400px";
        }
        if (ax && (cM == "303" || cM == "103" || cM == "102")) {
            F.style.width = "120px";
        }
        var dr = $ce("span", "", F);
        if (cI) {
            dr.innerHTML = "商品名称";
        } else {
            var dD = $ce("a", "选项文字<i class='design-icon design-ctext'>", dr);
            dD.title = "交换选项文字";
            dD.style.color = "#222";
            dD.style.textDecoration = "none";
            dD.href = "javascript:;";
            dD.onclick = function () {
                if (isMergeAnswer && !cur.isMergeNewAdded) {
                    show_status_tip("提示：在部分修改问卷模式下，不允许交换选项文字", 4000);
                    return false;
                }
                var d9 = false;
                var j = false;
                if (aY || aD || d2 || cM == 303) {
                    j = true;
                }
                if (j && confirm("是否同时交换选项分数？")) {
                    d9 = true;
                }
                var d8 = 1;
                var i = cO.length - 1;
                while (d8 < i) {
                    var dw = cO[i].get_item_title().value;
                    cO[i].get_item_title().value = cO[d8].get_item_title().value;
                    cO[d8].get_item_title().value = dw;
                    if (d9) {
                        dw = cO[i].get_item_value().value;
                        cO[i].get_item_value().value = cO[d8].get_item_value().value;
                        cO[d8].get_item_value().value = dw;
                        if (cO[i].get_item_novalue()) {
                            dw = cO[i].get_item_novalue().checked;
                            cO[i].get_item_novalue().checked = cO[d8].get_item_novalue().checked;
                            cO[d8].get_item_novalue().checked = dw;
                        }
                    }
                    d8++;
                    i--;
                }
                cur.updateItem();
                return false;
            };
        }
        var d1 = bu || (a8 && !d2 && !P && !cI && !bH);
        if (d2 || (a8 && o._type != "radio_down" && !P) || dE) {
            var at = ci.insertCell(-1);
            var dP = "图片";
            imgwidth = "30px";
            if (cI) {
                dP = "商品图片";
                imgwidth = "60px";
            }
            $ce("span", dP, at);
            at.style.width = imgwidth;
            at.align = "center";
        }
        if (d2 || (a8 && o._type != "radio_down" && !cI)) {
            var cW = ci.insertCell(-1);
            var bB = "说明";
            var c7 = "50px";
            if (P) {
                bB = "情景说明";
                c7 = "60px";
            }
            var b4 = $ce("div", d1 ? "" : bB, cW);
            cW.style.width = c7;
            b4.style.overflow = "hidden";
            b4.style.textAlign = "center";
            if (d1) {
                var bW = $ce("span", bB, b4);
                var bA = $ce("span", "", b4);
                bW.href = "javascript:;";
                bA.className = "explain-icon";
                bA.style.display = "none";
                cq.setDisplayDesc = function (i) {
                    i.parentNode.parentNode.getElementsByTagName("input")[1].style.display = i.checked ? "" : "none";
                    this.dataNode._displayDesc = i.checked;
                    this.updateItem();
                    if (b4.onmouseout) {
                        b4.onmouseout();
                        b4.onmouseover();
                    }
                };
                cq.setDisplayDescTxt = function (i) {
                    this.dataNode._displayDescTxt = i.value;
                    this.updateItem();
                };
                cq.showDesc = function () {
                    var d8 = false;
                    var dw = this.dataNode._select;
                    for (var j = 1; j < dw.length; j++) {
                        if (dw[j]._item_desc) {
                            d8 = true;
                        }
                    }
                    bA.style.display = d8 ? "" : "none";
                    if (d8) {
                        b4.onmouseover = function () {
                            toolTipLayerMenu.style.width = "300px";
                            var ef = "";
                            var ec = "display:none;";
                            if (cq.dataNode._displayDesc) {
                                ef = ' checked="checked"';
                                ec = "";
                            }
                            var ed = cq.dataNode._select;
                            var eb = false;
                            for (var ea = 1; ea < ed.length; ea++) {
                                if (ed[ea]._item_img) {
                                    eb = true;
                                }
                            }
                            var ee = cq.dataNode._displayDescTxt || "";
                            var d9 = "";
                            if (bu && eb) {
                                cq.dataNode._displayDesc = true;
                                d9 = " style='display:none;'";
                            }
                            toolTipLayerMenu.innerHTML = '<div style="height:38px;line-height:38px;"><span' + d9 + '><input type="checkbox"' + ef + '" tabindex="-1" onclick="cur.setDisplayDesc(this);">点击说明后弹出</span>&nbsp;<input style="width:130px; height: 20px;' + ec + '" type="text" class="choicetxt" value="' + ee + '" placeholder="自定义查看详情文字" onblur="cur.setDisplayDescTxt(this);"/></div>';
                            sb_setmenunav(toolTipLayerMenu, true, this);
                        };
                        b4.onmouseout = function () {
                            sb_setmenunav(toolTipLayerMenu, false, this);
                        };
                    }
                };
                cq.showDesc();
            }
        }
        if ((a8 && o._type != "radio_down") || (ax && (cM == "102" || cM == "103" || cM == "101" || cM < 101)) || d2 || dE) {
            var c8 = ci.insertCell(-1);
            c8.style.letterSpacing = "1px";
            var aq = $ce("span", "允许填空", c8);
            c8.style.width = "70px";
            c8.align = "center";
            if (bH || P || cI) {
                c8.style.display = "none";
            }
        }
        var aA = ci.insertCell(-1);
        if (!bH && !bQ && !P) {
            aA.style.width = "110px";
        }
        if (cI) {
            aA.style.width = "60px";
        }
        var bk = $ce("span", "", aA);
        var T = control_check();
        T.title = "给选项设置分数，可用于Likert量表或者测试类型的问卷";
        bk.appendChild(T);
        var c0 = $ce("span", "", bk);
        c0.innerHTML = "&nbsp;分数<span class='bordCss bordBottomCss' style='border-color:#333 transparent transparent;'></span>";
        c0.style.cursor = "pointer";
        if (P) {
            c0.innerHTML = "数量限制";
        } else {
            if (cI) {
                c0.innerHTML = "商品价格";
            }
        }
        if (aY || aD || d2 || cM == 303) {
            T.style.display = "none";
            bk.onmouseover = function () {
                openValWindow(cq, this);
            };
            bk.onmouseout = function () {
                sb_setmenunav(toolTipLayer, false);
            };
        } else {
            if (!P && !cI) {
                aA.style.display = "none";
            } else {
                T.style.display = "none";
            }
        }
        T.onclick = function () {
            if (cq.dataNode._isCeShi) {
                return;
            }
            if (this.checked) {
                for (var i = 1; i < cO.length; i++) {
                    cO[i].get_item_value().parentNode.style.display = "";
                }
            } else {
                for (var i = 1; i < cO.length; i++) {
                    cO[i].get_item_value().parentNode.style.display = "none";
                }
            }
            cq.dataNode._hasvalue = this.checked;
        };
        if (cI) {
            var bx = ci.insertCell(-1);
            bx.innerHTML = "总库存";
            bx.style.width = "50px";
        }
        if (cn == "check" && !bH && !dE && !d2 && !cI) {
            var bw = ci.insertCell(-1);
            bw.style.width = "45px";
            bw.align = "center";
            var N = $ce("span", "&nbsp;", bw);
            var bF = $ce("span", "互斥", N);
            bF.title = "与其它选项互斥";
            N.appendChild(bF);
        }
        var b5 = ci.insertCell(-1);
        if (a8 && !P && !cI) {
            var bc = $ce("span", "", b5);
            b5.style.width = "30px";
            var bR = $ce("span", "", bc);
            bR.innerHTML = "默认";
            if (bH) {
                b5.style.width = "55px";
                bR.innerHTML = "正确答案";
                b5.align = "center";
            }
            this.defaultCheckSet = function () {
                if (this.dataNode._isCeShi) {
                    return;
                }
            };
        } else {
            b5.style.display = "none";
        }
        var a0 = ci.insertCell(-1);
        a0.align = "center";
        a0.style.width = "98px";
        $ce("span", "操作", a0);
        if (be) {
            for (var ds = 1; ds < o._select.length; ds++) {
                cO[ds] = new creat_item(cq, ds, aX, "check", false, o._select[ds]);
            }
        } else {
            for (var ds = 1; ds < o._select.length; ds++) {
                cO[ds] = new creat_item(cq, ds, aX, "radio", false, o._select[ds]);
            }
        }
        this.checkItemTitle = function () {
            this.popHint("");
            var i = true;
            if (!this.checkEmptyItem()) {
                return false;
            }
            if (!this.checkRepeatItem()) {
                return false;
            }
            this.isItemTitleValid = true;
            return true;
        };
        this.checkEmptyItem = function () {
            var d8 = true;
            for (var j = 1; j < cO.length; j++) {
                var dw = cO[j].get_item_title();
                if (trim(dw.value) == "") {
                    if (dw.initText) {
                        dw.value = dw.initText;
                    } else {
                        this.popHint("选项不能为空！");
                        d8 = false;
                        this.isItemTitleValid = false;
                    }
                }
            }
            return d8;
        };
        this.checkRepeatItem = function () {
            var eb = true;
            for (var d9 = 1; d9 < cO.length; d9++) {
                var d8 = cO[d9].get_item_title();
                if (d8._oldBorder || d8._oldBorder == "") {
                    d8.style.border = d8._oldBorder;
                    d8.title = d8._oldTitle;
                }
                for (var dw = d9 + 1; dw < cO.length; dw++) {
                    if (trim(cO[d9].get_item_title().value) == trim(cO[dw].get_item_title().value)) {
                        var ea = cO[dw].get_item_title();
                        d8.rel = ea;
                        ea.rel = d8;
                        this.popHint("第" + d9 + "个选项与第" + dw + "个选项重复，请修改！");
                        eb = false;
                        this.isItemTitleValid = false;
                        return false;
                    }
                }
            }
            return eb;
        };
        this.checkItemValue = function () {
            var d8 = true;
            if (T.checked) {
                for (var dw = 1; dw < cO.length; dw++) {
                    var j = trim(cO[dw].get_item_value().value);
                    if (j == "") {
                        if (!cO[dw].get_item_novalue() || !cO[dw].get_item_novalue().checked) {
                            cO[dw].get_item_value().value = 0;
                        }
                    } else {
                        if (!isInt(j)) {
                            this.popHint("选项的分数不合法，请修改！");
                            d8 = false;
                        }
                    }
                }
            }
            this.isItemValueValid = d8;
            return d8;
        };
        this.checkCeShiSet = function () {
            if (!this.dataNode._isCeShi) {
                return true;
            }
            var j = false;
            for (var i = 1; i < o._select.length; i++) {
                if (o._select[i]._item_radio) {
                    j = true;
                }
            }
            if (!j) {
                this.popHint("请设置此题的正确答案");
            }
            this.isCeShiValid = j;
            return j;
        };
        for (var dt = 0; dt < ci.cells.length; dt++) {
            ci.cells[dt].style.padding = "3px 5px";
        }
        bS.appendChild(aX);
        cZ.appendChild(cf);
        $ce("div", "", cZ).className = "divclear";
        var co = $ce("span", "", c1);
        c1.style.width = "100%";
        if (bH) {
            if (r) {
                c1.style.display = "none";
            }
        }
        co.className = "spanLeft";
        co.style.lineHeight = "28px";
        co.style.margin = "0 0 0 4px";
        if (cK || bH || d2 || bu || (isMergeAnswer && !this.isMergeNewAdded) || ax || !dI) {
            a4 = "";
        }
        var am = "<a href='javascript:' onclick='cur.addNewItem();return false;' class='link-U00a6e6' style='text-decoration:none;'><span class='choiceimg design-icon design-singleadd' ></span><span style='color: #1ea0fa;'>添加选项</span></a>&nbsp;&nbsp;";
        var cu = "25px";
        if (ax && (this.dataNode._tag && this.dataNode._tag <= 101)) {
            cu = "0px";
        }
        var dC = "<a href='javascript:' onclick='PDF_launch(\"oftenoptions.aspx\",540,400);return false;' class='batchadd' title='批量添加选项' style='margin-left:" + cu + "'><span class='choiceimg design-icon design-badd'></span><span style='color: #1ea0fa;'>批量增加</span></a>&nbsp;";
        var c3 = "/wjx/design/batchupload.aspx?activity=" + activityID;
        if (window.uploadQiuniu == 2) {
            c3 = "/wjx/design/batchuploadali.aspx?activity=" + activityID;
        }
        var bn = "<a href='javascript:' onclick='PDF_launch(\"" + c3 + "\",540,250,null,\"批量添加图片\");return false;' class='link-444' style='margin-left:20px;'><span class='choiceimg design-icon design-img' style='margin:0 5px 1px 0;'></span>批量添加图片</a>&nbsp;";
        var dh = am + dC + "&nbsp;" + a4;
        if (bu) {
            dh = dh + bn;
        }
        co.innerHTML = dh;
        if (aY) {
            co.innerHTML = am + dC;
        } else {
            if (ax && (this.dataNode._tag && this.dataNode._tag <= 101)) {
                co.innerHTML = dC;
            }
        }
        if (isMergeAnswer && !this.isMergeNewAdded) {
            co.innerHTML = am;
        }
        var cD = $ce("span", "", c1);
        if ((aM && cM == 0) || (be && !dE)) {
            var dY = null;
            var B = document.createElement("span");
            var az = "";
            var cV = 1;
            if (aM && !d2 && !bH && !bu) {
                az = "<option value='0'>下拉菜单</option>";
                cV = 2;
            }
            B.innerHTML = "<select onchange='cur.checkNumPer(this);' style='width:90px; margin-left:10px'><option value='1'>竖向排列</option>" + az + "<optgroup label='横向排列'><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5</option><option value='6'>6</option><option value='7'>7</option><option value='8'>8</option><option value='9'>9</option><option value='10'>10</option><option value='11'>11</option><option value='12'>12</option><option value='15'>15</option><option value='20'>20</option><option value='30'>30</option></optgroup></select>&nbsp;";
            dY = $$("select", B)[0];
            for (var dt = cV; dt < dY.options.length; dt++) {
                dY.options[dt].text = "每行" + dY.options[dt].value + "列";
            }
            cD.appendChild(B);
            if (dE && dY) {
                B.style.display = "none";
            }
            this.checkNumPer = function (dw) {
                var i = trim(dw.value);
                if (i == 0) {
                    this.selChangeType("radio_down");
                    return;
                }
                this.dataNode._numperrow = parseInt(i);
                this.createTableRadio(true);
                this.focus();
                if (!this.applyNumber) {
                    var j = $ce("span", "<a href='javascript:;' class='copy-tit' title='批量复制此属性到后面的题目' style='font-size:14px;'></a>", cD);
                    j.onclick = function () {
                        var d8 = "/wjx/design/applynumrow.aspx";
                        var d9 = cq.dataNode._topic;
                        d8 += "?ct=" + d9;
                        PDF_launch(d8, 500, 250);
                        return false;
                    };
                    this.applyNumber = true;
                }
            };
            B.style.display = "inline-block";
        }
        cD.className = "spanRight";
        var V = $ce("span", "&nbsp;", c1);
        var bU = control_check();
        bU.className = "checkbox";
        bU.id = "rnd_" + cq.dataNode._topic + "_" + RndNum(10);
        V.appendChild(bU);
        $ce("label", "选项随机", V).setAttribute("for", bU.id);
        V.className = "spanRight";
        V.style.lineHeight = "28px";
        V.style.margin = "0 5px 0 0";
        if (bH) {
            var a = $ce("span", "<a class='copy-tit' onclick='setAllRandom();return false;' href='javascript:'></a>&nbsp;", V);
            a.onmouseover = function () {
                toolTipLayerMenu.style.width = "230px";
                toolTipLayerMenu.innerHTML = "复制此题选项随机设置到后面的题目";
                sb_setmenunav(toolTipLayerMenu, true, this);
            };
            a.onmouseout = function () {
                sb_setmenunav(toolTipLayerMenu, false, this);
            };
            a.style.display = "none";
            this.get_random = function () {
                return bU;
            };
        }
        bU.onclick = function () {
            cq.dataNode._randomChoice = this.checked;
            if (bH) {
                a.style.display = "";
            }
        };
        if (aY || ax) {
            V.style.display = "none";
        }
        if ((be && !bH) || (ax && cM == "102")) {
            var ba = null;
            ba = $ce("span", "", c1);
            $ce("span", "", ba);
            ba.className = "spanRight";
            var cY = document.createElement("span");
            var aO = "<select onchange='cur.limitChange(this);' onclick='cur.lowLimitClick(this);' style='width:95px; margin-right: 10px'>";
            aO += "<option value=''>至少选几项</option>";
            for (var dt = 1; dt < o._select.length; dt++) {
                aO += "<option value='" + dt + "'>至少选" + dt + "项</option>";
            }
            aO += "</select>";
            cY.innerHTML = aO;
            var aQ = document.createElement("span");
            var ad = "<select onchange='cur.limitChange(this);' onclick='cur.upLimitClick(this);' style='width:95px;'>";
            ad += "<option value=''>最多选几项</option>";
            for (var dt = 2; dt < o._select.length; dt++) {
                ad += "<option value='" + dt + "'>最多选" + dt + "项</option>";
            }
            ad += "</select>";
            aQ.innerHTML = ad;
            ba.appendChild(cY);
            ba.appendChild(aQ);
            this.limitChange = function () {
                cq.checkCheckLimit();
                window.focus();
            };
            this.lowLimitClick = function (d8) {
                if (o._select.length - 1 == d8.options.length - 1) {
                    return;
                }
                d8.options.length = 0;
                d8.options.add(new Option("至少选几项", ""));
                for (var dw = 1; dw < o._select.length; dw++) {
                    var j = new Option("至少选" + dw + "项", dw);
                    d8.options.add(j);
                }
            };
            this.upLimitClick = function (d8) {
                if (o._select.length - 1 == d8.options.length) {
                    return;
                }
                d8.options.length = 0;
                d8.options.add(new Option("最多选几项", ""));
                for (var dw = 2; dw < o._select.length; dw++) {
                    var j = new Option("最多选" + dw + "项", dw);
                    d8.options.add(j);
                }
            };
            var dA = o._lowLimit;
            var dT = o._upLimit;
            if (dE) {
                if (!o._lowLimit) {
                    dA = o._lowLimit = o._select.length - 1;
                }
                if (!o._upLimit) {
                    dT = o._upLimit = o._select.length - 1;
                }
                if (o._lowLimit == -1) {
                    dA = "";
                }
                if (o._upLimit == -1) {
                    dT = "";
                }
            }
            $$("select", cY)[0].value = dA || "";
            $$("select", aQ)[0].value = dT || "";
            $ce("span", "&nbsp;&nbsp;", ba);
            this.checkCheckLimit = function () {
                if (be || (ax && cM == "102")) {
                    var j = $$("select", cY)[0].value;
                    var dw = $$("select", aQ)[0].value;
                    var i = cO.length - 1;
                    if (j != "") {
                        if (dw != "" && dw - j < 0) {
                            j = dw;
                            $$("select", cY)[0].value = dw;
                            show_status_tip("要求用户最多选中选项数量不合法！", 4000);
                        }
                        if (!n.checked) {
                            show_status_tip("由于设置了选项数量限制，建议将该题设为必答", 4000);
                        }
                    } else {
                        if (dE) {
                            j = -1;
                        }
                    }
                    if (dw != "") {
                        if (j != "" && dw - j < 0) {
                            dw = j;
                            $$("select", aQ)[0].value = j;
                            show_status_tip("要求用户最多选中选项数量不合法！", 4000);
                        }
                    } else {
                        if (dE) {
                            dw = -1;
                        }
                    }
                    this.dataNode._lowLimit = j;
                    this.dataNode._upLimit = dw;
                    this.updateSpanCheck();
                }
                return true;
            };
        }
        if (bu) {
            var aB = $ce("div", "", dM);
            aB.style.marginTop = "10px";
            var dn = $ce("span", "&nbsp;", aB);
            dn.className = "spanLeft";
            dn.style.lineHeight = "28px";
            var k = control_check();
            var cg = $ce("span", "", dn);
            cg.style.margin = "0 30px 0 0";
            cg.appendChild(k);
            cg.appendChild(document.createTextNode("显示投票数"));
            var dd = control_check();
            var ce = $ce("span", "", dn);
            ce.style.margin = "0 30px 0 0";
            ce.appendChild(dd);
            ce.appendChild(document.createTextNode("显示百分比"));
            k.checked = k.defaultChecked = o._displayNum;
            dd.checked = dd.defaultChecked = o._displayPercent;
            dd.onclick = function () {
                cq.dataNode._displayPercent = this.checked;
                cq.createTableRadio(true);
            };
            k.onclick = function () {
                cq.dataNode._displayNum = this.checked;
                cq.createTableRadio(true);
            };
            var R = $ce("span", "选项宽度：", aB);
            cq.setchoiceWidth = function () {
                var d8 = false;
                for (var dw = 1; dw < cq.dataNode._select.length; dw++) {
                    var j = cq.dataNode._select[dw]._item_img;
                    if (j) {
                        d8 = true;
                        break;
                    }
                }
                R.style.display = d8 ? "none" : "";
                if (B) {
                    B.style.display = d8 ? "none" : "";
                }
            };
            cq.setchoiceWidth();
            R.style.marginLeft = "8px";
            R.className = "spanLeft";
            var dv = "<select onchange='cur.setTWidth(this);'><option value='20'>20%</option><option value='30'>30%</option><option value='40'>40%</option><option value='50'>50%</option><option value='60'>60%</option><option value='70'>70%</option><option value='自定义'>自定义</option></select>&nbsp;";
            R.innerHTML += dv;
            var u = $ce("span", "", R);
            var bT = control_text("3");
            bT.maxLength = 2;
            bT.onchange = bT.onblur = function () {
                var i = this.value;
                if (!isEmpty(i) && !isInt(i)) {
                    show_status_tip("您输入的宽度不合法！");
                    this.value = "";
                    cq.dataNode._touPiaoWidth = 50;
                } else {
                    cq.dataNode._touPiaoWidth = i ? parseInt(i) : "";
                }
                cq.createTableRadio(true);
            };
            this.setTWidth = function (i) {
                if (i.value != "自定义") {
                    bT.value = i.value;
                    u.style.display = "none";
                    bT.onchange();
                } else {
                    u.style.display = "";
                }
            };
            this.initWidth = function () {
                if (this.dataNode._touPiaoWidth) {
                    bT.value = this.dataNode._touPiaoWidth;
                    var d8 = $$("select", R)[0];
                    d8.value = this.dataNode._touPiaoWidth;
                    var j = true;
                    for (var dw = 0; dw < d8.options.length; dw++) {
                        if (d8.options[dw].value == this.dataNode._touPiaoWidth) {
                            j = false;
                            break;
                        }
                    }
                    if (j) {
                        d8.value = "自定义";
                        this.setTWidth(d8);
                    }
                }
            };
            u.appendChild(bT);
            u.appendChild(document.createTextNode("%"));
            u.style.display = "none";
            aB.appendChild(R);
            aB.style.overflow = "hidden";
            $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;<a href='/help/help.aspx?helpid=344&h=1' target='_blank' class='link-U666'style='line-height: 28px;'>如何添加视频或站外链接?</a>", aB).className = "spanRight";
            this.initWidth();
        }
        $ce("div", "", c1).className = "divclear";
        if (ax) {
            bS.appendChild(dM);
        } else {
            cZ.appendChild(dM);
        }
        this.initFreOptions = function (d9) {
            var d8 = "";
            var dw = /^选项\d+$/;
            var j = 0;
            for (var i = 1; i < cO.length; i++) {
                var ea = trim(cO[i].get_item_title().value);
                if (!ea) {
                    continue;
                }
                if (dw.test(ea)) {
                    continue;
                }
                if (j > 0) {
                    d8 += "\n";
                }
                d8 += ea;
                j++;
            }
            if (d8) {
                d9.value = d8 + "\n";
            }
        };
        this.setFreOptions = function (d9) {
            var ea = d9.split("\n");
            if (d9 == "每行一个选项，可以添加多个选项") {
                return;
            }
            var eb = new Array();
            for (var d8 = 0; d8 < ea.length; d8++) {
                if (ea[d8] && trim(ea[d8])) {
                    eb.push(ea[d8]);
                }
            }
            for (var d8 = eb.length; d8 < 2; d8++) {
                eb[d8] = "选项" + (d8 + 1);
            }
            for (var j = 0; j < eb.length; j++) {
                if (cO[j + 1]) {
                    cO[j + 1].get_item_title().value = trim(eb[j]);
                    continue;
                }
                if (be) {
                    cO[j + 1] = new creat_item(this, j + 1, aX, "check", false, null);
                } else {
                    cO[j + 1] = new creat_item(this, j + 1, aX, "radio", false, null);
                }
                cO[j + 1].get_item_title().value = trim(eb[j]);
                cO[j + 1].get_item_value().value = j + 1;
            }
            var dw = cO.length - 1;
            for (var j = dw; j > eb.length; j--) {
                aX.deleteRow(j);
                cO.length = cO.length - 1;
            }
            this.updateItem();
            this.setNotNewAdd();
            setQTopPos(this);
        };
        this.checkTextJump = function (dw) {
            if ((aM || cK) && !cq.dataNode._hasjump && !hasInsPromoteJump) {
                var j = /[一二三四五六七八九\d]+题/;
                var i = j.exec(dw);
                if (i && dw.indexOf("跳") > -1) {
                    hasInsPromoteJump = true;
                    if (window.confirm("您是否需要设置此题的跳题逻辑？")) {
                        aK.onclick();
                    }
                }
            }
        };
        this.updateItem = function (ed) {
            var d9 = true;
            if (this.dataNode._type != "matrix") {
                this.popHint("");
            }
            if (!this.checkItemTitle()) {
                d9 = false;
            }
            if (!this.checkItemValue()) {
                d9 = false;
            }
            if (this.dataNode._type == "matrix" && !this.checkRowTitle()) {
                d9 = false;
            }
            if (!d9) {
                return;
            }
            var ec = this.dataNode;
            var eb = ec._select;
            ec._select = new Array();
            var d8 = !ec._tag && (ec._type == "check" || ec._type == "radio" || ec._type == "radio_down");
            for (var dw = 1; dw < cO.length; dw++) {
                ec._select[dw] = new Object();
                var ea = cO[dw].get_item_title();
                var i = replace_specialChar(trim(ea.value));
                if (i != ea.value) {
                    ea.value = i;
                }
                ec._select[dw]._item_title = ea.value.replace(/\</g, "&lt;");
                ec._select[dw]._item_radio = false;
                if (d8 || ec._isCeShi) {
                    ec._select[dw]._item_radio = cO[dw].get_item_check().checked;
                }
                ec._select[dw]._item_value = trim(cO[dw].get_item_value().value);
                ec._select[dw]._item_jump = "";
                if (eb && eb[dw]) {
                    ec._select[dw]._item_jump = eb[dw]._item_jump || "";
                }
                if (cO[dw].get_item_huchi()) {
                    ec._select[dw]._item_huchi = cO[dw].get_item_huchi().checked;
                }
                ec._select[dw]._item_tb = false;
                ec._select[dw]._item_tbr = false;
                ec._select[dw]._item_img = "";
                ec._select[dw]._item_imgtext = false;
                ec._select[dw]._item_desc = "";
                ec._select[dw]._item_label = "";
                if (ec._type == "matrix" && eb && eb[dw]) {
                    ec._select[dw]._item_max = eb[dw]._item_max || "";
                }
                if (cO[dw].get_item_tb()) {
                    ec._select[dw]._item_tb = cO[dw].get_item_tb().checked;
                }
                if (cO[dw].get_item_tbr()) {
                    ec._select[dw]._item_tbr = cO[dw].get_item_tbr().checked;
                }
                if (cO[dw].get_item_img()) {
                    ec._select[dw]._item_img = cO[dw].get_item_img().value = replace_specialChar(trim(cO[dw].get_item_img().value));
                }
                if (cO[dw].get_item_imgtext()) {
                    ec._select[dw]._item_imgtext = cO[dw].get_item_imgtext().checked;
                }
                if (cO[dw].get_item_desc()) {
                    ec._select[dw]._item_desc = cO[dw].get_item_desc().value = replace_specialChar(trim(cO[dw].get_item_desc().value));
                }
                if (eb && eb[dw]) {
                    ec._select[dw]._item_label = replace_specialChar(eb[dw]._item_label || "");
                }
            }
            if (!this.checkCeShiSet()) {
                return;
            }
            if (!ed) {
                this.createTableRadio(true);
            }
        };
    }
    if (ax || w) {
        var aH = $ce("div", "", cZ);
        aH.style.marginTop = "8px";
        if (ax) {
            var E = $ce("span", "", aH);
            var dv = "<select onchange='cur.setMainWidth(this);'><option value=''>题目总宽度</option><option value='50'>宽度50%</option><option value='60'>宽度60%</option><option value='70'>宽度70%</option><option value='80'>宽度80%</option><option value='90'>宽度90%</option><option value='100'>宽度100%</option><option value='自定义'>宽度自定义</option></select>&nbsp;";
            E.innerHTML += dv;
            var aR = $ce("span", "", E);
            var a2 = control_text("3");
            a2.maxLength = 2;
            a2.onchange = a2.onblur = function () {
                var i = this.value;
                if (!isEmpty(i) && !isInt(i)) {
                    show_status_tip("您输入的宽度不合法！");
                    this.value = "";
                    cq.dataNode._mainWidth = 50;
                } else {
                    cq.dataNode._mainWidth = i ? parseInt(i) : "";
                }
                cq.createTableRadio(true);
            };
            this.setMainWidth = function (i) {
                if (i.value != "自定义") {
                    a2.value = i.value;
                    aR.style.display = "none";
                    a2.onchange();
                } else {
                    aR.style.display = "";
                }
            };
            this.initMainWidth = function () {
                if (this.dataNode._mainWidth) {
                    a2.value = this.dataNode._mainWidth;
                    var d8 = $$("select", E)[0];
                    d8.value = this.dataNode._mainWidth;
                    var j = true;
                    for (var dw = 0; dw < d8.options.length; dw++) {
                        if (d8.options[dw].value == this.dataNode._mainWidth) {
                            j = false;
                            break;
                        }
                    }
                    if (j) {
                        d8.value = "自定义";
                        this.setMainWidth(d8);
                    }
                }
            };
            aR.appendChild(a2);
            aR.appendChild(document.createTextNode("%"));
            aR.style.display = "none";
            if (cM == "102") {
                E.style.display = "none";
            }
        }
        var di = "行标题宽度";
        if (w) {
            di = "行标题宽度";
        }
        var cl = $ce("span", "&nbsp;", aH);
        var cC = "<select onchange='cur.setTWidth(this);'><option value=''>" + di + "</option><option value='10%'>宽度10%</option><option value='15%'>宽度15%</option><option value='20%'>宽度20%</option><option value='30%'>宽度30%</option><option value='40%'>宽度40%</option><option value='50%'>宽度50%</option><option value='自定义'>宽度自定义</option></select>&nbsp;";
        cl.innerHTML += cC;
        var aU = control_text("3");
        aU.maxLength = 3;
        aU.onchange = aU.onblur = function () {
            var i = this.value;
            if (!isEmpty(i) && (!isInt(i) || i - 100 > 0)) {
                show_status_tip("您输入的宽度不合法！");
                this.value = "";
                cq.dataNode._rowwidth = "";
            } else {
                cq.dataNode._rowwidth = i + "%";
                if (cq.dataNode._rowwidth == "%") {
                    cq.dataNode._rowwidth = "";
                }
            }
            if (w) {
                cq.createSum();
            } else {
                if (ax) {
                    cq.updateItem();
                }
            }
            window.focus();
        };
        this.setTWidth = function (i) {
            if (i.value != "自定义") {
                aU.value = i.value.replace("%", "");
                aU.style.display = "none";
                aU.onchange();
            } else {
                aU.style.display = "";
            }
        };
        this.initWidth = function () {
            if (this.dataNode._rowwidth && this.dataNode._rowwidth.indexOf("%") > -1) {
                var i = $$("select", cl)[0];
                i.value = this.dataNode._rowwidth;
                aU.value = this.dataNode._rowwidth.replace("%", "");
                if (i.selectedIndex == -1) {
                    i.value = "自定义";
                    this.setTWidth(i);
                }
            }
        };
        aU.style.display = "none";
        cl.appendChild(aU);
        if (ax) {
            var aN = $ce("span", "&nbsp;", aH);
            aN.style.display = "none";
            var bM = "<select onchange='cur.setTWidth2(this);'><option value=''>右行标题宽度</option><option value='10%'>宽度10%</option><option value='15%'>宽度15%</option><option value='20%'>宽度20%</option><option value='30%'>宽度30%</option><option value='40%'>宽度40%</option><option value='50%'>宽度50%</option><option value='自定义'>宽度自定义</option></select>&nbsp;";
            aN.innerHTML += bM;
            var du = control_text("3");
            du.maxLength = 3;
            du.onchange = du.onblur = function () {
                var i = this.value;
                if (!isEmpty(i) && (!isInt(i) || i - 100 > 0)) {
                    show_status_tip("您输入的宽度不合法！");
                    this.value = "";
                    cq.dataNode._rowwidth2 = "";
                } else {
                    cq.dataNode._rowwidth2 = i + "%";
                    if (cq.dataNode._rowwidth2 == "%") {
                        cq.dataNode._rowwidth2 = "";
                    }
                }
                cq.updateItem();
                window.focus();
            };
            this.setTWidth2 = function (i) {
                if (i.value != "自定义") {
                    du.value = i.value.replace("%", "");
                    du.style.display = "none";
                    du.onchange();
                } else {
                    du.style.display = "";
                }
            };
            this.initWidth2 = function () {
                if (this.dataNode._rowwidth2 && this.dataNode._rowwidth2.indexOf("%") > -1) {
                    var i = $$("select", aN)[0];
                    i.value = this.dataNode._rowwidth2;
                    du.value = this.dataNode._rowwidth2.replace("%", "");
                    if (i.selectedIndex == -1) {
                        i.value = "自定义";
                        this.setTWidth2(i);
                    }
                }
            };
            du.style.display = "none";
            aN.appendChild(du);
        }
        if (ax && (this.dataNode._tag == 102 || this.dataNode._tag == 103)) {
            var cv = control_check();
            cv.className = "checkbox";
            cv.id = "dz_" + this.dataNode._topic + "_" + RndNum(10);
            aH.appendChild(cv);
            var l = $ce("label", "竖向选择", aH);
            l.setAttribute("for", cv.id);
            l.onmouseover = function () {
                toolTipLayerTop.style.width = "330px";
                toolTipLayerTop.innerHTML = "选项太多时可以得到更好的显示效果，只支持电脑端";
                sb_setmenunav(toolTipLayerTop, true, this);
            };
            l.onmouseout = function () {
                sb_setmenunav(toolTipLayerTop, false, this);
            };
            cv.onclick = function () {
                if (cq._referDivQ) {
                    show_status_tip("使用引用逻辑后，不能再使用竖向选择", 5000);
                    return;
                }
                cq.dataNode._daoZhi = this.checked;
                cq.updateSpanMatrix();
                cq.updateItem();
            };
            var x = $ce("a", "交换选项与行", aH);
            x.className = "link-U666";
            x.style.display = "inline-block";
            x.style.marginLeft = "10px";
            x.onmouseover = function () {
                toolTipLayerTop.style.width = "260px";
                toolTipLayerTop.innerHTML = "如果行与选项设置错误，可以进行交换";
                sb_setmenunav(toolTipLayerTop, true, this);
            };
            x.onmouseout = function () {
                sb_setmenunav(toolTipLayerTop, false, this);
            };
            x.href = "javascript:;";
            x.onclick = function () {
                if (isMergeAnswer && !cq.isMergeNewAdded) {
                    show_status_tip("在部分修改问卷模式下，不能“交换选项与行”", 5000);
                    return false;
                }
                if (window.confirm("确定交换行与选项吗？")) {
                    var j = "";
                    var d8 = cq.dataNode._select;
                    for (var i = 1; i < d8.length; i++) {
                        if (i > 1) {
                            j += "\n";
                        }
                        j += d8[i]._item_title;
                    }
                    var dw = d4.value;
                    if (dw) {
                        d4.value = j;
                        cq.checkRowTitle();
                        cq.setFreOptions(dw);
                    }
                }
                return false;
            };
        }
        if (ax && this.dataNode._tag && this.dataNode._tag != "201" && this.dataNode._tag != "202") {
            $ce("span", "&nbsp;&nbsp;", aH);
            var ah = control_check();
            ah.className = "checkbox";
            ah.id = "cce_" + this.dataNode._topic + "_" + RndNum(10);
            aH.appendChild(ah);
            var db = $ce("label", "不隔行显示列标题", aH);
            db.setAttribute("for", ah.id);
            db.onmouseover = function () {
                toolTipLayerTop.style.width = "400px";
                toolTipLayerTop.innerHTML = "行标题数量超过15后会每10行显示列标题，勾选后将隐藏。<a href='/help/help.aspx?helpid=351&h=1' class='link-U00a6e6' target='_blank'>查看</a>";
                sb_setmenunav(toolTipLayerTop, true, this);
            };
            db.onmouseout = function () {
                sb_setmenunav(toolTipLayerTop, false, this);
            };
            ah.onclick = function () {
                cq.dataNode._nocolumn = this.checked;
            };
            if (this.dataNode._nocolumn) {
                ah.checked = true;
            }
        }
        if (ax && this.dataNode._tag && (this.dataNode._tag - 101 <= 0 || this.dataNode._tag == "103")) {
            var c = $ce("span", "&nbsp;&nbsp;<a  onclick='cur.setMChoiceAttr();return false;' href='javascript:' class='link-U666'>选项可选个数</a>", aH);
            c.onmouseover = function () {
                toolTipLayerTop.style.width = "250px";
                toolTipLayerTop.innerHTML = "设置每个选项最多可以被选中的次数";
                sb_setmenunav(toolTipLayerTop, true, this);
            };
            c.onmouseout = function () {
                sb_setmenunav(toolTipLayerTop, false, this);
            };
            this.setMChoiceAttr = function () {
                PDF_launch("/wjx/design/setchoiceattr.aspx?ct=" + this.dataNode._topic, 500, 370, function () {
                    cur.updateItem();
                });
            };
        }
    }
    if (ax) {
        bS.style.width = "320px";
        if (cM == "102" || cM == "103") {
            bS.style.width = "425px";
        }
        if (cM && cM <= 101) {
            bS.style.width = "425px";
        }
        if (cM == "303") {
            bS.style.width = "340px";
        }
        aX.cellSpacing = "0";
        aX.cellPadding = "2";
        aX.width = "98%";
        setFloat(bS);
        setFloat(bl);
        $ce("div", "", cf).style.clear = "both";
        if (!isCepingQ) {
            if (cM == "201" || cM == "302") {
                var bt = "设置行属性";
                if (cM == "302") {
                    bt = "设置列属性";
                }
                var dq = $ce("div", "<a onclick='cur.setMRowAttr();return false;' href='javascript:' class='sumitbutton cancle'>" + bt + "</a>", aE);
                this.setMRowAttr = function () {
                    PDF_launch("/wjx/design/setrowattr.aspx?ct=" + this.dataNode._topic, 700, 370, function () {
                        cur.updateItem();
                    });
                };
                dq.style.margin = "15px 0 15px 30px";
                aE.appendChild(dq);
            }
        }
    }
    if (o._isShop) {
        var cL = $ce("div", "<div style='margin:10px 0 10px 34px;font-size:14px'><b style='color:#ff9900;'>商品支付方式:</b>&nbsp;&nbsp;<a href='javascript:' onclick='PDF_launch(\"/wjx/design/setpayapp.aspx?activity=" + activityID + "\",500,250);return false;' class='titlelnk' target='_blank'>设置微信支付</a></div>", aE);
    }
    var cm = $ce("div", "", aE);
    cm.style.marginTop = "15px";
    cm.style.padding = "0 34px";
    if (!bj && !bH && !H && !cI && !P && newQType != 5) {
        cm.className = "h-setting";
    }
    if (d3 || H) {
        var m = $ce("span", "", cm);
        m.style.position = "relative";
        if (!H) {
            m.innerHTML = "";
        } else {
            m.style.marginTop = "6px";
        }
        if (P) {
            m.innerHTML = "";
        }
        var d0 = document.createElement("span");
        var a3 = document.createElement("a");
        a3.innerHTML = "关联逻辑";
        a3.className = "link-new";
        a3.href = "###";
        d0.appendChild(a3);
        cq.initRelation = function () {
            this.dataNode._relation = "";
            a3.innerHTML = "关联逻辑";
            if (cq.RelationIns) {
                cq.RelationIns.style.display = "none";
            }
            if (bo) {
                bo.style.display = "none";
            }
        };
        cq.displayRelation = function () {
            var j = this.dataNode._relation;
            a3.dtitle = "";
            a3.className = "link-new";
            if (!j) {
                this.initRelation();
                return false;
            } else {
                if (j == "0") {
                    return false;
                }
            }
            var i = this.getRelation();
            if (i) {
                var dw = i[0];
                if (dw.length > 18) {
                    dw = dw.substring(0, 18);
                }
                if (!cq.RelationIns.onmouseover) {
                    cq.RelationIns.onmouseover = function () {
                        toolTipLayerMenu.style.width = "350px";
                        toolTipLayerMenu.innerHTML = this.dtitle;
                        sb_setmenunav(toolTipLayerMenu, true, this);
                    };
                    cq.RelationIns.onmouseout = function (d8) {
                        sb_setmenunav(toolTipLayerMenu, false, this);
                    };
                }
                cq.RelationIns.innerHTML = i[0];
                cq.RelationIns.dtitle = i[1];
                cq.RelationIns.style.display = "";
                a3.dtitle = i[1];
                a3.innerHTML = "编辑关联逻辑";
                a3.className = "link-set";
                if (!H && !P && !cI) {
                    bo.style.display = "";
                }
                bo.onclick = function () {
                    var d9 = "/wjx/design/applyrelation.aspx";
                    var ea = cq.dataNode._topic;
                    d9 += "?ct=" + ea;
                    var d8 = cq.dataNode._relation;
                    if (d8) {
                        d9 += "&rt=" + d8;
                    }
                    PDF_launch(d9, 500, 320);
                };
            }
        };
        a3.onclick = function (i) {
            cq.openRelationWindow();
        };
        a3.onmouseover = function () {
            toolTipLayerMenu.style.width = "310px";
            toolTipLayerMenu.innerHTML = "当前面题目<b>选中某些选项时</b>才出现此题&nbsp;&nbsp;<a target='_blank' class='link-U00a6e6' href='/help/help.aspx?helpid=216&h=1'>查看帮助</a>";
            if (this.dtitle) {
                toolTipLayerMenu.innerHTML = this.dtitle;
            }
            sb_setmenunav(toolTipLayerMenu, true, this);
        };
        a3.onmouseout = function () {
            sb_setmenunav(toolTipLayerMenu, false, this);
        };
        m.appendChild(d0);
        var bo = $ce("span", "&nbsp;", m);
        var dK = $ce("a", "", bo);
        dK.className = "copy-tit";
        dK.href = "###";
        bo.style.display = "none";
        dK.onmouseover = function () {
            toolTipLayer.style.width = "206px";
            toolTipLayer.innerHTML = "复制此题关联逻辑到后面的题目";
            sb_setmenunav(toolTipLayer, true, this);
        };
        dK.onmouseout = function () {
            sb_setmenunav(toolTipLayer, false, this);
        };
        this.displayRelation();
    }
    if (d3) {
        var a5 = $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;", cm);
        if (P || cI || bH || newQType == 5) {
            a5.style.display = "none";
        }
        var aK = $ce("a", "跳题逻辑", a5);
        aK.href = "###";
        aK.onclick = function () {
            var j = "/wjx/design/setjump.aspx?ct=" + cq.dataNode._topic;
            var i = 420;
            if (cq.dataNode._type != "radio" && cq.dataNode._type != "radio_down") {
                i = 280;
            }
            PDF_launch(j, 580, i, S);
            return false;
        };

        function S() {
            cur.displayJump();
            return false;
        }

        cq.displayJump = function () {
            if (this.dataNode._hasjump) {
                aK.innerHTML = "编辑跳题逻辑";
                aK.className = "link-set";
                return false;
            }
            aK.className = "link-new";
            aK.innerHTML = "跳题逻辑";
        };
        cq.displayJump();
        aK.onmouseover = function () {
            toolTipLayerMenu.style.width = "250px";
            toolTipLayerMenu.innerHTML = "通过配合设置其他题目的“按选项跳题”实现更复杂的跳题逻辑&nbsp;&nbsp;<a target='_blank' class='link-U00a6e6' href='/help/help.aspx?helpid=218&h=1'>查看示例</a>";
            sb_setmenunav(toolTipLayerMenu, true, this);
        };
        aK.onmouseout = function () {
            sb_setmenunav(toolTipLayerMenu, false, this);
        };
    }
    if (a8 && o._type != "radio_down") {
        var A = $ce("span", "&nbsp;&nbsp;&nbsp;&nbsp;", cm);
        if (bH || P || cI) {
            A.style.display = "none";
        }
        var bp = $ce("a", "分组设置", A);
        bp.href = "javascript:;";
        bp.onclick = function () {
            if (!vipUser) {
                alert("只有企业版用户才能插入分组，请升级！");
                return false;
            }
            var i = "/wjx/design/setlabel.aspx?ct=" + cq.dataNode._topic;
            PDF_launch(i, 580, 420, dx);
            return false;
        };

        function dx() {
            cur.displayGroup();
            return false;
        }

        cq.displayGroup = function () {
            bp.innerHTML = "分组设置";
            bp.className = "link-new";
            for (var j = 1; j < this.dataNode._select.length; j++) {
                if (this.dataNode._select[j]._item_label) {
                    bp.innerHTML = "编辑分组";
                    bp.className = "link-set";
                    return;
                }
            }
        };
        cq.displayGroup();
        bp.onmouseover = function () {
            toolTipLayerMenu.style.width = "250px";
            toolTipLayerMenu.innerHTML = "在选项较多的情况下，通过对选项进行分组，可以更方便用户选择&nbsp;&nbsp;<a target='_blank' class='link-U00a6e6' href='/help/help.aspx?helpid=149&h=1'>查看帮助</a>";
            sb_setmenunav(toolTipLayerMenu, true, this);
        };
        bp.onmouseout = function () {
            sb_setmenunav(toolTipLayerMenu, false, this);
        };
    }
    var cP = document.createElement("div");
    cP.style.margin = "25px 30px 5px";
    var a6 = control_btn("完成编辑");
    a6.className = "submitbutton";
    a6.style.width = "100%";
    a6.onclick = function () {
        qonclick.call(cq);
    };
    if (this.newAddQ) {
    }
    cP.appendChild(a6);
    var p = $ce("div", "", cP);
    p.style.color = "red";
    p.style.fontSize = "14px";
    p.style.display = "inline-block";
    p.style.margin = "6px 0 0 10px";
    aE.appendChild(cP);
    D.appendChild(aI);
    this.hasCreatedAttr = true;
    this.createEditBox = function () {
        if (this.hasEditBox) {
            return;
        }
        this.hasEditBox = true;
        if (dV) {
            dV.style.display = "none";
        }
        if (t) {
            t.style.display = "";
        }
        I.style.height = "102px";
        var i = EditToolBarItemsPageCut;
        if (d3) {
            i = EditToolBarItems;
        } else {
            I.style.height = "162px";
        }
        KE.init({
            id: y, items: i, filterMode: filter, afterChange: function (j) {
                KE.util.setData(j);
            }, DesignPage: 1
        });
        this.titleId = y;
        KE.create(y);
        KE.util.focus(y);
    };
    this.popHint = function (i) {
        if (p) {
            if (i) {
                p.innerHTML = "<b>提示：</b>" + i;
            } else {
                p.innerHTML = "";
            }
        }
    };
    if (d) {
        this.createEditBox();
    }
    this.checkTitle = function () {
        if (dJ) {
            this.popHint("");
            var i = getGapFillCount(I.value);
            if (i == 0) {
                this.popHint("填空题标题必须包含填空符，请点击“插入填空符”按钮进行插入。");
                this.isTitleValid = false;
                return false;
            } else {
                if (isMergeAnswer && !cq.isMergeNewAdded) {
                    if (i < this.dataNode._gapcount) {
                        show_status_tip("合并答卷时，不能删除填空题标题中的空!", 4000);
                        this.isTitleValid = false;
                        return false;
                    }
                }
            }
        }
        var dw = I.value;
        if (!this.hasEditBox && /\r\n|\n|\r/.test(dw)) {
            dw = I.value = dw.replace(/\r\n|\n|\r/g, "<br />");
            dV.onclick();
        }
        if (dJ) {
            dw = replaceGapFill(dw, this.dataNode).replace(/\<br\s*\/?\>/g, "<div style='margin-top:8px;'></div>");
        }
        af.innerHTML = dw;
        this.dataNode._title = I.value;
        this.isTitleValid = true;
        if (this.dataNode._type == "cut") {
            af.innerHTML = dw || "请在此输入说明文字";
            if (this.div_video_title) {
                this.div_video_title.innerHTML = "";
            }
            if (this.dataNode._video) {
                var j = "<iframe height=498 width=510 src='" + this.dataNode._video + "' frameborder=0 allowfullscreen></iframe>";
                if (this.div_video_title) {
                    this.div_video_title.innerHTML = j;
                } else {
                    this.div_video_title = $ce("div", j, af);
                }
            }
        }
        if (!this.hasEditBox && this.dataNode._title.indexOf("<") > -1) {
            this.createEditBox();
        }
        if (bj) {
            if (af.innerHTML == "") {
                af.parentNode.style.borderBottom = "none";
            } else {
                af.parentNode.style.borderBottom = "dashed 1px #efefef";
            }
        }
        return true;
    };
    this.checkDefault = function () {
        this.popHint("");
        var i = replace_specialChar(trim(bG.value));
        bG.value = i;
        if (ay.value != "" && i != "" && i.length < ay.value) {
            this.popHint("您输入的默认值少于您设置的最小字数，请修改！");
            this.isDefaultValid = false;
            return false;
        } else {
            if (dX.value != "" && i.length > dX.value) {
                this.popHint("您输入的默认值超过了您设置的最大字数，请修改！");
                this.isDefaultValid = false;
                return false;
            } else {
                if (this.dataNode._verify != "省市区" && this.dataNode._verify != "高校") {
                    bP.value = i;
                } else {
                    if (i) {
                        bP.value = "指定省份为：" + i;
                    } else {
                        bP.value = "";
                    }
                }
                this.dataNode._default = i;
                this.isDefaultValid = true;
            }
        }
        return true;
    };
    this.checkValid = function () {
        var d9 = this.isAnyJumpValid == undefined || this.isAnyJumpValid;
        var ea = this.isTitleValid == undefined || this.isTitleValid;
        if (cx) {
            var j = this.isDefaultValid == undefined || this.isDefaultValid;
            return ea && j && d9;
        } else {
            var ed = this.isItemTitleValid == undefined || this.isItemTitleValid;
            var i = this.isItemJumpValid == undefined || this.isItemJumpValid;
            var dw = this.isItemValueValid == undefined || this.isItemValueValid;
            var d8 = this.isRowTitleValid == undefined || this.isRowTitleValid;
            var eb = this.isColumnTitleValid == undefined || this.isColumnTitleValid;
            var ec = this.isCeShiValid == undefined || this.isCeShiValid;
            return ed && i && dw && d9 && ea && d8 && eb && ec;
        }
    };
    this.validate = function () {
        p.innerHTML = "";
        this.checkTitle();
        if (cx) {
            this.checkDefault();
        } else {
            if (w) {
                this.checkRowTitle();
            } else {
                if (dH) {
                    var i = true;
                    var j = true;
                    if (ax) {
                        i = this.checkRowTitle();
                    }
                    if (bQ) {
                        j = this.checkColumnTitle();
                    }
                    if (i && j) {
                        this.checkItemTitle();
                    }
                    this.checkItemValue();
                    if (this.checkCheckLimit) {
                        this.checkCheckLimit();
                    }
                    if (this.checkCeShiSet) {
                        this.checkCeShiSet();
                    }
                }
            }
        }
        this.setErrorStyle();
    };
    this.setErrorStyle = function () {
        if (!this.checkValid()) {
            this.className += " div_question_error";
        } else {
            this.className = this.className.replace(/div_question_error/, "");
        }
    };
    this.setDataNodeToDesign = function () {
        var ea = this.dataNode;
        switch (ea._type) {
            case"question":
                if (ea._verify == "多级下拉") {
                    n.checked = ea._requir;
                    break;
                }
                I.value = ea._title;
                I.onblur();
                dX.value = ea._maxword;
                n.checked = ea._requir;
                bG.value = ea._default;
                if (ea._default) {
                    ea._olddefault = ea._default;
                    C.click();
                }
                dN.value = ea._ins;
                ck.checked = ea._needOnly;
                bO.checked = ea._needsms;
                aU.value = ea._width;
                if (ea._underline) {
                    cc.checked = true;
                }
                ay.value = ea._minword;
                if (ea._minword || ea._maxword) {
                    aZ.style.display = "";
                    bL.checked = true;
                } else {
                    aZ.style.display = "none";
                }
                this.initVerify();
                this.initWidth();
                this.initHeight();
                break;
            case"sum":
                I.value = ea._title;
                I.onblur();
                n.checked = ea._requir;
                d4.value = ea._rowtitle;
                cG.value = ea._total;
                dN.value = ea._ins;
                if (this._referDivQ) {
                    this.show_divAddFromCheck();
                    bf.value = this._referDivQ.dataNode._topic;
                    this.addFromCheck(bf);
                }
                break;
            case"cut":
            case"page":
                I.value = ea._title;
                I.onblur();
                if (ea._type == "page") {
                    v.checked = ea._iszhenbie;
                    bd.value = ea._mintime;
                    dm.value = ea._maxtime;
                    dm.onblur();
                }
                break;
            case"fileupload":
                I.value = ea._title;
                I.onblur();
                var ee = $$("input", dG);
                var eg = ea._ext || defaultFileExt;
                if (eg != defaultFileExt) {
                    U.checked = true;
                    dG.style.display = "";
                } else {
                    dG.style.display = "none";
                }
                M.value = ea._maxsize / 1024;
                var d9 = eg.split("|");
                for (var eh = 0; eh < ee.length; eh++) {
                    ee[eh].onclick = function () {
                        if (!this.value) {
                            var en = this.parentNode;
                            var em = $$("input", en);
                            for (var el = 0; el < em.length; el++) {
                                if (em[el] != this) {
                                    em[el].checked = this.checked;
                                }
                            }
                        }
                        if (cur.updateExt) {
                            cur.updateExt(this);
                        }
                    };
                    if (d9.indexOf(ee[eh].value) > -1) {
                        ee[eh].checked = true;
                    }
                }
                for (var eh = 0; eh < ee.length; eh++) {
                    if (ee[eh].value) {
                        continue;
                    }
                    var ek = true;
                    var ed = ee[eh].parentNode;
                    var eb = $$("input", ed);
                    for (var j = 0; j < eb.length; j++) {
                        if (eb[j] != ee[eh] && !eb[j].checked) {
                            ek = false;
                            break;
                        }
                    }
                    if (ek) {
                        ee[eh].checked = true;
                    }
                }
                n.checked = ea._requir;
                dN.value = ea._ins;
                break;
            case"gapfill":
                I.value = ea._title;
                I.onblur();
                n.checked = ea._requir;
                dN.value = ea._ins;
                da.checked = ea._useTextBox;
                break;
            case"slider":
                I.value = ea._title;
                I.onblur();
                n.checked = ea._requir;
                aJ.value = ea._minvalue || 0;
                e.value = ea._maxvalue || 100;
                b1.value = ea._minvaluetext || "";
                aw.value = ea._maxvaluetext || "";
                dN.value = ea._ins;
                break;
            case"radio":
            case"radio_down":
            case"check":
            case"matrix":
                I.value = ea._title;
                I.onblur();
                if (dN) {
                    dN.value = ea._ins;
                }
                if (dY) {
                    dY.value = ea._numperrow;
                }
                bU.checked = ea._randomChoice;
                if (ea._hasvalue) {
                    T.checked = true;
                    T.onclick();
                }
                if (ea._tag) {
                    T.disabled = true;
                }
                if (ea._type == "matrix") {
                    this.initMainWidth();
                    d4.value = ea._rowtitle;
                    this.initWidth();
                    if (ea._rowtitle2 && cr) {
                        cr.checked = true;
                        cr.onclick();
                        cr.checked = true;
                    }
                    if (ea._rowwidth2) {
                        this.initWidth2();
                    }
                    if (ea._daoZhi) {
                        if (cv) {
                            cv.checked = true;
                        }
                    }
                    dM.style.display = (ea._tag > 200 && ea._tag != "303") ? "none" : "";
                    bS.style.display = dM.style.display;
                    T.disabled = (ea._tag <= 101 || ea._tag == 303) ? true : false;
                }
                var ec = false;
                var d8 = !ea._tag && (ea._type == "check" || ea._type == "radio" || ea._type == "radio_down");
                for (var dw = 1; dw < ea._select.length; dw++) {
                    cO[dw].get_item_title().value = ea._select[dw]._item_title.replace(/&lt;/, "<");
                    if (d8 || ea._isCeShi) {
                        var i = ea._select[dw]._item_radio;
                        cO[dw].get_item_check().checked = i;
                        if (i) {
                            ec = true;
                        }
                        if (ea._select[dw]._item_huchi) {
                            cO[dw].get_item_huchi().checked = true;
                        }
                    }
                    if (ec && this.defaultCheckSet) {
                        this.defaultCheckSet();
                    }
                    var ei = ea._select[dw]._item_value;
                    if (ea._isShop && (ei == "0" || !ei)) {
                        ei = "10";
                    }
                    cO[dw].get_item_value().value = ei;
                    if (ei == NoValueData) {
                        cO[dw].get_item_value().value = "";
                        if (cO[dw].get_item_novalue()) {
                            cO[dw].get_item_novalue().checked = true;
                        }
                    }
                    var ej = ea._select[dw]._item_jump;
                    if (ea._isShop) {
                        cO[dw].get_item_jump().value = ej;
                    }
                    if (cO[dw].get_item_tb()) {
                        cO[dw].get_item_tb().checked = ea._select[dw]._item_tb;
                    }
                    if (cO[dw].get_item_tbr()) {
                        cO[dw].get_item_tbr().checked = ea._select[dw]._item_tbr;
                    }
                    if (cO[dw].get_item_img()) {
                        cO[dw].get_item_img().value = ea._select[dw]._item_img;
                    }
                    if (cO[dw].get_item_imgtext()) {
                        cO[dw].get_item_imgtext().checked = ea._select[dw]._item_imgtext;
                    }
                    if (cO[dw].get_item_desc()) {
                        cO[dw].get_item_desc().value = ea._select[dw]._item_desc;
                    }
                }
                if (n) {
                    n.checked = ea._requir;
                }
                if (this._referDivQ) {
                    this.show_divAddFromCheck();
                    bf.value = this._referDivQ.dataNode._topic;
                    this.addFromCheck(bf);
                }
                break;
        }
        if (ea._ins) {
            ea._oldins = ea._ins;
            dN.onchange();
        }
        try {
            I.focus();
        } catch (ef) {
        }
    };
}

function setImage(b, a) {
    PDF_close(b);
}

function creat_item(I, M, B, ai, G, J) {
    var T = M;
    var Z = B;
    var l = B.insertRow(T);
    var t = l.insertCell(-1);
    var a = control_text("15");
    a.tabIndex = 1;
    a.title = "回车添加新选项，上下键编辑前后选项";
    if (G) {
        select_item_num++;
    }
    a.value = J ? J._item_title : "选项" + select_item_num;
    if (B.rows.length - 1 == T && cur && (cur.dataNode._isQingJing || cur.dataNode._isShop)) {
        var C = "情景" + T;
        if (cur.dataNode._isShop) {
            C = "商品" + T;
        }
        var Q = false;
        for (var ab = 1; ab < cur.dataNode._select.length; ab++) {
            if (cur.dataNode._select[ab]._item_title == C) {
                Q = true;
                break;
            }
        }
        if (!Q) {
            a.value = C;
        }
    }
    a.className += " choicetxt";
    a.onchange = a.onblur = function () {
        if (!this.value) {
            this.value = this.initText || "";
        }
        if (cur && cur.updateItem) {
            cur.updateItem();
            cur.checkTextJump(this.value);
        }
    };
    a.onfocus = function () {
        if (!this.initText) {
            this.initText = this.value;
        }
        var j = /^选项\d+$/;
        if (j.test(this.value)) {
            this.value = "";
        }
    };
    a.onkeydown = function (aj) {
        var j = aj || window.event;
        if (j.keyCode == 13) {
            aa.onclick();
        } else {
            if (j.keyCode == 40) {
                if (T < cur.option_radio.length - 1) {
                    cur.option_radio[T + 1].get_item_title().focus();
                    cur.option_radio[T + 1].get_item_title().select();
                }
            } else {
                if (j.keyCode == 38) {
                    if (T > 1) {
                        cur.option_radio[T - 1].get_item_title().focus();
                        cur.option_radio[T - 1].get_item_title().select();
                    }
                }
            }
        }
        return true;
    };
    t.appendChild(a);
    a.style.width = "300px";
    t.style.width = "300px";
    if (cur && cur.dataNode._isCeShi) {
        a.style.width = "380px";
        t.style.width = "380px";
    } else {
        if (cur && cur.dataNode._type == "check") {
            a.style.width = "250px";
            t.style.width = "250px";
        } else {
            if (cur && cur.dataNode._type == "radio" && cur.dataNode._isCePing) {
                a.style.width = "250px";
                t.style.width = "250px";
            }
        }
    }
    var v = cur || I;
    var k = v.dataNode._isCePing;
    if (v.dataNode._type == "matrix") {
        t.style.width = "80px";
        a.style.width = "80px";
    }
    if (v.dataNode._type == "matrix" && v.dataNode._tag && v.dataNode._tag <= 101) {
        t.style.width = "80px";
        a.style.width = "80px";
    } else {
        if (v.dataNode._type == "matrix" && (v.dataNode._tag == "303" || v.dataNode._tag == "102" || v.dataNode._tag == "103")) {
            t.style.width = "110px";
            a.style.width = "110px";
        } else {
            if (v.dataNode._type == "check" && v.dataNode._tag) {
                t.style.width = "400px";
                a.style.width = "400px";
            }
        }
    }
    var N = v.dataNode._type == "check" && (v.dataNode._tag || 0);
    var S = !v.dataNode._tag && (v.dataNode._type == "check" || v.dataNode._type == "radio") && !k;
    var c = v.dataNode._isCeShi;
    var q = v.dataNode._isQingJing;
    var w = v.dataNode._isShop;
    var d = v.dataNode._isTouPiao;
    if ((S || k || N) && !q) {
        var z = l.insertCell(-1);
        z.align = "center";
        if (w) {
            z.align = "center";
        }
        var ag = document.createElement("input");
        ag.type = "hidden";
        ag.value = J ? J._item_img : "";
        z.appendChild(ag);
        var R = document.createElement("span");
        R.title = "添加图片";
        R.className = "choiceimg design-icon design-img";
        z.appendChild(R);
        if (ag.value) {
            R.title = "编辑图片";
            R.className = "choiceimg design-icon design-imgedit";
        }
        if (ag.value) {
            B.rows[0].cells[1].style.width = "52px";
        }

        function r(am) {
            if (am == undefined) {
                return;
            }
            var ak = cur.option_radio[T].get_item_img();
            if (w && am.indexOf(".sojump.com") > -1) {
                if (am.indexOf("pubali") > -1) {
                    var al = "?x-oss-process";
                    var j = am.indexOf(al);
                    if (j > -1) {
                        am = am.substring(0, j);
                    }
                    am = am + al + "=image/quality,q_90/resize,m_fill,h_126,w_190";
                } else {
                    var al = "?imageMogr2";
                    var j = am.indexOf(al);
                    if (j > -1) {
                        am = am.substring(0, j);
                    }
                    am = am + al + "/thumbnail/190x126!";
                }
            }
            itemImage = ak.value = am;
            if (!w) {
                var aj = cur.option_radio[T].get_item_imgtext();
                aj.parentNode.style.display = (am) ? "" : "none";
                aj.checked = true;
                if (d) {
                    aj.parentNode.style.display = "none";
                }
            }
            R.className = am ? "choiceimg design-icon design-imgedit" : "choiceimg design-icon design-img";
            B.rows[0].cells[1].style.width = "52px";
            cur.updateItem();
            if (cur.setchoiceWidth) {
                cur.setchoiceWidth();
            }
        }

        R.onclick = function () {
            itemImage = cur.option_radio[T].get_item_img().value;
            PDF_launch("uploadimg.aspx?design=1&activity=" + activityID, 650, 470, r, cur.option_radio[T].get_item_title().value);
        };
        var U = $ce("span", "", z);
        var af = control_check();
        U.style.display = "inline-block";
        af.title = "是否显示选项文字";
        af.className = "checkbox";
        U.appendChild(af);
        U.style.display = ag.value ? "" : "none";
        if (w || d) {
            U.style.display = "none";
        }
        af.onclick = function () {
            cur.updateItem();
        };
    }
    if ((S || k) && !w) {
        var V = l.insertCell(-1);
        V.align = "center";
        var F = document.createElement("span");
        F.title = "选项说明，支持HTML，图片，视频等";
        F.className = "choiceimg design-icon design-desc";
        V.appendChild(F);
        var i = document.createElement("input");
        i.type = "hidden";
        i.value = J ? (J._item_desc || "") : "";
        V.appendChild(i);
        if (i.value) {
            F.className = "choiceimg design-icon design-descedit";
        }
        F.onclick = function () {
            openTitleEditor(i, function (aj) {
                if (aj == "-1nc" || aj == undefined) {
                    return;
                }
                i.value = trim(aj);
                var j = "";
                F.className = i.value ? "choiceimg design-icon design-descedit" : "choiceimg design-icon design-desc";
                if (!q && !d) {
                    j = cur.option_radio[T].get_item_img().value;
                    cur.option_radio[T].get_item_imgtext().parentNode.style.display = (j) ? "" : "none";
                }
                cur.updateItem();
                if (cur.showDesc) {
                    cur.showDesc();
                }
                if (j) {
                    setTimeout(function () {
                        cur.updateItem();
                    }, 20);
                }
            }, cur.option_radio[T].get_item_title().value);
        };
    }
    if (N || S || (v.dataNode._type == "matrix" && (v.dataNode._tag == "102" || v.dataNode._tag == "103" || v.dataNode._tag == "101" || v.dataNode._tag < 101)) || k) {
        var y = l.insertCell(-1);
        y.align = "center";
        var W = $ce("span", "", y);
        W.style.verticalAlign = "bottom";
        W.style.fontSize = "12px";
        var u = control_check();
        u.style.verticalAlign = "bottom";
        u.title = "允许填空";
        u.className = "checkbox";
        W.appendChild(u);
        u.checked = J ? J._item_tb : false;
        var ae = $ce("span", "<span style='font-size:16px;'>|</span>", W);
        var b = $ce("span", "", ae);
        var p = "cbr" + I.dataNode._topic + "_" + T;
        var n = control_check();
        n.title = "文本框必填";
        n.id = p;
        n.className = "checkbox";
        b.appendChild(n);
        $ce("label", "必填", b).setAttribute("for", p);
        n.checked = J ? J._item_tbr : false;
        ae.style.display = u.checked ? "" : "none";
        u.onclick = function () {
            if (!this.checked) {
                cur.option_radio[T].get_item_tbr().checked = false;
            } else {
                if (v.dataNode._type == "matrix" && v.dataNode._tag < 101) {
                    alert("提示：图标样式的量表题不支持可填空属性，您可以选择量表样式为：单选框样式");
                    this.checked = false;
                    return;
                }
            }
            cur.option_radio[T].get_item_tbr().parentNode.parentNode.style.display = this.checked ? "" : "none";
            cur.updateItem();
        };
        n.onclick = function () {
            cur.updateItem();
        };
        if (c || q || w) {
            y.style.display = "none";
        }
    }
    var A = l.insertCell(-1);
    A.align = "left";
    var f = $ce("span", "", A);
    var o = control_text("4");
    o.maxLength = 5;
    o.title = "在此可以设置每个选项的分数（请输入整数）";
    if (q) {
        o.title = "请设置每个情景需要的数量,0表示不限制";
    } else {
        if (w) {
            o.title = "设置商品价格";
        }
    }
    o.value = J ? J._item_value : T;
    f.appendChild(o);
    if (v.dataNode._hasvalue && (k || v.dataNode._tag)) {
        A.style.display = "";
        if (v.dataNode._type != "check" && v.dataNode._tag != "303") {
            var ah = control_check();
            ah.style.margin = "0 0 0 3px";
            ah.title = "不记分";
            ah.className = "checkbox";
            ah.onclick = function () {
                o.value = "";
                cur.updateItem();
            };
            o.style.width = "16px";
            A.appendChild(ah);
            var X = $ce("span", "不记分", A);
            X.style.fontSize = "11px";
            X.style.margin = "0 0 0 3px";
        }
    } else {
        if (!q && !w) {
            A.style.display = "none";
        }
    }
    o.onchange = o.onblur = function () {
        if (w) {
            if (!this.value || parseFloat(this.value) != this.value) {
                this.value = 10;
            }
        } else {
            if (q) {
                if (!isInt(this.value) || parseInt(this.value) < 1) {
                    this.value = 10;
                    if (q) {
                        this.value = 50;
                    }
                }
            }
        }
        if (k || w || (cur.dataNode._type == "radio" && cur.dataNode._tag)) {
            cur.updateItem();
        } else {
            cur.updateItem(true);
        }
    };
    o.onkeydown = function (aj) {
        var j = aj || window.event;
        if (j.keyCode == 13) {
            aa.onclick();
        } else {
            if (j.keyCode == 40) {
                if (T < cur.option_radio.length - 1) {
                    cur.option_radio[T + 1].get_item_value().select();
                }
            } else {
                if (j.keyCode == 38) {
                    if (T > 1) {
                        cur.option_radio[T - 1].get_item_value().select();
                    }
                }
            }
        }
    };
    if (w) {
        var m = l.insertCell(-1);
        var L = $ce("span", "", m);
        m.align = "left";
        var H = control_text(4);
        H.maxLength = 4;
        H.style.height = "22px";
        H.title = "为空表示不限制库存，0表示已售完";
        L.appendChild(H);
        H.onblur = function () {
            if (w && !vipUser) {
                alert("提示：库存功能仅对企业版开放！");
                this.value = "";
                return;
            }
            if (w) {
                if (!isInt(this.value) || parseInt(this.value) - 0 < 0) {
                    this.value = "";
                }
            }
            if (this.value == this.prevValue) {
                this.hasChanged = false;
                return;
            }
            this.hasChanged = true;
            this.prevValue = this.value;
            cur.dataNode._select[T]._item_jump = this.value;
        };
    }
    var D = null;
    if (S && ai == "check" && !c && !w) {
        var P = l.insertCell(-1);
        var x = $ce("span", "&nbsp;", P);
        P.align = "center";
        D = control_check();
        D.title = "与其它选项互斥";
        D.className = "checkbox";
        x.appendChild(D);
        D.onclick = function () {
            cur.updateItem();
        };
    }
    var h = l.insertCell(-1);
    var O = $ce("span", "&nbsp;", h);
    var ac = null;
    ac = control_check();
    ac.className = "checkbox";
    if (!c) {
        ac.title = "若选中，用户在填问卷时此选项会默认被选中";
    } else {
        h.align = "center";
    }
    if ((S || v.dataNode._type == "radio_down") && !q && !w) {
        h.style.display = "";
    } else {
        h.style.display = "none";
    }
    O.appendChild(ac);
    if ((S || v.dataNode._type == "radio_down") && ai == "radio") {
        ac.onclick = function () {
            if (this.checked && cur.dataNode._hasjump) {
                this.checked = false;
                show_status_tip("提示：设置了跳题不能再设置默认值！", 5000);
                return;
            }
            if (this.checked) {
                for (var j = 1; j < cur.option_radio.length; j++) {
                    if (cur.option_radio[j].get_item_check() == this) {
                        this.checked = true;
                    } else {
                        cur.option_radio[j].get_item_check().checked = false;
                    }
                }
            }
            cur.updateItem();
        };
    }
    if (S && ai == "check") {
        ac.onclick = function () {
            cur.updateItem();
        };
    }
    var K = l.insertCell(-1);
    K.align = "center";
    var aa = document.createElement("span");
    aa.title = "在此选项下面插入一个新的选项";
    aa.className = "choiceimg design-icon design-add";
    var g = document.createElement("span");
    g.title = "删除当前选项（最少保留2个选项）";
    g.className = "choiceimg design-icon design-minus";
    var Y = document.createElement("span");
    Y.title = "将当前选项上移一个位置";
    Y.className = "choiceimg design-icon design-cup";
    var E = document.createElement("span");
    E.title = "将当前选项下移一个位置";
    E.className = "choiceimg design-icon design-cdown";
    K.appendChild(aa);
    K.appendChild(g);
    K.appendChild(Y);
    K.appendChild(E);
    aa.style.cursor = "pointer";
    g.style.cursor = "pointer";
    Y.style.cursor = "pointer";
    E.style.cursor = "pointer";
    aa.onclick = function () {
        if (isMergeAnswer && !cur.isMergeNewAdded && T < cur.option_radio.length - 1) {
            alert("很抱歉，部分修改问卷模式下，不能在中间插入选项，只能在最后面添加选项！");
            return;
        }
        if (isMergeAnswer && !cur.isMergeNewAdded && !confirm("此题不能删除选项，是否确认增加选项？")) {
            return;
        }
        for (var j = cur.option_radio.length - 1; j > T; j--) {
            cur.option_radio[j].set_item_num(j + 1);
            cur.option_radio[j + 1] = cur.option_radio[j];
        }
        if (ai == "radio") {
            cur.option_radio[T + 1] = new creat_item(cur, T + 1, B, "radio", true);
        }
        if (ai == "check") {
            cur.option_radio[T + 1] = new creat_item(cur, T + 1, B, "check", true);
        }
        cur.updateItem();
        cur.option_radio[T + 1].get_item_title().select();
    };
    g.onclick = function () {
        if (isMergeAnswer && !cur.isMergeNewAdded) {
            alert("很抱歉，在部分修改问卷模式下，为了保持数据一致性不允许删除题目选项！");
            return;
        }
        if (cur.option_radio.length > 2) {
            B.deleteRow(T);
            for (var aj = T + 1; aj < cur.option_radio.length; aj++) {
                cur.option_radio[aj].set_item_num(aj - 1);
                cur.option_radio[aj - 1] = cur.option_radio[aj];
            }
            cur.option_radio.length--;
            cur.updateItem();
        } else {
            show_status_tip("请至少保留1个选项", 4000);
        }
    };
    Y.onclick = function () {
        if (isMergeAnswer && !cur.isMergeNewAdded) {
            alert("很抱歉，在部分修改问卷模式下，为了保持数据一致性不允许移动题目选项！");
            return;
        }
        if ((T - 1) > 0) {
            e(cur.option_radio[T], cur.option_radio[T - 1]);
            if (ai == "check" || ai == "radio") {
                ad(cur.option_radio[T], cur.option_radio[T - 1]);
            }
            s(cur.option_radio[T], cur.option_radio[T - 1]);
            cur.updateItem();
        }
    };
    E.onclick = function () {
        if (isMergeAnswer && !cur.isMergeNewAdded) {
            alert("很抱歉，在部分修改问卷模式下，为了保持数据一致性不允许移动题目选项！");
            return;
        }
        if ((T + 1) < cur.option_radio.length) {
            e(cur.option_radio[T], cur.option_radio[T + 1]);
            if (ai == "check" || ai == "radio") {
                ad(cur.option_radio[T], cur.option_radio[T + 1]);
            }
            s(cur.option_radio[T], cur.option_radio[T + 1]);
            cur.updateItem();
        }
    };

    function e(ak, j) {
        var aj = ak.get_item_title().value;
        ak.get_item_title().value = j.get_item_title().value;
        j.get_item_title().value = aj;
    }

    function ad(ak, j) {
        var aj = ak.get_item_check().checked;
        ak.get_item_check().checked = j.get_item_check().checked;
        j.get_item_check().checked = aj;
    }

    function s(ak, j) {
        var aj = ak.get_item_value().value;
        ak.get_item_value().value = j.get_item_value().value;
        j.get_item_value().value = aj;
        if (ak.get_item_novalue()) {
            aj = ak.get_item_novalue().checked;
            ak.get_item_novalue().checked = j.get_item_novalue().checked;
            j.get_item_novalue().checked = aj;
        }
        if (ak.get_item_tb()) {
            aj = ak.get_item_tb().checked;
            ak.get_item_tb().checked = j.get_item_tb().checked;
            j.get_item_tb().checked = aj;
        }
        if (ak.get_item_tbr()) {
            aj = ak.get_item_tbr().checked;
            ak.get_item_tbr().checked = j.get_item_tbr().checked;
            j.get_item_tbr().checked = aj;
        }
        if (ak.get_item_img()) {
            aj = ak.get_item_img().value;
            ak.get_item_img().value = j.get_item_img().value;
            j.get_item_img().value = aj;
        }
        if (ak.get_item_jump()) {
            aj = ak.get_item_jump().value;
            ak.get_item_jump().value = j.get_item_jump().value;
            j.get_item_jump().value = aj;
            ak.get_item_jump().onblur();
            j.get_item_jump().onblur();
        }
        if (ak.get_item_imgtext()) {
            aj = ak.get_item_imgtext().checked;
            ak.get_item_imgtext().checked = j.get_item_imgtext().checked;
            j.get_item_imgtext().checked = aj;
        }
        if (ak.get_item_desc()) {
            aj = ak.get_item_desc().value;
            ak.get_item_desc().value = j.get_item_desc().value;
            j.get_item_desc().value = aj;
        }
    }

    this.get_item_add = function () {
        return aa;
    };
    this.get_item_del = function () {
        return g;
    };
    this.get_item_table = function () {
        return Z;
    };
    this.get_item_tr = function () {
        return l;
    };
    this.set_item_num = function (j) {
        T = j;
    };
    this.get_item_addimg = function () {
        return R;
    };
    this.get_item_num = function () {
        return T;
    };
    this.get_item_title = function () {
        return a;
    };
    this.get_item_check = function () {
        return ac;
    };
    this.get_item_huchi = function () {
        return D;
    };
    this.get_item_tb = function () {
        return u;
    };
    this.get_item_jump = function () {
        return H;
    };
    this.get_item_tbr = function () {
        return n;
    };
    this.get_item_img = function () {
        return ag;
    };
    this.get_item_desc = function () {
        return i;
    };
    this.get_item_imgtext = function () {
        return af;
    };
    this.get_item_value = function () {
        return o;
    };
    this.get_item_novalue = function () {
        return ah;
    };
    return true;
}

function setAllRequired(c) {
    for (var a = 0; a < questionHolder.length; a++) {
        var b = questionHolder[a].dataNode._type;
        if (b != "cut" && b != "page" && questionHolder[a].dataNode._requir != c) {
            if (questionHolder[a].get_requir) {
                questionHolder[a].get_requir().checked = c;
            }
            questionHolder[a].dataNode._requir = c;
            questionHolder[a].setreqstatus();
        }
    }
    show_status_tip("设置成功！", 4000);
}

function setAllRandom() {
    var a = cur.dataNode._randomChoice;
    for (var b = 0; b < questionHolder.length; b++) {
        if (!questionHolder[b].dataNode._isCeShi) {
            continue;
        }
        if (questionHolder[b].dataNode._type == "question") {
            continue;
        }
        if (questionHolder[b].get_random) {
            questionHolder[b].get_random().checked = a;
        }
        questionHolder[b].dataNode._randomChoice = a;
    }
    show_status_tip("设置成功！", 4000);
}

initAttrHandler();

function initAttrHandler() {
    firstPage.createAttr = createAttr;
    for (var b = 0; b < questionHolder.length; b++) {
        var a = questionHolder[b];
        setAttrHander(a);
    }
}

function setAttrHander(a) {
    a.createAttr = createAttr;
}