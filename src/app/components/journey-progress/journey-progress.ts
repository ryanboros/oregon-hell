import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameStore } from '../../store/game.store';

@Component({
  selector: 'journey-progress',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './journey-progress.html',
})
export class JourneyProgress {
  store = inject(GameStore);
}
