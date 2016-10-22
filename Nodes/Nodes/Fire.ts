import Enemy = require("Enemy");

class Fire extends Enemy{
    constructor(xpos: number, ypos: number, speedx: number, gamesprites: HTMLCanvasElement, wall: number[]) {
        super(xpos, ypos, speedx, gamesprites, wall);
    }
}

export = Fire;