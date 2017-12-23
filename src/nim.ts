import { RandomStrategy, Strategy } from './strategy';
import { getMaxTokensToRemove } from './util';

export enum Player {
    Human = 'Human',
    Machine = 'Machine'
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

export class NimGame {

    private started = false;
    private winner: Player = null;

    constructor(
        private heapSize: number,
        private startingPlayer: Player,
        private strategy: Strategy = new RandomStrategy()
    ) {}

    public start() {
        const turns = (this.startingPlayer === Player.Human) ? [] : [this.playMachineTurn()];
        this.started = true;
        return this.toRound(turns);
    }

    public playRound(tokensToRemove: number): Round {
        if (!this.started) {
            throw new Error(`You must start the game first.`);
        }

        if (!this.isValidTurn(tokensToRemove)) {
            throw new Error(`You may remove between 1 to ${getMaxTokensToRemove(this.heapSize)} tokens from the heap.`);
        }

        const turns = [
            ...(this.isFinished ? [] : [this.playHumanTurn(tokensToRemove)]),
            ...(this.isFinished ? [] : [this.playMachineTurn()])
        ];

        return this.toRound(turns);
    }

    private playHumanTurn(tokensToRemove: number) {
        return this.playTurn(Player.Human, tokensToRemove);
    }

    private playMachineTurn() {
        return this.playTurn(Player.Machine, this.strategy.getNextTurn(this.heapSize));
    }

    private playTurn(player: Player, tokensToRemove: number): Turn {
        this.removeTokensFromHeap(tokensToRemove);

        if (this.isFinished) {
            this.winner = (player === Player.Machine) ? Player.Human : Player.Machine;
        }

        return {
            player,
            tokensRemoved: tokensToRemove
        };
    }

    private removeTokensFromHeap(tokensToRemove: number) {
        this.heapSize = this.heapSize - tokensToRemove;
    }

    private get isFinished() {
        return (this.heapSize === 0);
    }

    private isValidTurn(tokensToRemove: number) {
        return (
            tokensToRemove > 0 &&
            tokensToRemove <= getMaxTokensToRemove(this.heapSize)
        );
    }

    private toRound(turns: Turn[]): Round {
        return {
            turns,
            heapSize: this.heapSize,
            isFinished: this.isFinished,
            winner: this.winner
        };
    }

}
