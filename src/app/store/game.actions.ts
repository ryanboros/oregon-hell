import { createAction, props } from '@ngrx/store';

import { IMessage, IStats } from './game.model';

export const addMessages = createAction('[Game] Add Message', props<{ msg: IMessage }>());
export const updateStats = createAction('[Game] Update Stats', props<{ stats: IStats }>());
