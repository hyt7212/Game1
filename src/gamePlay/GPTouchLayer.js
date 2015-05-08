/**
 * Created by Young on 2015/5/8.
 */

var g_GPTouchLayer;

var GPTouchLayer = cc.Layer.extend({
    _lbScore : null, //分数
    _time : 1, //游戏时间
    _descTime: null, //倒计时

    ctor: function () {
        this._super();

        g_GPTouchLayer = this;

        GC.SCORE = 0;

        this.initAboutInfo(); //分数计时器

        this.initCart(); //购物车

        this.schedule(this.descTime, 1); //倒计时

        this.scheduleUpdate();
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
    descTime: function(){
        if(this._time <= 0){
            //游戏结束
            cc.log("onGameOver");
            this.onGameOver();
        }else{
            this._time -= 1;
            this._descTime.setString("Time: " + this._time);
        }
    },

    //掉落物品
    update:function(){
        //cc.log('dl');
    },


    //游戏结束
    onGameOver: function(){
        this.unschedule(this.descTime);
        cc.director.runScene(new cc.TransitionFade(1.2, new GameOverScene()));
    }
});