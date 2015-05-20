/**
 * Created by lingjianfeng on 14-8-31.
 */



var GC = GC || {};

GC.winSize = cc.size(320, 480); //设备尺寸

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2 ;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = false; //是否开启背景音乐

GC.GAME_TIME = 60; //游戏时间

////container
//GC.CONTAINER = {
//    ENEMIES:[],
//    ENEMY_BULLETS:[],
//    PLAYER_BULLETS:[],
//    EXPLOSIONS:[],
//    SPARKS:[],
//    HITS:[],
//    BACKSKYS:[],
//    BACKTILEMAPS:[]
//};
//
////unit tag
//GC.UNIT_TAG = {
//    ENMEY_BULLET:900,
//    PLAYER_BULLET:901,
//    ENEMY:1000,
//    PLAYER:1000
//};