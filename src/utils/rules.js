"use strict";
exports.__esModule = true;
exports.blurEmailNotRequired = exports.blurEmail = exports.blurZipNotRequired = exports.blurZip = exports.blurNameNotRequired = exports.blurName = exports.blurCode18NotRequired = exports.blurCode18 = exports.blurPhoneNotRequired = exports.blurPhone = exports.change = exports.blur = exports.rulesT = void 0;
// 类型验证
var rulesT = {
    Any: {
        type: null
    },
    Number: {
        type: Number,
        "default": 0
    },
    String: {
        type: String,
        "default": ''
    },
    Boolean: {
        type: Boolean,
        "default": false
    },
    Array: {
        type: Array,
        "default": function () {
            return [];
        }
    },
    Object: {
        type: Object,
        "default": function () {
            return {};
        }
    },
    Function: {
        type: Function
    }
};
exports.rulesT = rulesT;
// 内容验证
var blur = { required: true, message: "请输入", trigger: "blur" };
exports.blur = blur;
var change = { required: true, message: "请选择", trigger: "change" };
exports.change = change;
// 判断函数
var is = function (required, fn) {
    if (required === void 0) { required = true; }
    return ({
        required: required,
        validator: function (rule, value, callback) {
            // 是否可以为空
            if (!required) {
                // 空直接跳过
                if (!value) {
                    return new callback();
                }
                else {
                    // fn存在进行验证
                    if (fn && fn(value)) {
                        return callback(new Error('请输入正确的值'));
                    }
                    else {
                        return new callback();
                    }
                }
            }
            if (!value || (fn ? fn(value) : true)) {
                return callback(new Error('请输入正确的值'));
            }
            return new callback();
        },
        trigger: "blur"
    });
};
// 手机号
var phoneBoolean = function (value) {
    return !/(^[0-9]{4}\-[0-9]{7,8}$)|^[0-9]{7,8}$|^1\d{10}$/.test(value);
};
var blurPhone = is(true, phoneBoolean);
exports.blurPhone = blurPhone;
var blurPhoneNotRequired = is(false, phoneBoolean);
exports.blurPhoneNotRequired = blurPhoneNotRequired;
// 18位字符
var codeBoolean18 = function (value) {
    return !/(^[0-9|A-Z]{15}$)|(^[0-9A-Z]{18}$)/.test(value);
};
var blurCode18 = is(true, codeBoolean18);
exports.blurCode18 = blurCode18;
var blurCode18NotRequired = is(false, codeBoolean18);
exports.blurCode18NotRequired = blurCode18NotRequired;
// 中文验证
var nameBoolean = function (value) {
    return !/[\u4e00-\u9fa5]/.test(value);
};
var blurName = is(true, nameBoolean);
exports.blurName = blurName;
var blurNameNotRequired = is(false, nameBoolean);
exports.blurNameNotRequired = blurNameNotRequired;
// 
// 邮编验证
var zipBoolean = function (value) {
    return !/^[0-9]{6,6}$/.test(value);
};
var blurZip = is(true, zipBoolean);
exports.blurZip = blurZip;
var blurZipNotRequired = is(false, zipBoolean);
exports.blurZipNotRequired = blurZipNotRequired;
// 
// 邮箱验证
var emailBoolean = function (value) {
    return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
};
var blurEmail = is(true, emailBoolean);
exports.blurEmail = blurEmail;
var blurEmailNotRequired = is(false, emailBoolean);
exports.blurEmailNotRequired = blurEmailNotRequired;
