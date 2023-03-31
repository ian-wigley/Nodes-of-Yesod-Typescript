import Alf = require("Alf");
import BlueThingy = require("BlueThingy");
import Bird = require("Bird");
import Caterpillar = require("Caterpillar");
import ChasingEnemy = require("ChasingEnemy");
import CockRoach = require("CockRoach");
import Enemy = require("Enemy");
import GreenMeanie = require("GreenMeanie");
import Fire = require("Fire");
import Fish = require("Fish");
import Plant = require("Plant");
import RedSpaceman = require("RedSpaceman");
import ScreenInfo = require("ScreenInfo");
import SpringBear = require("SpringBear");
import TelePort = require("TelePort");
import Tile = require("Tile");

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
        if (name == "CockRoach") {
            return CockRoach;
        }
        if (name == "Fire") {
            return Fire;
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
        if (name == "RedSpaceman") {
            return RedSpaceman;
        }
        if (name == "TelePort") {
            return TelePort;
        }
    }

    public ConfigureEnemies(rectangles: any, enemy: any, edibleWalls: any): void {
        // Configure the walking enemies
        this.m_enemies = [];
        if (enemy != undefined) {
            for (const en of enemy) {
                if (en != undefined) {
                    let obj: any = this.GetEnemy(en.name);
                    let enemy: Enemy = new obj(en.x, en.y, en.speed, this.m_sprites, rectangles, this.m_screen, en.warpToScreen);
                    enemy.Debug = true;
                    enemy.EdibleWalls = edibleWalls;
                    this.m_enemies.push(enemy);
                }
            }
        }
        // Configure the floating enemies
        for (let j = 0; j < 3; j++) {
            let floatingEnemies = Math.ceil(Math.random() * 6);
            switch (floatingEnemies) {
                case 1:
                case 4:
                    let springBear: SpringBear = new SpringBear(Math.max(200, this.Random(600)), this.Random(360), 1, this.m_sprites, rectangles, this.m_screen);
                    springBear.Debug = true;
                    this.m_enemies.push(springBear);
                    break;
                case 2:
                case 5:
                    let blueThingy: BlueThingy = new BlueThingy(Math.max(200, this.Random(600)), this.Random(360), 1, this.m_sprites, rectangles, this.m_screen);
                    blueThingy.Debug = true;
                    this.m_enemies.push(blueThingy);
                    break;
                case 6:
                    let chasingEnemy: ChasingEnemy = new ChasingEnemy(300, 300, 1, this.m_sprites, rectangles, this.m_screen);
                    chasingEnemy.Debug = true;
                    this.m_enemies.push(chasingEnemy);
                    break;
                default:
                    break;
            }
        }
    }

    private Random(value: number): number {
        return (Math.random() * value);
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
            ids.forEach(t => {
                this.jsonTiles[num].tiles[t]._drawable = false;
                this.jsonTiles[num].edibleWall = [];
            });
            // Clear down the edible wall section for each current enemy onscreen.
            this.m_enemies.forEach(e => { e.EdibleWalls = []; });
        }
        if (otherIds != undefined && otherNum != undefined) {
            otherIds.forEach(t => {
                this.jsonTiles[otherNum].tiles[t]._drawable = false;
                this.jsonTiles[otherNum].edibleWall = [];
            });
        }
    }
}
export = ResourceManager;