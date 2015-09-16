/**
 * 游戏结束场景
 * Created by young on 15/9/16.
 */
var overLayer = cc.Layer.extend({
    _score: 0,
    ctor: function (score) {
        this._super();
        this._score = score;

        this.initBG(); //添加背景
        this.source(); //分数
        this.initMenu(); //重新开始按钮
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
     * 重新开始按钮
     */
    initMenu: function () {
        var lab = new cc.LabelTTF('重新开始', '', 40);
        var muItem = new cc.MenuItemLabel(lab, function () {
            cc.director.runScene(new cc.TransitionFade(GC.TRANSITION_TIME, new startScene()));
        }, this);
        var mu = new cc.Menu(muItem);
        mu.y = GC.h * 0.4;
        this.addChild(mu);
    },
    /**
     * 分数
     */
    source: function () {
        var score = new cc.LabelTTF('得分: ' + this._score, '', 50);
        score.setPosition(GC.w_2, GC.h_2);
        this.addChild(score);
    }
});


var overScene = cc.Scene.extend({
    ctor: function (score) {
        this._super();

        this.addChild(new overLayer(score));
    }
});