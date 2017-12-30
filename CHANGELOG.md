# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="5.0.7"></a>
## [5.0.7](https://github.com/luchsamapparat/nim/compare/v5.0.6...v5.0.7) (2017-12-30)



<a name="5.0.6"></a>
## [5.0.6](https://github.com/luchsamapparat/nim/compare/v5.0.4...v5.0.6) (2017-12-30)


### Bug Fixes

* push automatically ([48e65ba](https://github.com/luchsamapparat/nim/commit/48e65ba))
* typo ([ca6fd10](https://github.com/luchsamapparat/nim/commit/ca6fd10))



<a name="5.0.5"></a>
## [5.0.5](https://github.com/luchsamapparat/nim/compare/v5.0.4...v5.0.5) (2017-12-30)


### Bug Fixes

* typo ([ca6fd10](https://github.com/luchsamapparat/nim/commit/ca6fd10))



<a name="5.0.4"></a>
## [5.0.4](https://github.com/luchsamapparat/nim/compare/v5.0.3...v5.0.4) (2017-12-30)



<a name="5.0.2"></a>
## [5.0.2](https://github.com/luchsamapparat/nim/compare/v5.0.3...v5.0.2) (2017-12-30)



<a name="5.0.3"></a>
## [5.0.3](https://github.com/luchsamapparat/nim/compare/v5.0.2...v5.0.3) (2017-12-30)



<a name="5.0.2"></a>
## [5.0.2](https://github.com/luchsamapparat/nim/compare/v5.0.1...v5.0.2) (2017-12-30)



<a name="5.0.1"></a>
## [5.0.1](https://github.com/luchsamapparat/nim/compare/v5.0.0...v5.0.1) (2017-12-30)


### Bug Fixes

* "A computed property name in a type literal must directly refer to a built-in symbol." ([dcd8e41](https://github.com/luchsamapparat/nim/commit/dcd8e41))



<a name="5.0.0"></a>
# [5.0.0](https://github.com/luchsamapparat/nim/compare/v4.1.1...v5.0.0) (2017-12-30)


### Features

* simplified Strategy API, GameConfig now serializable ([c5cad60](https://github.com/luchsamapparat/nim/commit/c5cad60))


### BREAKING CHANGES

* GameConfig.strategy is now the strategy name



<a name="4.1.1"></a>
## [4.1.1](https://github.com/luchsamapparat/nim/compare/v4.1.0...v4.1.1) (2017-12-30)


### Bug Fixes

* revert adding test utils to public API ([b0ee440](https://github.com/luchsamapparat/nim/commit/b0ee440))



<a name="4.1.0"></a>
# [4.1.0](https://github.com/luchsamapparat/nim/compare/v4.0.0...v4.1.0) (2017-12-30)


### Features

* added test utils to public API ([84c43d4](https://github.com/luchsamapparat/nim/commit/84c43d4))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/luchsamapparat/nim/compare/v3.0.0...v4.0.0) (2017-12-29)


### Features

* added example.js ([f6b76ad](https://github.com/luchsamapparat/nim/commit/f6b76ad))
* refactored into separate ES modules, added tests for each function, changed all tests parametrized to match game config ([a78dffc](https://github.com/luchsamapparat/nim/commit/a78dffc))
* updated tslint config ([34f7ce3](https://github.com/luchsamapparat/nim/commit/34f7ce3))


### BREAKING CHANGES

* added public playRound method instead of playNextRound method as part of startGame's return value



<a name="3.0.0"></a>
# [3.0.0](https://github.com/luchsamapparat/nim/compare/v2.0.0...v3.0.0) (2017-12-28)


### Features

* refactored game API to be functional ([edf889b](https://github.com/luchsamapparat/nim/commit/edf889b))


### BREAKING CHANGES

* no NimGame needs to be initialized anymore, just call playNim



<a name="2.0.0"></a>
# [2.0.0](https://github.com/luchsamapparat/nim/compare/v1.4.0...v2.0.0) (2017-12-28)


### Bug Fixes

* fix tests ([52bc763](https://github.com/luchsamapparat/nim/commit/52bc763))


### BREAKING CHANGES

* new API for NimGame



<a name="1.4.0"></a>
# [1.4.0](https://github.com/luchsamapparat/nim/compare/v1.3.0...v1.4.0) (2017-12-28)


### Features

* configured test debugging in vscode ([f1a745b](https://github.com/luchsamapparat/nim/commit/f1a745b))
* customize game via config parameters, always return complete game state, implemented strategies as higher-order functions ([640c5b3](https://github.com/luchsamapparat/nim/commit/640c5b3))
* switch to [@luchsamappat](https://github.com/luchsamappat) tslint-config ([f0d3a6d](https://github.com/luchsamapparat/nim/commit/f0d3a6d))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/luchsamapparat/nim/compare/v1.2.3...v1.3.0) (2017-12-23)


### Features

* added remainder and mimic-human strategy, use remainder by default, added tests for all strategies ([312245f](https://github.com/luchsamapparat/nim/commit/312245f))



<a name="1.2.3"></a>
## [1.2.3](https://github.com/luchsamapparat/nim/compare/v1.2.2...v1.2.3) (2017-12-23)


### Bug Fixes

* revert changes to package-lock.json before deploy on travis ([d015542](https://github.com/luchsamapparat/nim/commit/d015542))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/luchsamapparat/nim/compare/v1.2.1...v1.2.2) (2017-12-23)


### Bug Fixes

* prevent additional build on release ([b74b8ee](https://github.com/luchsamapparat/nim/commit/b74b8ee))
* run git diff to find cause for failing release on travis ([d82f883](https://github.com/luchsamapparat/nim/commit/d82f883))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/luchsamapparat/nim/compare/v1.2.0...v1.2.1) (2017-12-23)


### Bug Fixes

* disabled object-literal-sort-keys rule ([5f69293](https://github.com/luchsamapparat/nim/commit/5f69293))
* removed prepublishonly script to fix publishing via travis ([7498640](https://github.com/luchsamapparat/nim/commit/7498640))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/luchsamapparat/nim/compare/v1.0.0...v1.1.0) (2017-12-23)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/luchsamapparat/nim/compare/v1.0.0...v1.2.0) (2017-12-23)


### Bug Fixes

* updated travis config ([30522f3](https://github.com/luchsamapparat/nim/commit/30522f3))
* updated travis configuration, use latest Node version ([df2cacb](https://github.com/luchsamapparat/nim/commit/df2cacb))


### Features

* added option to specify a strategy for the machine ([fd828e7](https://github.com/luchsamapparat/nim/commit/fd828e7))
* configured standard-version ([004da01](https://github.com/luchsamapparat/nim/commit/004da01))
* output detailed test results ([793b6d7](https://github.com/luchsamapparat/nim/commit/793b6d7))
* travis integration ([4d00c8b](https://github.com/luchsamapparat/nim/commit/4d00c8b))
