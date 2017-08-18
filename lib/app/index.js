'use strict';
var slidebarToggle = require('./slidebarToggle');
var initImages = require('./initImages');
var preLoadImg = require('./preLoadImg');
var loadImgs = require('./loadImgs');
var composeImages = require('./composeImages');
var isSingle = require('./isSingle');
var $ = require('../../node_modules/jquery');

$(document).ready(function () {
    // 在微信浏览器中给内容加一个窗口
    // 再给这个容器加一个事件
    // 就会把事件传给body
    // 这是我的试验结果
    $('#js-forWechatbug').click(function () {});

// 菜单显示隐藏 & 菜单项目active变更与图片初始化
    var slideOnBtn = document.getElementById('w3_open'),
        slideOffBtn = document.getElementById('w3_close'),
        menuBlock = document.getElementsByClassName(
            'w3-bar-block')[0];
// 初始化页面
    var w3Thirds = document.getElementsByClassName(
        'w3-third');

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
                var items = oElem.parentNode.querySelectorAll('.w3-bar-item');

                [].forEach.call(items, function (elem) {
                    elem.classList.remove('w3-active');
                });
                oElem.classList.add('w3-active');

                // 初始化图片 待加入
                item.file = oElem.dataset.file;
                item.len = oElem.dataset.len;
                item.num = 0;
                // 建立一个图片序列数组
                item.imgArr = [];
                for (var i=1; i<=item.len; i++) {
                    item.imgArr.push(i);
                }
                // 把imgArr打乱
                item.imgArr.sort(function () { return 0.5 - Math.random(); });
                initImages(w3Thirds, item);
            }
        }
    });

// 类目对象
    var item = {
        file: 'taekwondo', // 文件夹名
        len: 132, // 图片总数
        num: 0 //计数器
    };
    // 建立一个图片序列数组
    item.imgArr = [];
    for (var i=1; i<=item.len; i++) {
        item.imgArr.push(i);
    }
    // 把imgArr打乱
    item.imgArr.sort(function () { return 0.5 - Math.random(); });
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
        // 设置延迟是因为在旋转时
        // 有时页面还没有布好局
        // composeImages就开始重新排列图片了
        // 导致其中的isSingle()判断错误
        setTimeout(function () {
            composeImages();
            loadImgs(item);
        }, 400);
    });

    // 增加图片点击放大效果
    var oMask = document.getElementById('mask');
    var newImg = null;
    document.body.addEventListener('click', function (e) {
        var elem = e.target;
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
            setTimeout(function () {
                oMask.classList.add('final');
            }, 0);
            oMask.getElementsByClassName('fa-remove')[0].style.display = 'inline-block';

            if (document.getElementById('bigImg')) {
                // oMask.removeChild(document.getElementById('bigImg'));
                document.getElementById('imgContainer').innerHTML = '';
            }
            newImg = document.createElement('img');
            newImg.id = 'bigImg';
            newImg.src = elem.src.replace('/small', '');

            // 之前这里的代码是放在newImg.onload中的
            // 但考虑到加载速度
            // 使图片在加载的过程中就可以显示一部分
            // 保留浏览者的耐心
            // oMask.appendChild(newImg);
            document.getElementById('imgContainer').appendChild(newImg);
            newImg.style.width = '100%';

            newImg.onload = function () {
                oMask.style.backgroundImage = 'none';
                 // pinchzoom();
                // setTimeout(function () {
                //     // 高度未撑满的图片垂直居中
                //     if (newImg.offsetHeight < window.innerHeight) {
                //         newImg.style.top = (window.innerHeight -
                //             newImg.offsetHeight) / 2 + 'px';
                //     }
                // }, 400);

                // 放大缩小按钮显示
                btn.style.display = 'block';

                return;
            };
        }

        // 点击图片缩小
        // if (elem.id === 'bigImg') {
        //     document.documentElement.style.height =
        //         document.body.style.height = 'auto';
        //     document.documentElement.style.overflow =
        //         document.body.style.overflow = 'auto';
        //     document.body.scrollTop = document.body.dataset.STop;
        //     oMask.classList.remove('final');
        //     setTimeout(function () {
        //         oMask.style.cssText = '';
        //     }, 200); // 这是200是根据css中的transition得出的
        //
        //     // 放大缩小按钮隐藏重置
        //     btn.style.display = 'none';
        //     btn.classList.remove('fa-search-minus');
        //     btn.classList.add('fa-search-plus');
        //     btn.getElementsByTagName('span')[0].innerText =
        //         btn.getElementsByTagName('span')[0].innerText.replace('缩小','放大');
        //
        //     return;
        // }

        // 放大缩小按钮事件
        if (elem.classList.contains('fa-search-plus') ||
            elem.classList.contains('fa-search-minus') ||
            elem.parentNode.classList.contains('fa-search-plus') ||
            elem.parentNode.classList.contains('fa-search-minus')) {

            if (elem.nodeName === 'SPAN') {
                elem = elem.parentNode;
            }

            if (elem.classList.contains('fa-search-plus')) {

                elem.classList.remove('fa-search-plus');
                elem.classList.add('fa-search-minus');
                elem.getElementsByTagName('span')[0].innerText =
                        elem.getElementsByTagName('span')[0].innerText.replace('放大','缩小');
                bigImg.dataset.styles = bigImg.style.cssText;

                // 如果图片本身的宽度小于 width: 100% 时的完宽度
                // 那就不清除cssText
                // 且把它的宽度放大150%
                // 造成放大的假想
                if (bigImg.naturalWidth > bigImg.offsetWidth) {
                    bigImg.style.cssText = '';
                } else {
                    bigImg.style.width = '150%';
                }

                // 把图片放大后居中
                if (bigImg.offsetWidth > oMask.offsetWidth) {
                    oMask.scrollLeft = (bigImg.offsetWidth -
                        oMask.offsetWidth) / 2;
                    oMask.scrollTop = (bigImg.offsetHeight -
                        oMask.offsetHeight) / 2;
                }

            } else {

                elem.classList.remove('fa-search-minus');
                elem.classList.add('fa-search-plus');
                elem.getElementsByTagName('span')[0].innerText =
                    elem.getElementsByTagName('span')[0].innerText.replace('缩小','放大');
                bigImg.style.cssText = bigImg.dataset.styles;

                oMask.scrollLeft = oMask.scrollTop = 0;
            }
        }
    }, true);


// 遮罩层放大后禁止body滚动
    oMask.addEventListener('transitionend', function () {

        if (this.classList.contains('final')) {
            document.documentElement.style.height =
                document.body.style.height = '100%';
            document.documentElement.style.overflow =
                document.body.style.overflow = 'hidden';
        }
    });


// 关闭Mask
    oMask.getElementsByClassName('fa-remove')[0].addEventListener('click',
        function () {
            this.style.display = 'none';
            document.documentElement.style.height =
                document.body.style.height = 'auto';
            document.documentElement.style.overflow =
                document.body.style.overflow = 'auto';
            document.body.scrollTop = document.body.dataset.STop;
            oMask.classList.remove('final');
            setTimeout(function () {
                oMask.style.cssText = '';
            }, 200); // 这是200是根据css中的transition得出的

            // 放大缩小按钮隐藏重置
                var btn = oMask.getElementsByTagName('i')[0];
                btn.style.display = 'none';
                btn.classList.remove('fa-search-minus');
                btn.classList.add('fa-search-plus');
                btn.getElementsByTagName('span')[0].innerText =
                    btn.getElementsByTagName('span')[0].innerText.replace('缩小','放大');

                return;
        });
});