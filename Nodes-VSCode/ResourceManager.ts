﻿import Alf = require("Alf");
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
import WhirlWind = require("WhirlWind");
import WoodLouse = require("WoodLouse");


class ResourceManager {
    private m_sprites: HTMLCanvasElement;
    private m_walls: Array<Rectangle>;
    private m_enemies: Array<Enemy> = [];
    private m_screen: ScreenInfo;
    private m_leveldata: LevelData;
    private jsonTiles: any = [];

    constructor(
        gameSprites: HTMLCanvasElement,
        enemies: Enemy[],
        walls: Rectangle[],
        platform: Rectangle[],
        ctx: CanvasRenderingContext2D,
        screenInfo: ScreenInfo,
        mole: Mole
    ) {
        this.m_leveldata = new LevelData();
        this.LoadJSON();
        this.m_sprites = gameSprites;
        this.m_enemies = enemies;
        this.m_walls = walls;
        this.m_enemies = new Array();
        this.m_screen = screenInfo;
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
        if (name == "Bird") {
            return Bird;
        }
    }

    public ConfigureEnemies(rectangles: any, enemy: any): void {
        this.m_enemies = [];

        // To-do loop through array
        let en = enemy[0];
        if (en != undefined) {
            let obj: any = this.GetEnemy(en.name);
            this.m_enemies.push(new obj(en.x, en.y, en.speed, this.m_sprites, rectangles, this.m_screen));
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
                    this.m_enemies.push(new BlueThingy((Math.max(200, Math.random() * 600)), (Math.random() * 360), 1, this.m_sprites, this.m_walls, this.m_screen));
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
    public get Levels(): number[][] { return this.m_leveldata.Levels; }

    // Return the collection of tiles.
    public getScreenTiles(num: number): Tile {
        return this.jsonTiles[num];
    }
}
export = ResourceManager;


class LevelData {
    private m_levels: Array<number[]>;

    constructor() {
        this.m_levels = new Array();
    }

    public set Levels(Value: Array<number[]>) {
        this.m_levels = Value;
    }

    public get Levels(): Array<number[]> {
        return this.m_levels;
    }
}


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