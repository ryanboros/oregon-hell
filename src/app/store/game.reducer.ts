import { createReducer, on } from '@ngrx/store';

import { addMessages } from './game.actions';
import { IGameState } from './game.model';
import { NOTIFICATION_TYPE } from '../lib/constants';

export const initialState: IGameState = {
  crew: 30,
  day: 0,
  distance: 0,
  messages: [],
  firepower: 2,
  food: 80,
  money: 300,
  oxen: 2,
};

const _gameReducer = createReducer(
  initialState,
  on(addMessages, (state, { msg }) => ({ ...state, messages: [msg, ...state.messages] }))
);

export function gameReducer(state: any, action: any) {
  return _gameReducer(state, action);
}
