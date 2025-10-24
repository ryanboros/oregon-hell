import { Component, HostListener, inject } from '@angular/core';

import { GameActions } from '../components/game-actions/game-actions';
import { GameEvents } from '../components/game-events/game-events';
import { GameStats } from '../components/game-stats/game-stats';
import { JourneyProgress } from '../components/journey-progress/journey-progress';
import {
  DAYS_PER_STEP,
  EVENT_TYPES,
  FINAL_DISTANCE,
  GAME_SPEED,
  NOTIFICATION_TYPE,
} from '../lib/game.constants';
import { GameStore } from '../store/game.store';
import { IMessage, IStats } from '../store/game.model';
import { consumeFood, updateDistance, updateWeight } from '../lib/game.utils';

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
    this.store.setGameActive(true);

    const msg: IMessage = {
      currentDay: this.store.stats().day,
      id: crypto.randomUUID(),
      message: 'A great adventure begins!',
      type: NOTIFICATION_TYPE.positive,
    };
    this.store.addMessages([msg]);
    this.step(0);
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
    console.log('--updateGame');
    const currStats: IStats = this.store.stats();
    const currCapacity: number = this.store.capacity();
    const currWeight: number = this.store.weight();

    // update day
    const newDay: number = currStats.day + DAYS_PER_STEP;
    console.log(` new day -> ${newDay}`);

    // eat up
    const newFood: number = consumeFood(currStats.crew, currStats.food);
    console.log(` new food -> ${newFood}`);

    // update stats
    this.store.updateStats({ ...currStats, day: newDay, food: newFood });

    // if all the food is gone, starvation & game over
    if (newFood === 0) {
      console.log(' food is gone, everyone starves - Game Over');
      this.store.setGameActive(false);
      this.store.setEvent(EVENT_TYPES.gameOver);

      const starveMsg: IMessage = {
        currentDay: newDay,
        id: crypto.randomUUID(),
        message: 'Your caravan starved to death!',
        type: NOTIFICATION_TYPE.negative,
      };
      this.store.addMessages([starveMsg]);

      return;
    }

    // update weight
    const weightUpdate = updateWeight(
      newDay,
      currStats.firepower,
      newFood,
      currCapacity,
      currWeight
    );
    console.log(` weight update -> ${weightUpdate}`);

    const newDistance = updateDistance(currStats.distance, currCapacity, weightUpdate.weight);

    console.log(` distance update -> ${newDistance}`);

    console.log(' update messages & stats');
    // if messages, add messages
    if (weightUpdate.messages.length > 0) this.store.addMessages(weightUpdate.messages);

    // update stats
    this.store.updateStats({
      ...currStats,
      day: newDay,
      distance: newDistance,
      firepower: weightUpdate.firepower,
      food: weightUpdate.food,
    });

    // if all are dead, everyone died & game over
    if (currStats.crew <= 0) {
      console.log(' crew is all dead - Game Over');

      this.store.setGameActive(false);
      this.store.setEvent(EVENT_TYPES.gameOver);

      const allDeadMsg = {
        currentDay: newDay,

        id: crypto.randomUUID(),
        message: 'Everyone has died.',
        type: NOTIFICATION_TYPE.negative,
      };
      this.store.addMessages([allDeadMsg]);
    }

    // if you've made it, you've won
    if (newDistance >= FINAL_DISTANCE) {
      console.log(' hard to believe we made it - Win');

      this.store.setGameActive(false);
      this.store.setEvent(EVENT_TYPES.win);

      const winMsg = {
        currentDay: newDay,
        id: crypto.randomUUID(),
        message: 'You made it! Welcome to Oregon.',
        type: NOTIFICATION_TYPE.positive,
      };
      this.store.addMessages([winMsg]);
    }

    console.log('random event here');
  }
}
