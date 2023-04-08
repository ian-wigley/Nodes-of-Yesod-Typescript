import Enemy = require("./Enemy");
import Rectangle = require("./Rectangle");

/**
 * Class is used to Map against the JSON.
 */
class Tile {
    name: string;
    sx: number;
    sy: number;
    sw: number;
    sh: number;
    dx: number;
    dy: number;
    dw: number;
    dh: number;
    tiles = [{ "sx": 0, "sy": 0, "sw": 0, "sh": 0, "dx": 0, "dy": 0, "dw": 0, "dh": 0 }];
    rectangleList: Array<Rectangle>;
    enemies: Array<Enemy>;
    edibleWall: Array<Rectangle>;

    constructor() {
        this.name = "";
        this.sx = 0;
        this.sy = 0;
        this.sw = 0;
        this.sh = 0;
        this.dx = 0;
        this.dy = 0;
        this.dw = 0;
        this.dh = 0;
        this.tiles = [{ "sx": 0, "sy": 0, "sw": 0, "sh": 0, "dx": 0, "dy": 0, "dw": 0, "dh": 0 }];
        this.rectangleList = [];
        this.enemies = [];
        this.edibleWall = [];
    }
}
export = Tile;