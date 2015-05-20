/**
 * Created by Young on 2015/5/5.
 * 游戏菜单场景
 */
var GameMenuLayer = cc.Layer.extend({
    ctor:function () {
        //super init
        this._super();

        this.Background(); //添加背景
        this.bgMusic();//添加背景音乐
        this.Menu(); //菜单
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

    //背景音乐
    bgMusic:function(){
        if (GC.SOUND_ON){
            if (cc.audioEngine.isMusicPlaying()){
                return;
            }
            cc.audioEngine.playMusic(res.GameMenuBG_mp3, true);
        }
    },

    //菜单
    Menu:function(){
        var startBtn = new cc.MenuItemImage(res.GameMenustartMenu_png, null, this.onMenuCallback, this); //创建开始按钮
        startBtn.attr({ //设置属性
            scale : 0.5
        });
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
        menu.y = 100;
        this.addChild(menu, 1, 1);
    },

    //开始游戏按钮点击事件
    onMenuCallback:function (sender) {
        cc.log("startBtn click!"); //输出控制台日志
        cc.audioEngine.stopMusic(); //停止音乐
        cc.audioEngine.stopAllEffects(); //停止音效
        //切换到进行游戏场景
        cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene()));
    }
});


var GameMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new GameMenuLayer();
        this.addChild(layer);
    }
});