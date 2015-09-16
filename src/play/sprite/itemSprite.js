/**
 * 掉落物品精灵
 * Created by young on 15/9/16.
 */
var itemSprite = cc.Sprite.extend({
    _speed: null,
    _score: 0,
    ctor: function (itemData) {
        this._super(itemData.path);
        this._speed = itemData.speed;
        this._score = itemData.score;

        var pos = cc.p(rd(0, GC.w), rd(GC.h * 0.75, GC.h));
        this.setPosition(pos);

        //移动到底部
        var act = cc.moveTo(this._speed, cc.p(pos.x, -100));
        this.runAction(act);
    }
});