var res = {
    st_bg_png: "res/start/bg.png",
    st_topbg_png: "res/start/top.png",
    st_start_png: "res/start/start.png",

    pl_bgMusic_mp3: "res/play/bgMusic.mp3",
    pl_cart_png: "res/play/cart.png",
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}

//加载物品图片
for (var j = 0; j < GC.ITEMS.length; j++) {
    g_resources.push(GC.ITEMS[j].path);
}