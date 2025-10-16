import { Component } from '@angular/core';

import { GameActions } from '../components/game-actions/game-actions';
import { GameEvents } from '../components/game-events/game-events';
import { GameStats } from '../components/game-stats/game-stats';
import { JourneyProgress } from '../components/journey-progress/journey-progress';

@Component({
  selector: 'game-view',
  standalone: true,
  imports: [GameActions, GameEvents, GameStats, JourneyProgress],
  styles: [],
  templateUrl: './game-view.html',
})
export class GameView {}
