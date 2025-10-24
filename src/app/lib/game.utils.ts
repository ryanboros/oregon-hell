// import { IStats } from '../store/game.model';
import { IMessage } from '../store/game.model';
import {
  FIREPOWER_WEIGHT,
  FOOD_PER_PERSON,
  FOOD_WEIGHT,
  FULL_SPEED,
  NOTIFICATION_TYPE,
  SLOW_SPEED,
} from './game.constants';

export const consumeFood = (crew: number, food: number) => {
  let updatedFood: number;

  updatedFood = food - crew * FOOD_PER_PERSON;

  if (updatedFood < 0) updatedFood = 0;

  return updatedFood;
};

export const updateDistance = (distance: number, capacity: number, weight: number) => {
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
    newMessages.push({
      id: crypto.randomUUID(),
      currentDay: day,
      message: `Left ${droppedGuns} guns behind`,
      type: NOTIFICATION_TYPE.negative,
    });
  }

  // check drop food
  while (newFood && capacity <= newWeight) {
    newFood--;
    newWeight -= FOOD_WEIGHT;
    droppedFood++;
  }

  // add notification if food dropped
  if (droppedFood > 0) {
    newMessages.push({
      id: crypto.randomUUID(),
      currentDay: day,
      message: `Left ${droppedFood} food provisions behind`,
      type: NOTIFICATION_TYPE.negative,
    });
  }

  // return updated data
  return {
    firepower: newFirepower,
    food: newFood,
    weight: newWeight,
    messages: newMessages,
  };
};
