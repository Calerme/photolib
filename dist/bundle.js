/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 判断页面是不是单列


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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// 用来插入一张图片的函数
// 函数将接收一个img对象作为参数
var isSingle = __webpack_require__(0);
var getLowestW3Third = __webpack_require__(4);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// 加载图片
// 如果某个w3-third没有超出视口
// 且图片计数未完就再加载一张

var insertAImg = __webpack_require__(1);
var preLoadImg = __webpack_require__(3);
var isOut = __webpack_require__(5);
var isSingle = __webpack_require__(0);
var getLowestW3Third = __webpack_require__(4);

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
    var newImg = preLoadImg(item.file, item.num + 1);
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// 预加载一张图片
var insertAImg = __webpack_require__(1);

function loadImg(file, num, fn) {
    var newImg = document.createElement('img');
    // newImg.src = './img/'+ file +'/small/' + num + '.jpg';
    newImg.src = 'http://ormsmntmt.bkt.clouddn.com/img/'+ file +'/small/' + num + '.jpg';
    newImg.classList.add('materialboxed');

    return newImg;
}

module.exports = loadImg;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// 获得最低的w3-third
// 传入一个包含w3-third对象的集合

function getLowestW3Third(w3Thirds) {
    var w3ThirdHeights = [
        w3Thirds[0].offsetHeight,
        w3Thirds[1].offsetHeight,
        w3Thirds[2].offsetHeight
    ];
    var lowestHeight = Math.min.apply(null, w3ThirdHeights);

    for (var i=0; i<3; i++) {
        if (w3Thirds[i].offsetHeight === lowestHeight) {
            return w3Thirds[i];
        }
    }
}

module.exports = getLowestW3Third;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// 判断三个w3-third是不是超出了视口
function isOut() {
    var w3thirds = document.getElementsByClassName(
                'w3-third');

    var vPHeight = window.innerHeight;
    var bool = [].every.call(w3thirds, function (elem) {
        var elemBootom = elem.
                getBoundingClientRect().bottom;
        return elemBootom > vPHeight;
    });
    return bool;
}

module.exports = isOut;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// 所有图片重新排列函数
// window.onresize
// window.onorientationchange
var isSingle = __webpack_require__(0);
var insertAImg = __webpack_require__(1);

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

    // 排序无效 待修改
    arrImg.sort(function (a,b) {
        var aNum = parseInt(/[0-9]+\./.exec(a.src)[0]);
        var bNum = parseInt(/[0-9]+\./.exec(b.src)[0]);
        return aNum > bNum;
    });

    // 清空3个w3-third
    [].forEach.call(w3Thirds, function (elem) {
        elem.innerHTML = '';
    });

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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// 初始化页面
// 用于页面初次载入
// 选择相应菜单变更图片内容
// len=图片总数量,file=文件夹的名字，num=图片计数
var isOut = __webpack_require__(5);
var loadImgs = __webpack_require__(2);

function initImages(w3Thirds, item) {
    // 清空w3-third的内容
    [].forEach.call(w3Thirds, function (elem) {
        elem.innerHTML = '';
    });

    loadImgs(item);
}

module.exports = initImages;



/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 控制菜单slidebar打开与关闭的两个函数


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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var slidebarToggle = __webpack_require__(8);
var initImages = __webpack_require__(7);
var preLoadImg = __webpack_require__(3);
var loadImgs = __webpack_require__(2);
var composeImages = __webpack_require__(6);
var isSingle = __webpack_require__(0);

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
document.body.addEventListener('touchstart', function (e) {
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
                // 高度未撑满的图片垂直居中
                if (newImg.offsetHeight < window.innerHeight) {
                    newImg.style.top = (window.innerHeight -
                        newImg.offsetHeight) / 2 + 'px';
                }
            },400);

            // 放大缩小按钮显示
            btn.style.display = 'block';

            return;
        };
    }

    // 点击图片缩小
    if (elem.id === 'bigImg') {
        document.documentElement.style.height =
            document.body.style.height = 'auto';
        document.documentElement.style.overflow =
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

        return;
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
                oMask.scrollTop = (bigImg.offsetHeight -
                    oMask.offsetHeight) / 2;
            }

        } else {

            elem.classList.remove('fa-search-minus');
            elem.classList.add('fa-search-plus');
            bigImg.style.cssText = bigImg.dataset.styles;
        }
    }
});


// 遮罩层放大后禁止body滚动
oMask.addEventListener('transitionend', function () {

    if (this.classList.contains('final')) {
        document.documentElement.style.height =
            document.body.style.height = '100%';
        document.documentElement.style.overflow =
            document.body.style.overflow = 'hidden';
    }
});

// 放大缩小按钮
// 与body代理的事件一致，只是为了兼容移动端
var ibtn = oMask.getElementsByTagName('i')[0];
ibtn.addEventListener('touchstart' ,function (e) {
    e.stopPropagation();
    var elem = this;
    var bigImg = this.parentNode.querySelector('img#bigImg');
    // 放大缩小按钮事件
    if (elem.classList.contains('fa-search-plus')) {

        elem.classList.remove('fa-search-plus');
        elem.classList.add('fa-search-minus');
        bigImg.dataset.styles = bigImg.style.cssText;
        bigImg.style.cssText = '';

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
        bigImg.style.cssText = bigImg.dataset.styles;
    }

})

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map