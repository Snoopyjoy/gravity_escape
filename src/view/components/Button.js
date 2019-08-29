/*
 * @Author: hexiaoliang
 * @Date: 2019-08-22 22:06:11
 * @Last Modified by: hexiaoliang
 * @Last Modified time: 2019-08-27 17:13:07
 */

import * as PIXI from 'pixi.js';
import ButtonEvents from './ButtonEvents';

const isDown = Symbol('isDown');
const isOver = Symbol('isOver');
const onButtonDown = Symbol('onButtonDown');
const onButtonUp = Symbol('onButtonUp');
const onButtonOver = Symbol('onButtonOver');
const onButtonOut = Symbol('onButtonOut');
const listen = Symbol('listen');
const removeListen = Symbol('removeListen');
const disabled = Symbol('disabled');

class Button extends PIXI.Sprite {
    constructor(textureNormal, textureOver, textureDown, textureDisable) {
        super(textureNormal);
        this.textureNormal = textureNormal;
        this.textureOver = textureOver || textureNormal;
        this.textureDown = textureDown || textureNormal;
        this.textureDisable = textureDisable || textureNormal;
        this.buttonMode = true;
        this.interactive = true;
        this[disabled] = true;
        this[listen]();
    }

    set disabled(val) {
        if (val) {
            this[isDown] = false;
            this[isOver] = false;
            this.texture = this.textureDisable;
            if (!this[disabled]) this[removeListen]();
        }
        else {
            this.texture = this.textureNormal;
            if (this[disabled]) this[listen]();
        }
        this[disabled] = Boolean(val);
    }

    get disabled() {
        return this[disabled];
    }

    onClick() {
        return this;
    }

    [listen]() {
        this.on('pointerdown', this[onButtonDown])
            .on('pointerup', this[onButtonUp])
            .on('pointerupoutside', this[onButtonUp])
            .on('pointerover', this[onButtonOver])
            .on('pointerout', this[onButtonOut]);
    }

    [removeListen]() {
        this.off('pointerdown', this[onButtonDown])
            .off('pointerup', this[onButtonUp])
            .off('pointerupoutside', this[onButtonUp])
            .off('pointerover', this[onButtonOver])
            .off('pointerout', this[onButtonOut]);
    }

    [onButtonDown](event) {
        this[isDown] = true;
        this.texture = this.textureDown;
        this.emit(ButtonEvents.MouseDown, event);
    }

    [onButtonUp](event) {
        this.emit(ButtonEvents.MouseUp, event);
        if (this[isDown]) this.emit(ButtonEvents.MouseClick, event);
        this[isDown] = false;
        if (this[isOver]) {
            this.texture = this.textureOver;
        }
        else {
            this.texture = this.textureNormal;
        }
    }

    [onButtonOver]() {
        this[isOver] = true;
        if (this[isDown]) {
            return;
        }
        this.texture = this.textureOver;
    }

    [onButtonOut]() {
        this[isOver] = false;
        if (this[isDown]) {
            return;
        }
        this.texture = this.textureNormal;
    }

    destroy() {
        this.removeAllListeners();
        super.destroy();
    }
}
export default Button;
