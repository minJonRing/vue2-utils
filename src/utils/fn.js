"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.fnReset = exports.fnArrToJson = void 0;
var fnArrToJson = function (arr, option, json) {
    if (option === void 0) { option = {}; }
    if (json === void 0) { json = {}; }
    var _option = __assign({ child: "children", key: 'value', value: 'label' }, option);
    var child = _option.child, key = _option.key, value = _option.value;
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var el = arr_1[_i];
        json[el[key]] = el[value];
        if (el[child]) {
            fnArrToJson(el[child], _option, json);
        }
    }
    return json;
};
exports.fnArrToJson = fnArrToJson;
/**
*
* @param {Array} arr
* @param {Object:{child,key,value}} option
* @returns
*/
var fnReset = function (arr, option) {
    var _option = __assign({ child: "children", key: "code", value: 'name' }, option);
    var key = _option.key, value = _option.value, child = _option.child;
    for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
        var el = arr_2[_i];
        el.value = el[key];
        el.label = el[value];
        if (el[child]) {
            fnReset(el[child], _option);
        }
    }
    return arr;
};
exports.fnReset = fnReset;
