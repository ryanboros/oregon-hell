import { IEvent, NEGATIVE, NEUTRAL, POSITIVE } from '../store/game.model';

export const DAYS_PER_STEP: number = 0.2;
export const ENEMY_FIREPOWER_AVG: number = 5;
export const ENEMY_GOLD_AVG: number = 50;
export const EVENT_PROBABILITY: number = 0.15;
export const FINAL_DISTANCE: number = 1000;
export const FIREPOWER_WEIGHT: number = 5;
export const FOOD_PER_PERSON: number = 0.2;
export const FOOD_WEIGHT: number = 0.6;
export const FULL_SPEED: number = 5;
export const GAME_SPEED: number = 3000; //1500;
export const SLOW_SPEED: number = 3;
export const WEIGHT_PER_OX: number = 20;
export const WEIGHT_PER_PERSON: number = 2;

export const ITEM_TYPE = {
  crew: 'crew',
  firepower: 'firepower',
  food: 'food',
  money: 'money',
  oxen: 'oxen',
};

export const EVENT_TYPES = {
  attack: 'ATTACK',
  gameOver: 'GAME-OVER',
  shop: 'SHOP',
  statChange: 'STAT-CHANGE',
  win: 'WIN',
};

export const NOTIFICATION_TYPE = {
  negative: 'NEGATIVE',
  neutral: 'NEUTRAL',
  positive: 'POSITIVE',
};

export const EVENTS: IEvent[] = [
  {
    type: EVENT_TYPES.statChange,
    notification: NEGATIVE,
    stat: ITEM_TYPE.crew,
    value: -3,
    text: 'Food intoxication. Casualties: 3.',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NEGATIVE,
    stat: ITEM_TYPE.crew,
    value: -4,
    text: 'Flu outbreak. Casualties: 4.',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NEGATIVE,
    stat: ITEM_TYPE.food,
    value: -10,
    text: 'Worm infestation. Food lost: 10.',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NEGATIVE,
    stat: ITEM_TYPE.money,
    value: -50,
    text: 'Pick pockets steal $50.',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NEGATIVE,
    stat: ITEM_TYPE.oxen,
    value: -1,
    text: 'Ox flu outbreak. Casualties: 1.',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: POSITIVE,
    stat: ITEM_TYPE.food,
    value: 20,
    text: 'Found wild berries. Food added: 20.',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: POSITIVE,
    stat: ITEM_TYPE.food,
    value: 20,
    text: 'Found wild berries. Food added: 20.',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: POSITIVE,
    stat: ITEM_TYPE.oxen,
    value: 1,
    text: 'Found wild oxen. New oxen: 1.',
  },
  {
    type: EVENT_TYPES.shop,
    notification: NEUTRAL,
    text: 'You have found a shop',
    products: [
      { id: 'food-20-50', item: ITEM_TYPE.food, qty: 20, price: 50 },
      { id: 'oxen-1-200', item: ITEM_TYPE.oxen, qty: 1, price: 200 },
      { id: 'firepower-2-50', item: ITEM_TYPE.firepower, qty: 2, price: 50 },
      { id: 'crew-5-80', item: ITEM_TYPE.crew, qty: 5, price: 80 },
    ],
  },
  {
    type: EVENT_TYPES.shop,
    notification: NEUTRAL,
    text: 'You have found a shop',
    products: [
      { id: 'food-30-50', item: ITEM_TYPE.food, qty: 30, price: 50 },
      { id: 'oxen-1-200', item: ITEM_TYPE.oxen, qty: 1, price: 200 },
      { id: 'firepower-2-20', item: ITEM_TYPE.firepower, qty: 2, price: 20 },
      { id: 'crew-10-80', item: ITEM_TYPE.crew, qty: 10, price: 80 },
    ],
  },
  {
    type: EVENT_TYPES.shop,
    notification: NEUTRAL,
    text: 'Smugglers sell various goods',
    products: [
      { id: 'food-20-60', item: ITEM_TYPE.food, qty: 20, price: 60 },
      { id: 'oxen-1-300', item: ITEM_TYPE.oxen, qty: 1, price: 300 },
      { id: 'firepower-2-80', item: ITEM_TYPE.firepower, qty: 2, price: 80 },
      { id: 'crew-5-60', item: ITEM_TYPE.crew, qty: 5, price: 60 },
    ],
  },
  {
    type: EVENT_TYPES.attack,
    notification: NEGATIVE,
    text: 'Bandits are attacking you!',
  },
  {
    type: EVENT_TYPES.attack,
    notification: NEGATIVE,
    text: 'Bandits are attacking you!',
  },
  {
    type: EVENT_TYPES.attack,
    notification: NEGATIVE,
    text: 'Bandits are attacking you!',
  },
];
