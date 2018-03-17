function BlurBG(Img_source, Img_filter, CSS_class) {

    //整理拿到的數據，沒有的話給預設值
    Img_filter = Img_filter || "blur(5px) opacity(50%)";
    CSS_class = CSS_class || "BlurBG";

    //看看 sessionStorage 有沒有圖片
    if (window.sessionStorage["Blur_" + Img_source] && window.sessionStorage["filter_" + Img_source] == Img_filter) {
        createClass(window.sessionStorage["Blur_" + Img_source], CSS_class, Img_filter)
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
        imgHeight = img.height;
        imgWidth = img.width;
        canvas.setAttribute('width', imgWidth);
        canvas.setAttribute('height', imgHeight);
        // Blur
        var ctx = canvas.getContext('2d');
        ctx.filter = Img_filter;
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        var PngBase64 = canvas.toDataURL();
        // 存到 sessionStorage
        window.sessionStorage["Blur_" + Img_source] = PngBase64;
        window.sessionStorage["filter_" + Img_source] = Img_filter; //如果這個參數不同，將重新產生圖片
        // 產生 Style 供套用
        createClass(window.sessionStorage["Blur_" + Img_source], CSS_class, Img_filter);
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