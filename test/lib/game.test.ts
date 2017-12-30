import { first, range } from 'lodash';
import { GameState, Player, Strategy, strategies } from '../../index';
import { playHumanTurn, playMachineTurn } from '../../src/lib/game';
import { getMockState, getMockStrategy, mockStrategyName } from '../util';

const initialState = getMockState();

describe('playHumanTurn', () => {
    test('it throws an error if less than the minimum number of tokens are given to be removed', () => {
        const tooLowNumberOfTokensToRemove = initialState.minTokensAllowedToRemove - 1;

        expect(() => playHumanTurn(tooLowNumberOfTokensToRemove)(initialState)).toThrowError();
    });

    test('it throws an error if more than the maximum number of tokens are given to be removed', () => {
        const tooHighNumberOfTokensToRemove = initialState.maxTokensAllowedToRemove + 1;

        expect(() => playHumanTurn(tooHighNumberOfTokensToRemove)(initialState)).toThrowError();
    });

    test('it removes any valid number of tokens from the heap', () => {
        range(
            initialState.minTokensAllowedToRemove,
            initialState.maxTokensAllowedToRemove
        )
            .forEach(tokensToRemove => {
                const state = playHumanTurn(tokensToRemove)(initialState);
                const humanTurn = first(state.turns);

                expect(state.heapSize).toBe(initialState.heapSize - tokensToRemove);
                expect(humanTurn.player).toBe(Player.Human);
                expect(humanTurn.tokensRemoved).toBe(tokensToRemove);
            });
    });
});

describe('playMachineTurn', () => {
    const mockStrategy: jest.SpyInstance = (<any> getMockStrategy());
    let stateWithMockStrategy: GameState;

    beforeAll(() => {
        strategies[mockStrategyName] = mockStrategy;
    });

    afterAll(() => {
        delete strategies[mockStrategyName];
    });

    beforeEach(() => {
        mockStrategy.mockClear();
        stateWithMockStrategy = {
            ...initialState,
            config: {
                ...initialState.config,
                strategy: (<any> mockStrategyName)
            }
        };
    });

    test('it throws an error if less than the minimum number of tokens are given to be removed', () => {
        const tooLowNumberOfTokensToRemove = stateWithMockStrategy.minTokensAllowedToRemove - 1;

        expect(() => playHumanTurn(tooLowNumberOfTokensToRemove)(stateWithMockStrategy)).toThrowError();
    });

    test('it throws an error if more than the maximum number of tokens are given to be removed', () => {
        const tooHighNumberOfTokensToRemove = stateWithMockStrategy.maxTokensAllowedToRemove + 1;

        expect(() => playHumanTurn(tooHighNumberOfTokensToRemove)(stateWithMockStrategy)).toThrowError();
    });

    test('it removes a valid number of tokens from the heap', () => {
        const state = playMachineTurn()(stateWithMockStrategy);
        const machineTurn = first(state.turns);

        expect(state.heapSize).toBeLessThan(stateWithMockStrategy.heapSize);
        expect(machineTurn.player).toBe(Player.Machine);
        expect(machineTurn.tokensRemoved).toBeGreaterThanOrEqual(stateWithMockStrategy.minTokensAllowedToRemove);
        expect(machineTurn.tokensRemoved).toBeLessThanOrEqual(stateWithMockStrategy.maxTokensAllowedToRemove);
    });

    test('it uses the configured strategy to determine the number of tokens to remove', () => {
        const state = playMachineTurn()(stateWithMockStrategy);

        expect(mockStrategy).toHaveBeenLastCalledWith(stateWithMockStrategy);
    });
});
