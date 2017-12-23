export declare enum Player {
    Human = "Human",
    Machine = "Machine",
}
export interface Turn {
    player: Player;
    tokensRemoved: number;
}
export interface Round {
    turns: Turn[];
    heapSize: number;
    winner: Player | null;
    isFinished: boolean;
}
export declare class NimGame {
    private heapSize;
    private startingPlayer;
    private started;
    private winner;
    constructor(heapSize: number, startingPlayer: Player);
    getMaxTokensToRemove(): number;
    start(): Round;
    playRound(tokensToRemove: number): Round;
    private playHumanTurn(tokensToRemove);
    private playMachineTurn();
    private playTurn(player, tokensToRemove);
    private removeTokensFromHeap(tokensToRemove);
    private readonly isFinished;
    private isValidTurn(tokensToRemove);
    private toRound(turns);
    private getRandomTurn();
}
