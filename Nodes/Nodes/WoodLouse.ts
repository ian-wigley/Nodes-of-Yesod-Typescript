import Enemy = require("Enemy");
import Rectangle = require("Rectangle");

class WoodLouse extends Enemy {
    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: Array<Rectangle>) {
        super(xpos, ypos, speedx, gamesprites, wall);
    }
}
export = WoodLouse;