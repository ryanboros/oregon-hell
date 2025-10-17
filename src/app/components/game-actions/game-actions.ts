import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IGameState } from '../../store/game.model';
import { selectCurrentEvent, selectIsGameActive } from '../../store/game.selectors';
import { AttackAction } from '../attack-action/attack-action';
import { GameCalendar } from '../game-calendar/game-calendar';
import { ShopAction } from '../shop-action/shop-action';
import { StartGame } from '../start-game/start-game';

@Component({
  selector: 'game-actions',
  standalone: true,
  imports: [CommonModule, AttackAction, GameCalendar, ShopAction, StartGame],
  styles: [],
  templateUrl: './game-actions.html',
})
export class GameActions {
  currentEvent$: Observable<string>;
  isGameActive$: Observable<boolean>;

  constructor(private store: Store<{ game: IGameState }>) {
    this.currentEvent$ = this.store.select(selectCurrentEvent);
    this.isGameActive$ = this.store.select(selectIsGameActive);
  }
}
