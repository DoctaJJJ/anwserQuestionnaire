/**
 * Created by Amy on 2018/7/31.
 */
/**
 * @插件名 selectpick
 * @作用 用Jquery开发的一款美化下拉框插件
 * @作者 郜仕伟
 * @日期 2014-11-25
 * @修改者 iulog.com
 * @修改日期 2016-01-28
 * @Version 1.0
 */
;
(function (_$, window, document, undefined) {

    _$.fn.selectpick = function (options) {
        // selectpick的配置
        var selectpick_config = {
            container: "body",//模拟select生成的DIV存放的父容器
            height: 30,
            width: 150,
            // optionColor: "#3BAFDA",
            // selectedColor:"#3BAFDA",
            disabled: false, // 是否禁用,默认false
            // selectText: "", // 设置哪个文本被选中
            onSelect: "",// 点击后选中事件\
            flags: false,
            freeWidth: false, //下拉框的宽度是否固定   默认为false （固定）
            MaxfreeWidth: null
        }
        var settings = _$.extend({}, selectpick_config, options);

        // 每个下拉框组件的操作
        return this.each(function (elem_id) {
            var obj = this;
            var _offset = _$(this).offset();
            var top = _offset.top + _$(document).scrollTop();
            var elem_width = _$(obj).width();
            var left = _offset.left + _$(document).scrollLeft();
            var elem_id = _$(obj).attr("id"); // 元素的ID
            // 生成的div的样式
            var _selectBody = "<div class='selectpick-div-box' onselectstart='return false;'><div class='selectpick-div selectpick-div-" + elem_id + "'  id='selectpick-" + elem_id + "'><div id='selectpick-span-" + elem_id + "'></div><div class='selectpick-icon' id='selectpick-icon-" + elem_id + "'></div></div><div class='selectpick-options selectpick-options-" + elem_id + "'></div></div>";
            _$(_selectBody).appendTo(settings.container);
            _$(obj).addClass("select-hide");

            // 设置selectpick显示的位置
            _$(".selectpick-div-" + elem_id).css({
                "height": settings.height,
                "width": settings.width
            });
            _$(".selectpick-div-" + elem_id + " div").first().css({
                "width": settings.width - 40,
                "overflow": "hidden",
                "white-space": "nowrap",
                "text-overflow": "ellipsis"
            });
            //设置默认显示在div上的值为当前select的选中值
            _$(".selectpick-div-" + elem_id + " div").first().text(_$(obj).find("option:selected").text());

            // 是否禁用下拉框
            if (settings.disabled) {
                _$(".selectpick-div-" + elem_id).addClass("selectpick-no-select");
                return;
            }
            // 点击div显示列表
            _$(".selectpick-div-" + elem_id + ",#selectpick-span-" + elem_id + ",#selectpick-options-" + elem_id + "").bind("click", function (event) {
                _$(".selectpick-div").toggleClass("clicked"); //圆角切换
                var selected_text = _$(".selectpick-div-" + elem_id + " div").first().text(); // 当前div中的值
                event.stopPropagation(); //  阻止事件冒泡

                if (_$(".selectpick-ul-" + elem_id + " li").length > 0) {
                    // 隐藏和显示div
                    _$(".selectpick-options-" + elem_id).empty().hide();
                    return;
                } else {
                    _$(".selectpick-options").hide();
                    _$(".selectpick-options-" + elem_id).show();
                    _$(".selectpick-options ul li").remove();
                    // 添加列表项
                    var ul = "<ul class='selectpick-ul-" + elem_id + "'>";
                    if (_$(obj).children("optgroup").length > 0) {
                        _$(obj).children("optgroup").each(function () {
                            ul += "<em class='optHead'>" + _$(this).attr("label") + "</em>";
                            _$(this).find("option").each(function () {
                                if (_$(this).text() == selected_text) {
                                    ul += "<li class='selectpick-options-selected' style='height:" + settings.height + "px; line-height:" + (settings.height - 3) + "px;'><label style='display:none;'>" + _$(this).val() + "</label><label>" + _$(this).text() + "</label></li>";
                                } else {
                                    ul += "<li style='height:" + settings.height + "px; line-height:" + settings.height + "px;'><label style='display:none;'>" + _$(this).val() + "</label><label>" + _$(this).text() + "</label></li>";
                                }
                            })
                        });
                    } else {
                        _$(obj).children("option").each(function () {
                            if (_$(this).text() == selected_text) {
                                ul += "<li class='selectpick-options-selected' style='height:" + settings.height + "px; line-height:" + (settings.height - 3) + "px;'><label style='display:none;'>" + _$(this).val() + "</label><label>" + _$(this).text() + "</label></li>";
                            } else {
                                ul += "<li style='height:" + settings.height + "px; line-height:" + settings.height + "px;'><label style='display:none;'>" + _$(this).val() + "</label><label>" + _$(this).text() + "</label></li>";
                            }
                        });
                    }

                    ul += "</ul>";

                    //select弹出框不固定宽度设置
                    _$(".selectpick-options-" + elem_id).append(ul).show();
                    var widthCompare = _$(".selectpick-ul-" + elem_id + " li").width();
                    //function oldValue(value) {
                    //    return value;
                    //}
                    var widthOld = settings.width;

                    if (settings.freeWidth) {
                        settings.width = "auto";
                        if (widthCompare <= widthOld) {
                            settings.width = widthOld;
                        } else {
                            if (settings.MaxfreeWidth && widthCompare >= settings.MaxfreeWidth) {
                                settings.width = settings.MaxfreeWidth;
                            }
                            _$(".selectpick-ul-" + elem_id + " li").parent().css({
                                borderTop: "1px solid #abafb3"
                            });

                        }
                    }


                    _$(".selectpick-options-" + elem_id).css({
                        "width": settings.width,
                        "left": 0,
                        "top": settings.height
                    })


                    //每个li点击事件
                    _$(".selectpick-ul-" + elem_id + " li").bind("click", function () {

                        _$(".selectpick-div").removeClass("clicked"); //圆角切换
                        _$(".selectpick-div-" + elem_id + " div").first().text(_$(this).children("label").first().next().text());


                        // _$(obj).val(_$(this).children("label").first().text());//设置下拉框的值
                        _$(".selectpick-options-" + elem_id).empty().hide();
                        _$(obj).update(_$(this).children("label").first().text());//触发一个onchange方法
                        /*  if (isIE(8) || isIE(7)) {
                         _$(".selectpick-options").click();
                         }*/
                        //回调函数
                        if (settings.onSelect != undefined && settings.onSelect != "" && typeof settings.onSelect == "function") {
                            settings.onSelect(_$(this).children("label").first().text(), _$(this).children("label").first().next().text());
                        }


                    });
                    if(_$(".selectpick-ul-" + elem_id + " li").length>12)
                    {
                        _$(".selectpick-ul-" + elem_id).css({
                            "max-height": "360px",
                            "overflow-y": "auto"
                        })
                    }
                }

            });
            // 点击div外面关闭列表
            _$(document).bind("click", function (event) {
                var e = event || window.event;
                var elem = e.srcElement || e.target;
                if (elem.id == "selectpick-" + elem_id || elem.id == "selectpick-icon-" + elem_id || elem.id == "selectpick-span-" + elem_id) {
                    return;
                } else {
                    _$(".selectpick-div").removeClass("clicked"); //圆角切换
                    _$(".selectpick-options-" + elem_id).empty().hide();

                }
            });

        });
    };
    _$.fn.update = function (value) {  //赋值方法
        _$(this).each(function () {
            if (value != _$(this).val()) { //设置的新值和旧值不相等
                _$(this).val(value);
                _$(this).change(); //触发change方法  change是JQ的方法
            }
        });
    };
})(jQuery, window, document);