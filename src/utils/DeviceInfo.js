/**
 * @fileOverview deviceInfo
 * @createTime 2019-03-12 17:49
 * @author 何小亮<hel13140302@126.com> {@link https://github.hxl2lgy.top}
 * @version 0.0.1
 */
function getWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        orientation: window.orientation,
    };
}

export { getWindowSize };
