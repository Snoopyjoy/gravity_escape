/*
 * @Author: hexiaoliang
 * @Date: 2019-08-23 15:46:34
 * @Last Modified by: hexiaoliang
 * @Last Modified time: 2019-08-26 18:01:19
 */
const PositionTypes = {
    local: 0,
    global: 1,
};

const AlignTypes = {
    center: 'center',
    left: 'left',
    right: 'right',
    top: 'top',
    bottom: 'bottom',
};

const SizeTypes = {
    contain: 'contain',
    cover: 'cover',
};

class ViewPosition {
    constructor(position, alignX = null, alignY = null, x = null, y = null, width = null, height = null, size = null) {
        this.position = position; // 相对父级0 还是 全局1
        this.alignX = alignX; // x坐标对齐方式 相对点 center left right
        this.alignY = alignY; // y坐标对齐方式 相对点 center top bottom
        this.x = x; // 相对x像素
        this.y = y; // 相对y像素
        this.width = width; // 数字、'auto' 或者 %字符串
        this.height = height; // 数字、'auto' 或者 %字符串
        this.size = size; // 'contain' 或者 'cover'
    }

    static get PositionTypes() {
        return PositionTypes;
    }

    static get AlignTypes() {
        return AlignTypes;
    }

    static get SizeTypes() {
        return SizeTypes;
    }
}

export default ViewPosition;
