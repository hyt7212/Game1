/**
 * Created by Young on 2015/5/8.
 */

var g_GPTouchLayer;
var i = 1;

var GPTouchLayer = cc.Layer.extend({
    _lbScore: null, //分数
    tmpScore: 0, //临时分数
    _time: GC.GAME_TIME, //游戏时间
    _descTime: null, //倒计时
    _items : [], //所有物品
    _maxItems : 5, //最多物品数量
    _cart : null, //购物车

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

        //加载掉落物品到缓存
        cc.spriteFrameCache.addSpriteFrames(res.textureItems_plist);
        var itemsTexture = cc.textureCache.addImage(res.textureItems_png);
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
        //cart.setTag('cart');
        this._cart = cart;
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
        if(i <= this._maxItems){ //小于最大数量，添加掉落物品
            this.doDownItem();
            i++;
        }

        var selChild = null;
        for (var j = 0; j < this._items.length; j++) {
            selChild = this._items[j];
            var selChildPos = selChild.getPosition();
            //碰撞检测
            var cX = this._cart.getPosition().x;
            var cY = this._cart.getPosition().y;
            var sX = selChildPos.x;
            var sY = selChildPos.y;
            //cc.log('cX:'+cX + ' cY:'+cY + ' sX:' + sX + ' sY:' + sY);
            if(Math.abs(sX - cX) < 20 && Math.abs(sY - cY) < 15){
                cc.log('yes');
                this.removeChildByTag(selChild.tag); //碰撞，移除该物品
                this._items.splice(j, 1);
                i--;

                //加分
                var fenShu = '+1';
                if(selChild.tag == 'item0'){
                    this.tmpScore--;
                    fenShu = "-1";
                }else{
                    this.tmpScore++;
                }
                this._lbScore.string = 'Score: ' + this.tmpScore;

                //显示得分效果
                var label = new cc.LabelTTF(fenShu, "Arial", 30);
                label.setPosition(this._cart.getPosition());
                label.setColor(cc.color(255, 255, 255));
                this.addChild(label, 1);
                //加速动画
                var move = new cc.MoveBy(0.5, cc.p(0, 60));
                var Ease = move.easing(cc.easeBackOut(3.0));
                label.runAction(Ease);
                //淡出动画
                var disapear = new cc.FadeTo(0.5,0);
                var finish = new cc.CallFunc(this.NumDisapear,label);
                var action = new cc.Sequence(disapear, finish);
                label.runAction(action);
            }

            //超出屏幕检测
            if(selChildPos.y <= 0){
                this.removeChildByTag(selChild.tag);
                this._items.splice(j, 1);
                i--;
            }
        }
    },

    //掉落物品
    doDownItem: function () {
        var i = rd(0, 12);
        var item = cc.Sprite.create("#item"+i+".png");
        item.x = Math.random() * GC.w;
        item.y = 300 + rd(30, 150);
        item.setTag('item' + i); //设置标签
        //掉落到底部
        var time = Math.random() + 0.6; //掉落速度
        item.runAction(cc.moveBy(time, cc.p(0, -480)));
        this.addChild(item,10);
        this._items.push(item);
    },

    //移除加分文字
    NumDisapear:function(label)
    {
        label.removeFromParent(true);
    },

    //游戏结束
    onGameOver: function () {
        this.unscheduleUpdate(this); //停止物品掉落
        this.unschedule(this.descTime); //停止倒计时
        cc.director.runScene(new cc.TransitionFade(1.2, new GameOverScene()));
    }
});

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