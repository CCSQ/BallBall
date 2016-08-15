cc.Class({
    extends: cc.Component,

    properties: {
        cel: {
            default: null,
            type: cc.Prefab,
        },

        play: {
            default: null,
            type: cc.Node,
        },

        celNumber: 0,
    },

    ini: function(){
        // 碰撞系统
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        //manager.enabledDebugDraw = true;
        //manager.enabledDrawBoundingBox = true;
    },

    // use this for initialization
    onLoad: function () {
        this.ini();
        this.play.getComponent('play').game = this;

        this.ballArr = new Array();
        for(var i = 0; i < this.celNumber; i++) {
            var x = this.node.width/2 * cc.randomMinus1To1();
            var y = this.node.height/2 * cc.randomMinus1To1();
            this.ballArr[i] = cc.instantiate(this.cel);
            this.node.addChild(this.ballArr[i]);
            this.ballArr[i].setPosition(x, y);
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
