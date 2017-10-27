interface ele {
    posX:number; posY:number; width:number; height:number
}
export const collisionDetection = function (moveEle:ele, targetEle:ele):{xDash: boolean, yDash:boolean} {
    let result = {
        xDash: false,
        yDash: false
    };
    if ((moveEle.posX >= targetEle.posX && 
        moveEle.posX <= targetEle.posX + targetEle.width) ||
        (moveEle.posX + moveEle.width >= targetEle.posX && moveEle.posX  + moveEle.width<= targetEle.posX + targetEle.width)
    ) {
        result.xDash = true;
    }
    if (moveEle.posY >= targetEle.posY &&
        moveEle.posY<= targetEle.posY + targetEle.height ||
        (moveEle.posY + moveEle.height >= targetEle.posY && moveEle.posY  + moveEle.height<= targetEle.posY + targetEle.height)) {
            result.yDash = true;
        }
    return result;
}