export function verfiyObjEmpty(obj){
    if(Object.prototype.toString(obj)!=="[object Object]"){
        console.error("objToPoster的第一个参数必须为一个对象");
        return;
    }
    if(JSON.stringify(obj)==="{}" && !Object.getOwnPropertySymbols(obj).length){
        console.error("objToPoster的第一个参数不能为空对象");
        return;
    }
}