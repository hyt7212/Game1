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
    _text: {"scoreLab": "分数: ", "descTimeLab": "时间: "},
    _items: [], //场上物品精灵列表
    ctor: function () {
        this._super();
        this._items = [];

        this.initScore();
        this.initDescTime();
        this.bgMusic();
        this.initBG();
        this.initCart();
    },
    onEnter: function () {
        this._super();

        this.scheduleUpdate();
        this.schedule(this.updateDescTime, 1);
    },
    initScore: function () {
        this._score = 0;
        this._scoreLab = new cc.LabelTTF(this._text.scoreLab + this._score, '', 30);
        this._scoreLab.setAnchorPoint(0, 0.5);
        this._scoreLab.setPosition(60, GC.h * 0.65);
        this.addChild(this._scoreLab, 2);
    },
    initDescTime: function () {
        this._descTime = GC.GAME_TIME;
        this._descTimeLab = new cc.LabelTTF(this._text.descTimeLab + this._descTime, '', 30);
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
    },
    /**
     * 实时更新
     */
    update: function () {
        this.updateUI();
        this.downItem();
        //碰撞检测
        var cartBox = this._cart.getBoundingBox();
        for (var i = 0; i < this._items.length; i++) {
            var item = this._items[i];
            var itemBox = item.getBoundingBox();
            //超出屏幕判断
            if (itemBox.y <= 0) {
                item.removeFromParent();
                this._items.splice(i, 1);
                continue;
            }

            if (cc.rectIntersectsRect(cartBox, itemBox)) { //是否发生碰撞
                //加减分数
                this._score += item._score;
                item.removeFromParent();
                this._items.splice(i, 1);

                //加减分效果显示
                var score = item._score;
                if (score > 0) {
                    score = '+' + score;
                }
                var label = new cc.LabelTTF(score, '', 30);
                label.setPosition(this._cart.getPosition());
                label.setColor(cc.color(255, 255, 255));
                this.addChild(label, 1);
                //加速动画
                var move = new cc.MoveBy(0.5, cc.p(0, 60));
                var Ease = move.easing(cc.easeBackOut(3.0));
                label.runAction(Ease);
                //淡出动画
                var disapear = new cc.FadeTo(0.5,0);
                var finish = new cc.CallFunc(function () {
                    this.removeFromParent(true);
                },label);
                var action = new cc.Sequence(disapear, finish);
                label.runAction(action);
            }
        }
    },
    /**
     * 更新分数、时间显示
     */
    updateUI: function () {
        this._scoreLab.setString(this._text.scoreLab + this._score);
        this._descTimeLab.setString(this._text.descTimeLab + this._descTime);
    },
    /**
     * 更新倒计时
     */
    updateDescTime: function () {
        if (this._descTime > 0) {
            this._descTime--;
        } else {
            this.unschedule(this.updateDescTime);
            //游戏结束
            this.timeEnd();
        }
    },
    /**
     * 掉落物品
     */
    downItem: function () {
        if (this._items.length < GC.MAX_ITEMS) {
            var itemData = GC.ITEMS[rd(0, GC.ITEMS.length - 1)];
            var item = new itemSprite(itemData);
            this.addChild(item);
            this._items.push(item);
        }
    },
    /**
     * 时间结束
     */
    timeEnd: function () {
        cc.log('游戏结束');
        this.unscheduleAllCallbacks();
        cc.director.runScene(new cc.TransitionFade(GC.TRANSITION_TIME, new overScene(this._score)));
    }
});


var playScene = cc.Scene.extend({
    ctor: function () {
        this._super();

        this.addChild(new playLayer());
    }
});