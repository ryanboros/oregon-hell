import { createReducer, on } from '@ngrx/store';

import { addMessages, updateStats } from './game.actions';
import { IGameState } from './game.model';
import { NOTIFICATION_TYPE } from '../lib/game.constants';

export const initialState: IGameState = {
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

const _gameReducer = createReducer(
  initialState,
  on(addMessages, (state, { msg }) => ({ ...state, messages: [msg, ...state.messages] })),
  on(updateStats, (state, { stats }) => ({ ...state, stats: stats }))
);

export function gameReducer(state: any, action: any) {
  return _gameReducer(state, action);
}
