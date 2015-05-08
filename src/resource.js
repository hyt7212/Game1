var res = {
    /*HelloWorld_png : "res/HelloWorld.png",
    CloseNormal_png : "res/CloseNormal.png",
    CloseSelected_png : "res/CloseSelected.png"*/

    //菜单场景资源
    GameMenuBG_png : "res/GameMenu/bg.png",
    GameMenuTop_png : "res/GameMenu/top.png",
    GameMenustartMenu_png : "res/GameMenu/startMenu.png",
    GameMenuBG_mp3 : "res/GameMenu/bgMusic.mp3",

    //游戏场景资源
    PlayGameCart_png : "res/PlayGame/cart.png",
    PlayGameCloseNormal_png : "res/PlayGame/CloseNormal.png",
    PlayGameCloseSelected_png : "res/PlayGame/CloseSelected.png"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}