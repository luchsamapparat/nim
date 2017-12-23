import { NimGame, Player, Round } from '../index';

const heapSize = 17;
const minTokensToRemove = 1;
const maxTokensToRemove = 3;

describe('NimGame', () => {

    test('the initial heap size is configurable', () => {
        const nimGame = new NimGame(heapSize, Player.Human);
        const round = nimGame.start();

        expect(round.heapSize).toBe(heapSize);
    });

    test('the game has to be started before playing rounds', () => {
        const nimGameWithMachineStarting = new NimGame(heapSize, Player.Machine);
        const nimGameWithHumanStarting = new NimGame(heapSize, Player.Machine);

        expect(() => nimGameWithMachineStarting.playRound(minTokensToRemove)).toThrowError();
        expect(() => nimGameWithHumanStarting.playRound(minTokensToRemove)).toThrowError();
    });

    test('a player must remove at least one token', () => {
        const nimGame = new NimGame(heapSize, Player.Human);
        const round = nimGame.start();

        expect(() => nimGame.playRound(0)).toThrowError();
    });

    test('a player must remove at the maximum three tokens', () => {
        const nimGame = new NimGame(heapSize, Player.Human);
        const round = nimGame.start();

        expect(() => nimGame.playRound(4)).toThrowError();
    });

    test('a player can remove between one and three tokens', () => {
        [1, 2, 3].forEach(tokensToRemove => {
            const nimGame = new NimGame(heapSize, Player.Human);
            nimGame.start();

            let round: Round;

            expect(() => {
                round = nimGame.playRound(tokensToRemove);
            }).not.toThrowError();

            const humanTurn = round.turns[0];
            expect(humanTurn.tokensRemoved).toBe(tokensToRemove);

            const machineTurn = round.turns[1];
            expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(minTokensToRemove);
            expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(maxTokensToRemove);
        });
    });

    test('the machine plays the first turn automatically when the game starts and it is the starting player', () => {
        const nimGame = new NimGame(heapSize, Player.Machine);
        const round = nimGame.start();

        expect(round.heapSize).toBeLessThan(heapSize);
        expect(round.heapSize).toBeGreaterThanOrEqual(heapSize - maxTokensToRemove);
        expect(round.turns).toHaveLength(1);

        const machineTurn = round.turns[0];
        expect(machineTurn.player).toBe(Player.Machine);
        expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(minTokensToRemove);
        expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(maxTokensToRemove);
    });

    test('the machine plays its turn automatically after its opponents turn', () => {
        const tokensToRemove = minTokensToRemove;
        const nimGame = new NimGame(heapSize, Player.Human);
        nimGame.start();

        const round = nimGame.playRound(tokensToRemove);

        const humanTurn = round.turns[0];
        expect(humanTurn.player).toBe(Player.Human);

        const machineTurn = round.turns[1];
        expect(machineTurn.player).toBe(Player.Machine);

        expect(round.heapSize).toBeLessThan(heapSize - tokensToRemove);
    });

    describe('amount of tokens allowed to be removed', () => {
        test('initially the amount of tokens allowed to be removed is the maximum amount of tokens to be removed', () => {
            const nimGame = new NimGame(heapSize, Player.Human);
            nimGame.start();

            expect(nimGame.getMaxTokensToRemove()).toBe(maxTokensToRemove);
        });

        test('the amount of tokens allowed to be removed may not exceed the current heap size', () => {
            const nimGame = new NimGame(heapSize, Player.Human);
            nimGame.start();

            playGame(
                nimGame,
                round => {
                    expect(nimGame.getMaxTokensToRemove()).toBeGreaterThan(minTokensToRemove);
                    expect(nimGame.getMaxTokensToRemove()).toBeLessThanOrEqual(maxTokensToRemove);
                    expect(nimGame.getMaxTokensToRemove()).toBeLessThanOrEqual(round.heapSize);
                }
            );
        });
    });

    describe('game ending', () => {
        let nimGame: NimGame;
        let lastRound: Round;

        beforeEach(() => {
            nimGame = new NimGame(heapSize, Player.Human);
            nimGame.start();
            lastRound = playGame(nimGame);
        });

        test('the game ends when the heap size is 0', () => {
            expect(lastRound.heapSize).toBe(0);
            expect(lastRound.isFinished).toBe(true);
        });

        test('the last round declares a winner', () => {
            expect(lastRound.winner).not.toBeNull();
            expect([Player.Machine, Player.Human]).toContain(lastRound.winner);
        });

        test('it is not possible to play another round after the game has finished', () => {
            expect(() => nimGame.playRound(minTokensToRemove)).toThrowError();
        });
    });

});

function playGame(nimGame: NimGame, expectForEachRound: (round: Round) => void = () => undefined): Round {
    const round = nimGame.playRound(minTokensToRemove);

    expectForEachRound(round);

    return round.isFinished ? round : playGame(nimGame);
}
