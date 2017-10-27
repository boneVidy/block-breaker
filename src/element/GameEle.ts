import {GameELeOpt} from './GameELeOpt.interface';
export abstract class GameEle {
    protected boundRect:GameELeOpt;
    protected canvas:HTMLCanvasElement;
    constructor (canvas:HTMLCanvasElement,opt:GameELeOpt) {
        this.canvas = canvas;
        this.boundRect = opt;
    }
    
    abstract draw (opt?:any):void
}