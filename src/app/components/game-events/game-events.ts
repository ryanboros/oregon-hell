import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NOTIFICATION_TYPE } from '../../lib/game.constants';
import { GameStore } from '../../store/game.store';

@Component({
  selector: 'game-events',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './game-events.html',
})
export class GameEvents {
  get notificationTypes() {
    return NOTIFICATION_TYPE;
  }

  store = inject(GameStore);

  public greaterThan(sub: number, num: number) {
    return sub > num;
  }
}
