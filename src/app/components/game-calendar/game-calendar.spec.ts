import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCalendar } from './game-calendar';
import { GameStore } from '../../store/game.store';
import { MockStats } from '../../lib/game.mock';

describe('GameCalendar component', () => {
  let component: GameCalendar;
  let fixture: ComponentFixture<GameCalendar>;
  let gameStore = { stats: signal(MockStats) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCalendar],
      providers: [provideZonelessChangeDetection(), { provide: GameStore, useValue: gameStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(GameCalendar);
    const store = TestBed.inject(GameStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render Game Calendar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h5')?.textContent).toContain('DAY');
    expect(compiled.querySelector('h1')?.textContent).toContain('0');
  });

  it('should display the current day', () => {
    gameStore.stats.set({ ...MockStats, day: 10 });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('10');
  });
});
