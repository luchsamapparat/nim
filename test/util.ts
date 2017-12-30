import { flow, negate, random } from 'lodash';
import { GameConfig, GameState, Player, StrategyFactory, isFinished, playRound } from '../index';
import { GameFn } from '../src/lib/game';
import { when } from '../src/lib/util';

export const playGame = (): GameFn => {
    return gameState => flow(
        playRound(gameState.minTokensAllowedToRemove),
        when(negate(isFinished()), playGame())
    )(gameState);
};

export const getMockStrategy: StrategyFactory = () => ({
    name: 'mockStrategy',
    getNextTurn: jest.fn(
        (gameState: GameState) => random(gameState.minTokensAllowedToRemove, gameState.maxTokensAllowedToRemove)
    )
});

export const getMockConfig: () => GameConfig = () => ({
    heapSize: 13,
    minTokensToRemove: 1,
    maxTokensToRemove: 3,
    startingPlayer: Player.Human,
    strategy: getMockStrategy()
});

export const getMockState: () => GameState = () => {
    const gameConfig = getMockConfig();

    return {
        heapSize: gameConfig.heapSize,
        minTokensAllowedToRemove: gameConfig.minTokensToRemove,
        maxTokensAllowedToRemove: gameConfig.maxTokensToRemove,
        turns: [],
        winner: null,
        config: gameConfig
    };
};
