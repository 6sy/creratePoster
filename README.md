### 示例演示
npm i
npm run dev

### 参数说明
```
let posterObj={
    background:{
        type:"background-img", //  类型为背景图 有且只有一个 
        src:this.posterData.posterImg, // 背景图地址
        x:0,// x坐标
        y:0, // y坐标
        width:187, // 背景图长度
        height:333, // 背景图宽度
    },
    avatar:{
        type:"img",  // 类型为图片
        src:this.posterData.userImg, // 图片地址
        x:this.posterData.avatarPosition.x , // 图片x坐标
        y:this.posterData.avatarPosition.y , // 图片y坐标
        width:24, // 图片长度 
        height:24, // 图片宽度
        border:12  // 需要裁剪为圆形时 值为长宽一半 目前只支持正方形                --选填
    },
    qrcode:{
        type:'img', // 类型为图片
        src:this.qrCodeUrlBase64, // base64
        x:this.posterData.qrcodePosition.x , // 图片x坐标
        y:this.posterData.qrcodePosition.y , // 图片y坐标
        width:42, // 图片长度 
        height:42 // 图片宽度
    },
    nickname:{
        type:"font",  // 类型为文字
        x:this.posterData.nicknamePosition.x , // 文字x坐标
        y:this.posterData.nicknamePosition.y , // // 文字y坐标
        value:this.posterData.nickname // 文字 值
        size:10,  // 文字的大小 默认为10                                            --选填
        color:"black" // 文字颜色  默认black                                        --选填
        textBaseline:"hanging" // 文字对齐方式 默认为hanging  具体值参考mdn canvas  --选填
    }
}
/*
posterObj:海报元素的对象
width:为b端自定义海报容器长度 
height:为b端自定义海报容器宽度 
proportion:为生成海报的质量大小的参数 值越大质量越高
*/
new objToPoster(posterObj,width,height,proportion).convertToImg().then(res=>{
        console.log(res)           // res即为生成的base64图片
})
```
### 版本 1.0

生成海报基本功能完成


