import { inject, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { patchState } from '@ngrx/signals';
import { unprotected } from '@ngrx/signals/testing';

import { GameStore } from './game.store';
import { MockStats } from '../lib/game.mock';

describe('GameStore', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), GameStore],
    });
  });

  it('should verify that `banditStats` is available', () => {
    const store = TestBed.inject(GameStore);

    expect(store.banditStats()).toEqual({
      firepower: 0,
      money: 0,
    });
  });

  it('should verify that `currentEvent` is available', () => {
    const store = TestBed.inject(GameStore);

    expect(store.currentEvent()).toEqual('');
  });

  it('should verify that `isGameActive` is available', () => {
    const store = TestBed.inject(GameStore);

    expect(store.isGameActive()).toBeFalse();
  });

  it('should verify that `messages` is available', () => {
    const store = TestBed.inject(GameStore);

    expect(store.messages()).toEqual([]);
  });

  it('should verify that `stats` is available', () => {
    const store = TestBed.inject(GameStore);

    expect(store.stats()).toEqual({
      crew: 30,
      day: 0,
      distance: 0,
      firepower: 2,
      food: 80,
      money: 300,
      oxen: 2,
    });
  });

  it('should verify that `shopInventory` is available', () => {
    const store = TestBed.inject(GameStore);

    expect(store.shopInventory()).toEqual([]);
  });

  it('should verify that computed `capacity` is available', () => {
    const store = TestBed.inject(GameStore);

    expect(store.capacity()).toEqual(100);
  });

  it('should verify that computed `progress` is available', () => {
    const store = TestBed.inject(GameStore);

    patchState(unprotected(store), { stats: { ...store.stats(), distance: 100 } });

    expect(store.progress()).toEqual(10);
  });

  it('should verify that computed `weight` is available', () => {
    const store = TestBed.inject(GameStore);

    expect(store.weight()).toEqual(58);
  });
});
