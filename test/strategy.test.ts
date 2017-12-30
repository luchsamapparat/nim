import { forEach } from 'lodash';
import { Strategy, StrategyName, getStrategy, strategies } from '../index';

describe('getStrategy', () => {

    test('it returns the strategy matching the given name', () => {
        forEach(strategies, (strategy: Strategy, name: StrategyName) => {
            expect(getStrategy(name)).toBe(strategy);
        });
    });

    test('it returns undefined when to strategy matches the given name', () => {
        expect(() => getStrategy(<any> 'invalidName')).toThrowError();
    });

});
