// 加载图片
// 如果某个w3-third没有超出视口
// 且图片计数未完就再加载一张

var insertAImg = require('./insertAImg');
var preLoadImg = require('./preLoadImg');
var isOut = require('./isOut');
var isSingle = require('./isSingle');
var getLowestW3Third = require('./getLowestW3Third');

function loadImgs(item) {
    var theLoading = document.
            getElementById('loading-img');
    if (isOut()) {
        return;
    }
    if (item.num + 1> item.len) {
        theLoading.style.display = 'none';
        return;
    }

    // 如果前一张图片没有加载完
    // 那就不执行之后的代码
    if (!document.body.dataset.onLoad) return;
    var newImg = preLoadImg(item.file, item.num, item.imgArr);

    // 新图片设置src之后，状态改为未加载完
    document.body.dataset.onLoad = '';
    newImg.onload = function () {
        insertAImg(newImg);
        // 确定loading-img的位置
        if (isSingle()) {
            document.getElementsByClassName('w3-third')[0].
            appendChild(theLoading);
        } else {
            getLowestW3Third(document.
            getElementsByClassName('w3-third')).
            appendChild(theLoading);
        }

        item.num++;

        // 将当前状态改为图片加载完
        document.body.dataset.onLoad = 'true';
        if (!isOut() && item.num < item.len) {
            loadImgs(item);
        }
    };
}

module.exports = loadImgs;