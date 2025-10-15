import { Component } from '@angular/core';

import { GameActions } from '../components/game-actions/GameActions';
import { GameEvents } from '../components/game-events/GameEvents';
import { GameStats } from '../components/game-stats/GameStats';
import { JourneyProgress } from '../components/journey-progress/JourneyProgress';

@Component({
  selector: 'game-view',
  standalone: true,
  imports: [GameActions, GameEvents, GameStats, JourneyProgress],
  styles: [],
  templateUrl: './GameView.html',
})
export class GameView {}
