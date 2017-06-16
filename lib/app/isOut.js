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