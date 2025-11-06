import {
  CREW_ITEM,
  FIREPOWER_ITEM,
  FOOD_ITEM,
  IBanditStats,
  IProduct,
  IStats,
  OXEN_ITEM,
} from '../store/game.model';

export const MockStats: IStats = {
  crew: 30,
  day: 0,
  distance: 0,
  firepower: 2,
  food: 80,
  oxen: 2,
  money: 300,
};

export const MockBanditStats: IBanditStats = {
  firepower: 4,
  money: 38,
};

export const MockMessage: string = 'Lorem ipsum dolor sit amet';

export const MockProducts: IProduct[] = [
  { id: '1', item: FOOD_ITEM, qty: 20, price: 50 },
  { id: '2', item: OXEN_ITEM, qty: 1, price: 200 },
  { id: '3', item: FIREPOWER_ITEM, qty: 2, price: 50 },
  { id: '4', item: CREW_ITEM, qty: 5, price: 80 },
];
