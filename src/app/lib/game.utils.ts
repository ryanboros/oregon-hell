import {
  IBanditStats,
  IMessage,
  IProduct,
  NEGATIVE_MESSAGE,
  NotificationType,
} from '../store/game.model';
import {
  ENEMY_FIREPOWER_AVG,
  ENEMY_GOLD_AVG,
  FIREPOWER_WEIGHT,
  FOOD_PER_PERSON,
  FOOD_WEIGHT,
  FULL_SPEED,
  NOTIFICATION_TYPE,
  SLOW_SPEED,
  WEIGHT_PER_OX,
  WEIGHT_PER_PERSON,
} from './game.constants';

export const calculateCapacity = (oxen: number, crew: number): number =>
  oxen * WEIGHT_PER_OX + crew * WEIGHT_PER_PERSON;

export const calculateWeight = (food: number, firepower: number): number =>
  food * FOOD_WEIGHT + firepower * FIREPOWER_WEIGHT;

export const consumeFood = (crew: number, food: number) => {
  let updatedFood: number;

  updatedFood = food - crew * FOOD_PER_PERSON;

  if (updatedFood < 0) updatedFood = 0;

  return updatedFood;
};

export const generateBanditStats = (): IBanditStats => ({
  firepower: Math.round((0.7 + 0.6 * Math.random()) * ENEMY_FIREPOWER_AVG),
  money: Math.round((0.7 + 0.6 * Math.random()) * ENEMY_GOLD_AVG),
});

export const generateDamage = (firepower: number, banditFirepower: number): number =>
  Math.ceil(Math.max(0, banditFirepower * 2 * Math.random() - firepower));

export const generateMessage = (day: number, msg: string, note: NotificationType): IMessage => ({
  currentDay: Math.ceil(day),
  id: crypto.randomUUID(),
  message: msg,
  type: note,
});

export const generateStore = (products: IProduct[]): IProduct[] => {
  // number of products in store
  const numProducts: number = Math.ceil(Math.random() * 4);

  let inventory: IProduct[] = [];

  for (let i = 0; i < numProducts; i++) {
    // random product
    const productIndex = randomInt(products.length);

    // multiply price by random factor +-30%;
    const priceFactor = 0.7 + 0.6 * Math.random();

    inventory.push({
      ...products[productIndex],
      id: crypto.randomUUID(),
      price: Math.round(products[productIndex].price * priceFactor),
    });
  }

  return inventory;
};

export const randomInt = (max: number): number => Math.floor(Math.random() * max);

export const updateDistance = (distance: number, capacity: number, weight: number): number => {
  const diff = capacity - weight;
  const speed = SLOW_SPEED + (diff / capacity) * FULL_SPEED;

  // new distance is current distance + speed
  return distance + speed;
};

export const updateWeight = (
  day: number,
  firepower: number,
  food: number,
  capacity: number,
  weight: number
) => {
  let droppedGuns: number = 0;
  let droppedFood: number = 0;

  let newFirepower: number = firepower;
  let newFood: number = food;
  let newWeight: number = weight;
  const newMessages: IMessage[] = [];

  // drop things behind if it's too much weight, assume guns before food

  // check drop guns
  while (newFirepower && capacity <= newWeight) {
    newFirepower--;
    newWeight -= FIREPOWER_WEIGHT;
    droppedGuns++;
  }

  // add notification if guns dropped
  if (droppedGuns > 0) {
    const droppedGunMsg: IMessage = generateMessage(
      day,
      `Left ${droppedGuns} guns behind`,
      NEGATIVE_MESSAGE
    );
    newMessages.unshift(droppedGunMsg);
  }

  // check drop food
  while (newFood && capacity <= newWeight) {
    newFood--;
    newWeight -= FOOD_WEIGHT;
    droppedFood++;
  }

  // add notification if food dropped
  if (droppedFood > 0) {
    const droppedFoodMsg: IMessage = generateMessage(
      day,
      `Left ${droppedFood} food provisions behind`,
      NEGATIVE_MESSAGE
    );
    newMessages.unshift(droppedFoodMsg);
  }

  // return updated data
  return {
    firepower: newFirepower,
    food: newFood,
    weight: newWeight,
    messages: newMessages,
  };
};
