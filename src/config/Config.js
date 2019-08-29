/**
 * @fileOverview config
 * @createTime 2019-03-12 17:53
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
import { Consts } from '../model/Consts';

export default {
    width: 750,
    height: 1334,
    maxWH: 1,
    layers: [Consts.LAYER_BG, Consts.LAYER_GAME, Consts.LAYER_EFFECT, Consts.LAYER_UI, Consts.LAYER_POP_UP],
    scenes: {
        loading: {
            resources: ['loading'],
        },
    },
};
