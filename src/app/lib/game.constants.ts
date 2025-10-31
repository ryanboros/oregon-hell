import {
  CREW_ITEM,
  FIREPOWER_ITEM,
  FOOD_ITEM,
  IEvent,
  MONEY_ITEM,
  NEGATIVE_MESSAGE,
  NEUTRAL_MESSAGE,
  OXEN_ITEM,
  POSITIVE_MESSAGE,
} from '../store/game.model';

export const DAYS_PER_STEP: number = 0.2;
export const ENEMY_FIREPOWER_AVG: number = 5;
export const ENEMY_GOLD_AVG: number = 50;
export const EVENT_PROBABILITY: number = 0.15;
export const FINAL_DISTANCE: number = 1000;
export const FIREPOWER_WEIGHT: number = 5;
export const FOOD_PER_PERSON: number = 0.02;
export const FOOD_WEIGHT: number = 0.6;
export const FULL_SPEED: number = 5;
export const GAME_SPEED: number = 900;
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
  gold: 'GOLD',
  negative: 'NEGATIVE',
  neutral: 'NEUTRAL',
  positive: 'POSITIVE',
  death: 'DEATH',
};

export const EVENTS: IEvent[] = [
  {
    type: EVENT_TYPES.statChange,
    notification: NEGATIVE_MESSAGE,
    stat: CREW_ITEM,
    value: -3,
    text: 'Food intoxication. Casualties: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NEGATIVE_MESSAGE,
    stat: CREW_ITEM,
    value: -4,
    text: 'Flu outbreak. Casualties: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NEGATIVE_MESSAGE,
    stat: FOOD_ITEM,
    value: -10,
    text: 'Worm infestation. Food lost: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NEGATIVE_MESSAGE,
    stat: MONEY_ITEM,
    value: -50,
    text: 'Pick pockets steal ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NEGATIVE_MESSAGE,
    stat: OXEN_ITEM,
    value: -1,
    text: 'Ox flu outbreak. Casualties: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: POSITIVE_MESSAGE,
    stat: FOOD_ITEM,
    value: 20,
    text: 'Found wild berries. Food added: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: POSITIVE_MESSAGE,
    stat: FOOD_ITEM,
    value: 20,
    text: 'Found wild berries. Food added: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: POSITIVE_MESSAGE,
    stat: OXEN_ITEM,
    value: 1,
    text: 'Found wild oxen. New oxen: ',
  },
  {
    type: EVENT_TYPES.shop,
    notification: NEUTRAL_MESSAGE,
    text: 'You have found a shop',
    products: [
      { item: FOOD_ITEM, qty: 20, price: 50 },
      { item: OXEN_ITEM, qty: 1, price: 200 },
      { item: FIREPOWER_ITEM, qty: 2, price: 50 },
      { item: CREW_ITEM, qty: 5, price: 80 },
    ],
  },
  {
    type: EVENT_TYPES.shop,
    notification: NEUTRAL_MESSAGE,
    text: 'You have found a shop',
    products: [
      { item: FOOD_ITEM, qty: 30, price: 50 },
      { item: OXEN_ITEM, qty: 1, price: 200 },
      { item: FIREPOWER_ITEM, qty: 2, price: 20 },
      { item: CREW_ITEM, qty: 10, price: 80 },
    ],
  },
  {
    type: EVENT_TYPES.shop,
    notification: NEUTRAL_MESSAGE,
    text: 'Smugglers sell various goods',
    products: [
      { item: FOOD_ITEM, qty: 20, price: 60 },
      { item: OXEN_ITEM, qty: 1, price: 300 },
      { item: FIREPOWER_ITEM, qty: 2, price: 80 },
      { item: CREW_ITEM, qty: 5, price: 60 },
    ],
  },
  {
    type: EVENT_TYPES.attack,
    notification: NEGATIVE_MESSAGE,
    text: 'Bandits are attacking you!',
  },
  {
    type: EVENT_TYPES.attack,
    notification: NEGATIVE_MESSAGE,
    text: 'Bandits are attacking you!',
  },
  {
    type: EVENT_TYPES.attack,
    notification: NEGATIVE_MESSAGE,
    text: 'Bandits are attacking you!',
  },
];
