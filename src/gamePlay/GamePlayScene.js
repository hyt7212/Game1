/**
 * Created by Young on 2015/5/5.
 * 进行游戏场景
 */
var GamePlayLayer = cc.Layer.extend({
    _ball:null,

    ctor:function () {
        //super init
        this._super();

        this.Background(); //添加背景
        this.Cart(); //购物车
        this.Menu(); //返回-游戏菜单
    },

    //背景
    Background:function(){
        //主背景
        var Background = new cc.Sprite(res.GameMenuBG_png);
        Background.attr({
            x : GC.w_2, //定位
            y : GC.h_2,
            anchorX: 0.5, //中心点
            anchorY: 0.5,
            scale : 0.5 //缩放
        });
        this.addChild(Background);
        //次背景
        var BackgroundC = new cc.Sprite(res.GameMenuTop_png);
        BackgroundC.attr({
            x : GC.w / 2,
            y : GC.h - BackgroundC.height / 4,
            anchorX: 0.5, //中心点
            anchorY: 0.5,
            scale : 0.5 //缩放
        });
        this.addChild(BackgroundC);
    },

    //购物车
    Cart:function(){
        var cartTexture = cc.textureCache.addImage(res.PlayGameCart_png);
        var cart = Lead.paddleWithTexture(cartTexture); //调用购物车移动处理类
        cart.x = GC.w / 2;
        cart.y = 50;
        this.addChild(cart);
    },

    //返回菜单
    Menu:function(){
        var closeItem = new cc.MenuItemImage(res.PlayGameCloseNormal_png, res.PlayGameCloseSelected_png, this.onMenuCallback, this); //创建开始按钮
        //设置属性
        closeItem.attr({
            x: GC.w - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        //生成菜单
        var menu = new cc.Menu(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    },

    //返回菜单点击事件
    onMenuCallback:function (sender) {
        cc.log('BackBtn click!'); //输出控制台日志
        //切换场景
        cc.director.runScene(new cc.TransitionFade(1.2, new GameMenuScene()));
    }
});


var GamePlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new GamePlayLayer();
        this.addChild(layer);
    }
});