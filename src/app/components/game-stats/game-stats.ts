import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { STATS_TYPES } from '../../lib/game.constants';
import { GameStore } from '../../store/game.store';

@Component({
  selector: 'game-stats',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './game-stats.html',
})
export class GameStats {
  get statsTypes() {
    return Object.keys(STATS_TYPES);
  }

  store = inject(GameStore);
}
