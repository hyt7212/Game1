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

GC.GAME_TIME = 10; //游戏时间

GC.TRANSITION_TIME = 1.2; //场景切换时间

GC.MAX_ITEMS = 5; //最大同时出现物品数量

//物品列表以及分数
GC.ITEMS = [
    {"path": "res/play/item/item0.png", "img": "#item0.png", "speed": 1, "score": -1},
    {"path": "res/play/item/item1.png", "img": "#item1.png", "speed": 1, "score": +1},
    {"path": "res/play/item/item2.png", "img": "#item2.png", "speed": 1, "score": +2},
    {"path": "res/play/item/item3.png", "img": "#item3.png", "speed": 1, "score": +3},
    {"path": "res/play/item/item4.png", "img": "#item4.png", "speed": 1, "score": +4},
    {"path": "res/play/item/item5.png", "img": "#item5.png", "speed": 1, "score": +5},
    {"path": "res/play/item/item6.png", "img": "#item6.png", "speed": 1, "score": +6},
    {"path": "res/play/item/item7.png", "img": "#item7.png", "speed": 1, "score": +7},
    {"path": "res/play/item/item8.png", "img": "#item8.png", "speed": 1, "score": +8},
    {"path": "res/play/item/item9.png", "img": "#item9.png", "speed": 1, "score": +9},
    {"path": "res/play/item/item10.png", "img": "#item10.png", "speed": 1, "score": +10},
    {"path": "res/play/item/item11.png", "img": "#item11.png", "speed": 1, "score": +11},
    {"path": "res/play/item/item12.png", "img": "#item12.png", "speed": 1, "score": +12},
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