// import { IStats } from '../store/game.model';
// import {
//   FIREPOWER_WEIGHT,
//   FOOD_WEIGHT,
//   FULL_SPEED,
//   NOTIFICATION_TYPE,
//   SLOW_SPEED,
// } from './game.constants';

// export const generateKey = (pre: string) => {
//   return `${pre}_${new Date().getTime()}`;
// };

// export const updateDistance = (distance: number, capacity: number, weight: number) => {
//   const diff = capacity - weight;
//   const speed = SLOW_SPEED + (diff / capacity) * FULL_SPEED;

//   // new distance is current distance + speed
//   return distance + speed;
// };

// export const updateWeight = (
//   { day, firepower, food }: IStats,
//   capacity: number,
//   weight: number
// ) => {
//   let droppedGuns = 0;
//   let droppedFood = 0;
//   let newFirepower = firepower;
//   let newFood = food;
//   let newWeight = weight;
//   const newMessages = [];

//   // drop things behind if it's too much weight, assume guns before food

//   // check drop guns
//   while (newFirepower && capacity <= newWeight) {
//     newFirepower--;
//     newWeight -= FIREPOWER_WEIGHT;
//     droppedGuns++;
//   }

//   // add notification if guns dropped
//   if (droppedGuns > 0) {
//     newMessages.push({
//       day: day,
//       message: `Left ${droppedGuns} guns behind`,
//       type: NOTIFICATION_TYPE.negative,
//     });
//   }

//   // check drop food
//   while (newFood && capacity <= newWeight) {
//     newFood--;
//     newWeight -= FOOD_WEIGHT;
//     droppedFood++;
//   }

//   // add notification if food dropped
//   if (droppedFood > 0) {
//     newMessages.push({
//       day: day,
//       message: `Left ${droppedFood} food provisions behind`,
//       type: NOTIFICATION_TYPE.negative,
//     });
//   }

//   // return updated data
//   return {
//     firepower: newFirepower,
//     food: newFood,
//     weight: newWeight,
//     messages: newMessages,
//   };
// };
