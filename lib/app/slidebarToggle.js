// 控制菜单slidebar打开与关闭的两个函数
'use strict';

function w3_open() {
    document.getElementById("mySidebar").style.width = "100%";
    document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
}

module.exports = {
    open: w3_open,
    close: w3_close
};