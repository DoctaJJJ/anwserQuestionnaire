/**
 * Created by Amy on 2018/7/31.
 */
/* Modernizr (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms3d-csstransitions-touch-shiv-load-cssclasses-prefixed-teststyles-testprops-testallprops-prefixes-domprefixes-mq-respond
 */
; window.Modernizr = function (e, t, n) { function C(e) { f.cssText = e } function k(e, t) { return C(h.join(e + ";") + (t || "")) } function L(e, t) { return typeof e === t } function A(e, t) { return !!~("" + e).indexOf(t) } function O(e, t) { for (var r in e) { var i = e[r]; if (!A(i, "-") && f[i] !== n) return t == "pfx" ? i : !0 } return !1 } function M(e, t, r) { for (var i in e) { var s = t[e[i]]; if (s !== n) return r === !1 ? e[i] : L(s, "function") ? s.bind(r || t) : s } return !1 } function _(e, t, n) { var r = e.charAt(0).toUpperCase() + e.slice(1), i = (e + " " + d.join(r + " ") + r).split(" "); return L(t, "string") || L(t, "undefined") ? O(i, t) : (i = (e + " " + v.join(r + " ") + r).split(" "), M(i, t, n)) } var r = "2.8.3", i = {}, s = !0, o = t.documentElement, u = "modernizr", a = t.createElement(u), f = a.style, l, c = {}.toString, h = " -webkit- -moz- -o- -ms- ".split(" "), p = "Webkit Moz O ms", d = p.split(" "), v = p.toLowerCase().split(" "), m = {}, g = {}, y = {}, b = [], w = b.slice, E, S = function (e, n, r, i) { var s, a, f, l, c = t.createElement("div"), h = t.body, p = h || t.createElement("body"); if (parseInt(r, 10)) while (r--) f = t.createElement("div"), f.id = i ? i[r] : u + (r + 1), c.appendChild(f); return s = ["&#173;", '<style id="s', u, '">', e, "</style>"].join(""), c.id = u, (h ? c : p).innerHTML += s, p.appendChild(c), h || (p.style.background = "", p.style.overflow = "hidden", l = o.style.overflow, o.style.overflow = "hidden", o.appendChild(p)), a = n(c, e), h ? c.parentNode.removeChild(c) : (p.parentNode.removeChild(p), o.style.overflow = l), !!a }, x = function (t) { var n = e.matchMedia || e.msMatchMedia; if (n) return n(t) && n(t).matches || !1; var r; return S("@media " + t + " { #" + u + " { position: absolute; } }", function (t) { r = (e.getComputedStyle ? getComputedStyle(t, null) : t.currentStyle)["position"] == "absolute" }), r }, T = {}.hasOwnProperty, N; !L(T, "undefined") && !L(T.call, "undefined") ? N = function (e, t) { return T.call(e, t) } : N = function (e, t) { return t in e && L(e.constructor.prototype[t], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function (t) { var n = this; if (typeof n != "function") throw new TypeError; var r = w.call(arguments, 1), i = function () { if (this instanceof i) { var e = function () { }; e.prototype = n.prototype; var s = new e, o = n.apply(s, r.concat(w.call(arguments))); return Object(o) === o ? o : s } return n.apply(t, r.concat(w.call(arguments))) }; return i }), m.touch = function () { var n; return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : S(["@media (", h.join("touch-enabled),("), u, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (e) { n = e.offsetTop === 9 }), n }, m.csstransforms3d = function () { var e = !!_("perspective"); return e && "webkitPerspective" in o.style && S("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (t, n) { e = t.offsetLeft === 9 && t.offsetHeight === 3 }), e }, m.csstransitions = function () { return _("transition") }; for (var D in m) N(m, D) && (E = D.toLowerCase(), i[E] = m[D](), b.push((i[E] ? "" : "no-") + E)); return i.addTest = function (e, t) { if (typeof e == "object") for (var r in e) N(e, r) && i.addTest(r, e[r]); else { e = e.toLowerCase(); if (i[e] !== n) return i; t = typeof t == "function" ? t() : t, typeof s != "undefined" && s && (o.className += " " + (t ? "" : "no-") + e), i[e] = t } return i }, C(""), a = l = null, function (e, t) { function c(e, t) { var n = e.createElement("p"), r = e.getElementsByTagName("head")[0] || e.documentElement; return n.innerHTML = "x<style>" + t + "</style>", r.insertBefore(n.lastChild, r.firstChild) } function h() { var e = y.elements; return typeof e == "string" ? e.split(" ") : e } function p(e) { var t = f[e[u]]; return t || (t = {}, a++, e[u] = a, f[a] = t), t } function d(e, n, r) { n || (n = t); if (l) return n.createElement(e); r || (r = p(n)); var o; return r.cache[e] ? o = r.cache[e].cloneNode() : s.test(e) ? o = (r.cache[e] = r.createElem(e)).cloneNode() : o = r.createElem(e), o.canHaveChildren && !i.test(e) && !o.tagUrn ? r.frag.appendChild(o) : o } function v(e, n) { e || (e = t); if (l) return e.createDocumentFragment(); n = n || p(e); var r = n.frag.cloneNode(), i = 0, s = h(), o = s.length; for (; i < o; i++) r.createElement(s[i]); return r } function m(e, t) { t.cache || (t.cache = {}, t.createElem = e.createElement, t.createFrag = e.createDocumentFragment, t.frag = t.createFrag()), e.createElement = function (n) { return y.shivMethods ? d(n, e, t) : t.createElem(n) }, e.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + h().join().replace(/[\w\-]+/g, function (e) { return t.createElem(e), t.frag.createElement(e), 'c("' + e + '")' }) + ");return n}")(y, t.frag) } function g(e) { e || (e = t); var n = p(e); return y.shivCSS && !o && !n.hasCSS && (n.hasCSS = !!c(e, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), l || m(e, n), e } var n = "3.7.0", r = e.html5 || {}, i = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, s = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, o, u = "_html5shiv", a = 0, f = {}, l; (function () { try { var e = t.createElement("a"); e.innerHTML = "<xyz></xyz>", o = "hidden" in e, l = e.childNodes.length == 1 || function () { t.createElement("a"); var e = t.createDocumentFragment(); return typeof e.cloneNode == "undefined" || typeof e.createDocumentFragment == "undefined" || typeof e.createElement == "undefined" }() } catch (n) { o = !0, l = !0 } })(); var y = { elements: r.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video", version: n, shivCSS: r.shivCSS !== !1, supportsUnknownElements: l, shivMethods: r.shivMethods !== !1, type: "default", shivDocument: g, createElement: d, createDocumentFragment: v }; e.html5 = y, g(t) }(this, t), i._version = r, i._prefixes = h, i._domPrefixes = v, i._cssomPrefixes = d, i.mq = x, i.testProp = function (e) { return O([e]) }, i.testAllProps = _, i.testStyles = S, i.prefixed = function (e, t, n) { return t ? _(e, t, n) : _(e, "pfx") }, o.className = o.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (s ? " js " + b.join(" ") : ""), i }(this, this.document), function (e, t, n) { function r(e) { return "[object Function]" == d.call(e) } function i(e) { return "string" == typeof e } function s() { } function o(e) { return !e || "loaded" == e || "complete" == e || "uninitialized" == e } function u() { var e = v.shift(); m = 1, e ? e.t ? h(function () { ("c" == e.t ? k.injectCss : k.injectJs)(e.s, 0, e.a, e.x, e.e, 1) }, 0) : (e(), u()) : m = 0 } function a(e, n, r, i, s, a, f) { function l(t) { if (!d && o(c.readyState) && (w.r = d = 1, !m && u(), c.onload = c.onreadystatechange = null, t)) { "img" != e && h(function () { b.removeChild(c) }, 50); for (var r in T[n]) T[n].hasOwnProperty(r) && T[n][r].onload() } } var f = f || k.errorTimeout, c = t.createElement(e), d = 0, g = 0, w = { t: r, s: n, e: s, a: a, x: f }; 1 === T[n] && (g = 1, T[n] = []), "object" == e ? c.data = n : (c.src = n, c.type = e), c.width = c.height = "0", c.onerror = c.onload = c.onreadystatechange = function () { l.call(this, g) }, v.splice(i, 0, w), "img" != e && (g || 2 === T[n] ? (b.insertBefore(c, y ? null : p), h(l, f)) : T[n].push(c)) } function f(e, t, n, r, s) { return m = 0, t = t || "j", i(e) ? a("c" == t ? E : w, e, t, this.i++, n, r, s) : (v.splice(this.i++, 0, e), 1 == v.length && u()), this } function l() { var e = k; return e.loader = { load: f, i: 0 }, e } var c = t.documentElement, h = e.setTimeout, p = t.getElementsByTagName("script")[0], d = {}.toString, v = [], m = 0, g = "MozAppearance" in c.style, y = g && !!t.createRange().compareNode, b = y ? c : p.parentNode, c = e.opera && "[object Opera]" == d.call(e.opera), c = !!t.attachEvent && !c, w = g ? "object" : c ? "script" : "img", E = c ? "script" : w, S = Array.isArray || function (e) { return "[object Array]" == d.call(e) }, x = [], T = {}, N = { timeout: function (e, t) { return t.length && (e.timeout = t[0]), e } }, C, k; k = function (e) { function t(e) { var e = e.split("!"), t = x.length, n = e.pop(), r = e.length, n = { url: n, origUrl: n, prefixes: e }, i, s, o; for (s = 0; s < r; s++) o = e[s].split("="), (i = N[o.shift()]) && (n = i(n, o)); for (s = 0; s < t; s++) n = x[s](n); return n } function o(e, i, s, o, u) { var a = t(e), f = a.autoCallback; a.url.split(".").pop().split("?").shift(), a.bypass || (i && (i = r(i) ? i : i[e] || i[o] || i[e.split("/").pop().split("?")[0]]), a.instead ? a.instead(e, i, s, o, u) : (T[a.url] ? a.noexec = !0 : T[a.url] = 1, s.load(a.url, a.forceCSS || !a.forceJS && "css" == a.url.split(".").pop().split("?").shift() ? "c" : n, a.noexec, a.attrs, a.timeout), (r(i) || r(f)) && s.load(function () { l(), i && i(a.origUrl, u, o), f && f(a.origUrl, u, o), T[a.url] = 2 }))) } function u(e, t) { function n(e, n) { if (e) { if (i(e)) n || (f = function () { var e = [].slice.call(arguments); l.apply(this, e), c() }), o(e, f, t, 0, u); else if (Object(e) === e) for (p in h = function () { var t = 0, n; for (n in e) e.hasOwnProperty(n) && t++; return t }(), e) e.hasOwnProperty(p) && (!n && !--h && (r(f) ? f = function () { var e = [].slice.call(arguments); l.apply(this, e), c() } : f[p] = function (e) { return function () { var t = [].slice.call(arguments); e && e.apply(this, t), c() } }(l[p])), o(e[p], f, t, p, u)) } else !n && c() } var u = !!e.test, a = e.load || e.both, f = e.callback || s, l = f, c = e.complete || s, h, p; n(u ? e.yep : e.nope, !!a), a && n(a) } var a, f, c = this.yepnope.loader; if (i(e)) o(e, 0, c, 0); else if (S(e)) for (a = 0; a < e.length; a++) f = e[a], i(f) ? o(f, 0, c, 0) : S(f) ? k(f) : Object(f) === f && u(f, c); else Object(e) === e && u(e, c) }, k.addPrefix = function (e, t) { N[e] = t }, k.addFilter = function (e) { x.push(e) }, k.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", C = function () { t.removeEventListener("DOMContentLoaded", C, 0), t.readyState = "complete" }, 0)), e.yepnope = l(), e.yepnope.executeStack = u, e.yepnope.injectJs = function (e, n, r, i, a, f) { var l = t.createElement("script"), c, d, i = i || k.errorTimeout; l.src = e; for (d in r) l.setAttribute(d, r[d]); n = f ? u : n || s, l.onreadystatechange = l.onload = function () { !c && o(l.readyState) && (c = 1, n(), l.onload = l.onreadystatechange = null) }, h(function () { c || (c = 1, n(1)) }, i), a ? l.onload() : p.parentNode.insertBefore(l, p) }, e.yepnope.injectCss = function (e, n, r, i, o, a) { var i = t.createElement("link"), f, n = a ? u : n || s; i.href = e, i.rel = "stylesheet", i.type = "text/css"; for (f in r) i.setAttribute(f, r[f]); o || (p.parentNode.insertBefore(i, p), h(n, 0)) } }(this, document), Modernizr.load = function () { yepnope.apply(window, [].slice.call(arguments, 0)) };



/*
 jquery css3 Ч�����
 /*!
 * jQuery Transit - CSS3 transitions and transformations
 * (c) 2011-2014 Rico Sta. Cruz
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */

/* jshint expr: true */

; (function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    } else {
        factory(root.jQuery);
    }

}(this, function ($) {

    $.transit = {
        version: "0.9.12",

        // Map of $.css() keys to values for 'transitionProperty'.
        // See https://developer.mozilla.org/en/CSS/CSS_transitions#Properties_that_can_be_animated
        propertyMap: {
            marginLeft: 'margin',
            marginRight: 'margin',
            marginBottom: 'margin',
            marginTop: 'margin',
            paddingLeft: 'padding',
            paddingRight: 'padding',
            paddingBottom: 'padding',
            paddingTop: 'padding'
        },

        // Will simply transition "instantly" if false
        enabled: true,

        // Set this to false if you don't want to use the transition end property.
        useTransitionEnd: false
    };

    var div = document.createElement('div');
    var support = {};

    // Helper function to get the proper vendor property name.
    // (`transition` => `WebkitTransition`)
    function getVendorPropertyName(prop) {
        // Handle unprefixed versions (FF16+, for example)
        if (prop in div.style) return prop;

        var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
        var prop_ = prop.charAt(0).toUpperCase() + prop.substr(1);

        for (var i = 0; i < prefixes.length; ++i) {
            var vendorProp = prefixes[i] + prop_;
            if (vendorProp in div.style) { return vendorProp; }
        }
    }

    // Helper function to check if transform3D is supported.
    // Should return true for Webkits and Firefox 10+.
    function checkTransform3dSupport() {
        div.style[support.transform] = '';
        div.style[support.transform] = 'rotateY(90deg)';
        return div.style[support.transform] !== '';
    }

    var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

    // Check for the browser's transitions support.
    support.transition = getVendorPropertyName('transition');
    support.transitionDelay = getVendorPropertyName('transitionDelay');
    support.transform = getVendorPropertyName('transform');
    support.transformOrigin = getVendorPropertyName('transformOrigin');
    support.filter = getVendorPropertyName('Filter');
    support.transform3d = checkTransform3dSupport();

    var eventNames = {
        'transition': 'transitionend',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'WebkitTransition': 'webkitTransitionEnd',
        'msTransition': 'MSTransitionEnd'
    };

    // Detect the 'transitionend' event needed.
    var transitionEnd = support.transitionEnd = eventNames[support.transition] || null;

    // Populate jQuery's `$.support` with the vendor prefixes we know.
    // As per [jQuery's cssHooks documentation](http://api.jquery.com/jQuery.cssHooks/),
    // we set $.support.transition to a string of the actual property name used.
    for (var key in support) {
        if (support.hasOwnProperty(key) && typeof $.support[key] === 'undefined') {
            $.support[key] = support[key];
        }
    }

    // Avoid memory leak in IE.
    div = null;

    // ## $.cssEase
    // List of easing aliases that you can use with `$.fn.transition`.
    $.cssEase = {
        '_default': 'ease',
        'in': 'ease-in',
        'out': 'ease-out',
        'in-out': 'ease-in-out',
        'snap': 'cubic-bezier(0,1,.5,1)',
        // Penner equations
        'easeInCubic': 'cubic-bezier(.550,.055,.675,.190)',
        'easeOutCubic': 'cubic-bezier(.215,.61,.355,1)',
        'easeInOutCubic': 'cubic-bezier(.645,.045,.355,1)',
        'easeInCirc': 'cubic-bezier(.6,.04,.98,.335)',
        'easeOutCirc': 'cubic-bezier(.075,.82,.165,1)',
        'easeInOutCirc': 'cubic-bezier(.785,.135,.15,.86)',
        'easeInExpo': 'cubic-bezier(.95,.05,.795,.035)',
        'easeOutExpo': 'cubic-bezier(.19,1,.22,1)',
        'easeInOutExpo': 'cubic-bezier(1,0,0,1)',
        'easeInQuad': 'cubic-bezier(.55,.085,.68,.53)',
        'easeOutQuad': 'cubic-bezier(.25,.46,.45,.94)',
        'easeInOutQuad': 'cubic-bezier(.455,.03,.515,.955)',
        'easeInQuart': 'cubic-bezier(.895,.03,.685,.22)',
        'easeOutQuart': 'cubic-bezier(.165,.84,.44,1)',
        'easeInOutQuart': 'cubic-bezier(.77,0,.175,1)',
        'easeInQuint': 'cubic-bezier(.755,.05,.855,.06)',
        'easeOutQuint': 'cubic-bezier(.23,1,.32,1)',
        'easeInOutQuint': 'cubic-bezier(.86,0,.07,1)',
        'easeInSine': 'cubic-bezier(.47,0,.745,.715)',
        'easeOutSine': 'cubic-bezier(.39,.575,.565,1)',
        'easeInOutSine': 'cubic-bezier(.445,.05,.55,.95)',
        'easeInBack': 'cubic-bezier(.6,-.28,.735,.045)',
        'easeOutBack': 'cubic-bezier(.175, .885,.32,1.275)',
        'easeInOutBack': 'cubic-bezier(.68,-.55,.265,1.55)'
    };

    // ## 'transform' CSS hook
    // Allows you to use the `transform` property in CSS.
    //
    //     $("#hello").css({ transform: "rotate(90deg)" });
    //
    //     $("#hello").css('transform');
    //     //=> { rotate: '90deg' }
    //
    $.cssHooks['transit:transform'] = {
        // The getter returns a `Transform` object.
        get: function (elem) {
            return $(elem).data('transform') || new Transform();
        },

        // The setter accepts a `Transform` object or a string.
        set: function (elem, v) {
            var value = v;

            if (!(value instanceof Transform)) {
                value = new Transform(value);
            }

            // We've seen the 3D version of Scale() not work in Chrome when the
            // element being scaled extends outside of the viewport.  Thus, we're
            // forcing Chrome to not use the 3d transforms as well.  Not sure if
            // translate is affectede, but not risking it.  Detection code from
            // http://davidwalsh.name/detecting-google-chrome-javascript
            if (support.transform === 'WebkitTransform' && !isChrome) {
                elem.style[support.transform] = value.toString(true);
            } else {
                elem.style[support.transform] = value.toString();
            }

            $(elem).data('transform', value);
        }
    };

    // Add a CSS hook for `.css({ transform: '...' })`.
    // In jQuery 1.8+, this will intentionally override the default `transform`
    // CSS hook so it'll play well with Transit. (see issue #62)
    $.cssHooks.transform = {
        set: $.cssHooks['transit:transform'].set
    };

    // ## 'filter' CSS hook
    // Allows you to use the `filter` property in CSS.
    //
    //     $("#hello").css({ filter: 'blur(10px)' });
    //
    $.cssHooks.filter = {
        get: function (elem) {
            return elem.style[support.filter];
        },
        set: function (elem, value) {
            elem.style[support.filter] = value;
        }
    };

    // jQuery 1.8+ supports prefix-free transitions, so these polyfills will not
    // be necessary.
    if ($.fn.jquery < "1.8") {
        // ## 'transformOrigin' CSS hook
        // Allows the use for `transformOrigin` to define where scaling and rotation
        // is pivoted.
        //
        //     $("#hello").css({ transformOrigin: '0 0' });
        //
        $.cssHooks.transformOrigin = {
            get: function (elem) {
                return elem.style[support.transformOrigin];
            },
            set: function (elem, value) {
                elem.style[support.transformOrigin] = value;
            }
        };

        // ## 'transition' CSS hook
        // Allows you to use the `transition` property in CSS.
        //
        //     $("#hello").css({ transition: 'all 0 ease 0' });
        //
        $.cssHooks.transition = {
            get: function (elem) {
                return elem.style[support.transition];
            },
            set: function (elem, value) {
                elem.style[support.transition] = value;
            }
        };
    }

    // ## Other CSS hooks
    // Allows you to rotate, scale and translate.
    registerCssHook('scale');
    registerCssHook('scaleX');
    registerCssHook('scaleY');
    registerCssHook('translate');
    registerCssHook('rotate');
    registerCssHook('rotateX');
    registerCssHook('rotateY');
    registerCssHook('rotate3d');
    registerCssHook('perspective');
    registerCssHook('skewX');
    registerCssHook('skewY');
    registerCssHook('x', true);
    registerCssHook('y', true);

    // ## Transform class
    // This is the main class of a transformation property that powers
    // `$.fn.css({ transform: '...' })`.
    //
    // This is, in essence, a dictionary object with key/values as `-transform`
    // properties.
    //
    //     var t = new Transform("rotate(90) scale(4)");
    //
    //     t.rotate             //=> "90deg"
    //     t.scale              //=> "4,4"
    //
    // Setters are accounted for.
    //
    //     t.set('rotate', 4)
    //     t.rotate             //=> "4deg"
    //
    // Convert it to a CSS string using the `toString()` and `toString(true)` (for WebKit)
    // functions.
    //
    //     t.toString()         //=> "rotate(90deg) scale(4,4)"
    //     t.toString(true)     //=> "rotate(90deg) scale3d(4,4,0)" (WebKit version)
    //
    function Transform(str) {
        if (typeof str === 'string') { this.parse(str); }
        return this;
    }

    Transform.prototype = {
        // ### setFromString()
        // Sets a property from a string.
        //
        //     t.setFromString('scale', '2,4');
        //     // Same as set('scale', '2', '4');
        //
        setFromString: function (prop, val) {
            var args =
                (typeof val === 'string') ? val.split(',') :
                    (val.constructor === Array) ? val :
                        [val];

            args.unshift(prop);

            Transform.prototype.set.apply(this, args);
        },

        // ### set()
        // Sets a property.
        //
        //     t.set('scale', 2, 4);
        //
        set: function (prop) {
            var args = Array.prototype.slice.apply(arguments, [1]);
            if (this.setter[prop]) {
                this.setter[prop].apply(this, args);
            } else {
                this[prop] = args.join(',');
            }
        },

        get: function (prop) {
            if (this.getter[prop]) {
                return this.getter[prop].apply(this);
            } else {
                return this[prop] || 0;
            }
        },

        setter: {
            // ### rotate
            //
            //     .css({ rotate: 30 })
            //     .css({ rotate: "30" })
            //     .css({ rotate: "30deg" })
            //     .css({ rotate: "30deg" })
            //
            rotate: function (theta) {
                this.rotate = unit(theta, 'deg');
            },

            rotateX: function (theta) {
                this.rotateX = unit(theta, 'deg');
            },

            rotateY: function (theta) {
                this.rotateY = unit(theta, 'deg');
            },

            // ### scale
            //
            //     .css({ scale: 9 })      //=> "scale(9,9)"
            //     .css({ scale: '3,2' })  //=> "scale(3,2)"
            //
            scale: function (x, y) {
                if (y === undefined) { y = x; }
                this.scale = x + "," + y;
            },

            // ### skewX + skewY
            skewX: function (x) {
                this.skewX = unit(x, 'deg');
            },

            skewY: function (y) {
                this.skewY = unit(y, 'deg');
            },

            // ### perspectvie
            perspective: function (dist) {
                this.perspective = unit(dist, 'px');
            },

            // ### x / y
            // Translations. Notice how this keeps the other value.
            //
            //     .css({ x: 4 })       //=> "translate(4px, 0)"
            //     .css({ y: 10 })      //=> "translate(4px, 10px)"
            //
            x: function (x) {
                this.set('translate', x, null);
            },

            y: function (y) {
                this.set('translate', null, y);
            },

            // ### translate
            // Notice how this keeps the other value.
            //
            //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
            //
            translate: function (x, y) {
                if (this._translateX === undefined) { this._translateX = 0; }
                if (this._translateY === undefined) { this._translateY = 0; }

                if (x !== null && x !== undefined) { this._translateX = unit(x, 'px'); }
                if (y !== null && y !== undefined) { this._translateY = unit(y, 'px'); }

                this.translate = this._translateX + "," + this._translateY;
            }
        },

        getter: {
            x: function () {
                return this._translateX || 0;
            },

            y: function () {
                return this._translateY || 0;
            },

            scale: function () {
                var s = (this.scale || "1,1").split(',');
                if (s[0]) { s[0] = parseFloat(s[0]); }
                if (s[1]) { s[1] = parseFloat(s[1]); }

                // "2.5,2.5" => 2.5
                // "2.5,1" => [2.5,1]
                return (s[0] === s[1]) ? s[0] : s;
            },

            rotate3d: function () {
                var s = (this.rotate3d || "0,0,0,0deg").split(',');
                for (var i = 0; i <= 3; ++i) {
                    if (s[i]) { s[i] = parseFloat(s[i]); }
                }
                if (s[3]) { s[3] = unit(s[3], 'deg'); }

                return s;
            }
        },

        // ### parse()
        // Parses from a string. Called on constructor.
        parse: function (str) {
            var self = this;
            str.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function (x, prop, val) {
                self.setFromString(prop, val);
            });
        },

        // ### toString()
        // Converts to a `transition` CSS property string. If `use3d` is given,
        // it converts to a `-webkit-transition` CSS property string instead.
        toString: function (use3d) {
            var re = [];

            for (var i in this) {
                if (this.hasOwnProperty(i)) {
                    // Don't use 3D transformations if the browser can't support it.
                    if ((!support.transform3d) && (
                        (i === 'rotateX') ||
                        (i === 'rotateY') ||
                        (i === 'perspective') ||
                        (i === 'transformOrigin'))) { continue; }

                    if (i[0] !== '_') {
                        if (use3d && (i === 'scale')) {
                            re.push(i + "3d(" + this[i] + ",1)");
                        } else if (use3d && (i === 'translate')) {
                            re.push(i + "3d(" + this[i] + ",0)");
                        } else {
                            re.push(i + "(" + this[i] + ")");
                        }
                    }
                }
            }

            return re.join(" ");
        }
    };

    function callOrQueue(self, queue, fn) {
        if (queue === true) {
            self.queue(fn);
        } else if (queue) {
            self.queue(queue, fn);
        } else {
            self.each(function () {
                fn.call(this);
            });
        }
    }

    // ### getProperties(dict)
    // Returns properties (for `transition-property`) for dictionary `props`. The
    // value of `props` is what you would expect in `$.css(...)`.
    function getProperties(props) {
        var re = [];

        $.each(props, function (key) {
            key = $.camelCase(key); // Convert "text-align" => "textAlign"
            key = $.transit.propertyMap[key] || $.cssProps[key] || key;
            key = uncamel(key); // Convert back to dasherized

            // Get vendor specify propertie
            if (support[key])
                key = uncamel(support[key]);

            if ($.inArray(key, re) === -1) { re.push(key); }
        });

        return re;
    }

    // ### getTransition()
    // Returns the transition string to be used for the `transition` CSS property.
    //
    // Example:
    //
    //     getTransition({ opacity: 1, rotate: 30 }, 500, 'ease');
    //     //=> 'opacity 500ms ease, -webkit-transform 500ms ease'
    //
    function getTransition(properties, duration, easing, delay) {
        // Get the CSS properties needed.
        var props = getProperties(properties);

        // Account for aliases (`in` => `ease-in`).
        if ($.cssEase[easing]) { easing = $.cssEase[easing]; }

        // Build the duration/easing/delay attributes for it.
        var attribs = '' + toMS(duration) + ' ' + easing;
        if (parseInt(delay, 10) > 0) { attribs += ' ' + toMS(delay); }

        // For more properties, add them this way:
        // "margin 200ms ease, padding 200ms ease, ..."
        var transitions = [];
        $.each(props, function (i, name) {
            transitions.push(name + ' ' + attribs);
        });

        return transitions.join(', ');
    }

    // ## $.fn.transition
    // Works like $.fn.animate(), but uses CSS transitions.
    //
    //     $("...").transition({ opacity: 0.1, scale: 0.3 });
    //
    //     // Specific duration
    //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
    //
    //     // With duration and easing
    //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
    //
    //     // With callback
    //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
    //
    //     // With everything
    //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
    //
    //     // Alternate syntax
    //     $("...").transition({
    //       opacity: 0.1,
    //       duration: 200,
    //       delay: 40,
    //       easing: 'in',
    //       complete: function() { /* ... */ }
    //      });
    //
    $.fn.transition = $.fn.transit = function (properties, duration, easing, callback) {
        var self = this;
        var delay = 0;
        var queue = true;

        var theseProperties = $.extend(true, {}, properties);

        // Account for `.transition(properties, callback)`.
        if (typeof duration === 'function') {
            callback = duration;
            duration = undefined;
        }

        // Account for `.transition(properties, options)`.
        if (typeof duration === 'object') {
            easing = duration.easing;
            delay = duration.delay || 0;
            queue = typeof duration.queue === "undefined" ? true : duration.queue;
            callback = duration.complete;
            duration = duration.duration;
        }

        // Account for `.transition(properties, duration, callback)`.
        if (typeof easing === 'function') {
            callback = easing;
            easing = undefined;
        }

        // Alternate syntax.
        if (typeof theseProperties.easing !== 'undefined') {
            easing = theseProperties.easing;
            delete theseProperties.easing;
        }

        if (typeof theseProperties.duration !== 'undefined') {
            duration = theseProperties.duration;
            delete theseProperties.duration;
        }

        if (typeof theseProperties.complete !== 'undefined') {
            callback = theseProperties.complete;
            delete theseProperties.complete;
        }

        if (typeof theseProperties.queue !== 'undefined') {
            queue = theseProperties.queue;
            delete theseProperties.queue;
        }

        if (typeof theseProperties.delay !== 'undefined') {
            delay = theseProperties.delay;
            delete theseProperties.delay;
        }

        // Set defaults. (`400` duration, `ease` easing)
        if (typeof duration === 'undefined') { duration = $.fx.speeds._default; }
        if (typeof easing === 'undefined') { easing = $.cssEase._default; }

        duration = toMS(duration);

        // Build the `transition` property.
        var transitionValue = getTransition(theseProperties, duration, easing, delay);

        // Compute delay until callback.
        // If this becomes 0, don't bother setting the transition property.
        var work = $.transit.enabled && support.transition;
        var i = work ? (parseInt(duration, 10) + parseInt(delay, 10)) : 0;

        // If there's nothing to do...
        if (i === 0) {
            var fn = function (next) {
                self.css(theseProperties);
                if (callback) { callback.apply(self); }
                if (next) { next(); }
            };

            callOrQueue(self, queue, fn);
            return self;
        }

        // Save the old transitions of each element so we can restore it later.
        var oldTransitions = {};

        var run = function (nextCall) {
            var bound = false;

            // Prepare the callback.
            var cb = function () {
                if (bound) { self.unbind(transitionEnd, cb); }

                if (i > 0) {
                    self.each(function () {
                        this.style[support.transition] = (oldTransitions[this] || null);
                    });
                }

                if (typeof callback === 'function') { callback.apply(self); }
                if (typeof nextCall === 'function') { nextCall(); }
            };

            if ((i > 0) && (transitionEnd) && ($.transit.useTransitionEnd)) {
                // Use the 'transitionend' event if it's available.
                bound = true;
                self.bind(transitionEnd, cb);
            } else {
                // Fallback to timers if the 'transitionend' event isn't supported.
                window.setTimeout(cb, i);
            }

            // Apply transitions.
            self.each(function () {
                if (i > 0) {
                    this.style[support.transition] = transitionValue;
                }
                $(this).css(theseProperties);
            });
        };

        // Defer running. This allows the browser to paint any pending CSS it hasn't
        // painted yet before doing the transitions.
        var deferredRun = function (next) {
            this.offsetWidth; // force a repaint
            run(next);
        };

        // Use jQuery's fx queue.
        callOrQueue(self, queue, deferredRun);

        // Chainability.
        return this;
    };

    function registerCssHook(prop, isPixels) {
        // For certain properties, the 'px' should not be implied.
        if (!isPixels) { $.cssNumber[prop] = true; }

        $.transit.propertyMap[prop] = support.transform;

        $.cssHooks[prop] = {
            get: function (elem) {
                var t = $(elem).css('transit:transform');
                return t.get(prop);
            },

            set: function (elem, value) {
                var t = $(elem).css('transit:transform');
                t.setFromString(prop, value);

                $(elem).css({ 'transit:transform': t });
            }
        };

    }

    // ### uncamel(str)
    // Converts a camelcase string to a dasherized string.
    // (`marginLeft` => `margin-left`)
    function uncamel(str) {
        return str.replace(/([A-Z])/g, function (letter) { return '-' + letter.toLowerCase(); });
    }

    // ### unit(number, unit)
    // Ensures that number `number` has a unit. If no unit is found, assume the
    // default is `unit`.
    //
    //     unit(2, 'px')          //=> "2px"
    //     unit("30deg", 'rad')   //=> "30deg"
    //
    function unit(i, units) {
        if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
            return i;
        } else {
            return "" + i + units;
        }
    }

    // ### toMS(duration)
    // Converts given `duration` to a millisecond string.
    //
    // toMS('fast') => $.fx.speeds[i] => "200ms"
    // toMS('normal') //=> $.fx.speeds._default => "400ms"
    // toMS(10) //=> '10ms'
    // toMS('100ms') //=> '100ms'
    //
    function toMS(duration) {
        var i = duration;

        // Allow string durations like 'fast' and 'slow', without overriding numeric values.
        if (typeof i === 'string' && (!i.match(/^[\-0-9\.]+/))) { i = $.fx.speeds[i] || $.fx.speeds._default; }

        return unit(i, 'ms');
    }

    // Export some functions for testable-ness.
    $.transit.getTransitionValue = getTransition;

    return $;
}));



/**
 * �ж�IE�����
 */


var isIE = ISIE = (function () {
    var browser = {};
    return function (ver, c) {
        var key = ver ? (c ? "is" + c + "IE" + ver : "isIE" + ver) : "isIE";
        var v = browser[key];
        if (typeof (v) != "undefined") {
            return v;
        }
        if (!ver) {
            v = (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0);
        } else {
            var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:|Edge\/)(\d+)/);
            if (match) {
                var v1 = parseInt(match[1]);
                v = c ? (c == 'lt' ? v1 < ver : (c == 'gt' ? v1 > ver : undefined)) : v1 == ver;
            } else if (ver <= 9) {
                var b = document.createElement('b')
                var s = '<!--[if ' + (c ? c : '') + ' IE ' + ver + ']><i></i><![endif]-->';
                b.innerHTML = s;
                v = b.getElementsByTagName('i').length === 1;
            } else {
                v = undefined;
            }
        }
        browser[key] = v;
        return v;
    };
}());
if (isIE(8)) {
    $("html").addClass("ie8");
} else if (isIE(7)) {
    $("html").addClass("ie7");
}
