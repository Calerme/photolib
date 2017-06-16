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