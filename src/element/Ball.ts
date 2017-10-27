import {GameEle} from './GameEle';
import {BallOpt} from './BallEleOpt.interface';
export class Ball extends GameEle {
    
    
    public draw (opt?:{posX:number,posY:number}) {
        const ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        this.boundRect.posX = opt.posX;
        this.boundRect.posY = opt.posY;
        ctx.arc(opt.posX, opt.posY, this.boundRect.width,0, Math.PI*2);
        ctx.fillStyle = "#00f5dd";
        ctx.fill();
        ctx.closePath();
        //return this.boundRect;
    }
    
    public getRadius ():number {
        return this.boundRect.width;
    }
}