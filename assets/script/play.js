cc.Class({
    extends: cc.Component,

    properties: {
        r: 0,
        x: 0,
        y: 0,
        maxSpeed: 0,
        speed: 0,   //速度
    },

    dropcircle: function(x, y, r, color){
        this.graphics.fillColor = cc.hexToColor(color);
        this.graphics.arc(x, y, r, 0, 360);
        this.graphics.stroke();
        this.graphics.fill();
    },

    touchFun: function (touch, event, self) {
        var pos = touch.getLocation();

        self.posx = pos.x - self.game.node.width/2;
        self.posy = pos.y - self.game.node.height/2;

        var x = self.node.x - self.posx,    // 距离
            y = self.node.y - self.posy;
        
        
        var xs = x/y, ys = 1;   // 计算速度
        var temp = Math.sqrt(10*10/(xs * xs + ys * ys))/30;
        xs = Math.abs(xs) * temp;
        ys = temp;

        if (x > 0) {
            self.xSpeed = -xs;
        } else if(x < 0) {
            self.xSpeed = xs;
        } else {
            self.xSpeed = 0;
        }

        if (y > 0) {
            self.ySpeed = -ys;
        } else if(y < 0) {
            self.ySpeed = ys;
        } else {
            self.ySpeed = 0;
        }
        
        return true;
    },

    // 输入
    setInput: function(){
        var self = this;
        if ('touches' in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                onTouchBegan: function(touch, event) {
                    self.touchFun(touch, event, self);
                },
                onTouchMoved: function(touch, event) {
                    self.touchFun(touch, event, self);
                },
                onTouchEnded: function(touch, event){
                    self.touchFun(touch, event, self);
                },
                onToucheCancelled: function(touch, event){
                    
                },
            }, self.node);
        }
        //  if('mouse' in cc.sys.capabilities) {
        //     cc.eventManager.addListener({
        //         event: cc.EventListener.MOUSE,
        //         onMouseDown: function(event) {
        //             var pos = event.getLocation();
        //             pos.x -= self.game.node.width/2;
        //             pos.y -= self.game.node.height/2;
        //             self.posx = pos.x;
        //             self.posy = pos.y;
        //         },
        //         onMouseMove: function(event) {
                    
        //         },
        //         onMouseUp: function(event) {
                    
        //         },
        //     }, self.node);
        // }
    },

    // use this for initialization
    onLoad: function () {
        this.posx;
        this.posy;
        this.xSpeed = 0;    // x位移量
        this.ySpeed = 0;    // y位移量
        this.scale = 1;    // 缩放

        this.setInput();

        if (cc.director.setClearColor) {
            cc.director.setClearColor( cc.Color.WHITE );
        }

        this.graphics = this.getComponent(cc.Graphics);
        this.graphics.lineWidth = 1;
        this.dropcircle(this.x, this.y, this.r, '#FF00FF');
    },

    // 碰撞
    onCollisionEnter: function(other, self){
        this.scale += 0.01;
        self.node.setScale(this.scale, this.scale);
        
        if(this.speed != 1){
            this.speed -= 0.001;
        }
        var x = this.game.node.width/2 * cc.randomMinus1To1(),
            y = this.game.node.height/2 * cc.randomMinus1To1();
        other.node.setPosition(x, y);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        if(Math.floor(this.node.x) != Math.floor(this.posx) && Math.floor(this.node.y) != Math.floor(this.posy)) {
            this.node.x += this.xSpeed * this.speed;
            this.node.y += this.ySpeed * this.speed;
        }
    },
});
