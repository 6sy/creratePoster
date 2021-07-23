/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_drawImage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/drawImage.js */ \"./src/utils/drawImage.js\");\n/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/util */ \"./src/utils/util.js\");\n// obj img font shape\r\n\r\n\r\nlet TYPES = [\"background-img\", \"img\", \"font\", \"shapes\"];\r\nclass objToPoster {\r\n    // posterObj-元素对象 imgWidth-图片宽（单位默认px） imgHeight-图片长（单位默认px） proportion（图片精度-越大精度越高）\r\n    constructor(posterObj, imgWidth = 300, imgHeight = 700, proportion = 1) {\r\n        this.ctx = null;\r\n        this.canvas=null;\r\n        // 生成的海报\r\n        this.img=null;\r\n        this.proportion=proportion\r\n        // 绘制的所有图片 文字默认再图片上面 == 所以先画图片再画文字的\r\n        this.posterImages = [];\r\n        // 绘制所有的文字\r\n        this.posterFonts = [];\r\n        this.initCanvas(imgWidth * proportion, imgHeight * proportion);\r\n        this.initPosterObj(posterObj);\r\n    }\r\n    initCanvas(width, height) {\r\n        let canvas = document.createElement(\"canvas\");\r\n        this.canvas = canvas;\r\n        canvas.style[\"position\"] = \"absolute\";\r\n        canvas.style[\"z-index\"] = \"-1\";\r\n        canvas.style[\"top\"] = 0;\r\n        canvas.style[\"left\"] = 0;\r\n        canvas.style[\"display\"] = \"none\";\r\n        canvas.width = width;\r\n        canvas.height = height;\r\n        document.body.appendChild(canvas);\r\n        this.ctx = canvas.getContext(\"2d\");\r\n        console.log(\"init-canvas is ok\");\r\n    }\r\n    // 将对象转换成一个数组按照绘画顺序的\r\n    initPosterObj(posterObj) {\r\n        Object(_utils_util__WEBPACK_IMPORTED_MODULE_1__[\"verfiyObjEmpty\"])(posterObj);\r\n        let objNames = Object.keys(posterObj);\r\n        for (let i = 0; i < objNames.length; i++) {\r\n            // 背景图片\r\n            if (posterObj[objNames[i]].type === TYPES[0]) {\r\n                this.posterImages.unshift(posterObj[objNames[i]]);\r\n            }\r\n            // 普通图片\r\n            if (posterObj[objNames[i]].type === TYPES[1]) {\r\n                this.posterImages.push(posterObj[objNames[i]]);\r\n            }\r\n            // 文字\r\n            if (posterObj[objNames[i]].type === TYPES[2]) {\r\n                this.posterFonts.push(posterObj[objNames[i]]);\r\n            }\r\n        }\r\n    }\r\n    // 初始化所有的图片资源\r\n    async initImages(arr) {\r\n        let imgLoadPromise = [];\r\n        for (let j = 0; j < arr.length; j++) {\r\n            let p = new Promise((resolve, reject) => {\r\n                let img = new Image();\r\n                img.crossOrigin = \"anonymous\";\r\n                img.src = arr[j].src;\r\n                img.onload = function () {\r\n                    arr[j].imgOnload = img;\r\n                    resolve(true);\r\n                };\r\n            });\r\n            imgLoadPromise.push(p);\r\n        }\r\n        return await Promise.all(imgLoadPromise);\r\n    }\r\n    // 开始画画\r\n    draw(ctx, arr) {\r\n            this.drawImgs();\r\n            this.drawFonts();\r\n    }\r\n    drawImgs(){\r\n        for(let i=0;i<this.posterImages.length;i++){\r\n            Object(_utils_drawImage_js__WEBPACK_IMPORTED_MODULE_0__[\"drawImage\"])(this.ctx,this.posterImages[i],this.proportion)\r\n        }\r\n    }\r\n    drawFonts(){\r\n        for (let i = 0; i < this.posterFonts.length; i++) {\r\n            Object(_utils_drawImage_js__WEBPACK_IMPORTED_MODULE_0__[\"drawFont\"])(this.ctx, this.posterFonts[i], this.proportion);\r\n        }\r\n    }\r\n    async convertToImg(){\r\n        return new Promise(async (res,rej)=>{\r\n            try{\r\n                await this.initImages(this.posterImages);\r\n                this.draw();\r\n                this.img = this.canvas.toDataURL(\"image/png\",1);\r\n                res(this.img)\r\n            }\r\n            catch(e){\r\n                console.error(e)\r\n            }\r\n            \r\n        })\r\n    }\r\n}\r\nwindow.objToPoster = objToPoster;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (objToPoster);\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils/drawImage.js":
/*!********************************!*\
  !*** ./src/utils/drawImage.js ***!
  \********************************/
/*! exports provided: drawImage, drawFont */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawImage\", function() { return drawImage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"drawFont\", function() { return drawFont; });\nfunction drawImage(ctx, obj,proportion) {\r\n    ctx.beginPath();\r\n    ctx.drawImage(\r\n        obj.imgOnload,\r\n        obj.x * proportion,\r\n        obj.y * proportion,\r\n        obj.width * proportion,\r\n        obj.height * proportion\r\n    );\r\n    ctx.closePath();\r\n}\r\n\r\n\r\nfunction drawFont(ctx,obj,proportion) {\r\n    // 大小\r\n    let size=obj.size||'16px'\r\n    // 颜色\r\n    let color=obj.color||'black'\r\n    // 样式\r\n    let family = obj.family || \"serif\";\r\n    // 文字对齐方式\r\n    let textBaseline = obj.textBaseline || \"hanging\";\r\n\r\n    ctx.beginPath();\r\n    ctx.fillStyle=color\r\n    ctx.font = `${size} ${family}`\r\n    ctx.textBaseline = textBaseline;\r\n    ctx.fillText(obj.value, obj.x * proportion, obj.y * proportion);\r\n    ctx.closePath()\r\n}\n\n//# sourceURL=webpack:///./src/utils/drawImage.js?");

/***/ }),

/***/ "./src/utils/util.js":
/*!***************************!*\
  !*** ./src/utils/util.js ***!
  \***************************/
/*! exports provided: verfiyObjEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"verfiyObjEmpty\", function() { return verfiyObjEmpty; });\nfunction verfiyObjEmpty(obj){\r\n    if(Object.prototype.toString(obj)!==\"[object Object]\"){\r\n        console.error(\"objToPoster的第一个参数必须为一个对象\");\r\n        return;\r\n    }\r\n    if(JSON.stringify(obj)===\"{}\" && !Object.getOwnPropertySymbols(obj).length){\r\n        console.error(\"objToPoster的第一个参数不能为空对象\");\r\n        return;\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/utils/util.js?");

/***/ })

/******/ });