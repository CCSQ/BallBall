var colorArr = ['#FF0000', '#00FF00', '#0000FF'];

cc.Class({
    extends: cc.Component,

    properties: {
        r: 0,
        x: 0,
        y: 0,
    },

    dropcircle: function(x, y, r, color){
        this.graphics.fillColor = cc.hexToColor(color);
        this.graphics.arc(x, y, r, 0, 360);
        this.graphics.stroke();
        this.graphics.fill();
    },

    // use this for initialization
    onLoad: function () {
        if (cc.director.setClearColor) {
            cc.director.setClearColor( cc.Color.WHITE );
        }

        this.graphics = this.getComponent(cc.Graphics);
        this.graphics.lineWidth = 1;
        this.dropcircle(this.x, this.y, this.r, colorArr[Math.floor(Math.random()*colorArr.length)]);
    },

    // 碰撞
    onCollisionEnter: function(other, self){
        // self.node.x = 
        // self.node.y = 
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
