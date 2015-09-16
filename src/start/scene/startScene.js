/**
 * 游戏开始前场景
 * Created by young on 15/9/16.
 */
var startLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this.initBG();
        this.initmenu();
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
        this.addChild(minorBG);
    },
    /**
     * 开始按钮
     */
    initmenu:function(){
        var startBtn = new cc.MenuItemImage(res.st_start_png, null, this.onStart, this);
        //持续缩放效果
        var actionBy = cc.scaleBy(1.3, 1.3);
        var action3 = cc.sequence(
            actionBy,
            actionBy.reverse()
        );
        startBtn.runAction(action3.repeatForever());

        //生成菜单
        var menu = new cc.Menu(startBtn);
        menu.x = GC.w_2;
        menu.y = 200;
        this.addChild(menu);
    },
    /**
     * 开始按钮处理
     * @param sender
     */
    onStart:function (sender) {
        cc.log("开始!"); //输出控制台日志
        //切换到进行游戏场景
        cc.director.runScene(new cc.TransitionFade(GC.TRANSITION_TIME, new playScene()));
    }
});


var startScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        this.addChild(new startLayer());
    }
});