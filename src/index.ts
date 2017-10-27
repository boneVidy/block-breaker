import Game from './main_loop';
const game = Game.create({fps:30, canvasEle: document.getElementById('gameContext') as HTMLCanvasElement});
console.log(Game, '你好啊 ');
game.start();

//setTimeout(game.exitGame.bind(game), 4000);

