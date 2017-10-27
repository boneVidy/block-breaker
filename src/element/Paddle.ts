import {GameEle} from './GameEle';
import {GameELeOpt} from './GameELeOpt.interface';
import {Evbus,collisionDetection} from '../util';
export class Paddle extends GameEle {
    private readonly LEFT_KEY = 37;
    private readonly RIGHT_KEY = 39;
    private leftDown = false;
    private rightDown = false;
    private step = 10;
    constructor (canvas:HTMLCanvasElement,opt:GameELeOpt) {
        super(canvas,opt);
        const self = this;
        window.addEventListener('keydown',
            function (ev:KeyboardEvent) {
                switch (ev.keyCode) {
                    case self.LEFT_KEY:
                        
                        self.moveLeft();
                        break;
                    case self.RIGHT_KEY:
                        self.moveRight();
                        break;
                }
            }
        );
        window.addEventListener('keyup',
            function (ev:KeyboardEvent) {
                switch (ev.keyCode) {
                    case self.LEFT_KEY:
                        self.leftDown = false;
                        break;
                    case self.RIGHT_KEY:
                        self.rightDown = false;
                        break;
                }
            }
        );
        Evbus.on('ballMove', (ballPos:GameELeOpt) => {
            const dashResult = collisionDetection(ballPos, this.boundRect);
            if (dashResult.yDash && dashResult.xDash) {
                Evbus.fire('ballDash');
            }
        });
    }
    private moveLeft () {
        this.leftDown = true;
    }
    private moveRight () {
        this.rightDown = true;
        //this.boundRect.posX -=10;
    }
    public draw (pos?: {posX:number, posY:number}) {
        const ctx = this.canvas.getContext('2d');
        if (pos) {
            this.boundRect = {...this.boundRect, ...pos}; 
        }
        
        this.update();
        ctx.beginPath();
        ctx.rect(this.boundRect.posX, this.boundRect.posY, this.boundRect.width, this.boundRect.height);
        //console.log(pos);
        ctx.fillStyle = "#0095dd";
        ctx.fill();
        ctx.closePath();
    }
    private update () {
        if (this.leftDown) {
            this.boundRect.posX -= this.step;
            this.boundRect.posX = Math.max(0, this.boundRect.posX);
        } else if (this.rightDown) {
            this.boundRect.posX += this.step;
            this.boundRect.posX = Math.min(this.boundRect.posX, this.canvas.width - this.boundRect.width);
        }
    }
}