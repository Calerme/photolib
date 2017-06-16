'use strict';
var slidebarToggle = require('./slidebarToggle');
var initImages = require('./initImages');
var preLoadImg = require('./preLoadImg');
var loadImgs = require('./loadImgs');
var composeImages = require('./composeImages');
var isSingle = require('./isSingle');

// 菜单显示隐藏 & 菜单项目active变更与图片初始化
var slideOnBtn = document.getElementById('w3_open'),
    slideOffBtn = document.getElementById('w3_close'),
    menuBlock = document.getElementsByClassName(
                'w3-bar-block')[0];

slideOnBtn.addEventListener('click', slidebarToggle.open);
slideOffBtn.addEventListener('click', slidebarToggle.close);
menuBlock.addEventListener('click', function (e) {
    var oElem = e.target;
    if (oElem.classList.contains(
                'w3-bar-item')) {
        // 选择选项后关闭菜单
        slidebarToggle.close();

        // 更替选项的w3-active
        if (oElem.classList.contains('w3-active')) {
            //如果选择项目与当前项目相同
            //就不执行之后的代码
            return;
        } else {
            var items = oElem.parentNode.
                    querySelectorAll('.w3-bar-item');

            [].forEach.call(items, function (elem) {
                elem.classList.remove('w3-active');
            });
            oElem.classList.add('w3-active');

            // 初始化图片 待加入
            item.file = oElem.dataset.file;
            item.len = oElem.dataset.len;
            item.num = 0;
            initImages(w3Thirds, item);
        }
    }
});

// 初始化页面
var w3Thirds = document.getElementsByClassName(
            'w3-third');
// 类目对象
var item = {
    file: 'taekwondo', // 文件夹名
    len: 93, // 图片总数
    num: 0 //计数器
};
// 初始化页面
initImages(w3Thirds, item);
//页面滚动时加载图片
var bool = true; // 代表图片是否加载完成
window.addEventListener('scroll', function () {
   loadImgs(item);
});

// 图片重新排列
// window.onresize
// window.onorientationchange
window.addEventListener('resize', function () {

    // 如果列数与改变窗口大小时一致
    // 则不重新排列图片，防止闪屏
    var col = document.body.dataset.col;
    if (col === 'single' && isSingle() ||
            col === 'three' && !isSingle()) {
        return;
    }
    composeImages();
    // 图片重新排列后
    // 如果w3Thirds的bottom出现在视口中
    // 就加载图片
    loadImgs(item);
});
window.addEventListener('orientationchange', function () {
    composeImages();
    loadImgs(item);
});

// 增加图片点击放大效果
var oMask = document.getElementById('mask');
document.body.addEventListener('click', function (e) {
    var elem = e.target;
    var newImg = null;
    var btn = oMask.getElementsByTagName('i')[0];
    var bigImg = document.getElementById('bigImg');

    // 点击图片放大
    if (elem.classList.contains('materialboxed')) {
        // 记录此时scrollTop的值，以便关闭mask层后
        // 视口还显示之差的图片
        // 之前通过设置body的overflow为hidden但出现页面跳到顶部的问题
        document.body.dataset.STop = document.body.scrollTop;

        // mask层的大小等于图片大小
        // 且定位在图片上
        oMask.style.width = elem.offsetWidth + 'px';
        oMask.style.height = elem.offsetHeight + 'px';
        oMask.style.top = elem.getBoundingClientRect().top + 'px';
        oMask.style.left = elem.getBoundingClientRect().left + 'px';
        oMask.classList.add('final');

        oMask.removeChild(document.getElementById('bigImg'));
        newImg = document.createElement('img');
        newImg.id = 'bigImg';
        newImg.src = elem.src.replace('/small', '');
        newImg.onload = function () {
            oMask.style.backgroundImage = 'none';
            oMask.appendChild(newImg);
            newImg.style.width = '100%';


            setTimeout(function () {
            },400);

            // 放大缩小按钮显示
            btn.style.display = 'block';
        };

        // 遮罩层放大后禁止body滚动
        oMask.addEventListener('transitionend', function () {
            if (this.classList.contains('final')) {
                document.body.style.overflow = 'hidden';
            }

            // 高度未撑满的图片垂直居中
            if (newImg.offsetHeight < window.innerHeight) {
                newImg.style.top = (window.innerHeight -
                        newImg.offsetHeight) / 2 + 'px';
            }
        });
    }

    // 点击图片缩小
    if (elem.id === 'bigImg') {
        document.body.style.overflow = 'auto';
        document.body.scrollTop = document.body.dataset.STop;
        oMask.classList.remove('final');
        setTimeout(function () {
            oMask.style.cssText = '';
        },200); // 这是200是根据css中的transition得出的

        // 放大缩小按钮隐藏重置
        btn.style.display = 'none';
        btn.classList.remove('fa-search-minus');
        btn.classList.add('fa-search-plus');
    }

    // 放大缩小按钮事件
    if (elem.classList.contains('fa-search-plus') ||
            elem.classList.contains('fa-search-minus')) {

        if (elem.classList.contains('fa-search-plus')) {

            elem.classList.remove('fa-search-plus');
            elem.classList.add('fa-search-minus');
            bigImg.dataset.styles = bigImg.style.cssText;
            bigImg.style.cssText = '';

            // 把图片放大后居中
            if (bigImg.offsetWidth > oMask.offsetWidth) {
                oMask.scrollLeft = (bigImg.offsetWidth -
                        oMask.offsetWidth) / 2;
            }
            if (bigImg.offsetHeight > oMask.offsetHeight) {
                oMask.scrollTop = (bigImg.offsetWidth -
                        oMask.offsetHeight) / 2;
            }

        } else {

            elem.classList.remove('fa-search-minus');
            elem.classList.add('fa-search-plus');
            bigImg.style.cssText = bigImg.dataset.styles;
        }
    }
});