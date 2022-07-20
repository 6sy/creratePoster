import { drawImage, drawFont,clipPreviousHandle } from "./utils/drawImage.js";

/**
 * @method ：
 * @param {object} config Poster Configuration information
 * @param {number} config.width  Generate the width of the picture poster
 * @param {number} config.height  Generate the height of the picture poster
 * @param {number} config.scale  Posters quality
 * @param {number} config.suffix  生成图片类型
 * @param {array} ele
 * @param {object[]} posterElement Poster element
 * @param {string} posterElement.type  image | font | custom
 * @param {number} posterElement.width  The wdith of the image in the poster when the type is image
 * @param {number} posterElement.height  The height of the image in the poster when the type is image
 * @param {number} posterElement.borderRadius The border radius of the image in the poster when the type is image
 * @param {number} posterElement.src   Picture address
 * @param {number} posterElement.top   the top of the poster 
 * @param {number} posterElement.left   the left of the poster 
 * @param {number} posterElement.size  font size
 * @param {string} posterElement.color  font color
 * @param {string} posterElement.family  font family
 * @param {string} posterElement.maxWidth  Maximum length of a line of text
 * @param {string} posterElement.lineHeight  font line-height
 * @param {string} posterElement.textBaseline  font alignment
 * @param {function} posterElement.fn  custom function
 * @param {array} ele Array of poster elements
 * @return {promise} Return a Promise object,receive a base64 image
 */
function createPoster(config, ele) {
    const instance = new poster(config);
    return instance.outputImg(ele);
}
class poster {
    constructor(config = { width: 300, height: 700, suffix: 'jpeg', scale: 5 }) {
        this.suffixArray = ['png', 'webp', 'jpeg'];
        this.canvasConifg = config;
        this.ctx = null;
        this.canvas = null;
        this.scale = config.scale || 1;
        this.posterBase64 = null; // The final poster is base64
        this.initCanvas(config.width, config.height); // Initialize the canvas element

    }
    initCanvas(width, height) {
        let canvas = document.createElement("canvas");
        this.canvas = canvas;
        canvas.style["position"] = "absolute";
        canvas.style["z-index"] = "-1";
        canvas.style["top"] = 0;
        canvas.style["left"] = 0;
        canvas.style["display"] = "none";
        canvas.width = width * this.scale;
        canvas.height = height * this.scale;
        document.body.appendChild(canvas);
        this.ctx = canvas.getContext("2d");

    }
    initImage(ele) {
        const imagePromise = [];
        ele.filter((item, index) => {
            if (item.type == 'img') {
                const p = new Promise((res, rej) => {
                    let img = new Image();
                    img.crossOrigin = "anonymous";
                    img.src = ele[index].src;
                    img.onload = function () {
                        item.imgElement = img;
                        res(true);
                    };
                })
                imagePromise.push(p)
                return true
            }
        })
        return Promise.all(imagePromise);
    }
    draw(ele) {
        ele.forEach((element, index) => {
            console.log(element)
            if (element.type == 'img') {
                drawImage(this.ctx, element, this.scale)
            }
            else if (element.type == 'custom') {
                this.ctx.beginPath();
                clipPreviousHandle(this.ctx);
                element.callback(this.ctx);
            }
            else if (element.type == 'font') {
                drawFont(this.ctx, element, this.scale)
            }
        });
    }
    toConverImg() {
        let suffix = this.canvasConifg.suffix || 'jpeg';
        if (!this.suffixArray.includes(suffix)) {
            console.error("The image type can only be PNG, JPEG, or WebP");
            return;
        }
        return this.canvas.toDataURL(`image/${suffix}`, 1.0);
    }
    async outputImg(ele) {
        await this.initImage(ele);
        this.draw(ele);
        this.posterBase64 = this.toConverImg();
        return this.posterBase64
    }
}

export default createPoster;
window.createPoster = createPoster;