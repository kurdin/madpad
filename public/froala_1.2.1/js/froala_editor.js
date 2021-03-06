/*!
 * froala_editor v1.2.1 (http://editor.froala.com)
 * Copyright 2014-2014 Froala
 */
if ("undefined" == typeof jQuery) throw new Error("Froala requires jQuery");
! function(a) {
    "use strict";
    var b = function(c, d) {
        this.options = a.extend({}, b.DEFAULTS, a(c).data(), "object" == typeof d && d), this.browser = b.browser(), this.disabledList = [], this._id = ++b.count, this.blurred = !0, this.init(c)
    };
    b.initializers = [], b.count = 0, b.VALID_NODES = ["P", "PRE", "BLOCKQUOTE", "H1", "H2", "H3", "H4", "H5", "H6", "DIV", "LI", "TD", "TH"], b.LANGS = [], b.DEFAULTS = {
        allowedAttrs: ["title", "href", "alt", "src", "style", "width", "height", "target", "rel", "name", "value", "type", "colspan", "rowspan", "size", "color", "cellpadding", "cellspacing", "valign", "align", "autocomplete", "background", "bgcolor", "contenteditable", "tabindex", "data-.*", "contenteditable", "tabindex"],
        allowedTags: ["div", "p", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "pre", "blockquote", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "span", "b", "u", "i", "strong", "em", "strike", "img", "ul", "ol", "li", "iframe", "object", "a", "main", "section", "article", "nav", "header", "aside", "figure", "figurecaption", "footer", "details", "summary", "mark", "time", "sub", "sup"],
        alwaysBlank: !1,
        alwaysVisible: !1,
        autosave: !1,
        autosaveInterval: 1e4,
        blockTags: ["n", "p", "blockquote", "pre", "h1", "h2", "h3", "h4", "h5", "h6"],
        buttons: ["bold", "italic", "underline", "strikeThrough", "fontSize", "fontFamily", "color", "sep", "formatBlock", "blockStyle", "align", "insertOrderedList", "insertUnorderedList", "outdent", "indent", "sep", "createLink", "insertImage", "insertVideo", "insertHorizontalRule", "undo", "redo"],
        crossDomain: !0,
        customButtons: {},
        customDropdowns: {},
        customText: !1,
        defaultImageWidth: 300,
        direction: "ltr",
        disableRightClick: !1,
        editInPopup: !1,
        editorClass: "",
        formatTags: ["p", "pre", "blockquote", "h1", "h2", "h3", "h4", "h5", "h6", "div", "ul", "ol", "li", "table", "tbody", "thead", "tfoot", "tr", "th", "td"],
        headers: {},
        height: "auto",
        icons: {},
        inlineMode: !0,
        initOnClick: !1,
        language: "en_us",
        linkList: [],
        linkText: !0,
        linkClasses: {},
        maxHeight: "auto",
        minHeight: "auto",
        noFollow: !0,
        paragraphy: !0,
        placeholder: "Type something",
        plainPaste: !1,
        preloaderSrc: "",
        saveURL: null,
        saveParams: {},
        saveRequestType: "POST",
        simpleAmpersand: !1,
        shortcuts: !0,
        spellcheck: !1,
        theme: null,
        toolbarFixed: !0,
        trackScroll: !1,
        unlinkButton: !0,
        tabSpaces: !0,
        typingTimer: 1,
        pastedImagesUploadRequestType: "POST",
        pastedImagesUploadURL: null,
        width: "auto",
        withCredentials: !1,
        zIndex: 1e3
    }, b.prototype.makeUneditable = function() {
        this.uneditable = true;
        this.$element.attr("contenteditable", 0);
    }, b.prototype.makeEditable = function() {
        this.uneditable = false;
        this.$element.attr("contenteditable", 1);
    }, b.prototype.destroy = function() {
        this.sync(), this.addFrTag(), this.hide(), this.isHTML && this.html(), this.focus(), this.clearSelection(), this.$element.blur(), this.$bttn_wrapper && this.$bttn_wrapper.html("").removeData().remove(), this.$editor && this.$editor.html("").removeData().remove(), this.raiseEvent("destroy"), this.$popup_editor && this.$popup_editor.html("").removeData().remove(), clearTimeout(this.ajaxInterval), clearTimeout(this.typingTimer), this.$element.off("mousedown mouseup click keydown keyup cut focus keypress touchstart touchend touch drop"), this.$element.off("mousedown mouseup click keydown keyup cut focus keypress touchstart touchend touch drop", "**"), a(window).off("mouseup." + this._id), a(window).off("keydown." + this._id), a(window).off("keyup." + this._id), a(window).off("hide." + this._id), a(window).off("scroll." + this._id), a(window).off("orientationchange." + this._id), a(document).off("selectionchange." + this._id), void 0 !== this.$upload_frame && this.$upload_frame.remove(), this.$textarea && (this.$box.remove(), this.$textarea.removeData("fa.editable"), this.$textarea.show());
        for (var b in this._events) delete this._events[b];
        this.isLink ? this.$element.removeData("fa.editable") : (this.$element.replaceWith(this.getHTML()), this.$box && !this.editableDisabled && (this.$box.removeClass("froala-box"), this.$box.find(".html-switch").remove(), this.$box.removeData("fa.editable"), clearTimeout(this.typingTimer)))
    }, b.prototype.triggerEvent = function(b, c, d) {
        void 0 === d && (d = !0);
        var e = !0,
            f = b + "Callback";
        return this.options[f] && a.isFunction(this.options[f]) && (e = c ? this.options[f].apply(this, c) : this.options[f].call(this)), c || (c = []), e = this.$textarea ? this.$textarea.triggerHandler("editable." + b, a.merge([this], c)) : this.$box.triggerHandler("editable." + b, a.merge([this], c)), d === !0 && (this.sync(), this.isResizing() || this.editableDisabled || this.android() || this.imageMode || this.cleanify()), void 0 === e ? !0 : e
    }, b.prototype.syncCleanHTML = function(a, b) {
        var c;
        if (b)
            for (c = a.replace(/<span((?!class\s*=\s*["']?f-marker["']?)[^>])*?><\/span>/gi, ""); a != c;) a = c, c = a.replace(/<span((?!class\s*=\s*["']?f-marker["']?)[^>])*?><\/span>/gi, "");
        else
            for (c = a.replace(/<span[^>]*?><\/span>/g, ""); a != c;) a = c, c = a.replace(/<span[^>]*?><\/span>/g, "");
        return a
    }, b.prototype.syncClean = function(b, c) {
        var d = "span:empty";
        c && (d = "span:empty:not(.f-marker)");
        for (var e = !1, f = function(b, c) {
            0 === c.attributes.length && (a(c).remove(), e = !1)
        }, g = b.find(d); g.length && e === !1;) e = !0, g.each(f), g = b.find(d)
    }, b.prototype.sync = function() {
        if (!this.isHTML) {
            this.raiseEvent("sync"), this.disableImageResize(), this.isLink || this.isImage || this.$element.trigger("placeholderCheck");
            var a = this.getHTML();
            this.isHTML || (this.trackHTML !== a && null != this.trackHTML ? (this.triggerEvent("contentChanged", [], !1), this.refreshImageList(), this.refreshButtons(), this.trackHTML = a) : null == this.trackHTML && (this.trackHTML = a)), this.$textarea && this.$textarea.val(a)
        }
    }, b.prototype.emptyElement = function(b) {
        if ("IMG" == b.tagName || a(b).find("img").length > 0) return !1;
        if (a(b).find("input, iframe").length > 0) return !1;
        for (var c = a(b).text(), d = 0; d < c.length; d++)
            if ("\n" !== c[d] && "\r" !== c[d] && "	" !== c[d]) return !1;
        return !0
    }, b.prototype.continueInit = function() {
        this.browserFixes(), this.editableDisabled || (this.initUndoRedo(), this.enableTyping(), this.initShortcuts()), this.initTabs(), this.initEditor(), this.isLink || this.initDrag();
        for (var b = 0; b < a.Editable.initializers.length; b++) a.Editable.initializers[b].call(this);
        this.initOptions(), this.initEditorSelection(), this.initAjaxSaver(), this.setLanguage(), this.setCustomText(), this.isImage || this.isLink || this.registerPaste(), this.$element.blur(), this.initialized = !0, this.refreshButtons(!0), this.triggerEvent("initialized", [], !1)
    }, b.prototype.init = function(b) {
        this.initElement(b), this.initElementStyle(), this.options.initOnClick ? (this.editableDisabled || this.$element.attr("contenteditable", !0), this.$element.bind("mousedown", a.proxy(function() {
            this.$element.unbind("mousedown"), this.$element.attr("contenteditable", !1), this.saveSelectionByMarkers(), this.continueInit(), this.restoreSelectionByMarkers(), this.hideOtherEditors()
        }, this))) : this.continueInit()
    }, b.prototype.mobile = function() {
        return this.iOS() || this.android() || this.blackberry()
    }, b.prototype.iOS = function() {
        return /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
    }, b.prototype.iPad = function() {
        return /(iPad)/g.test(navigator.userAgent)
    }, b.prototype.iPhone = function() {
        return /(iPhone)/g.test(navigator.userAgent)
    }, b.prototype.iPod = function() {
        return /(iPod)/g.test(navigator.userAgent)
    }, b.prototype.android = function() {
        return /(Android)/g.test(navigator.userAgent)
    }, b.prototype.blackberry = function() {
        return /(Blackberry)/g.test(navigator.userAgent)
    }, b.prototype.initOnTextarea = function(b) {
        this.$textarea = a(b), void 0 !== this.$textarea.attr("placeholder") && "Type something" == this.options.placeholder && (this.options.placeholder = this.$textarea.attr("placeholder")), this.$element = a("<div>").html(this.$textarea.val()), this.$textarea.before(this.$element).hide(), this.$textarea.parents("form").bind("submit", a.proxy(function() {
            this.isHTML ? this.html() : this.sync()
        }, this))
    }, b.prototype.initOnLink = function(b) {
        this.isLink = !0, this.selectionDisabled = !0, this.editableDisabled = !0, this.options.buttons = [], this.$element = a(b), this.options.paragraphy = !1, this.$box = this.$element
    }, b.prototype.initOnImage = function(b) {
        var c = a(b).css("float");
        "A" == a(b).parent().get(0).tagName && (b = a(b).parent()), this.isImage = !0, this.editableDisabled = !0, this.imageList = [], this.options.buttons = [], this.options.paragraphy = !1, this.options.imageMargin = "auto", a(b).wrap("<div>"), this.$element = a(b).parent(), this.$element.css("display", "inline-block"), this.$element.css("max-width", "100%"), this.$element.css("margin-left", "auto"), this.$element.css("margin-right", "auto"), this.$element.css("float", c), this.$element.addClass("f-image"), this.$box = a(b)
    }, b.prototype.initForPopup = function(b) {
        this.$element = a(b), this.$box = this.$element, this.editableDisabled = !0, this.options.buttons = [], this.$element.on("click", a.proxy(function(a) {
            a.preventDefault()
        }, this))
    }, b.prototype.initOnDefault = function(b) {
        "DIV" != b.tagName && this.options.buttons.indexOf("formatBlock") >= 0 && this.disabledList.push("formatBlock"), this.$element = a(b)
    }, b.prototype.initElement = function(b) {
        "TEXTAREA" == b.tagName ? this.initOnTextarea(b) : "A" == b.tagName ? this.initOnLink(b) : "IMG" == b.tagName ? this.initOnImage(b) : this.options.editInPopup ? this.initForPopup(b) : this.initOnDefault(b), this.editableDisabled || (this.$box = this.$element, this.$element = a("<div>"), this.setHTML(this.$box.html(), !1), this.$box.html(this.$element).addClass("froala-box"), this.$element.on("keyup", a.proxy(function(a) {
            var b = a.which;
            13 == b && this.webkitParagraphy()
        }, this))), this.$element.on("drop", a.proxy(function() {
            setTimeout(a.proxy(function() {
                a("html").click(), this.$element.find(".f-img-wrap").each(function(b, c) {
                    0 === a(c).find("img").length && a(c).remove()
                }), this.$element.find("p:empty").remove()
            }, this), 1)
        }, this)), this.sync()
    }, b.prototype.webkitParagraphy = function() {
        this.$element.find("*").each(a.proxy(function(b, c) {
            if (this.emptyElement(c) && "DIV" == c.tagName && this.options.paragraphy === !0) {
                var d = a("<p><br/></p>");
                a(c).replaceWith(d), this.setSelection(d.get(0))
            }
        }, this))
    }, b.prototype.trim = function(a) {
        return String(a).replace(/^\s+|\s+$/g, "")
    }, b.prototype.unwrapText = function() {
        this.options.paragraphy || this.$element.find("div").each(function(b, c) {
            void 0 === a(c).attr("style") && a(c).replaceWith(a(c).html() + "<br/>")
        })
    }, b.prototype.wrapTextInElement = function(b) {
        var c = [],
            d = ["SPAN", "A", "B", "I", "EM", "U", "S", "STRONG", "STRIKE", "FONT", "IMG", "SUB", "SUP"],
            e = this,
            f = function() {
                if (0 !== c.length) {
                    var b;
                    b = a(e.options.paragraphy === !0 ? "<p>" : "<div>");
                    var d = a(c[0]);
                    if (1 == c.length && "f-marker" == d.attr("class")) return void(c = []);
                    for (var f = 0; f < c.length; f++) {
                        var g = a(c[f]);
                        b.append(g.clone()), f == c.length - 1 ? g.replaceWith(b) : g.remove()
                    }
                    c = []
                }
            };
        b.contents().filter(function() {
            var b = a(this);
            this.nodeType == Node.TEXT_NODE && b.text().trim().length > 0 || d.indexOf(this.tagName) >= 0 ? c.push(this) : this.nodeType == Node.TEXT_NODE && 0 === b.text().trim().length ? b.remove() : f()
        }), f(), b.find("> p, > div").each(function(b, c) {
            0 === a(c).text().trim().length && 0 === a(c).find("img").length && 0 === a(c).find("br").length && a(c).append("<br/>")
        }), b.find("div:empty, > br").remove()
    }, b.prototype.wrapText = function() {
        return this.isImage || this.isLink ? !1 : (this.webkitParagraphy(), void this.wrapTextInElement(this.$element))
    }, b.prototype.setHTML = function(a, b) {
        this.no_verify = !0, void 0 === b && (b = !0), a = this.clean(a, !0, !1), a = a.replace(/>\s+</g, "><"), this.$element.html(a), this.imageList = [], this.refreshImageList(), this.options.paragraphy && this.wrapText(), b === !0 && (this.restoreSelectionByMarkers(), this.sync()), this.no_verify = !1, this.$element.find("span").data("fr-verified", !0)
    }, b.prototype.breakHtml = function(b) {
        this.removeMarkers(), this.insertHTML("<break></break>"), this.$element.find("break").remove(), this.pasting = !1, this.$element.trigger("placeholderCheck"), this.pasting = !0;
        var c = this.getSelectionElements()[0];
        if (c == this.$element.get(0)) return this.insertHTML(b), !0;
        this.insertHTML("<break></break>");
        for (var d, e, f = a("<div></div>").append(a(c).clone()).html(), g = [], h = {}, i = [], j = 0, k = 0; k < f.length; k++)
            if (e = f.charAt(k), "<" == e) {
                var l = f.indexOf(">", k + 1);
                if (-1 !== l) {
                    d = f.substring(k, l + 1);
                    var m = this.tagName(d);
                    if (k = l, "break" == m) {
                        if (!this.isClosingTag(d)) {
                            for (var n = g.length - 1; n >= 0; n--) {
                                var o = this.tagName(g[n]);
                                i.push("</" + o + ">")
                            }
                            i.push(b);
                            for (var p = 0; p < g.length; p++) i.push(g[p]);
                            i.push('<span class="f-marker" data-type="true" data-id="0" data-fr-verified="true"></span><span class="f-marker" data-type="false" data-id="0" data-fr-verified="true"></span>')
                        }
                    } else if (i.push(d), !this.isSelfClosingTag(d))
                        if (this.isClosingTag(d)) {
                            var q = h[m].pop();
                            g.splice(q, 1)
                        } else g.push(d), void 0 === h[m] && (h[m] = []), h[m].push(g.length - 1)
                }
            } else j++, i.push(e);
        a(c).replaceWith(i.join("")), this.restoreSelectionByMarkers()
    }, b.prototype.beforePaste = function() {
        this.pasting = !0, this.saveSelection(), this.scrollPosition = a(window).scrollTop(), this.$pasteDiv = a('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; width: 0; z-index: 99999;"></div>').appendTo("body"), this.$pasteDiv.focus()
    }, b.prototype.processPaste = function() {
        var b = this.$pasteDiv.html();
        if (this.$pasteDiv.remove(), b = b.replace(/<img /gi, '<img data-fr-image-pasted="true" '), a(window).scrollTop(this.scrollPosition), this.restoreSelection(), this.options.plainPaste) this.insertHTML(b.replace(/<(?!br\s*\/?)[^>]+>/g, ""));
        else {
            var c;
            c = b.match(/(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/gi) ? this.wordClean(b) : this.clean(b, !1, !0);
            for (var d = !1, e = a("<div>").append(c).find("*"), f = 0; f < e.length; f++)
                if (a.Editable.VALID_NODES.indexOf(e[f].tagName) >= 0) {
                    this.breakHtml(c), d = !0;
                    break
                }
            d || this.insertHTML(c), this.$element.find("li").each(a.proxy(function(b, c) {
                this.wrapTextInElement(a(c))
            }, this))
        }
        this.afterPaste()
    }, b.prototype.afterPaste = function() {
        this.focus(), this.uploadPastedImages(), this.sync(), this.cleanify(), this.$element.trigger("placeholderCheck"), this.pasting = !1, this.triggerEvent("afterPaste")
    }, b.prototype.registerPaste = function() {
        this.$element.get(0).onpaste = a.proxy(function(b) {
            if (!this.isHTML) {
                if (!this.triggerEvent("beforePaste", [], !1)) return !1;
                if (this.clipboardPaste(b)) return !1;
                this.beforePaste(), window.setTimeout(a.proxy(this.processPaste, this), 1)
            }
        }, this)
    }, b.prototype.clipboardPaste = function(b) {
        if (b && b.clipboardData && b.clipboardData.items) {
            var c = b.clipboardData.items[0].getAsFile();
            if (c) {
                var d = new FileReader;
                return d.onload = a.proxy(function(a) {
                    var b = a.target.result;
                    this.insertHTML('<img data-fr-image-pasted="true" src="' + b + '" />'), this.afterPaste()
                }, this), d.readAsDataURL(c), !0
            }
        }
        return !1
    }, b.prototype.uploadPastedImages = function() {
        this.$element.find("img[data-fr-image-pasted]").each(a.proxy(function(b, c) {
            0 === c.src.indexOf("data:") ? (this.options.pastedImagesUploadURL && (setTimeout(a.proxy(function() {
                this.showImageLoader(), this.$progress_bar.find("span").css("width", "100%").text("Please wait!"), this.showByCoordinates(a(c).offset().left + a(c).width() / 2, a(c).offset().top + a(c).height() + 10), this.isDisabled = !0
            }, this), 10), a.ajax({
                type: this.options.pastedImagesUploadRequestType,
                url: this.options.pastedImagesUploadURL,
                data: {
                    image: decodeURIComponent(c.src)
                },
                crossDomain: this.options.crossDomain,
                xhrFields: {
                    withCredentials: this.options.withCredentials
                },
                headers: this.options.headers,
                dataType: "json"
            }).done(a.proxy(function(b) {
                try {
                    if (b.link) {
                        var d = new Image;
                        d.onerror = a.proxy(function() {
                            this.throwImageError(1)
                        }, this), d.onload = a.proxy(function() {
                            c.src = b.link, this.hideImageLoader(), this.hide(), this.enable(), this.triggerEvent("afterUploadPastedImage", [a(c)])
                        }, this), d.src = b.link
                    } else b.error ? this.throwImageErrorWithMessage(b.error) : this.throwImageError(2)
                } catch (e) {
                    this.throwImageError(4)
                }
            }, this)).fail(a.proxy(function() {
                this.throwImageError(3)
            }, this))), a(c).removeAttr("data-fr-image-pasted")) : 0 !== c.src.indexOf("http") && a(c).remove()
        }, this))
    }, b.prototype.disable = function() {
        this.isDisabled = !0, this.$element.blur()
    }, b.prototype.enable = function() {
        this.isDisabled = !1
    }, b.prototype.wordClean = function(a) {
        a = a.replace(/<p(.*?)class="MsoListParagraph"([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li><p>$3</p></li></ul>"), a = a.replace(/<p(.*?)class="MsoListParagraphCxSpFirst"([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li><p>$3</p></li>"), a = a.replace(/<p(.*?)class="MsoListParagraphCxSpMiddle"([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li><p>$3</p></li>"), a = a.replace(/<p(.*?)class="MsoListParagraphCxSpLast"([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li><p>$3</p></li></ul>"), a = a.replace(/<span([^<]*?)style="mso-list:Ignore"([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span"), a = a.replace(/<!--\[if \!supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, ""), a = a.replace(/(\n|\r| class=(")?Mso[a-zA-Z]+(")?)/gi, " "), a = a.replace(/<!--[\s\S]*?-->/gi, ""), a = a.replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
        for (var b = ["style", "script", "applet", "embed", "noframes", "noscript"], c = 0; c < b.length; c++) {
            var d = new RegExp("<" + b[c] + ".*?" + b[c] + "(.*?)>", "gi");
            a = a.replace(d, "")
        }
        a = a.replace(/([\w\-]*)=("[^<>"]*"|'[^<>']*'|\w+)/gi, ""), a = a.replace(/&nbsp;/gi, "");
        var e;
        do e = a, a = a.replace(/<[^\/>][^>]*><\/[^>]+>/gi, ""); while (a != e);
        return a
    }, b.prototype.tabs = function(a) {
        for (var b = "", c = 0; a > c; c++) b += "  ";
        return b
    }, b.prototype.cleanTags = function(a, b) {
        void 0 === b && (b = !1);
        var c, d, e, f, g = this.options.formatTags,
            h = [],
            i = [],
            j = !1;
        for (d = 0; d < a.length; d++)
            if (c = a.charAt(d), "<" == c) {
                var k = a.indexOf(">", d + 1);
                if (-1 !== k) {
                    var l = a.substring(d, k + 1),
                        m = this.tagName(l),
                        n = this.isClosingTag(l);
                    if ("pre" === m && (j = n ? !1 : !0), this.isSelfClosingTag(l)) i.push("br" === m && j ? "\n" : l);
                    else if (n)
                        for (e = !1, f = !0; e === !1 && void 0 !== f;) f = h.pop(), void 0 !== f && f.tag_name !== m ? i.splice(f.i, 1) : (e = !0, void 0 !== f && i.push(l));
                    else i.push(l), h.push({
                        tag_name: m,
                        i: i.length - 1
                    });
                    d = k
                }
            } else "\n" === c ? b && j && i.push("<br/>") : i.push(c);
        for (; h.length > 0;) f = h.pop(), i.splice(f.i, 1);
        for (a = "", h = 0, d = 0; d < i.length; d++) 1 == i[d].length ? a += i[d] : g.indexOf(this.tagName(i[d]).toLowerCase()) < 0 ? a += i[d] : this.isSelfClosingTag(i[d]) ? a += i[d] : this.isClosingTag(i[d]) ? (h -= 1, a.length > 0 && "\n" == a[a.length - 1] && (a += this.tabs(h)), a += i[d] + "\n") : (a += "\n" + this.tabs(h) + i[d], h += 1);
        return "\n" == a[0] && (a = a.substring(1, a.length)), "\n" == a[a.length - 1] && (a = a.substring(0, a.length - 1)), a
    }, b.prototype.clean = function(b, c, d, e, f) {
        f || (f = this.options.allowedAttrs), e || (e = this.options.allowedTags), c === !0 && (f.push("id"), f.push("class")), b = b.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
        var g = new RegExp("<\\/?((?!(?:" + e.join("|") + "))\\w+)[^>]*?>", "gi");
        b = b.replace(g, "");
        var h = new RegExp("( (?!(?:" + f.join("|") + "))\\S+)=((?:.(?!\\s+(?:\\S+)=|[>]|(\\/>)))+.)", "gi");
        b = b.replace(h, "");
        var i = new RegExp('<([^>]*)(src|href)=(\'[^\']*\'|""[^""]*""|[^\\s>]+)([^>]*)>', "gi");
        if (b = b.replace(i, a.proxy(function(a, b, c, d, e) {
            return "<" + b + c + '="' + this.sanitizeURL(d.replace(/^["'](.*)["']\/?$/gi, "$1")) + '"' + e + ">"
        }, this)), d) {
            var j = new RegExp('style="[a-zA-Z0-9:;\\.\\s\\(\\)\\-\\,]*"', "gi");
            b = b.replace(j, "")
        }
        return b = this.cleanTags(b, !0)
    }, b.prototype.cleanNewLine = function(a) {
        var b = new RegExp("\\n", "g");
        return a.replace(b, "")
    }, b.prototype.initElementStyle = function() {
        this.editableDisabled || this.$element.attr("contenteditable", !0);
        var a = "froala-element " + this.options.editorClass;
        this.browser.msie && b.getIEversion() < 9 && (a += " ie8"), this.$element.css("outline", 0), this.browser.msie || (a += " not-msie"), this.$element.addClass(a), this.$element.attr("id", "realEditor")
    }, b.prototype.initUndoRedo = function() {
        (this.isEnabled("undo") || this.isEnabled("redo")) && (this.undoStack = [], this.undoIndex = 0, this.saveUndoStep()), this.disableBrowserUndo()
    }, b.prototype.enableTyping = function() {
        this.typingTimer = null, this.$element.on("keydown cut", a.proxy(function() {
            clearTimeout(this.typingTimer), this.ajaxSave = !1, this.oldHTML = this.getHTML(), this.typingTimer = setTimeout(a.proxy(function() {
                var a = this.getHTML();
                a != this.oldHTML && (this.saveUndoStep(), this.sync())
            }, this), Math.max(this.options.typingTimer, 1))
        }, this))
    }, b.prototype.removeMarkersByRegex = function(a) {
        return a.replace(/<span[^>]*? class\s*=\s*["']?f-marker["']?[^>]+>([\S\s][^\/])*<\/span>/gi, "")
    }, b.prototype.getImageHTML = function() {
        return JSON.stringify({
            src: this.$element.find("img").attr("src"),
            style: this.$element.find("img").attr("style"),
            alt: this.$element.find("img").attr("alt"),
            width: this.$element.find("img").attr("width"),
            link: this.$element.find("a").attr("href"),
            link_title: this.$element.find("a").attr("title"),
            link_target: this.$element.find("a").attr("target")
        })
    }, b.prototype.getLinkHTML = function() {
        return JSON.stringify({
            body: this.$element.html(),
            href: this.$element.attr("href"),
            title: this.$element.attr("title"),
            popout: this.$element.hasClass("popout"),
            nofollow: "nofollow" == this.$element.attr("ref"),
            blank: "_blank" == this.$element.attr("target"),
            left: this.$element.parents(".navbar-left").length > 0,
            "class": this.$element.attr("class").replace(/froala-element/, "").replace(/not-msie/, "").replace(/ +(?= )/g, "").split(" ").sort().join(" ")
        })
    }, b.prototype.addFrTag = function() {
        this.$element.find("p, h1, h2, h3, h4, h5, h6, pre, blockquote, table, ul, ol, img").addClass("fr-tag")
    }, b.prototype.getHTML = function(b, c) {
        if (void 0 === c && (c = !1), void 0 === b && (b = !1), this.isHTML) return this.$html_area.val();
        if (this.isImage) return this.getImageHTML();
        if (this.isLink) return this.getLinkHTML();
        this.$element.find("a").data("fr-link", !0), c && this.addFrTag(), this.$element.find(".f-img-editor > img").each(a.proxy(function(b, c) {
            this.addImageClass(a(c), this.getImageClass(a(c).parent().attr("class")))
        }, this)), this.$element.find("pre").each(a.proxy(function(b, c) {
            var d = a(c),
                e = d.html(),
                f = e.replace(/\&nbsp;/gi, " ");
            e != f && (this.saveSelectionByMarkers(), d.html(f), this.restoreSelectionByMarkers())
        }, this));
        var d = this.$element.html();
        return this.$element.find(".f-img-editor > img").removeClass("fr-fin fr-fil fr-fir"), this.$element.find("p, h1, h2, h3, h4, h5, h6, pre, blockquote, table, ul, ol, img").removeClass("fr-tag"), d = this.syncCleanHTML(d, b), d = d.replace(/<a[^>]*?><\/a>/g, ""), b || (d = this.removeMarkersByRegex(d)), d = d.replace(/<span[^>]*? class\s*=\s*["']?f-img-handle[^>]+><\/span>/gi, ""), d = d.replace(/^([\S\s]*)<span[^>]*? class\s*=\s*["']?f-img-editor[^>]+>([\S\s]*)<\/span>([\S\s]*)$/gi, "$1$2$3"), d = d.replace(/^([\S\s]*)<span[^>]*? class\s*=\s*["']?f-img-wrap[^>]+>([\S\s]*)<\/span>([\S\s]*)$/gi, "$1$2$3"), d = d.replace(/\&amp;/gi, "&"), this.options.simpleAmpersand && (d = d.replace(/\&amp;/gi, "&")), d = d.replace(/ data-fr-verified="true"/gi, ""), d = d.replace(/\n/gi, ""), d = d.replace(/\u200B/gi, "")
    }, b.prototype.getText = function() {
        return this.$element.text()
    }, b.prototype.initAjaxSaver = function() {
        this.ajaxHTML = this.getHTML(), this.ajaxSave = !0, this.ajaxInterval = setInterval(a.proxy(function() {
            var a = this.getHTML();
            this.ajaxHTML != a && this.ajaxSave && (this.options.autosave && this.save(), this.ajaxHTML = a), this.ajaxSave = !0
        }, this), Math.max(this.options.autosaveInterval, 100))
    }, b.prototype.disableBrowserUndo = function() {
        a("body").keydown(function(a) {
            var b = a.which,
                c = (a.ctrlKey || a.metaKey) && !a.altKey;
            if (!this.isHTML && c) {
                if (75 == b) return a.preventDefault(), !1;
                if (90 == b && a.shiftKey) return a.preventDefault(), !1;
                if (90 == b) return a.preventDefault(), !1
            }
        })
    }, b.prototype.saveUndoStep = function() {
        if (this.isEnabled("undo") || this.isEnabled("redo")) {
            for (; this.undoStack.length > this.undoIndex;) this.undoStack.pop();
            var a = this.getHTML(!0);
            if (this.undoStack[this.undoIndex - 1] && this.removeMarkersByRegex(this.undoStack[this.undoIndex - 1]) == a) return !1;
            this.selectionInEditor() && this.$element.is(":focus") && this.saveSelectionByMarkers(), this.undoStack.push(this.getHTML(!0)), this.undoIndex++, this.selectionInEditor() && this.$element.is(":focus") && this.restoreSelectionByMarkers(!1), this.refreshUndoRedo()
        }
    }, b.prototype.initShortcuts = function() {
        this.options.shortcuts && this.$element.on("keydown", a.proxy(function(a) {
            var b = a.which,
                c = (a.ctrlKey || a.metaKey) && !a.altKey;
            if (!this.isHTML && c) {
                if (70 == b) return this.show(null), !1;
                if (66 == b) return this.execDefaultShortcut("bold");
                if (73 == b) return this.execDefaultShortcut("italic");
                if (85 == b) return this.execDefaultShortcut("underline");
                if (75 == b) return this.execDefaultShortcut("createLink");
                if (80 == b) return this.repositionEditor(), this.execDefaultShortcut("insertImage");
                if (65 == b) return this.execDefaultShortcut("selectAll");
                if (221 == b) return this.execDefaultShortcut("indent");
                if (219 == b) return this.execDefaultShortcut("outdent");
                if (72 == b) return this.execDefaultShortcut("html");
                if (48 == b) return this.execDefaultShortcut("formatBlock", "n");
                if (49 == b) return this.execDefaultShortcut("formatBlock", "h1");
                if (50 == b) return this.execDefaultShortcut("formatBlock", "h2");
                if (51 == b) return this.execDefaultShortcut("formatBlock", "h3");
                if (52 == b) return this.execDefaultShortcut("formatBlock", "h4");
                if (53 == b) return this.execDefaultShortcut("formatBlock", "h5");
                if (54 == b) return this.execDefaultShortcut("formatBlock", "h6");
                if (222 == b) return this.execDefaultShortcut("formatBlock", "blockquote");
                if (220 == b) return this.execDefaultShortcut("formatBlock", "pre");
                if (83 == b) return this.execDefaultShortcut("strikeThrough");
                if (90 == b && a.shiftKey) return this.redo(), a.stopPropagation(), !1;
                if (90 == b) return this.undo(), a.stopPropagation(), !1
            }
        }, this))
    }, b.prototype.initTabs = function() {
        this.$element.on("keydown", a.proxy(function(a) {
            var b, c = a.which;
            if (9 != c || a.shiftKey) 9 == c && a.shiftKey && (this.raiseEvent("shift+tab") ? (b = this.currentCell(), this.options.tabSpaces && !b ? a.preventDefault() : b && this.prevCell() && (a.preventDefault(), this.setSelection(this.prevCell()))) : a.preventDefault());
            else if (this.raiseEvent("tab"))
                if (b = this.currentCell(), this.options.tabSpaces && !b) {
                    a.preventDefault();
                    var d = "&nbsp;&nbsp;&nbsp;&nbsp;",
                        e = this.getSelectionElements()[0];
                    "PRE" === e.tagName && (d = "    "), this.insertHTML(d, !1)
                } else b && this.nextCell() && (a.preventDefault(), this.setSelection(this.nextCell()));
            else a.preventDefault()
        }, this))
    }, b.prototype.textEmpty = function(b) {
        var c = a(b).text().replace(/(\r\n|\n|\r|\t)/gm, "");
        return ("" === c || b === this.$element.get(0)) && 0 === a(b).find("br").length
    }, b.prototype.focus = function(a) {
        if (void 0 === a && (a = !0), "" !== this.text()) return void this.$element.focus();
        if (!this.isHTML) {
            a && !this.pasting && this.$element.focus(), this.pasting && !this.$element.is(":focus") && this.$element.focus();
            var c = this.getRange();
            if ("" === this.text() && c && (0 === c.startOffset || c.startContainer === this.$element.get(0))) {
                var d, e, f = this.getSelectionElements();
                if (f.length >= 1 && f[0] !== this.$element.get(0))
                    for (d = 0; d < f.length; d++)
                        if (e = f[d], !this.textEmpty(e)) return void this.setSelection(e);
                for (f = this.$element.find(b.VALID_NODES.join(",")), d = 0; d < f.length; d++)
                    if (e = f[d], !this.textEmpty(e)) return void this.setSelection(e);
                this.setSelection(this.$element.get(0))
            }
        }
    }, b.prototype.insertHTML = function(a, b) {
        void 0 === b && (b = !0), !this.isHTML && b && this.focus();
        var c, d;
        if (window.getSelection) {
            if (c = window.getSelection(), c.getRangeAt && c.rangeCount) {
                d = c.getRangeAt(0), d.deleteContents();
                var e = document.createElement("div");
                e.innerHTML = a;
                for (var f, g, h = document.createDocumentFragment(); f = e.firstChild;) g = h.appendChild(f);
                d.insertNode(h), g && (d = d.cloneRange(), d.collapse(!1), c.removeAllRanges(), c.addRange(d))
            }
        } else if ((c = document.selection) && "Control" != c.type) {
            var i = c.createRange();
            i.collapse(!0), c.createRange().pasteHTML(a), selectPastedContent && (d = c.createRange(), d.setEndPoint("StartToStart", i), d.select())
        }
    }, b.prototype.execDefaultShortcut = function(a, b) {
        return this.isEnabled(a) ? (this.exec(a, b), !1) : !0
    }, b.prototype.initEditor = function() {
        var c = "froala-editor";
        this.isTouch() && (c += " touch"), this.browser.msie && b.getIEversion() < 9 && (c += " ie8"), this.$editor = a('<div class="' + c + '" style="display: none;">'), a("body").append(this.$editor), this.options.inlineMode ? this.initInlineEditor() : this.initBasicEditor()
    }, b.prototype.toolbarTop = function() {
        a(window).on("scroll resize", a.proxy(function() {
            this.options.toolbarFixed || this.options.inlineMode || (a(window).scrollTop() > this.$box.offset().top && a(window).scrollTop() < this.$box.offset().top + this.$box.height() ? (this.$editor.addClass("f-scroll"), this.$box.css("padding-top", this.$editor.height()), this.$editor.css("top", a(window).scrollTop() - this.$box.offset().top)) : a(window).scrollTop() < this.$box.offset().top && (this.$editor.removeClass("f-scroll"), this.$box.css("padding-top", ""), this.$editor.css("top", "")))
        }, this))
    }, b.prototype.initBasicEditor = function() {
        this.$element.addClass("f-basic"), this.$popup_editor = this.$editor.clone(), this.$popup_editor.appendTo(a("body")), this.$editor.addClass("f-basic").show(), this.$editor.insertBefore(this.$element), this.toolbarTop()
    }, b.prototype.initInlineEditor = function() {
        this.$popup_editor = this.$editor
    }, b.prototype.initDrag = function() {
        this.drag_support = {
            filereader: "undefined" != typeof FileReader,
            formdata: !!window.FormData,
            progress: "upload" in new XMLHttpRequest
        }
    }, b.prototype.initOptions = function() {
        this.setDimensions(), this.editableDisabled || (this.setPlaceholder(), this.setPlaceholderEvents()), this.setSpellcheck(), this.setImageUploadURL(), this.setButtons(), this.setDirection(), this.setTextNearImage(), this.setZIndex(), this.setTheme(), this.options.editInPopup && this.buildEditPopup()
    }, b.prototype.isTouch = function() {
        return WYSIWYGModernizr.touch && void 0 !== window.Touch
    }, b.prototype.initEditorSelection = function() {
        a(window).on("hide." + this._id, a.proxy(function() {
            this.isResizing() || this.hide(!1)
        }, this)), this.$element.on("focus", a.proxy(function() {
            this.blurred && (this.blurred = !1, this.triggerEvent("focus", [], !1))
        }, this)), this.$element.on("mousedown touchstart", a.proxy(function() {
            return this.isDisabled ? !1 : void(this.isResizing() || (this.closeImageMode(), this.hide()))
        }, this)), this.options.disableRightClick && this.$element.contextmenu(a.proxy(function(a) {
            return a.preventDefault(), this.options.inlineMode && this.$element.focus(), !1
        }, this)), this.$element.on("mouseup touchend", a.proxy(function(b) {
            if (this.isDisabled) return !1;
            if (!this.isResizing()) {
                var c = this.text();
                b.stopPropagation(), !("" !== c || this.options.alwaysVisible || this.options.editInPopup || (3 == b.which || 2 == b.button) && this.options.inlineMode && !this.isImage && this.options.disableRightClick) || this.link || this.imageMode ? this.options.inlineMode || this.refreshButtons() : setTimeout(a.proxy(function() {
                    c = this.text(), !("" !== c || this.options.alwaysVisible || this.options.editInPopup || (3 == b.which || 2 == b.button) && this.options.inlineMode && !this.isImage && this.options.disableRightClick) || this.link || this.imageMode || (this.show(b), this.options.editInPopup && this.showEditPopup())
                }, this), 0), this.imageMode = !1
            }
        }, this)), this.$editor.on("mouseup", a.proxy(function(a) {
            return this.isDisabled ? !1 : void(this.isResizing() || (a.stopPropagation(), this.options.inlineMode === !1 && this.hide()))
        }, this)), this.$editor.on("mousedown", ".fr-dropdown-menu", a.proxy(function(a) {
            return this.isDisabled ? !1 : (a.stopPropagation(), void(this.noHide = !0))
        }, this)), this.$popup_editor.on("mousedown", ".fr-dropdown-menu", a.proxy(function(a) {
            return this.isDisabled ? !1 : (a.stopPropagation(), void(this.noHide = !0))
        }, this)), this.$popup_editor.on("mouseup", a.proxy(function(a) {
            return this.isDisabled ? !1 : void(this.isResizing() || a.stopPropagation())
        }, this)), this.$edit_popup_wrapper && this.$edit_popup_wrapper.on("mouseup", a.proxy(function(a) {
            return this.isDisabled ? !1 : void(this.isResizing() || a.stopPropagation())
        }, this)), this.setDocumentSelectionChangeEvent(), this.setWindowMouseUpEvent(), this.setWindowKeyDownEvent(), this.setWindowKeyUpEvent(), this.setWindowOrientationChangeEvent(), this.options.trackScroll && this.setWindowScrollEvent()
    }, b.prototype.setWindowOrientationChangeEvent = function() {
        a(window).on("orientationchange." + this._id, a.proxy(function() {
            setTimeout(a.proxy(function() {
                this.hide()
            }, this), 10)
        }, this)), a(window).on("orientationchange", function(b) {
            a(window).trigger("orientationchange." + this._id, [b])
        })
    }, b.prototype.setDocumentSelectionChangeEvent = function() {
        a(document).on("selectionchange." + this._id, a.proxy(function(b) {
            return this.isDisabled ? !1 : void(this.isResizing() || this.isScrolling || (clearTimeout(this.selectionChangedTimeout), this.selectionChangedTimeout = setTimeout(a.proxy(function() {
                if (this.options.inlineMode && this.selectionInEditor() && this.link !== !0 && this.isTouch()) {
                    var a = this.text();
                    "" !== a ? (this.iPhone() || this.iPod() ? this.hide() : this.show(null), b.stopPropagation()) : (this.hide(), this.closeImageMode(), this.imageMode = !1)
                }
            }, this), 75)))
        }, this)), a(document).on("selectionchange", function(b) {
            a(document).trigger("selectionchange." + this._id, [b])
        })
    }, b.prototype.setWindowMouseUpEvent = function() {
        a(window).on("mouseup." + this._id, a.proxy(function() {
            return this.isDisabled ? !1 : void(this.isResizing() || this.isScrolling || (this.$bttn_wrapper.find("button[data-cmd]").removeClass("active"), this.selectionInEditor() && "" !== this.text() && !this.isTouch() ? this.show(null) : this.$popup_editor.is(":visible") && (this.hide(), this.closeImageMode(), this.imageMode = !1), this.blurred || this.pasting || (this.selectionDisabled = !0, this.triggerEvent("blur", []), this.clearSelection(), this.selectionDisabled = !1, this.blurred = !0)))
        }, this)), a(window).on("mouseup", a.proxy(function() {
            a(window).trigger("window." + this._id)
        }, this))
    }, b.prototype.setWindowKeyDownEvent = function() {
        a(window).bind("keydown." + this._id, a.proxy(function(a) {
            if (this.isDisabled) return !0;
            var b = a.which;
            if (this.imageMode) {
                if (13 == b) return this.$element.find(".f-img-editor").parents(".f-img-wrap").before("<br/>"), this.sync(), this.$element.find(".f-img-editor img").click(), !1;
                if (46 == b || 8 == b) return this.removeImage(this.$element.find(".f-img-editor")), !1
            }
            var c = (a.ctrlKey || a.metaKey) && !a.altKey;
            !c && this.$popup_editor.is(":visible") && (27 == b || this.$bttn_wrapper.is(":visible") && this.options.inlineMode) && (this.hide(), this.closeImageMode())
        }, this)), a(window).bind("keydown", function(b) {
            a(window).trigger("keydown." + this._id, [b])
        })
    }, b.prototype.setWindowKeyUpEvent = function() {
        a(window).bind("keyup." + this._id, a.proxy(function() {
            return this.isDisabled ? !1 : void(this.selectionInEditor() && "" !== this.text() && !this.$popup_editor.is(":visible") && this.repositionEditor())
        }, this)), a(window).bind("keyup", function(b) {
            a(window).trigger("keyup." + this._id, [b])
        })
    }, b.prototype.setWindowScrollEvent = function() {
        a(window).bind("scroll." + this._id, a.proxy(function() {
            return this.isDisabled ? !1 : (clearTimeout(this.scrollTimer), this.isScrolling = !0, void(this.scrollTimer = setTimeout(a.proxy(function() {
                this.isScrolling = !1
            }, this), 2500)))
        }, this)), a(window).on("scroll", a.proxy(function() {
            a(window).trigger("scroll." + this._id)
        }, this))
    }, b.prototype.setTextNearImage = function(a) {
        void 0 !== a && (this.options.textNearImage = a), this.options.textNearImage === !0 ? this.$element.removeClass("f-tni") : this.$element.addClass("f-tni")
    }, b.prototype.setPlaceholder = function(a) {
        a && (this.options.placeholder = a), this.$textarea && this.$textarea.attr("placeholder", this.options.placeholder), this.$element.attr("data-placeholder", this.options.placeholder)
    }, b.prototype.isEmpty = function() {
        var a = this.$element.text().replace(/(\r\n|\n|\r|\t|\u0020)/gm, "");
        return "" === a && 0 === this.$element.find("img, table, iframe, input").length && 0 === this.$element.find("p > br, div > br").length && 0 === this.$element.find("li, h1, h2, h3, h4, h5, h6, blockquote, pre").length
    }, b.prototype.fakeEmpty = function(a) {
        void 0 === a && (a = this.$element);
        var b = a.text().replace(/(\r\n|\n|\r|\t)/gm, "");
        return "" === b && 1 == a.find("p, div").length && 1 == a.find("p > br, div > br").length && 0 === a.find("img, table, iframe, input").length
    }, b.prototype.setPlaceholderEvents = function() {
        this.$element.on("focus", a.proxy(function() {
            return this.isDisabled ? !1 : void("" !== this.$element.text() || this.pasting || this.focus(!1))
        }, this)), this.$element.on("keyup keydown focus placeholderCheck", a.proxy(function() {
            if (this.isDisabled) return !1;
            if (this.pasting) return !1;
            if (!this.isHTML)
                if (this.isEmpty() && !this.fakeEmpty()) {
                    var c, d = this.selectionInEditor() || this.$element.is(":focus");
                    this.options.paragraphy ? (c = a("<p><br/></p>"), this.$element.html(c), d && this.setSelection(c.get(0)), this.$element.addClass("f-placeholder")) : this.$element.addClass("f-placeholder")
                } else !this.$element.find("p").length && this.options.paragraphy ? (this.wrapText(), this.$element.find("p, div").length && "" === this.text() ? this.setSelection(this.$element.find("p, div")[0], this.$element.find("p, div").text().length, null, this.$element.find("p, div").text().length) : this.$element.removeClass("f-placeholder")) : this.fakeEmpty() === !1 || this.$element.find(b.VALID_NODES.join(",")).length > 1 ? this.$element.removeClass("f-placeholder") : this.$element.addClass("f-placeholder")
        }, this)), this.$element.trigger("placeholderCheck")
    }, b.prototype.setDimensions = function(a, b, c, d) {
        a && (this.options.height = a), b && (this.options.width = b), c && (this.options.minHeight = c), d && (this.options.maxHeight = d), "auto" != this.options.height && this.$element.css("height", this.options.height), "auto" != this.options.minHeight && this.$element.css("minHeight", this.options.minHeight), "auto" != this.options.maxHeight && this.$element.css("maxHeight", this.options.maxHeight), "auto" != this.options.width && this.$box.css("width", this.options.width)
    }, b.prototype.setDirection = function(a) {
        a && (this.options.direction = a), "ltr" != this.options.direction && "rtl" != this.options.direction && (this.options.direction = "ltr"), "rtl" == this.options.direction ? (this.$element.addClass("f-rtl"), this.$editor.addClass("f-rtl"), this.$popup_editor.addClass("f-rtl"), this.$image_modal && this.$image_modal.addClass("f-rtl")) : (this.$element.removeClass("f-rtl"), this.$editor.removeClass("f-rtl"), this.$popup_editor.removeClass("f-rtl"), this.$image_modal && this.$image_modal.removeClass("f-rtl"))
    }, b.prototype.setZIndex = function(a) {
        a && (this.options.zIndex = a), this.$editor.css("z-index", this.options.zIndex), this.$popup_editor.css("z-index", this.options.zIndex + 1), this.$overlay && this.$overlay.css("z-index", this.options.zIndex + 2), this.$image_modal && this.$image_modal.css("z-index", this.options.zIndex + 3)
    }, b.prototype.setTheme = function(a) {
        a && (this.options.theme = a), null != this.options.theme && (this.$editor.addClass(this.options.theme + "-theme"), this.$popup_editor.addClass(this.options.theme + "-theme"), this.$box && this.$box.addClass(this.options.theme + "-theme"), this.$image_modal && this.$image_modal.addClass(this.options.theme + "-theme"))
    }, b.prototype.setSpellcheck = function(a) {
        void 0 !== a && (this.options.spellcheck = a), this.$element.attr("spellcheck", this.options.spellcheck)
    }, b.prototype.customizeText = function(b) {
        if (b) {
            var c = this.$editor.find("[title]").add(this.$popup_editor.find("[title]"));
            this.$image_modal && (c = c.add(this.$image_modal.find("[title]"))), c.each(a.proxy(function(c, d) {
                for (var e in b) a(d).attr("title").toLowerCase() == e.toLowerCase() && a(d).attr("title", b[e])
            }, this)), c = this.$editor.find('[data-text="true"]').add(this.$popup_editor.find('[data-text="true"]')), this.$image_modal && (c = c.add(this.$image_modal.find('[data-text="true"]'))), c.each(a.proxy(function(c, d) {
                for (var e in b) a(d).text().toLowerCase() == e.toLowerCase() && a(d).text(b[e])
            }, this))
        }
    }, b.prototype.setLanguage = function(b) {
        void 0 !== b && (this.options.language = b), a.Editable.LANGS[this.options.language] && (this.customizeText(a.Editable.LANGS[this.options.language].translation), a.Editable.LANGS[this.options.language].direction && this.setDirection(a.Editable.LANGS[this.options.language].direction), a.Editable.LANGS[this.options.language].translation[this.options.placeholder] && this.setPlaceholder(a.Editable.LANGS[this.options.language].translation[this.options.placeholder]))
    }, b.prototype.setCustomText = function(a) {
        a && (this.options.customText = a), this.options.customText && this.customizeText(this.options.customText)
    }, b.prototype.execHTML = function() {
        this.html()
    }, b.prototype.initHTMLArea = function() {
        this.$html_area = a('<textarea wrap="hard">').keydown(function(b) {
            var c = b.keyCode || b.which;
            if (9 == c) {
                b.preventDefault();
                var d = a(this).get(0).selectionStart,
                    e = a(this).get(0).selectionEnd;
                a(this).val(a(this).val().substring(0, d) + "	" + a(this).val().substring(e)), a(this).get(0).selectionStart = a(this).get(0).selectionEnd = d + 1
            }
        }).focus(a.proxy(function() {
            this.blurred && (this.blurred = !1, this.triggerEvent("focus", [], !1))
        }, this)).mouseup(a.proxy(function() {
            this.blurred && (this.blurred = !1, this.triggerEvent("focus", [], !1))
        }, this))
    }, b.prototype.command_dispatcher = {
        align: function(a) {
            var b = this.buildDropdownAlign(a),
                c = this.buildDropdownButton(a, b, "fr-selector");
            this.$bttn_wrapper.append(c)
        },
        formatBlock: function(a) {
            var b = this.buildDropdownFormatBlock(a),
                c = this.buildDropdownButton(a, b);
            this.$bttn_wrapper.append(c)
        },
        undo: function(a) {
            var b = this.buildDefaultButton(a);
            this.$bttn_wrapper.append(b)
        },
        redo: function(a) {
            var b = this.buildDefaultButton(a);
            this.$bttn_wrapper.append(b)
        },
        html: function(b) {
            var c = this.buildDefaultButton(b);
            this.$bttn_wrapper.append(c), this.options.inlineMode && this.$box.append(a(c).clone(!0).addClass("html-switch").attr("title", "Hide HTML").click(a.proxy(this.execHTML, this))), this.initHTMLArea()
        }
    }, b.prototype.setButtons = function(a) {
        a && (this.options.buttons = a), this.$editor.append('<div class="bttn-wrapper" id="bttn-wrapper-' + this._id + '">'), this.$bttn_wrapper = this.$editor.find("#bttn-wrapper-" + this._id), this.isTouch() && this.$bttn_wrapper.addClass("touch");
        for (var c, d, e = 0; e < this.options.buttons.length; e++) {
            var f = this.options.buttons[e];
            if ("sep" != f) {
                var g = b.commands[f];
                if (void 0 !== g) {
                    g.cmd = f;
                    var h = this.command_dispatcher[g.cmd];
                    h ? h.apply(this, [g]) : (g.seed ? (c = this.buildDefaultDropdown(g), d = this.buildDropdownButton(g, c)) : d = this.buildDefaultButton(g), this.$bttn_wrapper.append(d))
                } else {
                    if (g = this.options.customButtons[f], void 0 === g) {
                        if (g = this.options.customDropdowns[f], void 0 === g) continue;
                        d = this.buildCustomDropdown(g, f), this.$bttn_wrapper.append(d);
                        continue
                    }
                    d = this.buildCustomButton(g, f), this.$bttn_wrapper.append(d)
                }
            } else this.$bttn_wrapper.append(this.options.inlineMode ? '<div class="f-clear"></div><hr/>' : '<span class="f-sep"></span>')
        }
        this.$bttn_wrapper.find('button[data-cmd="undo"], button[data-cmd="redo"]').prop("disabled", !0), this.bindButtonEvents()
    }, b.prototype.buildDefaultButton = function(a) {
        var b = '<button type="button" class="fr-bttn" title="' + a.title + '" data-cmd="' + a.cmd + '">';
        return b += void 0 === this.options.icons[a.cmd] ? this.addButtonIcon(a) : this.prepareIcon(this.options.icons[a.cmd], a.title), b += "</button>"
    }, b.prototype.prepareIcon = function(a, b) {
        switch (a.type) {
            case "font":
                return this.addButtonIcon({
                    icon: a.value
                });
            case "img":
                return this.addButtonIcon({
                    icon_img: a.value,
                    title: b
                });
            case "txt":
                return this.addButtonIcon({
                    icon_txt: a.value
                })
        }
    }, b.prototype.addButtonIcon = function(a) {
        return a.icon ? '<i class="' + a.icon + '"></i>' : a.icon_alt ? '<i class="for-text">' + a.icon_alt + "</i>" : a.icon_img ? '<img src="' + a.icon_img + '" alt="' + a.title + '"/>' : a.icon_txt ? "<i>" + a.icon_txt + "</i>" : a.title
    }, b.prototype.buildCustomButton = function(b, c) {
        var d = a('<button type="button" class="fr-bttn" data-name="' + c + '" title="' + b.title + '">' + this.prepareIcon(b.icon, b.title) + "</button>");
        return d.on("click touchend", a.proxy(function(a) {
            a.stopPropagation(), a.preventDefault(), b.callback.apply(this)
        }, this)), d
    }, b.prototype.callDropdown = function(b, c, d) {
        b.on("click touch", a.proxy(function() {
            c.options[d].apply(this)
        }, this))
    }, b.prototype.buildCustomDropdown = function(b, c) {
        var d = '<div class="fr-bttn fr-dropdown">';
        d += '<button type="button" class="fr-trigger" title="' + b.title + '" data-name="' + c + '">' + this.prepareIcon(b.icon, b.title) + "</button>";
        var e = a('<ul class="fr-dropdown-menu"></ul>');
        for (var f in b.options) {
            var g = a('<a href="#">' + f + "</a>"),
                h = a("<li>").append(g);
            this.callDropdown(g, b, f), e.append(h)
        }
        return a(d).append(e)
    }, b.prototype.buildDropdownButton = function(a, b, c) {
        c = c || "";
        var d = '<div class="fr-bttn fr-dropdown ' + c + '" data-name="' + a.cmd + '">',
            e = '<button type="button" class="fr-trigger" title="' + a.title + '">' + this.addButtonIcon(a) + "</button>";
        return d += e, d += b, d += "</div>"
    }, b.prototype.buildDropdownAlign = function(a) {
        for (var b = '<ul class="fr-dropdown-menu f-align">', c = 0; c < a.seed.length; c++) {
            var d = a.seed[c];
            b += '<li data-cmd="' + d.cmd + '" title="' + d.title + '"><a href="#"><i class="' + d.icon + '"></i></a></li>'
        }
        return b += "</ul>"
    }, b.prototype.buildDropdownFormatBlock = function(b) {
        for (var c = '<ul class="fr-dropdown-menu">', d = 0; d < b.seed.length; d++) {
            var e = b.seed[d];
            if (-1 != a.inArray(e.value, this.options.blockTags)) {
                var f = '<li data-cmd="' + b.cmd + '" data-val="' + e.value + '">';
                f += '<a href="#" data-text="true" class="format-' + e.value + '" title="' + e.title + '">' + e.title + "</a></li>", c += f
            }
        }
        return c += "</ul>"
    }, b.prototype.buildDefaultDropdown = function(a) {
        for (var b = '<ul class="fr-dropdown-menu">', c = 0; c < a.seed.length; c++) {
            var d = a.seed[c],
                e = '<li data-cmd="' + (d.cmd || a.cmd) + '" data-val="' + d.value + '" data-param="' + (d.param || a.param) + '">';
            e += '<a href="#" data-text="true" class="' + d.value + '" title="' + d.title + '">' + d.title + "</a></li>", b += e
        }
        return b += "</ul>"
    }, b.prototype.createEditPopupHTML = function() {
        var a = '<div class="froala-popup froala-text-popup" style="display:none;">';
        return a += '<h4><span data-text="true">Edit text</span><i title="Cancel" class="fa fa-times" id="f-text-close-' + this._id + '"></i></h4></h4>', a += '<div class="f-popup-line"><input type="text" placeholder="http://www.example.com" class="f-lu" id="f-ti-' + this._id + '">', a += '<button data-text="true" type="button" class="f-ok" id="f-edit-popup-ok-' + this._id + '">OK</button>', a += "</div>", a += "</div>"
    }, b.prototype.buildEditPopup = function() {
        this.$edit_popup_wrapper = a(this.createEditPopupHTML()), this.$popup_editor.append(this.$edit_popup_wrapper), this.$edit_popup_wrapper.find("#f-ti-" + this._id).on("mouseup keydown", function(a) {
            a.stopPropagation()
        }), this.addListener("hidePopups", a.proxy(function() {
            this.$edit_popup_wrapper.hide()
        }, this)), this.$edit_popup_wrapper.on("click", "#f-edit-popup-ok-" + this._id, a.proxy(function() {
            this.$element.text(this.$edit_popup_wrapper.find("#f-ti-" + this._id).val()), this.sync(), this.hide()
        }, this)), this.$edit_popup_wrapper.on("click", "i#f-text-close-" + this._id, a.proxy(function() {
            this.hide()
        }, this))
    }, b.prototype.createCORSRequest = function(a, b) {
        var c = new XMLHttpRequest;
        if ("withCredentials" in c) {
            c.open(a, b, !0), this.options.withCredentials && (c.withCredentials = !0);
            for (var d in this.options.headers) c.setRequestHeader(d, this.options.headers[d])
        } else "undefined" != typeof XDomainRequest ? (c = new XDomainRequest, c.open(a, b)) : c = null;
        return c
    }, b.prototype.isEnabled = function(b) {
        return a.inArray(b, this.options.buttons) >= 0
    }, b.prototype.bindButtonEvents = function() {
        this.bindDropdownEvents(), this.bindCommandEvents()
    }, b.prototype.canTouch = function(b) {
        var c = b.currentTarget;
        return "touchend" == b.type && a(c).data("touched", !0), "mouseup" == b.type && 1 != b.which ? !1 : "mouseup" == b.type && a(c).data("touched") ? !1 : !0
    }, b.prototype.bindDropdownEvents = function() {
        var b = this;
        this.$bttn_wrapper.on("mouseup touchend", ".fr-dropdown .fr-trigger:not([disabled])", function(c) {
            return b.isDisabled ? !1 : (c.stopPropagation(), c.preventDefault(), b.canTouch(c) ? ("touchend" == c.type && b.android() && (b.saveSelectionByMarkers(), setTimeout(function() {
                b.restoreSelectionByMarkers()
            }, 10)), b.options.inlineMode === !1 && b.hide(), a(this).toggleClass("active").trigger("blur"), b.closeImageMode(), b.refreshButtons(), b.imageMode = !1, void b.$bttn_wrapper.find(".fr-dropdown").not(a(this).parent()).find(".fr-trigger").removeClass("active")) : !1)
        }), a(window).on("mouseup selectionchange", a.proxy(function() {
            return this.isDisabled ? !1 : void this.$bttn_wrapper.find(".fr-dropdown .fr-trigger").removeClass("active")
        }, this)), this.$element.on("mouseup", "img, a", a.proxy(function() {
            return this.isDisabled ? !1 : void this.$bttn_wrapper.find(".fr-dropdown .fr-trigger").removeClass("active")
        }, this)), this.$bttn_wrapper.find(".fr-selector button.fr-bttn").bind("select", function() {
            return this.isDisabled ? !1 : void a(this).parents(".fr-selector").find(" > button > i").attr("class", a(this).find("i").attr("class"))
        }).on("click touch", function() {
            return this.isDisabled ? !1 : (a(this).parents("ul").find("button").removeClass("active"), a(this).parents(".fr-selector").removeClass("active").trigger("mouseout"), void a(this).trigger("select"))
        }), this.$bttn_wrapper.on("click", "li[data-cmd] > a", function(a) {
            a.preventDefault()
        })
    }, b.prototype.bindCommandEvents = function() {
        var b = this;
        this.$bttn_wrapper.on("mouseup touchend touchmove", "button[data-cmd], li[data-cmd], span[data-cmd], a[data-cmd]", a.proxy(function(c) {
            if (b.isDisabled) return !1;
            var d = c.currentTarget;
            if (this.iOS() && "mouseup" === c.type) return !0;
            if ("touchmove" != c.type) {
                if (c.stopPropagation(), c.preventDefault(), !this.canTouch(c)) return !1;
                if (a(d).data("dragging")) return a(d).removeData("dragging"), !1;
                var e = a(d).data("cmd"),
                    f = a(d).data("val"),
                    g = a(d).data("param");
                "touchend" == c.type && b.android() && this.saveSelectionByMarkers(), b.exec(e, f, g), b.$bttn_wrapper.find(".fr-dropdown .fr-trigger").removeClass("active"), "touchend" == c.type && b.android() && this.restoreSelectionByMarkers()
            } else a(d).data("dragging", !0)
        }, this))
    }, b.prototype.undo = function() {
        if (this.undoIndex > 1) {
            var a = this.getHTML(),
                b = this.undoStack[--this.undoIndex - 1];
            this.$element.html(b), this.restoreSelectionByMarkers(), this.triggerEvent("undo", [this.getHTML(), a]), "" !== this.text() ? this.repositionEditor() : this.hide(), this.refreshUndoRedo(), this.focus(), this.refreshButtons()
        }
    }, b.prototype.redo = function() {
        if (this.undoIndex < this.undoStack.length) {
            var a = this.$element.html(),
                b = this.undoStack[this.undoIndex++];
            this.$element.html(b), this.restoreSelectionByMarkers(), this.triggerEvent("redo", [this.getHTML(), a]), "" !== this.text() ? this.repositionEditor() : this.hide(), this.refreshUndoRedo(), this.focus(), this.refreshButtons()
        }
    }, b.prototype.save = function() {
        if (!this.triggerEvent("beforeSave", [], !1)) return !1;
        if (this.options.saveURL) {
            var b = {};
            for (var c in this.options.saveParams) {
                var d = this.options.saveParams[c];
                b[c] = "function" == typeof d ? d.call(this) : d
            }
            a.ajax({
                type: this.options.saveRequestType,
                url: this.options.saveURL,
                data: a.extend({
                    body: this.getHTML()
                }, this.options.saveParams),
                crossDomain: this.options.crossDomain,
                xhrFields: {
                    withCredentials: this.options.withCredentials
                },
                headers: this.options.headers
            }).done(a.proxy(function(a) {
                this.triggerEvent("afterSave", [a])
            }, this)).fail(a.proxy(function() {
                this.triggerEvent("saveError", ["Save request failed on the server."])
            }, this))
        } else this.triggerEvent("saveError", ["Missing save URL."])
    }, b.prototype.sanitizeURL = function(a) {
        if (/^https?:\/\//.test(a)) {
            a = String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
            var b = /\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/gi;
            if (!b.test(a)) return ""
        } else a = encodeURIComponent(a).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/g, "mailto:").replace(/data%3A/g, "data:").replace(/webkit-fake-url%3A/g, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@");
        return a
    }, b.prototype.option = function(b, c) {
        if (void 0 === b) return this.options;
        if (b instanceof Object) this.options = a.extend({}, this.options, b), this.initOptions(), this.setCustomText(), this.setLanguage();
        else {
            if (void 0 === c) return this.options[b];
            switch (this.options[b] = c, b) {
                case "direction":
                    this.setDirection();
                    break;
                case "height":
                case "width":
                case "minHeight":
                case "maxHeight":
                    this.setDimensions();
                    break;
                case "spellcheck":
                    this.setSpellcheck();
                    break;
                case "placeholder":
                    this.setPlaceholder();
                    break;
                case "customText":
                    this.setCustomText();
                    break;
                case "language":
                    this.setLanguage();
                    break;
                case "textNearImage":
                    this.setTextNearImage();
                    break;
                case "zIndex":
                    this.setZIndex();
                    break;
                case "theme":
                    this.setTheme()
            }
        }
    };
    var c = a.fn.editable;
    a.fn.editable = function(c) {
        for (var d = [], e = 0; e < arguments.length; e++) d.push(arguments[e]);
        if ("string" == typeof c) {
            var f = [];
            return this.each(function() {
                var b = a(this),
                    e = b.data("fa.editable");
                if (!e[c]) return a.error("Method " + c + " does not exist in Froala Editor.");
                var g = e[c].apply(e, d.slice(1));
                void 0 === g ? f.push(this) : 0 === f.length && f.push(g)
            }), 1 == f.length ? f[0] : f
        }
        return "object" != typeof c && c ? void 0 : this.each(function() {
            var d = this,
                e = a(d),
                f = e.data("fa.editable");
            f || e.data("fa.editable", f = new b(d, c))
        })
    }, a.fn.editable.Constructor = b, a.Editable = b, a.fn.editable.noConflict = function() {
        return a.fn.editable = c, this
    }
}(window.jQuery),
function(a) {
    a.Editable.commands = {
        bold: {
            title: "Bold",
            icon: "fa fa-bold",
            shortcut: "(Ctrl + B)"
        },
        italic: {
            title: "Italic",
            icon: "fa fa-italic",
            shortcut: "(Ctrl + I)"
        },
        underline: {
            cmd: "underline",
            title: "Underline",
            icon: "fa fa-underline",
            shortcut: "(Ctrl + U)"
        },
        strikeThrough: {
            title: "Strikethrough",
            icon: "fa fa-strikethrough"
        },
        subscript: {
            title: "Subscript",
            icon: "fa fa-subscript"
        },
        superscript: {
            title: "Superscript",
            icon: "fa fa-superscript"
        },
        formatBlock: {
            title: "Format Block",
            icon: "fa fa-paragraph",
            seed: [{
                value: "n",
                title: "Normal"
            }, {
                value: "p",
                title: "Paragraph"
            }, {
                value: "pre",
                title: "Code"
            }, {
                value: "blockquote",
                title: "Quote"
            }, {
                value: "h1",
                title: "Heading 1"
            }, {
                value: "h2",
                title: "Heading 2"
            }, {
                value: "h3",
                title: "Heading 3"
            }, {
                value: "h4",
                title: "Heading 4"
            }, {
                value: "h5",
                title: "Heading 5"
            }, {
                value: "h6",
                title: "Heading 6"
            }]
        },
        align: {
            title: "Alignment",
            icon: "fa fa-align-center",
            seed: [{
                cmd: "justifyLeft",
                title: "Align Left",
                icon: "fa fa-align-left"
            }, {
                cmd: "justifyCenter",
                title: "Align Center",
                icon: "fa fa-align-center"
            }, {
                cmd: "justifyRight",
                title: "Align Right",
                icon: "fa fa-align-right"
            }, {
                cmd: "justifyFull",
                title: "Justify",
                icon: "fa fa-align-justify"
            }]
        },
        outdent: {
            title: "Indent Less",
            icon: "fa fa-dedent",
            activeless: !0,
            shortcut: "(Ctrl + <)"
        },
        indent: {
            title: "Indent More",
            icon: "fa fa-indent",
            activeless: !0,
            shortcut: "(Ctrl + >)"
        },
        selectAll: {
            title: "Select All",
            icon: "fa fa-file-text",
            shortcut: "(Ctrl + A)"
        },
        createLink: {
            title: "Insert Link",
            icon: "fa fa-link",
            shortcut: "(Ctrl + K)"
        },
        insertImage: {
            title: "Insert Image",
            icon: "fa fa-picture-o",
            activeless: !0,
            shortcut: "(Ctrl + P)"
        },
        undo: {
            title: "Undo",
            icon: "fa fa-undo",
            activeless: !0,
            shortcut: "(Ctrl+Z)",
            disabled: function() {
                return !0
            }
        },
        redo: {
            title: "Redo",
            icon: "fa fa-repeat",
            activeless: !0,
            shortcut: "(Shift+Ctrl+Z)",
            disabled: function() {
                return !0
            }
        },
        html: {
            title: "Show HTML",
            icon: "fa fa-code"
        },
        save: {
            title: "Save",
            icon: "fa fa-floppy-o"
        },
        insertHorizontalRule: {
            title: "Insert Horizontal Line",
            icon: "fa fa-minus"
        }
    }, a.Editable.prototype.execCommand = {
        formatBlock: function(a, b) {
            this.formatBlock(b)
        },
        createLink: function() {
            this.insertLink()
        },
        insertImage: function() {
            this.insertImage()
        },
        indent: function() {
            this.indent()
        },
        outdent: function() {
            this.outdent(!0)
        },
        justifyLeft: function(a) {
            this.align(a)
        },
        justifyRight: function(a) {
            this.align(a)
        },
        justifyCenter: function(a) {
            this.align(a)
        },
        justifyFull: function(a) {
            this.align(a)
        },
        undo: function() {
            this.undo()
        },
        redo: function() {
            this.redo()
        },
        html: function() {
            this.html()
        },
        save: function() {
            this.save()
        },
        selectAll: function(a, b) {
            this.$element.focus(), this.execDefault(a, b)
        },
        removeFormat: function() {
            this.removeFormat()
        },
        insertHorizontalRule: function(a, b) {
            this.execDefault(a, b), this.hide()
        }
    }, a.Editable.prototype.cmds_without_focus = ["html", "undo", "redo", "selectAll", "save", "insertImage", "insertVideo", "insertTable", "createLink"], a.Editable.prototype.cmds_in_default = ["bold", "italic", "underline", "strikeThrough", "subscript", "superscript"], a.Editable.prototype.exec = function(a, b, c) {
        if (!this.selectionInEditor() && this.cmds_without_focus.indexOf(a) < 0) return !1;
        if (this.selectionInEditor() && "" === this.text()) {
            if (this.cmds_in_default.indexOf(a) >= 0) return this._startInDefault(a), !1;
            if ("fontSize" == a) return this._startInFontExec("font-size", a, b), !1;
            if ("fontFamily" == a) return this._startInFontExec("font-family", a, b), !1;
            if ("backColor" == a) return this._startInFontExec("background-color", a, b), !1;
            if ("foreColor" == a) return this._startInFontExec("color", a, b), !1
        }
        this.execCommand[a] ? this.execCommand[a].apply(this, [a, b, c]) : this.execDefault(a, b);
        var d = ["undo", "redo", "selectAll", "createLink", "insertImage", "html", "insertVideo"];
        d.indexOf(a) < 0 && this.saveUndoStep(), "createLink" != a && "insertImage" != a && this.refreshButtons()
    }, a.Editable.prototype.html = function() {
        var a;
        this.isHTML ? (this.isHTML = !1, a = this.$html_area.val(), a = this.clean(a, !0, !1), this.$box.removeClass("f-html"), this.$html_area.blur(), this.no_verify = !0, this.$element.html(a), this.cleanify(!1), this.no_verify = !1, this.$element.attr("contenteditable", !0), this.$editor.find('.fr-bttn:not([data-cmd="html"]), .fr-trigger').removeAttr("disabled"), this.$editor.find('.fr-bttn[data-cmd="html"]').removeClass("active"), this.saveUndoStep(), this.options.paragraphy && this.wrapText(), this.$element.blur(), this.focus(), this.refreshButtons(), this.triggerEvent("htmlHide", [a])) : (this.$element.removeClass("f-placeholder"), this.cleanify(!1), a = this.options.inlineMode ? "\n\n" + this.cleanTags(this.getHTML(!1, !1)) : this.cleanTags(this.getHTML(!1, !1)), a = a.replace(/\&amp;/g, "&"), this.$html_area.val(a).trigger("resize"), this.$html_area.css("height", this.$element.height() - 1), this.$element.html("").append(this.$html_area).removeAttr("contenteditable"), this.$box.addClass("f-html"), this.$editor.find('button.fr-bttn:not([data-cmd="html"]), button.fr-trigger').attr("disabled", !0), this.$editor.find('.fr-bttn[data-cmd="html"]').addClass("active"), this.hide(), this.imageMode = !1, this.isHTML = !0, this.$element.blur(), this.$element.removeAttr("contenteditable"), this.triggerEvent("htmlShow", [a]))
    }, a.Editable.prototype.formatBlock = function(b, c, d) {
        if (this.disabledList.indexOf("formatBlock") >= 0) return !1;
        if (this.browser.msie && a.Editable.getIEversion() < 9) return document.execCommand("formatBlock", !1, "<" + b + ">"), !1;
        this.saveSelectionByMarkers(), this.wrapText(), this.restoreSelectionByMarkers();
        var e = this.getSelectionElements();
        e[0] == this.$element.get(0) && (e = this.$element.find("> " + a.Editable.VALID_NODES.join(", >"))), this.saveSelectionByMarkers();
        for (var f, g = 0; g < e.length; g++) {
            var h = a(e[g]);
            if (!this.fakeEmpty(h))
                if (f = "n" == b ? this.options.paragraphy ? a("<div>").html(h.html()) : h.html() + "<br/>" : a("<" + b + ">").html(h.html()), h.get(0) != this.$element.get(0) && "LI" !== f.get(0).tagName && "TD" !== f.get(0).tagName && "TH" !== f.get(0).tagName) {
                    var i = h.prop("attributes");
                    if (f.attr)
                        for (var j = 0; j < i.length; j++) "class" !== i[j].name && f.attr(i[j].name, i[j].value);
                    var k;
                    this.options.blockStyles && this.options.blockStyles[b], void 0 === k && (k = this.options.defaultBlockStyle);
                    try {
                        if (h.hasClass(c) && h.get(0).tagName.toLowerCase() === b) f.addClass(h.attr("class")).removeClass(c);
                        else {
                            if (void 0 === h.attr("class") || void 0 === k || !this.options.blockStylesToggle && "toggle" != d) f.addClass(h.attr("class"));
                            else
                                for (var l = h.attr("class").split(" "), m = 0; m < l.length; m++) {
                                    var n = l[m];
                                    void 0 === k[n] && void 0 === d ? f.addClass(n) : void 0 !== k[n] && "toggle" === d && f.addClass(n), h.get(0).tagName.toLowerCase() !== b && void 0 !== k[n] && f.addClass(n)
                                }
                            "*" != c && f.addClass(c)
                        }
                    } catch (o) {}
                    "LI" == h.get(0).tagName || "TD" == h.get(0).tagName || "TH" == h.get(0).tagName ? h.html(f) : h.replaceWith(f)
                } else h.html(f)
        }
        this.unwrapText(), this.restoreSelectionByMarkers(), this.triggerEvent("formatBlock"), this.repositionEditor()
    }, a.Editable.prototype.align = function(b) {
        if (this.browser.msie && a.Editable.getIEversion() < 9) return document.execCommand(b, !1, !1), !1;
        var c = this.getSelectionElements();
        "justifyLeft" == b ? b = "left" : "justifyRight" == b ? b = "right" : "justifyCenter" == b ? b = "center" : "justifyFull" == b && (b = "justify");
        for (var d = 0; d < c.length; d++) a(c[d]).css("text-align", b);
        this.repositionEditor(), this.triggerEvent("align", [b])
    }, a.Editable.prototype.indent = function(b) {
        if (this.browser.msie && a.Editable.getIEversion() < 9) return b ? document.execCommand("outdent", !1, !1) : document.execCommand("indent", !1, !1), !1;
        var c = 20;
        b && (c = -20), this.saveSelectionByMarkers(), this.wrapText(), this.restoreSelectionByMarkers();
        var d = this.getSelectionElements();
        this.saveSelectionByMarkers();
        for (var e = 0; e < d.length; e++) {
            var f = a(d[e]);
            if (f.parentsUntil(this.$element, "li").length > 0 && (f = f.closest("li")), "LI" === f.get(0).tagName && a.isFunction(this.indentLi)) {
                b ? this.outdentLi(f) : this.indentLi(f);
                for (var g = this.$element.find("ul, ol").find("ol + ol, ul + ul"), h = 0; h < g.length; h++) {
                    var i = a(g[h]);
                    i.prev().append(i.html()), i.remove()
                }
            } else if (f.get(0) != this.$element.get(0)) {
                var j = parseInt(f.css("margin-left").replace(/px/, ""), 10),
                    k = Math.max(0, j + c);
                f.css("marginLeft", k)
            } else {
                var l = a("<div>").html(f.html());
                f.html(l), l.css("marginLeft", Math.max(0, c))
            }
        }
        a.isFunction(this.cleanupLists) && this.cleanupLists(), this.unwrapText(), this.restoreSelectionByMarkers(), this.repositionEditor(), b || this.triggerEvent("indent")
    }, a.Editable.prototype.outdent = function() {
        this.indent(!0), this.triggerEvent("outdent")
    }, a.Editable.prototype.execDefault = function(a, b) {
        document.execCommand(a, !1, b), this.triggerEvent(a)
    }, a.Editable.prototype._startInDefault = function(a) {
        this.$element.focus(), this.$bttn_wrapper.find('[data-cmd="' + a + '"]').toggleClass("active"), document.execCommand(a, !1, !1)
    }, a.Editable.prototype._startInFontExec = function(b, c, d) {
        this.$element.focus();
        try {
            var e = this.getRange(),
                f = e.cloneRange();
            f.collapse(!1);
            var g = a('<span data-inserted="true" data-fr-verified="true" style="' + b + ": " + d + ';">&#8203;</span>', document);
            f.insertNode(g[0]), f.detach(), g = this.$element.find("[data-inserted]"), g.removeAttr("data-inserted"), this.setSelection(g.get(0), 1)
        } catch (h) {}
    }, a.Editable.prototype.removeFormat = function() {
        document.execCommand("removeFormat", !1, !1), document.execCommand("unlink", !1, !1)
    }, a.Editable.prototype.inlineStyle = function(b, c, d) {
        if (this.browser.webkit && "font-size" != b) {
            var e = function(a) {
                return a.attr("style").indexOf("font-size") >= 0
            };
            this.$element.find("span").each(function(b, c) {
                var d = a(c);
                d.attr("style") && e(d) && (d.data("font-size", d.css("font-size")), d.css("font-size", ""))
            })
        }
        document.execCommand("fontSize", !1, 4), this.saveSelectionByMarkers(), this.browser.webkit && "font-size" != b && this.$element.find("span").each(function(b, c) {
            var d = a(c);
            d.data("font-size") && (d.css("font-size", d.data("font-size")), d.removeData("font-size"))
        });
        var f = function(c, e) {
            var f = a(e);
            f.css(b) != d && f.css(b, ""), "" === f.attr("style") && f.replaceWith(f.html())
        };
        this.$element.find("font").each(function(c, e) {
            var g = a('<span data-fr-verified="true" style="' + b + ": " + d + ';">' + a(e).html() + "</span>");
            a(e).replaceWith(g), g.find("span").each(f)
        }), this.restoreSelectionByMarkers(), this.repositionEditor(), this.triggerEvent(c, [d])
    }
}(jQuery),
function(a) {
    a.Editable.prototype._events = {}, a.Editable.prototype.addListener = function(a, b) {
        var c = this._events,
            d = c[a] = c[a] || [];
        d.push(b)
    }, a.Editable.prototype.raiseEvent = function(a, b) {
        void 0 === b && (b = []);
        var c = !0,
            d = this._events[a];
        if (d)
            for (var e = 0, f = d.length; f > e; e++) c = d[e].apply(this, b);
        return void 0 === c && (c = !0), c
    }
}(jQuery),
function(a) {
    a.Editable.prototype.active_dispatcher = {
        fontFamily: function(a, b) {
            return this._isActiveFontFamily(b)
        },
        fontSize: function(a, b) {
            return this._isActiveFontSize(b)
        },
        backColor: function(a, b) {
            return this._isActiveBackColor(b)
        },
        foreColor: function(a, b) {
            return this._isActiveForeColor(b)
        },
        formatBlock: function(a, b) {
            return this._isActiveFormatBlock(b)
        },
        insertOrderedList: function() {
            return this._isActiveList("ol")
        },
        insertUnorderedList: function() {
            return this._isActiveList("ul")
        },
        justifyLeft: function(a) {
            return this._isActiveAlign(a)
        },
        justifyRight: function(a) {
            return this._isActiveAlign(a)
        },
        justifyCenter: function(a) {
            return this._isActiveAlign(a)
        },
        justifyFull: function(a) {
            return this._isActiveAlign(a)
        },
        html: function() {
            return this._isActiveHTML()
        }
    }, a.Editable.prototype.refresh_disabled = ["undo", "redo", "save", "createLink", "insertImage", "insertVideo"], a.Editable.prototype.isActive = function(a, b) {
        return this.refresh_disabled.indexOf(a) >= 0 ? !1 : this.active_dispatcher[a] ? this.active_dispatcher[a].apply(this, [a, b]) : this._isActiveDefault(a, b)
    }, a.Editable.prototype._isActiveFontFamily = function(b) {
        var c = this.getSelectionElement();
        return a(c).css("fontFamily").replace(/ /g, "") === b.replace(/ /g, "") ? !0 : !1
    }, a.Editable.prototype._isActiveFontSize = function(b) {
        var c = this.getSelectionElement();
        return a(c).css("fontSize") === b ? !0 : !1
    }, a.Editable.prototype._isActiveBackColor = function(b) {
        for (var c = this.getSelectionElement(); a(c).get(0) != this.$element.get(0);) {
            if (a(c).css("background-color") === b) return !0;
            if ("transparent" != a(c).css("background-color") && "rgba(0, 0, 0, 0)" != a(c).css("background-color")) return !1;
            c = a(c).parent()
        }
        return !1
    }, a.Editable.prototype._isActiveForeColor = function(a) {
        try {
            if (document.queryCommandValue("foreColor") === a) return !0
        } catch (b) {}
        return !1
    }, a.Editable.prototype._isActiveFormatBlock = function(b) {
        "CODE" === b.toUpperCase() ? b = "PRE" : "N" === b.toUpperCase() && (b = "DIV");
        var c = a(this.getSelectionElements()[0]);
        return c.get(0).tagName == b.toUpperCase() ? !0 : !1
    }, a.Editable.prototype._isActiveAlign = function(b) {
        var c = this.getSelectionElements();
        return "justifyLeft" == b ? b = "left" : "justifyRight" == b ? b = "right" : "justifyCenter" == b ? b = "center" : "justifyFull" == b && (b = "justify"), b == a(c[0]).css("text-align") ? !0 : !1
    }, a.Editable.prototype._isActiveHTML = function() {
        return this.isHTML ? !0 : !1
    }, a.Editable.prototype._isActiveDefault = function(a) {
        try {
            if (document.queryCommandState(a) === !0) return !0
        } catch (b) {}
        return !1
    }
}(jQuery),
function(a) {
    a.Editable.prototype.refresh_disabled = ["createLink", "insertImage", "undo", "redo", "save"], a.Editable.prototype.refresh_dispatcher = {
        fontSize: function(a) {
            this.refreshFontSize(a)
        },
        fontFamily: function(a) {
            this.refreshFontFamily(a)
        },
        formatBlock: function(a) {
            this.refreshFormatBlock(a)
        },
        justifyLeft: function(a) {
            this.refreshAlign(a)
        },
        justifyRight: function(a) {
            this.refreshAlign(a)
        },
        justifyCenter: function(a) {
            this.refreshAlign(a)
        },
        justifyFull: function(a) {
            this.refreshAlign(a)
        },
        html: function(b) {
            this.isActive("html") ? a(b).addClass("active") : a(b).removeClass("active")
        }
    }, a.Editable.prototype.registerRefreshEvent = function(a, b) {
        this.refresh_dispatcher[a] = b
    }, a.Editable.prototype.refreshBlocks = function() {
        this.$bttn_wrapper.find('[data-cmd="formatBlock"]').each(a.proxy(function(a, b) {
            this.refreshFormatBlock(b)
        }, this))
    }, a.Editable.prototype.refreshButtons = function(b) {
        if (!(this.selectionInEditor() && !this.isHTML || this.browser.msie && a.Editable.getIEversion() < 9 || b)) return !1;
        this.refreshBlocks();
        for (var c = 0; c < this.options.buttons.length; c++) {
            var d = this.options.buttons[c];
            void 0 !== a.Editable.commands[d] && (void 0 !== a.Editable.commands[d].disabled ? this.$editor.find('[data-name="' + d + '"] button').prop("disabled", !0) : this.$editor.find('[data-name="' + d + '"] button').removeAttr("disabled"))
        }
        this.refreshUndoRedo(), this.raiseEvent("refresh"), this.$bttn_wrapper.find("[data-cmd]").not('[data-cmd="formatBlock"]').each(a.proxy(function(b, c) {
            var d = a(c).data("cmd");
            this.refresh_dispatcher[d] ? this.refresh_dispatcher[d].apply(this, [c]) : this.refreshDefault(c)
        }, this))
    }, a.Editable.prototype.refreshFormatBlock = function(b) {
        this.disabledList.indexOf("formatBlock") >= 0 && a(b).parents(".fr-dropdown").attr("data-disabled", !0), a(b).removeClass("active"), this.isActive(a(b).data("cmd"), a(b).data("val")) && a(b).addClass("active")
    }, a.Editable.prototype.refreshUndoRedo = function() {
        if (this.isEnabled("undo") || this.isEnabled("redo")) {
            if (void 0 === this.$editor) return;
            this.$bttn_wrapper.find('[data-cmd="undo"], [data-cmd="redo"]').removeAttr("disabled"), (0 === this.undoStack.length || this.undoIndex <= 1 || this.isHTML) && this.$bttn_wrapper.find('[data-cmd="undo"]').prop("disabled", !0), (this.undoIndex == this.undoStack.length || this.isHTML) && this.$bttn_wrapper.find('[data-cmd="redo"]').prop("disabled", !0)
        }
    }, a.Editable.prototype.refreshDefault = function(b) {
        a(b).removeClass("active"), this.isActive(a(b).data("cmd")) && a(b).addClass("active")
    }, a.Editable.prototype.refreshAlign = function(b) {
        var c = a(b).data("cmd");
        this.isActive(c) && (a(b).parents("ul").find("li").removeClass("active"), a(b).addClass("active"), a(b).parents(".fr-dropdown").find(".fr-trigger i").attr("class", a(b).find("i").attr("class")))
    }, a.Editable.prototype.refreshForeColor = function(b) {
        a(b).removeClass("active"), this.isActive("foreColor", b.style.backgroundColor) && a(b).addClass("active")
    }, a.Editable.prototype.refreshBackColor = function(b) {
        a(b).removeClass("active"), this.isActive("backColor", b.style.backgroundColor) && a(b).addClass("active")
    }, a.Editable.prototype.refreshFontSize = function(b) {
        a(b).removeClass("active"), this.isActive("fontSize", a(b).data("val")) && a(b).addClass("active")
    }, a.Editable.prototype.refreshFontFamily = function(b) {
        a(b).removeClass("active"), this.isActive("fontFamily", a(b).data("val")) && a(b).addClass("active")
    }
}(jQuery),
function(a) {
    a.Editable.prototype.text = function() {
        var a = "";
        return window.getSelection ? a = window.getSelection() : document.getSelection ? a = document.getSelection() : document.selection && (a = document.selection.createRange().text), a.toString()
    }, a.Editable.prototype.selectionInEditor = function() {
        var b = this.getSelectionParent(),
            c = !1;
        return b == this.$element.get(0) && (c = !0), c === !1 && a(b).parents().each(a.proxy(function(a, b) {
            b == this.$element.get(0) && (c = !0)
        }, this)), c
    }, a.Editable.prototype.getSelection = function() {
        var a = "";
        return a = window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange()
    }, a.Editable.prototype.getRange = function() {
        var a = this.getRanges();
        return a.length > 0 ? a[0] : null
    }, a.Editable.prototype.getRanges = function() {
        var a = this.getSelection();
        if (a.getRangeAt && a.rangeCount) {
            for (var b = [], c = 0; c < a.rangeCount; c++) b.push(a.getRangeAt(c));
            return b
        }
        return document.createRange ? [document.createRange()] : []
    }, a.Editable.prototype.clearSelection = function() {
        var a = this.getSelection();
        a.removeAllRanges ? a.removeAllRanges() : a.empty ? a.empty() : a.clear && a.clear()
    }, a.Editable.prototype.getSelectionElement = function() {
        var b = this.getSelection();
        if (b.rangeCount) {
            var c = this.getRange(),
                d = c.startContainer;
            if (1 != d.nodeType) d = d.parentNode;
            else {
                var e = !1;
                d.children.length > 0 && d.children[c.startOffset] && a(d.children[c.startOffset]).text() === this.text() && (d = d.children[c.startOffset], e = !0), !e && d.children.length > 0 && a(d.children[0]).text() === this.text() && (d = d.children[0])
            }
            for (var f = d; f && "BODY" != f.tagName;) {
                if (f == this.$element.get(0)) return d;
                f = a(f).parent()[0]
            }
        }
        return this.$element.get(0)
    }, a.Editable.prototype.getSelectionParent = function() {
        var b, c = null;
        return window.getSelection ? (b = window.getSelection(), b.rangeCount && (c = b.getRangeAt(0).commonAncestorContainer, 1 != c.nodeType && (c = c.parentNode))) : (b = document.selection) && "Control" != b.type && (c = b.createRange().parentElement()), null != c && (a.inArray(this.$element.get(0), a(c).parents()) >= 0 || c == this.$element.get(0)) ? c : null
    }, a.Editable.prototype.nodeInRange = function(a, b) {
        var c;
        if (a.intersectsNode) return a.intersectsNode(b);
        c = b.ownerDocument.createRange();
        try {
            c.selectNode(b)
        } catch (d) {
            c.selectNodeContents(b)
        }
        return -1 == a.compareBoundaryPoints(Range.END_TO_START, c) && 1 == a.compareBoundaryPoints(Range.START_TO_END, c)
    }, a.Editable.prototype.getElementFromNode = function(b) {
        for (1 != b.nodeType && (b = b.parentNode); null !== b && a.Editable.VALID_NODES.indexOf(b.tagName) < 0;) b = b.parentNode;
        return null != b && "LI" == b.tagName && a(b).find(a.Editable.VALID_NODES.join()).length > 0 ? null : a.makeArray(a(b).parents()).indexOf(this.$element.get(0)) >= 0 ? b : null
    }, a.Editable.prototype.nextNode = function(a, b) {
        if (a.hasChildNodes()) return a.firstChild;
        for (; a && !a.nextSibling && a != b;) a = a.parentNode;
        return a && a != b ? a.nextSibling : null
    }, a.Editable.prototype.getRangeSelectedNodes = function(a) {
        var b = [],
            c = a.startContainer,
            d = a.endContainer;
        if (c == d && "TR" != c.tagName) {
            if (c.hasChildNodes() && 0 !== c.children.length) {
                for (var e = c.children, f = a.startOffset; f < a.endOffset; f++) e[f] && b.push(e[f]);
                return 0 === b.length && b.push(c), b
            }
            return [c]
        }
        if (c == d && "TR" == c.tagName) {
            var g = c.childNodes,
                h = a.startOffset;
            if (g.length > h && h >= 0) {
                var i = g[h];
                if ("TD" == i.tagName || "TH" == i.tagName) return [i]
            }
        }
        for (; c && c != d;) b.push(c = this.nextNode(c, d));
        for (c = a.startContainer; c && c != a.commonAncestorContainer;) b.unshift(c), c = c.parentNode;
        return b
    }, a.Editable.prototype.getSelectedNodes = function() {
        if (window.getSelection) {
            var b = window.getSelection();
            if (!b.isCollapsed) {
                for (var c = this.getRanges(), d = [], e = 0; e < c.length; e++) d = a.merge(d, this.getRangeSelectedNodes(c[e]));
                return d
            }
            if (this.selectionInEditor()) {
                var f = b.getRangeAt(0).startContainer;
                return 3 == f.nodeType ? [f.parentNode] : [f]
            }
        }
        return []
    }, a.Editable.prototype.getSelectionElements = function() {
        var b = this.getSelectedNodes(),
            c = [];
        return a.each(b, a.proxy(function(a, b) {
            if (null !== b) {
                var d = this.getElementFromNode(b);
                c.indexOf(d) < 0 && d != this.$element.get(0) && null !== d && c.push(d)
            }
        }, this)), 0 === c.length && c.push(this.$element.get(0)), c
    }, a.Editable.prototype.getSelectionLink = function() {
        var b = this.getSelectionLinks();
        return b.length > 0 ? a(b[0]).attr("href") : null
    }, a.Editable.prototype.saveSelection = function() {
        if (!this.selectionDisabled) {
            var a, b, c, d = this.getSelection();
            if (d.getRangeAt && d.rangeCount) {
                for (c = [], a = 0, b = d.rangeCount; b > a; a += 1) c.push(d.getRangeAt(a));
                this.savedRanges = c
            } else this.savedRanges = null
        }
    }, a.Editable.prototype.restoreSelection = function() {
        if (!this.selectionDisabled) {
            var a, b, c = this.getSelection();
            if (this.savedRanges)
                for (c.removeAllRanges(), a = 0, b = this.savedRanges.length; b > a; a += 1) c.addRange(this.savedRanges[a])
        }
    }, a.Editable.prototype.insertMarkersAtPoint = function(a) {
        var b = a.clientX,
            c = a.clientY;
        this.removeMarkers();
        var d, e = null;
        if ("undefined" != typeof document.caretPositionFromPoint ? (d = document.caretPositionFromPoint(b, c), e = document.createRange(), e.setStart(d.offsetNode, d.offset), e.setEnd(d.offsetNode, d.offset)) : "undefined" != typeof document.caretRangeFromPoint && (d = document.caretRangeFromPoint(b, c), e = document.createRange(), e.setStart(d.startContainer, d.startOffset), e.setEnd(d.startContainer, d.startOffset)), null !== e && "undefined" != typeof window.getSelection) {
            var f = window.getSelection();
            f.removeAllRanges(), f.addRange(e)
        } else if ("undefined" != typeof document.body.createTextRange) {
            e = document.body.createTextRange(), e.moveToPoint(b, c);
            var g = e.duplicate();
            g.moveToPoint(b, c), e.setEndPoint("EndToEnd", g), e.select()
        }
        this.placeMarker(e, !1, 0), this.placeMarker(e, !0, 0)
    }, a.Editable.prototype.saveSelectionByMarkers = function() {
        if (!this.selectionDisabled) {
            var a = this.getRanges();
            this.removeMarkers();
            for (var b = 0; b < a.length; b++) this.placeMarker(a[b], !0, b), this.placeMarker(a[b], !1, b)
        }
    }, a.Editable.prototype.hasSelectionByMarkers = function() {
        var a = this.$element.find('.f-marker[data-type="true"]');
        return a.length > 0 ? !0 : !1
    }, a.Editable.prototype.restoreSelectionByMarkers = function(b) {
        if (void 0 === b && (b = !0), !this.selectionDisabled) {
            var c = this.$element.find('.f-marker[data-type="true"]');
            if (0 === c.length) return !1;
            var d = this.getSelection();
            this.mobile() ? this.$element.is(":focus") || this.$element.focus() : this.focus(), !b && 1 === c.length && 1 === d.rangeCount && this.getRange().collapsed && a(c[0]).attr("data-collapsed") || (this.clearSelection(), b = !0);
            for (var e = 0; e < c.length; e++) {
                var f, g = a(c[e]).data("id"),
                    h = c[e],
                    i = this.$element.find('.f-marker[data-type="false"][data-id="' + g + '"]');
                if (f = b ? document.createRange() : this.getRange(), i.length > 0) {
                    i = i[0];
                    try {
                        f.setStartAfter(h), f.setEndBefore(i)
                    } catch (j) {}
                }
                b && d.addRange(f)
            }
            this.editableDisabled || this.uneditable || this.isHTML || this.$element.attr("contenteditable", !0), this.removeMarkers()
        }
    }, a.Editable.prototype.setSelection = function(a, b, c, d) {
        var e = this.getSelection();
        if (e) {
            this.clearSelection();
            try {
                c || (c = a), void 0 === b && (b = 0), void 0 === d && (d = b);
                var f = this.getRange();
                f.setStart(a, b), f.setEnd(c, d), e.addRange(f)
            } catch (g) {}
        }
    }, a.Editable.prototype.buildMarker = function(b, c, d) {
        return void 0 === d && (d = ""), a('<span class="f-marker"' + d + ' style="display:none; line-height: 0;" data-fr-verified="true" data-id="' + c + '" data-type="' + b + '">', document)[0]
    }, a.Editable.prototype.placeMarker = function(a, b, c) {
        try {
            var d = a.cloneRange();
            d.collapse(b);
            var e = "";
            a.collapsed && (e = ' data-collapsed="true"'), d.insertNode(this.buildMarker(b, c, e)), d.detach()
        } catch (f) {}
    }, a.Editable.prototype.removeMarkers = function() {
        this.$element.find(".f-marker").remove()
    }, a.Editable.prototype.getSelectionTextInfo = function(a) {
        var b, c, d = !1,
            e = !1;
        if (window.getSelection) {
            var f = window.getSelection();
            f.rangeCount && (b = f.getRangeAt(0), c = b.cloneRange(), c.selectNodeContents(a), c.setEnd(b.startContainer, b.startOffset), d = "" === c.toString(), c.selectNodeContents(a), c.setStart(b.endContainer, b.endOffset), e = "" === c.toString())
        } else document.selection && "Control" != document.selection.type && (b = document.selection.createRange(), c = b.duplicate(), c.moveToElementText(a), c.setEndPoint("EndToStart", b), d = "" === c.text, c.moveToElementText(a), c.setEndPoint("StartToEnd", b), e = "" === c.text);
        return {
            atStart: d,
            atEnd: e
        }
    }, a.Editable.prototype.endsWith = function(a, b) {
        return -1 !== a.indexOf(b, a.length - b.length)
    }
}(jQuery),
function(a) {
    a.Editable.hexToRGB = function(a) {
        var b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        a = a.replace(b, function(a, b, c, d) {
            return b + b + c + c + d + d
        });
        var c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
        return c ? {
            r: parseInt(c[1], 16),
            g: parseInt(c[2], 16),
            b: parseInt(c[3], 16)
        } : null
    }, a.Editable.hexToRGBString = function(a) {
        var b = this.hexToRGB(a);
        return b ? "rgb(" + b.r + ", " + b.g + ", " + b.b + ")" : ""
    }, a.Editable.getIEversion = function() {
        var a, b, c = -1;
        return "Microsoft Internet Explorer" == navigator.appName ? (a = navigator.userAgent, b = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})"), null !== b.exec(a) && (c = parseFloat(RegExp.$1))) : "Netscape" == navigator.appName && (a = navigator.userAgent, b = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})"), null !== b.exec(a) && (c = parseFloat(RegExp.$1))), c
    }, a.Editable.browser = function() {
        var a = {};
        if (this.getIEversion() > 0) a.msie = !0;
        else {
            var b = navigator.userAgent.toLowerCase(),
                c = /(chrome)[ \/]([\w.]+)/.exec(b) || /(webkit)[ \/]([\w.]+)/.exec(b) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || b.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(b) || [],
                d = {
                    browser: c[1] || "",
                    version: c[2] || "0"
                };
            c[1] && (a[d.browser] = !0), parseInt(d.version, 10) < 9 && a.msie && (a.oldMsie = !0), a.chrome ? a.webkit = !0 : a.webkit && (a.safari = !0)
        }
        return a
    }
}(jQuery),
function(a) {
    a.Editable.prototype.show = function(b) {
        if (void 0 !== b) {
            if (this.options.inlineMode || this.options.editInPopup)
                if (null !== b && "touchend" !== b.type) {
                    var c = b.pageX,
                        d = b.pageY;
                    c < this.$element.offset().left && (c = this.$element.offset().left), c > this.$element.offset().left + this.$element.width() && (c = this.$element.offset().left + this.$element.width()), d < this.$element.offset.top && (d = this.$element.offset().top), d > this.$element.offset().top + this.$element.height() && (d = this.$element.offset().top + this.$element.height()), 20 > c && (c = 20), 0 > d && (d = 0), this.showByCoordinates(c, d), a(".froala-editor:not(.f-basic)").hide(), this.$editor.show(), 0 !== this.options.buttons.length || this.options.editInPopup || this.$editor.hide()
                } else a(".froala-editor:not(.f-basic)").hide(), this.$editor.show(), this.repositionEditor();
            this.hidePopups(), this.options.editInPopup || this.showEditPopupWrapper(), this.$bttn_wrapper.show(), this.refreshButtons(), this.imageMode = !1
        }
    }, a.Editable.prototype.hideDropdowns = function() {
        this.$bttn_wrapper.find(".fr-dropdown .fr-trigger").removeClass("active"), this.$bttn_wrapper.find(".fr-dropdown .fr-trigger")
    }, a.Editable.prototype.hide = function(a) {
        return this.initialized ? (void 0 === a && (a = !0), a ? this.hideOtherEditors() : (this.closeImageMode(), this.imageMode = !1), this.$popup_editor.hide(), this.hidePopups(!1), this.hideDropdowns(), void(this.link = !1)) : !1
    }, a.Editable.prototype.hideOtherEditors = function() {
        for (var b = 1; b <= a.Editable.count; b++) b != this._id && a(window).trigger("hide." + b)
    }, a.Editable.prototype.hideBttnWrapper = function() {
        this.options.inlineMode && this.$bttn_wrapper.hide()
    }, a.Editable.prototype.showBttnWrapper = function() {
        this.options.inlineMode && this.$bttn_wrapper.show()
    }, a.Editable.prototype.showEditPopupWrapper = function() {
        this.$edit_popup_wrapper && (this.$edit_popup_wrapper.show(), setTimeout(a.proxy(function() {
            this.$edit_popup_wrapper.find("input").val(this.$element.text()).focus().select()
        }, this), 1))
    }, a.Editable.prototype.hidePopups = function(a) {
        void 0 === a && (a = !0), a && this.hideBttnWrapper(), this.raiseEvent("hidePopups")
    }, a.Editable.prototype.showEditPopup = function() {
        this.showEditPopupWrapper()
    }
}(jQuery),
function(a) {
    a.Editable.prototype.getBoundingRect = function() {
        var b;
        if (this.isLink) {
            b = {};
            var c = this.$element;
            b.left = c.offset().left - a(window).scrollLeft(), b.top = c.offset().top - a(window).scrollTop(), b.width = c.outerWidth(), b.height = parseInt(c.css("padding-top").replace("px", "")) + c.height(), b.right = 1, b.bottom = 1, b.ok = !0
        } else if (this.getRange().collapsed) {
            var d = a(this.getSelectionElement());
            this.saveSelectionByMarkers();
            var e = this.$element.find(".f-marker:first");
            e.css("display", "inline");
            var f = e.offset();
            e.css("display", "none"), b = {}, b.left = f.left - a(window).scrollLeft(), b.width = 0, b.height = (parseInt(d.css("line-height").replace("px", "")) || 10) - 10 - a(window).scrollTop(), b.top = f.top, b.right = 1, b.bottom = 1, b.ok = !0, this.removeMarkers()
        } else b = this.getRange().getBoundingClientRect();
        return b
    }, a.Editable.prototype.repositionEditor = function(b) {
        var c, d, e;
        if (this.options.inlineMode || b) {
            if (c = this.getBoundingRect(), this.showBttnWrapper(), c.ok || c.left >= 0 && c.top >= 0 && c.right > 0 && c.bottom > 0) d = c.left + c.width / 2, e = c.top + c.height, this.iPad() || (d += a(window).scrollLeft(), e += a(window).scrollTop()), this.showByCoordinates(d, e);
            else if (this.options.alwaysVisible) this.hide();
            else {
                var f = this.$element.offset();
                this.showByCoordinates(f.left, f.top + 10)
            }
            0 === this.options.buttons.length && this.hide()
        }
    }, a.Editable.prototype.showByCoordinates = function(b, c) {
        b -= 20, c += 15;
        var d = Math.max(this.$popup_editor.width(), 250);
        b + d >= a(window).width() - 50 && b + 40 - d > 0 ? (this.$popup_editor.addClass("right-side"), b = a(window).width() - (b + 40), this.$popup_editor.css("top", c), this.$popup_editor.css("right", b), this.$popup_editor.css("left", "auto")) : b + d < a(window).width() - 50 ? (this.$popup_editor.removeClass("right-side"), this.$popup_editor.css("top", c), this.$popup_editor.css("left", b), this.$popup_editor.css("right", "auto")) : (this.$popup_editor.removeClass("right-side"), this.$popup_editor.css("top", c), this.$popup_editor.css("left", Math.max(a(window).width() - d, 10) / 2), this.$popup_editor.css("right", "auto")), this.$popup_editor.show()
    }, a.Editable.prototype.positionPopup = function(b) {
        if (a(this.$editor.find('button.fr-bttn[data-cmd="' + b + '"]')).length) {
            var c = this.$editor.find('button.fr-bttn[data-cmd="' + b + '"]'),
                d = c.width(),
                e = c.height() - 15,
                f = c.offset().left + d / 2,
                g = c.offset().top + e;
            this.showByCoordinates(f, g)
        }
    }
}(jQuery),
function(a) {
    a.Editable.image_commands = {
        floatImageLeft: {
            title: "Float Left",
            icon: {
                type: "font",
                value: "fa fa-align-left"
            }
        },
        floatImageNone: {
            title: "Float None",
            icon: {
                type: "font",
                value: "fa fa-align-justify"
            }
        },
        floatImageRight: {
            title: "Float Right",
            icon: {
                type: "font",
                value: "fa fa-align-right"
            }
        },
        linkImage: {
            title: "Insert Link",
            icon: {
                type: "font",
                value: "fa fa-link"
            }
        },
        replaceImage: {
            title: "Replace Image",
            icon: {
                type: "font",
                value: "fa fa-exchange"
            }
        },
        removeImage: {
            title: "Remove Image",
            icon: {
                type: "font",
                value: "fa fa-trash-o"
            }
        }
    }, a.Editable.DEFAULTS = a.extend(a.Editable.DEFAULTS, {
        allowedImageTypes: ["jpeg", "jpg", "png", "gif"],
        imageButtons: ["floatImageLeft", "floatImageNone", "floatImageRight", "linkImage", "replaceImage", "removeImage"],
        imageDeleteURL: null,
        imageDeleteParams: {},
        imageMove: !0,
        imageResize: !0,
        imageLink: !0,
        imageUpload: !0,
        imageUploadParams: {},
        imageUploadParam: "file",
        imageUploadToS3: !1,
        imageUploadURL: "http://i.froala.com/upload",
        maxImageSize: 10485760,
        textNearImage: !0
    }), a.Editable.prototype.hideImageEditorPopup = function() {
        this.$image_editor && this.$image_editor.hide()
    }, a.Editable.prototype.showImageEditorPopup = function() {
        this.$image_editor && this.$image_editor.show(), this.options.imageMove || this.$element.attr("contenteditable", !1)
    }, a.Editable.prototype.showImageWrapper = function() {
        this.$image_wrapper && this.$image_wrapper.show()
    }, a.Editable.prototype.hideImageWrapper = function(a) {
        this.$image_wrapper && (this.$element.attr("data-resize") || a || (this.closeImageMode(), this.imageMode = !1), this.$image_wrapper.hide())
    }, a.Editable.prototype.showInsertImage = function() {
        this.hidePopups(), this.showImageWrapper()
    }, a.Editable.prototype.showImageEditor = function() {
        this.hidePopups(), this.showImageEditorPopup()
    }, a.Editable.prototype.insertImageHTML = function() {
        var b = '<div class="froala-popup froala-image-popup" style="display: none;"><h4><span data-text="true">Insert image</span><span data-text="true">Uploading image</span><i title="Cancel" class="fa fa-times" id="f-image-close-' + this._id + '"></i></h4>';
        return b += '<div id="f-image-list-' + this._id + '">', this.options.imageUpload && (b += '<div class="f-popup-line drop-upload">', b += '<div class="f-upload" id="f-upload-div-' + this._id + '"><strong data-text="true">Drop Image</strong><br>(<span data-text="true">or click</span>)<form target="frame-' + this._id + '" enctype="multipart/form-data" encoding="multipart/form-data" action="' + this.options.imageUploadURL + '" method="post" id="f-upload-form-' + this._id + '"><input id="f-file-upload-' + this._id + '" type="file" name="' + this.options.imageUploadParam + '" accept="image/*"></form></div>', this.browser.msie && a.Editable.getIEversion() <= 9 && (b += '<iframe id="frame-' + this._id + '" name="frame-' + this._id + '" src="javascript:false;" style="width:0; height:0; border:0px solid #FFF; position: fixed; z-index: -1;" data-loaded="true"></iframe>'), b += "</div>"), this.options.imageLink && (b += '<div class="f-popup-line"><label><span data-text="true">Enter URL</span>: </label><input id="f-image-url-' + this._id + '" type="text" placeholder="http://example.com"><button data-text="true" class="f-ok" id="f-image-ok-' + this._id + '">OK</button></div>'), b += "</div>", b += '<p class="f-progress" id="f-progress-' + this._id + '"><span></span></p>', b += "</div>"
    }, a.Editable.prototype.iFrameLoad = function() {
        var a = this.$image_wrapper.find("iframe#frame-" + this._id);
        if (!a.data("loaded")) return a.data("loaded", !0), !1;
        try {
            var b = this.$image_wrapper.find("#f-upload-form-" + this._id);
            if (this.options.imageUploadToS3) {
                var c = b.attr("action"),
                    d = b.find('input[name="key"]').val(),
                    e = c + d;
                this.writeImage(e), this.options.imageUploadToS3.callback && this.options.imageUploadToS3.callback.call(this, e, d)
            } else {
                var f = a.contents().text();
                this.parseImageResponse(f)
            }
        } catch (g) {
            this.throwImageError(7)
        }
    }, a.Editable.prototype.initImage = function() {
        this.buildInsertImage(), (!this.isLink || this.isImage) && (this.initImageEvents(), this.initImagePopup()), this.addListener("destroy", this.destroyImage)
    }, a.Editable.initializers.push(a.Editable.prototype.initImage), a.Editable.prototype.destroyImage = function() {
        this.$image_editor.html("").removeData().remove(), this.$image_wrapper.html("").removeData().remove()
    }, a.Editable.prototype.buildInsertImage = function() {
        this.$image_wrapper = a(this.insertImageHTML()), this.$popup_editor.append(this.$image_wrapper);
        var b = this;
        if (this.$image_wrapper.on("mouseup", a.proxy(function(a) {
            this.isResizing() || a.stopPropagation()
        }, this)), this.addListener("hidePopups", a.proxy(function() {
            this.hideImageWrapper(!0)
        }), this), this.$progress_bar = this.$image_wrapper.find("p#f-progress-" + this._id), this.options.imageUpload) {
            if (this.browser.msie && a.Editable.getIEversion() <= 9) {
                var c = this.$image_wrapper.find("iframe").get(0);
                c.attachEvent ? c.attachEvent("onload", function() {
                    b.iFrameLoad()
                }) : c.onload = function() {
                    b.iFrameLoad()
                }
            }
            this.$image_wrapper.on("change", 'input[type="file"]', function() {
                if (void 0 !== this.files) b.uploadImage(this.files);
                else {
                    var c = a(this).parents("form");
                    c.find('input[type="hidden"]').remove();
                    var d;
                    for (d in b.options.imageUploadParams) c.prepend('<input type="hidden" name="' + d + '" value="' + b.options.imageUploadParams[d] + '" />');
                    if (b.options.imageUploadToS3 !== !1) {
                        for (d in b.options.imageUploadToS3.params) c.prepend('<input type="hidden" name="' + d + '" value="' + b.options.imageUploadToS3.params[d] + '" />');
                        c.prepend('<input type="hidden" name="success_action_status" value="201" />'), c.prepend('<input type="hidden" name="X-Requested-With" value="xhr" />'), c.prepend('<input type="hidden" name="Content-Type" value="" />'), c.prepend('<input type="hidden" name="key" value="' + b.options.imageUploadToS3.keyStart + (new Date).getTime() + "-" + a(this).val().match(/[^\/\\]+$/) + '" />')
                    } else c.prepend('<input type="hidden" name="XHR_CORS_TRARGETORIGIN" value="' + window.location.href + '" />');
                    b.$image_wrapper.find("#f-image-list-" + b._id).hide(), b.$progress_bar.show(), b.$progress_bar.find("span").css("width", "100%").text("Please wait!"), b.showInsertImage(), c.submit()
                }
                a(this).val("")
            }), this.buildDragUpload()
        }
        this.$image_wrapper.on("mouseup keydown", "#f-image-url-" + this._id, a.proxy(function(a) {
            var b = a.which;
            b && 27 === b || a.stopPropagation()
        }, this)), this.$image_wrapper.on("click", "#f-image-ok-" + this._id, a.proxy(function() {
            this.writeImage(this.$image_wrapper.find("#f-image-url-" + this._id).val(), !0)
        }, this)), this.$image_wrapper.on("click", "#f-image-close-" + this._id, a.proxy(function() {
            this.$bttn_wrapper.show(), this.hideImageWrapper(!0), this.options.inlineMode && 0 === this.options.buttons.length && (this.imageMode ? this.showImageEditor() : this.hide()), this.imageMode || this.restoreSelectionByMarkers(), this.options.inlineMode || this.imageMode ? this.imageMode && this.showImageEditor() : this.hide()
        }, this)), this.$image_wrapper.on("click", function(a) {
            a.stopPropagation()
        }), this.$image_wrapper.on("click", "*", function(a) {
            a.stopPropagation()
        })
    }, a.Editable.prototype.deleteImage = function(b) {
        if (this.options.imageDeleteURL) {
            var c = this.options.imageDeleteParams;
            c.info = b.data("info"), c.src = b.attr("src"), a.ajax({
                type: "POST",
                url: this.options.imageDeleteURL,
                data: c,
                crossDomain: this.options.crossDomain,
                xhrFields: {
                    withCredentials: this.options.withCredentials
                },
                headers: this.options.headers
            }).done(a.proxy(function(a) {
                b.parent().parent().hasClass("f-image-list") ? b.parent().remove() : b.parent().removeClass("f-img-deleting"), this.triggerEvent("imageDeleteSuccess", [a], !1)
            }, this)).fail(a.proxy(function() {
                b.parent().removeClass("f-img-deleting"), this.triggerEvent("imageDeleteError", ["Error during image delete."], !1)
            }, this))
        } else b.parent().removeClass("f-img-deleting"), this.triggerEvent("imageDeleteError", ["Missing imageDeleteURL option."], !1)
    }, a.Editable.prototype.imageHandle = function() {
        var b = this,
            c = a('<span data-fr-verified="true">').addClass("f-img-handle").on({
                movestart: function(c) {
                    b.hide(), b.$element.addClass("f-non-selectable").attr("contenteditable", !1), b.$element.attr("data-resize", !0), a(this).attr("data-start-x", c.startX), a(this).attr("data-start-y", c.startY)
                },
                move: function(c) {
                    var d = a(this),
                        e = c.pageX - parseInt(d.attr("data-start-x"), 10);
                    d.attr("data-start-x", c.pageX), d.attr("data-start-y", c.pageY);
                    var f = d.prevAll("img"),
                        g = f.width();
                    d.hasClass("f-h-ne") || d.hasClass("f-h-se") ? f.attr("width", g + e) : f.attr("width", g - e), b.triggerEvent("imageResize", [], !1)
                },
                moveend: function() {
                    a(this).removeAttr("data-start-x"), a(this).removeAttr("data-start-y"), b.$element.removeClass("f-non-selectable"), b.isImage || b.$element.attr("contenteditable", !0), b.triggerEvent("imageResizeEnd"), a(this).trigger("mouseup")
                },
                touchend: function() {
                    a(this).trigger("moveend")
                }
            });
        return c
    }, a.Editable.prototype.disableImageResize = function() {
        if (this.browser.mozilla) try {
            document.execCommand("enableObjectResizing", !1, !1), document.execCommand("enableInlineTableEditing", !1, !1)
        } catch (a) {}
    }, a.Editable.prototype.isResizing = function() {
        return this.$element.attr("data-resize")
    }, a.Editable.prototype.getImageClass = function(a) {
        var b = a.split(" ");
        return b.indexOf("fr-fir") >= 0 ? "fr-fir" : b.indexOf("fr-fil") >= 0 ? "fr-fil" : "fr-fin"
    }, a.Editable.prototype.addImageClass = function(a, b) {
        a.removeClass("fr-fin fr-fir fr-fil").addClass(b)
    }, a.Editable.prototype.initImageEvents = function() {
        this.disableImageResize();
        var b = this;
        document.addEventListener && document.addEventListener("drop", a.proxy(function() {
            setTimeout(a.proxy(function() {
                b.closeImageMode(), b.imageMode = !1, b.hide(), this.sync(), this.clearSelection()
            }, this), 10)
        }, this)), this.$element.on("mousedown", 'img:not([contenteditable="false"])', function(a) {
            return b.isDisabled ? !1 : void(b.isResizing() || (a.stopPropagation(), (!b.options.imageMove || b.browser.msie) && b.$element.attr("contenteditable", !1)))
        }), this.$element.on("mouseup", 'img:not([contenteditable="false"])', function() {
            return b.isDisabled ? !1 : void(b.isResizing() || b.options.imageMove || b.isImage || b.isHTML || b.$element.attr("contenteditable", !0))
        }), this.$element.on("click touchend", 'img:not([contenteditable="false"])', function(c) {
            if (b.isDisabled) return !1;
            if (!b.isResizing()) {
                c.preventDefault(), c.stopPropagation(), b.closeImageMode(), b.$element.blur(), b.$image_editor.find("button").removeClass("active");
                var d = a(this).css("float");
                if (a(this).hasClass("fr-fil") ? d = "left" : a(this).hasClass("fr-fir") && (d = "right"), b.$image_editor.find('button[data-cmd="floatImage' + d.charAt(0).toUpperCase() + d.slice(1) + '"]').addClass("active"), b.$image_editor.find('.f-image-alt input[type="text"]').val(a(this).attr("alt") || a(this).attr("title")), b.showImageEditor(), !a(this).parent().hasClass("f-img-editor") || "SPAN" != a(this).parent().get(0).tagName) {
                    var e = b.getImageClass(a(this).attr("class"));
                    a(this).wrap('<span data-fr-verified="true" class="f-img-editor ' + e + '"></span>'), 0 !== a(this).parents(".f-img-wrap").length || b.isImage ? b.addImageClass(a(this).parents(".f-img-wrap"), e) : a(this).parents("a").length > 0 ? a(this).parents("a:first").wrap('<span data-fr-verified="true" class="f-img-wrap ' + e + '"></span>') : a(this).parent().wrap('<span data-fr-verified="true" class="f-img-wrap ' + e + '"></span>')
                }
                var f = b.imageHandle();
                a(this).parent().find(".f-img-handle").remove(), b.options.imageResize && (a(this).parent().append(f.clone(!0).addClass("f-h-ne")), a(this).parent().append(f.clone(!0).addClass("f-h-se")), a(this).parent().append(f.clone(!0).addClass("f-h-sw")), a(this).parent().append(f.clone(!0).addClass("f-h-nw"))), b.clearSelection(), b.showByCoordinates(a(this).offset().left + a(this).width() / 2, a(this).offset().top + a(this).height()), b.imageMode = !0, b.$bttn_wrapper.find(".fr-bttn").removeClass("active")
            }
        }), this.$element.on("mousedown touchstart", ".f-img-handle", a.proxy(function() {
            return b.isDisabled ? !1 : void this.$element.attr("data-resize", !0)
        }, this)), this.$element.on("mouseup", ".f-img-handle", a.proxy(function(c) {
            if (b.isDisabled) return !1;
            var d = a(c.target).prevAll("img");
            setTimeout(a.proxy(function() {
                this.$element.removeAttr("data-resize"), d.click()
            }, this), 0)
        }, this))
    }, a.Editable.prototype.initImagePopup = function() {
        this.$image_editor = a('<div class="froala-popup froala-image-editor-popup" style="display: none">');
        for (var b = a('<div class="f-popup-line f-popup-toolbar">').appendTo(this.$image_editor), c = 0; c < this.options.imageButtons.length; c++) {
            var d = this.options.imageButtons[c];
            if (void 0 !== a.Editable.image_commands[d]) {
                var e = a.Editable.image_commands[d],
                    f = '<button class="fr-bttn" data-cmd="' + d + '" title="' + e.title + '">';
                f += void 0 !== this.options.icons[d] ? this.prepareIcon(this.options.icons[d], e.title) : this.prepareIcon(e.icon, e.title), f += "</button>", b.append(f)
            }
        }
        this.addListener("hidePopups", this.hideImageEditorPopup), a('<div class="f-popup-line f-image-alt">').append('<label><span data-text="true">Title</span>: </label>').append(a('<input type="text">').on("mouseup keydown", function(a) {
            var b = a.which;
            b && 27 === b || a.stopPropagation()
        })).append('<button class="f-ok" data-text="true" data-cmd="setImageAlt" title="OK">OK</button>').appendTo(this.$image_editor);
        var g = this;
        this.$image_editor.find("button").click(function(b) {
            b.stopPropagation(), g[a(this).attr("data-cmd")](g.$element.find("span.f-img-editor"))
        }), this.$popup_editor.append(this.$image_editor)
    }, a.Editable.prototype.floatImageLeft = function(a) {
        this.addImageClass(a, "fr-fil"), this.isImage && this.$element.css("float", "left"), this.saveUndoStep(), this.triggerEvent("imageFloatedLeft"), a.find("img").click()
    }, a.Editable.prototype.floatImageNone = function(a) {
        this.addImageClass(a, "fr-fin"), this.isImage || (a.parent().get(0) == this.$element.get(0) ? a.wrap('<div style="text-align: center;"></div>') : a.parents(".f-img-wrap:first").css("text-align", "center")), this.isImage && this.$element.css("float", "none"), this.saveUndoStep(), this.triggerEvent("imageFloatedNone"), a.find("img").click()
    }, a.Editable.prototype.floatImageRight = function(a) {
        this.addImageClass(a, "fr-fir"), this.isImage && this.$element.css("float", "right"), this.saveUndoStep(), this.triggerEvent("imageFloatedRight"), a.find("img").click()
    }, a.Editable.prototype.linkImage = function(a) {
        this.showInsertLink(), this.imageMode = !0, "A" == a.parent().get(0).tagName ? (this.$link_wrapper.find('input[type="text"]').val(a.parent().attr("href")), this.$link_wrapper.find(".f-external-link").attr("href", a.parent().attr("href")), "_blank" == a.parent().attr("target") ? this.$link_wrapper.find('input[type="checkbox"]').prop("checked", !0) : this.$link_wrapper.find('input[type="checkbox"]').prop("checked", !1)) : (this.$link_wrapper.find('input[type="text"]').val("http://"), this.$link_wrapper.find(".f-external-link").attr("href", "#"), this.$link_wrapper.find('input[type="checkbox"]').prop("checked", this.options.alwaysBlank))
    }, a.Editable.prototype.replaceImage = function(a) {
        this.showInsertImage(), this.imageMode = !0, this.$image_wrapper.find('input[type="text"]').val(a.find("img").attr("src"));
        var b = a.find("img");
        this.showByCoordinates(b.offset().left + b.width() / 2, b.offset().top + b.height())
    }, a.Editable.prototype.removeImage = function(b) {
        var c = b.find("img").get(0),
            d = "Are you sure? Image will be deleted.";
        a.Editable.LANGS[this.options.language] && (d = a.Editable.LANGS[this.options.language].translation[d]), confirm(d) ? this.triggerEvent("beforeRemoveImage", [a(c)], !1) && (b.parents(".f-img-wrap").length ? b.parents(".f-img-wrap").remove() : b.remove(), this.refreshImageList(!0), this.hide(), this.saveUndoStep(), this.wrapText(), this.triggerEvent("afterRemoveImage", [a(c)]), this.focus(), this.imageMode = !1) : b.find("img").click()
    }, a.Editable.prototype.setImageAlt = function(a) {
        a.find("img").attr("alt", this.$image_editor.find('.f-image-alt input[type="text"]').val()), a.find("img").attr("title", this.$image_editor.find('.f-image-alt input[type="text"]').val()), this.saveUndoStep(), this.hide(), this.closeImageMode(), this.triggerEvent("imageAltSet")
    }, a.Editable.prototype.buildDragUpload = function() {
        var b = this;
        b.$image_wrapper.on("dragover", "#f-upload-div-" + this._id, function() {
            return a(this).addClass("f-hover"), !1
        }), b.$image_wrapper.on("dragend", "#f-upload-div-" + this._id, function() {
            return a(this).removeClass("f-hover"), !1
        }), b.$image_wrapper.on("drop", "#f-upload-div-" + this._id, function(c) {
            a(this).removeClass("f-hover"), c.preventDefault(), c.stopPropagation(), b.uploadImage(c.originalEvent.dataTransfer.files)
        }), b.$element.on("dragover dragend", function(a) {
            return a.originalEvent.dataTransfer && a.originalEvent.dataTransfer.files && a.originalEvent.dataTransfer.files.length ? !1 : void 0
        }), b.$element.on("drop", function(a) {
            if (a.originalEvent.dataTransfer && a.originalEvent.dataTransfer.files && a.originalEvent.dataTransfer.files.length) {
                if (b.isDisabled) return !1;
                b.insertMarkersAtPoint(a.originalEvent), b.uploadImage(a.originalEvent.dataTransfer.files), a.preventDefault(), a.stopPropagation()
            }
        })
    }, a.Editable.prototype.imagePreviewInsert = function(b, c) {
        void 0 === c && (c = !0), this.enable(), this.restoreSelectionByMarkers(), this.focus();
        var d = '<img class="fr-fin" data-fr-image-preview="' + c + '" alt="Image title" src="' + b + '" width="' + this.options.defaultImageWidth + '">',
            e = this.getSelectionElements()[0],
            f = this.getRange(),
            g = !this.browser.msie && a.Editable.getIEversion() > 8 ? a(f.startContainer) : null;
        g && g.hasClass("f-img-wrap") ? (1 === f.startOffset ? (g.after('<p><span class="f-marker" data-type="true" data-id="0"></span><br/><span class="f-marker" data-type="false" data-id="0"></span></p>'), this.restoreSelectionByMarkers(), this.getSelection().collapseToStart()) : 0 === f.startOffset && (g.before('<p><span class="f-marker" data-type="true" data-id="0"></span><br/><span class="f-marker" data-type="false" data-id="0"></span></p>'), this.restoreSelectionByMarkers(), this.getSelection().collapseToStart()), this.insertHTML(d)) : this.getSelectionTextInfo(e).atStart && e != this.$element.get(0) && "TD" != e.tagName && "TH" != e.tagName && "LI" != e.tagName ? a(e).before("<p>" + d + "</p>") : this.insertHTML(d), c && setTimeout(a.proxy(function() {
            var a = this.$element.find('img[data-fr-image-preview="true"]');
            a.length && this.showByCoordinates(a.offset().left + a.width() / 2, a.offset().top + a.height() + 10)
        }, this), 10), this.disable()
    }, a.Editable.prototype.imagePreview = function(b) {
        if (this.files_to_upload = !0, "undefined" != typeof FileReader) {
            var c = new FileReader;
            c.onload = a.proxy(function(b) {
                return this.isDisabled ? (this.restoreSelectionByMarkers(), this.preview_image = new Image, this.preview_image.onload = a.proxy(function() {
                    return this.isDisabled ? void this.imagePreviewInsert(this.preview_image.src) : !1
                }, this), void(this.preview_image.src = b.target.result)) : !1
            }, this), c.readAsDataURL(b)
        }
    }, a.Editable.prototype.showImageLoader = function() {
        this.$image_wrapper.find("h4").addClass("uploading"), this.$image_wrapper.find("#f-image-list-" + this._id).hide(), this.$progress_bar.show(), this.showInsertImage()
    }, a.Editable.prototype.hideImageLoader = function() {
        this.$progress_bar.hide(), this.$progress_bar.find("span").css("width", "0%").text(""), this.$image_wrapper.find("#f-image-list-" + this._id).show(), this.$image_wrapper.find("h4").removeClass("uploading")
    }, a.Editable.prototype.writeImage = function(b, c) {
        c && (b = this.sanitizeURL(b));
        var d = new Image;
        return d.onerror = a.proxy(function() {
            this.hideImageLoader(), this.throwImageError(1)
        }, this), this.imageMode ? (d.onload = a.proxy(function() {
            var a = this.$element.find(".f-img-editor > img");
            a.attr("src", b), this.hide(), this.hideImageLoader(), this.$image_editor.show(), this.saveUndoStep(), this.triggerEvent("imageReplaced", [a])
        }, this), d.src = b, !1) : (d.onload = a.proxy(function() {
            this.insertLoadedImage(b, c)
        }, this), void(d.src = b))
    }, a.Editable.prototype.insertLoadedImage = function(a) {
        this.triggerEvent("imageLoaded", [a], !1);
        var b = this.$element.find("img[data-fr-image-preview]");
        b.length ? b.attr("src", a).removeAttr("data-fr-image-preview") : this.imagePreviewInsert(a), this.browser.msie && this.$element.find("img").each(function(a, b) {
            b.oncontrolselect = function() {
                return !1
            }
        }), this.enable(), this.hide(), this.hideImageLoader(), this.saveUndoStep(), this.focus(), this.wrapText(), this.triggerEvent("imageInserted", [a])
    }, a.Editable.prototype.throwImageErrorWithMessage = function(a) {
        this.enable(), this.$element.find("img[data-fr-image-preview]").remove(), this.triggerEvent("imageError", [{
            message: a,
            code: 0
        }], !1), this.hideImageLoader()
    }, a.Editable.prototype.throwImageError = function(a) {
        this.enable(), this.$element.find("img[data-fr-image-preview]").remove();
        var b = "Unknown image upload error.";
        1 == a ? b = "Bad link." : 2 == a ? b = "No link in upload response." : 3 == a ? b = "Error during file upload." : 4 == a ? b = "Parsing response failed." : 5 == a ? b = "Image too large." : 6 == a ? b = "Invalid image type." : 7 == a && (b = "Image can be uploaded only to same domain in IE 8 and IE 9."), this.triggerEvent("imageError", [{
            code: a,
            message: b
        }], !1), this.hideImageLoader()
    }, a.Editable.prototype.uploadImage = function(b) {
        if (!this.triggerEvent("beforeImageUpload", [b], !1)) return !1;
        if (void 0 !== b && b.length > 0) {
            var c;
            if (this.drag_support.formdata && (c = this.drag_support.formdata ? new FormData : null), c) {
                var d;
                for (d in this.options.imageUploadParams) c.append(d, this.options.imageUploadParams[d]);
                if (this.options.imageUploadToS3 !== !1) {
                    for (d in this.options.imageUploadToS3.params) c.append(d, this.options.imageUploadToS3.params[d]);
                    c.append("success_action_status", "201"), c.append("X-Requested-With", "xhr"), c.append("Content-Type", b[0].type), c.append("key", this.options.imageUploadToS3.keyStart + (new Date).getTime() + "-" + b[0].name)
                }
                if (c.append(this.options.imageUploadParam, b[0]), b[0].size > this.options.maxImageSize) return this.throwImageError(5), !1;
                if (this.options.allowedImageTypes.indexOf(b[0].type.replace(/image\//g, "")) < 0) return this.throwImageError(6), !1
            }
            if (c) {
                var e;
                this.options.crossDomain ? e = this.createCORSRequest("POST", this.options.imageUploadURL) : (e = new XMLHttpRequest, e.open("POST", this.options.imageUploadURL)), e.onload = a.proxy(function() {
                    this.$progress_bar.find("span").css("width", "100%").text("Please wait!");
                    try {
                        this.options.imageUploadToS3 ? 201 == e.status ? this.parseImageResponseXML(e.responseXML) : this.throwImageError(3) : e.status >= 200 && e.status < 300 ? this.parseImageResponse(e.responseText) : this.throwImageError(3)
                    } catch (a) {
                        this.throwImageError(4)
                    }
                }, this), e.onerror = a.proxy(function() {
                    this.throwImageError(3)
                }, this), e.upload.onprogress = a.proxy(function(a) {
                    if (a.lengthComputable) {
                        var b = a.loaded / a.total * 100 | 0;
                        this.$progress_bar.find("span").css("width", b + "%")
                    }
                }, this), this.disable(), this.imagePreview(b[0]), e.send(c), this.showImageLoader()
            }
        }
    }, a.Editable.prototype.parseImageResponse = function(b) {
        try {
            var c = a.parseJSON(b);
            c.link ? this.writeImage(c.link) : c.error ? this.throwImageErrorWithMessage(c.error) : this.throwImageError(2)
        } catch (d) {
            this.throwImageError(4)
        }
    }, a.Editable.prototype.parseImageResponseXML = function(b) {
        try {
            var c = a(b).find("Location").text(),
                d = a(b).find("Key").text();
            this.options.imageUploadToS3.callback.call(this, c, d), c ? this.writeImage(c) : this.throwImageError(2)
        } catch (e) {
            this.throwImageError(4)
        }
    }, a.Editable.prototype.setImageUploadURL = function(a) {
        a && (this.options.imageUploadURL = a), this.options.imageUploadToS3 && (this.options.imageUploadURL = "https://" + this.options.imageUploadToS3.bucket + "." + this.options.imageUploadToS3.region + ".amazonaws.com/")
    }, a.Editable.prototype.closeImageMode = function() {
        this.$element.find("span.f-img-editor > img").each(a.proxy(function(b, c) {
            this.addImageClass(a(c), this.getImageClass(a(c).parent().attr("class"))), a(c).parents(".f-img-wrap").length > 0 ? "A" == a(c).parent().parent().get(0).tagName ? a(c).siblings("span.f-img-handle").remove().end().unwrap().parent().unwrap() : a(c).siblings("span.f-img-handle").remove().end().unwrap().unwrap() : a(c).siblings("span.f-img-handle").remove().end().unwrap()
        }, this)), this.$element.find("span.f-img-editor").length && (this.$element.find("span.f-img-editor").remove(), this.$element.parents("span.f-img-editor").remove()), this.$element.removeClass("f-non-selectable"), this.editableDisabled || this.uneditable || this.isHTML || this.$element.attr("contenteditable", !0), this.$image_editor && this.$image_editor.hide(), this.$link_wrapper && this.$link_wrapper.find('input[type="text"].f-lt').parent().removeClass("fr-hidden")
    }, a.Editable.prototype.refreshImageList = function(b) {
        if (!this.isLink && !this.options.editInPopup) {
            var c = [],
                d = [],
                e = this;
            if (this.$element.find("img").each(function(b, f) {
                var g = a(f);
                if (c.push(g.attr("src")), d.push(g), 0 === g.parents(".f-img-editor").length && !g.hasClass("fr-fil") && !g.hasClass("fr-fir") && !g.hasClass("fr-fin")) {
                    var h;
                    "right" == g.css("float") ? (h = g.parent(), h.hasClass("f-img-editor") ? h.addClass("fr-fir") : g.addClass("fr-fir")) : "left" == g.css("float") ? (h = g.parent(), h.hasClass("f-img-editor") ? h.addClass("fr-fil") : g.addClass("fr-fil")) : (h = g.parent(), h.hasClass("f-img-editor") ? h.addClass("fr-fin") : g.addClass("fr-fin"))
                }
                e.options.textNearImage ? g.removeClass("fr-tni") : g.addClass("fr-tni"), g.css("margin", ""), g.css("float", "")
            }), void 0 === b)
                for (var f = 0; f < this.imageList.length; f++) c.indexOf(this.imageList[f].attr("src")) < 0 && this.triggerEvent("afterRemoveImage", [this.imageList[f]], !1);
            this.imageList = d
        }
    }, a.Editable.prototype.insertImage = function() {
        this.closeImageMode(), this.imageMode = !1, this.showInsertImage(), this.saveSelectionByMarkers(), this.options.inlineMode || this.positionPopup("insertImage"), this.imageMode = !1, this.$image_wrapper.find('input[type="text"]').val("")
    }
}(jQuery),
function(a) {
    a.Editable.prototype.showLinkWrapper = function() {
        this.$link_wrapper && (this.$link_wrapper.show(), this.$link_wrapper.trigger("hideLinkList"), this.$link_wrapper.trigger("hideLinkClassList"), this.imageMode ? this.$link_wrapper.find('input[type="text"].f-lt').parent().addClass("fr-hidden") : this.$link_wrapper.find('input[type="text"].f-lt').parent().removeClass("fr-hidden"), setTimeout(a.proxy(function() {
            this.$link_wrapper.find('input[type="text"].f-lu').focus().select()
        }, this), 0), this.link = !0)
    }, a.Editable.prototype.hideLinkWrapper = function() {
        this.$link_wrapper && this.$link_wrapper.hide()
    }, a.Editable.prototype.showInsertLink = function() {
        this.hidePopups(), this.showLinkWrapper()
    }, a.Editable.prototype.initLinkEvents = function() {
        var b = this,
            c = function(a) {
                a.stopPropagation(), a.preventDefault()
            },
            d = function(c) {
                if (c.stopPropagation(), c.preventDefault(), b.isDisabled) return !1;
                b.link = !0, b.clearSelection(), b.removeMarkers(), b.selectionDisabled || (a(this).before('<span class="f-marker" data-type="true" data-id="0" data-fr-verified="true"></span>'), a(this).after('<span class="f-marker" data-type="false" data-id="0" data-fr-verified="true"></span>')), b.restoreSelectionByMarkers(), b.exec("createLink");
                var d = a(this).attr("href") || "";
                b.$link_wrapper.find("input.f-lt").val(a(this).text()), b.isLink ? ("#" == d && (d = ""), b.$link_wrapper.find("input#f-lu-" + b._id).val(d.replace(/\&amp;/g, "&")), b.$link_wrapper.find(".f-external-link").attr("href", d || "#")) : (b.$link_wrapper.find("input.f-lu").val(d.replace(/\&amp;/g, "&")), b.$link_wrapper.find(".f-external-link").attr("href", d)), b.$link_wrapper.find('input[type="checkbox"]').prop("checked", "_blank" == a(this).attr("target")), b.$link_wrapper.find("li.f-choose-link-class").each(a.proxy(function(b, c) {
                    a(this).hasClass(a(c).data("class")) && a(c).click()
                }, this)), a(this).hasClass("fr-file") ? b.$link_wrapper.find("input.f-lu").parent().addClass("fr-hidden") : b.$link_wrapper.find("input.f-lu").parent().removeClass("fr-hidden"), b.showByCoordinates(a(this).offset().left + a(this).outerWidth() / 2, a(this).offset().top + (parseInt(a(this).css("padding-top")) || 0) + a(this).height()), b.$link_wrapper.find("input.f-lu").focus(), b.showInsertLink(), b.closeImageMode()
            };
        this.$element.on("mousedown", "a", a.proxy(function(a) {
            this.isResizing() || a.stopPropagation()
        }, this)), this.isLink ? this.iOS() ? (this.$element.on("click", c), this.$element.on("touchend", d)) : this.$element.on("click", d) : this.iOS() ? (this.$element.on("click", 'a:not([contenteditable="false"])', c), this.$element.on("touchend", 'a:not([contenteditable="false"])', d), this.$element.on("click", 'a[contenteditable="false"]', c), this.$element.on("touchend", 'a[contenteditable="false"]', c)) : (this.$element.on("click", 'a:not([contenteditable="false"])', d), this.$element.on("click", 'a[contenteditable="false"]', c))
    }, a.Editable.prototype.destroyLink = function() {
        this.$link_wrapper.html("").removeData().remove()
    }, a.Editable.prototype.initLink = function() {
        this.buildCreateLink(), this.initLinkEvents(), this.addListener("destroy", this.destroyLink)
    }, a.Editable.initializers.push(a.Editable.prototype.initLink), a.Editable.prototype.writeLink = function(b, c, d, e, f) {
        var g;
        this.options.noFollow && (f = !0), this.options.alwaysBlank && (e = !0);
        var h = "",
            i = "";
        if (f === !0 && /^https?:\/\//.test(b) && (h = 'rel="nofollow"'), e === !0 && (i = 'target="_blank"'), b = this.sanitizeURL(b), this.imageMode) {
            if ("" !== b) {
                if ("A" != this.$element.find(".f-img-editor").parent().get(0).tagName) this.$element.find(".f-img-editor").wrap('<a data-fr-link="true" href="' + b + '" ' + i + " " + h + "></a>");
                else {
                    var j = this.$element.find(".f-img-editor").parent();
                    e === !0 ? j.attr("target", "_blank") : j.removeAttr("target"), f === !0 ? j.attr("rel", "nofollow") : j.removeAttr("rel"), j.removeClass(Object.keys(this.options.linkClasses).join(" ")), j.attr("href", b).addClass(d)
                }
                this.triggerEvent("imageLinkInserted", [b])
            } else "A" == this.$element.find(".f-img-editor").parent().get(0).tagName && a(this.$element.find(".f-img-editor").get(0)).unwrap(), this.triggerEvent("imageLinkRemoved");
            this.saveUndoStep(), this.showImageEditor(), this.$element.find(".f-img-editor").find("img").click(), this.link = !1
        } else {
            var k = null;
            if (this.isLink ? "" === c && (c = this.$element.text()) : (this.restoreSelection(), g = this.getSelectionLinks(), g.length > 0 && (k = g[0].attributes), this.saveSelectionByMarkers(), document.execCommand("unlink", !1, b), this.$element.find('span[data-fr-link="true"]').each(function(b, c) {
                a(c).replaceWith(a(c).html())
            }), this.restoreSelectionByMarkers()), "" !== b) {
                this.isLink ? (this.$element.text(c), g = [this.$element.attr("href", b).get(0)]) : (this.removeMarkers(), this.insertHTML('<span class="f-marker" data-fr-verified="true" data-id="0" data-type="true"></span>' + (c || b) + '<span class="f-marker" data-fr-verified="true" data-id="0" data-type="false"></span>'), this.restoreSelectionByMarkers(), document.execCommand("createLink", !1, b), g = this.getSelectionLinks());
                for (var l = 0; l < g.length; l++) {
                    if (k)
                        for (var m = 0; m < k.length; m++) "href" != k[m].nodeName && a(g[l]).attr(k[m].nodeName, k[m].nodeValue);
                    e === !0 ? a(g[l]).attr("target", "_blank") : a(g[l]).removeAttr("target"), f === !0 && /^https?:\/\//.test(b) ? a(g[l]).attr("rel", "nofollow") : a(g[l]).removeAttr("rel"), a(g[l]).data("fr-link", !0), a(g[l]).removeClass(Object.keys(this.options.linkClasses).join(" ")), a(g[l]).addClass(d)
                }
                this.$element.find("a:empty").remove(), this.triggerEvent("linkInserted", [b])
            } else this.isLink || this.$element.find("a:empty").remove(), this.triggerEvent("linkRemoved");
            this.saveUndoStep(), this.hideLinkWrapper(), this.$bttn_wrapper.show(), (!this.options.inlineMode || this.isLink) && this.hide(), this.link = !1
        }
    }, a.Editable.prototype.createLinkHTML = function() {
        var a = '<div class="froala-popup froala-link-popup" style="display: none;">';
        a += '<h4><span data-text="true">Insert link</span><a target="_blank" title="Open Link" class="f-external-link" href="#"><i class="fa fa-external-link"></i></a><i title="Cancel" class="fa fa-times" id="f-link-close-' + this._id + '"></i></h4>', this.options.linkText && (a += '<div class="f-popup-line"><input type="text" placeholder="Text" class="f-lt" id="f-lt-' + this._id + '"></div>');
        var b = "";
        if (this.options.linkList.length && (b = "f-bi"), a += '<div class="f-popup-line"><input type="text" placeholder="http://www.example.com" class="f-lu ' + b + '" id="f-lu-' + this._id + '"/>', this.options.linkList.length) {
            a += '<button class="f-browse-links" id="f-browse-links-' + this._id + '"><i class="fa fa-chevron-down"></i></button>', a += '<ul id="f-link-list-' + this._id + '">';
            for (var c = 0; c < this.options.linkList.length; c++) {
                var d = this.options.linkList[c];
                a += '<li class="f-choose-link" data-nofollow="' + d.nofollow + '" data-blank="' + d.blank + '" data-body="' + d.body + '" data-title="' + d.title + '" data-href="' + d.href + '">' + d.body + "</li>"
            }
            a += "</ul>"
        }
        if (a += "</div>", Object.keys(this.options.linkClasses).length) {
            a += '<div class="f-popup-line"><input type="text" placeholder="Choose link type" class="f-lu f-bi" id="f-luc-' + this._id + '" disabled="disabled"/>', a += '<button class="f-browse-links" id="f-links-class-' + this._id + '"><i class="fa fa-chevron-down"></i></button>', a += '<ul id="f-link-class-list-' + this._id + '">';
            for (var e in this.options.linkClasses) {
                var f = this.options.linkClasses[e];
                a += '<li class="f-choose-link-class" data-class="' + e + '">' + f + "</li>"
            }
            a += "</ul>", a += "</div>"
        }
        return a += '<div class="f-popup-line"><input type="checkbox" id="f-checkbox-' + this._id + '"> <label data-text="true" for="f-checkbox-' + this._id + '">Open in new tab</label><button data-text="true" type="button" class="f-ok" id="f-ok-' + this._id + '">OK</button>', this.options.unlinkButton && (a += '<button type="button" data-text="true" class="f-ok f-unlink" id="f-unlink-' + this._id + '">UNLINK</button>'), a += "</div></div>"
    }, a.Editable.prototype.buildCreateLink = function() {
        this.$link_wrapper = a(this.createLinkHTML()), this.$popup_editor.append(this.$link_wrapper);
        var b = this;
        this.addListener("hidePopups", this.hideLinkWrapper), this.$link_wrapper.on("mouseup", a.proxy(function(a) {
            this.isResizing() || (a.stopPropagation(), this.$link_wrapper.trigger("hideLinkList"))
        }, this)), this.options.linkText && this.$link_wrapper.on("mouseup keydown", "input#f-lt-" + this._id, a.proxy(function(a) {
            var b = a.which;
            b && 27 === b || a.stopPropagation(), this.$link_wrapper.trigger("hideLinkList"), this.$link_wrapper.trigger("hideLinkClassList")
        }, this)), this.$link_wrapper.on("mouseup keydown", "input#f-lu-" + this._id, a.proxy(function(a) {
            var b = a.which;
            b && 27 === b || a.stopPropagation(), this.$link_wrapper.trigger("hideLinkList"), this.$link_wrapper.trigger("hideLinkClassList")
        }, this)), this.$link_wrapper.on("click keydown", "input#f-checkbox-" + this._id, function(a) {
            var b = a.which;
            b && 27 === b || a.stopPropagation()
        }), this.$link_wrapper.on("touchend", "button#f-ok-" + this._id, function(a) {
            a.stopPropagation()
        }).on("click", "button#f-ok-" + this._id, a.proxy(function() {
            var a, b = this.$link_wrapper.find("input#f-lt-" + this._id),
                c = this.$link_wrapper.find("input#f-lu-" + this._id),
                d = this.$link_wrapper.find("input#f-luc-" + this._id),
                e = this.$link_wrapper.find("input#f-checkbox-" + this._id);
            a = b ? b.val() : "";
            var f = c.val();
            this.isLink && "" === f && (f = "#");
            var g = "";
            d && (g = d.data("class")), this.writeLink(f, a, g, e.prop("checked"))
        }, this)), this.$link_wrapper.on("click touch", "button#f-unlink-" + this._id, a.proxy(function() {
            this.link = !0;
            var a = this.$link_wrapper.find("input#f-checkbox-" + this._id);
            this.writeLink("", "", "", a.prop("checked"))
        }, this)), this.options.linkList.length && (this.$link_wrapper.on("click touch", "li.f-choose-link", function() {
            var c = b.$link_wrapper.find("button#f-browse-links-" + b._id),
                d = b.$link_wrapper.find("input#f-lt-" + b._id),
                e = b.$link_wrapper.find("input#f-lu-" + b._id),
                f = b.$link_wrapper.find("input#f-checkbox-" + b._id);
            d && d.val(a(this).data("body")), e.val(a(this).data("href")), f.prop("checked", a(this).data("blank")), c.click()
        }).on("mouseup", "li.f-choose-link", function(a) {
            a.stopPropagation()
        }), this.$link_wrapper.on("click", "button#f-browse-links-" + this._id, function(c) {
            c.stopPropagation();
            var d = b.$link_wrapper.find("ul#f-link-list-" + b._id);
            b.$link_wrapper.trigger("hideLinkClassList"), a(this).find("i").toggleClass("fa-chevron-down"), a(this).find("i").toggleClass("fa-chevron-up"), d.toggle()
        }).on("mouseup", "button#f-browse-links-" + this._id, function(a) {
            a.stopPropagation()
        }), this.$link_wrapper.bind("hideLinkList", function() {
            var a = b.$link_wrapper.find("ul#f-link-list-" + b._id),
                c = b.$link_wrapper.find("button#f-browse-links-" + b._id);
            a && a.is(":visible") && c.click()
        })), Object.keys(this.options.linkClasses).length && (this.$link_wrapper.on("mouseup keydown", "input#f-luc-" + this._id, a.proxy(function(a) {
            var b = a.which;
            b && 27 === b || a.stopPropagation(), this.$link_wrapper.trigger("hideLinkList"), this.$link_wrapper.trigger("hideLinkClassList")
        }, this)), this.$link_wrapper.on("click touch", "li.f-choose-link-class", function() {
            var c = b.$link_wrapper.find("input#f-luc-" + b._id);
            c.val(a(this).text()), c.data("class", a(this).data("class")), b.$link_wrapper.trigger("hideLinkClassList")
        }).on("mouseup", "li.f-choose-link-class", function(a) {
            a.stopPropagation()
        }), this.$link_wrapper.on("click", "button#f-links-class-" + this._id, function(c) {
            c.stopPropagation(), b.$link_wrapper.trigger("hideLinkList");
            var d = b.$link_wrapper.find("ul#f-link-class-list-" + b._id);
            a(this).find("i").toggleClass("fa-chevron-down"), a(this).find("i").toggleClass("fa-chevron-up"), d.toggle()
        }).on("mouseup", "button#f-links-class-" + this._id, function(a) {
            a.stopPropagation()
        }), this.$link_wrapper.bind("hideLinkClassList", function() {
            var a = b.$link_wrapper.find("ul#f-link-class-list-" + b._id),
                c = b.$link_wrapper.find("button#f-links-class-" + b._id);
            a && a.is(":visible") && c.click()
        })), this.$link_wrapper.on("click", "i#f-link-close-" + this._id, a.proxy(function() {
            this.$bttn_wrapper.show(), this.hideLinkWrapper(), (!this.options.inlineMode && !this.imageMode || this.isLink || 0 === this.options.buttons.length) && this.hide(), this.imageMode ? this.showImageEditor() : this.restoreSelection()
        }, this))
    }, a.Editable.prototype.getSelectionLinks = function() {
        var a, b, c, d, e = [];
        if (window.getSelection) {
            var f = window.getSelection();
            if (f.getRangeAt && f.rangeCount) {
                d = document.createRange();
                for (var g = 0; g < f.rangeCount; ++g)
                    if (a = f.getRangeAt(g), b = a.commonAncestorContainer, 1 != b.nodeType && (b = b.parentNode), "a" == b.nodeName.toLowerCase()) e.push(b);
                    else {
                        c = b.getElementsByTagName("a");
                        for (var h = 0; h < c.length; ++h) d.selectNodeContents(c[h]), d.compareBoundaryPoints(a.END_TO_START, a) < 1 && d.compareBoundaryPoints(a.START_TO_END, a) > -1 && e.push(c[h])
                    }
                d.detach()
            }
        } else if (document.selection && "Control" != document.selection.type)
            if (a = document.selection.createRange(), b = a.parentElement(), "a" == b.nodeName.toLowerCase()) e.push(b);
            else {
                c = b.getElementsByTagName("a"), d = document.body.createTextRange();
                for (var i = 0; i < c.length; ++i) d.moveToElementText(c[i]), d.compareEndPoints("StartToEnd", a) > -1 && d.compareEndPoints("EndToStart", a) < 1 && e.push(c[i])
            }
        return e
    }, a.Editable.prototype.insertLink = function() {
        this.options.inlineMode || (this.closeImageMode(), this.imageMode = !1, this.positionPopup("createLink")), this.showInsertLink(), this.saveSelection();
        var b = this.getSelectionLink() || "",
            c = this.getSelectionLinks();
        c.length > 0 ? (this.$link_wrapper.find('input[type="checkbox"]').prop("checked", "_blank" == a(c[0]).attr("target")), this.$link_wrapper.find('input[type="text"].f-lt').val(a(c[0]).text() || ""), a(c[0]).hasClass("fr-file") ? this.$link_wrapper.find('input[type="text"].f-lu').parent().addClass("fr-hidden") : this.$link_wrapper.find('input[type="text"].f-lu').parent().removeClass("fr-hidden")) : (this.$link_wrapper.find('input[type="checkbox"]').prop("checked", this.options.alwaysBlank), this.$link_wrapper.find('input[type="text"].f-lt').val(this.text()), this.$link_wrapper.find('input[type="text"].f-lu').parent().removeClass("fr-hidden")), this.$link_wrapper.find(".f-external-link").attr("href", b || "#"), this.$link_wrapper.find('input[type="text"].f-lu').val(b.replace(/\&amp;/g, "&") || "http://")
    }
}(jQuery),
function(a) {
    a.Editable.prototype.browserFixes = function() {
        this.preBlockquoteEnter(), this.domInsert()
    }, a.Editable.prototype.preBlockquoteEnter = function() {
        this.isImage || this.isLink || this.options.editInPopup || this.$element.on("keydown", a.proxy(function(b) {
            var c = b.which,
                d = ["PRE", "BLOCKQUOTE"],
                e = this.getSelectionElements()[0];
            if (13 == c && "" === this.text() && d.indexOf(e.tagName) >= 0 && 0 === a(e).parents("ul, ol").length)
                if (this.getSelectionTextInfo(e).atEnd && !b.shiftKey) {
                    b.preventDefault();
                    var f = a("<p><br></p>");
                    a(e).after(f), this.setSelection(f.get(0))
                } else(this.browser.webkit || this.browser.msie) && (b.preventDefault(), this.insertHTML(this.endsWith(a(e).html(), "<br>") || !this.getSelectionTextInfo(e).atEnd ? "<br>" : "<br><br>"))
        }, this))
    }, a.Editable.prototype.domInsert = function() {
        this.$element.on("DOMNodeInserted", a.proxy(function(b) {
            "SPAN" != b.target.tagName || a(b.target).attr("data-fr-verified") || this.no_verify || (a(b.target).before(a(b.target).contents()), a(b.target).remove())
        }, this))
    }
}(jQuery),
function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function(a, b) {
    function c(a) {
        function b() {
            d ? (c(), M(b), e = !0, d = !1) : e = !1
        }
        var c = a,
            d = !1,
            e = !1;
        this.kick = function() {
            d = !0, e || b()
        }, this.end = function(a) {
            var b = c;
            a && (e ? (c = d ? function() {
                b(), a()
            } : a, d = !0) : a())
        }
    }

    function d() {
        return !0
    }

    function e() {
        return !1
    }

    function f(a) {
        a.preventDefault()
    }

    function g(a) {
        N[a.target.tagName.toLowerCase()] || a.preventDefault()
    }

    function h(a) {
        return 1 === a.which && !a.ctrlKey && !a.altKey
    }

    function i(a, b) {
        var c, d;
        if (a.identifiedTouch) return a.identifiedTouch(b);
        for (c = -1, d = a.length; ++c < d;)
            if (a[c].identifier === b) return a[c]
    }

    function j(a, b) {
        var c = i(a.changedTouches, b.identifier);
        if (c && (c.pageX !== b.pageX || c.pageY !== b.pageY)) return c
    }

    function k(a) {
        var b;
        h(a) && (b = {
            target: a.target,
            startX: a.pageX,
            startY: a.pageY,
            timeStamp: a.timeStamp
        }, J(document, O.move, l, b), J(document, O.cancel, m, b))
    }

    function l(a) {
        var b = a.data;
        s(a, b, a, n)
    }

    function m() {
        n()
    }

    function n() {
        K(document, O.move, l), K(document, O.cancel, m)
    }

    function o(a) {
        var b, c;
        N[a.target.tagName.toLowerCase()] || (b = a.changedTouches[0], c = {
            target: b.target,
            startX: b.pageX,
            startY: b.pageY,
            timeStamp: a.timeStamp,
            identifier: b.identifier
        }, J(document, P.move + "." + b.identifier, p, c), J(document, P.cancel + "." + b.identifier, q, c))
    }

    function p(a) {
        var b = a.data,
            c = j(a, b);
        c && s(a, b, c, r)
    }

    function q(a) {
        var b = a.data,
            c = i(a.changedTouches, b.identifier);
        c && r(b.identifier)
    }

    function r(a) {
        K(document, "." + a, p), K(document, "." + a, q)
    }

    function s(a, b, c, d) {
        var e = c.pageX - b.startX,
            f = c.pageY - b.startY;
        I * I > e * e + f * f || v(a, b, c, e, f, d)
    }

    function t() {
        return this._handled = d, !1
    }

    function u(a) {
        try {
            a._handled()
        } catch (b) {
            return !1
        }
    }

    function v(a, b, c, d, e, f) {
        {
            var g, h;
            b.target
        }
        g = a.targetTouches, h = a.timeStamp - b.timeStamp, b.type = "movestart", b.distX = d, b.distY = e, b.deltaX = d, b.deltaY = e, b.pageX = c.pageX, b.pageY = c.pageY, b.velocityX = d / h, b.velocityY = e / h, b.targetTouches = g, b.finger = g ? g.length : 1, b._handled = t, b._preventTouchmoveDefault = function() {
            a.preventDefault()
        }, L(b.target, b), f(b.identifier)
    }

    function w(a) {
        var b = a.data.timer;
        a.data.touch = a, a.data.timeStamp = a.timeStamp, b.kick()
    }

    function x(a) {
        var b = a.data.event,
            c = a.data.timer;
        y(), D(b, c, function() {
            setTimeout(function() {
                K(b.target, "click", e)
            }, 0)
        })
    }

    function y() {
        K(document, O.move, w), K(document, O.end, x)
    }

    function z(a) {
        var b = a.data.event,
            c = a.data.timer,
            d = j(a, b);
        d && (a.preventDefault(), b.targetTouches = a.targetTouches, a.data.touch = d, a.data.timeStamp = a.timeStamp, c.kick())
    }

    function A(a) {
        var b = a.data.event,
            c = a.data.timer,
            d = i(a.changedTouches, b.identifier);
        d && (B(b), D(b, c))
    }

    function B(a) {
        K(document, "." + a.identifier, z), K(document, "." + a.identifier, A)
    }

    function C(a, b, c) {
        var d = c - a.timeStamp;
        a.type = "move", a.distX = b.pageX - a.startX, a.distY = b.pageY - a.startY, a.deltaX = b.pageX - a.pageX, a.deltaY = b.pageY - a.pageY, a.velocityX = .3 * a.velocityX + .7 * a.deltaX / d, a.velocityY = .3 * a.velocityY + .7 * a.deltaY / d, a.pageX = b.pageX, a.pageY = b.pageY
    }

    function D(a, b, c) {
        b.end(function() {
            return a.type = "moveend", L(a.target, a), c && c()
        })
    }

    function E() {
        return J(this, "movestart.move", u), !0
    }

    function F() {
        return K(this, "dragstart drag", f), K(this, "mousedown touchstart", g), K(this, "movestart", u), !0
    }

    function G(a) {
        "move" !== a.namespace && "moveend" !== a.namespace && (J(this, "dragstart." + a.guid + " drag." + a.guid, f, b, a.selector), J(this, "mousedown." + a.guid, g, b, a.selector))
    }

    function H(a) {
        "move" !== a.namespace && "moveend" !== a.namespace && (K(this, "dragstart." + a.guid + " drag." + a.guid), K(this, "mousedown." + a.guid))
    }
    var I = 6,
        J = a.event.add,
        K = a.event.remove,
        L = function(b, c, d) {
            a.event.trigger(c, d, b)
        },
        M = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
                return window.setTimeout(function() {
                    a()
                }, 25)
            }
        }(),
        N = {
            textarea: !0,
            input: !0,
            select: !0,
            button: !0
        },
        O = {
            move: "mousemove",
            cancel: "mouseup dragstart",
            end: "mouseup"
        },
        P = {
            move: "touchmove",
            cancel: "touchend",
            end: "touchend"
        };
    a.event.special.movestart = {
        setup: E,
        teardown: F,
        add: G,
        remove: H,
        _default: function(a) {
            function d() {
                C(f, g.touch, g.timeStamp), L(a.target, f)
            }
            var f, g;
            a._handled() && (f = {
                target: a.target,
                startX: a.startX,
                startY: a.startY,
                pageX: a.pageX,
                pageY: a.pageY,
                distX: a.distX,
                distY: a.distY,
                deltaX: a.deltaX,
                deltaY: a.deltaY,
                velocityX: a.velocityX,
                velocityY: a.velocityY,
                timeStamp: a.timeStamp,
                identifier: a.identifier,
                targetTouches: a.targetTouches,
                finger: a.finger
            }, g = {
                event: f,
                timer: new c(d),
                touch: b,
                timeStamp: b
            }, a.identifier === b ? (J(a.target, "click", e), J(document, O.move, w, g), J(document, O.end, x, g)) : (a._preventTouchmoveDefault(), J(document, P.move + "." + a.identifier, z, g), J(document, P.end + "." + a.identifier, A, g)))
        }
    }, a.event.special.move = {
        setup: function() {
            J(this, "movestart.move", a.noop)
        },
        teardown: function() {
            K(this, "movestart.move", a.noop)
        }
    }, a.event.special.moveend = {
        setup: function() {
            J(this, "movestart.moveend", a.noop)
        },
        teardown: function() {
            K(this, "movestart.moveend", a.noop)
        }
    }, J(document, "mousedown.move", k), J(document, "touchstart.move", o), "function" == typeof Array.prototype.indexOf && ! function(a) {
        for (var b = ["changedTouches", "targetTouches"], c = b.length; c--;) - 1 === a.event.props.indexOf(b[c]) && a.event.props.push(b[c])
    }(a)
}), window.WYSIWYGModernizr = function(a, b, c) {
    function d(a) {
        n.cssText = a
    }

    function e(a, b) {
        return typeof a === b
    }
    var f, g, h, i = "2.7.1",
        j = {},
        k = b.documentElement,
        l = "modernizr",
        m = b.createElement(l),
        n = m.style,
        o = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
        p = {},
        q = [],
        r = q.slice,
        s = function(a, c, d, e) {
            var f, g, h, i, j = b.createElement("div"),
                m = b.body,
                n = m || b.createElement("body");
            if (parseInt(d, 10))
                for (; d--;) h = b.createElement("div"), h.id = e ? e[d] : l + (d + 1), j.appendChild(h);
            return f = ["&#173;", '<style id="s', l, '">', a, "</style>"].join(""), j.id = l, (m ? j : n).innerHTML += f, n.appendChild(j), m || (n.style.background = "", n.style.overflow = "hidden", i = k.style.overflow, k.style.overflow = "hidden", k.appendChild(n)), g = c(j, a), m ? j.parentNode.removeChild(j) : (n.parentNode.removeChild(n), k.style.overflow = i), !!g
        },
        t = function(b) {
            var c = a.matchMedia || a.msMatchMedia;
            if (c) return c(b).matches;
            var d;
            return s("@media " + b + " { #" + l + " { position: absolute; } }", function(b) {
                d = "absolute" == (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle).position
            }), d
        },
        u = {}.hasOwnProperty;
    h = e(u, "undefined") || e(u.call, "undefined") ? function(a, b) {
        return b in a && e(a.constructor.prototype[b], "undefined")
    } : function(a, b) {
        return u.call(a, b)
    }, Function.prototype.bind || (Function.prototype.bind = function(a) {
        var b = this;
        if ("function" != typeof b) throw new TypeError;
        var c = r.call(arguments, 1),
            d = function() {
                if (this instanceof d) {
                    var e = function() {};
                    e.prototype = b.prototype;
                    var f = new e,
                        g = b.apply(f, c.concat(r.call(arguments)));
                    return Object(g) === g ? g : f
                }
                return b.apply(a, c.concat(r.call(arguments)))
            };
        return d
    }), p.touch = function() {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : s(["@media (", o.join("touch-enabled),("), l, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
            c = 9 === a.offsetTop
        }), c
    };
    for (var v in p) h(p, v) && (g = v.toLowerCase(), j[g] = p[v](), q.push((j[g] ? "" : "no-") + g));
    return j.addTest = function(a, b) {
        if ("object" == typeof a)
            for (var d in a) h(a, d) && j.addTest(d, a[d]);
        else {
            if (a = a.toLowerCase(), j[a] !== c) return j;
            b = "function" == typeof b ? b() : b, "undefined" != typeof enableClasses && enableClasses && (k.className += " " + (b ? "" : "no-") + a), j[a] = b
        }
        return j
    }, d(""), m = f = null, j._version = i, j._prefixes = o, j.mq = t, j.testStyles = s, j
}(this, this.document), ! function(a) {
    a.Editable.TAG_ORDER = ["table", "thead", "tbody", "tfoot", "tr", "th", "td", "ul", "ol", "li", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote", "p", "div", "a", "strong", "em", "strike", "u", "span", "iframe", "object", "param"], a.Editable.SEPARATE = ["th", "td", "li", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote", "p", "div"], a.Editable.END_AT_SAME_INDEX = ["table", "thead", "tbody", "tfoot", "tr", "th", "td", "a", "span", "iframe", "div", "object", "param"], a.Editable.prototype.isClosingTag = function(a) {
        return null !== a.match(/^<\/([a-zA-Z0-9]+)([^<]+)*>$/gi)
    }, a.Editable.prototype.tagName = function(a) {
        return a.replace(/^<\/?([a-zA-Z0-9]+)([^<]+)*>$/gi, "$1").toLowerCase()
    }, a.Editable.SELF_CLOSING_TAGS = ["br", "button", "input", "img", "hr", "param"], a.Editable.prototype.isSelfClosingTag = function(b) {
        var c = this.tagName(b);
        return a.Editable.SELF_CLOSING_TAGS.indexOf(c) >= 0
    }, a.Editable.prototype.tagKey = function(a) {
        return a.type + (a.attrs || []).sort().join("|")
    }, a.Editable.prototype.extendedKey = function(a) {
        return this.tagKey(a) + JSON.stringify(a.style)
    }, a.Editable.prototype.mergeStyle = function(b, c) {
        for (var d = {}, e = a.merge(Object.keys(b.style), Object.keys(c.style)), f = 0; f < e.length; f++) {
            var g = e[f];
            d[g] = null != c.style[g] ? c.style[g] : b.style[g]
        }
        return d
    }, a.Editable.prototype.mapDOM = function(b) {
        for (var c, d, e, f, g = 0, h = 0, i = [], j = "", k = [], l = {}, m = {}, n = 0; n < b.length; n++)
            if (c = b.charAt(n), "<" == c) {
                var o = b.indexOf(">", n + 1);
                if (-1 !== o) {
                    if (h++, d = b.substring(n, o + 1), f = this.tagName(d), "b" == f && (f = "strong"), "i" == f && (f = "em"), this.isSelfClosingTag(d)) {
                        m[g] || (m[g] = []), m[g].push({
                            i: h,
                            content: d
                        }), n = o;
                        continue
                    }
                    var p = this.isClosingTag(d),
                        q = null,
                        r = d.replace(/^<[\S\s]* style=("[^"]+"|'[^']+')[\S\s]*>$/gi, "$1"),
                        s = {};
                    if (r != d && (r = r.substring(1, r.length - 1), matches = r.match(/([^:]*):([^:;]*;|$)/gi)))
                        for (var t = 0; t < matches.length; t++) {
                            var u = matches[t].split(":"),
                                v = u.slice(1).join(":").trim();
                            ";" == v[v.length - 1] && (v = v.substr(0, v.length - 1)), s[u[0]] = v
                        }
                    if (q = d.match(/([\w\-]*)=("[^<>"]*"|'[^<>']*'|\w+)/gi))
                        for (var w = 0; w < q.length; w++) 0 === q[w].indexOf("style=") && q.splice(w, 1);
                    if (p) {
                        var x = l[f].pop();
                        g == i[x].start && a.Editable.END_AT_SAME_INDEX.indexOf(f) >= 0 && (m[g] || (m[g] = []), m[g].push({
                            i: i[x].i,
                            content: i[x].original
                        }), m[g].push({
                            i: h,
                            content: d
                        }))
                    } else i.push({
                        type: f,
                        attrs: q,
                        style: s,
                        start: g,
                        i: h,
                        original: d
                    }), l[f] || (l[f] = []), l[f].push(i.length - 1);
                    n = o
                }
            } else {
                j += c, k[g] = {};
                for (f in l) {
                    e = l[f];
                    for (var y = 0; y < e.length; y++) {
                        d = i[e[y]];
                        var z = this.tagKey(d);
                        k[g][z] ? k[g][z].style = this.mergeStyle(k[g][z], d) : k[g][z] = a.extend({}, d)
                    }
                }
                g++
            }
        var A = [];
        for (n = 0; n < k.length; n++) {
            A[n] = {};
            for (var B in k[n]) A[n][this.extendedKey(k[n][B])] = k[n][B]
        }
        return {
            text: j,
            format: A,
            simple_tags: m
        }
    }, a.Editable.prototype.froalaDOM = function(b) {
        for (var c, d = [], e = {}, f = 0; f < b.length; f++) {
            var g = b[f];
            for (c in e) g[c] || (e[c].end = f, d.push(a.extend({}, e[c])), delete e[c]);
            for (var h in g) e[h] || (g[h].start = f, e[h] = g[h])
        }
        for (c in e) e[c].end = b.length, d.push(e[c]);
        return d
    }, a.Editable.prototype.sortNodes = function(b, c) {
        return a.Editable.TAG_ORDER.indexOf(b.type) - a.Editable.TAG_ORDER.indexOf(c.type)
    }, a.Editable.prototype.sortSimpleTags = function(a, b) {
        return a.i - b.i
    }, a.Editable.prototype.openTag = function(a) {
        var b = "<" + a.type;
        if (a.attrs) {
            a.attrs.sort();
            for (var c = 0; c < a.attrs.length; c++) b += " " + a.attrs[c]
        }
        var d = "";
        for (var e in a.style) null != a.style[e] && (d += e.replace("_", "-") + ": " + a.style[e] + "; ");
        return "" !== d && (b += ' style="' + d.trim() + '"'), b += ">"
    }, a.Editable.prototype.cleanOutput = function(b) {
        var c, d, e, f, g = this.mapDOM(b),
            h = this.froalaDOM(g.format),
            i = g.simple_tags,
            j = g.text,
            k = {};
        for (d = 0; d < h.length; d++) c = h[d], k[c.start] || (k[c.start] = []), k[c.start].push(c);
        var l = {};
        for (b = "", d = 0; d <= j.length; d++) {
            var m = [];
            if (i[d])
                for (i[d] = i[d].sort(this.sortSimpleTags), f = 0; f < i[d].length; f++) b += i[d][f].content;
            if (l[d]) {
                for (var n in l)
                    if (n > d)
                        for (e = 0; e < l[n].length; e++) {
                            var o = l[n][e];
                            o.start >= l[d][l[d].length - 1].start && a.Editable.TAG_ORDER.indexOf(o.type) > a.Editable.TAG_ORDER.indexOf(l[d][l[d].length - 1].type) && a.Editable.SEPARATE.indexOf(o.type) < 0 && (b += "</" + o.type + ">", m.push(o), l[n].splice(e, 1))
                        }
                    for (e = 0; e < l[d].length; e++) b += "</" + l[d][e].type + ">"
            }
            for (k[d] || (k[d] = []); m.length > 0;) {
                var p = m.pop();
                p.start = d, k[d].push(p)
            }
            if (k[d])
                for (k[d] = k[d].sort(this.sortNodes), e = 0; e < k[d].length; e++) c = k[d][e], l[c.end] || (l[c.end] = []), l[c.end].push(c), b += this.openTag(c);
            d != j.length && (b += j[d])
        }
        return b
    }, a.Editable.prototype.cleanify = function(b) {
        var c, d = "p, h1, h2, h3, h4, h5, h6, div, td, th, pre, li, blockquote";
        if (this.isHTML) return !1;
        void 0 === b && (b = !0), this.no_verify = !0, this.saveSelectionByMarkers(), c = b ? this.getSelectionElements() : this.$element.find(d);
        var e, f;
        if (c[0] != this.$element.get(0))
            for (var g = 0; g < c.length; g++) {
                var h = a(c[g]);
                e = h.html(), f = this.cleanOutput(e), f !== e && h.html(f)
            } else 0 === this.$element.find(d).length && (e = this.$element.html(), f = this.cleanOutput(e), f !== e && this.$element.html(f));
        this.restoreSelectionByMarkers(), this.$element.is(":focus") && this.focus(), this.$element.find("span").attr("data-fr-verified", !0), this.no_verify = !1
    }
}(jQuery);