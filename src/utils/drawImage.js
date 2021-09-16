export function drawImage(ctx, obj, proportion) {
    ctx.beginPath();
    // 恢复裁剪前的状态
    ctx.restore();
    ctx.save();
    // 裁剪
    if (obj.radius) {
        console.log(obj);
        // 正方形
        if (obj.width === obj.height) {
            ctx.arc(
                (obj.width * proportion) / 2 + obj.x * proportion,
                (obj.width * proportion) / 2 + obj.y * proportion,
                obj.radius * proportion,
                0,
                Math.PI * 2,
                true
            );
            ctx.clip();
            ctx.drawImage(
                obj.imgOnload,
                obj.x * proportion,
                obj.y * proportion,
                obj.width * proportion,
                obj.height * proportion
            );

            ctx.closePath();
        }
        // 矩形
        else {
        }
    } else {
        ctx.drawImage(
            obj.imgOnload,
            obj.x * proportion,
            obj.y * proportion,
            obj.width * proportion,
            obj.height * proportion
        );
        ctx.closePath();
    }
}

export function drawFont(ctx, obj, proportion) {
    // 大小
    let size = obj.size || 10;
    size = size * proportion + "px";
    // 颜色
    let color = obj.color || "black";
    // 样式
    let family = obj.family || "Arial,sans-serif";
    // 文字对齐方式
    let textBaseline = obj.textBaseline || "hanging";

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.font = `${size} ${family}`;
    ctx.textBaseline = textBaseline;
    ctx.fillText(obj.value, obj.x * proportion, obj.y * proportion, 133 * proportion);
    ctx.closePath();
}
export function drawBlobImg(ctx, obj, proportion, Blob) {
    let img = new Image();
    img.src = Blob;
    obj.imgOnload = img;
    drawImage(ctx, obj, proportion);
}
