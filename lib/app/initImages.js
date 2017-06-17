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

    // 添加the_loading
    if (!document.getElementById('loading-img')) {
        var theLoad = document.createElement('div');
        theLoad.id = 'loading-img';
        document.body.insertBefore(theLoad,
                document.getElementsByTagName('footer')[0]);
    }
    loadImgs(item);
}

module.exports = initImages;

