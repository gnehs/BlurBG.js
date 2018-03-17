function BlurBG(Img_source, Img_filter, CSS_class) {
    /*  sourceImg 原始圖片
        blur 模糊程度
        class 輸出的 Class
            .BlurBG{
                background-image:url("data:image/png;base64, iVBOR/w38GIA...")
            }
        opacity 輸出圖片的透明度，可以搭配背景顏色使用
    */
    //看看 sessionStorage 有沒有圖片
    if (window.sessionStorage["Blur_" + Img_source]) {
        createClass(window.sessionStorage["Blur_" + Img_source], CSS_class)
    }
    //整理拿到的數據，沒有的話給預設值
    Img_filter = Img_filter || "blur(5px) opacity(50%)";
    CSS_class = CSS_class || "BlurBG";
    // 好懶喔
    var img = new Image();
    img.src = Img_source;
    img.setAttribute("crossOrigin", 'Anonymous')
    img.onload = function() {
        var idRandom = Math.floor(Math.random() * 10000);
        imgHeight = img.height;
        imgWidth = img.width;
        console.log('image size: %sx%s', imgWidth, imgHeight)

        // Create Canvas
        var createCanvas = document.createElement("canvas");
        createCanvas.setAttribute('id', 'blur_canvas' + idRandom);
        createCanvas.setAttribute('style', 'display:none');
        createCanvas.setAttribute('width', imgWidth);
        createCanvas.setAttribute('height', imgHeight);
        document.body.appendChild(createCanvas);

        // Blur
        var canvas = document.getElementById('blur_canvas' + idRandom);
        var ctx = canvas.getContext('2d');
        ctx.filter = Img_filter;
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        // 產生 Style 供套用
        var PngBase64 = canvas.toDataURL("image/png");
        createClass(PngBase64, CSS_class);
        // 存到 sessionStorage
        window.sessionStorage["Blur_" + Img_source] = PngBase64;
    };
}

function createClass(img, CSS_class) {

    var css = '.' + CSS_class + '{background-image:url(' + img + ')}'

    var createClass = document.createElement("style");
    createClass.setAttribute('type', 'text/css');
    createClass.appendChild(document.createTextNode(css));

    document.head.appendChild(createClass)
}