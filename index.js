var Breakout = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Breakout ()
    {
        Phaser.Scene.call(this, { key: 'breakout' });

        this.bricks;
        this.paddle;
        this.paddleTwo;
        this.ball;
        this.ballTwo;
        this.invisibleSquare;
        this.invisibleSquareTwo;
        this.left;
        this.right;
        this.a;
        this.d;
        this.score1;
        this.score2;
        this.space;

    },



    preload: function ()
    {
        this.load.atlas('assets', 'breakout/breakout.png', 'breakout/breakout.json');
        this.load.image('psyBrick1','assets/psychedelic_arkanoid_assets/brick_red.png');
        this.load.image('background', 'assets/psychedelic_arkanoid_assets/BG_6.png');
        this.load.image('paddle1', 'assets/psychedelic_arkanoid_assets/paddle_basic.png');
        this.load.image('paddle2', 'assets/psychedelic_arkanoid_assets/paddle_basic_2.png');
        this.load.image('psyBrick2', 'assets/psychedelic_arkanoid_assets/brick_green.png');

    },

    create: function ()
    {

        var background = this.add.image(400,400,'background');

        this.invisibleSquare = this.physics.add.staticImage(15,config.width/2,'psyBrick2');
        this.invisibleSquare.visible=true;
        this.invisibleSquare.angle = 90;
        this.invisibleSquareTwo = this.physics.add.staticImage(785,config.width/2,'psyBrick2');
        this.invisibleSquareTwo.angle = 90;
        this.invisibleSquareTwo.visible=true;


        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, false, false);

         //Create the bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'psyBrick1',
            frameQuantity: 50,
            gridAlign: { width: 10, height: 5, cellWidth: 64, cellHeight: 32, x: config.width/7, y: config.height/2.5 },
            visible: true
        })


        

        


        scoreText = this.add.text(40,40, "SCORE: 0 vs 0",{ fontSize: '32px', fill: 'white' });



        this.ball = this.physics.add.image(400, 740, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true);

        paddle = this.physics.add.image(400, 780, 'paddle1').setImmovable();


        this.ballTwo = this.physics.add.image(400, 60, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.ballTwo.setData('onPaddle', true);
        paddleTwo = this.physics.add.image(400, 20, 'paddle2').setImmovable();

        //  Our colliders

        this.physics.add.collider(this.ballTwo, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ballTwo, paddleTwo, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, paddleTwo, this.hitPaddle, null, this);

        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, paddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ballTwo, paddle, this.hitPaddle, null, this);

        this.physics.add.collider(this.ball, this.invisibleSquare,this.hitBrick,null,this);
        this.physics.add.collider(this.ballTwo, this.invisibleSquare,this.hitBrick,null,this);
        this.physics.add.collider(this.ball, this.invisibleSquareTwo,this.hitBrick,null,this);
        this.physics.add.collider(this.ballTwo, this.invisibleSquareTwo,this.hitBrick,null,this);

        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


        //     this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
            

        //     if (this.ball.getData('onPaddle'))
        //     {
        //         this.ball.x = this.paddle.x;
        //     }

        // }, this);

        // this.input.on('pointerup', function (pointer) {

        //     if (this.ball.getData('onPaddle'))
        //     {
        //         this.ball.setVelocity(-75, -300);
        //         this.ball.setData('onPaddle', false);
        //     }

        // }, this); 

        
       
    },



    

    hitBrick: function ()
    {   
       Phaser.Actions.Call(this.bricks.getChildren(),b =>b.visible ? b.visible = false : b.visible = true)
    },


    resetBall: function ()
    {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 750);
        this.ball.setData('onPaddle', true);
    },

    resetBallTwo: function(){
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddleTwo.x, 50);
        this.ball.setData('onPaddle', true);
    },

    resetLevel: function ()
    {
        this.resetBall();

        this.bricks.children.each(function (brick) {

            brick.enableBody(false, 0, 0, true, true);

        });
    },

    hitPaddle: function (ball, paddle)
    {
        var diff = 0;

        if (ball.x < paddle.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > paddle.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -paddle.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    },

    update: function ()
    {

        if(space.isDown){
            {
                this.ball.setVelocity(-75, -300);
                this.ballTwo.setVelocity(75, 300);
                this.ball.setData('onPaddle', false);
                this.ballTwo.setData('onPaddle', false);
                }

        }

        paddle.setVelocityX(0);
        paddleTwo.setVelocityX(0);

        if(left.isDown){
            paddle.setVelocityX(-400);
        }
        if(right.isDown){
            paddle.setVelocityX(400);
        }
        if(a.isDown){
            paddleTwo.setVelocityX(-400);
        }
        if(d.isDown){
            paddleTwo.setVelocityX(400);
        }
        
    
        var score1 = 0;
        var score2 = 0;
        

        if (this.ball.y > 800 || this.ballTwo.y > 800)
        {
            score1++;
            scoreText.setText("Score:" + score1 + "vs" + score2);
            
        }
        if (this.ball.y < 0 || this.ballTwo.y < 0)
        {
            score2++;
            scoreText.setText("Score:" + score1 + "vs" + score2);
            
    }

    }

});

var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 800,
    parent: 'phaser-example',
    scene: [ Breakout ],
    physics: {
        default: 'arcade'
    }
};

var game = new Phaser.Game(config);