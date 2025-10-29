import { Component, HostListener, inject } from '@angular/core';

import { GameActions } from '../components/game-actions/game-actions';
import { GameEvents } from '../components/game-events/game-events';
import { GameStats } from '../components/game-stats/game-stats';
import { JourneyProgress } from '../components/journey-progress/journey-progress';
import {
  DAYS_PER_STEP,
  EVENT_PROBABILITY,
  EVENT_TYPES,
  EVENTS,
  FINAL_DISTANCE,
  GAME_SPEED,
  NOTIFICATION_TYPE,
} from '../lib/game.constants';
import { GameStore } from '../store/game.store';
import {
  IBanditStats,
  IEvent,
  IMessage,
  IProduct,
  IStats,
  NotificationType,
} from '../store/game.model';
import {
  calculateCapacity,
  calculateWeight,
  consumeFood,
  generateBanditStats,
  generateDamage,
  generateMessage,
  updateDistance,
  updateWeight,
} from '../lib/game.utils';

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

  /* onStartGame */
  @HostListener('onStartGame', ['$event'])
  handleStartGame(event: any) {
    const currStats: IStats = this.store.stats();

    this.store.setGameActive(true);

    const startMsg: IMessage = generateMessage(
      currStats.day,
      'A great adventure begins!',
      'positive'
    );
    this.store.addMessages([startMsg]);
    this.step(0);
  }

  /* onLeaveShop */
  @HostListener('onLeaveShop', ['$event'])
  handleLeaveShop(event: any) {
    console.log('leave ths shop');
    this.store.setGameActive(true);
    this.store.setEvent('');
    this.step(0);
  }

  /* onPurchaseItem */
  @HostListener('onPurchaseItem', ['$event'])
  handlePurchaseItem(event: any) {
    console.log('buy this item');
    console.log(event.detail);
    const product: IProduct = event.detail;
    const currStats: IStats = this.store.stats();
    const currCapacity: number = this.store.capacity();
    const currWeight: number = this.store.weight();

    if (product.price > currStats.money) {
      const tooExpensiveMsg: IMessage = generateMessage(
        currStats.day,
        'Not enough money.',
        'negative'
      );
      this.store.addMessages([tooExpensiveMsg]);

      return;
    }

    const newStatMsg = {
      currentDay: Math.ceil(currStats.day),
      id: crypto.randomUUID(),
      message: `Bought ${product.qty} x ${product.item}`,
      type: NOTIFICATION_TYPE.positive,
    };
    this.store.addMessages([newStatMsg]);

    // update the stat
    const newMoney = currStats.money - product.price;
    const newStat = currStats[product.item] + product.qty;
    const newCapacity = calculateCapacity(
      product.item === 'oxen' ? newStat : currStats.oxen,
      product.item === 'crew' ? newStat : currStats.crew
    );
    const newWeight = calculateWeight(
      product.item === 'food' ? newStat : currStats.food,
      product.item === 'firepower' ? newStat : currStats.firepower
    );

    // update weight
    const weightUpdate = updateWeight(
      currStats.day,
      product.item === 'firepower' ? newStat : currStats.firepower,
      product.item === 'food' ? newStat : currStats.food,
      newCapacity,
      newWeight
    );
    console.log(` weight update -> `);
    console.log(weightUpdate);

    // update stats
    this.store.updateStats({
      ...currStats,
      money: newMoney,
      [product.item]: newStat,
      firepower: weightUpdate.firepower,
      food: weightUpdate.food,
    });
  }

  /* onFight */
  @HostListener('onFight', ['$event'])
  handleFight(event: any) {
    console.log('fight!');
    const currStats: IStats = this.store.stats();
    const banditStats: IBanditStats = this.store.banditStats();

    const damage: number = generateDamage(currStats.firepower, banditStats.firepower);
    console.log(`damage -> ${damage}`);

    // check for survivors
    if (damage < currStats.crew) {
      console.log(' there are survivors');
      const newCrew = currStats.crew - damage;
      const newMoney = currStats.money + banditStats.money;
      console.log(` update stats -> crew : ${newCrew}, money: ${newMoney}`);

      this.store.updateStats({ ...currStats, crew: newCrew, money: newMoney });

      const damageMsg: IMessage = generateMessage(
        currStats.day,
        `${damage} people were killed fighting.`,
        'negative'
      );
      const foundMsg: IMessage = generateMessage(
        currStats.day,
        `Found ${banditStats.money} gold.`,
        'positive'
      );
      this.store.addMessages([foundMsg, damageMsg]);

      // clear event stats
      this.store.setBanditStats({ firepower: 0, money: 0 });
      this.store.setEvent('');
      // restart game
      this.store.setGameActive(true);
      this.step(0);
    } else {
      console.log(' there are no survivors');

      this.store.updateStats({ ...currStats, crew: 0 });

      const allKilledMsg: IMessage = generateMessage(
        currStats.day,
        'Everybody died in the fight.',
        'negative'
      );
      this.store.addMessages([allKilledMsg]);

      this.store.setEvent(EVENT_TYPES.gameOver);
    }
  }

  /* onRunAway */
  @HostListener('onRunAway', ['$event'])
  handleRunAway(event: any) {
    console.log('run away!');
    const currStats: IStats = this.store.stats();
    const banditStats: IBanditStats = this.store.banditStats();

    const damage: number = generateDamage(currStats.firepower, banditStats.firepower);
    console.log(`damage -> ${damage}`);

    // check for survivors
    if (damage < currStats.crew) {
      console.log(' there are survivors');
      const newCrew = currStats.crew - damage;

      console.log(` update stats -> crew : ${newCrew}`);

      this.store.updateStats({ ...currStats, crew: newCrew });

      const damageMsg: IMessage = generateMessage(
        currStats.day,
        `${damage} people were killed running away.`,
        'negative'
      );
      this.store.addMessages([damageMsg]);

      // clear event stats
      this.store.setBanditStats({ firepower: 0, money: 0 });
      this.store.setEvent('');
      // restart game
      this.store.setGameActive(true);
      this.step(0);
    } else {
      console.log(' there are no survivors.');

      this.store.updateStats({ ...currStats, crew: 0 });

      const allKilledMsg: IMessage = generateMessage(
        currStats.day,
        'Everybody died in the running away.',
        'negative'
      );
      this.store.addMessages([allKilledMsg]);

      this.store.setEvent(EVENT_TYPES.gameOver);
    }
  }

  /* step */
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

  /* updateGame */
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

      const starveMsg = generateMessage(newDay, 'Your caravan starved to death.', 'negative');
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
    console.log(` weight update -> `);
    console.log(weightUpdate);

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

      const allDeadMsg: IMessage = generateMessage(newDay, 'Everyone has died.', 'negative');
      this.store.addMessages([allDeadMsg]);
    }

    // if you've made it, you've won
    if (newDistance >= FINAL_DISTANCE) {
      console.log(' hard to believe we made it - Win');

      this.store.setGameActive(false);
      this.store.setEvent(EVENT_TYPES.win);

      const winMsg: IMessage = generateMessage(
        newDay,
        'You made it! Welcome to Oregon.',
        'positive'
      );
      this.store.addMessages([winMsg]);
    }

    console.log('random event or no?');
    if (Math.random() <= EVENT_PROBABILITY) {
      this.generateEvent();
    }
  }

  /* generateEvent */
  generateEvent() {
    console.log('-- generateEvent');
    const currStats: IStats = this.store.stats();

    console.log(' select random event');
    const eventIndex: number = Math.floor(Math.random() * EVENTS.length);
    const eventData: IEvent = EVENTS[eventIndex];
    console.log(eventData);

    switch (eventData.type) {
      case 'STAT-CHANGE':
        console.log(' *statChange Event*');
        console.log(' update stats');
        const updateStat = currStats[eventData.stat! as string] + eventData.value!;
        this.store.updateStats({
          ...currStats,
          [eventData.stat! as string]: updateStat,
        });

        console.log(' notify event');
        const statMsg: IMessage = generateMessage(
          currStats.day,
          eventData.text,
          eventData.notification as NotificationType
        );
        this.store.addMessages([statMsg]);
        break;
      case 'SHOP':
        console.log(' *shop Event*');
        // pause game
        this.store.setGameActive(false);

        // set store inventory
        this.store.setShopInventory(eventData.products!);

        // show ShopAction
        this.store.setEvent(EVENT_TYPES.shop);

        console.log(' notify event');
        const shopMsg: IMessage = generateMessage(
          currStats.day,
          eventData.text,
          eventData.notification
        );
        this.store.addMessages([shopMsg]);

        break;
      case 'ATTACK':
        console.log(' *attack Event*');
        // pause game
        this.store.setGameActive(false);

        // set bandit stats
        const banditStats: IBanditStats = generateBanditStats();
        this.store.setBanditStats(banditStats);

        // show AttackAction
        this.store.setEvent(EVENT_TYPES.attack);

        console.log(' notify event');
        const attackMsg: IMessage = generateMessage(
          currStats.day,
          eventData.text,
          eventData.notification
        );

        this.store.addMessages([attackMsg]);
        break;

      default:
        return;
    }
  }
}
