import * as PIXI from 'pixi.js';
import ViewPostion from '../model/ViewPosition';

export default {
    translatePosition(viewPos, disObj, parent = null, relWidth = null, relHeight = null) {
        const x = viewPos.x || 0;
        const y = viewPos.y || 0;
        const size = viewPos.size;
        let defW = viewPos.width;
        let defH = viewPos.height;
        const orgWH = disObj.width / disObj.height;
        let objW = disObj.width;
        let objH = disObj.height;

        if (size) {
            const relWH = relWidth / relHeight;
            // 图片撑满 可能会有留白

            if (size === ViewPostion.SizeTypes.contain) {
                if (orgWH > relWH) {
                    defW = '100%';
                    defH = 'auto';
                }
                else {
                    defW = 'auto';
                    defH = '100%';
                }
            }
            // 背景铺满 可能会有超出
            else if (size === ViewPostion.SizeTypes.cover) {
                if (orgWH < relWH) {
                    defW = '100%';
                    defH = 'auto';
                }
                else {
                    defW = 'auto';
                    defH = '100%';
                }
            }
        }

        if (defW && typeof defW === 'string') {
            if (defW !== 'auto') {
                const percent = Number(defW.replace('%', ''));

                objW = isNaN(percent) ? disObj.width : ((relWidth * percent / 100) >> 0);
            }
        }
        else if (typeof defW === 'number') {
            objW = defW;
        }
        if (defH === null || defH === 'auto') objH = (objW / orgWH) >> 0;

        if (defH && typeof defH === 'string') {
            if (defH !== 'auto') {
                const percent = Number(defH.replace('%', ''));

                objH = isNaN(percent) ? disObj.height : ((relHeight * percent / 100) >> 0);
            }
        }
        else if (typeof defH === 'number') {
            objH = defH;
        }
        if (defW === null || defW === 'auto') objW = (objH * orgWH) >> 0;

        disObj.width = objW;
        disObj.height = objH;

        let posOrg = new PIXI.Point(x, y);

        switch (viewPos.alignX) {
            case ViewPostion.AlignTypes.center:
                posOrg.x += (((relWidth - objW) / 2) >> 0);
                break;
            case ViewPostion.AlignTypes.right:
                posOrg.x = (relWidth - objW) - posOrg.x;
                break;
            default:
                break;
        }

        switch (viewPos.alignY) {
            case ViewPostion.AlignTypes.center:
                posOrg.y += (((relHeight - objH) / 2) >> 0);
                break;
            case ViewPostion.AlignTypes.bottom:
                posOrg.y = (relHeight - objH) - posOrg.y;
                break;
            default:
                break;
        }

        if (viewPos.position === ViewPostion.PositionTypes.global) { // 全局定位
            posOrg = parent.toLocal(posOrg);
        }

        disObj.x = posOrg.x;
        disObj.y = posOrg.y;
    },
};
