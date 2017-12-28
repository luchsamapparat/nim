import { GameConfig, GameState } from './nim.model';
export declare class NimGame {
    private gameState;
    constructor(config: GameConfig);
    start(): GameState;
    playRound(tokensToRemove: number): GameState;
    private playHumanTurn(gameState, tokensToRemove);
    private playMachineTurn(gameState);
    private playTurn(gameState, player, tokensToRemove);
    private getInitialGameState(config);
}
