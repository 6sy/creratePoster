export function drawImage(ctx, element, scale) {

    ctx.beginPath();
    clipPreviousHandle(ctx)
    if (element.borderRadius) { // need to clip  
        ctx.arc(
            (element.width * scale) / 2 + element.x * scale,
            (element.width * scale) / 2 + element.y * scale,
            element.width * scale / 2,
            0,
            Math.PI * 2,
            true
        );
        ctx.clip();
        ctx.drawImage(
            element.imgElement,
            element.x * scale,
            element.y * scale,
            element.width * scale,
            element.height * scale
        );

        ctx.closePath();

    } else {
        ctx.drawImage(
            element.imgElement,
            element.x * scale,
            element.y * scale,
            element.width * scale,
            element.height * scale
        );
        ctx.closePath();
    }
}

export function drawFont(ctx, element, scale) {
    // 大小
    let size = element.size || 10;
    size = size * scale + "px";
    // 颜色
    let color = element.color || "black";
    // 样式
    let family = element.family || "Arial,sans-serif";
    // 文字对齐方式
    let textBaseline = element.textBaseline || "hanging";

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.font = `${size} ${family}`;
    ctx.textBaseline = textBaseline;
    ctx.wrapText(element.value, element.x * scale, element.y * scale,element.maxWidth, element.lineHeight,scale);
    ctx.closePath();
}
export function drawBlobImg(ctx, element, scale, Blob) {
    let img = new Image();
    img.src = Blob;
    element.imgElement = img;
    drawImage(ctx, element, scale);
}

export function clipPreviousHandle(ctx) {
    ctx.restore();
    ctx.save();
}
/**
*处理canvas文字展示情况的函数 换行和对齐方式
@param {*}text:文字值
@param {*}x:首个字的x位置
@param {*}y:首个字的y位置
@param {*}maxWidth:单行最多展示多少个字
@param {*}lineHeight:文字的行高
*/
CanvasRenderingContext2D.prototype.wrapText = function (
    text,
    x,
    y,
    maxWidth = 999,
    lineHeight = 12,
    scale
) {
    if (typeof text !== "string" || typeof x !== "number" || typeof y !== "number") {
        return;
    }
    maxWidth = maxWidth * scale;
    lineHeight = lineHeight * scale;
    let context = this;
    // 字符串分割成数组
    let arrText = text.split("");
    // 每行的字符串内容
    let lineText = "";
    for (let i = 0; i < arrText.length; i++) {
        // 零时的字符串 用于判断是否超出规定宽度
        let tempText = lineText + arrText[i];
        let TextMetrics = context.measureText(tempText);
        // 判断是否需要换行
        if (TextMetrics.width > maxWidth && i > 0) {
            // 将已经成一行的文字画上去
            context.fillText(lineText, x, y);
            // 因为加上这个 arrText[i]文字 导致超出我们的限制 所以这个字 就成为下一行的第一个字了
            lineText = arrText[i];
            // y的高度加上我们给的lineHeight高度
            y += lineHeight;
        } else {
            lineText = lineText + arrText[i];
        }
    }
    context.fillText(lineText, x, y)
};