import { MockBanditStats, MockMessage, MockProducts, MockStats } from './game.mock';
import { POSITIVE_MESSAGE } from '../store/game.model';
import {
  calculateCapacity,
  calculateWeight,
  consumeFood,
  generateBanditStats,
  generateDamage,
  generateMessage,
  generateStore,
  randomInt,
  updateDistance,
} from './game.utils';

describe('game.utils', () => {
  it('calculateCapacity - should calculate the capacity from oxen and crew', () => {
    const result = calculateCapacity(MockStats.oxen, MockStats.crew);

    expect(result).toEqual(100);
  });

  it('calculateWeight - should caluclate the weight from food and firepower', () => {
    const result = calculateWeight(MockStats.food, MockStats.firepower);

    expect(result).toEqual(58);
  });

  it('consumeFood - should update food stat based on current food and number of crew', () => {
    const result = consumeFood(MockStats.crew, MockStats.food);

    expect(result).toEqual(79.4);
  });

  it('generateBanditStats - should randomly generate the bandit stats object with firepower and money', () => {
    spyOn(Math, 'random').and.returnValue(0.1);

    const result = generateBanditStats();

    expect(result).toEqual({ firepower: 4, money: 38 });
  });

  it('generateDamage - should randomly generate the damage given caravan firepower vs bandit firepower', () => {
    spyOn(Math, 'random').and.returnValue(0.4);

    const result = generateDamage(MockStats.firepower, MockBanditStats.firepower);

    expect(result).toEqual(2);
  });

  it('generateMessage - should generate a message object give the day, message string, and notificationType', () => {
    spyOn(crypto, 'randomUUID').and.returnValue('123e4567-e89b-12d3-a456-426614174000');

    const result = generateMessage(MockStats.day, MockMessage, POSITIVE_MESSAGE);

    expect(result).toEqual({
      currentDay: 0,
      id: '123e4567-e89b-12d3-a456-426614174000',
      message: 'Lorem ipsum dolor sit amet',
      type: 'POSITIVE',
    });
  });

  it('generateStore - should randomly generate the store items from a list of products', () => {
    spyOn(crypto, 'randomUUID').and.returnValue('123e4567-e89b-12d3-a456-426614174000');
    spyOn(Math, 'random').and.returnValue(0.1);

    const result = generateStore(MockProducts);

    expect(result).toEqual([
      { id: '123e4567-e89b-12d3-a456-426614174000', item: 'food', price: 38, qty: 20 },
    ]);
  });

  it('randomInt - should generate a random integer between 0 and argument `max` value', () => {
    spyOn(Math, 'random').and.returnValue(0.5);

    const result = randomInt(10);

    expect(result).toEqual(5);
  });

  it('updateDistance - update the distance traveled by the caravan based on capacity and weight', () => {
    const capacity = calculateCapacity(MockStats.oxen, MockStats.crew); // 100
    const weight = calculateWeight(MockStats.food, MockStats.firepower); // 58

    const result = updateDistance(MockStats.distance, capacity, weight);

    expect(result).toEqual(5.1);
  });
});
