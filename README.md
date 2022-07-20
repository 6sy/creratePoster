### 示例演示
1.webpack方式:
npm i
npm run dev

2.手动引入：
在src/index.html手动引入dist/main.js

### 引入

### 用法：
```
const config ={ width: 300, height: 700, suffix: 'jpeg', scale: 5 }
const posterElements = [
    {
        type: 'img',
        src: 'https://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/a95789e8626cd3d428ecb85c823d525c.png',
        x: 0,
        y: 0,
        width: 250,
        height: 450,
    },
    {
        type: 'custom',
        callback: draw
    },
    {
        type: 'img',
        src: 'https://wechatapppro-1252524126.file.myqcloud.com/appAKLWLitn7978/image/b_u_5b2225aa46488_oGKN7IvA/ktb3nze709jx.jpeg?imageView2/2/w/640/h/480/q/100/format/webp',
        x: 10,
        y: 100,
        width: 230,
        height: 120
    },
    {
        type: 'font',
        x: 10,
        y: 20,
        value: '好好学习',
        size: 20
    }
]
createPoster(conifg, posterElements).then(res => {
    img.src = res;
})
```
#### config参数说明：
|参数|描述|类型|可选值|默认值|
|:--|:--:|:--:|:--:|--:|
|width|海报展示的宽度|number| --| 300|
|height|海报展示的长度|number| --| 700|
|suffix|生成海报的图片类型|string| png/webp/jpeg| jpeg|
|scale|图片质量系数，数值越高，越清晰，质量越大|number| --| 5|

### posterElements参数说明：
#### type = img;
|参数|描述|类型|可选值|默认值|
|:--|:--:|:--:|:--:|--:|
|type|元素类型|string| img/font/custom| --|
|src|图片的地址|string| --| --|
|width|图片的宽度|number| --| --|
|height|图片的长度|number| --| --|
|x|图片距离左的距离|number| --| --|
|y|图片距离上的距离|number| --| --|
|borderRadius|图片是否裁剪圆角|boolean| false/true| false|

#### type = font
|参数|描述|类型|可选值|默认值|
|:--|:--:|:--:|:--:|--:|
|type|元素类型|string| img/font/custom| --|
|value|文字内容|string| --| --|
|size|文字大小|number| --| 10|
|color|文字颜色|string| --| black|
|family|文字的字体|string| --| "Arial,sans-serif"|
|textBaseline|文字的对齐方式|string| top/hanging/middle/alphabetic/ideographic/ bottom| hanging|
|maxWidth|一行最大的文本长度|number| --| 350|
|lineHeight|文字的行高|number| --| 12|

#### type = custom
|参数|描述|类型|可选值|默认值|
|:--|:--:|:--:|:--:|--:|
|type|元素类型|string| img/font/custom| --|
|callback|执行的绘制函数|fn| --| --|


### 版本 1.0
- 支持绘制文字，图片
- 支持图片圆角
- 支持文字单行最大长度，自动换行
- 支持用户自定义操作


