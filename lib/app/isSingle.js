// 判断页面是不是单列
'use strict';

// 这个函数用来判断页面中目前是不是单列
// 当页面小于等于600px时，页面排列为单列
function isSingle() {
    var width = window.innerWidth;
    if (width <= 600) {
        document.body.dataset.col = 'single';
        return true;
    } else {
        document.body.dataset.col = 'three';
        return false;
    }
}

module.exports = isSingle;