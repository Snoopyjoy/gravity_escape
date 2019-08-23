/**
 * @fileOverview view
 * @createTime 2019-03-12 21:13
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
import { Consts } from '../../config/Consts';
import Scene from '../../controller/Scene';
import LoadingView from './view/LoadingView';
import LoadingData from './model/LoadingData';

const VIEW = Symbol('view');
const DATA = Symbol('data');

const name = Consts.SCENE_LOADING;

class Ref extends Scene {
    constructor({ loader, name }) {
        super({ loader, name });
    }

    get view() {
        if (!this[VIEW]) {
            this[VIEW] = new LoadingView(this.loader);
        }

        return this[VIEW];
    }

    get data() {
        if (!this[DATA]) {
            this[DATA] = new LoadingData();
        }

        return this[DATA];
    }

    dispose() {
        this[VIEW].dispose();
    }
}
export { name, Ref };
