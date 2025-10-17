import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { STATS_TYPES } from '../../lib/game.constants';
import { IGameState, IStats } from '../../store/game.model';
import { selectCapacity, selectStats, selectWeight } from '../../store/game.selectors';

@Component({
  selector: 'game-stats',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './game-stats.html',
})
export class GameStats {
  capacity$: Observable<number>;
  stats$: Observable<IStats>;
  weight$: Observable<number>;
  get statsTypes() {
    return Object.keys(STATS_TYPES);
  }

  constructor(private store: Store<{ game: IGameState }>) {
    this.capacity$ = this.store.select(selectCapacity);
    this.stats$ = this.store.select(selectStats);
    this.weight$ = this.store.select(selectWeight);
  }
}
