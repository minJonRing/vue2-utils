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
exports.menuCancelNull = exports.menuFilter = exports.menuGenerate = void 0;
var menuGenerate = function (data, arr, code) {
    if (arr === void 0) { arr = []; }
    if (code === void 0) { code = "parentId"; }
    // 遍历生成树形数据
    for (var i in data) {
        var el = data[i];
        menuFilter(el, 0, arr, code);
    }
    return { list: data, arr: arr };
};
exports.menuGenerate = menuGenerate;
/**
 *
 * @param {*} item 当前数据
 * @param {*} pid 上一级数据id
 * @param {*} arr 接收处理完成数据的数组
 */
var menuFilter = function (item, pid, arr, code) {
    if (arr === void 0) { arr = []; }
    if (item[code] === pid) {
        arr.push(__assign(__assign({}, item), { children: [] }));
    }
    else {
        for (var i in arr) {
            var _a = arr[i], id = _a.id, children = _a.children;
            menuFilter(item, id, children, code);
        }
    }
};
exports.menuFilter = menuFilter;
/**
 * 去除空数组
 * @param data 原始数据
 * @param type 数组的值
 * @returns []
 */
var menuCancelNull = function (data, type) {
    if (type === void 0) { type = "children"; }
    for (var i in data) {
        var el = data[i];
        if (el[type] && el[type].length) {
            menuCancelNull(el[type]);
        }
        else {
            el[type] = null;
        }
    }
    return data;
};
exports.menuCancelNull = menuCancelNull;
