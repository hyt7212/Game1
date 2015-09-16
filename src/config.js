/**
 * Created by young on 15/9/16.
 */

var GC = GC || {};

GC.winSize = cc.size(640, 960); //设备尺寸

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2 ;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = false; //是否开启背景音乐

GC.GAME_TIME = 60; //游戏时间

GC.TRANSITION_TIME = 1.2; //场景切换时间

GC.MAX_ITEMS = 5; //最大同时出现物品数量

//物品列表以及分数
GC.ITEMS = [
    {"img": "#item0.png", "score": -1},
    {"img": "#item1.png", "score": +1},
    {"img": "#item2.png", "score": +2},
    {"img": "#item3.png", "score": +3},
    {"img": "#item4.png", "score": +4},
    {"img": "#item5.png", "score": +5},
    {"img": "#item6.png", "score": +6},
    {"img": "#item7.png", "score": +7},
    {"img": "#item8.png", "score": +8},
    {"img": "#item9.png", "score": +9},
    {"img": "#item10.png", "score": +10},
    {"img": "#item11.png", "score": +11},
    {"img": "#item12.png", "score": +12},
];


/**
 * 随机整数
 * @param n 最小值
 * @param m 最大值
 * @returns {number}
 */
function rd(n, m){
    var c = m - n + 1;
    return Math.floor(Math.random() * c + n);
}