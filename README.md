# Nim game library

[![Build Status](https://travis-ci.org/luchsamapparat/nim.svg?branch=master)](https://travis-ci.org/luchsamapparat/nim)

## Install

```
npm install @luchsamapparat/nim
```

## Develop, build and test

Install dependcies first via `npm install`. Then...

* `npm run build` Clean the `dist` directory, run TSLint and build the library
* `npm run watch` Clean the `dist` directory, build and test the library in parallel and repeat on file change
* `npm test` Run tests

## Use

### Basic Usage

```ts
import { NimGame, Player, remainderStrategy } from '@luchsamapparat/nim';

const nimGame = new NimGame({
    heapSize: 13,
    minTokensToRemove: 1,
    maxTokensToRemove: 3,
    startingPlayer: Player.Human,
    strategy: remainderStrategy()
});

let gameState = nimGame.start();

// gameState = {
//     config: {
//         heapSize: 13,
//         minTokensToRemove: 1,
//         maxTokensToRemove: 3,
//         startingPlayer: Player.Human,
//         strategy: {
//             getNextTurn: ...
//         }
//     },
//     heapSize: 13,
//     minTokensAllowedToRemove: 1,
//     maxTokensAllowedToRemove: 3,
//     started: true,
//     turns: [],
//     winner: null
// }

gameState = nimGame.playRound(2);

// gameState = {
//     config: {
//         ...
//     },
//     heapSize: 8,
//     minTokensAllowedToRemove: 1,
//     maxTokensAllowedToRemove: 3,
//     started: true,
//     turns: [
//         { player: 'Human', tokensRemoved: 2 },
//         { player: 'Machine', tokensRemoved: 3 }
//     ],
//     winner: null
// }
```

### Using a Strategy

```ts
import { NimGame, Player, remainderStrategy } from '@luchsamapparat/nim';

const gameConfig = {
    heapSize: 13,
    minTokensToRemove: 1,
    maxTokensToRemove: 3,
    startingPlayer: Player.Human,
};

// the computer always removes the minimum allowed number of tokens
new NimGame({
    ...gameConfig,
    strategy: alwaysMinStrategy()
});

// the computer always removes the same number of tokens as the opponent did 
new NimGame({
    ...gameConfig,
    strategy: mimicHumanStrategy()
});

// the computer removes randomly removes tokens according to the minimum and maximun allowed number of tokens
new NimGame({
    ...gameConfig,
    strategy: randomStrategy()
});

// the computer tries to leave the minimum allowed number of tokens to the opponent in the last round
new NimGame({
    ...gameConfig,
    strategy: remainderStrategy()
});
```
