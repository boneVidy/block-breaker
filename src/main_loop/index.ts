import {GameOpts } from './GameOpt.interface';
import {Ball, Paddle, Brick} from '../element';
import {Evbus} from '../util';
class Game {
    private loopId:any;
    static instance:Game = null;
    private fps = 1000;
    private lastRenderTime = 0;
    private speedX = 10;
    private speedY = 10;
    private canvasContext:CanvasRenderingContext2D;
    private canvasEle:HTMLCanvasElement;
    private ball:Ball;
    private paddle:Paddle;
    private bricks: Brick[][] = [];
    private brickRows = 6;
    private brickCols = 4;
    private brickWidth = 75;
    private brickHeight = 10;
    private brickPadding = 10;
    private bricksOffsetLeft = 30;
    private bircksOffsetTop = 10;
    private ballPos: {
        posX: number,
        posY: number
    } = {posX: 0, posY: 0};
    
    public static create (opt:GameOpts):Game {
        Game.instance = Game.instance || new Game(opt);
        return Game.instance;
    }
    private constructor (opts:GameOpts) {
        this.fps = opts.fps;
        this.canvasEle = opts.canvasEle;
        this.canvasContext = (opts.canvasEle).getContext("2d");
        this.ballPos.posX = this.canvasEle.width/ 2;
        this.ballPos.posY = this.canvasEle.height /2;
        this.ball = new Ball(this.canvasEle, 
            {width:10, height:10, ...this.ballPos})
        this.paddle = new Paddle(this.canvasEle,{
            width: 120,height:10,posX: (this.canvasEle.width - 120)/2,
            posY:this.canvasEle.height - 30
        });
        this.bricks = this.createBricks();
        Evbus.on('ballDash', (ev:any) => {
            this.speedY = -this.speedY;
        });
    }
    public gameId () {
        return this.loopId;
    }
    public exitGame() {
        window.cancelAnimationFrame(this.loopId);
        this.loopId = null;
        
    }
    // public start () {
    //     const now = window.performance.now();
    //     if (now - this.lastRenderTime >= this.getInterval()) {
            
    //         this.render();
    //         this.lastRenderTime = window.performance.now();
    //     }
       
    //     this.loopId = window.requestAnimationFrame(this.start.bind(this));
    // }
    public start () {
        this.render();
        this.loopId = setTimeout(() => {
            this.start();
        }, this.getInterval());
        // this.loopId = window.requestAnimationFrame(this.start.bind(this));
    }
    private getInterval ():number {
        return 1000/this.fps;
    }
    render () {
        this.cleanCanvas();
        this.drawPaddle();
        this.drawBall();
        this.drawBricks();
        
    }
    
    private drawBall () {
        this.updateBallPos();
        this.ball.draw(this.ballPos);
        Evbus.fire('ballMove',
            {width: this.ball.getRadius(),height: this.ball.getRadius(),...this.ballPos})

    }
    private updateBallPos () {
        this.wallBounceCheck();
        this.ballPos.posX -= this.speedX;
        this.ballPos.posY -= this.speedY;
    }
    private wallBounceCheck () {
        if (this.ballPos.posX - this.ball.getRadius()<= 0 || this.ballPos.posX >= this.canvasEle.width - this.ball.getRadius()) {
            this.speedX = -this.speedX;
        }
        if (this.ballPos.posY - this.ball.getRadius() <= 0 || this.ballPos.posY >= this.canvasEle.height- this.ball.getRadius()) {
            this.speedY = -this.speedY;
        }
    }
    private drawPaddle () {
        this.paddle.draw()
    }
    private drawBricks () {
       this.bricks.forEach(brickRow => brickRow.forEach(brick => brick.draw()));
    }
    private createBricks ():Brick[][] {
        const bricks:Brick[][] = [];
        
        for (let i = 0; i<= this.brickRows; i++) {
            bricks[i] = [];
            for (let j = 0; j<=this.brickCols; j++) {
                bricks[i][j] = this.createBrick(i, j);
            }
        }
        return bricks;
    }
    private createBrick (row:number, col:number,width = 75, height = 30):Brick {
        let posX = 0;
        let posY = 0;
        const {brickHeight,brickWidth, brickPadding, bricksOffsetLeft, bircksOffsetTop} = this;
        posX = col*(brickWidth + brickPadding) + bricksOffsetLeft;
        posY = row*(brickHeight + brickPadding) + bircksOffsetTop;
        return new Brick(this.canvasEle,{posX, posY, width:brickWidth, height:brickHeight});
    }
    private cleanCanvas () {
        const ctx = this.canvasContext;
        ctx.clearRect(0,0, this.canvasEle.width, this.canvasEle.height);
    }
 }
export default Game;