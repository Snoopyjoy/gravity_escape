/**
 * @fileOverview view
 * @createTime 2019-03-12 21:13
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
import { Consts } from '../../model/Consts';
import Scene from '../../controller/Scene';
import LoadingView from './view/LoadingView';
import LoadingData from './model/LoadingData';

const name = Consts.SCENE_LOADING;

class LoadingModule extends Scene {
    constructor({ loader, name }) {
        super({ loader, name });
    }

    get viewClass() {
        return LoadingView;
    }

    get modelClass() {
        return LoadingData;
    }

    static get name() {
        return name;
    }

    destroy() {
        super.destroy();
    }
}
export default LoadingModule;
