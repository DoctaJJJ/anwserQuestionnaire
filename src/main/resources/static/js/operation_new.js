var toolbar_start = "<ul class='stuff'>";
var toolbar_add = "<li style='border: 1px solid #ff9900;'><a href='javascript:void(0);' onclick='editQ(this);return false;'><span class='design-icon design-edit'></span><span>编辑</span></a></li>";
var toolbar_copy = "<li><a href='javascript:void(0);' onclick='curover.copyQ();return false;' title='复制此题'><span class='design-icon design-copy'></span><span>复制</span></a></li>";
var toolbar_moveup = "<li><a href='javascript:void(0);' onclick='curover.moveUp();return false;'  title='将此题上移'><span class='design-icon design-up'></span><span>上移</span></a></li>";
var toolbar_movedown = "<li><a href='javascript:void(0);' onclick='curover.moveDown();return false;'  title='将此题下移'><span class='design-icon design-down'></span><span>下移</span></a></li>";
var toolbar_movefirst = "<li><a href='javascript:void(0);' onclick='curover.moveFirst();return false;'  title='将此题移动到第一题'><span class='design-icon design-first'></span><span>最前</span></a></li>";
var toolbar_movelast = "<li><a href='javascript:void(0);' onclick='curover.moveLast();return false;'  title='将此题移动到最后一题'><span class='design-icon design-last'></span><span>最后</span></a></li>";
var toolbar_del = "<li onmouseover='openDelWindow(curover,this);' onmouseout='sb_setmenunav(batchDeleteMenu,false);' style='height:23px;'><a href='javascript:;' onclick='curover.deleteQ();sb_setmenunav(batchDeleteMenu,false);return false;' ><span class='design-icon design-delete'></span><span>删除</span></a></li>";
var toolbar_del_move = toolbar_del + toolbar_moveup + toolbar_movedown + toolbar_movefirst + toolbar_movelast;
var toolbar_end = "<div style='clear:both;'></div></ul>";
var clickKaoShi = false;
Array.prototype.indexOf = function (c) {
    for (var b = 0, a = this.length; b < a; b++) {
        if (this[b] == c) {
            return b;
        }
    }
    return -1;
};
Array.prototype.moveUp = function (b) {
    var a = this.indexOf(b);
    return this._moveElement(a, -1);
};
Array.prototype.moveFirst = function (b) {
    var a = this.indexOf(b);
    while (this._moveElement(a--, -1)) {
    }
    if (newQType == 5) {
        this.moveDown(b);
    }
};
Array.prototype.moveDown = function (b) {
    var a = this.indexOf(b);
    return this._moveElement(a, 1);
};
Array.prototype.moveLast = function (b) {
    var a = this.indexOf(b);
    while (this._moveElement(a++, 1)) {
    }
};
Array.prototype.moveTo = function (d, e) {
    var a = this.indexOf(d);
    var c = Math.abs(e - a);
    if (a < e) {
        for (var b = 0; b < c; b++) {
            this._moveElement(a++, 1);
        }
    } else {
        for (var b = 0; b < c; b++) {
            this._moveElement(a--, -1);
        }
    }
};
Array.prototype._moveElement = function (a, d) {
    var c, b;
    if (a < 0 || a >= this.length) {
        return false;
    }
    c = a + d;
    if (c < 0 || c >= this.length || c == a) {
        return false;
    }
    b = this[c];
    this[c] = this[a];
    this[a] = b;
    return true;
};
Array.prototype.insertAt = function (b, a) {
    this.splice(a, 0, b);
};
Array.prototype.insertBefore = function (b, a) {
    this.insertAt(b, this.indexOf(a));
};
Array.prototype.remove = function (a) {
    this.removeAt(this.indexOf(a));
    return a;
};
Array.prototype.removeAt = function (a) {
    var b = this[a];
    if (b) {
        this.splice(a, 1);
    }
    return b;
};
var firstPage="";
function updateTopic(b) {
    var k = 1;
    var n = 1;
    firstPage.divTopic.innerHTML = "<span style='font-size:14px; font-weight:bold;'>第" + (n) + "页/共" + total_page + "页</span>";
    if (total_page == 1) {
        firstPage.divTopic.style.visibility = firstPage.line.style.visibility = "hidden";
    } else {
        firstPage.divTopic.style.visibility = firstPage.line.style.visibility = "visible";
    }
    n++;
    totalHideQcount = 0;
    var c = 1;
    var d = new Object();
    for (var r = 0; r < questionHolder.length; r++) {
        var e = questionHolder[r].dataNode;
        var u = e._type;
        if (u != "page" && u != "cut") {
            if (e._topic - k != 0) {
                if (curNewQ != questionHolder[r]) {
                    d[e._topic] = k;
                }
            }
            e._topic = k;
            if (questionHolder[r].divTopic) {
                var h = k;
                h = h - totalHideQcount;
                var m = h + "";
                if (h - 100 < 0) {
                    m += ".";
                }
                if (newQType == 5) {
                    if (h == 1) {
                        m = "";
                    } else {
                        m = (h - 1) + ".";
                    }
                }
                if (hasCeShiQ) {
                    if (!e._isCeShi) {
                        m = "";
                        totalHideQcount++;
                    }
                }
                questionHolder[r].divTopic.innerHTML = m;
            }
            if (questionHolder[r]._referDivQ) {
                if (questionHolder[r].createTableRadio) {
                    questionHolder[r].createTableRadio();
                } else {
                    if (questionHolder[r].createSum) {
                        questionHolder[r].createSum();
                    }
                }
                if (questionHolder[r].updateReferQ) {
                    questionHolder[r].updateReferQ();
                    questionHolder[r].updateSelCheck();
                }
            }
            k++;
        } else {
            if (u == "page") {
                questionHolder[r].dataNode._topic = n;
                questionHolder[r].divTopic.innerHTML = "<span style='font-size:14px; font-weight:bold;'>第" + n + "页/共" + total_page + "页</span>";
                n++;
            }
        }
    }
    for (var r = 0; r < questionHolder.length; r++) {
        var e = questionHolder[r].dataNode;
        if (!e._hasjump) {
            continue;
        }
        if (e._anytimejumpto - 1 > 0 && d[e._anytimejumpto]) {
            var k = d[e._anytimejumpto];
            e._anytimejumpto = k;
            if (questionHolder[r].set_jump_ins) {
                questionHolder[r].set_jump_ins();
            }
        } else {
            if (e._select) {
                var w = false;
                for (var g = 1; g < e._select.length; g++) {
                    var a = e._select[g]._item_jump;
                    if (a - 1 > 0 && d[a] && d[a] != "1") {
                        e._select[g]._item_jump = d[a];
                        w = true;
                    }
                }
                if (w && questionHolder[r].createTableRadio) {
                    questionHolder[r].createTableRadio(true);
                }
            }
        }
    }
    for (var r = 0; r < questionHolder.length; r++) {
        var e = questionHolder[r].dataNode;
        if (!e._relation) {
            continue;
        }
        var f = "";
        if (e._relation.indexOf("|") != -1) {
            f = "|";
        } else {
            f = "$";
        }
        var A = e._relation.split(f);
        var z = "";
        var w = false;
        for (var o = 0; o < A.length; o++) {
            var t = A[o].split(",");
            var l = parseInt(t[0]);
            if (d[l]) {
                var k = d[l];
                var x = k + "," + t[1];
                if (z) {
                    z += f;
                }
                z += x;
                w = true;
            } else {
                if (A[o]) {
                    if (z) {
                        z += f;
                    }
                    z += A[o];
                }
            }
        }
        if (z && w) {
            e._relation = z;
            var s = questionHolder[r].getRelation();
            var v = questionHolder[r].RelationIns;
            if (s) {
                v.innerHTML = s[0];
                v.title = s[1];
            }
        }
    }
    setNewRandom(d);
}

function recreateEditor(a) {
    if (a.hasCreatedAttr) {
        if (!KE.browser.IE) {
            var b = a.titleId;
            if (!b) {
                return;
            }
            KE.remove(b);
            KE.create(b);
            KE.util.focus(b);
        }
    }
}

function getNextNode(b) {
    var a = b.nextSibling;
    if (a && a.nodeType != 1) {
        a = a.nextSibling;
    }
    return a;
}

function addpages() {
    useShortCutAddNewQ = true;
    var b = new Array();
    for (var c = 0, a = questionHolder.length; c < a; c++) {
        var e = questionHolder[c];
        if (e.dataNode._type == "page" || e.dataNode._type == "cut") {
            continue;
        }
        var d = getNextNode(e);
        if (d && d.dataNode && d.dataNode._type != "page") {
            b.push(e);
        }
    }
    for (var c = 0; c < b.length; c++) {
        curinsert = b[c];
        createFreQ("page");
    }
    useShortCutAddNewQ = false;
}

function setMoveStyle(b) {
    var a = b;
    setTimeout(function () {
        a.className = "div_question div_question_move";
        if (prevcurmove && prevcurmove != a && prevcurmove.className.toLowerCase() == "div_question div_question_move") {
            prevcurmove.className = "div_question div_question_mouseout";
        }
        prevcurmove = a;
        prevcurmove.divTableOperation.style.visibility = "hidden";
    }, 2);
}

function afterMove(b, a) {
    recreateEditor(b);
    recreateEditor(a);
    updateTopic(b.dataNode._type);
    b.onmouseout();
    b.focus();
    setMoveStyle(b);
}

function moveUp() {
    var c = this.dataNode._type;
    var b = c == "page" || c == "cut";
    if (isMergeAnswer && !b) {
        alert("很抱歉，在以合并答卷模式下修改问卷为了保持数据一致性不允许上移题目！");
        return;
    }
    if (this._referDivQ) {
        var e = parseInt(this.dataNode._topic) - 1;
        var g = this._referDivQ.dataNode._topic;
        if (e <= g) {
            var d = "选项";
            if (this.dataNode._type == "matrix" || this.dataNode._type == "sum") {
                d = "行标题";
            }
            show_status_tip("此题" + d + "来源于第" + g + "题的选中项，不能再将此题移到第" + g + "题上方！", 4000);
            return;
        }
    }
    var a = questionHolder.indexOf(this);
    if (a > 0) {
        if (a == 1 && isCepingQ) {
            show_status_tip("不能移动到被测评对象上面", 3000);
            return;
        }
        var f = questionHolder[a - 1];
        this.parentNode.insertBefore(this, f);
        questionHolder.moveUp(this);
        afterMove(this, f);
    } else {
        show_status_tip("第1题不能再上移", 3000);
    }
}

function moveDown() {
    var e = this.dataNode._type;
    var g = e == "page" || e == "cut";
    if (isMergeAnswer && !this.isMergeNewAdded && !g) {
        alert("很抱歉，在以合并答卷模式下修改问卷为了保持数据一致性不允许下移题目！");
        return;
    }
    if (this._referedArray) {
        var c = "";
        var f = parseInt(this.dataNode._topic) + 1;
        for (var d = 0; d < this._referedArray.length; d++) {
            var a = this._referedArray[d].dataNode._topic;
            if (f - a >= 0) {
                var j = "选项";
                if (this._referedArray[d].dataNode._type == "matrix" || this._referedArray[d].dataNode._type == "sum") {
                    j = "行标题";
                }
                show_status_tip("第" + a + "题的" + j + "来源于此题的选中项，不能将此题移到第" + a + "题下方！", 4000);
                return;
            }
        }
    }
    var h = questionHolder.indexOf(this);
    if (h < questionHolder.length - 1) {
        var b = questionHolder[h + 1];
        this.parentNode.insertBefore(b, this);
        questionHolder.moveDown(this);
        afterMove(this, b);
    } else {
        show_status_tip("最后1题不能再下移", 3000);
    }
}

function moveFirst() {
    var c = this.dataNode._type;
    var b = c == "page" || c == "cut";
    if (isMergeAnswer && !b) {
        alert("很抱歉，在以合并答卷模式下修改问卷为了保持数据一致性不允许上移题目！");
        return;
    }
    if (this._referDivQ) {
        var d = "选项";
        if (this.dataNode._type == "matrix" || this.dataNode._type == "sum") {
            d = "行标题";
        }
        show_status_tip("此题" + d + "来源于第" + this._referDivQ.dataNode._topic + "题的选中项，不能将此题移动最前！", 4000);
        return;
    }
    var a = questionHolder.indexOf(this);
    if (a > 0) {
        var e = questionHolder[0];
        if (newQType == 5) {
            e = questionHolder[1];
        }
        this.parentNode.insertBefore(this, e);
        questionHolder.moveFirst(this);
        afterMove(this, e);
    } else {
        show_status_tip("第1题不能再上移", 3000);
    }
}

function moveLast() {
    if (this._referedArray) {
        var a = "";
        for (var c = 0; c < this._referedArray.length; c++) {
            if (c > 0) {
                a += ",";
            }
            a += this._referedArray[c].dataNode._topic;
        }
        show_status_tip("第" + a + "题的选项或行标题来源于此题的选中项，不能将此题移动到最后！", 4000);
        return;
    }
    var b = questionHolder.indexOf(this);
    if (b < questionHolder.length - 1) {
        var d = questionHolder[questionHolder.length - 1];
        this.parentNode.insertBefore(this, d);
        this.parentNode.insertBefore(d, this);
        questionHolder.moveLast(this);
        afterMove(this, d);
    } else {
        show_status_tip("最后1题不能再下移", 3000);
    }
}

function insertQ(c) {
    var a = curinsert == c;
    if (a) {
        resetInsertQ();
    } else {
        curinsert = c;
        if (isCepingQ && c.dataNode._type == "page" && c.dataNode._topic == "1") {
            alert("提示：不能在被测评对象前面插入题目！");
            resetInsertQ();
            return;
        }
        var b = $$("a", curinsert.divInsertOp)[0];
        if (b) {
            b.innerHTML = "取消插入点";
        }
        setMoveStyle(curinsert);
        if (isMergeAnswer) {
            show_status_tip("提示：部分编辑模式下，只能插入分页和段落说明题型，其它题型只能添加在问卷最后！", 10000);
        } else {
            show_status_tip("请在页面的最上方选择相应的题型插入到此题的后面", 10000);
        }
    }
}

function resetInsertQ() {
    if (curinsert != null) {
        if (curinsert.className.toLowerCase() == "div_question div_question_move") {
            curinsert.className = "div_question div_question_mouseout";
        }
        var a = $$("a", curinsert.divInsertOp)[0];
        if (a) {
            a.innerHTML = "在此题后插入新题";
        }
        curinsert = null;
    }
}

function change_dataNode(g, d) {
    var b = new Object();
    b._isTouPiao = false;
    b._isCeShi = false;
    b._isCePing = false;
    var f = false;
    var e = false;
    if (d == "likert") {
        b._tag = 2;
        b._type = "radio";
    } else {
        if (d == "order") {
            b._tag = 1;
            b._type = "check";
            b._upLimit = b._lowLimit = "-1";
        } else {
            if (d.indexOf("matrix") > -1) {
                var h = d.split(",")[1];
                b._type = "matrix";
                b._tag = h;
                b._rowtitle = g._rowtitle;
                b._rowtitle2 = g._rowtitle2;
                if (g._columntitle) {
                    b._columntitle = g._columntitle;
                }
                b._rowwidth = g._rowwidth;
                b._rowwidth2 = g._rowwidth2;
                if (h == "202" || h == "301") {
                    b._minvalue = 0;
                    b._maxvalue = 10;
                }
                if (h - 101 <= 0 || h == "303") {
                    e = true;
                }
            } else {
                if (d == "toupiaoradio" || d == "toupiaocheck") {
                    b._type = d == "toupiaoradio" ? "radio" : "check";
                    b._isTouPiao = true;
                    b._touPiaoWidth = g._touPiaoWidth || 50;
                    b._displayTiao = g._displayTiao || true;
                    b._displayNum = g._displayNum || true;
                    b._displayPercent = g._displayPercent || true;
                } else {
                    if (d == "ceshiradio" || d == "ceshicheck") {
                        b._type = d == "ceshiradio" ? "radio" : "check";
                        b._isCeShi = true;
                        b._ceshiValue = 5;
                        b._ceshiDesc = "";
                        f = true;
                    } else {
                        if (d == "ceshiq1") {
                            b = g;
                            b._answer = "简答题无答案";
                            b._height = 3;
                            f = true;
                            return b;
                        } else {
                            if (d == "ceshiq2") {
                                b = g;
                                b._answer = "请设置答案";
                                b._height = 1;
                                f = true;
                                return b;
                            } else {
                                if (d == "ceshiq") {
                                    b._type = "question";
                                    b._isCeShi = true;
                                    b._ceshiValue = 5;
                                    b._ceshiDesc = "";
                                    b._answer = "请设置答案";
                                    f = true;
                                } else {
                                    if (d == "ceshigap") {
                                        b = g;
                                        b._isCeShi = true;
                                        b._isCloze = false;
                                        b._ceshiValue = 5;
                                        b._ceshiDesc = "";
                                        f = true;
                                        isCloze = false;
                                        return b;
                                    } else {
                                        if (d == "gapfill") {
                                            b = g;
                                            b._isCeShi = false;
                                            b._isCloze = false;
                                            f = false;
                                            isCloze = false;
                                            return b;
                                        } else {
                                            if (d == "clozegap") {
                                                b = g;
                                                b._isCeShi = true;
                                                b._ceshiValue = 1;
                                                b._ceshiDesc = "";
                                                b._isCloze = true;
                                                isCloze = true;
                                                f = true;
                                                return b;
                                            } else {
                                                if (d == "cepingradio" || d == "cepingcheck") {
                                                    b._type = d == "cepingradio" ? "radio" : "check";
                                                    b._isCePing = true;
                                                } else {
                                                    b._type = d;
                                                    b._tag = 0;
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
    }
    b._verify = "0";
    b._topic = g._topic;
    b._title = g._title;
    b._requir = g._requir;
    b._ins = g._ins;
    b._hasjump = g._hasjump;
    b._anytimejumpto = g._anytimejumpto;
    b._keyword = g._keyword;
    if (d == "ceshiq") {
        b._maxword = "";
        b._minword = "";
        b._height = g._height;
        if (b._height > 1) {
            b._answer = "简答题无答案";
        }
        b._width = "";
        b._hasList = false;
        b._underline = false;
        b._norepeat = false;
        b._default = "";
        return b;
    }
    if (g._type == "question") {
        b._hasvalue = false;
        b._randomChoice = false;
        b._isTouPiao = false;
        b._isCeShi = false;
        b._default = "";
        b._minword = "";
        b._maxword = "";
        b._numperrow = "1";
        b._select = new Array();
        for (var a = 1; a < 3; a++) {
            b._select[a] = new Object();
            b._select[a]._item_title = "选项" + a;
            b._select[a]._item_radio = false;
            b._select[a]._item_value = 0;
            b._select[a]._item_jump = 0;
            b._select[a]._item_tb = false;
            b._select[a]._item_tbr = false;
            b._select[a]._item_img = "";
            b._select[a]._item_imgtext = false;
            b._select[a]._item_desc = "";
            b._select[a]._item_label = "";
        }
        if (d == "likert") {
            b._hasvalue = true;
        }
        return b;
    } else {
        if (d == "question") {
            b._height = "1";
            b._maxword = "";
            b._minword = "";
            b._width = "";
            b._hasList = false;
            b._listId = "";
            b._underline = false;
            b._norepeat = false;
            b._default = "";
            return b;
        } else {
            b._hasvalue = false;
            if (b._isCePing) {
                b._hasvalue = true;
            }
            if (d.indexOf("matrix") > -1) {
                b._hasvalue = e;
            }
            b._randomChoice = g._randomChoice || false;
            b._numperrow = g._numperrow || 0;
            b._select = g._select;
            if (g._type == "check" || d == "likert" || d == "order" || b._isCePing) {
                for (var c = 1; c < b._select.length; c++) {
                    b._select[c]._item_radio = false;
                }
            }
            if (d == "order") {
                for (var c = 1; c < b._select.length; c++) {
                    b._select[c]._item_tb = false;
                    b._select[c]._item_tbr = false;
                }
            }
            if (d == "check" && b._hasjump && b._anytimejumpto == "0") {
                b._hasjump = false;
            }
            if (d == "likert" || e || d == "cepingradio") {
                for (var c = 1; c < b._select.length; c++) {
                    b._select[c]._item_value = c;
                }
                b._hasvalue = true;
            }
            if (f) {
                b._hasvalue = false;
                b._hasjump = false;
                if (!g._isCeShi) {
                    for (var c = 1; c < b._select.length; c++) {
                        if (c == 1) {
                            b._select[c]._item_radio = true;
                        } else {
                            b._select[c]._item_radio = false;
                        }
                        b._select[c]._item_tb = false;
                    }
                }
            }
            return b;
        }
    }
}

function changeQ(d) {
    cur.validate();
    if (cur._referDivQ && newQType != 5) {
        var c = "选项";
        if (cur.dataNode._type == "matrix" || cur.dataNode._type == "sum") {
            c = "行标题";
        }
        show_status_tip("此题" + c + "来源于第" + cur._referDivQ.dataNode._topic + "题的选中项，不能转换题型！", 4000);
        return;
    }
    if (cur._referedArray) {
        var a = "";
        for (var b = 0; b < cur._referedArray.length; b++) {
            if (b > 0) {
                a += ",";
            }
            a += cur._referedArray[b].dataNode._topic;
        }
        show_status_tip("第" + a + "题的选项或行标题来源于此题的选中项，不能转换题型！", 4000);
        return;
    }
    if (cur.checkValid()) {
        var f = copyNode(cur.dataNode);
        var g = change_dataNode(f, d);
        g._topic = cur.dataNode._topic;
        var e = createQ(g, true);
        if (newQType == 5 && g._type == "matrix") {
            g._referTopic = "1";
            setReferDiv(e);
        }
    }
}

function setReferDiv(d) {
    var b = questionHolder[0];
    for (var c = 0, a = questionHolder.length; c < a; c++) {
        var e = questionHolder[c].dataNode;
        if (e._type == "page" || e._type == "cut") {
            continue;
        }
        var f = e._topic;
        if (f == "1") {
            b = questionHolder[c];
            break;
        }
    }
    d._referDivQ = b;
    if (!b._referedArray) {
        b._referedArray = new Array();
    }
    if (b._referedArray.indexOf(d) == -1) {
        b._referedArray.push(d);
    }
    b._referedArray.sort(function (h, g) {
        return h.dataNode._topic - g.dataNode._topic;
    });
}

function createFreQ(b, h, j) {
    var d = ["姓名", "基本信息", "性别", "年龄段", "省份", "省市", "省市区", "手机", "手机验证", "Email", "日期", "时间", "地图", "职业", "行业", "高校", "密码", "邮寄地址", "其它信息"];
    var l = !isMergeAnswer && window.needUserIdentity && d.indexOf(b) >= 0;
    if (l) {
        var m = firstPage;
        if (questionHolder.length > 0) {
            for (var g = 0; g < questionHolder.length; g++) {
                if (questionHolder[g].dataNode._isCeShi) {
                    m = g == 0 ? firstPage : questionHolder[g - 1];
                    break;
                }
            }
        }
        insertQ(m);
    }
    var f = createFreQdataNode(b, h, j);
    var e = createQ(f);
    if (firstPage) {
        firstPage.style.display = "";
    }
    var c = !f._tag && (f._type == "radio" || f._type == "radio_down");
    var a = f._type == "check";
    var k = /^[a-zA-Z_]+$/.test(b);
    if (newQType == 5 && f._type == "matrix") {
        f._referTopic = "1";
        setReferDiv(e);
    }
    if ((c || a) && k) {
        e.newAddQ = true;
    }
    if (!vipUser && !clickKaoShi) {
        clickKaoShi = true;
    }
    if (window.needSubmistHandle && questionHolder.length > 1 && window.divhandleBox && window.divhandleBox.parentNode.style.display === "none") {
        window.divhandleBox.parentNode.style.display = "";
    }
    return e;
}

function setNewRandom(f) {
    if (WjxActivity._random_mode == "1") {
        if (f[WjxActivity._random_begin]) {
            WjxActivity._random_begin = f[WjxActivity._random_begin];
        }
        if (f[WjxActivity._random_end]) {
            WjxActivity._random_end = f[WjxActivity._random_end];
        }
    } else {
        if (WjxActivity._random_mode == "4") {
            var h = "";
            var b = WjxActivity._partset.split(",");
            for (var d = 0; d < b.length; d++) {
                if (h) {
                    h += ",";
                }
                var e = b[d].split(";");
                var g = parseInt(e[0]);
                var a = parseInt(e[1]);
                var c = e[2] || "";
                if (f[g]) {
                    g = f[g];
                }
                if (f[a]) {
                    a = f[a];
                }
                if (isInt(g) && isInt(a)) {
                    h += g + ";" + a + ";" + c;
                }
            }
            WjxActivity._partset = h;
        }
    }
}

function createFromText() {
    if (isMergeAnswer) {
        alert("很抱歉，您正在以合并答卷模式编辑问卷，不能使用此功能！");
    } else {
        if (confirm("您确定要放弃对此问卷的更改并重新生成此问卷吗？")) {
            windowGotoUrl("/MySojump/DesignQbytxt.aspx?activity=" + activityID);
        }
    }
}

function createFreQdataNode(d, m, N) {
    var t;
    var K;
    var e = "标题";
    var J = "question§1§";
    var D = "§0§1§§false§false§§§false§§" + d;
    var l = "";
    if (d == "check" && N) {
        l = "-1";
    }
    var R = "请选择您认为正确的答案？";
    var c = "2009最受关注的中文网站/应用/服务";
    var f = "淘宝网〒false〒0〒0〒false〒false〒〒false〒〒§开心网〒false〒1〒0〒false〒false〒〒false〒〒§百度〒false〒1〒0〒false〒false〒〒false〒〒§腾讯〒false〒1〒0〒false〒false〒〒false〒〒§人人网〒false〒1〒0〒false〒false〒〒false〒〒";
    var C = "选项" + (select_item_num + 1) + "〒false〒1〒0〒false〒false〒〒false〒〒§选项" + (select_item_num + 2) + "〒false〒2〒0〒false〒false〒〒false〒〒";
    var F = "选项1〒true〒0〒0〒false〒false〒〒false〒〒§选项2〒false〒1〒0〒false〒false〒〒false〒〒";
    var B = "很不满意〒false〒1〒0§不满意〒false〒2〒0§一般〒false〒3〒0§满意〒false〒4〒0§很满意〒false〒5〒0";
    var w = "";
    var p = false;
    var L = "§§§§200§false§";
    var j = "";
    switch (d) {
        case"电话":
            w = "您常用的电话号码：";
            p = true;
            j = L;
            break;
        case"Email":
            w = "您常用的Email地址：";
            p = true;
            j = L;
            break;
        case"城市单选":
        case"城市多选":
            w = "请选择城市:";
            p = true;
            break;
        case"省市区":
            w = "请选择省份城市与地区:";
            p = true;
            break;
        case"地图":
            w = "您的地理位置:";
            p = true;
            break;
        case"多级下拉":
            w = "请选择：";
            p = true;
            break;
        case"生日":
        case"日期":
            w = "请输入您的出生日期：";
            p = true;
            break;
        case"手机":
            w = "请输入您的手机号码：";
            p = true;
            j = L;
            break;
        case"手机验证":
            w = "请输入您的手机号码：";
            p = true;
            j = "§false〒true§§§150§false§";
            D = "§0§1§§true§false§§§false§§手机";
            break;
        case"高校":
            w = "您所在或者毕业的高校名称：";
            p = true;
            break;
        case"时间":
            t = "gapfill§1§时间：" + GapFillStr + "：" + GapFillStr + "§0§true§1§§false§0§";
            break;
        case"姓名":
            w = "您的姓名：";
            p = true;
            D = "§0§1§§true§false§§§false§§" + d;
            break;
        case"密码":
            w = "密码：";
            p = true;
            D = "§0§1§§true§false§§§false§§" + d;
            break;
        case"性别":
            t = "radio§3§您的性别：§0§8§false§false§§true§0000§§性别§§§男〒false〒0〒0§女〒false〒0〒0";
            break;
        case"年龄段":
            t = "radio§3§您的年龄段：§0§7§false§false§§true§0000§§年龄段§§§18岁以下〒false〒0〒0§18~25〒false〒0〒0§26~30〒false〒0〒0§31~40〒false〒0〒0§41~50〒false〒0〒0§51~60〒false〒0〒0§60以上〒false〒0〒0";
            break;
        case"行业":
            t = "radio_down§10§您目前从事的行业：§0§1§false§false§§true§0000§§行业§§§";
            var q = "IT/软硬件服务/电子商务/因特网运营,快速消费品(食品/饮料/化妆品),批发/零售,服装/纺织/皮革,家具/工艺品/玩具,教育/培训/科研/院校,家电,通信/电信运营/网络设备/增值服务,制造业,汽车及零配件,餐饮/娱乐/旅游/酒店/生活服务,办公用品及设备,会计/审计,法律,银行/保险/证券/投资银行/风险基金,电子技术/半导体/集成电路,仪器仪表/工业自动化,贸易/进出口,机械/设备/重工,制药/生物工程/医疗设备/器械,医疗/护理/保健/卫生,广告/公关/媒体/艺术,出版/印刷/包装,房地产开发/建筑工程/装潢/设计,物业管理/商业中心,中介/咨询/猎头/认证,交通/运输/物流,航天/航空/能源/化工,农业/渔业/林业,其他行业";
            var U = q.split(",");
            var G = "";
            for (var Q = 0; Q < U.length; Q++) {
                if (Q > 0) {
                    G += "§";
                }
                G += U[Q] + "〒false〒0〒0";
            }
            t += G;
            break;
        case"职业":
            t = "radio_down§11§您目前从事的职业：§0§1§false§false§§true§0000§§职业§§§全日制学生〒false〒0〒0§生产人员〒false〒0〒0§销售人员〒false〒0〒0§市场/公关人员〒false〒0〒0§客服人员〒false〒0〒0§行政/后勤人员〒false〒0〒0§人力资源〒false〒0〒0§财务/审计人员〒false〒0〒0§文职/办事人员〒false〒0〒0§技术/研发人员〒false〒0〒0§管理人员〒false〒0〒0§教师〒false〒0〒0§顾问/咨询〒false〒0〒0§专业人士(如会计师、律师、建筑师、医护人员、记者等)〒false〒0〒0§其他〒false〒0〒0";
            break;
        case"省份":
            t = "radio§19§您所在的省份：§0§8§false§false§§true§0000§§省份§§§安徽〒false〒0〒0§北京〒false〒1〒0§重庆〒false〒1〒0§福建〒false〒1〒0§甘肃〒false〒1〒0§广东〒false〒1〒0§广西〒false〒1〒0§贵州〒false〒1〒0§海南〒false〒1〒0§河北〒false〒1〒0§黑龙江〒false〒1〒0§河南〒false〒1〒0§香港〒false〒1〒0§湖北〒false〒1〒0§湖南〒false〒1〒0§江苏〒false〒1〒0§江西〒false〒1〒0§吉林〒false〒1〒0§辽宁〒false〒1〒0§澳门〒false〒1〒0§内蒙古〒false〒1〒0§宁夏〒false〒1〒0§青海〒false〒1〒0§山东〒false〒1〒0§上海〒false〒1〒0§山西〒false〒1〒0§陕西〒false〒1〒0§四川〒false〒1〒0§台湾〒false〒1〒0§天津〒false〒1〒0§新疆〒false〒1〒0§西藏〒false〒1〒0§云南〒false〒1〒0§浙江〒false〒1〒0§海外〒false〒1〒0";
            break;
        case"邮寄地址":
            t = "matrix§1§请输入您的联系地址：§201§姓名：\n所在地区：\n街道地址:\n邮政编码:\n手机或固话：〒〒§false§false§§true§15%〒〒0,,,;1,省市区,,,50;2,,,,50;3,数字,,;4,电话,,〒10§§§§§" + B;
            break;
        case"基本信息":
            t = "matrix§1§基本信息：§201§姓名：\n部门：\n员工编号:〒〒§false§false§§true§15%〒〒0,,,;1,,,;2,,,〒10§§§§§" + B;
            break;
        case"radio":
        case"radio_down":
        case"check":
        case"qingjing":
        case"shop":
            var A = d == "check" ? "true," + l + "," + l : "true";
            if (d == "qingjing") {
                A = "true,1";
                d = "radio";
                C = "情景1〒false〒50〒0§情景2〒false〒50〒0§情景3〒false〒50〒0§情景4〒false〒50〒0";
            } else {
                if (d == "shop") {
                    d = "check";
                    e = "请选择商品：";
                    A = "false,shop";
                    C = "商品1〒false〒10〒§商品2〒false〒10〒§商品3〒false〒10〒";
                }
            }
            if (m) {
                C += "§其它〒false〒1〒0〒true〒false〒〒false〒〒";
            }
            var I = N || 0;
            t = d + "§1§" + e + "§" + N + "§1§false§false§§" + A + "§§§§§§" + C;
            break;
        case"toupiao":
            d = m == 1 ? "radio" : "check";
            t = d + "§1§" + c + "§" + N + "§1§false§false§§true§true〒50〒false〒true〒true§§§§§" + f;
            break;
        case"ceshi":
            if (m == 3 || m == 6) {
                var S = "请设置答案";
                var b = 1;
                if (m == 6) {
                    S = "简答题无答案";
                    b = 3;
                }
                t = "question§1§" + e + "§0§" + b + "§§true§false§§§false§§§false§§§§§§5〒" + S;
            } else {
                if (m == 4) {
                    t = "gapfill§1§问题1：" + getFillStr(3) + "问题2：" + getFillStr(3) + "§0§true§1§§false§0§§§1";
                    if (m == 9) {
                        t += "§1";
                    }
                } else {
                    if (m == 9) {
                        t = "gapfill§1§Question 1：" + getFillStr(3) + "Question 2：" + getFillStr(3) + "§0§true§1§§false§0§§§1§1";
                    } else {
                        if (m == 5) {
                            d = "radio";
                            t = d + "§1§" + R + "§" + N + "§1§true§false§§true,2§ceshi〒5〒§§§§§对〒true〒0〒0〒false〒false〒〒false〒〒§错〒false〒1〒0〒false〒false〒〒false〒〒";
                        } else {
                            if (m == 7) {
                                t = "fileupload§1§" + e + "§0§true§200§" + defaultFileExt + "§4096§§false§0§5";
                            } else {
                                d = m == 1 ? "radio" : "check";
                                t = d + "§1§" + R + "§" + N + "§1§true§false§§true§ceshi〒5〒§§§§§" + F;
                            }
                        }
                    }
                }
            }
            hasCeShiQ = true;
            showCeShiInfo();
            break;
        case"ceping":
            d = m == 1 ? "radio" : "check";
            t = d + "§1§" + e + "§0§1§true§false§§true§ceping§§§§§" + C;
            break;
        case"boolean":
            t = d + "§1§" + e + "§0§8§true§false§§true§0000§§§§§是〒false〒1〒0§否〒false〒0〒0";
            break;
        case"likert":
            var z = "1";
            if (m == "11") {
                B = "";
                z = "6";
                e = "您向朋友或同事推荐我们的可能性有多大？";
                for (var P = 0; P < 11; P++) {
                    if (P == 0) {
                        B += "不可能〒false〒0〒0§";
                    } else {
                        if (P == 10) {
                            B += "极有可能〒false〒10〒10";
                        } else {
                            B += P + "〒false〒" + P + "〒" + P + "§";
                        }
                    }
                }
            }
            t = "radio§1§" + e + "§" + z + "§1§true§false§§true§0000§§§§§" + B;
            break;
        case"matrix":
            var E = m || 2;
            var o = "";
            var x = "外观\n功能";
            var n = "";
            var g = 10;
            if (E == "202") {
                g = 100;
            }
            var s = E < 102 || E == 303;
            var O = s ? "true" : "false";
            if (m - 300 > 0) {
                o = "百度\n谷歌\n腾讯搜搜\n网易有道\n搜狐搜狗";
                if (N) {
                    x = "成员1\n成员2";
                    o = "姓名\n年龄\n性别";
                }
            }
            if (E == 101) {
                var k = "1〒false〒1〒0§2〒false〒2〒0§3〒false〒3〒0§4〒false〒4〒0§5〒false〒5〒0";
                var M = "请根据您的实际情况选择最符合的项：1-->5表示非常不满意-->非常满意";
                if (N) {
                    var T = N.split("§");
                    if (T[0]) {
                        M = T[0];
                    }
                    if (T[1] && T[2]) {
                        var v = T[1].split("\n");
                        var a = T[2].split("\n");
                        if (v.length == a.length) {
                            k = "";
                            for (var h = 0; h < v.length; h++) {
                                if (h > 0) {
                                    k += "§";
                                }
                                k += v[h] + "〒false〒" + a[h] + "〒0";
                            }
                        }
                    }
                }
                t = "matrix§1§" + M + "§" + E + "§" + x + "〒〒" + o + "§" + O + "§false§§true§" + n + "〒〒0〒" + g + "§§§§§" + k;
            } else {
                if (E == 102) {
                    var u = "速度快〒false〒1〒0§准确率高〒false〒2〒0§信息量多〒false〒3〒0§界面更美观〒false〒4〒0";
                    t = "matrix§1§请评议下面的搜索引擎：§" + E + "§百度\nGoogle\n搜狗〒〒" + o + "§" + O + "§false§§true§" + n + "〒〒0〒" + g + "§§§§§" + u;
                } else {
                    t = "matrix§1§" + e + "§" + E + "§" + x + "〒〒" + o + "§" + O + "§false§§true§" + n + "〒〒0〒" + g + "§§§§§" + B;
                }
            }
            break;
        case"question":
            var b = m || 1;
            var H = N || false;
            t = "question§1§" + e + "§0§" + b + "§§false§false§§§false§§§" + H + "§§§§§";
            break;
        case"gapfill":
            t = "gapfill§1§姓名：" + getFillStr(3) + "&nbsp;&nbsp;&nbsp;&nbsp;年龄：" + GapFillStr + "岁<br/>电话：" + getFillStr(4) + "§0§true§1§§false§0§";
            break;
        case"slider":
            t = "slider§1§" + e + "§0§true§0§100§不满意§满意§§false§0§";
            break;
        case"sum":
            t = "sum§1§" + e + "§0§true§100§外观\n性能§15%§0§§false§0§";
            break;
        case"fileupload":
            t = "fileupload§1§" + e + "§0§true§200§" + defaultFileExt + "§4096§§false§0§";
            break;
        case"page":
            var r = m || "";
            t = d + "§1§§§" + r;
            break;
        case"cut":
            var w = m ? m : "";
            t = d + "§" + w + "§";
            break;
    }
    if (p) {
        t = J + w + D + j;
    }
    K = set_string_to_dataNode(t);
    if (d == "时间") {
        K._rowVerify = [];
        K._rowVerify[0] = new Object();
        K._rowVerify[0]._verify = "指定选项";
        K._rowVerify[0]._choice = "00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23|小时";
        K._rowVerify[1] = new Object();
        K._rowVerify[1]._verify = "指定选项";
        K._rowVerify[1]._choice = "00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59|分钟";
    } else {
        if (m == "302" && N) {
            K._rowVerify = [];
            K._rowVerify[0] = new Object();
            K._rowVerify[1] = new Object();
            K._rowVerify[1]._verify = "数字";
            K._rowVerify[2] = new Object();
            K._rowVerify[2]._verify = "指定选项";
            K._rowVerify[2]._choice = "男,女";
        } else {
            if (d == "ceshi" && m == 9) {
                K._rowVerify = [];
                K._rowVerify[0] = new Object();
                K._rowVerify[0]._verify = "指定选项";
                K._rowVerify[0]._choice = "A,B,C";
                K._rowVerify[0]._answer = "A";
                K._rowVerify[1] = new Object();
                K._rowVerify[1]._verify = "指定选项";
                K._rowVerify[1]._choice = "A,B,C";
                K._rowVerify[1]._answer = "B";
            }
        }
    }
    return K;
}

var curNewQ = null;

function addNewQ(d, f, a, g) {
    var e;
    var c = d._type;
    e = create_question(d);
    curNewQ = e;
    setQHandler(e);
    setAttrHander(e);
    if (curinsert != null) {
        g = curinsert;
    }
    if (a) {
        g = curover;
    }
    if (!f) {
        if ((!isMergeAnswer || c == "page" || c == "cut") && g) {
            if (questions.lastChild == g) {
                questions.appendChild(e);
            } else {
                questions.insertBefore(e, g.nextSibling);
            }
            if (g == firstPage) {
                questionHolder.unshift(e);
            } else {
                questionHolder.insertBefore(e, g);
                questionHolder.moveUp(g);
            }
            updateTopic();
        } else {
            if (curinsert != null) {
                alert("提示：部分编辑模式下，只能插入分页和段落说明题型，其它题型只能添加在问卷最后！");
            }
            questions.appendChild(e);
            questionHolder.push(e);
            updateTopic();
        }
    } else {
        cur.parentNode.insertBefore(e, cur);
        e.isMergeNewAdded = cur.isMergeNewAdded;
        questionHolder[questionHolder.indexOf(cur)] = e;
        cur.deleteQ("noNeedConfirm");
        cur = null;
    }
    if (curinsert != null) {
        resetInsertQ();
    }
    if (a && curover) {
        if (curover._referDivQ) {
            var b = curover._referDivQ;
            e._referDivQ = b;
            if (!b._referedArray) {
                b._referedArray = new Array();
            }
            if (b._referedArray.indexOf(e) == -1) {
                b._referedArray.push(e);
            }
            b._referedArray.sort(function (i, h) {
                return i.dataNode._topic - h.dataNode._topic;
            });
        }
    }
    curNewQ = null;
    return e;
}

function createQ(c, e, a) {
    if (cur) {
        cur.divTableOperation.style.visibility = "hidden";
    }
    var d = addNewQ(c, e, a);
    if (!isMergeAnswer && window.makeDrag) {
        makeDrag(d);
    }
    d.createOp();
    var b = new Date().getTime();
    if (!useShortCutAddNewQ) {
        if (lastAddNewQTime && !e) {
            var f = b - lastAddNewQTime;
            if (f > 8000) {
                qonclick.call(d);
            } else {
                if (cur && cur.isEditing) {
                    qonclick.call(cur);
                }
                setMoveStyle(d);
            }
        } else {
            qonclick.call(d);
        }
    } else {
        setMoveStyle(d);
    }
    d.focus();
    lastAddNewQTime = b;
    Calculatedscore();
    return d;
}

function copyQ() {
    if (this.validate) {
        this.validate();
    }
    if (!this.checkValid || this.checkValid()) {
        var a = copyNode(this.dataNode);
        a._hasjump = false;
        a._needOnly = false;
        a._hasList = false;
        a._listId = -1;
        a._referedTopics = "";
        createQ(a, false, true);
        show_status_tip("复制成功！", 4000);
    }
}

function copyNode(f) {
    var a = new Object();
    for (var c in f) {
        a[c] = f[c];
    }
    if (f._select) {
        a._select = new Array();
        for (var b = 1; b < f._select.length; b++) {
            a._select[b] = new Object();
            for (var d in f._select[b]) {
                a._select[b][d] = f._select[b][d];
            }
        }
    }
    if (f._rowVerify) {
        a._rowVerify = new Array();
        for (var b = 0; b < f._rowVerify.length; b++) {
            a._rowVerify[b] = new Object();
            for (var d in f._rowVerify[b]) {
                a._rowVerify[b][d] = f._rowVerify[b][d];
            }
        }
    }
    return a;
}

function deleteQ(w) {
    var v = this.dataNode._type;
    var o = v == "page" || v == "cut";
    if (this._referedArray) {
        var s = "";
        for (var t = 0; t < this._referedArray.length; t++) {
            if (t > 0) {
                s += ",";
            }
            s += this._referedArray[t].dataNode._topic;
        }
        show_status_tip("提示：第" + s + "题的选项或行标题来源于此题的选中项，不能删除此题！", 4000);
        return;
    }
    if (v != "page") {
        for (var t = 0; t < questionHolder.length; t++) {
            var e = questionHolder[t].dataNode;
            if (!e._relation) {
                continue;
            }
            var u = e._relation.split(",");
            var r = parseInt(u[0]);
            if (this.dataNode._topic == r) {
                var p = e._topic;
                if (WjxActivity._use_self_topic) {
                    var h = e._title.match(/^\s*\d+[\.\-\_\(\/]?\d+?\)?/);
                    if (h) {
                        p = h;
                    }
                }
                var d = "第" + p + "题";
                if (!p) {
                    d = "段落说明";
                }
                show_status_tip("提示：" + d + "关联于此题的第" + u[1] + "个选项，不能删除此题！", 4000);
                return;
            }
        }
        for (var t = 0; t < questionHolder.length; t++) {
            var e = questionHolder[t].dataNode;
            if (!e._hasjump) {
                continue;
            }
            var a = true;
            var q = 0;
            if (e._anytimejumpto - 1 > 0 && this.dataNode._topic == e._anytimejumpto) {
                a = false;
            } else {
                if (e._select) {
                    for (var k = 1; k < e._select.length; k++) {
                        var b = e._select[k]._item_jump;
                        if (b - 1 > 0 && this.dataNode._topic == b) {
                            a = false;
                            q = k;
                        }
                    }
                }
            }
            if (!a) {
                var p = e._topic;
                if (WjxActivity._use_self_topic) {
                    var h = e._title.match(/^\s*\d+[\.\-\_\(\/]?\d+?\)?/);
                    if (h) {
                        p = h;
                    }
                }
                var d = "第" + p + "题";
                if (q) {
                    d += "第" + q + "个选项";
                }
                show_status_tip("提示：" + d + "设置了跳转到此题，不能删除此题！", 4000);
                return;
            }
        }
    }
    var l = "<a href='javascript:' onclick='setTikuRandom();return false;' class='titlelnk' style='font-weight: bold;'>题库随机设置</a>";
    if (WjxActivity._random_mode == "1") {
        if (this.dataNode._topic == WjxActivity._random_begin) {
            show_status_tip("提示：此题您设置的随机逻辑的开始题号，不能删除此题！" + l, 10000);
            return;
        }
        if (this.dataNode._topic == WjxActivity._random_end) {
            show_status_tip("提示：此题您设置的随机逻辑的结束题号，不能删除此题！" + l, 10000);
            return;
        }
    } else {
        if (WjxActivity._random_mode == "4") {
            var g = WjxActivity._partset.split(",");
            for (var t = 0; t < g.length; t++) {
                var z = g[t].split(";");
                var f = parseInt(z[0]);
                var c = parseInt(z[1]);
                if (this.dataNode._topic == f) {
                    show_status_tip("提示：此题您设置的随机逻辑的开始题号，不能删除此题！" + l, 10000);
                    return;
                }
                if (this.dataNode._topic == c) {
                    show_status_tip("提示：此题您设置的随机逻辑的结束题号，不能删除此题！" + l, 10000);
                    return;
                }
            }
        }
    }
    if (w != "noNeedConfirm") {
        if (isMergeAnswer && !this.isMergeNewAdded && !o) {
            show_status_tip("很抱歉，在以合并答卷模式下修改问卷为了保持数据一致性不允许删除原始问卷中的题目！", 4000);
            return;
        }
        // show_status_tip("可以通过Ctrl+Z恢复删除的问题", 4000);
    }
    if (v == "page") {
        total_page--;
    } else {
        if (v != "cut") {
            total_question--;
        }
    }
    showhidebatq();
    if (this.tabAttr) {
        this.tabAttr.parentNode.removeChild(this.tabAttr);
        this.tabAttr = null;
        this.hasCreatedAttr = false;
    }
    if (this._referDivQ) {
        this._referDivQ._referedArray.remove(this);
        if (!this._referDivQ._referedArray.length) {
            this._referDivQ._referedArray = null;
        }
        this._referDivQ = null;
    }
    if (w != "noNeedConfirm") {
        var j = questionHolder.indexOf(this);
    }
    var x = false;
    if (window.needUserIdentity && WjxActivity._random_mode == "4" && v != "page" && v != "cut" && !this.dataNode._isCeShi) {
        var m = 0;
        if (questionHolder.length > 0) {
            for (var t = 0; t < questionHolder.length; t++) {
                if (questionHolder[t].dataNode._isCeShi) {
                    m = questionHolder[t].dataNode._topic;
                    break;
                }
            }
        }
        if (this.dataNode._topic - m < 0) {
            x = true;
        }
    }
    this.className = "div_question div_question_mouseout";
    this.parentNode.removeChild(this);
    questionHolder.remove(this);
    updateTopic(this.dataNode._type);
    if (w != "noNeedConfirm") {
        var n = firstPage;
        if (j > 0) {
            n = questionHolder[j - 1];
        }
        new DeleteAction(this, n).exec();
    }
    if (cur == this) {
        cur = null;
    }
    Calculatedscore();
}

function qSelect() {
}

function qonclick(a) {
    if (this.isCepingQ) {
        show_status_tip("被测评对象题不能进行编辑，请通过设置测评关系进行设置，设置好后此处会自动变化！");
        return;
    }
    try {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    } catch (b) {
    }
    this.className = "div_question div_question_onclick";
    this.title = "";
    resetInsertQ();
    if (cur != this || (cur == this && cur.isEditing)) {
        if (cur != null) {
            if (cur.updateItem) {
                cur.updateItem();
            }
            cur.className = "div_question";
            if (cur.hasCreatedAttr) {
                cur.tabAttr.style.display = "none";
            }
            cur.isEditing = false;
            cur.style.cursor = "move";
            changeEditText(cur.editQLink, false);
        }
        if (cur && cur.createAttr && (cur.checkValid && !cur.checkValid())) {
            cur.validate();
        }
        if (cur == this) {
            this.divInsertOp.parentNode.style.display = "";
            cur.focus();
            cancelInputClick(this);
            return false;
        }
    }
    cancelInputClick(this);
    cur = this;
    var c = this.dataNode;
    this.isEditing = true;
    hasDisplayEditTip = true;
    this.style.cursor = "default";
    changeEditText(this.editQLink, true);
    if (this.hasCreatedAttr) {
        this.tabAttr.style.display = "";
        cancelDblClick(this);
        if (this.hasDisplaySelCheck) {
            this.updateSelCheck();
        }
        this.focus();
        setQTopPos(this);
    } else {
        if (this.createAttr) {
            var d = this;
            setTimeout(function () {
                d.createAttr();
                cancelDblClick(d);
                d.setDataNodeToDesign();
                setQTopPos(d);
            }, 0);
        } else {
            show_status_tip("正在加载问题属性，请耐心等待....", 4000);
        }
    }
    this.divInsertOp.parentNode.style.display = "none";
    return false;
}

function editQ(a) {
    if (curover) {
        if (window._czc) {
            _czc.push(["_trackEvent", "编辑页面", "编辑题目", "编辑按钮"]);
        }
        qonclick.call(curover);
    }
}

function changeEditText(b, a) {
    return;
}

function createOp() {
    if (this.divTableOperation.OpCreated) {
        return;
    }
    this.deleteQ = deleteQ;
    this.copyQ = copyQ;
    this.moveUp = moveUp;
    this.moveDown = moveDown;
    this.moveFirst = moveFirst;
    this.moveLast = moveLast;
    var c = this.divTableOperation;
    var a = this.dataNode._type;
    if (a == "page") {
        if (this.dataNode._topic > 1) {
            c.innerHTML = toolbar_start + toolbar_add + toolbar_del_move + toolbar_end;
        } else {
            c.innerHTML = toolbar_start + toolbar_add + toolbar_end;
        }
    } else {
        if (a == "cut") {
            c.innerHTML = toolbar_start + toolbar_add + toolbar_del_move + toolbar_end;
        } else {
            if (isMergeAnswer && !this.isMergeNewAdded) {
                c.innerHTML = toolbar_start + toolbar_add + toolbar_copy + toolbar_end;
            } else {
                if (isMergeAnswer) {
                    c.innerHTML = toolbar_start + toolbar_add + toolbar_copy + toolbar_del + toolbar_movedown + toolbar_movelast + toolbar_end;
                } else {
                    c.innerHTML = toolbar_start + toolbar_add + toolbar_copy + toolbar_del_move + toolbar_end;
                }
            }
        }
    }
    if (this.isCepingQ) {
        c.innerHTML = "";
    }
    c.OpCreated = true;
    this.divTableOperation.style.visibility = "visible";
    var b = $$("span", c)[0];
    this.editQLink = b;
}

var hasDisplayEditTipTimes = 0;

function qonmouseover(c) {
    if (!this.isEditing) {
        this.divInsertOp.parentNode.style.display = "";
        this.divInsertOp.style.visibility = "visible";
        if (this.divTableOperation) {
            this.divTableOperation.style.visibility = "visible";
        }
        if (isCepingQ && this.dataNode._type == "page" && this.dataNode._topic == "1") {
            this.divInsertOp.style.visibility = "hidden";
        } else {
            if (this.dataNode._type == "page" && this.dataNode._topic == "1" && total_page == 1) {
                this.line.style.visibility = "visible";
                this.divTopic.style.visibility = "visible";
            }
        }
    }
    this.style.border = "";
    var b = this.className.toLowerCase();
    if (b.indexOf("div_question_onclick") < 0 && this != curinsert) {
        if (b.indexOf("div_question_error") < 0) {
            this.className = "div_question div_question_mouseover";
        } else {
            this.className = "div_question div_question_mouseover div_question_error";
        }
    }
    this.createOp();
    if (isMergeAnswer) {
        this.style.cursor = "default";
    }
    curover = this;
    var a = this;
}

function qonmouseout(b) {
    this.divInsertOp.style.visibility = "hidden";
    if (this.dataNode._type == "page" && this.dataNode._topic == "1" && total_page == 1) {
        this.line.style.visibility = "hidden";
        this.divTopic.style.visibility = "hidden";
    }
    var a = this.className.toLowerCase();
    if (a.indexOf("div_question_onclick") < 0 && this != curinsert) {
        if (a.indexOf("div_question_error") < 0) {
            this.className = "div_question div_question_mouseout";
        } else {
            this.className = "div_question div_question_mouseout div_question_error";
        }
    }
    if (this.hasDisplayEditTip) {
        sb_setmenunav(toolTipLayer, false, this);
        this.hasDisplayEditTip = false;
    }
    if (this.divTableOperation) {
        this.divTableOperation.style.visibility = "hidden";
    }
}

function getObjPos(d) {
    var a = y = 0;
    if (d.getBoundingClientRect) {
        var b = d.getBoundingClientRect();
        var c = document.documentElement;
        a = b.left + Math.max(c.scrollLeft, document.body.scrollLeft) - c.clientLeft;
        y = b.top + Math.max(c.scrollTop, document.body.scrollTop) - c.clientTop;
    } else {
        while (d && d != document.body) {
            a += d.offsetLeft;
            y += d.offsetTop;
            d = d.offsetParent;
        }
    }
    return {x: a, y: y};
}

function getCurPos(b) {
    b = b || window.event;
    var a = document.documentElement || document.body;
    if (b.pageX) {
        return {x: b.pageX, y: b.pageY};
    }
    return {x: b.clientX + a.scrollLeft - a.clientLeft, y: b.clientY + a.scrollTop - a.clientTop};
}

function mouseOverout(a) {
    a.onmouseover = qonmouseover;
    a.onmouseout = qonmouseout;
}

function setQHandler(a) {
    mouseOverout(a);
    a.createOp = createOp;
    a.deleteQ = deleteQ;
}

initEventHandler();

function initEventHandler() {
    var a = $("divId");
    a.onmouseover = function () {
        this.style.border = "2px solid #FDB553";
    };
    a.onmouseout = function () {
        this.style.border = "2px solid #ffffff";
    };
    mouseOverout(firstPage);
    firstPage.createOp = createOp;
    for (var c = 0; c < questionHolder.length; c++) {
        var b = questionHolder[c];
        setQHandler(b);
    }
}

function stopPropa(a) {
    a = a || window.event;
    if (a) {
        if (a.stopPropagation) {
            a.stopPropagation();
        } else {
            a.cancelBubble = true;
        }
    }
}

function cancelDblClick(a) {
}

var actionStack = new Array();
var actionIndex = 0;

function BaseAction() {
}

BaseAction.prototype.exec = function () {
    actionStack[actionIndex++] = this;
};
BaseAction.prototype.undo = function () {
    return false;
};
BaseAction.prototype.redo = function () {
    return false;
};

function DeleteAction(b, a) {
    this.deleteDiv = b;
    this.prevDiv = a;
    this.status = "done";
}

DeleteAction.prototype = new BaseAction();
DeleteAction.prototype.undo = function () {
    if (this.status != "done") {
        return;
    }
    this.prevDiv.parentNode.insertBefore(this.deleteDiv, this.prevDiv);
    this.prevDiv.parentNode.insertBefore(this.prevDiv, this.deleteDiv);
    if (this.prevDiv == firstPage) {
        questionHolder.unshift(this.deleteDiv);
    } else {
        questionHolder.insertBefore(this.deleteDiv, this.prevDiv);
        questionHolder.moveUp(this.prevDiv);
    }
    updateTopic();
    this.deleteDiv.focus();
    this.status = "undone";
};
DeleteAction.prototype.redo = function () {
    if (this.status != "undone") {
        return;
    }
    this.deleteDiv.deleteQ();
    this.status = "done";
};

function undo() {
    if (actionIndex > 0) {
        actionStack[--actionIndex].undo();
    }
}

function redo() {
    if (actionIndex < actionStack.length) {
        actionStack[actionIndex++].redo();
    }
}