/**
 * 掉落物品
 * Created by SeanHwang on 2015/5/9.
 */
var Enemy = cc.Sprite.extend({
    zOrder:1000,
    ctor: function(arg){
        cc.log("#"+arg.textureName);
        this._super("#item0.png");
    },

    update:function (dt) {
        var x = this.x;
        var y = this.y;
        if ((x < 0 || x > MW.WIDTH) && (y < 0 || y > MW.HEIGHT)) {
            this.active = false;
        }
        this._timeTick += dt;
        if (this._timeTick > 0.1) {
            this._timeTick = 0;
            if (this._hurtColorLife > 0) {
                this._hurtColorLife--;
            }
        }

        if (x < 0 || x > g_GPTouchLayer.screenRect.width || y < 0 || y > g_GPTouchLayer.screenRect.height || this.HP <= 0) {
            this.active = false;
            this.destroy();
        }

    }
});

//创建一个物品
/*Enemy.create = function (arg) {
    var enemy = new Enemy(arg);
    g_GPTouchLayer.addEnemy(enemy, enemy.zOrder, GC.UNIT_TAG.ENEMY);
    GC.CONTAINER.ENEMIES.push(enemy);
    return enemy;
};*/
Enemy.create = function (arg) {
    var enemy = new Enemy(arg);
    g_GPTouchLayer.addEnemy(enemy, enemy.zOrder, MW.UNIT_TAG.ENEMY);
    MW.CONTAINER.ENEMIES.push(enemy);
    return enemy;
};

//初始化
Enemy.preSet = function(){
    var enemy = null;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < EnemyType.length; j++) {
            enemy = Enemy.create(EnemyType[j]);
            enemy.stopAllActions();
            enemy.unscheduleAllCallbacks();
        }
    }
};