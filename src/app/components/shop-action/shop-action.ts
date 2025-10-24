import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameStore } from '../../store/game.store';

@Component({
  selector: 'shop-action',
  standalone: true,
  imports: [CommonModule],
  styles: [],
  templateUrl: './shop-action.html',
})
export class ShopAction {
  store = inject(GameStore);
}
