// 所有图片重新排列函数
// window.onresize
// window.onorientationchange
var isSingle = require('./isSingle');
var insertAImg = require('./insertAImg');

function composeImages() {
    var w3Thirds = document.querySelectorAll(
                '.w3-third'),
        aImgs = document.getElementsByClassName('materialboxed'),
        arrImg = [];

    // 把aImgs一个一个放到数组arrImg中
    // 这一步是为了用sort进行排序
    // 我在制作过程中无法调用call方法对aImgs进行排序
    for (var i=0, len=aImgs.length; i<len; i++) {
        arrImg[i] = aImgs[i];
    }

    // 对图片进行排序
    arrImg.sort(function (a,b) {
        var aNum = parseInt(/[0-9]+\./.exec(a.src)[0]);
        var bNum = parseInt(/[0-9]+\./.exec(b.src)[0]);
        if ( aNum > bNum ) {
            return 1;
        } else if ( aNum < bNum) {
            return -1;
        } else {
            return 0;
        }
    });
    console.log(arrImg);
    // 清空3个w3-third
    [].forEach.call(w3Thirds, function (elem) {
        elem.innerHTML = '';
    });

    // 清空w3-third时，可能会同时清掉loading-img
    // 添加the_loading
    if (!document.getElementById('loading-img')) {
        var theLoad = document.createElement('div');
        theLoad.id = 'loading-img';
        document.body.insertBefore(theLoad,
            document.getElementsByTagName('footer')[0]);
    }

    // 循环插入所有图片
    for (var i=0,len=arrImg.length;i<len;i++) {
        // 如果目前为3列且为前3张图片
        // 那就一列插入一张
        if (!isSingle() && (i < 2)) {
            w3Thirds[i].appendChild(arrImg[i]);
        } else {
            // 除前三张外其余都调用inserImg函数
            insertAImg(arrImg[i]);
        }
    }
}

module.exports = composeImages;
