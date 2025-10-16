import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IGameState } from '../../store/game.model';
import {
  selectCapacity,
  selectCrew,
  selectDay,
  selectDistance,
  selectFirepower,
  selectFood,
  selectMoney,
  selectOxen,
  selectWeight,
} from '../../store/game.selectors';

@Component({
  selector: 'game-stats',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './game-stats.html',
})
export class GameStats {
  capacity$: Observable<number>;
  crew$: Observable<number>;
  day$: Observable<number>;
  distance$: Observable<number>;
  firepower$: Observable<number>;
  food$: Observable<number>;
  money$: Observable<number>;
  oxen$: Observable<number>;
  weight$: Observable<number>;

  constructor(private store: Store<{ game: IGameState }>) {
    this.capacity$ = this.store.select(selectCapacity);
    this.crew$ = this.store.select(selectCrew);
    this.day$ = this.store.select(selectDay);
    this.distance$ = this.store.select(selectDistance);
    this.firepower$ = this.store.select(selectFirepower);
    this.food$ = this.store.select(selectFood);
    this.money$ = this.store.select(selectMoney);
    this.oxen$ = this.store.select(selectOxen);
    this.weight$ = this.store.select(selectWeight);
  }
}
