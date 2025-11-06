import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GameActions } from './game-actions';
import { GameStore } from '../../store/game.store';
import { MockBanditStats, MockStats } from '../../lib/game.mock';

describe('GameActions component', () => {
  let component: GameActions;
  let fixture: ComponentFixture<GameActions>;
  let gameStore = {
    banditStats: signal(MockBanditStats),
    currentEvent: signal(''),
    isGameActive: signal(false),
    shopInventory: signal([]),
    stats: signal(MockStats),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameActions],
      providers: [provideZonelessChangeDetection(), { provide: GameStore, useValue: gameStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(GameActions);
    const store = TestBed.inject(GameStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Start Game component', () => {
    expect(fixture.debugElement.query(By.css('[data-testid="start-game"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="attack-action"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="shop-action"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-over"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-win"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-calendar"]'))).toBeNull();
  });

  it('should render Attack Action component', () => {
    gameStore.currentEvent.set('ATTACK');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="start-game"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="attack-action"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="shop-action"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-over"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-win"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-calendar"]'))).toBeNull();
  });

  it('should render Shop Action component', () => {
    gameStore.currentEvent.set('SHOP');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="start-game"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="attack-action"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="shop-action"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="game-over"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-win"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-calendar"]'))).toBeNull();
  });

  it('should render Game Over component', () => {
    gameStore.currentEvent.set('GAME-OVER');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="start-game"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="attack-action"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="shop-action"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-over"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="game-win"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-calendar"]'))).toBeNull();
  });

  it('should render Game Win component', () => {
    gameStore.currentEvent.set('WIN');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="start-game"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="attack-action"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="shop-action"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-over"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-win"]'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('[data-testid="game-calendar"]'))).toBeNull();
  });

  it('should render Game Calendar component', () => {
    gameStore.currentEvent.set('');
    gameStore.isGameActive.set(true);
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('[data-testid="start-game"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="attack-action"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="shop-action"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-over"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-win"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[data-testid="game-calendar"]'))).toBeTruthy();
  });
});
