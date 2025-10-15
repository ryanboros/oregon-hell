export const WEIGHT_PER_OX: number = 20;
export const WEIGHT_PER_PERSON: number = 2;
export const FOOD_WEIGHT: number = 0.6;
export const FIREPOWER_WEIGHT: number = 5;
export const GAME_SPEED: number = 1500;
export const DAYS_PER_STEP: number = 0.2;
export const FULL_SPEED: number = 5;
export const SLOW_SPEED: number = 3;
export const FINAL_DISTANCE: number = 1000;
export const EVENT_PROBABILITY: number = 0.15;
export const ENEMY_FIREPOWER: number = 5;
export const ENEMY_GOLD_AVG: number = 50;

export const STATS_TYPES = {
  crew: 'CREW',
  day: 'DAY',
  distance: 'DISTANCE',
  firepower: 'FIREPOWER',
  food: 'FOOD',
  money: 'MONEY',
  oxen: 'OXEN',
};

export const ITEM_TYPE = {
  crew: 'CREW',
  firepower: 'FIREPOWER',
  food: 'FOOD',
  money: 'MONEY',
  oxen: 'OXEN',
};

export const EVENT_TYPES = {
  attack: 'ATTACK',
  shop: 'SHOP',
  statChange: 'STAT-CHANGE',
};

export const NOTIFICATION_TYPE = {
  negative: 'NEGATIVE',
  neutral: 'NEUTRAL',
  positive: 'POSITIVE',
};

export const EVENTS = [
  {
    type: EVENT_TYPES.statChange,
    notification: NOTIFICATION_TYPE.negative,
    stat: ITEM_TYPE.crew,
    value: -3,
    text: 'Food intoxication. Casualties: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NOTIFICATION_TYPE.negative,
    stat: ITEM_TYPE.crew,
    value: -4,
    text: 'Flu outbreak. Casualties: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NOTIFICATION_TYPE.negative,
    stat: ITEM_TYPE.food,
    value: -10,
    text: 'Worm infestation. Food lost: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NOTIFICATION_TYPE.negative,
    stat: ITEM_TYPE.money,
    value: -50,
    text: 'Pick pockets steal $',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NOTIFICATION_TYPE.negative,
    stat: ITEM_TYPE.oxen,
    value: -1,
    text: 'Ox flu outbreak. Casualties: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NOTIFICATION_TYPE.positive,
    stat: ITEM_TYPE.food,
    value: 20,
    text: 'Found wild berries. Food added: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NOTIFICATION_TYPE.positive,
    stat: ITEM_TYPE.food,
    value: 20,
    text: 'Found wild berries. Food added: ',
  },
  {
    type: EVENT_TYPES.statChange,
    notification: NOTIFICATION_TYPE.positive,
    stat: ITEM_TYPE.oxen,
    value: 1,
    text: 'Found wild oxen. New oxen: ',
  },
  {
    type: EVENT_TYPES.shop,
    notification: NOTIFICATION_TYPE.neutral,
    text: 'You have found a shop',
    products: [
      { item: ITEM_TYPE.food, qty: 20, price: 50 },
      { item: ITEM_TYPE.oxen, qty: 1, price: 200 },
      { item: ITEM_TYPE.firepower, qty: 2, price: 50 },
      { item: ITEM_TYPE.crew, qty: 5, price: 80 },
    ],
  },
  {
    type: EVENT_TYPES.shop,
    notification: NOTIFICATION_TYPE.neutral,
    text: 'You have found a shop',
    products: [
      { item: ITEM_TYPE.food, qty: 30, price: 50 },
      { item: ITEM_TYPE.oxen, qty: 1, price: 200 },
      { item: ITEM_TYPE.firepower, qty: 2, price: 20 },
      { item: ITEM_TYPE.crew, qty: 10, price: 80 },
    ],
  },
  {
    type: EVENT_TYPES.shop,
    notification: NOTIFICATION_TYPE.neutral,
    text: 'Smugglers sell various goods',
    products: [
      { item: ITEM_TYPE.food, qty: 20, price: 60 },
      { item: ITEM_TYPE.oxen, qty: 1, price: 300 },
      { item: ITEM_TYPE.firepower, qty: 2, price: 80 },
      { item: ITEM_TYPE.crew, qty: 5, price: 60 },
    ],
  },
  {
    type: EVENT_TYPES.attack,
    notification: NOTIFICATION_TYPE.negative,
    text: 'Bandits are attacking you',
  },
  {
    type: EVENT_TYPES.attack,
    notification: NOTIFICATION_TYPE.negative,
    text: 'Bandits are attacking you',
  },
  {
    type: EVENT_TYPES.attack,
    notification: NOTIFICATION_TYPE.negative,
    text: 'Bandits are attacking you',
  },
];
