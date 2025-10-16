import { Component } from '@angular/core';

import { AttackAction } from '../attack-action/attack-action';
import { ShopAction } from '../shop-action/shop-action';
import { StartGame } from '../start-game/start-game';

@Component({
  selector: 'game-actions',
  standalone: true,
  imports: [AttackAction, ShopAction, StartGame],
  styles: [],
  templateUrl: './game-actions.html',
})
export class GameActions {}
