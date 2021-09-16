// obj img font shape
import { drawImage, drawFont } from "./utils/drawImage.js";
let TYPES = ["background-img", "img", "font"];
class objToPoster {
    // posterObj-元素对象 imgWidth-图片宽（单位默认px） imgHeight-图片长（单位默认px） proportion（图片精度-越大精度越高）
    constructor(posterObj, imgWidth = 300, imgHeight = 700, proportion = 1) {
        this.ctx = null;
        this.canvas = null;
        // 生成的海报
        this.img = null;
        this.proportion = proportion;
        // 绘制的所有图片 文字默认再图片上面 == 所以先画图片再画文字的
        this.posterImages = [];
        // 绘制所有的文字
        this.posterFonts = [];
        // 初始化canvas元素
        this.initCanvas(imgWidth * proportion, imgHeight * proportion);
        // 初始化传入的对象    为什么要做这一步:绘图的先后顺序
        this.initPosterObj(posterObj);
    }
    initCanvas(width, height) {
        let canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.style["position"] = "absolute";
        canvas.style["z-index"] = "-1";
        canvas.style["top"] = 0;
        canvas.style["left"] = 0;
        canvas.style["display"] = "none";
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);
        this.ctx = canvas.getContext("2d");
        console.log("init-canvas is ok");
    }
    // 将对象转换成一个数组按照绘画顺序的
    initPosterObj(posterObj) {
        let objNames = Object.keys(posterObj);
        for (let i = 0; i < objNames.length; i++) {
            // 背景图片
            if (posterObj[objNames[i]].type === TYPES[0]) {
                this.posterImages.unshift(posterObj[objNames[i]]);
            }
            // 普通图片
            if (posterObj[objNames[i]].type === TYPES[1]) {
                this.posterImages.push(posterObj[objNames[i]]);
            }
            // 文字
            if (posterObj[objNames[i]].type === TYPES[2]) {
                this.posterFonts.push(posterObj[objNames[i]]);
            }
        }
    }
    // 初始化所有的图片资源
    initImages(arr) {
        let imgLoadPromise = [];
        for (let j = 0; j < arr.length; j++) {
            let p = new Promise((resolve, reject) => {
                let img = new Image();
                img.crossOrigin = "anonymous";
                img.src = arr[j].src;
                img.onload = function () {
                    console.log("img-onload");
                    arr[j].imgOnload = img;
                    resolve(true);
                };
            });
            imgLoadPromise.push(p);
        }
        return Promise.all(imgLoadPromise);
    }
    // 开始画画
    draw(ctx, arr) {
        this.drawImgs();
        this.drawFonts();
    }
    drawImgs() {
        for (let i = 0; i < this.posterImages.length; i++) {
            drawImage(this.ctx, this.posterImages[i], this.proportion);
        }
    }
    drawFonts() {
        for (let i = 0; i < this.posterFonts.length; i++) {
            drawFont(this.ctx, this.posterFonts[i], this.proportion);
        }
    }
    convertToImg() {
        return new Promise(async (res, rej) => {
            try {
                await this.initImages(this.posterImages);
                this.draw();
                this.img = this.canvas.toDataURL("image/jpeg");
                this.clearCanvas();
                res(this.img);
            } catch (e) {
                console.error(e);
            }
        });
    }
    clearCanvas() {
        this.canvas.remove();
    }
}

export default objToPoster;
window.objToPoster = objToPoster