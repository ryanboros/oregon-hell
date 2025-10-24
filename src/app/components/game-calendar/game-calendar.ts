import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPipesModule } from 'ngx-pipes';

import { GameStore } from '../../store/game.store';

@Component({
  selector: 'game-calendar',
  standalone: true,
  imports: [CommonModule, NgPipesModule],
  styles: [],
  templateUrl: './game-calendar.html',
})
export class GameCalendar {
  store = inject(GameStore);
}
