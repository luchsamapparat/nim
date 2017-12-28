import { alwaysMinStrategy, getStrategies, mimicHumanStrategy, randomStrategy, remainderStrategy } from '../index';

describe('getStrategies', () => {
    test('it returns all strategies', () => {
        expect(getStrategies()).toEqual([
            alwaysMinStrategy,
            mimicHumanStrategy,
            randomStrategy,
            remainderStrategy
        ]);
    });
});
