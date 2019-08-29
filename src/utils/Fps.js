export default {
    create() {
        const fpsCon = document.createElement('div');

        Object.assign(fpsCon.style, {
            position: 'fixed',
            background: '#000',
            color: '#fff',
            top: 0,
            left: 0,
        });
        document.body.appendChild(fpsCon);
        const arrFps = new Float64Array(10);
        let lastTime = Date.now();
        let pos = 0;

        function updateFps() {
            const now = Date.now();
            const delta = now - lastTime;
            const fps = 1000 / delta;

            arrFps[pos++] = fps;
            if (pos >= arrFps.length) {
                pos = 0;
            }
            fpsCon.innerHTML = `FPS: ${arrFps.reduce((prev, next) => prev + next) / arrFps.length | 0}`;
            lastTime = now;
            requestAnimationFrame(updateFps);
        }
        requestAnimationFrame(updateFps);
    },
};
