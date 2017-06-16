// 初始化页面
// 用于页面初次载入
// 选择相应菜单变更图片内容
// len=图片总数量,file=文件夹的名字，num=图片计数
var isOut = require('./isOut');
var loadImgs = require('./loadImgs');

function initImages(w3Thirds, item) {
    // 清空w3-third的内容
    [].forEach.call(w3Thirds, function (elem) {
        elem.innerHTML = '';
    });

    loadImgs(item);
}

module.exports = initImages;

