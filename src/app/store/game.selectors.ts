import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IGameState } from './game.model';
import { FIREPOWER_WEIGHT, FOOD_WEIGHT, WEIGHT_PER_OX, WEIGHT_PER_PERSON } from '../lib/constants';

export const selectGameState = createFeatureSelector<IGameState>('game');

export const selectCrew = createSelector(selectGameState, (state) => state.crew);
export const selectDay = createSelector(selectGameState, (state) => state.day);
export const selectDistance = createSelector(selectGameState, (state) => state.distance);
export const selectFirepower = createSelector(selectGameState, (state) => state.firepower);
export const selectFood = createSelector(selectGameState, (state) => state.food);
export const selectMessages = createSelector(selectGameState, (state) => state.messages);
export const selectMoney = createSelector(selectGameState, (state) => state.money);
export const selectOxen = createSelector(selectGameState, (state) => state.oxen);

export const selectCapacity = createSelector(
  selectGameState,
  (state) => state.oxen * WEIGHT_PER_OX + state.crew * WEIGHT_PER_PERSON
);

export const selectWeight = createSelector(
  selectGameState,
  (state) => state.food * FOOD_WEIGHT + state.firepower * FIREPOWER_WEIGHT
);
