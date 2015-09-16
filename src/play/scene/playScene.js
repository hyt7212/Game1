/**
 * 游戏进行场景
 * Created by young on 15/9/16.
 */
var playLayer = cc.Layer.extend({
    _cart: null, //购物车
    _scoreLab: null,
    _score: 0, //分数
    _descTimeLab: null,
    _descTime: 0, //倒计时
    ctor: function () {
        this._super();

        this.initScore();
        this.initDescTime();
        this.bgMusic();
        this.initBG();
        this.initCart();
    },
    initScore: function () {
        this._score = 0;
        this._scoreLab = new cc.LabelTTF('分数: ' + this._score, '', 30);
        this._scoreLab.setAnchorPoint(0, 0.5);
        this._scoreLab.setPosition(60, GC.h * 0.65);
        this.addChild(this._scoreLab, 2);
    },
    initDescTime: function () {
        this._descTime = GC.GAME_TIME;
        this._descTimeLab = new cc.LabelTTF('时间: ' + this._descTime, '', 30);
        this._descTimeLab.setAnchorPoint(0, 0.5);
        this._descTimeLab.setPosition(GC.w - this._descTimeLab.width - 60, GC.h * 0.65);
        this.addChild(this._descTimeLab, 2);
    },
    /**
     * 背景音乐
     */
    bgMusic: function () {
        if (GC.SOUND_ON) {
            if (cc.audioEngine.isMusicPlaying()) {
                return;
            }
            cc.audioEngine.playMusic(res.pl_bgMusic_mp3, true);
        }
    },
    /**
     * 停止音乐
     */
    stopMusic: function () {
        cc.audioEngine.stopMusic(); //停止音乐
        cc.audioEngine.stopAllEffects(); //停止音效
        GC.SOUND_ON = false;
    },
    /**
     * 背景
     */
    initBG: function () {
        var mainBG = new cc.Sprite(res.st_bg_png);
        mainBG.setPosition(GC.w_2, GC.h_2);
        this.addChild(mainBG);

        var minorBG = new cc.Sprite(res.st_topbg_png);
        minorBG.setPosition(GC.w_2, GC.h - minorBG.height / 2);
        this.addChild(minorBG, 9);
    },
    /**
     * 购物车
     */
    initCart: function () {
        this._cart = new cartSprite(res.pl_cart_png);
        this.addChild(this._cart);
    }
});


var playScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        this.addChild(new playLayer());
    }
});