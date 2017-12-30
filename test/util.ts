import { flow, negate, random } from 'lodash';
import { GameConfig, GameState, Player, Strategy, StrategyName, isFinished, playRound } from '../index';
import { applyDefaultConfig } from '../src/lib/config';
import { GameFn } from '../src/lib/game';
import { when } from '../src/lib/util';

export const playGame = (): GameFn => {
    return gameState => flow(
        playRound(gameState.minTokensAllowedToRemove),
        when(negate(isFinished()), playGame())
    )(gameState);
};

export const mockStrategyName = 'mockStrategy';

export const getMockStrategy: () => Strategy = () => {
    return jest.fn(
        (gameState: GameState) => random(gameState.minTokensAllowedToRemove, gameState.maxTokensAllowedToRemove)
    );
};

export const getPartialMockConfig: () => Partial<GameConfig> = () => ({
    strategy: StrategyName.RandomStrategy
});

export const getMockConfig: () => GameConfig = () => applyDefaultConfig()({
    strategy: StrategyName.RandomStrategy
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
