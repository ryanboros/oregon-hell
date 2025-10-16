import { createAction, props } from '@ngrx/store';

import { IMessage } from './game.model';

export const addMessages = createAction('[Game] Add Message', props<{ msg: IMessage }>());
