import {GameEle} from './GameEle';
import {GameELeOpt} from './GameELeOpt.interface';
import {Evbus, collisionDetection} from '../util';
//import {BallOpt} from './BallEleOpt.interface';
export class Brick extends GameEle {
    private isDie = false;
    constructor (canvas:HTMLCanvasElement,opt:GameELeOpt) {
        super(canvas,opt);
        Evbus.on('ballMove', (ballPos:GameELeOpt) => {
            if (this.isDie) {
                return;
            }
            const dashResult = collisionDetection(ballPos, this.boundRect);
            // if (dashResult.xDash) {
                
                
            // }
            // if (dashResult.yDash) {
            //     //Evbus.fire('ballDash', 'y');
                
            // }
            if (dashResult.yDash && dashResult.xDash) {
                this.isDie = true;
                Evbus.fire('ballDash');
            }
        });
    }
    public draw () {
        if (this.isDie) {
            return;
        }
        const ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.rect(this.boundRect.posX,this.boundRect.posY,this.boundRect.width,this.boundRect.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        //return this.boundRect;
    }
    
   
}