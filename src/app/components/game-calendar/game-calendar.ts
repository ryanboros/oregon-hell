import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameStore } from '../../store/game.store';

@Component({
  selector: 'game-calendar',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './game-calendar.html',
})
export class GameCalendar {
  store = inject(GameStore);
}
