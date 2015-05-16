/**
 * Created by Young on 2015/5/8.
 */

var g_GPTouchLayer;

var GPTouchLayer = cc.Layer.extend({
    _lbScore: null, //分数
    _time: GC.GAME_TIME, //游戏时间
    _descTime: null, //倒计时
    _items : null, //物品

    ctor: function () {
        this._super();
        this.init();
    },

    //初始化
    init:function(){
        g_GPTouchLayer = this;
        GC.SCORE = 0;

        this.initAboutInfo(); //分数计时器
        this.initCart(); //购物车
        this.schedule(this.descTime, 1); //倒计时
        this.scheduleUpdate();

        this.doDownItem(0);
    },

    //显示分数，倒计时
    initAboutInfo: function () {
        //显示分数
        this._lbScore = new cc.LabelBMFont("Score: 0", res.arial_14_fnt);
        this._lbScore.attr({
            anchorX: 0,
            anchorY: 1,
            x: 10,
            y: GC.h - 150
        });
        this._lbScore.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this._lbScore, 1000);

        //倒计时
        this._descTime = new cc.LabelBMFont('Time: ' + this._time, res.arial_14_fnt);
        this._descTime.attr({
            anchorX: 1,
            anchorY: 0,
            x: GC.w - 5,
            y: GC.h - 160
        });
        this._descTime.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this._descTime, 1000);
    },

    //购物车
    initCart: function () {
        var cartTexture = cc.textureCache.addImage(res.PlayGameCart_png);
        var cart = Lead.paddleWithTexture(cartTexture); //调用购物车移动处理类
        cart.x = GC.w / 2;
        cart.y = 50;
        this.addChild(cart);
    },

    //执行倒计时
    descTime: function () {
        if (this._time <= 0) {
            //游戏结束
            cc.log("onGameOver");
            this.onGameOver();
        } else {
            this._time -= 1;
            this._descTime.setString("Time: " + this._time);
        }
    },

    //实时刷新
    update: function () {
        cc.log('dl');
        //cc.log(this._items);
    },

    //掉落物品
    doDownItem: function (item) {
        //加载掉落物品到缓存
        cc.spriteFrameCache.addSpriteFrames(res.textureItems_plist);
        var playerTexture = cc.textureCache.addImage(res.textureItems_png);

        this._items = cc.Sprite.create("#item"+item+".png");
        this._items.x = Math.random() * GC.w;
        this._items.y = 300;
        //掉落到底部
        this._items.runAction(cc.moveBy(2, cc.p(0, -300)));

        this.addChild(this._items,10);
    },


    //游戏结束
    onGameOver: function () {
        this.unscheduleUpdate(this); //停止物品掉落
        this.unschedule(this.descTime); //停止倒计时
        cc.director.runScene(new cc.TransitionFade(1.2, new GameOverScene()));
    }
});