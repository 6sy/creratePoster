// obj img font shape
import { drawImage } from "./utils/drawImage.js";
let types = ["background-img", "img", "font", "shapes"];
class objToPoster {
    // dom:canvas对象
    // obj:初始化海报内容的对象
    //  1.确保所有图片资源加载完毕
    constructor(dom, obj) {
        return new Promise((resolve, reject) => {
            let ctx = this.initCanvas(dom);
            this.initImage(obj).then(res => {
                let arr = this.initObjToArr(obj);
                console.log("res-图片加载完毕");
                console.log(obj);
                this.draw(ctx, arr);
            });
        });
    }
    // 初始化所有图片资源 异步
    initImage(obj) {
        let objNames,
            imageNames = [],
            imgLoadPromise = [];
        objNames = Object.keys(obj);
        for (let i = 0; i < objNames.length; i++) {
            if (obj[objNames[i]].type == "img" || obj[objNames[i]].type == "background-img") {
                imageNames.push(obj[objNames[i]]);
            }
        }
        for (let j = 0; j < imageNames.length; j++) {
            let p = new Promise((resolve, reject) => {
                let img = new Image();
                img.src = imageNames[j].src;
                img.onload = function () {
                    imageNames[j].imgOnload = img;
                    console.log(obj);
                    resolve(true);
                };
            });
            imgLoadPromise.push(p);
        }
        return Promise.all(imgLoadPromise);
    }
    // 开始画画
    draw(ctx, arr) {
        for (let i = 0; i < arr.length; i++) {
            switch (arr[i].type) {
                case "background-img":
                    drawImage(ctx, arr[i]);
                    break;
                case "img":
                    drawImage(ctx, arr[i]);
            }
        }
    }
    initCanvas(dom) {
        let ctx;
        ctx = dom.getContext("2d");
        console.log("init-canvas");
        return ctx;
    }
    initObjToArr(obj) {
        let tempArr = [],
            arr = [];
        for (let i in obj) {
            tempArr.push(obj[i]);
        }
        for (let i = 0; i < types.length; i++) {
            for (let j = 0; j < tempArr.length; j++) {
                if (types[i] == tempArr[j].type) {
                    arr.push(tempArr[j]);
                }
            }
        }
        console.log(arr);
        console.log("init-obj");
        return arr;
    }
}

window.objToPoster = objToPoster;
