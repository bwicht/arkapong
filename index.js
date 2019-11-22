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
    },

    preload: function ()
    {
        this.load.atlas('assets', 'breakout/breakout.png', 'breakout/breakout.json');
    },

    create: function ()
    {

        this.invisibleSquare = this.physics.add.staticImage(15,config.width/2,'assets','blue1');
        this.invisibleSquare.visible=true;
        this.invisibleSquare.angle = 90;
        this.invisibleSquareTwo = this.physics.add.staticImage(785,config.width/2,'assets','blue1');
        this.invisibleSquareTwo.angle = 90;
        this.invisibleSquareTwo.visible=true;


        //  Enable world bounds, but disable the floor
        this.physics.world.setBoundsCollision(true, true, false, false);

        //  Create the bricks in a 10x6 grid
        this.bricks = this.physics.add.staticGroup({
            key: 'assets', frame: ['red1'],
            frameQuantity: 50,
            gridAlign: { width: 10, height: 5, cellWidth: 64, cellHeight: 32, x: config.width/7, y: config.height/2.5 },
            visible: true
        })
        

        


        scoreText = this.add.text(40,40, "SCORE: 0 vs 0",{ fontSize: '32px', fill: 'white' });



        this.ball = this.physics.add.image(400, 780, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true);

        this.paddle = this.physics.add.image(400, 780, 'assets', 'paddle1').setImmovable();


        this.ballTwo = this.physics.add.image(400, 20, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.ballTwo.setData('onPaddle', true);
        this.paddleTwo = this.physics.add.image(400, 20,'assets', 'paddle1').setImmovable();

        //  Our colliders

        this.physics.add.collider(this.ballTwo, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ballTwo, this.paddleTwo, this.hitPaddle, null, this);

        this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

        this.physics.add.collider(this.ball,this.invisibleSquare,this.hitBrick,null,this);
        this.physics.add.collider(this.ball,this.invisibleSquareTwo,this.hitBrick,null,this);

        // if(isRightKeyPressed){
        //     paddle.setVelocityX(100)
        // }
        // if (isLeftKeyPressed){
        //     paddle.setVelocityX(-100)
        // }

        // if(isAKeyPressed){
        //     paddleTwo.setVelocityX(-100)
        // }
        // if(isDKeyPressed){
        //     paddleTwo.set.setVelocityX(100)
        // }

        this.input.on('pointermove', function (pointer) {

            //  Keep the paddle within the game
            this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);
            

            if (this.ball.getData('onPaddle'))
            {
                this.ball.x = this.paddle.x;
            }

        }, this);

        this.input.on('pointerup', function (pointer) {

            if (this.ball.getData('onPaddle'))
            {
                this.ball.setVelocity(-75, -300);
                this.ball.setData('onPaddle', false);
            }

        }, this); 
       
    },

    

    hitBrick: function (ball, invisibleSquare,invisibleSquareTwo)
    {
        this.invisibleSquare.visible = false;
        this.invisibleSquareTwo.visible = false;
        this.bricks.visible = false;
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
        // var isDKeyPressed = cursorKeys.D.isDown;
        // var isAKeyPressed = cursorKeys.A.isDown;
        // var isLeftKeyPressed = cursorKeys.left.isDown;
        // var isRightKeyPressed = cursorKeys.right.isDown;

// if(this.cursorKeys.A.isDown){
//     paddle.setVelocityX(-100)
// }
        // if(isRightKeyPressed===true){
        //     paddle.setVelocityX(100)
        // }
        // if (isLeftKeyPressed===true){
        //     paddle.setVelocityX(-100)
        // }

        // if(isAKeyPressed==true){
        //     paddleTwo.setVelocityX(-100)
        // }
        // if(isDKeyPressed==true){
        //     paddleTwo.set.setVelocityX(100)
        // }

        var score1 = 0;
        var score2 = 0;
        

        if (this.ball.y > 800 || this.ballTwo.y > 800)
        {
            score1 += 1;
            scoreText.setText("Score:" + score1 + "vs" + score2);
            this.resetBall();
        }
        if (this.ball.y < 0 || this.ballTwo.y < 0)
        {
            score2 += 1;
            scoreText.setText("Score:" + score1 + "vs" + score2);
            this.resetBall();
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