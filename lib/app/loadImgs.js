// 加载图片
// 如果某个w3-third没有超出视口
// 且图片计数未完就再加载一张

var insertAImg = require('./insertAImg');
var preLoadImg = require('./preLoadImg');
var isOut = require('./isOut');

function loadImgs(item) {

    if (isOut()) {
        return;
    }
    if (item.num + 1> item.len) {
        var theLoading = document.
                getElementById('loading-img');
        theLoading.style.display = 'none';
        return;
    }

    // 如果前一张图片没有加载完
    // 那就不执行之后的代码
    if (!document.body.dataset.onLoad) return;
    var newImg = preLoadImg(item.file, item.num + 1);
    // 新图片设置src之后，状态改为未加载完
    document.body.dataset.onLoad = '';
    newImg.onload = function () {
        insertAImg(newImg);
        item.num++;

        // 将当前状态改为图片加载完
        document.body.dataset.onLoad = 'true';
        if (!isOut() && item.num < item.len) {
            loadImgs(item);
        }
    };
}

module.exports = loadImgs;