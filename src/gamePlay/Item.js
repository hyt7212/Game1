/**
 * 掉落物品
 * Created by SeanHwang on 2015/5/9.
 */

var Item = cc.Sprite.extend({
    ctor: function(){
        this._super();


    }
});

Item.paddleWithTexture = function (aTexture) {
    var paddle = new Item();
    paddle.initWithTexture(aTexture);

    return paddle;
};


