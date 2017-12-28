import { flow, inRange, negate, partial } from 'lodash';
import { Game, GameConfig, GameState, PlayNextRound, Player, Turn } from './nim.model';

type GameFn = (gameState: GameState) => GameState;
type GamePredicate = (gameState: GameState) => boolean;

export function startGame(config: GameConfig): Game {
    return flow(
        getStateFromConfig(),
        when(isStartingPlayer(Player.Machine), playMachineTurn()),
        toGame()
    )(config);
}

function playRound(gameState: GameState, tokensToRemove: number): Game {
    return flow(
        playHumanTurn(tokensToRemove),
        when(negate(isFinished()), playMachineTurn()),
        toGame()
    )(gameState);
}

function getPlayNextRound(gameState: GameState): PlayNextRound | null {
    return isFinished()(gameState) ? null : partial(playRound, gameState);
}

function toGame(): (gameState: GameState) => Game {
    return gameState => ({
        state: gameState,
        playNextRound: getPlayNextRound(gameState)
    });
}

function getStateFromConfig(): (gameConfig: GameConfig) => GameState {
    return (gameConfig: GameConfig) => ({
        heapSize: gameConfig.heapSize,
        minTokensAllowedToRemove: gameConfig.minTokensToRemove,
        maxTokensAllowedToRemove: gameConfig.maxTokensToRemove,
        turns: [],
        winner: null,
        config: gameConfig
    });
}


function playHumanTurn(tokensToRemove: number): GameFn {
    return playTurn(
        Player.Human,
        tokensToRemove
    );
}

function playMachineTurn(): GameFn {
    return gameState => {
        return playTurn(Player.Machine, getNextTurn(gameState))(gameState);
    };
}

function getNextTurn(gameState: GameState): number {
    return gameState.config.strategy.getNextTurn(gameState);
}

function playTurn(player: Player, tokensToRemove: number): GameFn {
    return flow(
        abortIf(
            isInvalidTurn(tokensToRemove),
            ({minTokensAllowedToRemove, maxTokensAllowedToRemove }) => `You may remove between ${minTokensAllowedToRemove} and ${maxTokensAllowedToRemove} tokens from the heap.`
        ),
        updateHeapSize(tokensToRemove),
        updateMaxTokensAllowedToRemove(),
        addTurn(player, tokensToRemove),
        when(isFinished(), updateWinner(player))
    );
}

function addTurn(player: Player, tokensRemoved: number): GameFn {
    return gameState => ({
        ...gameState,
        turns: [
            ...gameState.turns,
            toTurn(player, tokensRemoved)
        ]
    });
}

function toTurn(player: Player, tokensRemoved: number): Turn {
    return {
        player,
        tokensRemoved
    };
}

function updateHeapSize(tokensToRemove: number): GameFn {
    return gameState => ({
            ...gameState,
            heapSize: gameState.heapSize - tokensToRemove
    });
}

function updateMaxTokensAllowedToRemove(): GameFn {
    return gameState => ({
        ...gameState,
        maxTokensAllowedToRemove: Math.min(gameState.config.maxTokensToRemove, gameState.heapSize)
    });
}

function updateWinner(winner: Player): GameFn {
    return gameState => ({
        ...gameState,
        winner
    });
}

function isInvalidTurn(tokensToRemove: number): GamePredicate {
    return ({ minTokensAllowedToRemove, maxTokensAllowedToRemove }) => !inRange(tokensToRemove, minTokensAllowedToRemove, maxTokensAllowedToRemove + 1);
}

function isStartingPlayer(player: Player): GamePredicate {
    return ({ config }) => (config.startingPlayer === player);
}

function isFinished(): GamePredicate {
    return ({ heapSize }) => (heapSize === 0);
}

function abortIf(predicate: GamePredicate, errorMessageFn: (gameState: GameState) => string): GameFn {
    return gameState => {
        if (predicate(gameState)) {
            throw new Error(errorMessageFn(gameState));
        }

        return gameState;
    };
}

function when(predicate: GamePredicate, whenTrueFn: GameFn): GameFn {
    return gameState => predicate(gameState) ? whenTrueFn(gameState) : gameState;
}
