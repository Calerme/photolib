// 预加载一张图片
var insertAImg = require('./insertAImg');

function loadImg(file, num, fn) {
    var newImg = document.createElement('img');
    // newImg.src = './img/'+ file +'/small/' + num + '.jpg';
    newImg.src = 'http://ormsmntmt.bkt.clouddn.com/img/'+ file +'/small/' + num + '.jpg';
    newImg.classList.add('materialboxed');

    return newImg;
}

module.exports = loadImg;