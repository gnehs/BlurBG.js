function BlurBG(Img_source, Img_filter, CSS_class) {

    //整理拿到的數據，沒有的話給預設值
    Img_filter = Img_filter || "blur(5px) opacity(50%)";
    CSS_class = CSS_class || "BlurBG";

    //看看 sessionStorage 有沒有圖片
    if (window.sessionStorage["Blur_" + Img_source] && window.sessionStorage["filter_" + b64EncodeUnicode(Img_source)] == Img_filter) {
        createClass(window.sessionStorage["Blur_" + b64EncodeUnicode(Img_source)], CSS_class, Img_filter)
    } else {
        blurImg(Img_source, Img_filter, CSS_class)
    }

}

function blurImg(Img_source, Img_filter, CSS_class) {


    // Create Canvas
    var canvas = document.createElement("canvas");

    // 好懶喔
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = Img_source;
    img.onload = function() {
        if (img.width > 4000 && img.height > 2000) {
            var imgHeight = img.height / 5
            var imgWidth = img.width / 5
        } else if (img.width > 1000 && img.height > 500) {
            var imgHeight = img.height / 2
            var imgWidth = img.width / 2
        } else {
            var imgHeight = img.height
            var imgWidth = img.width
        }
        canvas.setAttribute('width', imgWidth);
        canvas.setAttribute('height', imgHeight);
        // Blur
        var ctx = canvas.getContext('2d');
        ctx.filter = Img_filter;
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        // Base64
        var PngBase64 = canvas.toDataURL();
        // 產生 Style 供套用
        createClass(PngBase64, CSS_class, Img_filter);
        // 存到 sessionStorage
        window.sessionStorage["Blur_" + b64EncodeUnicode(Img_source)] = PngBase64;
        window.sessionStorage["filter_" + b64EncodeUnicode(Img_source)] = Img_filter; //如果這個參數不同，將重新產生圖片
    };
}

function createClass(img, CSS_class, Img_filter) {
    console.log(Img_filter)
    var css = '.' + CSS_class + '{background-image:url(' + img + ');'

    var createClass = document.createElement("style");
    createClass.setAttribute('type', 'text/css');
    createClass.appendChild(document.createTextNode(css));

    document.head.appendChild(createClass)
}

function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
}