import { Component } from '@angular/core';

import { AttackAction } from '../attack-action/AttackAction';
import { ShopAction } from '../shop-action/ShopAction';
import { StartGame } from '../start-game/StartGame';

@Component({
  selector: 'game-actions',
  standalone: true,
  imports: [AttackAction, ShopAction, StartGame],
  styles: [],
  templateUrl: './GameActions.html',
})
export class GameActions {}
