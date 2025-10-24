import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttackAction } from '../attack-action/attack-action';
import { GameCalendar } from '../game-calendar/game-calendar';
import { GameOver } from '../game-over/game-over';
import { GameWin } from '../game-win/game-win';
import { ShopAction } from '../shop-action/shop-action';
import { StartGame } from '../start-game/start-game';
import { GameStore } from '../../store/game.store';

@Component({
  selector: 'game-actions',
  standalone: true,
  imports: [CommonModule, AttackAction, GameCalendar, GameOver, GameWin, ShopAction, StartGame],
  styles: [],
  templateUrl: './game-actions.html',
})
export class GameActions {
  store = inject(GameStore);
}
