const { GameState, Player, playRound, remainderStrategy, startGame } = require('./dist/index');

const gameState = startGame({
    heapSize: 13,
    minTokensToRemove: 1,
    maxTokensToRemove: 3,
    startingPlayer: Player.Human,
    strategy: remainderStrategy()
});

console.log(gameState);

const updatedGameState = playRound(2)(gameState);

console.log(updatedGameState);
