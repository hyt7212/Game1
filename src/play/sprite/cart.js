/**
 * 购物车精灵
 * Created by young on 15/9/16.
 */
var cartSprite = cc.Sprite.extend({
    ctor: function (img) {
        this._super(img);
        this.setPosition(GC.w_2, 100);

        //触摸事件监听
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
    },
    onTouchBegan: function (touch, event) {
        var target = event.getCurrentTarget(); // 获取事件所绑定的 target, 通常是cc.Node及其子类

        // 获取当前触摸点相对于按钮所在的坐标
        var locationInNode = target.convertToNodeSpace(touch.getLocation());
        var s = target.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);

        if (cc.rectContainsPoint(rect, locationInNode)) { // 判断触摸点是否在按钮范围内

            return true;
        }
        return false;
    },
    onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        var delta = touch.getDelta(); //获取事件数据: delta

        if (target.x + delta.x > 0 && target.x + delta.x < GC.w) {
            target.x += delta.x;
            //target.y += delta.y;
        }
    },
    onTouchEnded: function (touch, event) {

    }
});