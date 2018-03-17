function BlurBG(Img_source, Img_filter, CSS_class) {
    /*  sourceImg 原始圖片
        blur 模糊程度
        class 輸出的 Class
            .BlurBG{
                background-image:url("data:image/png;base64, iVBOR/w38GIA...")
            }
        opacity 輸出圖片的透明度，可以搭配背景顏色使用
    */
    //整理拿到的數據，沒有的話給預設值
    Img_filter = Img_filter || "blur(5px) opacity(50%)";
    CSS_class = CSS_class || "BlurBG";
    //看看 sessionStorage 有沒有圖片
    if (window.sessionStorage["Blur_" + Img_source] && window.sessionStorage["filter_" + Img_source] == Img_filter) {
        createClass(window.sessionStorage["Blur_" + Img_source], CSS_class)
        return
    }
    // 好懶喔
    var img = new Image();
    img.src = Img_source;
    img.setAttribute("crossOrigin", 'Anonymous')
    img.onload = function() {
        imgHeight = img.height;
        imgWidth = img.width;

        // Create Canvas
        var canvas = document.createElement("canvas");
        canvas.setAttribute('width', imgWidth);
        canvas.setAttribute('height', imgHeight);

        // Blur
        var ctx = canvas.getContext('2d');
        ctx.filter = Img_filter;
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        // 產生 Style 供套用
        var PngBase64 = canvas.toDataURL();
        createClass(PngBase64, CSS_class);
        // 存到 sessionStorage
        window.sessionStorage["Blur_" + Img_source] = PngBase64;
        window.sessionStorage["filter_" + Img_source] = Img_filter; //如果這個參數不同，將重新產生圖片
    };

}

function createClass(img, CSS_class) {
    var css = '.' + CSS_class + '{background-image:url(' + img + ')}'

    var createClass = document.createElement("style");
    createClass.setAttribute('type', 'text/css');
    createClass.appendChild(document.createTextNode(css));

    document.head.appendChild(createClass)
}