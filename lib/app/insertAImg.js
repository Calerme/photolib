// 用来插入一张图片的函数
// 函数将接收一个img对象作为参数
var isSingle = require('./isSingle');
var getLowestW3Third = require('./getLowestW3Third');

function insertImg(img) {
    var w3Thirds = document.querySelectorAll(
                '.w3-third');
    // 如果是单列，就把图片放入第一个w3-third
    if (isSingle()) {
        w3Thirds[0].appendChild(img);
    } else { // 否则就是三列
        // 那就把图片插入offsetHeight最低的w3-third
        getLowestW3Third(w3Thirds).appendChild(img);
    }
}

module.exports = insertImg;