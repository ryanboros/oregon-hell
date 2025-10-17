import { createSelector, createFeatureSelector } from '@ngrx/store';

import { IGameState } from './game.model';
import {
  FINAL_DISTANCE,
  FIREPOWER_WEIGHT,
  FOOD_WEIGHT,
  WEIGHT_PER_OX,
  WEIGHT_PER_PERSON,
} from '../lib/game.constants';

export const selectGameState = createFeatureSelector<IGameState>('game');

export const selectCurrentEvent = createSelector(selectGameState, (state) => state.currentEvent);
export const selectIsGameActive = createSelector(selectGameState, (state) => state.isGameActive);
export const selectMessages = createSelector(selectGameState, (state) => state.messages);
export const selectStats = createSelector(selectGameState, (state) => state.stats);

export const selectCapacity = createSelector(
  selectGameState,
  (state) => state.stats.oxen * WEIGHT_PER_OX + state.stats.crew * WEIGHT_PER_PERSON
);

export const selectWeight = createSelector(
  selectGameState,
  (state) => state.stats.food * FOOD_WEIGHT + state.stats.firepower * FIREPOWER_WEIGHT
);

export const selectProgress = createSelector(selectGameState, (state) =>
  Math.round((state.stats.distance / FINAL_DISTANCE) * 100)
);
