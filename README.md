# BlurBG.js
這是個能讓你輕鬆模糊圖片的羽量級 js
## 原理
將圖片丟進 canvas 然後模糊並取出 base64 再塞進 class 裡
## 使用
1. 載入 js
```html
<script src="BlurBG.js"></script>
```
2. 模糊圖片
```js
BlurBG(img,[filter, class])
```
- `img` 為圖片路徑
- `filter` 為圖片濾鏡，預設是 `blur(5px) opacity(50%)` ，應該跟 CSS 的差不多啦
- `class` 為圖片 `class` ，預設是 `BlurBG` 將所有套入此 class 的元素加入模糊後的背景
## Demo
製作中
