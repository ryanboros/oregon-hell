import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IGameState, IStats } from '../../store/game.model';
import { selectStats } from '../../store/game.selectors';

@Component({
  selector: 'game-calendar',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './game-calendar.html',
})
export class GameCalendar {
  stats$: Observable<IStats>;

  constructor(private store: Store<{ game: IGameState }>) {
    this.stats$ = this.store.select(selectStats);
  }
}
