import { computed, inject, InjectionToken } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

import { EventType, IBanditStats, IGameState, IMessage, IProduct, IStats } from './game.model';
import {
  FINAL_DISTANCE,
  FIREPOWER_WEIGHT,
  FOOD_WEIGHT,
  WEIGHT_PER_OX,
  WEIGHT_PER_PERSON,
} from '../lib/game.constants';

export const initialState: IGameState = {
  banditStats: {
    firepower: 0,
    money: 0,
  },
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
  shopInventory: [],
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
    addMessages(msg: IMessage[]) {
      patchState(store, { messages: [...msg, ...store.messages()] });
    },
    clearMessages() {
      patchState(store, { messages: [] });
    },
    setBanditStats(stats: IBanditStats) {
      patchState(store, { banditStats: stats });
    },
    setEvent(evt: EventType) {
      patchState(store, { currentEvent: evt });
    },
    setGameActive(active: boolean) {
      patchState(store, { isGameActive: active });
    },
    setShopInventory(products: IProduct[]) {
      patchState(store, { shopInventory: products });
    },
    updateStats(stats: IStats) {
      patchState(store, { stats: stats });
    },
  }))
);
