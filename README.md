# NIM

## Setup

```
npm install
```

## Develop, build and test

* `npm run build` Clean the `dist` directory, run TSLint and build the library
* `npm run watch` Clean the `dist` directory, build and test the library in parallel and repeat on file change
* `npm test` Run tests

## Use

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
