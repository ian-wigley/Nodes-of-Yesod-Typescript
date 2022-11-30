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
import WhirlWind = require("WhirlWind");
import WoodLouse = require("WoodLouse");

class ResourceManager {
    private m_sprites: HTMLCanvasElement;
    private m_walls: Array<Rectangle>;
    private m_upperRockArray: Array<number[]>;
    private m_moundArray: Array<number>;
    private m_holeArray0: Array<number>;
    private m_holeArray1: Array<number>;
    private m_lowerRockArray: Array<number>;
    private m_enemies: Array<Enemy>;
    private m_levels: Array<number[]>;
    private test1: Array<number>;
    private m_screen: ScreenInfo;
    private m_leveldata: LevelData;

    private load(leveldata: LevelData, mole : Mole): void {
        var tempData = [];
        var jsonLevels;
        var levels: string;
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", "levels/level_data.txt", true);
        rawFile.send();
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    levels = rawFile.responseText;
                    jsonLevels = JSON.parse(levels);

                    jsonLevels.forEach(function (screen) {
                        var te = screen.split(",");
                        tempData.push(te);
                    });
                }
            }

            rawFile.onloadend = function () {
                leveldata.Levels = tempData;
                mole.Levels = tempData;
                tempData = [];
            }
        };
    }

    constructor(gameSprites, enemies, walls, platform, ctx, screenInfo, mole: Mole) {

        this.m_leveldata = new LevelData();
        this.load(this.m_leveldata, mole);

        this.m_sprites = gameSprites;
        this.m_enemies = enemies;
        this.m_walls = walls;
        this.m_enemies = new Array();
        this.m_screen = screenInfo;

        this.m_upperRockArray = new Array();
        this.m_upperRockArray[0] = [0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3];
        this.m_upperRockArray[1] = [2, 1, 3, 0, 1, 3, 1, 0, 2, 2, 1];    //1
        this.m_upperRockArray[2] = [1, 2, 3, 0, 1, 3, 3, 0, 3, 2, 1];    //2
        this.m_upperRockArray[3] = [3, 1, 2, 0, 3, 2, 0, 3, 2, 0, 1];    //3
        this.m_upperRockArray[4] = [1, 2, 3, 0, 0, 3, 2, 3, 2, 1, 0];    //4
        this.m_upperRockArray[5] = [2, 1, 3, 0, 1, 3, 1, 0, 2, 2, 1];    //5
        this.m_upperRockArray[6] = [1, 2, 3, 0, 1, 3, 3, 0, 3, 2, 1];    //6
        this.m_upperRockArray[7] = [0, 2, 3, 3, 0, 1, 3, 3, 2, 1, 1];    //7
        this.m_upperRockArray[8] = [2, 1, 3, 0, 1, 3, 1, 0, 2, 2, 1];    //8
        this.m_upperRockArray[9] = [1, 2, 3, 0, 1, 3, 3, 0, 3, 2, 1];    //9
        this.m_upperRockArray[10] = [3, 1, 2, 0, 3, 2, 0, 3, 2, 0, 1];    //10
        this.m_upperRockArray[11] = [1, 2, 3, 0, 0, 3, 2, 3, 2, 1, 0];    //11
        this.m_upperRockArray[12] = [2, 1, 3, 0, 1, 3, 1, 0, 2, 2, 1];    //12
        this.m_upperRockArray[13] = [1, 2, 3, 0, 1, 3, 3, 0, 3, 2, 1];    //13
        this.m_upperRockArray[14] = [0, 2, 3, 3, 0, 1, 3, 3, 2, 1, 1];    //14
        this.m_upperRockArray[15] = [1, 2, 3, 1, 2, 3, 1, 3, 2, 1, 1];   //15

        this.m_moundArray = new Array(1, 1, 1, 2, 1, 2, 2, 2, 1, 1, 2, 1, 2, 2, 2, 2);

        this.m_holeArray0 = new Array(1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0);
        this.m_holeArray1 = new Array(1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);

        this.m_lowerRockArray = new Array(0, 1, 2, 3, 2, 1, 3, 0, 2, 1, 0,    //0     
            2, 1, 3, 0, 1, 3, 1, 0, 2, 2, 1,    //1
            1, 2, 3, 0, 1, 3, 3, 0, 3, 2, 1,    //2
            3, 1, 2, 0, 3, 2, 0, 3, 2, 0, 1,    //3
            1, 2, 3, 0, 0, 3, 2, 3, 2, 1, 0,    //4
            2, 1, 3, 0, 1, 3, 1, 0, 2, 2, 1,    //5
            1, 2, 3, 0, 1, 3, 3, 0, 3, 2, 1,    //6
            0, 2, 3, 3, 0, 1, 3, 3, 2, 1, 1,    //7
            2, 1, 3, 0, 1, 3, 1, 0, 2, 2, 1,    //8
            1, 2, 3, 0, 1, 3, 3, 0, 3, 2, 1,    //9
            3, 1, 2, 0, 3, 2, 0, 3, 2, 0, 1,    //10
            1, 2, 3, 0, 0, 3, 2, 3, 2, 1, 0,    //11
            2, 1, 3, 0, 1, 3, 1, 0, 2, 2, 1,    //12
            1, 2, 3, 0, 1, 3, 3, 0, 3, 2, 1,    //13
            0, 2, 3, 3, 0, 1, 3, 3, 2, 1, 1,    //14
            1, 2, 3, 1, 2, 3, 1, 3, 2, 1, 1);   //15

        //this.mToTheEnemies = new Array();
        //this.mToTheEnemies[0] = [0, 0, 0];
        //this.mToTheEnemies[1] = [0, 0, 0];
        //this.mToTheEnemies[2] = [0, 0, 0];
        //this.mToTheEnemies[3] = [0, 0, 0];
        //this.mToTheEnemies[4] = [0, 0, 0];
        //this.mToTheEnemies[5] = [0, 0, 0];
        //this.mToTheEnemies[6] = [0, 0, 0];
        //this.mToTheEnemies[7] = [0, 0, 0];
        //this.mToTheEnemies[8] = [0, 0, 0];
        //this.mToTheEnemies[9] = [0, 0, 0];
        //this.mToTheEnemies[10] = [0, 0, 0];
        //this.mToTheEnemies[11] = [7, 0, 0];
        //this.mToTheEnemies[12] = [0, 0, 0];
        //this.mToTheEnemies[13] = [0, 5, 0];
        //this.mToTheEnemies[14] = [0, 0, 3];
        //this.mToTheEnemies[15] = [0, 0, 0];
        //this.mToTheEnemies[16] = [0, 0, 0];
        //this.mToTheEnemies[17] = [0, 0, 0];
        //this.mToTheEnemies[18] = [0, 0, 0];
        //this.mToTheEnemies[19] = [6, 0, 0];
        //this.mToTheEnemies[20] = [0, 6, 0];
        //this.mToTheEnemies[21] = [0, 0, 0];
        //this.mToTheEnemies[22] = [0, 0, 0];
        //this.mToTheEnemies[23] = [0, 0, 5];
        //this.mToTheEnemies[24] = [0, 0, 0];
        //this.mToTheEnemies[25] = [0, 0, 0];
        //this.mToTheEnemies[26] = [0, 0, 0];
        //this.mToTheEnemies[27] = [0, 0, 0];
        //this.mToTheEnemies[28] = [0, 0, 0];
        //this.mToTheEnemies[29] = [0, 0, 0];
        //this.mToTheEnemies[30] = [5, 0, 0];
        //this.mToTheEnemies[31] = [0, 0, 0];
        //this.mToTheEnemies[32] = [0, 0, 0];
        //this.mToTheEnemies[33] = [0, 9, 0];
        //this.mToTheEnemies[34] = [0, 0, 0];
        //this.mToTheEnemies[35] = [0, 0, 0];
        //this.mToTheEnemies[36] = [6, 0, 6];
        //this.mToTheEnemies[37] = [0, 0, 0];
        //this.mToTheEnemies[38] = [0, 0, 0];
        //this.mToTheEnemies[39] = [0, 0, 0];
        //this.mToTheEnemies[40] = [0, 7, 0];
        //this.mToTheEnemies[41] = [0, 0, 0];
        //this.mToTheEnemies[42] = [0, 0, 0];
        //this.mToTheEnemies[43] = [0, 0, 0];
        //this.mToTheEnemies[44] = [0, 0, 0];
        //this.mToTheEnemies[45] = [0, 0, 9];
        //this.mToTheEnemies[46] = [0, 0, 0];
        //this.mToTheEnemies[47] = [5, 0, 0];
        //this.mToTheEnemies[48] = [0, 2, 0];
        //this.mToTheEnemies[49] = [0, 0, 0];
        //this.mToTheEnemies[50] = [0, 0, 1];
        //this.mToTheEnemies[51] = [0, 0, 0];
        //this.mToTheEnemies[52] = [0, 0, 0];
        //this.mToTheEnemies[53] = [0, 0, 0];
        //this.mToTheEnemies[54] = [0, 0, 0];
        //this.mToTheEnemies[55] = [0, 0, 0];
        //this.mToTheEnemies[56] = [9, 2, 9];
        //this.mToTheEnemies[57] = [5, 0, 0];
        //this.mToTheEnemies[58] = [0, 0, 0];
        //this.mToTheEnemies[59] = [0, 0, 0];
        //this.mToTheEnemies[60] = [0, 0, 0];
        //this.mToTheEnemies[61] = [0, 0, 0];
        //this.mToTheEnemies[62] = [0, 0, 0];
        //this.mToTheEnemies[63] = [5, 7, 7];
        //this.mToTheEnemies[64] = [0, 3, 0];
        //this.mToTheEnemies[65] = [0, 0, 0];
        //this.mToTheEnemies[66] = [0, 0, 0];
        //this.mToTheEnemies[67] = [0, 0, 0];
        //this.mToTheEnemies[68] = [0, 0, 0];
        //this.mToTheEnemies[69] = [0, 0, 2];
        //this.mToTheEnemies[70] = [1, 5, 0];
        //this.mToTheEnemies[71] = [0, 0, 0];
        //this.mToTheEnemies[72] = [0, 0, 7];
        //this.mToTheEnemies[73] = [0, 0, 0];
        //this.mToTheEnemies[74] = [7, 0, 0];
        //this.mToTheEnemies[75] = [0, 7, 0];
        //this.mToTheEnemies[76] = [0, 0, 0];
        //this.mToTheEnemies[77] = [0, 0, 0];
        //this.mToTheEnemies[78] = [0, 0, 0];
        //this.mToTheEnemies[79] = [0, 0, 0];
        //this.mToTheEnemies[80] = [0, 0, 0];
        //this.mToTheEnemies[81] = [0, 0, 0];
        //this.mToTheEnemies[82] = [8, 8, 8];
        //this.mToTheEnemies[83] = [8, 8, 8];
        //this.mToTheEnemies[84] = [0, 0, 0];
        //this.mToTheEnemies[85] = [0, 0, 0];
        //this.mToTheEnemies[86] = [0, 0, 0];
        //this.mToTheEnemies[87] = [0, 0, 0];
        //this.mToTheEnemies[88] = [0, 0, 0];
        //this.mToTheEnemies[89] = [0, 0, 0];
        //this.mToTheEnemies[90] = [0, 0, 0];
        //this.mToTheEnemies[91] = [0, 0, 0];
        //this.mToTheEnemies[92] = [0, 0, 0];
        //this.mToTheEnemies[93] = [0, 0, 0];
        //this.mToTheEnemies[94] = [0, 0, 0];
        //this.mToTheEnemies[95] = [0, 0, 0];
        //this.mToTheEnemies[96] = [0, 0, 9];
        //this.mToTheEnemies[97] = [9, 0, 0];
        //this.mToTheEnemies[98] = [0, 5, 0];
        //this.mToTheEnemies[99] = [0, 0, 0];
        //this.mToTheEnemies[100] = [0, 0, 0];
        //this.mToTheEnemies[101] = [0, 0, 1];
        //this.mToTheEnemies[102] = [0, 0, 0];
        //this.mToTheEnemies[103] = [0, 0, 0];
        //this.mToTheEnemies[104] = [0, 0, 0];
        //this.mToTheEnemies[105] = [0, 0, 0];
        //this.mToTheEnemies[106] = [0, 0, 0];
        //this.mToTheEnemies[107] = [0, 0, 0];
        //this.mToTheEnemies[108] = [5, 0, 0];
        //this.mToTheEnemies[109] = [0, 2, 0];
        //this.mToTheEnemies[110] = [0, 0, 2];
        //this.mToTheEnemies[111] = [0, 0, 0];
        //this.mToTheEnemies[112] = [0, 0, 0];
        //this.mToTheEnemies[113] = [0, 0, 0];
        //this.mToTheEnemies[114] = [0, 0, 0];
        //this.mToTheEnemies[115] = [0, 0, 0];
        //this.mToTheEnemies[116] = [0, 0, 0];
        //this.mToTheEnemies[117] = [0, 0, 0];
        //this.mToTheEnemies[118] = [0, 0, 0];
        //this.mToTheEnemies[119] = [0, 0, 0];
        //this.mToTheEnemies[120] = [0, 0, 0];
        //this.mToTheEnemies[121] = [0, 0, 0];
        //this.mToTheEnemies[122] = [0, 0, 0];
        //this.mToTheEnemies[123] = [6, 0, 0];
        //this.mToTheEnemies[124] = [0, 0, 0];
        //this.mToTheEnemies[125] = [0, 0, 0];
        //this.mToTheEnemies[126] = [0, 0, 0];
        //this.mToTheEnemies[127] = [0, 0, 0];
        //this.mToTheEnemies[128] = [0, 0, 0];
        //this.mToTheEnemies[129] = [0, 5, 0];
        //this.mToTheEnemies[130] = [0, 0, 0];
        //this.mToTheEnemies[131] = [0, 0, 3];
        //this.mToTheEnemies[132] = [0, 0, 0];
        //this.mToTheEnemies[133] = [0, 0, 0];
        //this.mToTheEnemies[134] = [0, 0, 0];
        //this.mToTheEnemies[135] = [5, 0, 0];
        //this.mToTheEnemies[136] = [0, 0, 0];
        //this.mToTheEnemies[137] = [0, 0, 0];
        //this.mToTheEnemies[138] = [0, 6, 0];
        //this.mToTheEnemies[139] = [0, 0, 0];
        //this.mToTheEnemies[140] = [0, 0, 0];
        //this.mToTheEnemies[141] = [0, 0, 5];
        //this.mToTheEnemies[142] = [0, 0, 0];
        //this.mToTheEnemies[143] = [0, 0, 0];
        //this.mToTheEnemies[144] = [1, 0, 0];
        //this.mToTheEnemies[145] = [0, 0, 0];
        //this.mToTheEnemies[146] = [0, 5, 0];
        //this.mToTheEnemies[147] = [0, 0, 0];
        //this.mToTheEnemies[148] = [0, 0, 7];
        //this.mToTheEnemies[149] = [0, 0, 0];
        //this.mToTheEnemies[150] = [1, 0, 0];
        //this.mToTheEnemies[151] = [0, 0, 0];
        //this.mToTheEnemies[152] = [0, 0, 0];
        //this.mToTheEnemies[153] = [0, 0, 0];
        //this.mToTheEnemies[154] = [0, 3, 0];
        //this.mToTheEnemies[155] = [0, 0, 0];
        //this.mToTheEnemies[156] = [0, 0, 0];
        //this.mToTheEnemies[157] = [0, 0, 0];
        //this.mToTheEnemies[158] = [0, 0, 0];
        //this.mToTheEnemies[159] = [0, 0, 3];
        //this.mToTheEnemies[160] = [0, 0, 0];
        //this.mToTheEnemies[161] = [0, 0, 0];
        //this.mToTheEnemies[162] = [0, 0, 0];
        //this.mToTheEnemies[163] = [1, 0, 0];
        //this.mToTheEnemies[164] = [0, 0, 0];
        //this.mToTheEnemies[165] = [0, 0, 0];
        //this.mToTheEnemies[166] = [0, 0, 0];
        //this.mToTheEnemies[167] = [0, 0, 0];
        //this.mToTheEnemies[168] = [0, 1, 0];
        //this.mToTheEnemies[169] = [0, 0, 0];
        //this.mToTheEnemies[170] = [0, 0, 0];
        //this.mToTheEnemies[171] = [0, 0, 0];
        //this.mToTheEnemies[172] = [0, 0, 0];
        //this.mToTheEnemies[173] = [0, 0, 0];
        //this.mToTheEnemies[174] = [0, 0, 5];
        //this.mToTheEnemies[175] = [0, 0, 0];
        //this.mToTheEnemies[176] = [0, 0, 0];
        //this.mToTheEnemies[177] = [0, 0, 0];
        //this.mToTheEnemies[178] = [0, 0, 0];
        //this.mToTheEnemies[179] = [0, 0, 0];
        //this.mToTheEnemies[180] = [0, 0, 0];
        //this.mToTheEnemies[181] = [9, 0, 0];
        //this.mToTheEnemies[182] = [0, 0, 0];
        //this.mToTheEnemies[183] = [0, 0, 0];
        //this.mToTheEnemies[184] = [0, 2, 2];
        //this.mToTheEnemies[185] = [0, 0, 0];
        //this.mToTheEnemies[186] = [0, 0, 0];
        //this.mToTheEnemies[187] = [0, 0, 0];
        //this.mToTheEnemies[188] = [6, 0, 0];
        //this.mToTheEnemies[189] = [0, 6, 2];
        //this.mToTheEnemies[190] = [6, 0, 0];
        //this.mToTheEnemies[191] = [0, 0, 0];
        //this.mToTheEnemies[192] = [0, 7, 7];
        //this.mToTheEnemies[193] = [0, 0, 0];
        //this.mToTheEnemies[194] = [5, 0, 0];
        //this.mToTheEnemies[195] = [0, 5, 0];
        //this.mToTheEnemies[196] = [5, 0, 5];
        //this.mToTheEnemies[197] = [0, 0, 0];
        //this.mToTheEnemies[198] = [0, 0, 0];
        //this.mToTheEnemies[199] = [0, 0, 0];
        //this.mToTheEnemies[200] = [0, 0, 0];
        //this.mToTheEnemies[201] = [0, 9, 0];
        //this.mToTheEnemies[202] = [0, 0, 0];
        //this.mToTheEnemies[203] = [0, 0, 2];
        //this.mToTheEnemies[204] = [0, 0, 0];
        //this.mToTheEnemies[205] = [0, 0, 0];
        //this.mToTheEnemies[206] = [6, 0, 0];
        //this.mToTheEnemies[207] = [0, 6, 6];
        //this.mToTheEnemies[208] = [0, 0, 0];
        //this.mToTheEnemies[209] = [9, 0, 0];
        //this.mToTheEnemies[210] = [7, 7, 7];
        //this.mToTheEnemies[211] = [0, 0, 0];
        //this.mToTheEnemies[212] = [0, 7, 0];
        //this.mToTheEnemies[213] = [1, 0, 5];
        //this.mToTheEnemies[214] = [0, 0, 0];
        //this.mToTheEnemies[215] = [0, 0, 0];
        //this.mToTheEnemies[216] = [0, 0, 0];
        //this.mToTheEnemies[217] = [0, 0, 0];
        //this.mToTheEnemies[218] = [0, 0, 0];
        //this.mToTheEnemies[219] = [0, 2, 0];
        //this.mToTheEnemies[220] = [0, 0, 0];
        //this.mToTheEnemies[221] = [6, 0, 7];
        //this.mToTheEnemies[222] = [0, 0, 0];
        //this.mToTheEnemies[223] = [0, 0, 0];
        //this.mToTheEnemies[224] = [0, 1, 0];
        //this.mToTheEnemies[225] = [0, 0, 0];
        //this.mToTheEnemies[226] = [0, 0, 9];
        //this.mToTheEnemies[227] = [0, 0, 0];
        //this.mToTheEnemies[228] = [9, 0, 0];
        //this.mToTheEnemies[229] = [0, 0, 0];
        //this.mToTheEnemies[230] = [8, 9, 8];
        //this.mToTheEnemies[231] = [8, 8, 8];
        //this.mToTheEnemies[232] = [0, 0, 0];
        //this.mToTheEnemies[233] = [0, 0, 0];
        //this.mToTheEnemies[234] = [0, 0, 0];
        //this.mToTheEnemies[235] = [0, 0, 7];
        //this.mToTheEnemies[236] = [8, 8, 8];
        //this.mToTheEnemies[237] = [8, 8, 8];
        //this.mToTheEnemies[238] = [0, 0, 0];
        //this.mToTheEnemies[239] = [0, 7, 7];
        //this.mToTheEnemies[240] = [0, 0, 0];
        //this.mToTheEnemies[241] = [0, 0, 0];
        //this.mToTheEnemies[242] = [0, 0, 0];
        //this.mToTheEnemies[243] = [0, 0, 0];
        //this.mToTheEnemies[244] = [0, 0, 0];
        //this.mToTheEnemies[245] = [0, 0, 0];
        //this.mToTheEnemies[246] = [0, 0, 0];
        //this.mToTheEnemies[247] = [0, 0, 0];
        //this.mToTheEnemies[248] = [0, 0, 0];
        //this.mToTheEnemies[249] = [0, 0, 0];
        //this.mToTheEnemies[250] = [0, 0, 0];
        //this.mToTheEnemies[251] = [0, 0, 0];
        //this.mToTheEnemies[252] = [0, 0, 0];
        //this.mToTheEnemies[253] = [0, 0, 0];
        //this.mToTheEnemies[254] = [0, 0, 0];
        //this.mToTheEnemies[255] = [0, 0, 0];


        //  this.mToTheEnemies = [];
        //  this.mToTheEnemies[0] = [];
        ////  this.mToTheEnemies = new Array<number[]>(256), (3);

        //  var count = 0;
        //  var enemyCount = 0;

        //  for (var i = 0; i < this.m_levels[i].length; i++) {
        //      var row = this.m_levels[i];
        //      for (var a = 0; a < 13; a++) {
        //          switch (row[a]) {

        //              case 2:
        //                  this.mToTheEnemies[count][enemyCount] = 2;
        //                  //this.mToTheEnemies[(count / 10)].push(row[a]);
        //                  //this.mToTheEnemies[(count / 10)][enemyCount].push(row[a]);
        //                 //// ToTheEnemes[(count / 10), enemyCount] = 2;
        //                  break;
        //          }
        //          count += 1;
        //      }
        //  }
    }

    public ConfigureEnemies(belowScreenCounter): void {
        this.m_enemies = [];
        //var index = this.mToTheEnemies[belowScreenCounter];
        //var jindex;
        //for (var i = 0; i < 3; i++) {
        //    //index = this.mToTheEnemies[belowScreenCounter][i];
        //    jindex = index[i];
        //    switch (jindex) {
        //        case 1:  //a
        //            var alf = (new Alf(100, 100, 1, this.m_sprites, this.m_walls));
        //            this.m_enemies.push(alf);
        //            break;
        //        case 2:  //b
        //            //var bird = new Bird(300, 366, 1, this.m_sprites, this.m_walls);
        //            //this.m_enemies.push(bird);
        //            break;
        //        case 3:  //c
        //            var caterpillar = new Caterpillar(300, 366, 1, this.m_sprites, this.m_walls);
        //            this.m_enemies.push(caterpillar);
        //            break;
        //        case 4:  //d
        //            var greenMeanie = (new GreenMeanie((Math.random() * 360), 366, 1, this.m_sprites, this.m_walls));
        //            this.m_enemies.push(greenMeanie);
        //            break;
        //        case 5:  //e
        //            var fire = (new Fire(300, 372, 1, this.m_sprites, this.m_walls));
        //            this.m_enemies.push(fire);
        //            break;
        //        case 6:  //f
        //            var fish = new Fish(300, 300, 1, this.m_sprites, this.m_walls);
        //            this.m_enemies.push(fish);
        //            break;
        //        case 7:  //g
        //            var plant = new Plant(300, 300, 1, this.m_sprites, this.m_walls);
        //            this.m_enemies.push(plant);
        //            break;
        //        case 8:  //h
        //            var whirlWind = new WhirlWind((Math.random() * 360), (Math.random() * 360), 1, this.m_sprites, this.m_walls);
        //            this.m_enemies.push(whirlWind);
        //            break;
        //        case 9:  //i
        //            var woodLouse = new WoodLouse(300, 300, 1, this.m_sprites, this.m_walls);
        //            this.m_enemies.push(woodLouse);
        //            break;
        //        case 10:
        //            var redSpaceMan = (new RedSpaceman((Math.random() * 360), (Math.random() * 360), 1, this.m_sprites, this.m_walls));
        //            this.m_enemies.push(redSpaceMan);
        //            break;
        //        case 11:
        //            break;
        //        case 12:
        //            break;
        //        case 13:
        //            break;
        //    }
        //}

        for (var j = 0; j < 3; j++) {
            var floatingEnemies = Math.ceil(Math.random() * 6);
            switch (floatingEnemies) {
                case 1:
                    //this.m_enemies.push(new SpringBear((Math.random() * 360), (Math.random() * 360), 1, this.m_sprites, this.m_walls));//, mPlatforms));//Math.max(800, Math.random() * 1200);
                    this.m_enemies.push(new SpringBear((Math.max(200, Math.random() * 600)), (Math.random() * 360), 1, this.m_sprites, this.m_walls, this.m_screen));
                    break;
                case 2:
                    //this.m_enemies.push(new BlueThingy((Math.random() * 360), (Math.random() * 360), 1, this.m_sprites, this.m_walls));//, mPlatforms));
                    this.m_enemies.push(new BlueThingy((Math.max(200, Math.random() * 600)), (Math.random() * 360), 1, this.m_sprites, this.m_walls, this.m_screen));//, mPlatforms));
                    break;
                case 3:
                    this.m_enemies.push(new ChasingEnemy(300, 300, 1, this.m_sprites, this.m_walls, this.m_screen));//, mPlatforms));
                    break;
                case 4:
                    //this.m_enemies.push(new SpringBear((Math.random() * 360), (Math.random() * 360), 1, this.m_sprites, this.m_walls));//, mPlatforms));
                    this.m_enemies.push(new SpringBear((Math.max(200, Math.random() * 600)), (Math.random() * 360), 1, this.m_sprites, this.m_walls, this.m_screen));
                    break;
                case 5:
                    //this.m_enemies.push(new BlueThingy((Math.random() * 360), (Math.random() * 360), 1, this.m_sprites, this.m_walls));//, mPlatforms));
                    this.m_enemies.push(new BlueThingy((Math.max(200, Math.random() * 600)), (Math.random() * 360), 1, this.m_sprites, this.m_walls, this.m_screen));//, mPlatforms));
                    break;
                case 6:
                    this.m_enemies.push(new ChasingEnemy(300, 300, 1, this.m_sprites, this.m_walls, this.m_screen));//, mPlatforms));
                    break;
            }
        }
    }

    public AddToEnemyList(value: Enemy): void {
        this.m_enemies.push(value);
    }

    public get EnemyList(): Array<Enemy> { return this.m_enemies; }
    public get Levels(): number[][] { return this.m_leveldata.Levels; }
    public get UpperRocks(): number[][] { return this.m_upperRockArray; }
    public get Hole1(): number[] { return this.m_holeArray0; }
    public get Hole2(): number[] { return this.m_holeArray1; }
    public get Mounds(): number[] { return this.m_moundArray; }
    //public set Walking(value: boolean) { this.m_walkingOnFloor = value; }
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