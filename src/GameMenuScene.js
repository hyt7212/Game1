/**
 * Created by Young on 2015/5/5.
 * 游戏菜单场景
 */
var GameMenuLayer = cc.Layer.extend({
    ctor:function () {
        //super init
        this._super();

        //获取设备尺寸
        //var winSize = cc.winSize;

        this.GMBackground(); //背景

        //添加背景音乐
        //cc.audioEngine.playMusic(res.GameMenuBG_mp3, true);

        return true;
    },

    //添加背景
    GMBackground:function(){
        //添加背景
        var GMBackground = new cc.Sprite(res.GameMenuBG_png);
        GMBackground.attr({
            x : GC.winSize / 2, //定位
            y : GC.winSize / 2,
            scale: 0.5 //中心点
        });
        this.addChild(GMBackground, 0);
    }
});


var GameMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameMenuLayer();
        this.addChild(layer);
    }
});