import Alf = require("Alf");
import BlueThingy = require("BlueThingy");
import Bird = require("Bird");
import Caterpillar = require("Caterpillar");
import ChasingEnemy = require("ChasingEnemy");
import Enemy = require("Enemy");
import GreenMeanie = require("GreenMeanie");
import Fire = require("Fire");
import Fish = require("Fish");
import Mole = require("Mole");
import Plant = require("Plant");
import Rectangle = require("Rectangle");
import RedSpaceman = require("RedSpaceman");
import ScreenInfo = require("ScreenInfo");
import SpringBear = require("SpringBear");
import TelePort = require("TelePort");
import CockRoach = require("CockRoach");


class ResourceManager {
    private m_sprites: HTMLCanvasElement;
    private m_enemies: Array<Enemy> = [];
    private m_screen: ScreenInfo;
    private jsonTiles: any = [];

    constructor(
        gameSprites: HTMLCanvasElement,
        screenInfo: ScreenInfo,
    ) {
        this.m_sprites = gameSprites;
        this.m_screen = screenInfo;
        this.m_enemies = new Array();
    }

    public Init(): void {
        this.LoadJSON();
    }

    private LoadJSON(): void {
        let tempData: any = [];
        let jsonLevels;
        let levels: string;
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", "levels/levels.json", true);
        rawFile.send();
        let _this = this;
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    levels = rawFile.responseText;
                    jsonLevels = JSON.parse(levels);
                    jsonLevels.forEach(function (tile: Tile) {
                        _this.jsonTiles.push(tile);
                    });
                }
            }

            rawFile.onloadend = function () {
                console.log(tempData);
                tempData = [];
            }
        };
    }

    private GetEnemy(name: string) {
        if (name == "Alf") {
            return Alf;
        }
        if (name == "Bird") {
            return Bird;
        }
        if (name == "Caterpillar") {
            return Caterpillar;
        }
        if (name == "Fish") {
            return Fish;
        }
        if (name == "GreenMeanie") {
            return GreenMeanie;
        }
        if (name == "Plant") {
            return Plant;
        }
        if (name == "TelePort") {
            return TelePort;
        }
        if (name == "CockRoach") {
            return CockRoach;
        }
    }

    public ConfigureEnemies(rectangles: any, enemy: any): void {
        this.m_enemies = [];
        if (enemy != undefined) {
            for (const en of enemy) {
                if (en != undefined) {
                    let obj: any = this.GetEnemy(en.name);
                    this.m_enemies.push(new obj(en.x, en.y, en.speed, this.m_sprites, rectangles, this.m_screen, en.warpToScreen));
                }
            }
        }
        for (let j = 0; j < 3; j++) {
            let floatingEnemies = Math.ceil(Math.random() * 6);
            switch (floatingEnemies) {
                case 1:
                case 4:
                    this.m_enemies.push(new SpringBear((Math.max(200, Math.random() * 600)), (Math.random() * 360), 1, this.m_sprites, rectangles, this.m_screen));
                    break;
                case 2:
                case 5:
                    this.m_enemies.push(new BlueThingy((Math.max(200, Math.random() * 600)), (Math.random() * 360), 1, this.m_sprites, rectangles, this.m_screen));
                    break;
                case 6:
                    this.m_enemies.push(new ChasingEnemy(300, 300, 1, this.m_sprites, rectangles, this.m_screen));
                    break;
                default:
                    break;
            }
        }
    }

    public AddToEnemyList(value: Enemy): void {
        this.m_enemies.push(value);
    }
    public ClearEnemies(): void {
        this.m_enemies = [];
    }
    public get EnemyList(): Array<Enemy> { return this.m_enemies; }

    // Return the collection of tiles.
    public GetScreenTiles(num: number): Tile {
        return this.jsonTiles[num];
    }

    /**
     * Method to turn of sections of wall eaten by the mole
     */
    public TurnOffEdibleWallChunks(num: number, ids?: Array<number>, otherNum?: number, otherIds?: Array<number>): void {
        if (ids != undefined) {
            ids.forEach(t => { this.jsonTiles[num].tiles[t]._drawable = false; });
        }
        if (otherIds != undefined && otherNum != undefined) {
            otherIds.forEach(t => { this.jsonTiles[otherNum].tiles[t]._drawable = false; });
        }
    }
}
export = ResourceManager;

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
    }
    public TileDetails(): any {
        return this.tiles;
    }
}