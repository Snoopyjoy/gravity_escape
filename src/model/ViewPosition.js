/*
 * @Author: hexiaoliang
 * @Date: 2019-08-23 15:46:34
 * @Last Modified by: hexiaoliang
 * @Last Modified time: 2019-08-23 17:15:33
 */
class ViewPosition {
    constructor(position, alignX = null, alignY = null, x = null, y = null, width = null, height = null) {
        this.position = position; // 相对父级 还是 全局
        this.alignX = alignX; // x坐标对齐方式 相对点 center left right
        this.alignY = alignY; // y坐标对齐方式 相对点 center top bottom
        this.x = x; // 相对x像素
        this.y = y; // 相对y像素
        this.width = width; // 像素数值 或者 %字符串
        this.height = height; // 像素数值 或者 %字符串
    }
}

export default ViewPosition;
