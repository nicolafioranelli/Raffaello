
/**
 * ===================================================================
 *
 *  Impromptu - SaaS Template v1.0.0 | Javascript Plugins
 *  Author URI: http://themeforest.net/user/citruslabs
 *    Author: Citrus Labs
 *  Website URI: www.citruslabsthemes.com
 *
 * ===================================================================
 */

/**
 * The Final Countdown for jQuery v2.1.0
 * http://hilios.github.io/jQuery.countdown/
 * Copyright (c) 2015 Edson Hilios
 * ===================================================================
 */
!function (t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (t) {
    "use strict";
    function e(t) {
        if (t instanceof Date)return t;
        if (String(t).match(o))return String(t).match(/^[0-9]*$/) && (t = Number(t)), String(t).match(/\-/) && (t = String(t).replace(/\-/g, "/")), new Date(t);
        throw new Error("Couldn't cast `" + t + "` to a date object.")
    }

    function s(t) {
        var e = t.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        return new RegExp(e)
    }

    function n(t) {
        return function (e) {
            var n = e.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
            if (n)for (var a = 0, o = n.length; o > a; ++a) {
                var r = n[a].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/), l = s(r[0]), c = r[1] || "", u = r[3] || "", f = null;
                r = r[2], h.hasOwnProperty(r) && (f = h[r], f = Number(t[f])), null !== f && ("!" === c && (f = i(u, f)), "" === c && 10 > f && (f = "0" + f.toString()), e = e.replace(l, f.toString()))
            }
            return e = e.replace(/%%/, "%")
        }
    }

    function i(t, e) {
        var s = "s", n = "";
        return t && (t = t.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === t.length ? s = t[0] : (n = t[0], s = t[1])), 1 === Math.abs(e) ? n : s
    }

    var a = [], o = [], r = {precision: 100, elapse: !1};
    o.push(/^[0-9]*$/.source), o.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), o.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), o = new RegExp(o.join("|"));
    var h = {
        Y: "years",
        m: "months",
        n: "daysToMonth",
        w: "weeks",
        d: "daysToWeek",
        D: "totalDays",
        H: "hours",
        M: "minutes",
        S: "seconds"
    }, l = function (e, s, n) {
        this.el = e, this.$el = t(e), this.interval = null, this.offset = {}, this.options = t.extend({}, r), this.instanceNumber = a.length, a.push(this), this.$el.data("countdown-instance", this.instanceNumber), n && ("function" == typeof n ? (this.$el.on("update.countdown", n), this.$el.on("stoped.countdown", n), this.$el.on("finish.countdown", n)) : this.options = t.extend({}, r, n)), this.setFinalDate(s), this.start()
    };
    t.extend(l.prototype, {
        start: function () {
            null !== this.interval && clearInterval(this.interval);
            var t = this;
            this.update(), this.interval = setInterval(function () {
                t.update.call(t)
            }, this.options.precision)
        }, stop: function () {
            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
        }, toggle: function () {
            this.interval ? this.stop() : this.start()
        }, pause: function () {
            this.stop()
        }, resume: function () {
            this.start()
        }, remove: function () {
            this.stop.call(this), a[this.instanceNumber] = null, delete this.$el.data().countdownInstance
        }, setFinalDate: function (t) {
            this.finalDate = e(t)
        }, update: function () {
            if (0 === this.$el.closest("html").length)return void this.remove();
            var e, s = void 0 !== t._data(this.el, "events"), n = new Date;
            e = this.finalDate.getTime() - n.getTime(), e = Math.ceil(e / 1e3), e = !this.options.elapse && 0 > e ? 0 : Math.abs(e), this.totalSecsLeft !== e && s && (this.totalSecsLeft = e, this.elapsed = n >= this.finalDate, this.offset = {
                seconds: this.totalSecsLeft % 60,
                minutes: Math.floor(this.totalSecsLeft / 60) % 60,
                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
                daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
                years: Math.abs(this.finalDate.getFullYear() - n.getFullYear())
            }, this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish")))
        }, dispatchEvent: function (e) {
            var s = t.Event(e + ".countdown");
            s.finalDate = this.finalDate, s.elapsed = this.elapsed, s.offset = t.extend({}, this.offset), s.strftime = n(this.offset), this.$el.trigger(s)
        }
    }), t.fn.countdown = function () {
        var e = Array.prototype.slice.call(arguments, 0);
        return this.each(function () {
            var s = t(this).data("countdown-instance");
            if (void 0 !== s) {
                var n = a[s], i = e[0];
                l.prototype.hasOwnProperty(i) ? n[i].apply(n, e.slice(1)) : null === String(i).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (n.setFinalDate.call(n, i), n.start()) : t.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, i))
            } else new l(this, e[0], e[1])
        })
    }
});

/**
 * jquery.counterup.js 1.0
 * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
 * Released under the GPL v2 License
 * ===================================================================
 */
!function (t) {
    "use strict";
    t.fn.counterUp = function (e) {
        var n = t.extend({time: 400, delay: 10}, e);
        return this.each(function () {
            var e = t(this), u = n, a = function () {
                var t = [], n = u.time / u.delay, a = e.text(), r = /[0-9]+,[0-9]+/.test(a);
                a = a.replace(/,/g, "");
                for (var o = (/^[0-9]+$/.test(a), /^[0-9]+\.[0-9]+$/.test(a)), c = o ? (a.split(".")[1] || []).length : 0, i = n; i >= 1; i--) {
                    var s = parseInt(a / n * i);
                    if (o && (s = parseFloat(a / n * i).toFixed(c)), r)for (; /(\d+)(\d{3})/.test(s.toString());)s = s.toString().replace(/(\d+)(\d{3})/, "$1,$2");
                    t.unshift(s)
                }
                e.data("counterup-nums", t), e.text("0");
                var d = function () {
                    e.text(e.data("counterup-nums").shift()), e.data("counterup-nums").length ? setTimeout(e.data("counterup-func"), u.delay) : (delete e.data("counterup-nums"), e.data("counterup-nums", null), e.data("counterup-func", null))
                };
                e.data("counterup-func", d), setTimeout(e.data("counterup-func"), u.delay)
            };
            e.waypoint(a, {offset: "100%", triggerOnce: !0})
        })
    }
}(jQuery);
/**
 * jQuery Validation Plugin - v1.14.0 - 6/30/2015
 * http://jqueryvalidation.org/
 * Copyright (c) 2015 Jörn Zaefferer; Licensed MIT
 * ===================================================================
 */
!function (t) {
    "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
}(function (t) {
    t.extend(t.fn, {
        validate: function (e) {
            if (!this.length)return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var i = t.data(this[0], "validator");
            return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function (e) {
                i.settings.submitHandler && (i.submitButton = e.target), t(this).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(this).attr("formnovalidate") && (i.cancelSubmit = !0)
            }), this.on("submit.validate", function (e) {
                function s() {
                    var s, r;
                    return i.settings.submitHandler ? (i.submitButton && (s = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), r = i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && s.remove(), void 0 !== r ? r : !1) : !0
                }

                return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, s()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : s() : (i.focusInvalid(), !1)
            })), i)
        }, valid: function () {
            var e, i, s;
            return t(this[0]).is("form") ? e = this.validate().form() : (s = [], e = !0, i = t(this[0].form).validate(), this.each(function () {
                e = i.element(this) && e, s = s.concat(i.errorList)
            }), i.errorList = s), e
        }, rules: function (e, i) {
            var s, r, n, a, o, l, h = this[0];
            if (e)switch (s = t.data(h.form, "validator").settings, r = s.rules, n = t.validator.staticRules(h), e) {
                case"add":
                    t.extend(n, t.validator.normalizeRule(i)), delete n.messages, r[h.name] = n, i.messages && (s.messages[h.name] = t.extend(s.messages[h.name], i.messages));
                    break;
                case"remove":
                    return i ? (l = {}, t.each(i.split(/\s/), function (e, i) {
                        l[i] = n[i], delete n[i], "required" === i && t(h).removeAttr("aria-required")
                    }), l) : (delete r[h.name], n)
            }
            return a = t.validator.normalizeRules(t.extend({}, t.validator.classRules(h), t.validator.attributeRules(h), t.validator.dataRules(h), t.validator.staticRules(h)), h), a.required && (o = a.required, delete a.required, a = t.extend({required: o}, a), t(h).attr("aria-required", "true")), a.remote && (o = a.remote, delete a.remote, a = t.extend(a, {remote: o})), a
        }
    }), t.extend(t.expr[":"], {
        blank: function (e) {
            return !t.trim("" + t(e).val())
        }, filled: function (e) {
            return !!t.trim("" + t(e).val())
        }, unchecked: function (e) {
            return !t(e).prop("checked")
        }
    }), t.validator = function (e, i) {
        this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
    }, t.validator.format = function (e, i) {
        return 1 === arguments.length ? function () {
            var i = t.makeArray(arguments);
            return i.unshift(e), t.validator.format.apply(this, i)
        } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function (t, i) {
            e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function () {
                return i
            })
        }), e)
    }, t.extend(t.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: t([]),
            errorLabelContainer: t([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function (t) {
                this.lastActive = t, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(t)))
            },
            onfocusout: function (t) {
                this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
            },
            onkeyup: function (e, i) {
                var s = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
                9 === i.which && "" === this.elementValue(e) || -1 !== t.inArray(i.keyCode, s) || (e.name in this.submitted || e === this.lastElement) && this.element(e)
            },
            onclick: function (t) {
                t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
            },
            highlight: function (e, i, s) {
                "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(s) : t(e).addClass(i).removeClass(s)
            },
            unhighlight: function (e, i, s) {
                "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(s) : t(e).removeClass(i).addClass(s)
            }
        },
        setDefaults: function (e) {
            t.extend(t.validator.defaults, e)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: t.validator.format("Please enter no more than {0} characters."),
            minlength: t.validator.format("Please enter at least {0} characters."),
            rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
            range: t.validator.format("Please enter a value between {0} and {1}."),
            max: t.validator.format("Please enter a value less than or equal to {0}."),
            min: t.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function () {
                function e(e) {
                    var i = t.data(this.form, "validator"), s = "on" + e.type.replace(/^validate/, ""), r = i.settings;
                    r[s] && !t(this).is(r.ignore) && r[s].call(i, this, e)
                }

                this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var i, s = this.groups = {};
                t.each(this.settings.groups, function (e, i) {
                    "string" == typeof i && (i = i.split(/\s/)), t.each(i, function (t, i) {
                        s[i] = e
                    })
                }), i = this.settings.rules, t.each(i, function (e, s) {
                    i[e] = t.validator.normalizeRule(s)
                }), t(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", e).on("click.validate", "select, option, [type='radio'], [type='checkbox']", e), this.settings.invalidHandler && t(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), t(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            }, form: function () {
                return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            }, checkForm: function () {
                this.prepareForm();
                for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++)this.check(e[t]);
                return this.valid()
            }, element: function (e) {
                var i = this.clean(e), s = this.validationTargetFor(i), r = !0;
                return this.lastElement = s, void 0 === s ? delete this.invalid[i.name] : (this.prepareElement(s), this.currentElements = t(s), r = this.check(s) !== !1, r ? delete this.invalid[s.name] : this.invalid[s.name] = !0), t(e).attr("aria-invalid", !r), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), r
            }, showErrors: function (e) {
                if (e) {
                    t.extend(this.errorMap, e), this.errorList = [];
                    for (var i in e)this.errorList.push({message: e[i], element: this.findByName(i)[0]});
                    this.successList = t.grep(this.successList, function (t) {
                        return !(t.name in e)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            }, resetForm: function () {
                t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors();
                var e, i = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                if (this.settings.unhighlight)for (e = 0; i[e]; e++)this.settings.unhighlight.call(this, i[e], this.settings.errorClass, ""); else i.removeClass(this.settings.errorClass)
            }, numberOfInvalids: function () {
                return this.objectLength(this.invalid)
            }, objectLength: function (t) {
                var e, i = 0;
                for (e in t)i++;
                return i
            }, hideErrors: function () {
                this.hideThese(this.toHide)
            }, hideThese: function (t) {
                t.not(this.containers).text(""), this.addWrapper(t).hide()
            }, valid: function () {
                return 0 === this.size()
            }, size: function () {
                return this.errorList.length
            }, focusInvalid: function () {
                if (this.settings.focusInvalid)try {
                    t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                } catch (e) {
                }
            }, findLastActive: function () {
                var e = this.lastActive;
                return e && 1 === t.grep(this.errorList, function (t) {
                        return t.element.name === e.name
                    }).length && e
            }, elements: function () {
                var e = this, i = {};
                return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                    return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
                })
            }, clean: function (e) {
                return t(e)[0]
            }, errors: function () {
                var e = this.settings.errorClass.split(" ").join(".");
                return t(this.settings.errorElement + "." + e, this.errorContext)
            }, reset: function () {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
            }, prepareForm: function () {
                this.reset(), this.toHide = this.errors().add(this.containers)
            }, prepareElement: function (t) {
                this.reset(), this.toHide = this.errorsFor(t)
            }, elementValue: function (e) {
                var i, s = t(e), r = e.type;
                return "radio" === r || "checkbox" === r ? this.findByName(e.name).filter(":checked").val() : "number" === r && "undefined" != typeof e.validity ? e.validity.badInput ? !1 : s.val() : (i = s.val(), "string" == typeof i ? i.replace(/\r/g, "") : i)
            }, check: function (e) {
                e = this.validationTargetFor(this.clean(e));
                var i, s, r, n = t(e).rules(), a = t.map(n, function (t, e) {
                    return e
                }).length, o = !1, l = this.elementValue(e);
                for (s in n) {
                    r = {method: s, parameters: n[s]};
                    try {
                        if (i = t.validator.methods[s].call(this, l, e, r.parameters), "dependency-mismatch" === i && 1 === a) {
                            o = !0;
                            continue
                        }
                        if (o = !1, "pending" === i)return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                        if (!i)return this.formatAndAdd(e, r), !1
                    } catch (h) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + r.method + "' method.", h), h instanceof TypeError && (h.message += ".  Exception occurred when checking element " + e.id + ", check the '" + r.method + "' method."), h
                    }
                }
                return o ? void 0 : (this.objectLength(n) && this.successList.push(e), !0)
            }, customDataMessage: function (e, i) {
                return t(e).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || t(e).data("msg")
            }, customMessage: function (t, e) {
                var i = this.settings.messages[t];
                return i && (i.constructor === String ? i : i[e])
            }, findDefined: function () {
                for (var t = 0; t < arguments.length; t++)if (void 0 !== arguments[t])return arguments[t];
                return void 0
            }, defaultMessage: function (e, i) {
                return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
            }, formatAndAdd: function (e, i) {
                var s = this.defaultMessage(e, i.method), r = /\$?\{(\d+)\}/g;
                "function" == typeof s ? s = s.call(this, i.parameters, e) : r.test(s) && (s = t.validator.format(s.replace(r, "{$1}"), i.parameters)), this.errorList.push({
                    message: s,
                    element: e,
                    method: i.method
                }), this.errorMap[e.name] = s, this.submitted[e.name] = s
            }, addWrapper: function (t) {
                return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
            }, defaultShowErrors: function () {
                var t, e, i;
                for (t = 0; this.errorList[t]; t++)i = this.errorList[t], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)for (t = 0; this.successList[t]; t++)this.showLabel(this.successList[t]);
                if (this.settings.unhighlight)for (t = 0, e = this.validElements(); e[t]; t++)this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            }, validElements: function () {
                return this.currentElements.not(this.invalidElements())
            }, invalidElements: function () {
                return t(this.errorList).map(function () {
                    return this.element
                })
            }, showLabel: function (e, i) {
                var s, r, n, a = this.errorsFor(e), o = this.idOrName(e), l = t(e).attr("aria-describedby");
                a.length ? (a.removeClass(this.settings.validClass).addClass(this.settings.errorClass), a.html(i)) : (a = t("<" + this.settings.errorElement + ">").attr("id", o + "-error").addClass(this.settings.errorClass).html(i || ""), s = a, this.settings.wrapper && (s = a.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(s) : this.settings.errorPlacement ? this.settings.errorPlacement(s, t(e)) : s.insertAfter(e), a.is("label") ? a.attr("for", o) : 0 === a.parents("label[for='" + o + "']").length && (n = a.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1"), l ? l.match(new RegExp("\\b" + n + "\\b")) || (l += " " + n) : l = n, t(e).attr("aria-describedby", l), r = this.groups[e.name], r && t.each(this.groups, function (e, i) {
                    i === r && t("[name='" + e + "']", this.currentForm).attr("aria-describedby", a.attr("id"))
                }))), !i && this.settings.success && (a.text(""), "string" == typeof this.settings.success ? a.addClass(this.settings.success) : this.settings.success(a, e)), this.toShow = this.toShow.add(a)
            }, errorsFor: function (e) {
                var i = this.idOrName(e), s = t(e).attr("aria-describedby"), r = "label[for='" + i + "'], label[for='" + i + "'] *";
                return s && (r = r + ", #" + s.replace(/\s+/g, ", #")), this.errors().filter(r)
            }, idOrName: function (t) {
                return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
            }, validationTargetFor: function (e) {
                return this.checkable(e) && (e = this.findByName(e.name)), t(e).not(this.settings.ignore)[0]
            }, checkable: function (t) {
                return /radio|checkbox/i.test(t.type)
            }, findByName: function (e) {
                return t(this.currentForm).find("[name='" + e + "']")
            }, getLength: function (e, i) {
                switch (i.nodeName.toLowerCase()) {
                    case"select":
                        return t("option:selected", i).length;
                    case"input":
                        if (this.checkable(i))return this.findByName(i.name).filter(":checked").length
                }
                return e.length
            }, depend: function (t, e) {
                return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
            }, dependTypes: {
                "boolean": function (t) {
                    return t
                }, string: function (e, i) {
                    return !!t(e, i.form).length
                }, "function": function (t, e) {
                    return t(e)
                }
            }, optional: function (e) {
                var i = this.elementValue(e);
                return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
            }, startRequest: function (t) {
                this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
            }, stopRequest: function (e, i) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
            }, previousValue: function (e) {
                return t.data(e, "previousValue") || t.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, "remote")
                    })
            }, destroy: function () {
                this.resetForm(), t(this.currentForm).off(".validate").removeData("validator")
            }
        },
        classRuleSettings: {
            required: {required: !0},
            email: {email: !0},
            url: {url: !0},
            date: {date: !0},
            dateISO: {dateISO: !0},
            number: {number: !0},
            digits: {digits: !0},
            creditcard: {creditcard: !0}
        },
        addClassRules: function (e, i) {
            e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
        },
        classRules: function (e) {
            var i = {}, s = t(e).attr("class");
            return s && t.each(s.split(" "), function () {
                this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
            }), i
        },
        normalizeAttributeRule: function (t, e, i, s) {
            /min|max/.test(i) && (null === e || /number|range|text/.test(e)) && (s = Number(s), isNaN(s) && (s = void 0)), s || 0 === s ? t[i] = s : e === i && "range" !== e && (t[i] = !0)
        },
        attributeRules: function (e) {
            var i, s, r = {}, n = t(e), a = e.getAttribute("type");
            for (i in t.validator.methods)"required" === i ? (s = e.getAttribute(i), "" === s && (s = !0), s = !!s) : s = n.attr(i), this.normalizeAttributeRule(r, a, i, s);
            return r.maxlength && /-1|2147483647|524288/.test(r.maxlength) && delete r.maxlength, r
        },
        dataRules: function (e) {
            var i, s, r = {}, n = t(e), a = e.getAttribute("type");
            for (i in t.validator.methods)s = n.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), this.normalizeAttributeRule(r, a, i, s);
            return r
        },
        staticRules: function (e) {
            var i = {}, s = t.data(e.form, "validator");
            return s.settings.rules && (i = t.validator.normalizeRule(s.settings.rules[e.name]) || {}), i
        },
        normalizeRules: function (e, i) {
            return t.each(e, function (s, r) {
                if (r === !1)return void delete e[s];
                if (r.param || r.depends) {
                    var n = !0;
                    switch (typeof r.depends) {
                        case"string":
                            n = !!t(r.depends, i.form).length;
                            break;
                        case"function":
                            n = r.depends.call(i, i)
                    }
                    n ? e[s] = void 0 !== r.param ? r.param : !0 : delete e[s]
                }
            }), t.each(e, function (s, r) {
                e[s] = t.isFunction(r) ? r(i) : r
            }), t.each(["minlength", "maxlength"], function () {
                e[this] && (e[this] = Number(e[this]))
            }), t.each(["rangelength", "range"], function () {
                var i;
                e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].replace(/[\[\]]/g, "").split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
            }), t.validator.autoCreateRanges && (null != e.min && null != e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), null != e.minlength && null != e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
        },
        normalizeRule: function (e) {
            if ("string" == typeof e) {
                var i = {};
                t.each(e.split(/\s/), function () {
                    i[this] = !0
                }), e = i
            }
            return e
        },
        addMethod: function (e, i, s) {
            t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== s ? s : t.validator.messages[e], i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
        },
        methods: {
            required: function (e, i, s) {
                if (!this.depend(s, i))return "dependency-mismatch";
                if ("select" === i.nodeName.toLowerCase()) {
                    var r = t(i).val();
                    return r && r.length > 0
                }
                return this.checkable(i) ? this.getLength(e, i) > 0 : e.length > 0
            }, email: function (t, e) {
                return this.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)
            }, url: function (t, e) {
                return this.optional(e) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(t)
            }, date: function (t, e) {
                return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
            }, dateISO: function (t, e) {
                return this.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)
            }, number: function (t, e) {
                return this.optional(e) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
            }, digits: function (t, e) {
                return this.optional(e) || /^\d+$/.test(t)
            }, creditcard: function (t, e) {
                if (this.optional(e))return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(t))return !1;
                var i, s, r = 0, n = 0, a = !1;
                if (t = t.replace(/\D/g, ""), t.length < 13 || t.length > 19)return !1;
                for (i = t.length - 1; i >= 0; i--)s = t.charAt(i), n = parseInt(s, 10), a && (n *= 2) > 9 && (n -= 9), r += n, a = !a;
                return r % 10 === 0
            }, minlength: function (e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || r >= s
            }, maxlength: function (e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || s >= r
            }, rangelength: function (e, i, s) {
                var r = t.isArray(e) ? e.length : this.getLength(e, i);
                return this.optional(i) || r >= s[0] && r <= s[1]
            }, min: function (t, e, i) {
                return this.optional(e) || t >= i
            }, max: function (t, e, i) {
                return this.optional(e) || i >= t
            }, range: function (t, e, i) {
                return this.optional(e) || t >= i[0] && t <= i[1]
            }, equalTo: function (e, i, s) {
                var r = t(s);
                return this.settings.onfocusout && r.off(".validate-equalTo").on("blur.validate-equalTo", function () {
                    t(i).valid()
                }), e === r.val()
            }, remote: function (e, i, s) {
                if (this.optional(i))return "dependency-mismatch";
                var r, n, a = this.previousValue(i);
                return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), a.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = a.message, s = "string" == typeof s && {url: s} || s, a.old === e ? a.valid : (a.old = e, r = this, this.startRequest(i), n = {}, n[i.name] = e, t.ajax(t.extend(!0, {
                    mode: "abort",
                    port: "validate" + i.name,
                    dataType: "json",
                    data: n,
                    context: r.currentForm,
                    success: function (s) {
                        var n, o, l, h = s === !0 || "true" === s;
                        r.settings.messages[i.name].remote = a.originalMessage, h ? (l = r.formSubmitted, r.prepareElement(i), r.formSubmitted = l, r.successList.push(i), delete r.invalid[i.name], r.showErrors()) : (n = {}, o = s || r.defaultMessage(i, "remote"), n[i.name] = a.message = t.isFunction(o) ? o(e) : o, r.invalid[i.name] = !0, r.showErrors(n)), a.valid = h, r.stopRequest(i, h)
                    }
                }, s)), "pending")
            }
        }
    });
    var e, i = {};
    t.ajaxPrefilter ? t.ajaxPrefilter(function (t, e, s) {
        var r = t.port;
        "abort" === t.mode && (i[r] && i[r].abort(), i[r] = s)
    }) : (e = t.ajax, t.ajax = function (s) {
        var r = ("mode" in s ? s : t.ajaxSettings).mode, n = ("port" in s ? s : t.ajaxSettings).port;
        return "abort" === r ? (i[n] && i[n].abort(), i[n] = e.apply(this, arguments), i[n]) : e.apply(this, arguments)
    })
});
/**
 * Waypoints - 2.0.3
 * https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
 * Copyright © 2011-2015 Caleb Troughton
 * ===================================================================
 */
(function () {
    var t = [].indexOf || function (t) {
            for (var e = 0, n = this.length; e < n; e++) {
                if (e in this && this[e] === t)return e
            }
            return -1
        }, e = [].slice;
    (function (t, e) {
        if (typeof define === "function" && define.amd) {
            return define("waypoints", ["jquery"], function (n) {
                return e(n, t)
            })
        } else {
            return e(t.jQuery, t)
        }
    })(this, function (n, r) {
        var i, o, l, s, f, u, a, c, h, d, p, y, v, w, g, m;
        i = n(r);
        c = t.call(r, "ontouchstart") >= 0;
        s = {horizontal: {}, vertical: {}};
        f = 1;
        a = {};
        u = "waypoints-context-id";
        p = "resize.waypoints";
        y = "scroll.waypoints";
        v = 1;
        w = "waypoints-waypoint-ids";
        g = "waypoint";
        m = "waypoints";
        o = function () {
            function t(t) {
                var e = this;
                this.$element = t;
                this.element = t[0];
                this.didResize = false;
                this.didScroll = false;
                this.id = "context" + f++;
                this.oldScroll = {x: t.scrollLeft(), y: t.scrollTop()};
                this.waypoints = {horizontal: {}, vertical: {}};
                t.data(u, this.id);
                a[this.id] = this;
                t.bind(y, function () {
                    var t;
                    if (!(e.didScroll || c)) {
                        e.didScroll = true;
                        t = function () {
                            e.doScroll();
                            return e.didScroll = false
                        };
                        return r.setTimeout(t, n[m].settings.scrollThrottle)
                    }
                });
                t.bind(p, function () {
                    var t;
                    if (!e.didResize) {
                        e.didResize = true;
                        t = function () {
                            n[m]("refresh");
                            return e.didResize = false
                        };
                        return r.setTimeout(t, n[m].settings.resizeThrottle)
                    }
                })
            }

            t.prototype.doScroll = function () {
                var t, e = this;
                t = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                if (c && (!t.vertical.oldScroll || !t.vertical.newScroll)) {
                    n[m]("refresh")
                }
                n.each(t, function (t, r) {
                    var i, o, l;
                    l = [];
                    o = r.newScroll > r.oldScroll;
                    i = o ? r.forward : r.backward;
                    n.each(e.waypoints[t], function (t, e) {
                        var n, i;
                        if (r.oldScroll < (n = e.offset) && n <= r.newScroll) {
                            return l.push(e)
                        } else if (r.newScroll < (i = e.offset) && i <= r.oldScroll) {
                            return l.push(e)
                        }
                    });
                    l.sort(function (t, e) {
                        return t.offset - e.offset
                    });
                    if (!o) {
                        l.reverse()
                    }
                    return n.each(l, function (t, e) {
                        if (e.options.continuous || t === l.length - 1) {
                            return e.trigger([i])
                        }
                    })
                });
                return this.oldScroll = {x: t.horizontal.newScroll, y: t.vertical.newScroll}
            };
            t.prototype.refresh = function () {
                var t, e, r, i = this;
                r = n.isWindow(this.element);
                e = this.$element.offset();
                this.doScroll();
                t = {
                    horizontal: {
                        contextOffset: r ? 0 : e.left,
                        contextScroll: r ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: r ? 0 : e.top,
                        contextScroll: r ? 0 : this.oldScroll.y,
                        contextDimension: r ? n[m]("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return n.each(t, function (t, e) {
                    return n.each(i.waypoints[t], function (t, r) {
                        var i, o, l, s, f;
                        i = r.options.offset;
                        l = r.offset;
                        o = n.isWindow(r.element) ? 0 : r.$element.offset()[e.offsetProp];
                        if (n.isFunction(i)) {
                            i = i.apply(r.element)
                        } else if (typeof i === "string") {
                            i = parseFloat(i);
                            if (r.options.offset.indexOf("%") > -1) {
                                i = Math.ceil(e.contextDimension * i / 100)
                            }
                        }
                        r.offset = o - e.contextOffset + e.contextScroll - i;
                        if (r.options.onlyOnScroll && l != null || !r.enabled) {
                            return
                        }
                        if (l !== null && l < (s = e.oldScroll) && s <= r.offset) {
                            return r.trigger([e.backward])
                        } else if (l !== null && l > (f = e.oldScroll) && f >= r.offset) {
                            return r.trigger([e.forward])
                        } else if (l === null && e.oldScroll >= r.offset) {
                            return r.trigger([e.forward])
                        }
                    })
                })
            };
            t.prototype.checkEmpty = function () {
                if (n.isEmptyObject(this.waypoints.horizontal) && n.isEmptyObject(this.waypoints.vertical)) {
                    this.$element.unbind([p, y].join(" "));
                    return delete a[this.id]
                }
            };
            return t
        }();
        l = function () {
            function t(t, e, r) {
                var i, o;
                r = n.extend({}, n.fn[g].defaults, r);
                if (r.offset === "bottom-in-view") {
                    r.offset = function () {
                        var t;
                        t = n[m]("viewportHeight");
                        if (!n.isWindow(e.element)) {
                            t = e.$element.height()
                        }
                        return t - n(this).outerHeight()
                    }
                }
                this.$element = t;
                this.element = t[0];
                this.axis = r.horizontal ? "horizontal" : "vertical";
                this.callback = r.handler;
                this.context = e;
                this.enabled = r.enabled;
                this.id = "waypoints" + v++;
                this.offset = null;
                this.options = r;
                e.waypoints[this.axis][this.id] = this;
                s[this.axis][this.id] = this;
                i = (o = t.data(w)) != null ? o : [];
                i.push(this.id);
                t.data(w, i)
            }

            t.prototype.trigger = function (t) {
                if (!this.enabled) {
                    return
                }
                if (this.callback != null) {
                    this.callback.apply(this.element, t)
                }
                if (this.options.triggerOnce) {
                    return this.destroy()
                }
            };
            t.prototype.disable = function () {
                return this.enabled = false
            };
            t.prototype.enable = function () {
                this.context.refresh();
                return this.enabled = true
            };
            t.prototype.destroy = function () {
                delete s[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            t.getWaypointsByElement = function (t) {
                var e, r;
                r = n(t).data(w);
                if (!r) {
                    return []
                }
                e = n.extend({}, s.horizontal, s.vertical);
                return n.map(r, function (t) {
                    return e[t]
                })
            };
            return t
        }();
        d = {
            init: function (t, e) {
                var r;
                if (e == null) {
                    e = {}
                }
                if ((r = e.handler) == null) {
                    e.handler = t
                }
                this.each(function () {
                    var t, r, i, s;
                    t = n(this);
                    i = (s = e.context) != null ? s : n.fn[g].defaults.context;
                    if (!n.isWindow(i)) {
                        i = t.closest(i)
                    }
                    i = n(i);
                    r = a[i.data(u)];
                    if (!r) {
                        r = new o(i)
                    }
                    return new l(t, r, e)
                });
                n[m]("refresh");
                return this
            }, disable: function () {
                return d._invoke(this, "disable")
            }, enable: function () {
                return d._invoke(this, "enable")
            }, destroy: function () {
                return d._invoke(this, "destroy")
            }, prev: function (t, e) {
                return d._traverse.call(this, t, e, function (t, e, n) {
                    if (e > 0) {
                        return t.push(n[e - 1])
                    }
                })
            }, next: function (t, e) {
                return d._traverse.call(this, t, e, function (t, e, n) {
                    if (e < n.length - 1) {
                        return t.push(n[e + 1])
                    }
                })
            }, _traverse: function (t, e, i) {
                var o, l;
                if (t == null) {
                    t = "vertical"
                }
                if (e == null) {
                    e = r
                }
                l = h.aggregate(e);
                o = [];
                this.each(function () {
                    var e;
                    e = n.inArray(this, l[t]);
                    return i(o, e, l[t])
                });
                return this.pushStack(o)
            }, _invoke: function (t, e) {
                t.each(function () {
                    var t;
                    t = l.getWaypointsByElement(this);
                    return n.each(t, function (t, n) {
                        n[e]();
                        return true
                    })
                });
                return this
            }
        };
        n.fn[g] = function () {
            var t, r;
            r = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (d[r]) {
                return d[r].apply(this, t)
            } else if (n.isFunction(r)) {
                return d.init.apply(this, arguments)
            } else if (n.isPlainObject(r)) {
                return d.init.apply(this, [null, r])
            } else if (!r) {
                return n.error("jQuery Waypoints needs a callback function or handler option.")
            } else {
                return n.error("The " + r + " method does not exist in jQuery Waypoints.")
            }
        };
        n.fn[g].defaults = {
            context: r,
            continuous: true,
            enabled: true,
            horizontal: false,
            offset: 0,
            triggerOnce: false
        };
        h = {
            refresh: function () {
                return n.each(a, function (t, e) {
                    return e.refresh()
                })
            }, viewportHeight: function () {
                var t;
                return (t = r.innerHeight) != null ? t : i.height()
            }, aggregate: function (t) {
                var e, r, i;
                e = s;
                if (t) {
                    e = (i = a[n(t).data(u)]) != null ? i.waypoints : void 0
                }
                if (!e) {
                    return []
                }
                r = {horizontal: [], vertical: []};
                n.each(r, function (t, i) {
                    n.each(e[t], function (t, e) {
                        return i.push(e)
                    });
                    i.sort(function (t, e) {
                        return t.offset - e.offset
                    });
                    r[t] = n.map(i, function (t) {
                        return t.element
                    });
                    return r[t] = n.unique(r[t])
                });
                return r
            }, above: function (t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function (t, e) {
                    return e.offset <= t.oldScroll.y
                })
            }, below: function (t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "vertical", function (t, e) {
                    return e.offset > t.oldScroll.y
                })
            }, left: function (t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function (t, e) {
                    return e.offset <= t.oldScroll.x
                })
            }, right: function (t) {
                if (t == null) {
                    t = r
                }
                return h._filter(t, "horizontal", function (t, e) {
                    return e.offset > t.oldScroll.x
                })
            }, enable: function () {
                return h._invoke("enable")
            }, disable: function () {
                return h._invoke("disable")
            }, destroy: function () {
                return h._invoke("destroy")
            }, extendFn: function (t, e) {
                return d[t] = e
            }, _invoke: function (t) {
                var e;
                e = n.extend({}, s.vertical, s.horizontal);
                return n.each(e, function (e, n) {
                    n[t]();
                    return true
                })
            }, _filter: function (t, e, r) {
                var i, o;
                i = a[n(t).data(u)];
                if (!i) {
                    return []
                }
                o = [];
                n.each(i.waypoints[e], function (t, e) {
                    if (r(i, e)) {
                        return o.push(e)
                    }
                });
                o.sort(function (t, e) {
                    return t.offset - e.offset
                });
                return n.map(o, function (t) {
                    return t.element
                })
            }
        };
        n[m] = function () {
            var t, n;
            n = arguments[0], t = 2 <= arguments.length ? e.call(arguments, 1) : [];
            if (h[n]) {
                return h[n].apply(null, t)
            } else {
                return h.aggregate.call(null, n)
            }
        };
        n[m].settings = {resizeThrottle: 100, scrollThrottle: 30};
        return i.load(function () {
            return n[m]("refresh")
        })
    })
}).call(this);
/**
 * Morphext - v2.4.5
 * https://github.com/MrSaints/Morphext
 * Morphext is licensed under the MIT license (http://ian.mit-license.org/).
 * ===================================================================
 */
!function (t) {
    "use strict";
    function i(i, s) {
        this.element = t(i), this.settings = t.extend({}, e, s), this._defaults = e, this._init()
    }

    var s = "Morphext", e = {animation: "bounceIn", separator: ",", speed: 2e3, complete: t.noop};
    i.prototype = {
        _init: function () {
            var i = this;
            this.phrases = [], this.element.addClass("morphext"), t.each(this.element.text().split(this.settings.separator), function (s, e) {
                i.phrases.push(t.trim(e))
            }), this.index = -1, this.animate(), this.start()
        }, animate: function () {
            this.index = ++this.index % this.phrases.length, this.element[0].innerHTML = '<span class="animated ' + this.settings.animation + '">' + this.phrases[this.index] + "</span>", t.isFunction(this.settings.complete) && this.settings.complete.call(this)
        }, start: function () {
            var t = this;
            this._interval = setInterval(function () {
                t.animate()
            }, this.settings.speed)
        }, stop: function () {
            this._interval = clearInterval(this._interval)
        }
    }, t.fn[s] = function (e) {
        return this.each(function () {
            t.data(this, "plugin_" + s) || t.data(this, "plugin_" + s, new i(this, e))
        })
    }
}(jQuery);
/**
 * ScrollReveal v3.1.4
 * scrollrevealjs.org
 * github.com/jlmakes/scrollreveal.js
 * Julian Lloyd (@jlmakes)
 * ===================================================================
 */
!function (e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : e.ScrollReveal = t()
}(this, function (e, t, n) {
    return function () {
        "use strict";
        var e, t, n;
        this.ScrollReveal = function () {
            function i(n) {
                return "undefined" == typeof this || Object.getPrototypeOf(this) !== i.prototype ? new i(n) : (e = this, e.tools = new t, e.isSupported() ? (e.tools.extend(e.defaults, n || {}), o(e.defaults), e.store = {
                    elements: {},
                    containers: []
                }, e.sequences = {}, e.history = [], e.uid = 0, e.initialized = !1) : "undefined" != typeof console && null !== console, e)
            }

            function o(t) {
                var n = t.container;
                return n && "string" == typeof n ? t.container = window.document.querySelector(n) : (n && !e.tools.isNode(n) && (t.container = null), null == n && (t.container = window.document.documentElement), t.container)
            }

            function r() {
                return ++e.uid
            }

            function s(t, n) {
                t.config ? t.config = e.tools.extendClone(t.config, n) : t.config = e.tools.extendClone(e.defaults, n), "top" === t.config.origin || "bottom" === t.config.origin ? t.config.axis = "Y" : t.config.axis = "X", "top" !== t.config.origin && "left" !== t.config.origin || (t.config.distance = "-" + t.config.distance)
            }

            function a(e) {
                var t = window.getComputedStyle(e.domEl);
                e.styles || (e.styles = {
                    transition: {},
                    transform: {},
                    computed: {}
                }, e.styles.inline = e.domEl.getAttribute("style") || "", e.styles.inline += "; visibility: visible; ", e.styles.computed.opacity = t.opacity, t.transition && "all 0s ease 0s" != t.transition ? e.styles.computed.transition = t.transition + ", " : e.styles.computed.transition = ""), e.styles.transition.instant = l(e, 0), e.styles.transition.delayed = l(e, e.config.delay), e.styles.transform.initial = " -webkit-transform:", e.styles.transform.target = " -webkit-transform:", c(e), e.styles.transform.initial += "transform:", e.styles.transform.target += "transform:", c(e)
            }

            function l(e, t) {
                var n = e.config;
                return "-webkit-transition: " + e.styles.computed.transition + "-webkit-transform " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s, opacity " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s; transition: " + e.styles.computed.transition + "transform " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s, opacity " + n.duration / 1e3 + "s " + n.easing + " " + t / 1e3 + "s; "
            }

            function c(e) {
                var t = e.config, n = e.styles.transform;
                parseInt(t.distance) && (n.initial += " translate" + t.axis + "(" + t.distance + ")", n.target += " translate" + t.axis + "(0)"), t.scale && (n.initial += " scale(" + t.scale + ")", n.target += " scale(1)"), t.rotate.x && (n.initial += " rotateX(" + t.rotate.x + "deg)", n.target += " rotateX(0)"), t.rotate.y && (n.initial += " rotateY(" + t.rotate.y + "deg)", n.target += " rotateY(0)"), t.rotate.z && (n.initial += " rotateZ(" + t.rotate.z + "deg)", n.target += " rotateZ(0)"), n.initial += "; opacity: " + t.opacity + ";", n.target += "; opacity: " + e.styles.computed.opacity + ";"
            }

            function f(t) {
                var n = t.config.container;
                n && -1 == e.store.containers.indexOf(n) && e.store.containers.push(t.config.container), e.store.elements[t.id] = t
            }

            function u(t, n, i) {
                var o = {selector: t, config: n, interval: i};
                e.history.push(o)
            }

            function d() {
                if (e.isSupported()) {
                    p();
                    for (var t = 0; t < e.store.containers.length; t++)e.store.containers[t].addEventListener("scroll", y), e.store.containers[t].addEventListener("resize", y);
                    e.initialized || (window.addEventListener("scroll", y), window.addEventListener("resize", y), e.initialized = !0)
                }
                return e
            }

            function y() {
                n(p)
            }

            function m() {
                var t, n, i, o;
                e.tools.forOwn(e.sequences, function (r) {
                    o = e.sequences[r], t = !1;
                    for (var s = 0; s < o.elemIds.length; s++)i = o.elemIds[s], n = e.store.elements[i], O(n) && !t && (t = !0);
                    o.active = t
                })
            }

            function p() {
                var t, n;
                m(), e.tools.forOwn(e.store.elements, function (i) {
                    n = e.store.elements[i], t = b(n), v(n) ? (t ? n.domEl.setAttribute("style", n.styles.inline + n.styles.transform.target + n.styles.transition.delayed) : n.domEl.setAttribute("style", n.styles.inline + n.styles.transform.target + n.styles.transition.instant), w("reveal", n, t), n.revealing = !0, n.seen = !0, n.sequence && g(n, t)) : h(n) && (n.domEl.setAttribute("style", n.styles.inline + n.styles.transform.initial + n.styles.transition.instant), w("reset", n), n.revealing = !1)
                })
            }

            function g(t, n) {
                var i = 0, o = 0, r = e.sequences[t.sequence.id];
                r.blocked = !0, n && "onload" == t.config.useDelay && (o = t.config.delay), t.sequence.timer && (i = Math.abs(t.sequence.timer.started - new Date), window.clearTimeout(t.sequence.timer)), t.sequence.timer = {started: new Date}, t.sequence.timer.clock = window.setTimeout(function () {
                    r.blocked = !1, t.sequence.timer = null, y()
                }, Math.abs(r.interval) + o - i)
            }

            function w(e, t, n) {
                var i = 0, o = 0, r = "after";
                switch (e) {
                    case"reveal":
                        o = t.config.duration, n && (o += t.config.delay), r += "Reveal";
                        break;
                    case"reset":
                        o = t.config.duration, r += "Reset"
                }
                t.timer && (i = Math.abs(t.timer.started - new Date), window.clearTimeout(t.timer.clock)), t.timer = {started: new Date}, t.timer.clock = window.setTimeout(function () {
                    t.config[r](t.domEl), t.timer = null
                }, o - i)
            }

            function v(t) {
                if (t.sequence) {
                    var n = e.sequences[t.sequence.id];
                    return n.active && !n.blocked && !t.revealing && !t.disabled
                }
                return O(t) && !t.revealing && !t.disabled
            }

            function b(t) {
                var n = t.config.useDelay;
                return "always" === n || "onload" === n && !e.initialized || "once" === n && !t.seen
            }

            function h(t) {
                if (t.sequence) {
                    var n = e.sequences[t.sequence.id];
                    return !n.active && t.config.reset && t.revealing && !t.disabled
                }
                return !O(t) && t.config.reset && t.revealing && !t.disabled
            }

            function x(e) {
                return {width: e.clientWidth, height: e.clientHeight}
            }

            function q(e) {
                if (e && e !== window.document.documentElement) {
                    var t = E(e);
                    return {x: e.scrollLeft + t.left, y: e.scrollTop + t.top}
                }
                return {x: window.pageXOffset, y: window.pageYOffset}
            }

            function E(e) {
                var t = 0, n = 0, i = e.offsetHeight, o = e.offsetWidth;
                do isNaN(e.offsetTop) || (t += e.offsetTop), isNaN(e.offsetLeft) || (n += e.offsetLeft); while (e = e.offsetParent);
                return {top: t, left: n, height: i, width: o}
            }

            function O(e) {
                function t() {
                    var t = c + a * s, n = f + l * s, i = u - a * s, y = d - l * s, m = r.y + e.config.viewOffset.top, p = r.x + e.config.viewOffset.left, g = r.y - e.config.viewOffset.bottom + o.height, w = r.x - e.config.viewOffset.right + o.width;
                    return g > t && i > m && n > p && w > y
                }

                function n() {
                    return "fixed" === window.getComputedStyle(e.domEl).position
                }

                var i = E(e.domEl), o = x(e.config.container), r = q(e.config.container), s = e.config.viewFactor, a = i.height, l = i.width, c = i.top, f = i.left, u = c + a, d = f + l;
                return t() || n()
            }

            return i.prototype.defaults = {
                origin: "bottom",
                distance: "20px",
                duration: 500,
                delay: 0,
                rotate: {x: 0, y: 0, z: 0},
                opacity: 0,
                scale: .9,
                easing: "cubic-bezier(0.6, 0.2, 0.1, 1)",
                container: null,
                mobile: !0,
                reset: !1,
                useDelay: "always",
                viewFactor: .2,
                viewOffset: {top: 0, right: 0, bottom: 0, left: 0},
                afterReveal: function (e) {
                },
                afterReset: function (e) {
                }
            }, i.prototype.isSupported = function () {
                var e = document.documentElement.style;
                return "WebkitTransition" in e && "WebkitTransform" in e || "transition" in e && "transform" in e
            }, i.prototype.reveal = function (t, n, i, l) {
                var c, y, m, p, g, w;
                if (c = n && n.container ? o(n) : e.defaults.container, y = e.tools.isNode(t) ? [t] : Array.prototype.slice.call(c.querySelectorAll(t)), !y.length)return e;
                n && "number" == typeof n && (i = n, n = {}), i && "number" == typeof i && (w = r(), g = e.sequences[w] = {
                    id: w,
                    interval: i,
                    elemIds: [],
                    active: !1
                });
                for (var v = 0; v < y.length; v++)p = y[v].getAttribute("data-sr-id"), p ? m = e.store.elements[p] : (m = {
                    id: r(),
                    domEl: y[v],
                    seen: !1,
                    revealing: !1
                }, m.domEl.setAttribute("data-sr-id", m.id)), g && (m.sequence = {
                    id: g.id,
                    index: g.elemIds.length
                }, g.elemIds.push(m.id)), s(m, n || {}), a(m), f(m), e.tools.isMobile() && !m.config.mobile || !e.isSupported() ? (m.domEl.setAttribute("style", m.styles.inline), m.disabled = !0) : m.revealing || m.domEl.setAttribute("style", m.styles.inline + m.styles.transform.initial);
                return !l && e.isSupported() && (u(t, n), e.initTimeout && window.clearTimeout(e.initTimeout), e.initTimeout = window.setTimeout(d, 0)), e
            }, i.prototype.sync = function () {
                if (e.history.length && e.isSupported()) {
                    for (var t = 0; t < e.history.length; t++) {
                        var n = e.history[t];
                        e.reveal(n.selector, n.config, n.interval, !0)
                    }
                    d()
                }
                return e
            }, i
        }(), t = function () {
            function e() {
            }

            return e.prototype.isObject = function (e) {
                return null !== e && "object" == typeof e && e.constructor == Object
            }, e.prototype.isNode = function (e) {
                return "object" == typeof Node ? e instanceof Node : e && "object" == typeof e && "number" == typeof e.nodeType && "string" == typeof e.nodeName
            }, e.prototype.forOwn = function (e, t) {
                if (!this.isObject(e))throw new TypeError('Expected "object", but received "' + typeof e + '".');
                for (var n in e)e.hasOwnProperty(n) && t(n)
            }, e.prototype.extend = function (e, t) {
                return this.forOwn(t, function (n) {
                    this.isObject(t[n]) ? (e[n] && this.isObject(e[n]) || (e[n] = {}), this.extend(e[n], t[n])) : e[n] = t[n]
                }.bind(this)), e
            }, e.prototype.extendClone = function (e, t) {
                return this.extend(this.extend({}, e), t)
            }, e.prototype.isMobile = function () {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            }, e
        }(), n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
    }.call(this), this.ScrollReveal
});
/**
 * SmoothScroll for websites v1.4.0 (Balazs Galambosi)
 * Licensed under the terms of the MIT license.
 * http://www.smoothscroll.net/
 * Balazs Galambosi
 * ===================================================================
 */
!function () {
    function e() {
        z.keyboardSupport && m("keydown", a)
    }

    function t() {
        if (!A && document.body) {
            A = !0;
            var t = document.body, o = document.documentElement, n = window.innerHeight, r = t.scrollHeight;
            if (B = document.compatMode.indexOf("CSS") >= 0 ? o : t, D = t, e(), top != self)X = !0; else if (r > n && (t.offsetHeight <= n || o.offsetHeight <= n)) {
                var a = document.createElement("div");
                a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + B.scrollHeight + "px", document.body.appendChild(a);
                var i;
                T = function () {
                    i || (i = setTimeout(function () {
                        L || (a.style.height = "0", a.style.height = B.scrollHeight + "px", i = null)
                    }, 500))
                }, setTimeout(T, 10), m("resize", T);
                var l = {attributes: !0, childList: !0, characterData: !1};
                if (M = new V(T), M.observe(t, l), B.offsetHeight <= n) {
                    var c = document.createElement("div");
                    c.style.clear = "both", t.appendChild(c)
                }
            }
            z.fixedBackground || L || (t.style.backgroundAttachment = "scroll", o.style.backgroundAttachment = "scroll")
        }
    }

    function o() {
        M && M.disconnect(), h(I, r), h("mousedown", i), h("keydown", a), h("resize", T), h("load", t)
    }

    function n(e, t, o) {
        if (p(t, o), 1 != z.accelerationMax) {
            var n = Date.now(), r = n - R;
            if (r < z.accelerationDelta) {
                var a = (1 + 50 / r) / 2;
                a > 1 && (a = Math.min(a, z.accelerationMax), t *= a, o *= a)
            }
            R = Date.now()
        }
        if (q.push({x: t, y: o, lastX: 0 > t ? .99 : -.99, lastY: 0 > o ? .99 : -.99, start: Date.now()}), !P) {
            var i = e === document.body, l = function (n) {
                for (var r = Date.now(), a = 0, c = 0, u = 0; u < q.length; u++) {
                    var d = q[u], s = r - d.start, f = s >= z.animationTime, m = f ? 1 : s / z.animationTime;
                    z.pulseAlgorithm && (m = x(m));
                    var h = d.x * m - d.lastX >> 0, w = d.y * m - d.lastY >> 0;
                    a += h, c += w, d.lastX += h, d.lastY += w, f && (q.splice(u, 1), u--)
                }
                i ? window.scrollBy(a, c) : (a && (e.scrollLeft += a), c && (e.scrollTop += c)), t || o || (q = []), q.length ? _(l, e, 1e3 / z.frameRate + 1) : P = !1
            };
            _(l, e, 0), P = !0
        }
    }

    function r(e) {
        A || t();
        var o = e.target, r = u(o);
        if (!r || e.defaultPrevented || e.ctrlKey)return !0;
        if (w(D, "embed") || w(o, "embed") && /\.pdf/i.test(o.src) || w(D, "object"))return !0;
        var a = -e.wheelDeltaX || e.deltaX || 0, i = -e.wheelDeltaY || e.deltaY || 0;
        return K && (e.wheelDeltaX && b(e.wheelDeltaX, 120) && (a = -120 * (e.wheelDeltaX / Math.abs(e.wheelDeltaX))), e.wheelDeltaY && b(e.wheelDeltaY, 120) && (i = -120 * (e.wheelDeltaY / Math.abs(e.wheelDeltaY)))), a || i || (i = -e.wheelDelta || 0), 1 === e.deltaMode && (a *= 40, i *= 40), !z.touchpadSupport && v(i) ? !0 : (Math.abs(a) > 1.2 && (a *= z.stepSize / 120), Math.abs(i) > 1.2 && (i *= z.stepSize / 120), n(r, a, i), e.preventDefault(), void l())
    }

    function a(e) {
        var t = e.target, o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== N.spacebar;
        document.contains(D) || (D = document.activeElement);
        var r = /^(textarea|select|embed|object)$/i, a = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (r.test(t.nodeName) || w(t, "input") && !a.test(t.type) || w(D, "video") || y(e) || t.isContentEditable || e.defaultPrevented || o)return !0;
        if ((w(t, "button") || w(t, "input") && a.test(t.type)) && e.keyCode === N.spacebar)return !0;
        var i, c = 0, d = 0, s = u(D), f = s.clientHeight;
        switch (s == document.body && (f = window.innerHeight), e.keyCode) {
            case N.up:
                d = -z.arrowScroll;
                break;
            case N.down:
                d = z.arrowScroll;
                break;
            case N.spacebar:
                i = e.shiftKey ? 1 : -1, d = -i * f * .9;
                break;
            case N.pageup:
                d = .9 * -f;
                break;
            case N.pagedown:
                d = .9 * f;
                break;
            case N.home:
                d = -s.scrollTop;
                break;
            case N.end:
                var m = s.scrollHeight - s.scrollTop - f;
                d = m > 0 ? m + 10 : 0;
                break;
            case N.left:
                c = -z.arrowScroll;
                break;
            case N.right:
                c = z.arrowScroll;
                break;
            default:
                return !0
        }
        n(s, c, d), e.preventDefault(), l()
    }

    function i(e) {
        D = e.target
    }

    function l() {
        clearTimeout(E), E = setInterval(function () {
            F = {}
        }, 1e3)
    }

    function c(e, t) {
        for (var o = e.length; o--;)F[j(e[o])] = t;
        return t
    }

    function u(e) {
        var t = [], o = document.body, n = B.scrollHeight;
        do {
            var r = F[j(e)];
            if (r)return c(t, r);
            if (t.push(e), n === e.scrollHeight) {
                var a = s(B) && s(o), i = a || f(B);
                if (X && d(B) || !X && i)return c(t, $())
            } else if (d(e) && f(e))return c(t, e)
        } while (e = e.parentElement)
    }

    function d(e) {
        return e.clientHeight + 10 < e.scrollHeight
    }

    function s(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "hidden" !== t
    }

    function f(e) {
        var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
        return "scroll" === t || "auto" === t
    }

    function m(e, t) {
        window.addEventListener(e, t, !1)
    }

    function h(e, t) {
        window.removeEventListener(e, t, !1)
    }

    function w(e, t) {
        return (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }

    function p(e, t) {
        e = e > 0 ? 1 : -1, t = t > 0 ? 1 : -1, (Y.x !== e || Y.y !== t) && (Y.x = e, Y.y = t, q = [], R = 0)
    }

    function v(e) {
        return e ? (O.length || (O = [e, e, e]), e = Math.abs(e), O.push(e), O.shift(), clearTimeout(H), H = setTimeout(function () {
            window.localStorage && (localStorage.SS_deltaBuffer = O.join(","))
        }, 1e3), !g(120) && !g(100)) : void 0
    }

    function b(e, t) {
        return Math.floor(e / t) == e / t
    }

    function g(e) {
        return b(O[0], e) && b(O[1], e) && b(O[2], e)
    }

    function y(e) {
        var t = e.target, o = !1;
        if (-1 != document.URL.indexOf("www.youtube.com/watch"))do if (o = t.classList && t.classList.contains("html5-video-controls"))break; while (t = t.parentNode);
        return o
    }

    function S(e) {
        var t, o, n;
        return e *= z.pulseScale, 1 > e ? t = e - (1 - Math.exp(-e)) : (o = Math.exp(-1), e -= 1, n = 1 - Math.exp(-e), t = o + n * (1 - o)), t * z.pulseNormalize
    }

    function x(e) {
        return e >= 1 ? 1 : 0 >= e ? 0 : (1 == z.pulseNormalize && (z.pulseNormalize /= S(1)), S(e))
    }

    function k(e) {
        for (var t in e)C.hasOwnProperty(t) && (z[t] = e[t])
    }

    var D, M, T, E, H, C = {
        frameRate: 150,
        animationTime: 400,
        stepSize: 100,
        pulseAlgorithm: !0,
        pulseScale: 4,
        pulseNormalize: 1,
        accelerationDelta: 50,
        accelerationMax: 3,
        keyboardSupport: !0,
        arrowScroll: 50,
        touchpadSupport: !1,
        fixedBackground: !0,
        excluded: ""
    }, z = C, L = !1, X = !1, Y = {
        x: 0,
        y: 0
    }, A = !1, B = document.documentElement, O = [], K = /^Mac/.test(navigator.platform), N = {
        left: 37,
        up: 38,
        right: 39,
        down: 40,
        spacebar: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36
    }, q = [], P = !1, R = Date.now(), j = function () {
        var e = 0;
        return function (t) {
            return t.uniqueID || (t.uniqueID = e++)
        }
    }(), F = {};
    window.localStorage && localStorage.SS_deltaBuffer && (O = localStorage.SS_deltaBuffer.split(","));
    var I, _ = function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (e, t, o) {
                window.setTimeout(e, o || 1e3 / 60)
            }
    }(), V = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, $ = function () {
        var e;
        return function () {
            if (!e) {
                var t = document.createElement("div");
                t.style.cssText = "height:10000px;width:1px;", document.body.appendChild(t);
                var o = document.body.scrollTop;
                document.documentElement.scrollTop;
                window.scrollBy(0, 3), e = document.body.scrollTop != o ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(t)
            }
            return e
        }
    }(), U = window.navigator.userAgent, W = /Edge/.test(U), G = /chrome/i.test(U) && !W, J = /safari/i.test(U) && !W, Q = /mobile/i.test(U), Z = (G || J) && !Q;
    "onwheel" in document.createElement("div") ? I = "wheel" : "onmousewheel" in document.createElement("div") && (I = "mousewheel"), I && Z && (m(I, r), m("mousedown", i), m("load", t)), k.destroy = o, window.SmoothScrollOptions && k(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function () {
        return k
    }) : "object" == typeof exports ? module.exports = k : window.SmoothScroll = k
}();
/**
 * Typed.js
 * www.mattboldt.com
 * Copyright (c) 2014 Matt Boldt
 * ===================================================================
 */
!function (t) {
    "use strict";
    var s = function (s, e) {
        this.el = t(s), this.options = t.extend({}, t.fn.typed.defaults, e), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = this.isInput ? !1 : this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build()
    };
    s.prototype = {
        constructor: s, init: function () {
            var t = this;
            t.timeout = setTimeout(function () {
                for (var s = 0; s < t.strings.length; ++s)t.sequence[s] = s;
                t.shuffle && (t.sequence = t.shuffleArray(t.sequence)), t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos)
            }, t.startDelay)
        }, build: function () {
            var s = this;
            if (this.showCursor === !0 && (this.cursor = t('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                this.strings = [], this.stringsElement.hide(), console.log(this.stringsElement.children());
                var e = this.stringsElement.children();
                t.each(e, function (e, i) {
                    s.strings.push(t(i).html())
                })
            }
            this.init()
        }, typewrite: function (t, s) {
            if (this.stop !== !0) {
                var e = Math.round(70 * Math.random()) + this.typeSpeed, i = this;
                i.timeout = setTimeout(function () {
                    var e = 0, r = t.substr(s);
                    if ("^" === r.charAt(0)) {
                        var o = 1;
                        /^\^\d+/.test(r) && (r = /\d+/.exec(r)[0], o += r.length, e = parseInt(r)), t = t.substring(0, s) + t.substring(s + o)
                    }
                    if ("html" === i.contentType) {
                        var n = t.substr(s).charAt(0);
                        if ("<" === n || "&" === n) {
                            var a = "", h = "";
                            for (h = "<" === n ? ">" : ";"; t.substr(s + 1).charAt(0) !== h && (a += t.substr(s).charAt(0), s++, !(s + 1 > t.length)););
                            s++, a += h
                        }
                    }
                    i.timeout = setTimeout(function () {
                        if (s === t.length) {
                            if (i.options.onStringTyped(i.arrayPos), i.arrayPos === i.strings.length - 1 && (i.options.callback(), i.curLoop++, i.loop === !1 || i.curLoop === i.loopCount))return;
                            i.timeout = setTimeout(function () {
                                i.backspace(t, s)
                            }, i.backDelay)
                        } else {
                            0 === s && i.options.preStringTyped(i.arrayPos);
                            var e = t.substr(0, s + 1);
                            i.attr ? i.el.attr(i.attr, e) : i.isInput ? i.el.val(e) : "html" === i.contentType ? i.el.html(e) : i.el.text(e), s++, i.typewrite(t, s)
                        }
                    }, e)
                }, e)
            }
        }, backspace: function (t, s) {
            if (this.stop !== !0) {
                var e = Math.round(70 * Math.random()) + this.backSpeed, i = this;
                i.timeout = setTimeout(function () {
                    if ("html" === i.contentType && ">" === t.substr(s).charAt(0)) {
                        for (var e = ""; "<" !== t.substr(s - 1).charAt(0) && (e -= t.substr(s).charAt(0), s--, !(0 > s)););
                        s--, e += "<"
                    }
                    var r = t.substr(0, s);
                    i.attr ? i.el.attr(i.attr, r) : i.isInput ? i.el.val(r) : "html" === i.contentType ? i.el.html(r) : i.el.text(r), s > i.stopNum ? (s--, i.backspace(t, s)) : s <= i.stopNum && (i.arrayPos++, i.arrayPos === i.strings.length ? (i.arrayPos = 0, i.shuffle && (i.sequence = i.shuffleArray(i.sequence)), i.init()) : i.typewrite(i.strings[i.sequence[i.arrayPos]], s))
                }, e)
            }
        }, shuffleArray: function (t) {
            var s, e, i = t.length;
            if (i)for (; --i;)e = Math.floor(Math.random() * (i + 1)), s = t[e], t[e] = t[i], t[i] = s;
            return t
        }, reset: function () {
            var t = this;
            clearInterval(t.timeout);
            this.el.attr("id");
            this.el.empty(), "undefined" != typeof this.cursor && this.cursor.remove(), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, this.options.resetCallback()
        }
    }, t.fn.typed = function (e) {
        return this.each(function () {
            var i = t(this), r = i.data("typed"), o = "object" == typeof e && e;
            r && r.reset(), i.data("typed", r = new s(this, o)), "string" == typeof e && r[e]()
        })
    }, t.fn.typed.defaults = {
        strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
        stringsElement: null,
        typeSpeed: 0,
        startDelay: 0,
        backSpeed: 0,
        shuffle: !1,
        backDelay: 500,
        loop: !1,
        loopCount: !1,
        showCursor: !0,
        cursorChar: "|",
        attr: null,
        contentType: "html",
        callback: function () {
        },
        preStringTyped: function () {
        },
        onStringTyped: function () {
        },
        resetCallback: function () {
        }
    }
}(window.jQuery);
/**
 * jQuery OwlCarousel v1.3.3
 * http://www.owlgraphic.com/owlcarousel/
 * Copyright (c) 2013 Bartosz Wojciechowski
 * ===================================================================
 */
"function" != typeof Object.create && (Object.create = function (t) {
    function e() {
    }

    return e.prototype = t, new e
}), function (t, e, o) {
    var i = {
        init: function (e, o) {
            var i = this;
            i.$elem = t(o), i.options = t.extend({}, t.fn.owlCarousel.options, i.$elem.data(), e), i.userOptions = e, i.loadContent()
        }, loadContent: function () {
            function e(t) {
                var e, o = "";
                if ("function" == typeof i.options.jsonSuccess)i.options.jsonSuccess.apply(this, [t]); else {
                    for (e in t.owl)t.owl.hasOwnProperty(e) && (o += t.owl[e].item);
                    i.$elem.html(o)
                }
                i.logIn()
            }

            var o, i = this;
            "function" == typeof i.options.beforeInit && i.options.beforeInit.apply(this, [i.$elem]), "string" == typeof i.options.jsonPath ? (o = i.options.jsonPath, t.getJSON(o, e)) : i.logIn()
        }, logIn: function () {
            var t = this;
            t.$elem.data({
                "owl-originalStyles": t.$elem.attr("style"),
                "owl-originalClasses": t.$elem.attr("class")
            }), t.$elem.css({opacity: 0}), t.orignalItems = t.options.items, t.checkBrowser(), t.wrapperWidth = 0, t.checkVisible = null, t.setVars()
        }, setVars: function () {
            var t = this;
            return 0 === t.$elem.children().length ? !1 : (t.baseClass(), t.eventTypes(), t.$userItems = t.$elem.children(), t.itemsAmount = t.$userItems.length, t.wrapItems(), t.$owlItems = t.$elem.find(".owl-item"), t.$owlWrapper = t.$elem.find(".owl-wrapper"), t.playDirection = "next", t.prevItem = 0, t.prevArr = [0], t.currentItem = 0, t.customEvents(), void t.onStartup())
        }, onStartup: function () {
            var t = this;
            t.updateItems(), t.calculateAll(), t.buildControls(), t.updateControls(), t.response(), t.moveEvents(), t.stopOnHover(), t.owlStatus(), t.options.transitionStyle !== !1 && t.transitionTypes(t.options.transitionStyle), t.options.autoPlay === !0 && (t.options.autoPlay = 5e3), t.play(), t.$elem.find(".owl-wrapper").css("display", "block"), t.$elem.is(":visible") ? t.$elem.css("opacity", 1) : t.watchVisibility(), t.onstartup = !1, t.eachMoveUpdate(), "function" == typeof t.options.afterInit && t.options.afterInit.apply(this, [t.$elem])
        }, eachMoveUpdate: function () {
            var t = this;
            t.options.lazyLoad === !0 && t.lazyLoad(), t.options.autoHeight === !0 && t.autoHeight(), t.onVisibleItems(), "function" == typeof t.options.afterAction && t.options.afterAction.apply(this, [t.$elem])
        }, updateVars: function () {
            var t = this;
            "function" == typeof t.options.beforeUpdate && t.options.beforeUpdate.apply(this, [t.$elem]), t.watchVisibility(), t.updateItems(), t.calculateAll(), t.updatePosition(), t.updateControls(), t.eachMoveUpdate(), "function" == typeof t.options.afterUpdate && t.options.afterUpdate.apply(this, [t.$elem])
        }, reload: function () {
            var t = this;
            e.setTimeout(function () {
                t.updateVars()
            }, 0)
        }, watchVisibility: function () {
            var t = this;
            return t.$elem.is(":visible") !== !1 ? !1 : (t.$elem.css({opacity: 0}), e.clearInterval(t.autoPlayInterval), e.clearInterval(t.checkVisible), void(t.checkVisible = e.setInterval(function () {
                t.$elem.is(":visible") && (t.reload(), t.$elem.animate({opacity: 1}, 200), e.clearInterval(t.checkVisible))
            }, 500)))
        }, wrapItems: function () {
            var t = this;
            t.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), t.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), t.wrapperOuter = t.$elem.find(".owl-wrapper-outer"), t.$elem.css("display", "block")
        }, baseClass: function () {
            var t = this, e = t.$elem.hasClass(t.options.baseClass), o = t.$elem.hasClass(t.options.theme);
            e || t.$elem.addClass(t.options.baseClass), o || t.$elem.addClass(t.options.theme)
        }, updateItems: function () {
            var e, o, i = this;
            if (i.options.responsive === !1)return !1;
            if (i.options.singleItem === !0)return i.options.items = i.orignalItems = 1, i.options.itemsCustom = !1, i.options.itemsDesktop = !1, i.options.itemsDesktopSmall = !1, i.options.itemsTablet = !1, i.options.itemsTabletSmall = !1, i.options.itemsMobile = !1, !1;
            if (e = t(i.options.responsiveBaseWidth).width(), e > (i.options.itemsDesktop[0] || i.orignalItems) && (i.options.items = i.orignalItems), i.options.itemsCustom !== !1)for (i.options.itemsCustom.sort(function (t, e) {
                return t[0] - e[0]
            }), o = 0; o < i.options.itemsCustom.length; o += 1)i.options.itemsCustom[o][0] <= e && (i.options.items = i.options.itemsCustom[o][1]); else e <= i.options.itemsDesktop[0] && i.options.itemsDesktop !== !1 && (i.options.items = i.options.itemsDesktop[1]), e <= i.options.itemsDesktopSmall[0] && i.options.itemsDesktopSmall !== !1 && (i.options.items = i.options.itemsDesktopSmall[1]), e <= i.options.itemsTablet[0] && i.options.itemsTablet !== !1 && (i.options.items = i.options.itemsTablet[1]), e <= i.options.itemsTabletSmall[0] && i.options.itemsTabletSmall !== !1 && (i.options.items = i.options.itemsTabletSmall[1]), e <= i.options.itemsMobile[0] && i.options.itemsMobile !== !1 && (i.options.items = i.options.itemsMobile[1]);
            i.options.items > i.itemsAmount && i.options.itemsScaleUp === !0 && (i.options.items = i.itemsAmount)
        }, response: function () {
            var o, i, n = this;
            return n.options.responsive !== !0 ? !1 : (i = t(e).width(), n.resizer = function () {
                t(e).width() !== i && (n.options.autoPlay !== !1 && e.clearInterval(n.autoPlayInterval), e.clearTimeout(o), o = e.setTimeout(function () {
                    i = t(e).width(), n.updateVars()
                }, n.options.responsiveRefreshRate))
            }, void t(e).resize(n.resizer))
        }, updatePosition: function () {
            var t = this;
            t.jumpTo(t.currentItem), t.options.autoPlay !== !1 && t.checkAp()
        }, appendItemsSizes: function () {
            var e = this, o = 0, i = e.itemsAmount - e.options.items;
            e.$owlItems.each(function (n) {
                var s = t(this);
                s.css({width: e.itemWidth}).data("owl-item", Number(n)), (n % e.options.items === 0 || n === i) && (n > i || (o += 1)), s.data("owl-roundPages", o)
            })
        }, appendWrapperSizes: function () {
            var t = this, e = t.$owlItems.length * t.itemWidth;
            t.$owlWrapper.css({width: 2 * e, left: 0}), t.appendItemsSizes()
        }, calculateAll: function () {
            var t = this;
            t.calculateWidth(), t.appendWrapperSizes(), t.loops(), t.max()
        }, calculateWidth: function () {
            var t = this;
            t.itemWidth = Math.round(t.$elem.width() / t.options.items)
        }, max: function () {
            var t = this, e = -1 * (t.itemsAmount * t.itemWidth - t.options.items * t.itemWidth);
            return t.options.items > t.itemsAmount ? (t.maximumItem = 0, e = 0, t.maximumPixels = 0) : (t.maximumItem = t.itemsAmount - t.options.items, t.maximumPixels = e), e
        }, min: function () {
            return 0
        }, loops: function () {
            var e, o, i, n = this, s = 0, a = 0;
            for (n.positionsInArray = [0], n.pagesInArray = [], e = 0; e < n.itemsAmount; e += 1)a += n.itemWidth, n.positionsInArray.push(-a), n.options.scrollPerPage === !0 && (o = t(n.$owlItems[e]), i = o.data("owl-roundPages"), i !== s && (n.pagesInArray[s] = n.positionsInArray[e], s = i))
        }, buildControls: function () {
            var e = this;
            (e.options.navigation === !0 || e.options.pagination === !0) && (e.owlControls = t('<div class="owl-controls"/>').toggleClass("clickable", !e.browser.isTouch).appendTo(e.$elem)), e.options.pagination === !0 && e.buildPagination(), e.options.navigation === !0 && e.buildButtons()
        }, buildButtons: function () {
            var e = this, o = t('<div class="owl-buttons"/>');
            e.owlControls.append(o), e.buttonPrev = t("<div/>", {
                "class": "owl-prev",
                html: e.options.navigationText[0] || ""
            }), e.buttonNext = t("<div/>", {
                "class": "owl-next",
                html: e.options.navigationText[1] || ""
            }), o.append(e.buttonPrev).append(e.buttonNext), o.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function (t) {
                t.preventDefault()
            }), o.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function (o) {
                o.preventDefault(), t(this).hasClass("owl-next") ? e.next() : e.prev()
            })
        }, buildPagination: function () {
            var e = this;
            e.paginationWrapper = t('<div class="owl-pagination"/>'), e.owlControls.append(e.paginationWrapper), e.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (o) {
                o.preventDefault(), Number(t(this).data("owl-page")) !== e.currentItem && e.goTo(Number(t(this).data("owl-page")), !0)
            })
        }, updatePagination: function () {
            var e, o, i, n, s, a, r = this;
            if (r.options.pagination === !1)return !1;
            for (r.paginationWrapper.html(""), e = 0, o = r.itemsAmount - r.itemsAmount % r.options.items, n = 0; n < r.itemsAmount; n += 1)n % r.options.items === 0 && (e += 1, o === n && (i = r.itemsAmount - r.options.items), s = t("<div/>", {"class": "owl-page"}), a = t("<span></span>", {
                text: r.options.paginationNumbers === !0 ? e : "",
                "class": r.options.paginationNumbers === !0 ? "owl-numbers" : ""
            }), s.append(a), s.data("owl-page", o === n ? i : n), s.data("owl-roundPages", e), r.paginationWrapper.append(s));
            r.checkPagination()
        }, checkPagination: function () {
            var e = this;
            return e.options.pagination === !1 ? !1 : void e.paginationWrapper.find(".owl-page").each(function () {
                t(this).data("owl-roundPages") === t(e.$owlItems[e.currentItem]).data("owl-roundPages") && (e.paginationWrapper.find(".owl-page").removeClass("active"), t(this).addClass("active"))
            })
        }, checkNavigation: function () {
            var t = this;
            return t.options.navigation === !1 ? !1 : void(t.options.rewindNav === !1 && (0 === t.currentItem && 0 === t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.addClass("disabled")) : 0 === t.currentItem && 0 !== t.maximumItem ? (t.buttonPrev.addClass("disabled"), t.buttonNext.removeClass("disabled")) : t.currentItem === t.maximumItem ? (t.buttonPrev.removeClass("disabled"), t.buttonNext.addClass("disabled")) : 0 !== t.currentItem && t.currentItem !== t.maximumItem && (t.buttonPrev.removeClass("disabled"), t.buttonNext.removeClass("disabled"))))
        }, updateControls: function () {
            var t = this;
            t.updatePagination(), t.checkNavigation(), t.owlControls && (t.options.items >= t.itemsAmount ? t.owlControls.hide() : t.owlControls.show())
        }, destroyControls: function () {
            var t = this;
            t.owlControls && t.owlControls.remove()
        }, next: function (t) {
            var e = this;
            if (e.isTransition)return !1;
            if (e.currentItem += e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem > e.maximumItem + (e.options.scrollPerPage === !0 ? e.options.items - 1 : 0)) {
                if (e.options.rewindNav !== !0)return e.currentItem = e.maximumItem, !1;
                e.currentItem = 0, t = "rewind"
            }
            e.goTo(e.currentItem, t)
        }, prev: function (t) {
            var e = this;
            if (e.isTransition)return !1;
            if (e.options.scrollPerPage === !0 && e.currentItem > 0 && e.currentItem < e.options.items ? e.currentItem = 0 : e.currentItem -= e.options.scrollPerPage === !0 ? e.options.items : 1, e.currentItem < 0) {
                if (e.options.rewindNav !== !0)return e.currentItem = 0, !1;
                e.currentItem = e.maximumItem, t = "rewind"
            }
            e.goTo(e.currentItem, t)
        }, goTo: function (t, o, i) {
            var n, s = this;
            return s.isTransition ? !1 : ("function" == typeof s.options.beforeMove && s.options.beforeMove.apply(this, [s.$elem]), t >= s.maximumItem ? t = s.maximumItem : 0 >= t && (t = 0), s.currentItem = s.owl.currentItem = t, s.options.transitionStyle !== !1 && "drag" !== i && 1 === s.options.items && s.browser.support3d === !0 ? (s.swapSpeed(0), s.browser.support3d === !0 ? s.transition3d(s.positionsInArray[t]) : s.css2slide(s.positionsInArray[t], 1), s.afterGo(), s.singleItemTransition(), !1) : (n = s.positionsInArray[t], s.browser.support3d === !0 ? (s.isCss3Finish = !1, o === !0 ? (s.swapSpeed("paginationSpeed"), e.setTimeout(function () {
                s.isCss3Finish = !0
            }, s.options.paginationSpeed)) : "rewind" === o ? (s.swapSpeed(s.options.rewindSpeed), e.setTimeout(function () {
                s.isCss3Finish = !0
            }, s.options.rewindSpeed)) : (s.swapSpeed("slideSpeed"), e.setTimeout(function () {
                s.isCss3Finish = !0
            }, s.options.slideSpeed)), s.transition3d(n)) : o === !0 ? s.css2slide(n, s.options.paginationSpeed) : "rewind" === o ? s.css2slide(n, s.options.rewindSpeed) : s.css2slide(n, s.options.slideSpeed), void s.afterGo()))
        }, jumpTo: function (t) {
            var e = this;
            "function" == typeof e.options.beforeMove && e.options.beforeMove.apply(this, [e.$elem]), t >= e.maximumItem || -1 === t ? t = e.maximumItem : 0 >= t && (t = 0), e.swapSpeed(0), e.browser.support3d === !0 ? e.transition3d(e.positionsInArray[t]) : e.css2slide(e.positionsInArray[t], 1), e.currentItem = e.owl.currentItem = t, e.afterGo()
        }, afterGo: function () {
            var t = this;
            t.prevArr.push(t.currentItem), t.prevItem = t.owl.prevItem = t.prevArr[t.prevArr.length - 2], t.prevArr.shift(0), t.prevItem !== t.currentItem && (t.checkPagination(), t.checkNavigation(), t.eachMoveUpdate(), t.options.autoPlay !== !1 && t.checkAp()), "function" == typeof t.options.afterMove && t.prevItem !== t.currentItem && t.options.afterMove.apply(this, [t.$elem])
        }, stop: function () {
            var t = this;
            t.apStatus = "stop", e.clearInterval(t.autoPlayInterval)
        }, checkAp: function () {
            var t = this;
            "stop" !== t.apStatus && t.play()
        }, play: function () {
            var t = this;
            return t.apStatus = "play", t.options.autoPlay === !1 ? !1 : (e.clearInterval(t.autoPlayInterval), void(t.autoPlayInterval = e.setInterval(function () {
                t.next(!0)
            }, t.options.autoPlay)))
        }, swapSpeed: function (t) {
            var e = this;
            "slideSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.slideSpeed)) : "paginationSpeed" === t ? e.$owlWrapper.css(e.addCssSpeed(e.options.paginationSpeed)) : "string" != typeof t && e.$owlWrapper.css(e.addCssSpeed(t))
        }, addCssSpeed: function (t) {
            return {
                "-webkit-transition": "all " + t + "ms ease",
                "-moz-transition": "all " + t + "ms ease",
                "-o-transition": "all " + t + "ms ease",
                transition: "all " + t + "ms ease"
            }
        }, removeTransition: function () {
            return {"-webkit-transition": "", "-moz-transition": "", "-o-transition": "", transition: ""}
        }, doTranslate: function (t) {
            return {
                "-webkit-transform": "translate3d(" + t + "px, 0px, 0px)",
                "-moz-transform": "translate3d(" + t + "px, 0px, 0px)",
                "-o-transform": "translate3d(" + t + "px, 0px, 0px)",
                "-ms-transform": "translate3d(" + t + "px, 0px, 0px)",
                transform: "translate3d(" + t + "px, 0px,0px)"
            }
        }, transition3d: function (t) {
            var e = this;
            e.$owlWrapper.css(e.doTranslate(t))
        }, css2move: function (t) {
            var e = this;
            e.$owlWrapper.css({left: t})
        }, css2slide: function (t, e) {
            var o = this;
            o.isCssFinish = !1, o.$owlWrapper.stop(!0, !0).animate({left: t}, {
                duration: e || o.options.slideSpeed,
                complete: function () {
                    o.isCssFinish = !0
                }
            })
        }, checkBrowser: function () {
            var t, i, n, s, a = this, r = "translate3d(0px, 0px, 0px)", l = o.createElement("div");
            l.style.cssText = "  -moz-transform:" + r + "; -ms-transform:" + r + "; -o-transform:" + r + "; -webkit-transform:" + r + "; transform:" + r, t = /translate3d\(0px, 0px, 0px\)/g, i = l.style.cssText.match(t), n = null !== i && i.length >= 1 && i.length <= 2, s = "ontouchstart" in e || e.navigator.msMaxTouchPoints, a.browser = {
                support3d: n,
                isTouch: s
            }
        }, moveEvents: function () {
            var t = this;
            (t.options.mouseDrag !== !1 || t.options.touchDrag !== !1) && (t.gestures(), t.disabledEvents())
        }, eventTypes: function () {
            var t = this, e = ["s", "e", "x"];
            t.ev_types = {}, t.options.mouseDrag === !0 && t.options.touchDrag === !0 ? e = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : t.options.mouseDrag === !1 && t.options.touchDrag === !0 ? e = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : t.options.mouseDrag === !0 && t.options.touchDrag === !1 && (e = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), t.ev_types.start = e[0], t.ev_types.move = e[1], t.ev_types.end = e[2]
        }, disabledEvents: function () {
            var e = this;
            e.$elem.on("dragstart.owl", function (t) {
                t.preventDefault()
            }), e.$elem.on("mousedown.disableTextSelect", function (e) {
                return t(e.target).is("input, textarea, select, option")
            })
        }, gestures: function () {
            function i(t) {
                if (void 0 !== t.touches)return {x: t.touches[0].pageX, y: t.touches[0].pageY};
                if (void 0 === t.touches) {
                    if (void 0 !== t.pageX)return {x: t.pageX, y: t.pageY};
                    if (void 0 === t.pageX)return {x: t.clientX, y: t.clientY}
                }
            }

            function n(e) {
                "on" === e ? (t(o).on(l.ev_types.move, a), t(o).on(l.ev_types.end, r)) : "off" === e && (t(o).off(l.ev_types.move), t(o).off(l.ev_types.end))
            }

            function s(o) {
                var s, a = o.originalEvent || o || e.event;
                if (3 === a.which)return !1;
                if (!(l.itemsAmount <= l.options.items)) {
                    if (l.isCssFinish === !1 && !l.options.dragBeforeAnimFinish)return !1;
                    if (l.isCss3Finish === !1 && !l.options.dragBeforeAnimFinish)return !1;
                    l.options.autoPlay !== !1 && e.clearInterval(l.autoPlayInterval), l.browser.isTouch === !0 || l.$owlWrapper.hasClass("grabbing") || l.$owlWrapper.addClass("grabbing"), l.newPosX = 0, l.newRelativeX = 0, t(this).css(l.removeTransition()), s = t(this).position(), p.relativePos = s.left, p.offsetX = i(a).x - s.left, p.offsetY = i(a).y - s.top, n("on"), p.sliding = !1, p.targetElement = a.target || a.srcElement
                }
            }

            function a(n) {
                var s, a, r = n.originalEvent || n || e.event;
                l.newPosX = i(r).x - p.offsetX, l.newPosY = i(r).y - p.offsetY, l.newRelativeX = l.newPosX - p.relativePos, "function" == typeof l.options.startDragging && p.dragging !== !0 && 0 !== l.newRelativeX && (p.dragging = !0, l.options.startDragging.apply(l, [l.$elem])), (l.newRelativeX > 8 || l.newRelativeX < -8) && l.browser.isTouch === !0 && (void 0 !== r.preventDefault ? r.preventDefault() : r.returnValue = !1, p.sliding = !0), (l.newPosY > 10 || l.newPosY < -10) && p.sliding === !1 && t(o).off("touchmove.owl"), s = function () {
                    return l.newRelativeX / 5
                }, a = function () {
                    return l.maximumPixels + l.newRelativeX / 5
                }, l.newPosX = Math.max(Math.min(l.newPosX, s()), a()), l.browser.support3d === !0 ? l.transition3d(l.newPosX) : l.css2move(l.newPosX)
            }

            function r(o) {
                var i, s, a, r = o.originalEvent || o || e.event;
                r.target = r.target || r.srcElement, p.dragging = !1, l.browser.isTouch !== !0 && l.$owlWrapper.removeClass("grabbing"), l.newRelativeX < 0 ? l.dragDirection = l.owl.dragDirection = "left" : l.dragDirection = l.owl.dragDirection = "right", 0 !== l.newRelativeX && (i = l.getNewPosition(), l.goTo(i, !1, "drag"), p.targetElement === r.target && l.browser.isTouch !== !0 && (t(r.target).on("click.disable", function (e) {
                    e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault(), t(e.target).off("click.disable")
                }), s = t._data(r.target, "events").click, a = s.pop(), s.splice(0, 0, a))), n("off")
            }

            var l = this, p = {
                offsetX: 0,
                offsetY: 0,
                baseElWidth: 0,
                relativePos: 0,
                position: null,
                minSwipe: null,
                maxSwipe: null,
                sliding: null,
                dargging: null,
                targetElement: null
            };
            l.isCssFinish = !0, l.$elem.on(l.ev_types.start, ".owl-wrapper", s)
        }, getNewPosition: function () {
            var t = this, e = t.closestItem();
            return e > t.maximumItem ? (t.currentItem = t.maximumItem, e = t.maximumItem) : t.newPosX >= 0 && (e = 0, t.currentItem = 0), e
        }, closestItem: function () {
            var e = this, o = e.options.scrollPerPage === !0 ? e.pagesInArray : e.positionsInArray, i = e.newPosX, n = null;
            return t.each(o, function (s, a) {
                i - e.itemWidth / 20 > o[s + 1] && i - e.itemWidth / 20 < a && "left" === e.moveDirection() ? (n = a, e.options.scrollPerPage === !0 ? e.currentItem = t.inArray(n, e.positionsInArray) : e.currentItem = s) : i + e.itemWidth / 20 < a && i + e.itemWidth / 20 > (o[s + 1] || o[s] - e.itemWidth) && "right" === e.moveDirection() && (e.options.scrollPerPage === !0 ? (n = o[s + 1] || o[o.length - 1], e.currentItem = t.inArray(n, e.positionsInArray)) : (n = o[s + 1], e.currentItem = s + 1))
            }), e.currentItem
        }, moveDirection: function () {
            var t, e = this;
            return e.newRelativeX < 0 ? (t = "right", e.playDirection = "next") : (t = "left", e.playDirection = "prev"), t
        }, customEvents: function () {
            var t = this;
            t.$elem.on("owl.next", function () {
                t.next()
            }), t.$elem.on("owl.prev", function () {
                t.prev()
            }), t.$elem.on("owl.play", function (e, o) {
                t.options.autoPlay = o, t.play(), t.hoverStatus = "play"
            }), t.$elem.on("owl.stop", function () {
                t.stop(), t.hoverStatus = "stop"
            }), t.$elem.on("owl.goTo", function (e, o) {
                t.goTo(o)
            }), t.$elem.on("owl.jumpTo", function (e, o) {
                t.jumpTo(o)
            })
        }, stopOnHover: function () {
            var t = this;
            t.options.stopOnHover === !0 && t.browser.isTouch !== !0 && t.options.autoPlay !== !1 && (t.$elem.on("mouseover", function () {
                t.stop()
            }), t.$elem.on("mouseout", function () {
                "stop" !== t.hoverStatus && t.play()
            }))
        }, lazyLoad: function () {
            var e, o, i, n, s, a = this;
            if (a.options.lazyLoad === !1)return !1;
            for (e = 0; e < a.itemsAmount; e += 1)o = t(a.$owlItems[e]), "loaded" !== o.data("owl-loaded") && (i = o.data("owl-item"), n = o.find(".lazyOwl"), "string" == typeof n.data("src") ? (void 0 === o.data("owl-loaded") && (n.hide(), o.addClass("loading").data("owl-loaded", "checked")), s = a.options.lazyFollow === !0 ? i >= a.currentItem : !0, s && i < a.currentItem + a.options.items && n.length && n.each(function () {
                a.lazyPreload(o, t(this))
            })) : o.data("owl-loaded", "loaded"))
        }, lazyPreload: function (t, o) {
            function i() {
                t.data("owl-loaded", "loaded").removeClass("loading"), o.removeAttr("data-src"), "fade" === a.options.lazyEffect ? o.fadeIn(400) : o.show(), "function" == typeof a.options.afterLazyLoad && a.options.afterLazyLoad.apply(this, [a.$elem])
            }

            function n() {
                r += 1, a.completeImg(o.get(0)) || s === !0 ? i() : 100 >= r ? e.setTimeout(n, 100) : i()
            }

            var s, a = this, r = 0;
            "DIV" === o.prop("tagName") ? (o.css("background-image", "url(" + o.data("src") + ")"), s = !0) : o[0].src = o.data("src"), n()
        }, autoHeight: function () {
            function o() {
                var o = t(s.$owlItems[s.currentItem]).height();
                s.wrapperOuter.css("height", o + "px"), s.wrapperOuter.hasClass("autoHeight") || e.setTimeout(function () {
                    s.wrapperOuter.addClass("autoHeight")
                }, 0)
            }

            function i() {
                n += 1, s.completeImg(a.get(0)) ? o() : 100 >= n ? e.setTimeout(i, 100) : s.wrapperOuter.css("height", "")
            }

            var n, s = this, a = t(s.$owlItems[s.currentItem]).find("img");
            void 0 !== a.get(0) ? (n = 0, i()) : o()
        }, completeImg: function (t) {
            var e;
            return t.complete ? (e = typeof t.naturalWidth, "undefined" !== e && 0 === t.naturalWidth ? !1 : !0) : !1
        }, onVisibleItems: function () {
            var e, o = this;
            for (o.options.addClassActive === !0 && o.$owlItems.removeClass("active"), o.visibleItems = [], e = o.currentItem; e < o.currentItem + o.options.items; e += 1)o.visibleItems.push(e), o.options.addClassActive === !0 && t(o.$owlItems[e]).addClass("active");
            o.owl.visibleItems = o.visibleItems
        }, transitionTypes: function (t) {
            var e = this;
            e.outClass = "owl-" + t + "-out", e.inClass = "owl-" + t + "-in"
        }, singleItemTransition: function () {
            function t(t) {
                return {position: "relative", left: t + "px"}
            }

            var e = this, o = e.outClass, i = e.inClass, n = e.$owlItems.eq(e.currentItem), s = e.$owlItems.eq(e.prevItem), a = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem], r = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2, l = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
            e.isTransition = !0, e.$owlWrapper.addClass("owl-origin").css({
                "-webkit-transform-origin": r + "px",
                "-moz-perspective-origin": r + "px",
                "perspective-origin": r + "px"
            }), s.css(t(a, 10)).addClass(o).on(l, function () {
                e.endPrev = !0, s.off(l), e.clearTransStyle(s, o)
            }), n.addClass(i).on(l, function () {
                e.endCurrent = !0, n.off(l), e.clearTransStyle(n, i)
            })
        }, clearTransStyle: function (t, e) {
            var o = this;
            t.css({
                position: "",
                left: ""
            }).removeClass(e), o.endPrev && o.endCurrent && (o.$owlWrapper.removeClass("owl-origin"), o.endPrev = !1, o.endCurrent = !1, o.isTransition = !1)
        }, owlStatus: function () {
            var t = this;
            t.owl = {
                userOptions: t.userOptions,
                baseElement: t.$elem,
                userItems: t.$userItems,
                owlItems: t.$owlItems,
                currentItem: t.currentItem,
                prevItem: t.prevItem,
                visibleItems: t.visibleItems,
                isTouch: t.browser.isTouch,
                browser: t.browser,
                dragDirection: t.dragDirection
            }
        }, clearEvents: function () {
            var i = this;
            i.$elem.off(".owl owl mousedown.disableTextSelect"), t(o).off(".owl owl"), t(e).off("resize", i.resizer)
        }, unWrap: function () {
            var t = this;
            0 !== t.$elem.children().length && (t.$owlWrapper.unwrap(), t.$userItems.unwrap().unwrap(), t.owlControls && t.owlControls.remove()), t.clearEvents(), t.$elem.attr({
                style: t.$elem.data("owl-originalStyles") || "",
                "class": t.$elem.data("owl-originalClasses")
            })
        }, destroy: function () {
            var t = this;
            t.stop(), e.clearInterval(t.checkVisible), t.unWrap(), t.$elem.removeData()
        }, reinit: function (e) {
            var o = this, i = t.extend({}, o.userOptions, e);
            o.unWrap(), o.init(i, o.$elem)
        }, addItem: function (t, e) {
            var o, i = this;
            return t ? 0 === i.$elem.children().length ? (i.$elem.append(t), i.setVars(), !1) : (i.unWrap(), o = void 0 === e || -1 === e ? -1 : e, o >= i.$userItems.length || -1 === o ? i.$userItems.eq(-1).after(t) : i.$userItems.eq(o).before(t), void i.setVars()) : !1
        }, removeItem: function (t) {
            var e, o = this;
            return 0 === o.$elem.children().length ? !1 : (e = void 0 === t || -1 === t ? -1 : t, o.unWrap(), o.$userItems.eq(e).remove(), void o.setVars())
        }
    };
    t.fn.owlCarousel = function (e) {
        return this.each(function () {
            if (t(this).data("owl-init") === !0)return !1;
            t(this).data("owl-init", !0);
            var o = Object.create(i);
            o.init(e, this), t.data(this, "owlCarousel", o)
        })
    }, t.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: e,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1
    }
}(jQuery, window, document);
/**
 * FitVids 1.1
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 * ===================================================================
 */
!function (t) {
    "use strict";
    t.fn.fitVids = function (e) {
        var i = {customSelector: null, ignore: null};
        if (!document.getElementById("fit-vids-style")) {
            var r = document.head || document.getElementsByTagName("head")[0], a = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}", d = document.createElement("div");
            d.innerHTML = '<p>x</p><style id="fit-vids-style">' + a + "</style>", r.appendChild(d.childNodes[1])
        }
        return e && t.extend(i, e), this.each(function () {
            var e = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
            i.customSelector && e.push(i.customSelector);
            var r = ".fitvidsignore";
            i.ignore && (r = r + ", " + i.ignore);
            var a = t(this).find(e.join(","));
            a = a.not("object object"), a = a.not(r), a.each(function () {
                var e = t(this);
                if (!(e.parents(r).length > 0 || "embed" === this.tagName.toLowerCase() && e.parent("object").length || e.parent(".fluid-width-video-wrapper").length)) {
                    e.css("height") || e.css("width") || !isNaN(e.attr("height")) && !isNaN(e.attr("width")) || (e.attr("height", 9), e.attr("width", 16));
                    var i = "object" === this.tagName.toLowerCase() || e.attr("height") && !isNaN(parseInt(e.attr("height"), 10)) ? parseInt(e.attr("height"), 10) : e.height(), a = isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10), d = i / a;
                    if (!e.attr("name")) {
                        var o = "fitvid" + t.fn.fitVids._count;
                        e.attr("name", o), t.fn.fitVids._count++
                    }
                    e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * d + "%"), e.removeAttr("height").removeAttr("width")
                }
            })
        })
    }, t.fn.fitVids._count = 0
}(window.jQuery || window.Zepto);
/**
 * Slick.js 1.6.0
 * http://github.com/kenwheeler/slick
 * Copyright Ken Wheeler
 * ===================================================================
 */
!function (i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], i) : "undefined" != typeof exports ? module.exports = i(require("jquery")) : i(jQuery)
}(function (i) {
    "use strict";
    var e = window.Slick || {};
    e = function () {
        function e(e, o) {
            var s, n = this;
            n.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: i(e),
                appendDots: i(e),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (e, t) {
                    return i('<button type="button" data-role="none" role="button" tabindex="0" />').text(t + 1)
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: .35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3
            }, n.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            }, i.extend(n, n.initials), n.activeBreakpoint = null, n.animType = null, n.animProp = null, n.breakpoints = [], n.breakpointSettings = [], n.cssTransitions = !1, n.focussed = !1, n.interrupted = !1, n.hidden = "hidden", n.paused = !0, n.positionProp = null, n.respondTo = null, n.rowCount = 1, n.shouldClick = !0, n.$slider = i(e), n.$slidesCache = null, n.transformType = null, n.transitionType = null, n.visibilityChange = "visibilitychange", n.windowWidth = 0, n.windowTimer = null, s = i(e).data("slick") || {}, n.options = i.extend({}, n.defaults, o, s), n.currentSlide = n.options.initialSlide, n.originalSettings = n.options, "undefined" != typeof document.mozHidden ? (n.hidden = "mozHidden", n.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (n.hidden = "webkitHidden", n.visibilityChange = "webkitvisibilitychange"), n.autoPlay = i.proxy(n.autoPlay, n), n.autoPlayClear = i.proxy(n.autoPlayClear, n), n.autoPlayIterator = i.proxy(n.autoPlayIterator, n), n.changeSlide = i.proxy(n.changeSlide, n), n.clickHandler = i.proxy(n.clickHandler, n), n.selectHandler = i.proxy(n.selectHandler, n), n.setPosition = i.proxy(n.setPosition, n), n.swipeHandler = i.proxy(n.swipeHandler, n), n.dragHandler = i.proxy(n.dragHandler, n), n.keyHandler = i.proxy(n.keyHandler, n), n.instanceUid = t++, n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, n.registerBreakpoints(), n.init(!0)
        }

        var t = 0;
        return e
    }(), e.prototype.activateADA = function () {
        var i = this;
        i.$slideTrack.find(".slick-active").attr({"aria-hidden": "false"}).find("a, input, button, select").attr({tabindex: "0"})
    }, e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t)o = t, t = null; else if (0 > t || t >= s.slideCount)return !1;
        s.unload(), "number" == typeof t ? 0 === t && 0 === s.$slides.length ? i(e).appendTo(s.$slideTrack) : o ? i(e).insertBefore(s.$slides.eq(t)) : i(e).insertAfter(s.$slides.eq(t)) : o === !0 ? i(e).prependTo(s.$slideTrack) : i(e).appendTo(s.$slideTrack), s.$slides = s.$slideTrack.children(this.options.slide), s.$slideTrack.children(this.options.slide).detach(), s.$slideTrack.append(s.$slides), s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e)
        }), s.$slidesCache = s.$slides, s.reinit()
    }, e.prototype.animateHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.animate({height: e}, i.options.speed)
        }
    }, e.prototype.animateSlide = function (e, t) {
        var o = {}, s = this;
        s.animateHeight(), s.options.rtl === !0 && s.options.vertical === !1 && (e = -e), s.transformsEnabled === !1 ? s.options.vertical === !1 ? s.$slideTrack.animate({left: e}, s.options.speed, s.options.easing, t) : s.$slideTrack.animate({top: e}, s.options.speed, s.options.easing, t) : s.cssTransitions === !1 ? (s.options.rtl === !0 && (s.currentLeft = -s.currentLeft), i({animStart: s.currentLeft}).animate({animStart: e}, {
            duration: s.options.speed,
            easing: s.options.easing,
            step: function (i) {
                i = Math.ceil(i), s.options.vertical === !1 ? (o[s.animType] = "translate(" + i + "px, 0px)", s.$slideTrack.css(o)) : (o[s.animType] = "translate(0px," + i + "px)", s.$slideTrack.css(o))
            },
            complete: function () {
                t && t.call()
            }
        })) : (s.applyTransition(), e = Math.ceil(e), s.options.vertical === !1 ? o[s.animType] = "translate3d(" + e + "px, 0px, 0px)" : o[s.animType] = "translate3d(0px," + e + "px, 0px)", s.$slideTrack.css(o), t && setTimeout(function () {
            s.disableTransition(), t.call()
        }, s.options.speed))
    }, e.prototype.getNavTarget = function () {
        var e = this, t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t
    }, e.prototype.asNavFor = function (e) {
        var t = this, o = t.getNavTarget();
        null !== o && "object" == typeof o && o.each(function () {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0)
        })
    }, e.prototype.applyTransition = function (i) {
        var e = this, t = {};
        e.options.fade === !1 ? t[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : t[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase, e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.autoPlay = function () {
        var i = this;
        i.autoPlayClear(), i.slideCount > i.options.slidesToShow && (i.autoPlayTimer = setInterval(i.autoPlayIterator, i.options.autoplaySpeed))
    }, e.prototype.autoPlayClear = function () {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer)
    }, e.prototype.autoPlayIterator = function () {
        var i = this, e = i.currentSlide + i.options.slidesToScroll;
        i.paused || i.interrupted || i.focussed || (i.options.infinite === !1 && (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1 ? i.direction = 0 : 0 === i.direction && (e = i.currentSlide - i.options.slidesToScroll, i.currentSlide - 1 === 0 && (i.direction = 1))), i.slideHandler(e))
    }, e.prototype.buildArrows = function () {
        var e = this;
        e.options.arrows === !0 && (e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow"), e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow"), e.slideCount > e.options.slidesToShow ? (e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.prependTo(e.options.appendArrows), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.appendTo(e.options.appendArrows), e.options.infinite !== !0 && e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }))
    }, e.prototype.buildDots = function () {
        var e, t, o = this;
        if (o.options.dots === !0 && o.slideCount > o.options.slidesToShow) {
            for (o.$slider.addClass("slick-dotted"), t = i("<ul />").addClass(o.options.dotsClass), e = 0; e <= o.getDotCount(); e += 1)t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
            o.$dots = t.appendTo(o.options.appendDots), o.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
        }
    }, e.prototype.buildOut = function () {
        var e = this;
        e.$slides = e.$slider.children(e.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), e.slideCount = e.$slides.length, e.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e).data("originalStyling", i(t).attr("style") || "")
        }), e.$slider.addClass("slick-slider"), e.$slideTrack = 0 === e.slideCount ? i('<div class="slick-track"/>').appendTo(e.$slider) : e.$slides.wrapAll('<div class="slick-track"/>').parent(), e.$list = e.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), e.$slideTrack.css("opacity", 0), (e.options.centerMode === !0 || e.options.swipeToSlide === !0) && (e.options.slidesToScroll = 1), i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"), e.setupInfinite(), e.buildArrows(), e.buildDots(), e.updateDots(), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.options.draggable === !0 && e.$list.addClass("draggable")
    }, e.prototype.buildRows = function () {
        var i, e, t, o, s, n, r, l = this;
        if (o = document.createDocumentFragment(), n = l.$slider.children(), l.options.rows > 1) {
            for (r = l.options.slidesPerRow * l.options.rows, s = Math.ceil(n.length / r), i = 0; s > i; i++) {
                var a = document.createElement("div");
                for (e = 0; e < l.options.rows; e++) {
                    var d = document.createElement("div");
                    for (t = 0; t < l.options.slidesPerRow; t++) {
                        var c = i * r + (e * l.options.slidesPerRow + t);
                        n.get(c) && d.appendChild(n.get(c))
                    }
                    a.appendChild(d)
                }
                o.appendChild(a)
            }
            l.$slider.empty().append(o), l.$slider.children().children().children().css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
            })
        }
    }, e.prototype.checkResponsive = function (e, t) {
        var o, s, n, r = this, l = !1, a = r.$slider.width(), d = window.innerWidth || i(window).width();
        if ("window" === r.respondTo ? n = d : "slider" === r.respondTo ? n = a : "min" === r.respondTo && (n = Math.min(d, a)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
            s = null;
            for (o in r.breakpoints)r.breakpoints.hasOwnProperty(o) && (r.originalSettings.mobileFirst === !1 ? n < r.breakpoints[o] && (s = r.breakpoints[o]) : n > r.breakpoints[o] && (s = r.breakpoints[o]));
            null !== s ? null !== r.activeBreakpoint ? (s !== r.activeBreakpoint || t) && (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : (r.activeBreakpoint = s, "unslick" === r.breakpointSettings[s] ? r.unslick(s) : (r.options = i.extend({}, r.originalSettings, r.breakpointSettings[s]), e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e)), l = s) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, e === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(e), l = s), e || l === !1 || r.$slider.trigger("breakpoint", [r, l])
        }
    }, e.prototype.changeSlide = function (e, t) {
        var o, s, n, r = this, l = i(e.currentTarget);
        switch (l.is("a") && e.preventDefault(), l.is("li") || (l = l.closest("li")), n = r.slideCount % r.options.slidesToScroll !== 0, o = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, e.data.message) {
            case"previous":
                s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - s, !1, t);
                break;
            case"next":
                s = 0 === o ? r.options.slidesToScroll : o, r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + s, !1, t);
                break;
            case"index":
                var a = 0 === e.data.index ? 0 : e.data.index || l.index() * r.options.slidesToScroll;
                r.slideHandler(r.checkNavigable(a), !1, t), l.children().trigger("focus");
                break;
            default:
                return
        }
    }, e.prototype.checkNavigable = function (i) {
        var e, t, o = this;
        if (e = o.getNavigableIndexes(), t = 0, i > e[e.length - 1])i = e[e.length - 1]; else for (var s in e) {
            if (i < e[s]) {
                i = t;
                break
            }
            t = e[s]
        }
        return i
    }, e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots && null !== e.$dots && i("li", e.$dots).off("click.slick", e.changeSlide).off("mouseenter.slick", i.proxy(e.interrupt, e, !0)).off("mouseleave.slick", i.proxy(e.interrupt, e, !1)), e.$slider.off("focus.slick blur.slick"), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide), e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide)), e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler), e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler), e.$list.off("touchend.slick mouseup.slick", e.swipeHandler), e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler), e.$list.off("click.slick", e.clickHandler), i(document).off(e.visibilityChange, e.visibility), e.cleanUpSlideEvents(), e.options.accessibility === !0 && e.$list.off("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().off("click.slick", e.selectHandler), i(window).off("orientationchange.slick.slick-" + e.instanceUid, e.orientationChange), i(window).off("resize.slick.slick-" + e.instanceUid, e.resize), i("[draggable!=true]", e.$slideTrack).off("dragstart", e.preventDefault), i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition), i(document).off("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.cleanUpSlideEvents = function () {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.cleanUpRows = function () {
        var i, e = this;
        e.options.rows > 1 && (i = e.$slides.children().children(), i.removeAttr("style"), e.$slider.empty().append(i))
    }, e.prototype.clickHandler = function (i) {
        var e = this;
        e.shouldClick === !1 && (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault())
    }, e.prototype.destroy = function (e) {
        var t = this;
        t.autoPlayClear(), t.touchObject = {}, t.cleanUpEvents(), i(".slick-cloned", t.$slider).detach(), t.$dots && t.$dots.remove(), t.$prevArrow && t.$prevArrow.length && (t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()), t.$nextArrow && t.$nextArrow.length && (t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()), t.$slides && (t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
            i(this).attr("style", i(this).data("originalStyling"))
        }), t.$slideTrack.children(this.options.slide).detach(), t.$slideTrack.detach(), t.$list.detach(), t.$slider.append(t.$slides)), t.cleanUpRows(), t.$slider.removeClass("slick-slider"), t.$slider.removeClass("slick-initialized"), t.$slider.removeClass("slick-dotted"), t.unslicked = !0, e || t.$slider.trigger("destroy", [t])
    }, e.prototype.disableTransition = function (i) {
        var e = this, t = {};
        t[e.transitionType] = "", e.options.fade === !1 ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t)
    }, e.prototype.fadeSlide = function (i, e) {
        var t = this;
        t.cssTransitions === !1 ? (t.$slides.eq(i).css({zIndex: t.options.zIndex}), t.$slides.eq(i).animate({opacity: 1}, t.options.speed, t.options.easing, e)) : (t.applyTransition(i), t.$slides.eq(i).css({
            opacity: 1,
            zIndex: t.options.zIndex
        }), e && setTimeout(function () {
            t.disableTransition(i), e.call()
        }, t.options.speed))
    }, e.prototype.fadeSlideOut = function (i) {
        var e = this;
        e.cssTransitions === !1 ? e.$slides.eq(i).animate({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }, e.options.speed, e.options.easing) : (e.applyTransition(i), e.$slides.eq(i).css({
            opacity: 0,
            zIndex: e.options.zIndex - 2
        }))
    }, e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
        var e = this;
        null !== i && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(i).appendTo(e.$slideTrack), e.reinit())
    }, e.prototype.focusHandler = function () {
        var e = this;
        e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function () {
                e.options.pauseOnFocus && (e.focussed = o.is(":focus"), e.autoPlay())
            }, 0)
        })
    }, e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        var i = this;
        return i.currentSlide
    }, e.prototype.getDotCount = function () {
        var i = this, e = 0, t = 0, o = 0;
        if (i.options.infinite === !0)for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else if (i.options.centerMode === !0)o = i.slideCount; else if (i.options.asNavFor)for (; e < i.slideCount;)++o, e = t + i.options.slidesToScroll, t += i.options.slidesToScroll <= i.options.slidesToShow ? i.options.slidesToScroll : i.options.slidesToShow; else o = 1 + Math.ceil((i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll);
        return o - 1
    }, e.prototype.getLeft = function (i) {
        var e, t, o, s = this, n = 0;
        return s.slideOffset = 0, t = s.$slides.first().outerHeight(!0), s.options.infinite === !0 ? (s.slideCount > s.options.slidesToShow && (s.slideOffset = s.slideWidth * s.options.slidesToShow * -1, n = t * s.options.slidesToShow * -1), s.slideCount % s.options.slidesToScroll !== 0 && i + s.options.slidesToScroll > s.slideCount && s.slideCount > s.options.slidesToShow && (i > s.slideCount ? (s.slideOffset = (s.options.slidesToShow - (i - s.slideCount)) * s.slideWidth * -1, n = (s.options.slidesToShow - (i - s.slideCount)) * t * -1) : (s.slideOffset = s.slideCount % s.options.slidesToScroll * s.slideWidth * -1, n = s.slideCount % s.options.slidesToScroll * t * -1))) : i + s.options.slidesToShow > s.slideCount && (s.slideOffset = (i + s.options.slidesToShow - s.slideCount) * s.slideWidth, n = (i + s.options.slidesToShow - s.slideCount) * t), s.slideCount <= s.options.slidesToShow && (s.slideOffset = 0, n = 0), s.options.centerMode === !0 && s.options.infinite === !0 ? s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2) - s.slideWidth : s.options.centerMode === !0 && (s.slideOffset = 0, s.slideOffset += s.slideWidth * Math.floor(s.options.slidesToShow / 2)), e = s.options.vertical === !1 ? i * s.slideWidth * -1 + s.slideOffset : i * t * -1 + n, s.options.variableWidth === !0 && (o = s.slideCount <= s.options.slidesToShow || s.options.infinite === !1 ? s.$slideTrack.children(".slick-slide").eq(i) : s.$slideTrack.children(".slick-slide").eq(i + s.options.slidesToShow), e = s.options.rtl === !0 ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, s.options.centerMode === !0 && (o = s.slideCount <= s.options.slidesToShow || s.options.infinite === !1 ? s.$slideTrack.children(".slick-slide").eq(i) : s.$slideTrack.children(".slick-slide").eq(i + s.options.slidesToShow + 1), e = s.options.rtl === !0 ? o[0] ? -1 * (s.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (s.$list.width() - o.outerWidth()) / 2)), e
    }, e.prototype.getOption = e.prototype.slickGetOption = function (i) {
        var e = this;
        return e.options[i]
    }, e.prototype.getNavigableIndexes = function () {
        var i, e = this, t = 0, o = 0, s = [];
        for (e.options.infinite === !1 ? i = e.slideCount : (t = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, i = 2 * e.slideCount); i > t;)s.push(t), t = o + e.options.slidesToScroll, o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
        return s
    }, e.prototype.getSlick = function () {
        return this
    }, e.prototype.getSlideCount = function () {
        var e, t, o, s = this;
        return o = s.options.centerMode === !0 ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0, s.options.swipeToSlide === !0 ? (s.$slideTrack.find(".slick-slide").each(function (e, n) {
            return n.offsetLeft - o + i(n).outerWidth() / 2 > -1 * s.swipeLeft ? (t = n, !1) : void 0
        }), e = Math.abs(i(t).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
    }, e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
        var t = this;
        t.changeSlide({data: {message: "index", index: parseInt(i)}}, e)
    }, e.prototype.init = function (e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") || (i(t.$slider).addClass("slick-initialized"), t.buildRows(), t.buildOut(), t.setProps(), t.startLoad(), t.loadSlider(), t.initializeEvents(), t.updateArrows(), t.updateDots(), t.checkResponsive(!0), t.focusHandler()), e && t.$slider.trigger("init", [t]), t.options.accessibility === !0 && t.initADA(), t.options.autoplay && (t.paused = !1, t.autoPlay())
    }, e.prototype.initADA = function () {
        var e = this;
        e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({tabindex: "-1"}), e.$slideTrack.attr("role", "listbox"), e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function (t) {
            i(this).attr({role: "option", "aria-describedby": "slick-slide" + e.instanceUid + t})
        }), null !== e.$dots && e.$dots.attr("role", "tablist").find("li").each(function (t) {
            i(this).attr({
                role: "presentation",
                "aria-selected": "false",
                "aria-controls": "navigation" + e.instanceUid + t,
                id: "slick-slide" + e.instanceUid + t
            })
        }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), e.activateADA()
    }, e.prototype.initArrowEvents = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.off("click.slick").on("click.slick", {message: "previous"}, i.changeSlide), i.$nextArrow.off("click.slick").on("click.slick", {message: "next"}, i.changeSlide))
    }, e.prototype.initDotEvents = function () {
        var e = this;
        e.options.dots === !0 && e.slideCount > e.options.slidesToShow && i("li", e.$dots).on("click.slick", {message: "index"}, e.changeSlide), e.options.dots === !0 && e.options.pauseOnDotsHover === !0 && i("li", e.$dots).on("mouseenter.slick", i.proxy(e.interrupt, e, !0)).on("mouseleave.slick", i.proxy(e.interrupt, e, !1))
    }, e.prototype.initSlideEvents = function () {
        var e = this;
        e.options.pauseOnHover && (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)), e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)))
    }, e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(), e.initDotEvents(), e.initSlideEvents(), e.$list.on("touchstart.slick mousedown.slick", {action: "start"}, e.swipeHandler), e.$list.on("touchmove.slick mousemove.slick", {action: "move"}, e.swipeHandler), e.$list.on("touchend.slick mouseup.slick", {action: "end"}, e.swipeHandler), e.$list.on("touchcancel.slick mouseleave.slick", {action: "end"}, e.swipeHandler), e.$list.on("click.slick", e.clickHandler), i(document).on(e.visibilityChange, i.proxy(e.visibility, e)), e.options.accessibility === !0 && e.$list.on("keydown.slick", e.keyHandler), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), i(window).on("orientationchange.slick.slick-" + e.instanceUid, i.proxy(e.orientationChange, e)), i(window).on("resize.slick.slick-" + e.instanceUid, i.proxy(e.resize, e)), i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault), i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition), i(document).on("ready.slick.slick-" + e.instanceUid, e.setPosition)
    }, e.prototype.initUI = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.show(), i.$nextArrow.show()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.show()
    }, e.prototype.keyHandler = function (i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === i.keyCode && e.options.accessibility === !0 ? e.changeSlide({data: {message: e.options.rtl === !0 ? "next" : "previous"}}) : 39 === i.keyCode && e.options.accessibility === !0 && e.changeSlide({data: {message: e.options.rtl === !0 ? "previous" : "next"}}))
    }, e.prototype.lazyLoad = function () {
        function e(e) {
            i("img[data-lazy]", e).each(function () {
                var e = i(this), t = i(this).attr("data-lazy"), o = document.createElement("img");
                o.onload = function () {
                    e.animate({opacity: 0}, 100, function () {
                        e.attr("src", t).animate({opacity: 1}, 200, function () {
                            e.removeAttr("data-lazy").removeClass("slick-loading")
                        }), r.$slider.trigger("lazyLoaded", [r, e, t])
                    })
                }, o.onerror = function () {
                    e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, e, t])
                }, o.src = t
            })
        }

        var t, o, s, n, r = this;
        r.options.centerMode === !0 ? r.options.infinite === !0 ? (s = r.currentSlide + (r.options.slidesToShow / 2 + 1), n = s + r.options.slidesToShow + 2) : (s = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1)), n = 2 + (r.options.slidesToShow / 2 + 1) + r.currentSlide) : (s = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide, n = Math.ceil(s + r.options.slidesToShow), r.options.fade === !0 && (s > 0 && s--, n <= r.slideCount && n++)), t = r.$slider.find(".slick-slide").slice(s, n), e(t), r.slideCount <= r.options.slidesToShow ? (o = r.$slider.find(".slick-slide"), e(o)) : r.currentSlide >= r.slideCount - r.options.slidesToShow ? (o = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow), e(o)) : 0 === r.currentSlide && (o = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow), e(o))
    }, e.prototype.loadSlider = function () {
        var i = this;
        i.setPosition(), i.$slideTrack.css({opacity: 1}), i.$slider.removeClass("slick-loading"), i.initUI(), "progressive" === i.options.lazyLoad && i.progressiveLazyLoad()
    }, e.prototype.next = e.prototype.slickNext = function () {
        var i = this;
        i.changeSlide({data: {message: "next"}})
    }, e.prototype.orientationChange = function () {
        var i = this;
        i.checkResponsive(), i.setPosition()
    }, e.prototype.pause = e.prototype.slickPause = function () {
        var i = this;
        i.autoPlayClear(), i.paused = !0
    }, e.prototype.play = e.prototype.slickPlay = function () {
        var i = this;
        i.autoPlay(), i.options.autoplay = !0, i.paused = !1, i.focussed = !1, i.interrupted = !1
    }, e.prototype.postSlide = function (i) {
        var e = this;
        e.unslicked || (e.$slider.trigger("afterChange", [e, i]), e.animating = !1, e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), e.options.accessibility === !0 && e.initADA())
    }, e.prototype.prev = e.prototype.slickPrev = function () {
        var i = this;
        i.changeSlide({data: {message: "previous"}})
    }, e.prototype.preventDefault = function (i) {
        i.preventDefault()
    }, e.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var t, o, s, n = this, r = i("img[data-lazy]", n.$slider);
        r.length ? (t = r.first(), o = t.attr("data-lazy"), s = document.createElement("img"), s.onload = function () {
            t.attr("src", o).removeAttr("data-lazy").removeClass("slick-loading"), n.options.adaptiveHeight === !0 && n.setPosition(), n.$slider.trigger("lazyLoaded", [n, t, o]), n.progressiveLazyLoad()
        }, s.onerror = function () {
            3 > e ? setTimeout(function () {
                n.progressiveLazyLoad(e + 1)
            }, 500) : (t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), n.$slider.trigger("lazyLoadError", [n, t, o]), n.progressiveLazyLoad())
        }, s.src = o) : n.$slider.trigger("allImagesLoaded", [n])
    }, e.prototype.refresh = function (e) {
        var t, o, s = this;
        o = s.slideCount - s.options.slidesToShow, !s.options.infinite && s.currentSlide > o && (s.currentSlide = o), s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0), t = s.currentSlide, s.destroy(!0), i.extend(s, s.initials, {currentSlide: t}), s.init(), e || s.changeSlide({
            data: {
                message: "index",
                index: t
            }
        }, !1)
    }, e.prototype.registerBreakpoints = function () {
        var e, t, o, s = this, n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
            s.respondTo = s.options.respondTo || "window";
            for (e in n)if (o = s.breakpoints.length - 1, t = n[e].breakpoint, n.hasOwnProperty(e)) {
                for (; o >= 0;)s.breakpoints[o] && s.breakpoints[o] === t && s.breakpoints.splice(o, 1), o--;
                s.breakpoints.push(t), s.breakpointSettings[t] = n[e].settings
            }
            s.breakpoints.sort(function (i, e) {
                return s.options.mobileFirst ? i - e : e - i
            })
        }
    }, e.prototype.reinit = function () {
        var e = this;
        e.$slides = e.$slideTrack.children(e.options.slide).addClass("slick-slide"), e.slideCount = e.$slides.length, e.currentSlide >= e.slideCount && 0 !== e.currentSlide && (e.currentSlide = e.currentSlide - e.options.slidesToScroll), e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0), e.registerBreakpoints(), e.setProps(), e.setupInfinite(), e.buildArrows(), e.updateArrows(), e.initArrowEvents(), e.buildDots(), e.updateDots(), e.initDotEvents(), e.cleanUpSlideEvents(), e.initSlideEvents(), e.checkResponsive(!1, !0), e.options.focusOnSelect === !0 && i(e.$slideTrack).children().on("click.slick", e.selectHandler), e.setSlideClasses("number" == typeof e.currentSlide ? e.currentSlide : 0), e.setPosition(), e.focusHandler(), e.paused = !e.options.autoplay, e.autoPlay(), e.$slider.trigger("reInit", [e])
    }, e.prototype.resize = function () {
        var e = this;
        i(window).width() !== e.windowWidth && (clearTimeout(e.windowDelay), e.windowDelay = window.setTimeout(function () {
            e.windowWidth = i(window).width(), e.checkResponsive(), e.unslicked || e.setPosition()
        }, 50))
    }, e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
        var o = this;
        return "boolean" == typeof i ? (e = i, i = e === !0 ? 0 : o.slideCount - 1) : i = e === !0 ? --i : i, o.slideCount < 1 || 0 > i || i > o.slideCount - 1 ? !1 : (o.unload(), t === !0 ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(i).remove(), o.$slides = o.$slideTrack.children(this.options.slide), o.$slideTrack.children(this.options.slide).detach(), o.$slideTrack.append(o.$slides), o.$slidesCache = o.$slides, void o.reinit())
    }, e.prototype.setCSS = function (i) {
        var e, t, o = this, s = {};
        o.options.rtl === !0 && (i = -i), e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px", t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px", s[o.positionProp] = i, o.transformsEnabled === !1 ? o.$slideTrack.css(s) : (s = {}, o.cssTransitions === !1 ? (s[o.animType] = "translate(" + e + ", " + t + ")", o.$slideTrack.css(s)) : (s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)", o.$slideTrack.css(s)))
    }, e.prototype.setDimensions = function () {
        var i = this;
        i.options.vertical === !1 ? i.options.centerMode === !0 && i.$list.css({padding: "0px " + i.options.centerPadding}) : (i.$list.height(i.$slides.first().outerHeight(!0) * i.options.slidesToShow), i.options.centerMode === !0 && i.$list.css({padding: i.options.centerPadding + " 0px"})), i.listWidth = i.$list.width(), i.listHeight = i.$list.height(), i.options.vertical === !1 && i.options.variableWidth === !1 ? (i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow), i.$slideTrack.width(Math.ceil(i.slideWidth * i.$slideTrack.children(".slick-slide").length))) : i.options.variableWidth === !0 ? i.$slideTrack.width(5e3 * i.slideCount) : (i.slideWidth = Math.ceil(i.listWidth), i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0) * i.$slideTrack.children(".slick-slide").length)));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        i.options.variableWidth === !1 && i.$slideTrack.children(".slick-slide").width(i.slideWidth - e)
    }, e.prototype.setFade = function () {
        var e, t = this;
        t.$slides.each(function (o, s) {
            e = t.slideWidth * o * -1, t.options.rtl === !0 ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0
            }) : i(s).css({position: "relative", left: e, top: 0, zIndex: t.options.zIndex - 2, opacity: 0})
        }), t.$slides.eq(t.currentSlide).css({zIndex: t.options.zIndex - 1, opacity: 1})
    }, e.prototype.setHeight = function () {
        var i = this;
        if (1 === i.options.slidesToShow && i.options.adaptiveHeight === !0 && i.options.vertical === !1) {
            var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
            i.$list.css("height", e)
        }
    }, e.prototype.setOption = e.prototype.slickSetOption = function () {
        var e, t, o, s, n, r = this, l = !1;
        if ("object" === i.type(arguments[0]) ? (o = arguments[0], l = arguments[1], n = "multiple") : "string" === i.type(arguments[0]) && (o = arguments[0], s = arguments[1], l = arguments[2], "responsive" === arguments[0] && "array" === i.type(arguments[1]) ? n = "responsive" : "undefined" != typeof arguments[1] && (n = "single")), "single" === n)r.options[o] = s; else if ("multiple" === n)i.each(o, function (i, e) {
            r.options[i] = e
        }); else if ("responsive" === n)for (t in s)if ("array" !== i.type(r.options.responsive))r.options.responsive = [s[t]]; else {
            for (e = r.options.responsive.length - 1; e >= 0;)r.options.responsive[e].breakpoint === s[t].breakpoint && r.options.responsive.splice(e, 1), e--;
            r.options.responsive.push(s[t])
        }
        l && (r.unload(), r.reinit())
    }, e.prototype.setPosition = function () {
        var i = this;
        i.setDimensions(), i.setHeight(), i.options.fade === !1 ? i.setCSS(i.getLeft(i.currentSlide)) : i.setFade(), i.$slider.trigger("setPosition", [i])
    }, e.prototype.setProps = function () {
        var i = this, e = document.body.style;
        i.positionProp = i.options.vertical === !0 ? "top" : "left", "top" === i.positionProp ? i.$slider.addClass("slick-vertical") : i.$slider.removeClass("slick-vertical"), (void 0 !== e.WebkitTransition || void 0 !== e.MozTransition || void 0 !== e.msTransition) && i.options.useCSS === !0 && (i.cssTransitions = !0), i.options.fade && ("number" == typeof i.options.zIndex ? i.options.zIndex < 3 && (i.options.zIndex = 3) : i.options.zIndex = i.defaults.zIndex), void 0 !== e.OTransform && (i.animType = "OTransform", i.transformType = "-o-transform", i.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.MozTransform && (i.animType = "MozTransform", i.transformType = "-moz-transform", i.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (i.animType = !1)), void 0 !== e.webkitTransform && (i.animType = "webkitTransform", i.transformType = "-webkit-transform", i.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (i.animType = !1)), void 0 !== e.msTransform && (i.animType = "msTransform", i.transformType = "-ms-transform", i.transitionType = "msTransition", void 0 === e.msTransform && (i.animType = !1)), void 0 !== e.transform && i.animType !== !1 && (i.animType = "transform", i.transformType = "transform", i.transitionType = "transition"), i.transformsEnabled = i.options.useTransform && null !== i.animType && i.animType !== !1
    }, e.prototype.setSlideClasses = function (i) {
        var e, t, o, s, n = this;
        t = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(i).addClass("slick-current"), n.options.centerMode === !0 ? (e = Math.floor(n.options.slidesToShow / 2), n.options.infinite === !0 && (i >= e && i <= n.slideCount - 1 - e ? n.$slides.slice(i - e, i + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + i,
            t.slice(o - e + 1, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === i ? t.eq(t.length - 1 - n.options.slidesToShow).addClass("slick-center") : i === n.slideCount - 1 && t.eq(n.options.slidesToShow).addClass("slick-center")), n.$slides.eq(i).addClass("slick-center")) : i >= 0 && i <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(i, i + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : t.length <= n.options.slidesToShow ? t.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = n.options.infinite === !0 ? n.options.slidesToShow + i : i, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - i < n.options.slidesToShow ? t.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : t.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === n.options.lazyLoad && n.lazyLoad()
    }, e.prototype.setupInfinite = function () {
        var e, t, o, s = this;
        if (s.options.fade === !0 && (s.options.centerMode = !1), s.options.infinite === !0 && s.options.fade === !1 && (t = null, s.slideCount > s.options.slidesToShow)) {
            for (o = s.options.centerMode === !0 ? s.options.slidesToShow + 1 : s.options.slidesToShow, e = s.slideCount; e > s.slideCount - o; e -= 1)t = e - 1, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t - s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");
            for (e = 0; o > e; e += 1)t = e, i(s.$slides[t]).clone(!0).attr("id", "").attr("data-slick-index", t + s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");
            s.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                i(this).attr("id", "")
            })
        }
    }, e.prototype.interrupt = function (i) {
        var e = this;
        i || e.autoPlay(), e.interrupted = i
    }, e.prototype.selectHandler = function (e) {
        var t = this, o = i(e.target).is(".slick-slide") ? i(e.target) : i(e.target).parents(".slick-slide"), s = parseInt(o.attr("data-slick-index"));
        return s || (s = 0), t.slideCount <= t.options.slidesToShow ? (t.setSlideClasses(s), void t.asNavFor(s)) : void t.slideHandler(s)
    }, e.prototype.slideHandler = function (i, e, t) {
        var o, s, n, r, l, a = null, d = this;
        return e = e || !1, d.animating === !0 && d.options.waitForAnimate === !0 || d.options.fade === !0 && d.currentSlide === i || d.slideCount <= d.options.slidesToShow ? void 0 : (e === !1 && d.asNavFor(i), o = i, a = d.getLeft(o), r = d.getLeft(d.currentSlide), d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft, d.options.infinite === !1 && d.options.centerMode === !1 && (0 > i || i > d.getDotCount() * d.options.slidesToScroll) ? void(d.options.fade === !1 && (o = d.currentSlide, t !== !0 ? d.animateSlide(r, function () {
            d.postSlide(o)
        }) : d.postSlide(o))) : d.options.infinite === !1 && d.options.centerMode === !0 && (0 > i || i > d.slideCount - d.options.slidesToScroll) ? void(d.options.fade === !1 && (o = d.currentSlide, t !== !0 ? d.animateSlide(r, function () {
            d.postSlide(o)
        }) : d.postSlide(o))) : (d.options.autoplay && clearInterval(d.autoPlayTimer), s = 0 > o ? d.slideCount % d.options.slidesToScroll !== 0 ? d.slideCount - d.slideCount % d.options.slidesToScroll : d.slideCount + o : o >= d.slideCount ? d.slideCount % d.options.slidesToScroll !== 0 ? 0 : o - d.slideCount : o, d.animating = !0, d.$slider.trigger("beforeChange", [d, d.currentSlide, s]), n = d.currentSlide, d.currentSlide = s, d.setSlideClasses(d.currentSlide), d.options.asNavFor && (l = d.getNavTarget(), l = l.slick("getSlick"), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(d.currentSlide)), d.updateDots(), d.updateArrows(), d.options.fade === !0 ? (t !== !0 ? (d.fadeSlideOut(n), d.fadeSlide(s, function () {
            d.postSlide(s)
        })) : d.postSlide(s), void d.animateHeight()) : void(t !== !0 ? d.animateSlide(a, function () {
            d.postSlide(s)
        }) : d.postSlide(s))))
    }, e.prototype.startLoad = function () {
        var i = this;
        i.options.arrows === !0 && i.slideCount > i.options.slidesToShow && (i.$prevArrow.hide(), i.$nextArrow.hide()), i.options.dots === !0 && i.slideCount > i.options.slidesToShow && i.$dots.hide(), i.$slider.addClass("slick-loading")
    }, e.prototype.swipeDirection = function () {
        var i, e, t, o, s = this;
        return i = s.touchObject.startX - s.touchObject.curX, e = s.touchObject.startY - s.touchObject.curY, t = Math.atan2(e, i), o = Math.round(180 * t / Math.PI), 0 > o && (o = 360 - Math.abs(o)), 45 >= o && o >= 0 ? s.options.rtl === !1 ? "left" : "right" : 360 >= o && o >= 315 ? s.options.rtl === !1 ? "left" : "right" : o >= 135 && 225 >= o ? s.options.rtl === !1 ? "right" : "left" : s.options.verticalSwiping === !0 ? o >= 35 && 135 >= o ? "down" : "up" : "vertical"
    }, e.prototype.swipeEnd = function (i) {
        var e, t, o = this;
        if (o.dragging = !1, o.interrupted = !1, o.shouldClick = o.touchObject.swipeLength > 10 ? !1 : !0, void 0 === o.touchObject.curX)return !1;
        if (o.touchObject.edgeHit === !0 && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
            switch (t = o.swipeDirection()) {
                case"left":
                case"down":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(), o.currentDirection = 0;
                    break;
                case"right":
                case"up":
                    e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(), o.currentDirection = 1
            }
            "vertical" != t && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, t]))
        } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
    }, e.prototype.swipeHandler = function (i) {
        var e = this;
        if (!(e.options.swipe === !1 || "ontouchend" in document && e.options.swipe === !1 || e.options.draggable === !1 && -1 !== i.type.indexOf("mouse")))switch (e.touchObject.fingerCount = i.originalEvent && void 0 !== i.originalEvent.touches ? i.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, e.options.verticalSwiping === !0 && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), i.data.action) {
            case"start":
                e.swipeStart(i);
                break;
            case"move":
                e.swipeMove(i);
                break;
            case"end":
                e.swipeEnd(i)
        }
    }, e.prototype.swipeMove = function (i) {
        var e, t, o, s, n, r = this;
        return n = void 0 !== i.originalEvent ? i.originalEvent.touches : null, !r.dragging || n && 1 !== n.length ? !1 : (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), r.options.verticalSwiping === !0 && (r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2)))), t = r.swipeDirection(), "vertical" !== t ? (void 0 !== i.originalEvent && r.touchObject.swipeLength > 4 && i.preventDefault(), s = (r.options.rtl === !1 ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), r.options.verticalSwiping === !0 && (s = r.touchObject.curY > r.touchObject.startY ? 1 : -1), o = r.touchObject.swipeLength, r.touchObject.edgeHit = !1, r.options.infinite === !1 && (0 === r.currentSlide && "right" === t || r.currentSlide >= r.getDotCount() && "left" === t) && (o = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), r.options.vertical === !1 ? r.swipeLeft = e + o * s : r.swipeLeft = e + o * (r.$list.height() / r.listWidth) * s, r.options.verticalSwiping === !0 && (r.swipeLeft = e + o * s), r.options.fade === !0 || r.options.touchMove === !1 ? !1 : r.animating === !0 ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft)) : void 0)
    }, e.prototype.swipeStart = function (i) {
        var e, t = this;
        return t.interrupted = !0, 1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== i.originalEvent && void 0 !== i.originalEvent.touches && (e = i.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== e ? e.pageX : i.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== e ? e.pageY : i.clientY, void(t.dragging = !0))
    }, e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var i = this;
        null !== i.$slidesCache && (i.unload(), i.$slideTrack.children(this.options.slide).detach(), i.$slidesCache.appendTo(i.$slideTrack), i.reinit())
    }, e.prototype.unload = function () {
        var e = this;
        i(".slick-cloned", e.$slider).remove(), e.$dots && e.$dots.remove(), e.$prevArrow && e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove(), e.$nextArrow && e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove(), e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, e.prototype.unslick = function (i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy()
    }, e.prototype.updateArrows = function () {
        var i, e = this;
        i = Math.floor(e.options.slidesToShow / 2), e.options.arrows === !0 && e.slideCount > e.options.slidesToShow && !e.options.infinite && (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === e.currentSlide ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - e.options.slidesToShow && e.options.centerMode === !1 ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : e.currentSlide >= e.slideCount - 1 && e.options.centerMode === !0 && (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, e.prototype.updateDots = function () {
        var i = this;
        null !== i.$dots && (i.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), i.$dots.find("li").eq(Math.floor(i.currentSlide / i.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, e.prototype.visibility = function () {
        var i = this;
        i.options.autoplay && (document[i.hidden] ? i.interrupted = !0 : i.interrupted = !1)
    }, i.fn.slick = function () {
        var i, t, o = this, s = arguments[0], n = Array.prototype.slice.call(arguments, 1), r = o.length;
        for (i = 0; r > i; i++)if ("object" == typeof s || "undefined" == typeof s ? o[i].slick = new e(o[i], s) : t = o[i].slick[s].apply(o[i].slick, n), "undefined" != typeof t)return t;
        return o
    }
});
/**
 * Particles.js v2.0.0
 * GitHub : github.com/VincentGarreau/particles.js
 * Author : Vincent Garreau  - vincentgarreau.com
 * ===================================================================
 */
function hexToRgb(e) {
    var a = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    e = e.replace(a, function (e, a, t, i) {
        return a + a + t + t + i + i
    });
    var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return t ? {r: parseInt(t[1], 16), g: parseInt(t[2], 16), b: parseInt(t[3], 16)} : null
}
function clamp(e, a, t) {
    return Math.min(Math.max(e, a), t)
}
function isInArray(e, a) {
    return a.indexOf(e) > -1
}
var pJS = function (e, a) {
    var t = document.querySelector("#" + e + " > .particles-js-canvas-el");
    this.pJS = {
        canvas: {el: t, w: t.offsetWidth, h: t.offsetHeight},
        particles: {
            number: {value: 400, density: {enable: !0, value_area: 800}},
            color: {value: "#fff"},
            shape: {
                type: "circle",
                stroke: {width: 0, color: "#ff0000"},
                polygon: {nb_sides: 5},
                image: {src: "", width: 100, height: 100}
            },
            opacity: {value: 1, random: !1, anim: {enable: !1, speed: 2, opacity_min: 0, sync: !1}},
            size: {value: 20, random: !1, anim: {enable: !1, speed: 20, size_min: 0, sync: !1}},
            line_linked: {enable: !0, distance: 100, color: "#fff", opacity: 1, width: 1},
            move: {
                enable: !0,
                speed: 2,
                direction: "none",
                random: !1,
                straight: !1,
                out_mode: "out",
                bounce: !1,
                attract: {enable: !1, rotateX: 3e3, rotateY: 3e3}
            },
            array: []
        },
        interactivity: {
            detect_on: "canvas",
            events: {onhover: {enable: !0, mode: "grab"}, onclick: {enable: !0, mode: "push"}, resize: !0},
            modes: {
                grab: {distance: 100, line_linked: {opacity: 1}},
                bubble: {distance: 200, size: 80, duration: .4},
                repulse: {distance: 200, duration: .4},
                push: {particles_nb: 4},
                remove: {particles_nb: 2}
            },
            mouse: {}
        },
        retina_detect: !1,
        fn: {interact: {}, modes: {}, vendors: {}},
        tmp: {}
    };
    var i = this.pJS;
    a && Object.deepExtend(i, a), i.tmp.obj = {
        size_value: i.particles.size.value,
        size_anim_speed: i.particles.size.anim.speed,
        move_speed: i.particles.move.speed,
        line_linked_distance: i.particles.line_linked.distance,
        line_linked_width: i.particles.line_linked.width,
        mode_grab_distance: i.interactivity.modes.grab.distance,
        mode_bubble_distance: i.interactivity.modes.bubble.distance,
        mode_bubble_size: i.interactivity.modes.bubble.size,
        mode_repulse_distance: i.interactivity.modes.repulse.distance
    }, i.fn.retinaInit = function () {
        i.retina_detect && window.devicePixelRatio > 1 ? (i.canvas.pxratio = window.devicePixelRatio, i.tmp.retina = !0) : (i.canvas.pxratio = 1, i.tmp.retina = !1), i.canvas.w = i.canvas.el.offsetWidth * i.canvas.pxratio, i.canvas.h = i.canvas.el.offsetHeight * i.canvas.pxratio, i.particles.size.value = i.tmp.obj.size_value * i.canvas.pxratio, i.particles.size.anim.speed = i.tmp.obj.size_anim_speed * i.canvas.pxratio, i.particles.move.speed = i.tmp.obj.move_speed * i.canvas.pxratio, i.particles.line_linked.distance = i.tmp.obj.line_linked_distance * i.canvas.pxratio, i.interactivity.modes.grab.distance = i.tmp.obj.mode_grab_distance * i.canvas.pxratio, i.interactivity.modes.bubble.distance = i.tmp.obj.mode_bubble_distance * i.canvas.pxratio, i.particles.line_linked.width = i.tmp.obj.line_linked_width * i.canvas.pxratio, i.interactivity.modes.bubble.size = i.tmp.obj.mode_bubble_size * i.canvas.pxratio, i.interactivity.modes.repulse.distance = i.tmp.obj.mode_repulse_distance * i.canvas.pxratio
    }, i.fn.canvasInit = function () {
        i.canvas.ctx = i.canvas.el.getContext("2d")
    }, i.fn.canvasSize = function () {
        i.canvas.el.width = i.canvas.w, i.canvas.el.height = i.canvas.h, i && i.interactivity.events.resize && window.addEventListener("resize", function () {
            i.canvas.w = i.canvas.el.offsetWidth, i.canvas.h = i.canvas.el.offsetHeight, i.tmp.retina && (i.canvas.w *= i.canvas.pxratio, i.canvas.h *= i.canvas.pxratio), i.canvas.el.width = i.canvas.w, i.canvas.el.height = i.canvas.h, i.particles.move.enable || (i.fn.particlesEmpty(), i.fn.particlesCreate(), i.fn.particlesDraw(), i.fn.vendors.densityAutoParticles()), i.fn.vendors.densityAutoParticles()
        })
    }, i.fn.canvasPaint = function () {
        i.canvas.ctx.fillRect(0, 0, i.canvas.w, i.canvas.h)
    }, i.fn.canvasClear = function () {
        i.canvas.ctx.clearRect(0, 0, i.canvas.w, i.canvas.h)
    }, i.fn.particle = function (e, a, t) {
        if (this.radius = (i.particles.size.random ? Math.random() : 1) * i.particles.size.value, i.particles.size.anim.enable && (this.size_status = !1, this.vs = i.particles.size.anim.speed / 100, i.particles.size.anim.sync || (this.vs = this.vs * Math.random())), this.x = t ? t.x : Math.random() * i.canvas.w, this.y = t ? t.y : Math.random() * i.canvas.h, this.x > i.canvas.w - 2 * this.radius ? this.x = this.x - this.radius : this.x < 2 * this.radius && (this.x = this.x + this.radius), this.y > i.canvas.h - 2 * this.radius ? this.y = this.y - this.radius : this.y < 2 * this.radius && (this.y = this.y + this.radius), i.particles.move.bounce && i.fn.vendors.checkOverlap(this, t), this.color = {}, "object" == typeof e.value)if (e.value instanceof Array) {
            var s = e.value[Math.floor(Math.random() * i.particles.color.value.length)];
            this.color.rgb = hexToRgb(s)
        } else void 0 != e.value.r && void 0 != e.value.g && void 0 != e.value.b && (this.color.rgb = {
            r: e.value.r,
            g: e.value.g,
            b: e.value.b
        }), void 0 != e.value.h && void 0 != e.value.s && void 0 != e.value.l && (this.color.hsl = {
            h: e.value.h,
            s: e.value.s,
            l: e.value.l
        }); else"random" == e.value ? this.color.rgb = {
            r: Math.floor(256 * Math.random()) + 0,
            g: Math.floor(256 * Math.random()) + 0,
            b: Math.floor(256 * Math.random()) + 0
        } : "string" == typeof e.value && (this.color = e, this.color.rgb = hexToRgb(this.color.value));
        this.opacity = (i.particles.opacity.random ? Math.random() : 1) * i.particles.opacity.value, i.particles.opacity.anim.enable && (this.opacity_status = !1, this.vo = i.particles.opacity.anim.speed / 100, i.particles.opacity.anim.sync || (this.vo = this.vo * Math.random()));
        var n = {};
        switch (i.particles.move.direction) {
            case"top":
                n = {x: 0, y: -1};
                break;
            case"top-right":
                n = {x: .5, y: -.5};
                break;
            case"right":
                n = {x: 1, y: -0};
                break;
            case"bottom-right":
                n = {x: .5, y: .5};
                break;
            case"bottom":
                n = {x: 0, y: 1};
                break;
            case"bottom-left":
                n = {x: -.5, y: 1};
                break;
            case"left":
                n = {x: -1, y: 0};
                break;
            case"top-left":
                n = {x: -.5, y: -.5};
                break;
            default:
                n = {x: 0, y: 0}
        }
        i.particles.move.straight ? (this.vx = n.x, this.vy = n.y, i.particles.move.random && (this.vx = this.vx * Math.random(), this.vy = this.vy * Math.random())) : (this.vx = n.x + Math.random() - .5, this.vy = n.y + Math.random() - .5), this.vx_i = this.vx, this.vy_i = this.vy;
        var r = i.particles.shape.type;
        if ("object" == typeof r) {
            if (r instanceof Array) {
                var c = r[Math.floor(Math.random() * r.length)];
                this.shape = c
            }
        } else this.shape = r;
        if ("image" == this.shape) {
            var o = i.particles.shape;
            this.img = {
                src: o.image.src,
                ratio: o.image.width / o.image.height
            }, this.img.ratio || (this.img.ratio = 1), "svg" == i.tmp.img_type && void 0 != i.tmp.source_svg && (i.fn.vendors.createSvgImg(this), i.tmp.pushing && (this.img.loaded = !1))
        }
    }, i.fn.particle.prototype.draw = function () {
        function e() {
            i.canvas.ctx.drawImage(r, a.x - t, a.y - t, 2 * t, 2 * t / a.img.ratio)
        }

        var a = this;
        if (void 0 != a.radius_bubble)var t = a.radius_bubble; else var t = a.radius;
        if (void 0 != a.opacity_bubble)var s = a.opacity_bubble; else var s = a.opacity;
        if (a.color.rgb)var n = "rgba(" + a.color.rgb.r + "," + a.color.rgb.g + "," + a.color.rgb.b + "," + s + ")"; else var n = "hsla(" + a.color.hsl.h + "," + a.color.hsl.s + "%," + a.color.hsl.l + "%," + s + ")";
        switch (i.canvas.ctx.fillStyle = n, i.canvas.ctx.beginPath(), a.shape) {
            case"circle":
                i.canvas.ctx.arc(a.x, a.y, t, 0, 2 * Math.PI, !1);
                break;
            case"edge":
                i.canvas.ctx.rect(a.x - t, a.y - t, 2 * t, 2 * t);
                break;
            case"triangle":
                i.fn.vendors.drawShape(i.canvas.ctx, a.x - t, a.y + t / 1.66, 2 * t, 3, 2);
                break;
            case"polygon":
                i.fn.vendors.drawShape(i.canvas.ctx, a.x - t / (i.particles.shape.polygon.nb_sides / 3.5), a.y - t / .76, 2.66 * t / (i.particles.shape.polygon.nb_sides / 3), i.particles.shape.polygon.nb_sides, 1);
                break;
            case"star":
                i.fn.vendors.drawShape(i.canvas.ctx, a.x - 2 * t / (i.particles.shape.polygon.nb_sides / 4), a.y - t / 1.52, 2 * t * 2.66 / (i.particles.shape.polygon.nb_sides / 3), i.particles.shape.polygon.nb_sides, 2);
                break;
            case"image":
                if ("svg" == i.tmp.img_type)var r = a.img.obj; else var r = i.tmp.img_obj;
                r && e()
        }
        i.canvas.ctx.closePath(), i.particles.shape.stroke.width > 0 && (i.canvas.ctx.strokeStyle = i.particles.shape.stroke.color, i.canvas.ctx.lineWidth = i.particles.shape.stroke.width, i.canvas.ctx.stroke()), i.canvas.ctx.fill()
    }, i.fn.particlesCreate = function () {
        for (var e = 0; e < i.particles.number.value; e++)i.particles.array.push(new i.fn.particle(i.particles.color, i.particles.opacity.value))
    }, i.fn.particlesUpdate = function () {
        for (var e = 0; e < i.particles.array.length; e++) {
            var a = i.particles.array[e];
            if (i.particles.move.enable) {
                var t = i.particles.move.speed / 2;
                a.x += a.vx * t, a.y += a.vy * t
            }
            if (i.particles.opacity.anim.enable && (1 == a.opacity_status ? (a.opacity >= i.particles.opacity.value && (a.opacity_status = !1), a.opacity += a.vo) : (a.opacity <= i.particles.opacity.anim.opacity_min && (a.opacity_status = !0), a.opacity -= a.vo), a.opacity < 0 && (a.opacity = 0)), i.particles.size.anim.enable && (1 == a.size_status ? (a.radius >= i.particles.size.value && (a.size_status = !1), a.radius += a.vs) : (a.radius <= i.particles.size.anim.size_min && (a.size_status = !0), a.radius -= a.vs), a.radius < 0 && (a.radius = 0)), "bounce" == i.particles.move.out_mode)var s = {
                x_left: a.radius,
                x_right: i.canvas.w,
                y_top: a.radius,
                y_bottom: i.canvas.h
            }; else var s = {
                x_left: -a.radius,
                x_right: i.canvas.w + a.radius,
                y_top: -a.radius,
                y_bottom: i.canvas.h + a.radius
            };
            switch (a.x - a.radius > i.canvas.w ? (a.x = s.x_left, a.y = Math.random() * i.canvas.h) : a.x + a.radius < 0 && (a.x = s.x_right, a.y = Math.random() * i.canvas.h), a.y - a.radius > i.canvas.h ? (a.y = s.y_top, a.x = Math.random() * i.canvas.w) : a.y + a.radius < 0 && (a.y = s.y_bottom, a.x = Math.random() * i.canvas.w), i.particles.move.out_mode) {
                case"bounce":
                    a.x + a.radius > i.canvas.w ? a.vx = -a.vx : a.x - a.radius < 0 && (a.vx = -a.vx), a.y + a.radius > i.canvas.h ? a.vy = -a.vy : a.y - a.radius < 0 && (a.vy = -a.vy)
            }
            if (isInArray("grab", i.interactivity.events.onhover.mode) && i.fn.modes.grabParticle(a), (isInArray("bubble", i.interactivity.events.onhover.mode) || isInArray("bubble", i.interactivity.events.onclick.mode)) && i.fn.modes.bubbleParticle(a), (isInArray("repulse", i.interactivity.events.onhover.mode) || isInArray("repulse", i.interactivity.events.onclick.mode)) && i.fn.modes.repulseParticle(a), i.particles.line_linked.enable || i.particles.move.attract.enable)for (var n = e + 1; n < i.particles.array.length; n++) {
                var r = i.particles.array[n];
                i.particles.line_linked.enable && i.fn.interact.linkParticles(a, r), i.particles.move.attract.enable && i.fn.interact.attractParticles(a, r), i.particles.move.bounce && i.fn.interact.bounceParticles(a, r)
            }
        }
    }, i.fn.particlesDraw = function () {
        i.canvas.ctx.clearRect(0, 0, i.canvas.w, i.canvas.h), i.fn.particlesUpdate();
        for (var e = 0; e < i.particles.array.length; e++) {
            var a = i.particles.array[e];
            a.draw()
        }
    }, i.fn.particlesEmpty = function () {
        i.particles.array = []
    }, i.fn.particlesRefresh = function () {
        cancelRequestAnimFrame(i.fn.checkAnimFrame), cancelRequestAnimFrame(i.fn.drawAnimFrame), i.tmp.source_svg = void 0, i.tmp.img_obj = void 0, i.tmp.count_svg = 0, i.fn.particlesEmpty(), i.fn.canvasClear(), i.fn.vendors.start()
    }, i.fn.interact.linkParticles = function (e, a) {
        var t = e.x - a.x, s = e.y - a.y, n = Math.sqrt(t * t + s * s);
        if (n <= i.particles.line_linked.distance) {
            var r = i.particles.line_linked.opacity - n / (1 / i.particles.line_linked.opacity) / i.particles.line_linked.distance;
            if (r > 0) {
                var c = i.particles.line_linked.color_rgb_line;
                i.canvas.ctx.strokeStyle = "rgba(" + c.r + "," + c.g + "," + c.b + "," + r + ")", i.canvas.ctx.lineWidth = i.particles.line_linked.width, i.canvas.ctx.beginPath(), i.canvas.ctx.moveTo(e.x, e.y), i.canvas.ctx.lineTo(a.x, a.y), i.canvas.ctx.stroke(), i.canvas.ctx.closePath()
            }
        }
    }, i.fn.interact.attractParticles = function (e, a) {
        var t = e.x - a.x, s = e.y - a.y, n = Math.sqrt(t * t + s * s);
        if (n <= i.particles.line_linked.distance) {
            var r = t / (1e3 * i.particles.move.attract.rotateX), c = s / (1e3 * i.particles.move.attract.rotateY);
            e.vx -= r, e.vy -= c, a.vx += r, a.vy += c
        }
    }, i.fn.interact.bounceParticles = function (e, a) {
        var t = e.x - a.x, i = e.y - a.y, s = Math.sqrt(t * t + i * i), n = e.radius + a.radius;
        n >= s && (e.vx = -e.vx, e.vy = -e.vy, a.vx = -a.vx, a.vy = -a.vy)
    }, i.fn.modes.pushParticles = function (e, a) {
        i.tmp.pushing = !0;
        for (var t = 0; e > t; t++)i.particles.array.push(new i.fn.particle(i.particles.color, i.particles.opacity.value, {
            x: a ? a.pos_x : Math.random() * i.canvas.w,
            y: a ? a.pos_y : Math.random() * i.canvas.h
        })), t == e - 1 && (i.particles.move.enable || i.fn.particlesDraw(), i.tmp.pushing = !1)
    }, i.fn.modes.removeParticles = function (e) {
        i.particles.array.splice(0, e), i.particles.move.enable || i.fn.particlesDraw()
    }, i.fn.modes.bubbleParticle = function (e) {
        function a() {
            e.opacity_bubble = e.opacity, e.radius_bubble = e.radius
        }

        function t(a, t, s, n, c) {
            if (a != t)if (i.tmp.bubble_duration_end) {
                if (void 0 != s) {
                    var o = n - p * (n - a) / i.interactivity.modes.bubble.duration, l = a - o;
                    d = a + l, "size" == c && (e.radius_bubble = d), "opacity" == c && (e.opacity_bubble = d)
                }
            } else if (r <= i.interactivity.modes.bubble.distance) {
                if (void 0 != s)var v = s; else var v = n;
                if (v != a) {
                    var d = n - p * (n - a) / i.interactivity.modes.bubble.duration;
                    "size" == c && (e.radius_bubble = d), "opacity" == c && (e.opacity_bubble = d)
                }
            } else"size" == c && (e.radius_bubble = void 0), "opacity" == c && (e.opacity_bubble = void 0)
        }

        if (i.interactivity.events.onhover.enable && isInArray("bubble", i.interactivity.events.onhover.mode)) {
            var s = e.x - i.interactivity.mouse.pos_x, n = e.y - i.interactivity.mouse.pos_y, r = Math.sqrt(s * s + n * n), c = 1 - r / i.interactivity.modes.bubble.distance;
            if (r <= i.interactivity.modes.bubble.distance) {
                if (c >= 0 && "mousemove" == i.interactivity.status) {
                    if (i.interactivity.modes.bubble.size != i.particles.size.value)if (i.interactivity.modes.bubble.size > i.particles.size.value) {
                        var o = e.radius + i.interactivity.modes.bubble.size * c;
                        o >= 0 && (e.radius_bubble = o)
                    } else {
                        var l = e.radius - i.interactivity.modes.bubble.size, o = e.radius - l * c;
                        o > 0 ? e.radius_bubble = o : e.radius_bubble = 0
                    }
                    if (i.interactivity.modes.bubble.opacity != i.particles.opacity.value)if (i.interactivity.modes.bubble.opacity > i.particles.opacity.value) {
                        var v = i.interactivity.modes.bubble.opacity * c;
                        v > e.opacity && v <= i.interactivity.modes.bubble.opacity && (e.opacity_bubble = v)
                    } else {
                        var v = e.opacity - (i.particles.opacity.value - i.interactivity.modes.bubble.opacity) * c;
                        v < e.opacity && v >= i.interactivity.modes.bubble.opacity && (e.opacity_bubble = v)
                    }
                }
            } else a();
            "mouseleave" == i.interactivity.status && a()
        } else if (i.interactivity.events.onclick.enable && isInArray("bubble", i.interactivity.events.onclick.mode)) {
            if (i.tmp.bubble_clicking) {
                var s = e.x - i.interactivity.mouse.click_pos_x, n = e.y - i.interactivity.mouse.click_pos_y, r = Math.sqrt(s * s + n * n), p = ((new Date).getTime() - i.interactivity.mouse.click_time) / 1e3;
                p > i.interactivity.modes.bubble.duration && (i.tmp.bubble_duration_end = !0), p > 2 * i.interactivity.modes.bubble.duration && (i.tmp.bubble_clicking = !1, i.tmp.bubble_duration_end = !1)
            }
            i.tmp.bubble_clicking && (t(i.interactivity.modes.bubble.size, i.particles.size.value, e.radius_bubble, e.radius, "size"), t(i.interactivity.modes.bubble.opacity, i.particles.opacity.value, e.opacity_bubble, e.opacity, "opacity"))
        }
    }, i.fn.modes.repulseParticle = function (e) {
        function a() {
            var a = Math.atan2(d, p);
            if (e.vx = u * Math.cos(a), e.vy = u * Math.sin(a), "bounce" == i.particles.move.out_mode) {
                var t = {x: e.x + e.vx, y: e.y + e.vy};
                t.x + e.radius > i.canvas.w ? e.vx = -e.vx : t.x - e.radius < 0 && (e.vx = -e.vx), t.y + e.radius > i.canvas.h ? e.vy = -e.vy : t.y - e.radius < 0 && (e.vy = -e.vy)
            }
        }

        if (i.interactivity.events.onhover.enable && isInArray("repulse", i.interactivity.events.onhover.mode) && "mousemove" == i.interactivity.status) {
            var t = e.x - i.interactivity.mouse.pos_x, s = e.y - i.interactivity.mouse.pos_y, n = Math.sqrt(t * t + s * s), r = {
                x: t / n,
                y: s / n
            }, c = i.interactivity.modes.repulse.distance, o = 100, l = clamp(1 / c * (-1 * Math.pow(n / c, 2) + 1) * c * o, 0, 50), v = {
                x: e.x + r.x * l,
                y: e.y + r.y * l
            };
            "bounce" == i.particles.move.out_mode ? (v.x - e.radius > 0 && v.x + e.radius < i.canvas.w && (e.x = v.x), v.y - e.radius > 0 && v.y + e.radius < i.canvas.h && (e.y = v.y)) : (e.x = v.x, e.y = v.y)
        } else if (i.interactivity.events.onclick.enable && isInArray("repulse", i.interactivity.events.onclick.mode))if (i.tmp.repulse_finish || (i.tmp.repulse_count++, i.tmp.repulse_count == i.particles.array.length && (i.tmp.repulse_finish = !0)), i.tmp.repulse_clicking) {
            var c = Math.pow(i.interactivity.modes.repulse.distance / 6, 3), p = i.interactivity.mouse.click_pos_x - e.x, d = i.interactivity.mouse.click_pos_y - e.y, m = p * p + d * d, u = -c / m * 1;
            c >= m && a()
        } else 0 == i.tmp.repulse_clicking && (e.vx = e.vx_i, e.vy = e.vy_i)
    }, i.fn.modes.grabParticle = function (e) {
        if (i.interactivity.events.onhover.enable && "mousemove" == i.interactivity.status) {
            var a = e.x - i.interactivity.mouse.pos_x, t = e.y - i.interactivity.mouse.pos_y, s = Math.sqrt(a * a + t * t);
            if (s <= i.interactivity.modes.grab.distance) {
                var n = i.interactivity.modes.grab.line_linked.opacity - s / (1 / i.interactivity.modes.grab.line_linked.opacity) / i.interactivity.modes.grab.distance;
                if (n > 0) {
                    var r = i.particles.line_linked.color_rgb_line;
                    i.canvas.ctx.strokeStyle = "rgba(" + r.r + "," + r.g + "," + r.b + "," + n + ")", i.canvas.ctx.lineWidth = i.particles.line_linked.width, i.canvas.ctx.beginPath(), i.canvas.ctx.moveTo(e.x, e.y), i.canvas.ctx.lineTo(i.interactivity.mouse.pos_x, i.interactivity.mouse.pos_y), i.canvas.ctx.stroke(), i.canvas.ctx.closePath()
                }
            }
        }
    }, i.fn.vendors.eventsListeners = function () {
        "window" == i.interactivity.detect_on ? i.interactivity.el = window : i.interactivity.el = i.canvas.el, (i.interactivity.events.onhover.enable || i.interactivity.events.onclick.enable) && (i.interactivity.el.addEventListener("mousemove", function (e) {
            if (i.interactivity.el == window)var a = e.clientX, t = e.clientY; else var a = e.offsetX || e.clientX, t = e.offsetY || e.clientY;
            i.interactivity.mouse.pos_x = a, i.interactivity.mouse.pos_y = t, i.tmp.retina && (i.interactivity.mouse.pos_x *= i.canvas.pxratio, i.interactivity.mouse.pos_y *= i.canvas.pxratio), i.interactivity.status = "mousemove"
        }), i.interactivity.el.addEventListener("mouseleave", function (e) {
            i.interactivity.mouse.pos_x = null, i.interactivity.mouse.pos_y = null, i.interactivity.status = "mouseleave"
        })), i.interactivity.events.onclick.enable && i.interactivity.el.addEventListener("click", function () {
            if (i.interactivity.mouse.click_pos_x = i.interactivity.mouse.pos_x, i.interactivity.mouse.click_pos_y = i.interactivity.mouse.pos_y, i.interactivity.mouse.click_time = (new Date).getTime(), i.interactivity.events.onclick.enable)switch (i.interactivity.events.onclick.mode) {
                case"push":
                    i.particles.move.enable ? i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb, i.interactivity.mouse) : 1 == i.interactivity.modes.push.particles_nb ? i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb, i.interactivity.mouse) : i.interactivity.modes.push.particles_nb > 1 && i.fn.modes.pushParticles(i.interactivity.modes.push.particles_nb);
                    break;
                case"remove":
                    i.fn.modes.removeParticles(i.interactivity.modes.remove.particles_nb);
                    break;
                case"bubble":
                    i.tmp.bubble_clicking = !0;
                    break;
                case"repulse":
                    i.tmp.repulse_clicking = !0, i.tmp.repulse_count = 0, i.tmp.repulse_finish = !1, setTimeout(function () {
                        i.tmp.repulse_clicking = !1
                    }, 1e3 * i.interactivity.modes.repulse.duration)
            }
        })
    }, i.fn.vendors.densityAutoParticles = function () {
        if (i.particles.number.density.enable) {
            var e = i.canvas.el.width * i.canvas.el.height / 1e3;
            i.tmp.retina && (e /= 2 * i.canvas.pxratio);
            var a = e * i.particles.number.value / i.particles.number.density.value_area, t = i.particles.array.length - a;
            0 > t ? i.fn.modes.pushParticles(Math.abs(t)) : i.fn.modes.removeParticles(t)
        }
    }, i.fn.vendors.checkOverlap = function (e, a) {
        for (var t = 0; t < i.particles.array.length; t++) {
            var s = i.particles.array[t], n = e.x - s.x, r = e.y - s.y, c = Math.sqrt(n * n + r * r);
            c <= e.radius + s.radius && (e.x = a ? a.x : Math.random() * i.canvas.w, e.y = a ? a.y : Math.random() * i.canvas.h, i.fn.vendors.checkOverlap(e))
        }
    }, i.fn.vendors.createSvgImg = function (e) {
        var a = i.tmp.source_svg, t = /#([0-9A-F]{3,6})/gi, s = a.replace(t, function (a, t, i, s) {
            if (e.color.rgb)var n = "rgba(" + e.color.rgb.r + "," + e.color.rgb.g + "," + e.color.rgb.b + "," + e.opacity + ")"; else var n = "hsla(" + e.color.hsl.h + "," + e.color.hsl.s + "%," + e.color.hsl.l + "%," + e.opacity + ")";
            return n
        }), n = new Blob([s], {type: "image/svg+xml;charset=utf-8"}), r = window.URL || window.webkitURL || window, c = r.createObjectURL(n), o = new Image;
        o.addEventListener("load", function () {
            e.img.obj = o, e.img.loaded = !0, r.revokeObjectURL(c), i.tmp.count_svg++
        }), o.src = c
    }, i.fn.vendors.destroypJS = function () {
        cancelAnimationFrame(i.fn.drawAnimFrame), t.remove(), pJSDom = null
    }, i.fn.vendors.drawShape = function (e, a, t, i, s, n) {
        var r = s * n, c = s / n, o = 180 * (c - 2) / c, l = Math.PI - Math.PI * o / 180;
        e.save(), e.beginPath(), e.translate(a, t), e.moveTo(0, 0);
        for (var v = 0; r > v; v++)e.lineTo(i, 0), e.translate(i, 0), e.rotate(l);
        e.fill(), e.restore()
    }, i.fn.vendors.exportImg = function () {
        window.open(i.canvas.el.toDataURL("image/png"), "_blank")
    }, i.fn.vendors.loadImg = function (e) {
        if (i.tmp.img_error = void 0, "" != i.particles.shape.image.src)if ("svg" == e) {
            var a = new XMLHttpRequest;
            a.open("GET", i.particles.shape.image.src), a.onreadystatechange = function (e) {
                4 == a.readyState && (200 == a.status ? (i.tmp.source_svg = e.currentTarget.response, i.fn.vendors.checkBeforeDraw()) : (console.log("Error pJS - Image not found"), i.tmp.img_error = !0))
            }, a.send()
        } else {
            var t = new Image;
            t.addEventListener("load", function () {
                i.tmp.img_obj = t, i.fn.vendors.checkBeforeDraw()
            }), t.src = i.particles.shape.image.src
        } else console.log("Error pJS - No image.src"), i.tmp.img_error = !0
    }, i.fn.vendors.draw = function () {
        "image" == i.particles.shape.type ? "svg" == i.tmp.img_type ? i.tmp.count_svg >= i.particles.number.value ? (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame)) : i.tmp.img_error || (i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw)) : void 0 != i.tmp.img_obj ? (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame)) : i.tmp.img_error || (i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw)) : (i.fn.particlesDraw(), i.particles.move.enable ? i.fn.drawAnimFrame = requestAnimFrame(i.fn.vendors.draw) : cancelRequestAnimFrame(i.fn.drawAnimFrame))
    }, i.fn.vendors.checkBeforeDraw = function () {
        "image" == i.particles.shape.type ? "svg" == i.tmp.img_type && void 0 == i.tmp.source_svg ? i.tmp.checkAnimFrame = requestAnimFrame(check) : (cancelRequestAnimFrame(i.tmp.checkAnimFrame), i.tmp.img_error || (i.fn.vendors.init(), i.fn.vendors.draw())) : (i.fn.vendors.init(), i.fn.vendors.draw())
    }, i.fn.vendors.init = function () {
        i.fn.retinaInit(), i.fn.canvasInit(), i.fn.canvasSize(), i.fn.canvasPaint(), i.fn.particlesCreate(), i.fn.vendors.densityAutoParticles(), i.particles.line_linked.color_rgb_line = hexToRgb(i.particles.line_linked.color)
    }, i.fn.vendors.start = function () {
        isInArray("image", i.particles.shape.type) ? (i.tmp.img_type = i.particles.shape.image.src.substr(i.particles.shape.image.src.length - 3), i.fn.vendors.loadImg(i.tmp.img_type)) : i.fn.vendors.checkBeforeDraw()
    }, i.fn.vendors.eventsListeners(), i.fn.vendors.start()
};
Object.deepExtend = function (e, a) {
    for (var t in a)a[t] && a[t].constructor && a[t].constructor === Object ? (e[t] = e[t] || {}, arguments.callee(e[t], a[t])) : e[t] = a[t];
    return e
}, window.requestAnimFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
            window.setTimeout(e, 1e3 / 60)
        }
}(), window.cancelRequestAnimFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
}(), window.pJSDom = [], window.particlesJS = function (e, a) {
    "string" != typeof e && (a = e, e = "particles-js"), e || (e = "particles-js");
    var t = document.getElementById(e), i = "particles-js-canvas-el", s = t.getElementsByClassName(i);
    if (s.length)for (; s.length > 0;)t.removeChild(s[0]);
    var n = document.createElement("canvas");
    n.className = i, n.style.width = "100%", n.style.height = "100%";
    var r = document.getElementById(e).appendChild(n);
    null != r && pJSDom.push(new pJS(e, a))
}, window.particlesJS.load = function (e, a, t) {
    var i = new XMLHttpRequest;
    i.open("GET", a), i.onreadystatechange = function (a) {
        if (4 == i.readyState)if (200 == i.status) {
            var s = JSON.parse(a.currentTarget.response);
            window.particlesJS(e, s), t && t()
        } else console.log("Error pJS - XMLHttpRequest status: " + i.status), console.log("Error pJS - File config not found")
    }, i.send()
};
/**
 * HTML5 Placeholder jQuery Plugin - v2.1.2
 * Copyright (c)2015 Mathias Bynens
 * 2015-06-09
 * ===================================================================
 */
!function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof module && module.exports ? require("jquery") : jQuery)
}(function (a) {
    function b(b) {
        var c = {}, d = /^jQuery\d+$/;
        return a.each(b.attributes, function (a, b) {
            b.specified && !d.test(b.name) && (c[b.name] = b.value)
        }), c
    }

    function c(b, c) {
        var d = this, f = a(d);
        if (d.value == f.attr("placeholder") && f.hasClass(m.customClass))if (f.data("placeholder-password")) {
            if (f = f.hide().nextAll('input[type="password"]:first').show().attr("id", f.removeAttr("id").data("placeholder-id")), b === !0)return f[0].value = c;
            f.focus()
        } else d.value = "", f.removeClass(m.customClass), d == e() && d.select()
    }

    function d() {
        var d, e = this, f = a(e), g = this.id;
        if ("" === e.value) {
            if ("password" === e.type) {
                if (!f.data("placeholder-textinput")) {
                    try {
                        d = f.clone().prop({type: "text"})
                    } catch (h) {
                        d = a("<input>").attr(a.extend(b(this), {type: "text"}))
                    }
                    d.removeAttr("name").data({
                        "placeholder-password": f,
                        "placeholder-id": g
                    }).bind("focus.placeholder", c), f.data({"placeholder-textinput": d, "placeholder-id": g}).before(d)
                }
                f = f.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", g).show()
            }
            f.addClass(m.customClass), f[0].value = f.attr("placeholder")
        } else f.removeClass(m.customClass)
    }

    function e() {
        try {
            return document.activeElement
        } catch (a) {
        }
    }

    var f, g, h = "[object OperaMini]" == Object.prototype.toString.call(window.operamini), i = "placeholder" in document.createElement("input") && !h, j = "placeholder" in document.createElement("textarea") && !h, k = a.valHooks, l = a.propHooks;
    if (i && j)g = a.fn.placeholder = function () {
        return this
    }, g.input = g.textarea = !0; else {
        var m = {};
        g = a.fn.placeholder = function (b) {
            var e = {customClass: "placeholder"};
            m = a.extend({}, e, b);
            var f = this;
            return f.filter((i ? "textarea" : ":input") + "[placeholder]").not("." + m.customClass).bind({
                "focus.placeholder": c,
                "blur.placeholder": d
            }).data("placeholder-enabled", !0).trigger("blur.placeholder"), f
        }, g.input = i, g.textarea = j, f = {
            get: function (b) {
                var c = a(b), d = c.data("placeholder-password");
                return d ? d[0].value : c.data("placeholder-enabled") && c.hasClass(m.customClass) ? "" : b.value
            }, set: function (b, f) {
                var g = a(b), h = g.data("placeholder-password");
                return h ? h[0].value = f : g.data("placeholder-enabled") ? ("" === f ? (b.value = f, b != e() && d.call(b)) : g.hasClass(m.customClass) ? c.call(b, !0, f) || (b.value = f) : b.value = f, g) : b.value = f
            }
        }, i || (k.input = f, l.value = f), j || (k.textarea = f, l.value = f), a(function () {
            a(document).delegate("form", "submit.placeholder", function () {
                var b = a("." + m.customClass, this).each(c);
                setTimeout(function () {
                    b.each(d)
                }, 10)
            })
        }), a(window).bind("beforeunload.placeholder", function () {
            a("." + m.customClass).each(function () {
                this.value = ""
            })
        })
    }
});
/**
 * Product Name: Color-Switcher-Plugin
 * Product URI: http://shariarbd.com/demo/color-switcher-plugin/
 * Author: Shariar
 * Author URI: http://shariarbd.com/
 * Description: Color Switcher plugin is a simple and easy to use plugin used to switch color of a site.
 * Version: 1.0.0
 * License: The MIT License (MIT)
 * Tags: color switcher
 **/
window.console = window.console || (function () {
        var c = {};
        c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () {
        };
        return c;
    })();
jQuery(document).ready(function ($) {
    "use strict"
    if (window.location.href.indexOf("index") > -1) {
        $("ul.colors .color1").click(function () {
            $("#colors").attr("href", "assets/css/colors/blue.css");
            $("html").attr("class", "template-color-4C92DE");
            return false;
        });
        $("ul.colors .color2").click(function () {
            $("#colors").attr("href", "assets/css/colors/cyan.css");
            $("html").attr("class", "template-color-52E5AB");
            return false;
        });
        $("ul.colors .color3").click(function () {
            $("#colors").attr("href", "assets/css/colors/emerald.css");
            $("html").attr("class", "template-color-42C571");
            return false;
        });
        $("ul.colors .color4").click(function () {
            $("#colors").attr("href", "assets/css/colors/green.css");
            $("html").attr("class", "template-color-8BCF00");
            return false;
        });
        $("ul.colors .color5").click(function () {
            $("#colors").attr("href", "assets/css/colors/material.css");
            $("html").attr("class", "template-color-6675DD");
            return false;
        });
        $("ul.colors .color6").click(function () {
            $("#colors").attr("href", "assets/css/colors/orange.css");
            $("html").attr("class", "template-color-E37949");
            return false;
        });
        $("ul.colors .color7").click(function () {
            $("#colors").attr("href", "assets/css/colors/pink.css");
            $("html").attr("class", "template-color-FF7387");
            return false;
        });
        $("ul.colors .color8").click(function () {
            $("#colors").attr("href", "assets/css/colors/red.css");
            $("html").attr("class", "template-color-EF5952");
            return false;
        });
        $("ul.colors .color9").click(function () {
            $("#colors").attr("href", "assets/css/colors/violet.css");
            $("html").attr("class", "template-color-A26CFA");
            return false;
        });
        $("ul.colors .color10").click(function () {
            $("#colors").attr("href", "assets/css/colors/yellow.css");
            $("html").attr("class", "template-color-E5BE23");
            return false;
        });
    } else {
        $("ul.colors .color1").click(function () {
            $("#colors").attr("href", "assets/css/colors/blue.css");
            $("html").attr("class", "template-color-4C92DE");
            return false;
        });
        $("ul.colors .color2").click(function () {
            $("#colors").attr("href", "assets/css/colors/cyan.css");
            $("html").attr("class", "template-color-52E5AB");
            return false;
        });
        $("ul.colors .color3").click(function () {
            $("#colors").attr("href", "assets/css/colors/emerald.css");
            $("html").attr("class", "template-color-42C571");
            return false;
        });
        $("ul.colors .color4").click(function () {
            $("#colors").attr("href", "assets/css/colors/green.css");
            $("html").attr("class", "template-color-8BCF00");
            return false;
        });
        $("ul.colors .color5").click(function () {
            $("#colors").attr("href", "assets/css/colors/material.css");
            $("html").attr("class", "template-color-6675DD");
            return false;
        });
        $("ul.colors .color6").click(function () {
            $("#colors").attr("href", "assets/css/colors/orange.css");
            $("html").attr("class", "template-color-E37949");
            return false;
        });
        $("ul.colors .color7").click(function () {
            $("#colors").attr("href", "assets/css/colors/pink.css");
            $("html").attr("class", "template-color-FF7387");
            return false;
        });
        $("ul.colors .color8").click(function () {
            $("#colors").attr("href", "assets/css/colors/red.css");
            $("html").attr("class", "template-color-EF5952");
            return false;
        });
        $("ul.colors .color9").click(function () {
            $("#colors").attr("href", "assets/css/colors/violet.css");
            $("html").attr("class", "template-color-A26CFA");
            return false;
        });
        $("ul.colors .color10").click(function () {
            $("#colors").attr("href", "assets/css/colors/yellow.css");
            $("html").attr("class", "template-color-E5BE23");
            return false;
        });
    }
    $("#color-style-switcher .bottom a.settings").click(function (e) {
        e.preventDefault();
        var div = $("#color-style-switcher");
        if (div.css("left") === "-189px") {
            $("#color-style-switcher").animate({left: "0px"});
        } else {
            $("#color-style-switcher").animate({left: "-189px"});
        }
    })
    $("ul.colors li a").click(function (e) {
        e.preventDefault();
        $(this).parent().parent().find("a").removeClass("active");
        $(this).addClass("active");
    })
});
if (window.location.href.indexOf("index") > -1) {
    jQuery('head').append('<link rel="stylesheet" id="colors" href="assets/css/colors/default.css" type="text/css" />');
} else {
    jQuery('head').append('<link rel="stylesheet" id="colors" href="assets/css/colors/default.css" type="text/css" />');
}




(function($) {
    "use strict";
    $(window).on('scroll', function() {

        var y = $(window).scrollTop(),
            topBar = $('header');


        if (y > 1) {
            topBar.addClass('sticky');
            $('header .logo a').removeClass('logo-light');
            $('header .logo a').addClass('logo-dark');
            $('.main-navigation li.current a').addClass('current-sticky');
            $('.main-navigation li.highlight').addClass('sticky-sep');
            $('a.menu-toggle span').addClass('menu-open');
            $('.main-navigation li a').addClass('menu-open-main');


        } else {
            topBar.removeClass('sticky');
            $('header .logo a').removeClass('logo-dark');
            $('header .logo a').addClass('logo-light');
            $('.main-navigation li.current a').removeClass('current-sticky');
            $('.main-navigation li.highlight').removeClass('sticky-sep');
            $('.main-navigation li.highlight').addClass('with-sep');
            $('a.menu-toggle span').removeClass('menu-open');
            $('.main-navigation li a').removeClass('menu-open-main');

        }
    });
})(jQuery); // End of use strict




$(document).ready(function() {
    //Go to top button
    $("#go-top").on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });
    //Counter Up
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

    // Mobile Menu
    var toggleButton = $('.menu-toggle'),
        nav = $('.main-navigation-mobile');

    toggleButton.on('click', function(event) {
        event.preventDefault();

        toggleButton.toggleClass('is-clicked');
        nav.slideToggle();
    });

    if (toggleButton.is(':visible')) nav.addClass('mobile');

    $(window).resize(function() {
        if (toggleButton.is(':visible')) nav.addClass('mobile');
        else nav.removeClass('mobile');
    });

    $('#main-nav-wrap li a').on("click", function() {

        if (nav.hasClass('mobile')) {
            toggleButton.toggleClass('is-clicked');
            nav.fadeOut();
        }
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    //Carousel
    $("#bg-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 100,
        autoPlay: 5000,
        paginationSpeed: 100,
        singleItem: true,
        mouseDrag: false,
        transitionStyle: "fade"
    });

    //Accordion Faq
    $(document).on('show', '.accordion', function(e) {
        $(e.target).prev('.accordion-heading').addClass('accordion-opened');
    });

    $(document).on('hide', '.accordion', function(e) {
        $(this).find('.accordion-heading').not($(e.target)).removeClass('accordion-opened');
    });




    //Sortable Function for Faq
    var items = $('.item');
    items.show();
    $('.faq-filters li').on('click', function(e) {
        var category = $(this).data('filter');
        $(".clicked-filter").removeClass("clicked-filter");
        $(this).addClass("clicked-filter");
        //When user select 'All' show all items
        $('.item').each(function() {
            data = $(this).data('cat');
            if (data == category) {
                $(this).show();
            }
            if (data != category) {
                $(this).hide();
            }
            if (category == "*") {
                items.show();
            }
        });
        e.preventDefault();
    });

    //Clickable Map Appear
    if ($("#show-map").length > 0) {
        document.getElementById('show-map').onclick = function() {
            var map = document.getElementById('map-hidden');
            var opening = document.getElementById('show-map').className;
            if (map.className === "hide") {
                map.className = 'show';
                $('#map-hidden').addClass('animated fadeIn');
                document.getElementById('show-map').className = 'pe-7s-map-marker activa';
            }
            if (opening == "pe-7s-map-marker activa") {
                map.className = 'hide';
                document.getElementById('show-map').className = 'pe-7s-map-marker';
            }
        }
    }
    //Morphext
    $("#word-rotate").Morphext({
        animation: "fadeIn", // Overrides default "bounceIn"
        separator: ",", // Overrides default ","
        speed: 3500, // Overrides default 2000
        complete: function() {
            // Overrides default empty function
        }
    });

    //Typed Text
    $("#typed").typed({
        strings: ["Raffaello", "Il social network.", "Showcase your product."],
        typeSpeed: 30,
        backDelay: 500,
        loop: true,
        // defaults to false for infinite loop
        loopCount: true,
        resetCallback: function() {
            newTyped();
        }
    });
    //Slider Hero
    $('.hero--slider').slick({
        autoplay: true,
        arrows: false,
        dots: true,
        fade: true,
        speed: 1000,
        cssEase: 'linear'
    });

    //Services Tabs
    $('.tab-content').not('.active').hide();

    $('.tab-nav a').on('click', function(e) {
        e.preventDefault();
        $('.tab-nav a').removeClass('active');
        $(this).addClass('active');

        $('.tab-content').hide();
        $($.attr(this, 'href')).fadeIn(300);
    });
    /* Video Tab Overlay */
    $('.video .overlay-video').on('click', function(ev) {
        $(this).fadeOut(300);
        $("#elvideo")[0].src += "&autoplay=1";
        ev.preventDefault();
    });

    //Archive Widget Blog

    $(".archive-first").on("click", function() {
        var obj = $(this).next();
        if ($(obj).hasClass("inactive-children")) {
            $(obj).removeClass("inactive-children").slideDown();
            $(this).find('.fa-plus').addClass('fa-minus').removeClass('fa-plus');
        } else {
            $(obj).addClass("inactive-children").slideUp();
            $(this).find('.fa-minus').addClass('fa-plus').removeClass('fa-minus');
        }
    });

    //Tooltip
    $("[data-toggle=tooltip]").tooltip({
        placement: 'right'
    });

    //Countdown
    $('#clock').countdown('2017/08/13', function(event) {
        var $this = $(this).html(event.strftime(''

            + '<span>%-D <p class="clock"> day%!D </p></span>' + '<span >%H <p class="clock"> hour%!D</p></span> ' + '<span>%M <p class="clock"> minute%!D</p></span> ' + '<span>%S <p class="clock"> second%!D</p></span>'));
    });

    //Placeholder Plugin Settings
    $('input, textarea, select, email, password').placeholder();
});
