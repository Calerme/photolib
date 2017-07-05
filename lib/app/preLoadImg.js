// 预加载一张图片
var insertAImg = require('./insertAImg');

function loadImg(file, num, arr, fn) {
    var newImg = document.createElement('img');
    // newImg.src = './img/'+ file +'/small/' + num + '.jpg';
    newImg.src = 'http://ortoenmme.bkt.clouddn.com/img/'+ file +'/small/' + arr[num] + '.jpg';
    newImg.classList.add('materialboxed');
    newImg.dataset.realIndex = num;
    return newImg;
}

module.exports = loadImg;