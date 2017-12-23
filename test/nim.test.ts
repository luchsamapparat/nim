import { AlwaysOneStrategy, NimGame, Player, RandomStrategy, Round } from '../index';
import { HEAP_SIZE, MAX_TOKENS_TO_REMOVE, MIN_TOKENS_TO_REMOVE, playGame } from './test-util';

const strategies = [
    RandomStrategy,
    AlwaysOneStrategy
];

strategies.forEach(Strategy => {

    describe(`NimGame with ${Strategy.name}`, () => {
        const strategy = new Strategy();

        test('the initial heap size is configurable', () => {
            const nimGame = new NimGame(HEAP_SIZE, Player.Human, strategy);
            const round = nimGame.start();

            expect(round.heapSize).toBe(HEAP_SIZE);
        });

        test('the game has to be started before playing rounds', () => {
            const nimGameWithMachineStarting = new NimGame(HEAP_SIZE, Player.Machine, strategy);
            const nimGameWithHumanStarting = new NimGame(HEAP_SIZE, Player.Machine, strategy);

            expect(() => nimGameWithMachineStarting.playRound(MIN_TOKENS_TO_REMOVE)).toThrowError();
            expect(() => nimGameWithHumanStarting.playRound(MIN_TOKENS_TO_REMOVE)).toThrowError();
        });

        test('a player must remove at least one token', () => {
            const nimGame = new NimGame(HEAP_SIZE, Player.Human, strategy);
            const round = nimGame.start();

            expect(() => nimGame.playRound(0)).toThrowError();
        });

        test('a player must remove at the maximum three tokens', () => {
            const nimGame = new NimGame(HEAP_SIZE, Player.Human, strategy);
            const round = nimGame.start();

            expect(() => nimGame.playRound(4)).toThrowError();
        });

        test('a player can remove between one and three tokens', () => {
            [1, 2, 3].forEach(tokensToRemove => {
                const nimGame = new NimGame(HEAP_SIZE, Player.Human, strategy);
                nimGame.start();

                let round: Round;

                expect(() => {
                    round = nimGame.playRound(tokensToRemove);
                }).not.toThrowError();

                const humanTurn = round.turns[0];
                expect(humanTurn.tokensRemoved).toBe(tokensToRemove);

                const machineTurn = round.turns[1];
                expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(MIN_TOKENS_TO_REMOVE);
                expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(MAX_TOKENS_TO_REMOVE);
            });
        });

        test('the machine plays the first turn automatically when the game starts and it is the starting player', () => {
            const nimGame = new NimGame(HEAP_SIZE, Player.Machine, strategy);
            const round = nimGame.start();

            expect(round.heapSize).toBeLessThan(HEAP_SIZE);
            expect(round.heapSize).toBeGreaterThanOrEqual(HEAP_SIZE - MAX_TOKENS_TO_REMOVE);
            expect(round.turns).toHaveLength(1);

            const machineTurn = round.turns[0];
            expect(machineTurn.player).toBe(Player.Machine);
            expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(MIN_TOKENS_TO_REMOVE);
            expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(MAX_TOKENS_TO_REMOVE);
        });

        test('the machine plays its turn automatically after its opponents turn', () => {
            const tokensToRemove = MIN_TOKENS_TO_REMOVE;
            const nimGame = new NimGame(HEAP_SIZE, Player.Human, strategy);
            nimGame.start();

            const round = nimGame.playRound(tokensToRemove);

            const humanTurn = round.turns[0];
            expect(humanTurn.player).toBe(Player.Human);

            const machineTurn = round.turns[1];
            expect(machineTurn.player).toBe(Player.Machine);

            expect(round.heapSize).toBeLessThan(HEAP_SIZE - tokensToRemove);
        });

        describe('game ending', () => {
            let nimGame: NimGame;
            let lastRound: Round;

            beforeEach(() => {
                nimGame = new NimGame(HEAP_SIZE, Player.Human, strategy);
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
                expect(() => nimGame.playRound(MIN_TOKENS_TO_REMOVE)).toThrowError();
            });
        });

    });

});
