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
  FIREPOWER_WEIGHT,
  FOOD_WEIGHT,
  GAME_SPEED,
  NOTIFICATION_TYPE,
} from '../lib/game.constants';
import { GameStore } from '../store/game.store';
import {
  ATTACK_EVENT,
  DEATH_MESSAGE,
  GAME_OVER_EVENT,
  GOLD_MESSAGE,
  IBanditStats,
  IEvent,
  IMessage,
  IProduct,
  IStats,
  MONEY_ITEM,
  NEGATIVE_MESSAGE,
  NotificationType,
  POSITIVE_MESSAGE,
  SHOP_EVENT,
  WIN_EVENT,
} from '../store/game.model';
import {
  calculateCapacity,
  calculateWeight,
  consumeFood,
  generateBanditStats,
  generateDamage,
  generateMessage,
  generateStore,
  randomInt,
  updateDistance,
  // updateWeight,
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

  /* onStartGame click handler */
  @HostListener('onStartGame', ['$event'])
  handleStartGame(event: any) {
    const currStats: IStats = this.store.stats();

    // start game message
    const startMsg: IMessage = generateMessage(1, 'A great adventure begins!', POSITIVE_MESSAGE);
    this.store.addMessages([startMsg]);

    // start game
    this.store.setGameActive(true);
    // game loop
    this.step(0);
  }

  /* onLeaveShop click handler */
  @HostListener('onLeaveShop', ['$event'])
  handleLeaveShop(event: any) {
    // clear event
    this.store.setEvent('');
    // resume game
    this.store.setGameActive(true);
    // game loop
    this.step(0);
  }

  /* onPurchaseItem click handler */
  @HostListener('onPurchaseItem', ['$event'])
  handlePurchaseItem(event: any) {
    const currStats: IStats = this.store.stats();
    const currCapacity: number = this.store.capacity();
    const currWeight: number = this.store.weight();
    const product: IProduct = event.detail;

    // check if money available
    if (product.price > currStats.money) {
      // not enough money message
      const tooExpensiveMsg: IMessage = generateMessage(
        currStats.day,
        'Not enough money',
        NEGATIVE_MESSAGE
      );
      this.store.addMessages([tooExpensiveMsg]);

      return;
    }

    // update the money and stats affected by purchase
    const newMoney = currStats.money - product.price;
    const newStat = currStats[product.item] + product.qty;

    // updating stats after purchase
    this.store.updateStats({
      ...currStats,
      money: newMoney,
      [product.item]: newStat,
    });

    // puchased item message
    const newStatMsg: IMessage = generateMessage(
      currStats.day,
      `Bought: ${product.qty}x ${product.item}`,
      POSITIVE_MESSAGE
    );
    this.store.addMessages([newStatMsg]);

    // purchase probably affects weight & capacity, see if anything needs to be dropped
    const weightUpdate = this.updateWeight();

    // update weight stats
    this.store.updateStats({
      ...this.store.stats(),
      firepower: weightUpdate.firepower,
      food: weightUpdate.food,
    });
  }

  /* onFight click handler */
  @HostListener('onFight', ['$event'])
  handleFight(event: any) {
    const currStats: IStats = this.store.stats();
    const banditStats: IBanditStats = this.store.banditStats();

    // calculate damage done by bandits
    const damage: number = generateDamage(currStats.firepower, banditStats.firepower);

    // check for survivors
    if (damage < currStats.crew) {
      // there are survivors
      const newCrew = currStats.crew - damage;
      const newMoney = currStats.money + banditStats.money;

      // update stats - money & crew
      this.store.updateStats({ ...currStats, crew: newCrew, money: newMoney });

      // battle casualties message
      const damageMsg: IMessage = generateMessage(
        currStats.day,
        damage === 0 ? 'No one was killed in the fight' : `${damage} people were killed fighting`,
        damage === 0 ? POSITIVE_MESSAGE : NEGATIVE_MESSAGE
      );

      // when you defeat bandits, you get their gold
      // gold found message
      const foundMsg: IMessage = generateMessage(
        currStats.day,
        `Found ${banditStats.money} gold`,
        GOLD_MESSAGE
      );
      this.store.addMessages([foundMsg, damageMsg]);

      // clear event stats
      this.store.setBanditStats({ firepower: 0, money: 0 });
      this.store.setEvent('');
      // restart game
      this.store.setGameActive(true);
      // game loop
      this.step(0);
    } else {
      // no survivors, game over

      // update stats - no crew remaining
      this.store.updateStats({ ...currStats, crew: 0 });

      // all were killed in battle message
      const allKilledMsg: IMessage = generateMessage(
        currStats.day,
        'Everybody died in the fight',
        DEATH_MESSAGE
      );
      this.store.addMessages([allKilledMsg]);

      // display Game Over
      this.store.setEvent(GAME_OVER_EVENT);
    }
  }

  /* onRunAway click handler */
  @HostListener('onRunAway', ['$event'])
  handleRunAway(event: any) {
    const banditStats: IBanditStats = this.store.banditStats();
    const currStats: IStats = this.store.stats();

    // calculate damage done by bandits
    const damage: number = generateDamage(currStats.firepower, banditStats.firepower);

    // check for survivors
    if (damage < currStats.crew) {
      // there are survivors
      const newCrew = currStats.crew - damage;

      // update stats - crew
      this.store.updateStats({ ...currStats, crew: newCrew });

      // fleeing casualties message
      const damageMsg: IMessage = generateMessage(
        currStats.day,
        `${damage} people were killed running away`,
        NEGATIVE_MESSAGE
      );
      this.store.addMessages([damageMsg]);

      // clear event stats
      this.store.setBanditStats({ firepower: 0, money: 0 });
      this.store.setEvent('');
      // restart game
      this.store.setGameActive(true);
      // game loop
      this.step(0);
    } else {
      // no survivors, game over

      // update stats - no crew remaining
      this.store.updateStats({ ...currStats, crew: 0 });

      // all were killed fleeing message
      const allKilledMsg: IMessage = generateMessage(
        currStats.day,
        'Everybody died running away',
        DEATH_MESSAGE
      );
      this.store.addMessages([allKilledMsg]);

      // display Game Over
      this.store.setEvent(GAME_OVER_EVENT);
    }
  }

  /* onPlayAgain click handler */
  @HostListener('onPlayAgain', ['$event'])
  handlePlayAgain(event: any) {
    // reset stats
    this.store.updateStats({
      crew: 30,
      day: 0,
      distance: 0,
      firepower: 2,
      food: 80,
      money: 300,
      oxen: 2,
    });

    // clear messages
    this.store.clearMessages();

    // clear event - shows Start Game
    this.store.setEvent('');
  }

  /**
   *  step - the game loop
   */
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

  /**
   *  updateGame
   */
  updateGame() {
    const currStats: IStats = this.store.stats();
    const currCapacity: number = this.store.capacity();
    const currWeight: number = this.store.weight();

    // update day
    const newDay: number = currStats.day + DAYS_PER_STEP;

    // cararvan consumes food
    const newFood: number = consumeFood(currStats.crew, currStats.food);

    // update stats - day & food
    this.store.updateStats({ ...currStats, day: newDay, food: newFood });

    // if all the food is gone, starvation & game over
    if (newFood === 0) {
      // caravan starved message
      const starveMsg = generateMessage(newDay, 'Your caravan starved to death', DEATH_MESSAGE);
      this.store.addMessages([starveMsg]);

      // stop game
      this.store.setGameActive(false);
      // set Game Over event
      this.store.setEvent(GAME_OVER_EVENT);

      return;
    }

    // update weight
    const weightUpdate = this.updateWeight();

    // update distance
    const newDistance = updateDistance(
      this.store.stats().distance,
      this.store.capacity(),
      weightUpdate.weight
    );

    // update stats - distance, firepower, food
    this.store.updateStats({
      ...this.store.stats(),
      distance: newDistance,
      firepower: weightUpdate.firepower,
      food: weightUpdate.food,
    });

    // if all are dead, everyone died & game over
    if (currStats.crew <= 0) {
      // all crew has died message
      const allDeadMsg: IMessage = generateMessage(newDay, 'Everyone has died', DEATH_MESSAGE);
      this.store.addMessages([allDeadMsg]);

      // stop game
      this.store.setGameActive(false);
      // set Game Over event
      this.store.setEvent(GAME_OVER_EVENT);
    }

    // check distance to see if caravan has reached the destination
    if (newDistance >= FINAL_DISTANCE) {
      // you win message
      const winMsg: IMessage = generateMessage(
        newDay,
        'You have reached your destination. Welcome to Oregon!',
        POSITIVE_MESSAGE
      );
      this.store.addMessages([winMsg]);

      // stop game
      this.store.setGameActive(false);
      // set Game Win event
      this.store.setEvent(WIN_EVENT);
    }

    // if random number within EVENT_PROBABILITY, generate an event
    if (Math.random() <= EVENT_PROBABILITY) {
      // generate event -> statsChange, shop, or attack
      this.generateEvent();
    }
  }

  /**
   *  updateWeight
   */
  updateWeight() {
    const currStats: IStats = this.store.stats();
    const currCapacity: number = this.store.capacity();

    let currWeight: number = this.store.weight();
    let newFood: number = currStats.food;
    let newFirepower: number = currStats.firepower;
    let droppedGuns: number = 0;
    let droppedFood: number = 0;

    // drop things if it's too much weight, assume guns before food

    // check if dropping guns
    while (newFirepower && currCapacity <= currWeight) {
      newFirepower--;
      currWeight -= FIREPOWER_WEIGHT;
      droppedGuns++;
    }

    // add notification if guns dropped
    if (droppedGuns > 0) {
      // dropped gun message
      const droppedGunMsg: IMessage = generateMessage(
        currStats.day,
        `Left ${droppedGuns} guns behind`,
        NEGATIVE_MESSAGE
      );
      this.store.addMessages([droppedGunMsg]);
    }

    // check if dropping food
    while (newFood && currCapacity <= currWeight) {
      newFood--;
      currWeight -= FOOD_WEIGHT;
      droppedFood++;
    }

    // add notification if food dropped
    if (droppedFood > 0) {
      // dropped food message
      const droppedFoodMsg: IMessage = generateMessage(
        currStats.day,
        `Left ${droppedFood} food provisions behind`,
        NEGATIVE_MESSAGE
      );

      this.store.addMessages([droppedFoodMsg]);
    }
    return { food: newFood, firepower: newFirepower, weight: currWeight };
  }

  /**
   *  generateEvent
   */
  generateEvent() {
    const currStats: IStats = this.store.stats();

    // generate random event
    const eventIndex: number = randomInt(EVENTS.length);
    const eventData: IEvent = EVENTS[eventIndex];

    switch (eventData.type) {
      case 'STAT-CHANGE':
        // STAT-CHANGE event

        // update stats
        const updateStat = currStats[eventData.stat! as string] + eventData.value!;
        if (updateStat >= 0) {
          // if result is > 0, update valid

          // update stats
          this.store.updateStats({
            ...currStats,
            [eventData.stat! as string]: updateStat,
          });

          // stat updated message
          const statMsg: IMessage = generateMessage(
            currStats.day,
            `${eventData.text} ${eventData.stat === MONEY_ITEM ? '$' : ''}${Math.abs(
              eventData.value!
            )}`,
            eventData.notification
          );
          this.store.addMessages([statMsg]);
        }
        break;
      case 'SHOP':
        // SHOP event

        // pause game
        this.store.setGameActive(false);

        // shop event message
        const shopMsg: IMessage = generateMessage(
          currStats.day,
          eventData.text,
          eventData.notification
        );
        this.store.addMessages([shopMsg]);

        // set store inventory from randomize eventData
        const inventory: IProduct[] = generateStore(eventData.products!);
        this.store.setShopInventory(inventory);

        // show ShopAction
        this.store.setEvent(SHOP_EVENT);
        break;
      case 'ATTACK':
        // ATTACK event

        // pause game
        this.store.setGameActive(false);

        // attack message
        const attackMsg: IMessage = generateMessage(
          currStats.day,
          eventData.text,
          eventData.notification
        );
        this.store.addMessages([attackMsg]);

        // set bandit stats
        const banditStats: IBanditStats = generateBanditStats();
        this.store.setBanditStats(banditStats);

        // show AttackAction
        this.store.setEvent(ATTACK_EVENT);
        break;
      default:
        return;
    }
  }
}
