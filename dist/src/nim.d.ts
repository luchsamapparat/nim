import { Strategy } from './strategy';
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
    private strategy;
    private started;
    private winner;
    constructor(heapSize: number, startingPlayer: Player, strategy?: Strategy);
    start(): Round;
    playRound(tokensToRemove: number): Round;
    private playHumanTurn(tokensToRemove);
    private playMachineTurn(humanTurn?);
    private playTurn(player, tokensToRemove);
    private removeTokensFromHeap(tokensToRemove);
    private readonly isFinished;
    private isValidTurn(tokensToRemove);
    private toRound(turns);
}
