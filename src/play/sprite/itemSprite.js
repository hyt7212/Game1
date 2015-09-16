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

        var pos = cc.p(rd(0, GC.w), rd(GC.h * 0.75, GC.h * 2));
        this.setPosition(pos);

        //移动到底部
        this.scheduleUpdate();
    },
    /**
     * 每帧移动坐标
     */
    update: function () {
        this.setPositionY(this.y - (8 + this._speed));
    }
});