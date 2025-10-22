import { Component, HostListener, inject } from '@angular/core';

import { GameActions } from '../components/game-actions/game-actions';
import { GameEvents } from '../components/game-events/game-events';
import { GameStats } from '../components/game-stats/game-stats';
import { JourneyProgress } from '../components/journey-progress/journey-progress';
import { GAME_SPEED, NOTIFICATION_TYPE } from '../lib/game.constants';
import { GameStore } from '../store/game.store';
import { IMessage } from '../store/game.model';

@Component({
  selector: 'game-view',
  standalone: true,
  imports: [GameActions, GameEvents, GameStats, JourneyProgress],
  styles: [],
  templateUrl: './game-view.html',
})
export class GameView {
  store = inject(GameStore);
  previousTime: number = 0;

  @HostListener('onStartGame', ['$event'])
  handleStartGame(event: any) {
    this.store.toggleGameActive();

    const msg: IMessage = {
      currentDay: this.store.stats().day,
      id: crypto.randomUUID(),
      message: 'A great adventure begins!',
      type: NOTIFICATION_TYPE.positive,
    };
    this.store.addMessage(msg);
    // this.step(0);
  }

  step(timestamp: number) {
    //starting, setup the previous time for the first time
    if (!this.previousTime) {
      this.previousTime = timestamp;
      this.updateGame();
    }

    //time difference
    var progress = timestamp - this.previousTime;

    //game update
    if (progress >= GAME_SPEED) {
      this.previousTime = timestamp;
      this.updateGame();
    }

    //we use "bind" so that we can refer to the context "this" inside of the step method
    if (this.store.isGameActive()) window.requestAnimationFrame(this.step.bind(this));
  }

  updateGame() {
    //
  }
}
