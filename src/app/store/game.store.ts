import { computed, inject, InjectionToken } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { IGameState, IMessage, IStats } from './game.model';
import {
  FINAL_DISTANCE,
  FIREPOWER_WEIGHT,
  FOOD_WEIGHT,
  WEIGHT_PER_OX,
  WEIGHT_PER_PERSON,
} from '../lib/game.constants';

const initialState: IGameState = {
  currentEvent: '',
  isGameActive: false,
  messages: [],
  stats: {
    crew: 30,
    day: 0,
    distance: 0,
    firepower: 2,
    food: 80,
    money: 300,
    oxen: 2,
  },
};

const STORE_STATE = new InjectionToken<IGameState>('GameStore', { factory: () => initialState });

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STORE_STATE)),
  withComputed(({ stats }) => ({
    capacity: computed(() => stats().oxen * WEIGHT_PER_OX + stats().crew * WEIGHT_PER_PERSON),
    progress: computed(() => Math.round((stats().distance / FINAL_DISTANCE) * 100)),
    weight: computed(() => stats().food * FOOD_WEIGHT + stats().firepower * FIREPOWER_WEIGHT),
  })),
  withMethods((store) => ({
    addMessage(msg: IMessage) {
      patchState(store, { messages: [msg, ...store.messages()] });
    },
    toggleGameActive() {
      patchState(store, { isGameActive: !store.isGameActive() });
    },
    updateStats(stats: IStats) {
      patchState(store, { stats: stats });
    },
  }))
);
