var value_x = Phaser.Math.Between(200, 600);
var value_y = Phaser.Math.Between(200, 600);


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
        /* this.bricks = this.physics.add.staticGroup({
            key: 'psyBrick1',
            frameQuantity: 50,
            gridAlign: { width: 10, height: 5, cellWidth: 64, cellHeight: 32, x: config.width/7, y: config.height/2.5 },
            visible: true
        }) */
        this.bricks = this.physics.add.staticImage(value_x,value_y,'psyBrick2')
        this.bricks.visible = true;
        this.bricksTwo = this.physics.add.staticImage(value_x + 100,value_y + 100,'psyBrick2')
        this.bricksTwo.visible = true;
        this.bricksThree = this.physics.add.staticImage(value_x + 500,value_y+232,'psyBrick2')
        this.bricksThree.visible = true;
        this.bricksFour = this.physics.add.staticImage(value_x +232,value_y-33,'psyBrick2')
        this.bricksFour.visible = true;
        this.bricksFive = this.physics.add.staticImage(value_x + 12,value_y-63,'psyBrick2')
        this.bricksFive.visible = true;
        this.bricksSix = this.physics.add.staticImage(value_x -98,value_y+200,'psyBrick2')
        this.bricksSix.visible = true;



        

        


        scoreText = this.add.text(40,40, "SCORE: 0 vs 0",{ fontSize: '32px', fill: 'white' });



        this.ball = this.physics.add.image(400, 740, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.ball.setData('onPaddle', true);

        this.paddle = this.physics.add.image(400, 780, 'paddle1').setImmovable();


        this.ballTwo = this.physics.add.image(400, 60, 'assets', 'ball1').setCollideWorldBounds(true).setBounce(1);
        this.ballTwo.setData('onPaddle', true);
        this.paddleTwo = this.physics.add.image(400, 20, 'paddle2').setImmovable();

        //  Our colliders

        this.physics.add.collider(this.ballTwo, this.bricks, null, null, this);
        this.physics.add.collider(this.ballTwo, this.paddleTwo, this.hitPaddle, null, this);
        this.physics.add.collider(this.ball, this.paddleTwo, this.hitPaddle, null, this);

        this.physics.add.collider(this.ball, this.bricks, null, null, this);
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
        this.physics.add.collider(this.ballTwo, this.paddle, this.hitPaddle, null, this);

        this.physics.add.collider(this.ball, this.invisibleSquare,this.hitBrick,null,this);
        this.physics.add.collider(this.ballTwo, this.invisibleSquare,this.hitBrick,null,this);
        this.physics.add.collider(this.ball, this.invisibleSquareTwo,this.hitBrick,null,this);
        this.physics.add.collider(this.ballTwo, this.invisibleSquareTwo,this.hitBrick,null,this);

        left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);




        
       
    },



    

    hitBrick: function (bricks)
    {   
       //Phaser.Actions.Call(this.bricks.getChildren(),b =>b.visible ? b.visible = false : b.visible = true);
       if(this.bricks.visible = true){
           this.bricks.visible=false
       }else{
           this.bricks.visible=true;
       }
       if(this.bricksTwo.visible = true){
        this.bricksTwo.visible=false
    }else{
        this.bricksTwo.visible=true;
    }
    if(this.bricksThree.visible = true){
        this.bricksThree.visible=false
    }else{
        this.bricksThree.visible=true;
    }
    if(this.bricksFour.visible = true){
        this.bricksFour.visible=false
    }else{
        this.bricksFour.visible=true;
    }
    if(this.bricksFive.visible = true){
        this.bricksFive.visible=false
    }else{
        this.bricksFive.visible=true;
    }
    },


    resetBall: function ()
    {
        this.ball.setVelocity(0);
        this.ball.setPosition(this.paddle.x, 740);
        this.ball.setData('onPaddle', true);
    },

    resetBallTwo: function(){
        this.ballTwo.setVelocity(0);
        this.ballTwo.setPosition(this.paddleTwo.x, 60);
        this.ballTwo.setData('onPaddle', true);
    },

    resetLevel: function ()
    {
        this.resetBall();
        this.resetBallTwo();

        this.bricks.children.each(function (brick) {

            brick.enableBody(false, 0, 0, true, true);

        });
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

        this.paddle.setVelocityX(0);
        this.paddleTwo.setVelocityX(0);

        if(left.isDown){
            this.paddle.setVelocityX(-400);
        }
        if(right.isDown){
            this.paddle.setVelocityX(400);
        }
        if(a.isDown){
            this.paddleTwo.setVelocityX(-400);
        }
        if(d.isDown){
            this.paddleTwo.setVelocityX(400);
        }
        
    
        var score1 = 0;
        var score2 = 0;
        

        if (this.ball.y > 800 || this.ballTwo.y > 800)
        {
            score1++;
            scoreText.setText("Score:" + score1 + "vs" + score2);
            this.resetBall();
            
        }
        if (this.ball.y < 0 || this.ballTwo.y < 0)
        {
            score2++;
            scoreText.setText("Score:" + score1 + "vs" + score2);
            this.resetBallTwo();
            
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