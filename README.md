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
import { NimGame, Player } from '@luchsamapparat/nim';

const heapSize = 13;
const startingPlayer = Player.Human;

const nimGame = new NimGame(heapSize, startingPlayer);
const round = nimGame.start();

// round = {
//     turns: [],
//     heapSize: 13,
//     isFinished: false,
//     winner: null
// }

const lastRound = nimGame.playRound(2);

// lastRound = {
//     turns: [
//         { player: 'Human', tokensRemoved: 2 },
//         { player: 'Machine', tokensRemoved: 3 }
//     ],
//   heapSize: 8,
//   isFinished: false,
//   winner: null
// }

const maxTokensToRemove = nimGame.getMaxTokensToRemove();

// maxTokensToRemove = 3;
```

### Using a Strategy

```ts
import { NimGame, Player, RandomStrategy, AlwaysOneStrategy } from '@luchsamapparat/nim';

const heapSize = 13;
const startingPlayer = Player.Human;

// computer removes randomly removes 1 to 3 tokens
new NimGame(heapSize, startingPlayer, new RandomStrategy();

// computer always removes 1 token
new NimGame(heapSize, startingPlayer, new AlwaysOneStrategy();
```
