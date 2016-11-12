import Enemy = require("Enemy");
import Rectangle = require("Rectangle");

class Plant extends Enemy {
    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: Array<Rectangle>) {
        super(xpos, ypos, speedx, gamesprites, wall);
    }
}
export = Plant;